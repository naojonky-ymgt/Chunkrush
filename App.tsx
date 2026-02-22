
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameStatus, ChunkPair, CardItem, Player } from './types';
import { parseCSV } from './services/csvService';
import { getStagePairs } from './services/stage1Service';
import { ProgressBar } from './components/ProgressBar';
import { GameCard } from './components/GameCard';
import { Upload, X, FileText, Settings, Brain, Zap, RotateCw, ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

const INITIAL_BOTS: Player[] = [
  { id: 'bot1', name: 'Speedy', score: 0, progress: 0, isBot: true, avatarColor: '#ef4444' }, // Red
  { id: 'bot2', name: 'Scholar', score: 0, progress: 0, isBot: true, avatarColor: '#f59e0b' }, // Amber
];

const BATCH_SIZE = 6; // Rules: Show 6 pairs at a time
const AVAILABLE_STAGES = Array.from({ length: 10 }, (_, i) => i + 1);

type WordLimit = 30 | 60 | 90 | 'ALL';
type GameMode = 'GAME' | 'FLASHCARD';
type FlashcardDirection = 'JA_EN' | 'EN_JA';

const App: React.FC = () => {
  // Game State
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [playerName, setPlayerName] = useState("Player 1");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Selection State
  const [selectedTab, setSelectedTab] = useState<GameMode>('GAME');
  const [selectedStage, setSelectedStage] = useState<number>(1);
  const [wordLimit, setWordLimit] = useState<WordLimit>('ALL');
  
  // Flashcard Specific State
  const [flashcardDirection, setFlashcardDirection] = useState<FlashcardDirection>('JA_EN');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // CSV State
  const [customPairs, setCustomPairs] = useState<ChunkPair[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gauntlet Logic State
  const [allGamePairs, setAllGamePairs] = useState<ChunkPair[]>([]); // The full list for this session
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0); // Where we are in the full list
  
  // Active Board State
  const [leftCards, setLeftCards] = useState<CardItem[]>([]);
  const [rightCards, setRightCards] = useState<CardItem[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<CardItem | null>(null);
  const [selectedRight, setSelectedRight] = useState<CardItem | null>(null);
  const [wrongPair, setWrongPair] = useState<{left: string | null, right: string | null}>({ left: null, right: null });
  
  // Progress State
  const [players, setPlayers] = useState<Player[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<string>("0.00");

  // Refs for game loop
  const timerRef = useRef<number | null>(null);
  const botIntervalRef = useRef<number | null>(null);

  // --- Initialization ---

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const parsed = parseCSV(content);
        if (parsed.length < 1) {
          setErrorMsg("CSV is empty.");
          return;
        }
        setCustomPairs(parsed);
        setFileName(file.name);
        setErrorMsg(null);
      } catch (err) {
        setErrorMsg("Failed to parse CSV. Format: Japanese,English");
      }
    };
    reader.readAsText(file);
  };

  const clearCustomFile = () => {
    setCustomPairs([]);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFilteredList = () => {
    let fullList: ChunkPair[] = [];

    if (customPairs.length > 0) {
      fullList = [...customPairs];
      // Shuffle if Game Mode, keep order (or shuffle?) for Flashcard? 
      // Let's shuffle for both to keep it fresh, unless user wants order (omitted for now)
      fullList.sort(() => Math.random() - 0.5);
    } else {
      fullList = getStagePairs(selectedStage); // Returns ALL pairs shuffled
    }

    if (wordLimit !== 'ALL') {
      fullList = fullList.slice(0, wordLimit);
    }
    return fullList;
  };

  const startGame = () => {
    setErrorMsg(null);
    const fullList = getFilteredList();

    if (fullList.length === 0) {
      setErrorMsg("No vocabulary loaded.");
      return;
    }
    
    setAllGamePairs(fullList);
    setStatus(GameStatus.LOADING);

    if (selectedTab === 'FLASHCARD') {
      // Initialize Flashcard Mode
      setCurrentCardIndex(0);
      setIsCardFlipped(false);
      setStatus(GameStatus.PLAYING_FLASHCARD);
    } else {
      // Initialize Game Mode
      if (fullList.length < 4) {
        // Minimal check for game mode
         setErrorMsg("Need at least 4 words for Game Mode.");
         setStatus(GameStatus.IDLE);
         return;
      }
      
      setCurrentBatchIndex(0);
      setPlayers([
        { id: 'user', name: playerName, score: 0, progress: 0, isBot: false, avatarColor: '#3b82f6' }, 
        ...INITIAL_BOTS.map(b => ({...b, progress: 0, score: 0}))
      ]);
      loadBatch(fullList, 0);
      setStartTime(Date.now());
      setStatus(GameStatus.PLAYING);
    }
  };

  // --- Game Mode Logic ---

  const loadBatch = (list: ChunkPair[], startIndex: number) => {
    const batch = list.slice(startIndex, startIndex + BATCH_SIZE);
    
    const left: CardItem[] = batch.map(p => ({ 
      id: p.id + '-ja', text: p.japanese, lang: 'ja', pairId: p.id, isMatched: false 
    }));
    const right: CardItem[] = batch.map(p => ({ 
      id: p.id + '-en', text: p.english, lang: 'en', pairId: p.id, isMatched: false 
    }));

    setLeftCards(left.sort(() => Math.random() - 0.5));
    setRightCards(right.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft.pairId === selectedRight.pairId) {
        handleMatch(selectedLeft.pairId);
      } else {
        handleMismatch(selectedLeft.id, selectedRight.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLeft, selectedRight]);

  const handleMatch = (pairId: string) => {
    setLeftCards(prev => prev.map(c => c.pairId === pairId ? { ...c, isMatched: true } : c));
    setRightCards(prev => prev.map(c => c.pairId === pairId ? { ...c, isMatched: true } : c));
    
    setSelectedLeft(null);
    setSelectedRight(null);

    updatePlayerProgress('user', 1);

    const remainingUnmatched = leftCards.filter(c => !c.isMatched && c.pairId !== pairId).length;
    
    if (remainingUnmatched === 0) {
      const nextIndex = currentBatchIndex + BATCH_SIZE;
      if (nextIndex < allGamePairs.length) {
        setTimeout(() => {
          setCurrentBatchIndex(nextIndex);
          loadBatch(allGamePairs, nextIndex);
        }, 500);
      }
    }
  };

  const handleMismatch = (leftId: string, rightId: string) => {
    setWrongPair({ left: leftId, right: rightId });
    setTimeout(() => {
      setWrongPair({ left: null, right: null });
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 500);
  };

  const updatePlayerProgress = (playerId: string, increment: number) => {
    setPlayers(prev => {
      const next = prev.map(p => {
        if (p.id !== playerId) return p;
        const newScore = p.score + increment;
        const progress = Math.min(100, (newScore / allGamePairs.length) * 100);
        return { ...p, score: newScore, progress };
      });

      const user = next.find(p => p.id === 'user');
      if (user && user.progress >= 99.9 && status === GameStatus.PLAYING) {
        finishGame(next);
      }
      return next;
    });
  };

  const finishGame = (finalPlayers: Player[]) => {
    setStatus(GameStatus.FINISHED);
    setPlayers(finalPlayers);
  };

  // --- Game Loop Effects ---

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      timerRef.current = window.setInterval(() => {
        const now = Date.now();
        setElapsedTime(((now - startTime) / 1000).toFixed(2));
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, startTime]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
      botIntervalRef.current = window.setInterval(() => {
        setPlayers(currentPlayers => {
          const user = currentPlayers.find(p => p.id === 'user');
          if (user && user.progress >= 100) return currentPlayers;

          return currentPlayers.map(p => {
            if (!p.isBot) return p;
            if (p.progress >= 100) return p;
            let chance = 0.4; 
            if (p.name === 'Speedy') chance = 0.5;

            if (Math.random() < chance) {
              const newScore = p.score + 1;
              const progress = Math.min(100, (newScore / allGamePairs.length) * 100);
              return { ...p, score: newScore, progress };
            }
            return p;
          });
        });
      }, 1000);
    } else {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    }
    return () => {
      if (botIntervalRef.current) clearInterval(botIntervalRef.current);
    };
  }, [status, allGamePairs.length]);


  // --- Flashcard Logic ---
  
  const speakText = useCallback((text: string, isMale: boolean | null = null) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    
    if (enVoices.length > 0) {
      // If isMale is not provided, randomize
      const useMale = isMale !== null ? isMale : Math.random() > 0.5;
      
      let targetVoice: SpeechSynthesisVoice | undefined;
      
      if (useMale) {
         // Priorities for Male: Daniel (iOS), David/Mark (Win), or explicit Male
         targetVoice = enVoices.find(v => 
            v.name.includes('Daniel') || 
            v.name.includes('David') || 
            v.name.includes('Mark') ||
            (v.name.includes('Male') && !v.name.includes('Female'))
         );
         utterance.pitch = 0.9; 
      } else {
         // Priorities for Female: Samantha (iOS), Zira (Win), Google US (Android), or explicit Female
         targetVoice = enVoices.find(v => 
            v.name.includes('Samantha') || 
            v.name.includes('Zira') || 
            v.name.includes('Google US English') ||
            v.name.includes('Female')
         );
         utterance.pitch = 1.0;
      }
      
      // Strict Fallback: Use the first available English voice if specific match fails.
      // Do NOT use random to avoid "Fred" or "Bells".
      if (!targetVoice) {
        targetVoice = enVoices[0];
        utterance.pitch = useMale ? 0.9 : 1.0;
      }
      
      utterance.voice = targetVoice;
    }
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleCardFlip = useCallback(() => {
    setIsCardFlipped(prev => {
      const nextState = !prev;
      const pair = allGamePairs[currentCardIndex];
      
      // Only speak if we are revealing English
      // JA_EN Mode: Back (true) is English. So speak if nextState is true.
      // EN_JA Mode: Front (false) is English. So speak if nextState is false.
      
      if (pair) {
        const isRevealingEnglish = (flashcardDirection === 'JA_EN' && nextState) || 
                                   (flashcardDirection === 'EN_JA' && !nextState);
        
        if (isRevealingEnglish) {
           speakText(pair.english);
        }
      }
      
      return nextState;
    });
  }, [allGamePairs, currentCardIndex, flashcardDirection, speakText]);

  const handleFlashcardSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const pair = allGamePairs[currentCardIndex];
    if (pair) speakText(pair.english);
  };

  const nextCard = useCallback(() => {
    if (currentCardIndex < allGamePairs.length - 1) {
      setIsCardFlipped(false);
      setCurrentCardIndex(prev => prev + 1);
    }
  }, [currentCardIndex, allGamePairs.length]);

  const prevCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setIsCardFlipped(false);
      setCurrentCardIndex(prev => prev - 1);
    }
  }, [currentCardIndex]);
  
  // Keyboard navigation for flashcards
  useEffect(() => {
    if (status !== GameStatus.PLAYING_FLASHCARD) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextCard();
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === ' ' || e.key === 'Enter') {
         e.preventDefault();
         handleCardFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, nextCard, prevCard, handleCardFlip]);


  // --- Render Helpers ---
  
  const sortedPlayers = [...players].sort((a, b) => b.progress - a.progress);
  const isCustomMode = customPairs.length > 0;
  const currentStageTitle = `Corpus 4500 Stage ${selectedStage}`;
  const stageTotalWords = isCustomMode ? customPairs.length : getStagePairs(selectedStage).length;
  
  const getPlayableCount = () => {
    if (wordLimit === 'ALL') return stageTotalWords;
    return Math.min(wordLimit, stageTotalWords);
  };

  // --- Views ---

  // 1. MAIN MENU
  if (status === GameStatus.IDLE || status === GameStatus.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black p-4">
        <div className="glass-panel max-w-md w-full rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
          
          {/* Header */}
          <div className="text-center pt-8 pb-6 px-8">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300 mb-2">
              ChunkRush
            </h1>
            <p className="text-slate-400 text-sm">Speed Translation & Flashcards</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-700/50 px-8">
            <button
              onClick={() => setSelectedTab('GAME')}
              className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                selectedTab === 'GAME' 
                  ? 'text-indigo-400 border-indigo-400' 
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              <Zap size={16} /> Speed Match
            </button>
            <button
              onClick={() => setSelectedTab('FLASHCARD')}
              className={`flex-1 pb-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                selectedTab === 'FLASHCARD' 
                  ? 'text-emerald-400 border-emerald-400' 
                  : 'text-slate-500 border-transparent hover:text-slate-300'
              }`}
            >
              <Brain size={16} /> Flashcards
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
            
            {selectedTab === 'GAME' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Your Nickname</label>
                <input 
                  type="text" 
                  value={playerName} 
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            )}

            {selectedTab === 'FLASHCARD' && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 flex flex-col gap-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Direction</label>
                <div className="flex gap-2">
                   <button
                    onClick={() => setFlashcardDirection('JA_EN')}
                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                      flashcardDirection === 'JA_EN' 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                   >
                     JP → EN
                   </button>
                   <button
                    onClick={() => setFlashcardDirection('EN_JA')}
                    className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                      flashcardDirection === 'EN_JA' 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                   >
                     EN → JP
                   </button>
                </div>
              </div>
            )}
            
            {/* Common Settings Area */}
            {!isCustomMode && (
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 space-y-4">
                
                {/* Stage Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Stage</label>
                  <div className="grid grid-cols-5 gap-2">
                    {AVAILABLE_STAGES.map((stageNum) => (
                      <button
                        key={stageNum}
                        onClick={() => setSelectedStage(stageNum)}
                        className={`h-9 rounded-md font-bold text-sm transition-all ${
                          selectedStage === stageNum 
                            ? (selectedTab === 'GAME' ? 'bg-indigo-600' : 'bg-emerald-600') + ' text-white shadow-lg scale-105' 
                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                        }`}
                      >
                        {stageNum}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-right text-xs text-slate-500">
                    Total in Stage: {getStagePairs(selectedStage).length}
                  </div>
                </div>

                {/* Word Limit Selector */}
                <div className="border-t border-slate-700/50 pt-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Word Limit</label>
                  <div className="grid grid-cols-4 gap-2">
                    {([30, 60, 90, 'ALL'] as WordLimit[]).map((limit) => (
                      <button
                        key={limit}
                        onClick={() => setWordLimit(limit)}
                        className={`h-9 rounded-md font-bold text-xs transition-all ${
                          wordLimit === limit 
                            ? (selectedTab === 'GAME' ? 'bg-cyan-600 ring-cyan-400' : 'bg-emerald-600 ring-emerald-400') + ' text-white shadow-lg scale-105 ring-1' 
                            : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                        }`}
                      >
                        {limit === 'ALL' ? 'MAX' : limit}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Custom File Section */}
            <div className="border-t border-slate-700 pt-4">
              <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {!isCustomMode ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-slate-600 rounded-xl text-slate-400 hover:text-white hover:border-slate-400 hover:bg-slate-800/50 transition-all group"
                >
                  <Upload size={18} className="group-hover:-translate-y-1 transition-transform" />
                  <span className="text-sm">Upload Custom CSV</span>
                </button>
              ) : (
                <div className="space-y-4">
                   <div className="bg-emerald-900/30 border border-emerald-500/50 rounded-xl p-3 flex items-center justify-between animate-pop">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-2 rounded-lg">
                        <FileText size={20} className="text-emerald-400" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-emerald-200">{fileName}</span>
                        <span className="text-xs text-emerald-400/70">{customPairs.length} pairs loaded</span>
                      </div>
                    </div>
                    <button 
                      onClick={clearCustomFile}
                      className="p-2 hover:bg-emerald-900/50 rounded-full text-emerald-400/70 hover:text-emerald-200 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {/* Word Limit for Custom Mode too */}
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Word Limit</label>
                      <div className="grid grid-cols-4 gap-2">
                        {([30, 60, 90, 'ALL'] as WordLimit[]).map((limit) => (
                          <button
                            key={limit}
                            onClick={() => setWordLimit(limit)}
                            className={`h-9 rounded-md font-bold text-xs transition-all ${
                              wordLimit === limit 
                                ? 'bg-emerald-600 text-white shadow-lg scale-105 ring-1 ring-emerald-400' 
                                : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                            }`}
                          >
                            {limit === 'ALL' ? 'MAX' : limit}
                          </button>
                        ))}
                      </div>
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-xs p-3 rounded-lg">
                {errorMsg}
              </div>
            )}

            <button 
              onClick={startGame}
              disabled={status === GameStatus.LOADING}
              className={`w-full font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedTab === 'GAME'
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white"
              }`}
            >
              {status === GameStatus.LOADING ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Preparing...
                </span>
              ) : (
                selectedTab === 'GAME'
                  ? `Start Game (${getPlayableCount()})` 
                  : `Start Flashcards (${getPlayableCount()})`
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. FLASHCARD VIEW
  if (status === GameStatus.PLAYING_FLASHCARD) {
    const currentPair = allGamePairs[currentCardIndex];
    // Determine content based on direction and flip state
    // JA_EN: Front = JA, Back = EN
    // EN_JA: Front = EN, Back = JA
    
    let frontText = "";
    let backText = "";
    let frontLang: 'ja' | 'en' = 'ja';
    let backLang: 'ja' | 'en' = 'en';

    if (flashcardDirection === 'JA_EN') {
      frontText = currentPair?.japanese;
      backText = currentPair?.english;
      frontLang = 'ja';
      backLang = 'en';
    } else {
      frontText = currentPair?.english;
      backText = currentPair?.japanese;
      frontLang = 'en';
      backLang = 'ja';
    }

    const showingText = isCardFlipped ? backText : frontText;
    const showingLang = isCardFlipped ? backLang : frontLang;
    
    // Calculate progress
    const progress = Math.round(((currentCardIndex + 1) / allGamePairs.length) * 100);

    return (
       <div className="min-h-screen flex flex-col bg-slate-900 text-white relative">
         {/* Header */}
         <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-4 z-10 flex justify-between items-center">
            <button 
              onClick={() => setStatus(GameStatus.IDLE)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition"
            >
              <ArrowLeft size={20} /> <span className="hidden sm:inline">Menu</span>
            </button>
            <div className="flex flex-col items-center">
               <h2 className="font-bold text-emerald-400">{isCustomMode ? fileName : `Stage ${selectedStage}`}</h2>
               <span className="text-xs text-slate-500">{currentCardIndex + 1} / {allGamePairs.length}</span>
            </div>
            <button onClick={() => { /* Shuffle logic could go here */ }} className="text-slate-400 hover:text-white">
               <Settings size={20} />
            </button>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col items-center justify-center p-6 pb-24">
            
            {/* Progress Bar */}
            <div className="w-full max-w-md h-1.5 bg-slate-800 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* The Card */}
            <div 
              className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/9] perspective-1000 group cursor-pointer"
              onClick={handleCardFlip}
            >
              <div className={`w-full h-full relative transition-all duration-500 preserve-3d transform ${isCardFlipped ? '' : ''}`}>
                {/* We simulate flip by just changing content with animation keyframes usually, 
                    but let's use a container styling for simplicity in this non-3d-library setup. 
                    Actually, a simple state swap with animation is safer. */}
                 
                 <div className={`
                    absolute inset-0 rounded-3xl shadow-2xl border border-slate-700
                    flex flex-col items-center justify-center p-8 text-center
                    transition-all duration-300
                    ${isCardFlipped 
                      ? 'bg-slate-800 text-white rotate-y-180' 
                      : 'bg-gradient-to-br from-slate-800 to-slate-900 text-white'}
                    hover:shadow-emerald-900/20 hover:border-emerald-500/30
                 `}>
                    <span className="absolute top-6 left-6 text-xs font-bold text-slate-500 tracking-widest uppercase">
                      {showingLang === 'ja' ? 'JAPANESE' : 'ENGLISH'}
                    </span>
                    
                    {showingLang === 'en' && (
                       <button 
                         onClick={handleFlashcardSpeak}
                         className="absolute top-6 right-6 p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-700/50 rounded-full transition"
                       >
                         <Volume2 size={24} />
                       </button>
                    )}

                    <div className={`
                       font-bold transition-all duration-300
                       ${showingLang === 'ja' ? 'text-3xl sm:text-5xl font-jp' : 'text-2xl sm:text-4xl'}
                    `}>
                      {showingText}
                    </div>
                    
                    <div className="absolute bottom-6 text-slate-600 text-sm flex items-center gap-2">
                       <RotateCw size={14} /> Click or Space to Flip
                    </div>
                 </div>

              </div>
            </div>

         </div>

         {/* Controls Footer */}
         <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 sm:p-6">
            <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
              <button 
                onClick={prevCard}
                disabled={currentCardIndex === 0}
                className="flex-1 py-4 rounded-xl font-bold bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} /> Prev
              </button>

              <button 
                onClick={handleCardFlip}
                className="flex-1 py-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center justify-center gap-2"
              >
                 <RotateCw size={20} /> Flip
              </button>

              <button 
                onClick={nextCard}
                disabled={currentCardIndex === allGamePairs.length - 1}
                className="flex-1 py-4 rounded-xl font-bold bg-slate-800 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition active:scale-95 flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={20} />
              </button>
            </div>
         </div>
       </div>
    );
  }

  // 3. GAME MODE VIEW
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {/* Header / Race Track */}
      <div className="bg-slate-900 border-b border-slate-800 p-2 sm:p-4 shadow-2xl z-10 sticky top-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-2">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setStatus(GameStatus.IDLE)}
                  className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 text-slate-400 transition"
                  title="Back to Menu"
                >
                  <X size={16} />
                </button>
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-indigo-400">
                    {isCustomMode ? (fileName || "Custom Game") : currentStageTitle}
                  </h2>
                  <span className="text-xs text-slate-500 uppercase tracking-wider">
                    {Math.min(currentBatchIndex + BATCH_SIZE, allGamePairs.length)} / {allGamePairs.length} Words
                  </span>
                </div>
             </div>
             <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums tracking-tight">
               {elapsedTime}<span className="text-sm text-slate-500 ml-1">s</span>
             </div>
          </div>
          
          <div className="space-y-1">
            {sortedPlayers.map((p, idx) => (
              <ProgressBar key={p.id} player={p} rank={idx + 1} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Board */}
      <div className="flex-1 overflow-y-auto px-2 py-2 sm:px-4 sm:py-4 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          {status === GameStatus.FINISHED ? (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-lg mx-auto mt-10 animate-pop">
              <h2 className="text-4xl font-bold mb-2 text-white">Gauntlet Cleared!</h2>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-6">
                {players.find(p => p.id === 'user')?.progress >= 99.9 && sortedPlayers[0].id === 'user' ? "1st Place" : `#${sortedPlayers.findIndex(p => p.id === 'user') + 1} Place`}
              </div>
              <p className="text-slate-400 mb-8">Time: {elapsedTime}s</p>
              <p className="text-sm text-slate-500 mb-8">Total Words: {allGamePairs.length}</p>
              <button 
                onClick={() => setStatus(GameStatus.IDLE)}
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-8">
              {/* Left Column: Japanese */}
              <div className="space-y-2">
                <h3 className="text-center text-xs text-slate-500 uppercase tracking-widest mb-1">Japanese</h3>
                {leftCards.map(card => (
                  <GameCard
                    key={card.id}
                    card={card}
                    isSelected={selectedLeft?.id === card.id}
                    isMatched={card.isMatched}
                    isWrong={wrongPair.left === card.id}
                    onClick={(c) => setSelectedLeft(prev => prev?.id === c.id ? null : c)}
                  />
                ))}
              </div>

              {/* Right Column: English */}
              <div className="space-y-2">
                <h3 className="text-center text-xs text-slate-500 uppercase tracking-widest mb-1">English</h3>
                {rightCards.map(card => (
                  <GameCard
                    key={card.id}
                    card={card}
                    isSelected={selectedRight?.id === card.id}
                    isMatched={card.isMatched}
                    isWrong={wrongPair.right === card.id}
                    onClick={(c) => setSelectedRight(prev => prev?.id === c.id ? null : c)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
