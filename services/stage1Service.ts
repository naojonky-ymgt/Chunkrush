
import { ChunkPair } from "../types";

const STAGE_DATA_1 = `
言いたいことがある 	have something to say 
説明させてください． 	Let me explain . 
Ａとして描写される 	be described as A 
乳製品 	dairy products 
結果を生む 	produce results 
環境を生む 	create the environment 
会社を設立する 	establish a company 
新しい技術を発明する 	invent a new technology 
家を出る 	leave the house 
時間ぴったりに到着する 	arrive on time 
国を発展させる 	develop a country 
健康状態を改善させる 	improve one's health 
Ａに取って代わられる 	be replaced by A 
科学の進歩 	scientific progress 
原因と結果 	cause and effect 
結果を得る 	get the results 
規則に反する 	be against the rules 
知識の土台 	a base of knowledge 
基本原則 	basic principles 
基本的人権 	fundamental human rights 
しかしながら，そうではない． 	It is not so, however . 
それは古いけれども， 	old though it is, 
小さいけれども 	although small 
お金を使う 	spend money 
大金を稼ぐ 	earn a fortune 
高価な洋服 	expensive clothes 
安いホテル 	a cheap hotel 
所得税 	income tax 
ぜいたくな生活をする 	live in luxury 
痛みを感じる 	feel a pain 
Ａの必要性に気づく 	perceive the need for A 
甘い香りがする 	smell sweet 
おいしい味がする 	taste good 
権力の座に上る 	rise to power 
手を挙げなさい． 	Raise your hand. 
Ａの高度で 	at a height of A 
いちばんいいものを選ぶ 	choose the best one 
何をするか決める 	decide what to do 
将来を決める 	determine our future 
深刻な状況 	a serious situation 
重要な違い 	a significant difference 
主な要因 	a major factor 
少しの修正 	minor changes 
教育制度 	the education system 
よく訓練された馬 	a well- trained horse 
大学を卒業する 	graduate from college 
共通の知識，常識 	common knowledge 
ふつうの生活に戻って 	back to a normal life 
ふつうの生活 	ordinary life 
定職 	a regular job 
定期点検 	a routine check 
西洋文化 	Western culture 
現代文明 	modern civilization 
観光産業 	the tourist industry 
すぐ後からついて行く 	follow closely behind 
両親に付き添われる 	be accompanied by parents 
小包にラベルをはる 	attach the label to your package 
個人の必要性 	individual needs 
個人の意見 	a personal opinion 
身元を証明するもの 	proof of identity 
価値が増す 	increase in value 
危険性を低下させる 	decrease the risk 
価格に付加する 	add to the price 
量を減らす 	reduce the amount 
かなりの額の金 	a large amount of money 
ネットを検索する 	search the Internet 
助言を求める 	seek advice 
真実を知る 	discover the truth 
少しも動けない 	can't move an inch 
科学の進歩 	scientific advance 
片足からもう一方に（体重を）移す 	shift from foot to foot 
私の命を救う 	save my life 
アイディアを提供する 	contribute ideas 
経験を必要とする 	require experience 
要求がありしだい 	on demand 
仕事で成功する 	succeed in business 
彼の試みに失敗する 	fail in his attempt 
同じ間違いをする 	make the same mistake 
人為的ミス 	a human error 
興味を失うこと 	loss of interest 
Ａかどうか 	whether or not A 
ほんとうに必要でなければ 	unless absolutely necessary 
丸い形 	a round form 
形になる 	take shape 
太った犬 	a fat dog 
醜い顔 	an ugly face 
アジア大陸 	the Asian continent 
東海岸 	the east coast 
岸まで泳ぐ 	swim to the shore 
船で世界中を旅する 	sail around the world 
自然の法則 	the laws of nature 
動物生態学 	animal ecology 
水を汚染する 	pollute the water 
自然環境 	the natural environment 
野生生物保護 	wildlife conservation 
排出規制 	emission controls
`;

// Placeholder data for other stages
const STAGE_DATA_TEMPLATE = `
データなしA 	No Data A
データなしB 	No Data B
データなしC 	No Data C
`;

const STAGE_DATA_2 = `
競争に勝つ 	win a race 
体重が減る 	lose one's weight 
惨敗 	a heavy defeat 
ニュースメディア 	the news media 
本を出版する 	publish a book 
生放送 	a live broadcast 
商品を宣伝する 	advertise the product 
ベストセラー作家 	the best-selling author 
特に重要な 	especially important 
特定の人 	a particular person 
緊急事態 	state of emergency 
秘密のままである 	remain a secret 
前方に傾く 	lean forward 
生卵 	a raw egg 
きれいな水，純水 	pure water 
あなたに再会する 	meet you again 
たくさんの困難に遭遇する 	encounter many difficulties 
5人で構成されている 	consist of 5 members 
参加する（直訳：部分を担う） 	take part 
重要な要因 	the key factor 
天然元素 	natural element 
食料品 	food items 
詳細に 	in detail 
彼の名前を覚えている 	remember his name 
パスワードを忘れる 	forget the password 
音を文字と結びつける 	associate sounds with letters 
その事実を考慮する 	consider the fact 
（あなたは）Ａしてはいけない 	You're not supposed to A 
（症状から）食中毒ではないかと思う 	suspect food poisoning 
サービスを提供する 	provide the service 
Ａにより多くの時間をささげる 	devote more time to A 
特別な申し出を受け取る 	receive special offers 
電力供給 	the power supply 
利率 	the interest rate 
Ａに比例して 	in proportion to A 
ほとんど不可能 	nearly impossible 
結果を予想する 	expect the result 
未来を予測する 	predict the future 
過ちを避ける 	avoid a mistake 
Ａの終わりに近づく 	approach the end of A 
連絡を絶やさない 	maintain the contact 
Ａに接近する 	gain access to A 
医療措置 	medical treatment 
生薬，漢方薬 	herbal medicine 
心臓病 	heart disease 
癌患者 	cancer patient 
研究論文 	a research paper 
ヨガの練習 	yoga practices 
実験を実施する 	conduct an experiment 
技術を身につける 	acquire a skill 
よい影響 	a positive influence 
副作用 	the side effect 
地域に影響を与える 	affect an area 
重大な変化 	a profound change 
人の心，人間の精神 	the human spirit 
想像してごらん． 	Just imagine . 
心の健康 	mental health 
重力 	force of gravity 
電気料金請求書 	an electricity bill 
全面的に同意する 	totally agree 
提案に反対する 	object to the proposal 
戦争に反対する 	oppose the war 
ご両親は賛成しているの？ 	Do your parents approve ? 
抗議運動 	protest movement 
情報を含む 	include the information 
原料［成分］を含む 	contain ingredients 
音を吸収する 	absorb sound 
注文をする 	place an order 
報告書を公表する 	release a report 
アクセスを制限する 	restrict access 
罰金を課す 	impose a fine 
兆候［気配］に気がつく 	notice the sign 
高く評価されている 	be highly regarded 
集団に属する 	belong to a group 
Ａの利益を代表する 	represent the interests of A 
ターゲットとしている視聴者に届く 	reach your target audience 
Ａの範囲をカバーする 	cover a range of A 
理論を支持する 	support the theory 
証拠を提示する 	provide the evidence 
Ａの存在を証明する 	prove the existence of A 
それゆえＡは重要である 	A is therefore important 
それで 	and thus 
大変価値のある 	of great value 
読む価値がある 	be worth reading 
貴重な経験 	a precious experience 
君なら（それを受けて）当然だ． 	You deserve it. 
視覚を失う 	lose one's sense of sight 
ストレスをやわらげる 	relieve stress 
身体運動 	physical exercise 
（自分の）息を止める 	hold my breath 
青ざめる 	turn pale 
手作業 	manual work 
難題に直面する 	face a challenge 
負担する（直訳：負担を負う） 	shoulder a burden 
辛辣な言葉づかいをする 	have a sharp tongue 
`;

const STAGE_DATA_3 =`
あなたの経験を分かち合う 	share your experience 
時事問題 	current affairs 
暴力事件 	a violent incident 
社会現象 	a social phenomenon 
Eメールをチェックする 	check my e-mail 
その研究ではＡを調査した． 	The study examined A. 
調査を実施する 	conduct the survey 
音を出す 	produce the sound 
大きな騒音 	a loud noise 
沈黙を保つ 	remain silent 
Ａへのアクセスを許可する 	allow access to A 
申し出を受ける 	accept the offer 
政策を採用する 	adopt a policy 
Ａの使用を許可する 	permit the use of A 
Ａを受け入れるのを拒む 	refuse to accept A 
提案を拒絶する 	reject a suggestion 
カードの表を下にして配る 	deal face down 
お金を等分に分ける 	divide the money equally 
膨大な量 	a huge amount 
大変な可能性を持つ 	have enormous potential 
小さくてかわいい女の子 	a tiny little girl 
微量 	a minute quantity 
長々と 	at full length 
事業を拡大する 	expand the business 
情報を提供する 	provide the information 
テレビ画面 	a television monitor 
彼女の携帯電話にかける 	call her cellularphone 
Ａのように見えるもの 	what appears to be A 
注意深く行動を観察する 	observe the behavior carefully 
スクリーンをじっと見つめる 	stare at the screen 
私のミスを大目に見る 	overlook my fault 
信頼できる目撃者 	a reliable witness 
田園風景 	a rural landscape 
去年の同じ時期 	the same period last year 
決勝戦 	the final round 
20年間 	for two decades 
春学期 	the spring term 
すぐに家に帰る 	go home immediately 
焦点をＡに移す 	shift the focus to A 
地球の核 	the core of the earth 
平均気温 	the average temperature 
お望みならば 	if you wish 
職に応募する 	apply for a job 
…したいという欲求を表す 	express a desire to do 
政府の職員；官僚 	a government official 
社長［大統領］に選ばれる 	be elected president 
外務大臣 	the foreign minister 
欧州議会 	the European parliament 
政治的指導者 	a political leader 
自信が足りない 	lack confidence 
空のビン 	an empty bottle 
距離を測定する 	measure the distance 
信頼できる雰囲気を作る 	create an atmosphere of trust 
膨大な証拠 	a mass of evidence 
有機材料 	organic materials 
1曲 	a piece of music 
Ａに役立つように意図されている 	be intended to help A 
彼の努力のかいもなく 	despite his effort 
故意に 	on purpose 
Ａにねらいを定める 	take aim at A 
Ａの機能を果たす 	perform the function of A 
満杯である（直訳：容量を満たしている） 	be filled to capacity 
高速が出る（能力がある） 	be capable of high speed 
潜在的な危険性 	a potential risk 
人にＡできるようにする 	enable a person to do A 
意見を述べる 	express an opinion 
Ａの所有権を主張する 	claim ownership of A 
Ａということが言えるかもしれない 	it could be argued that A 
当然のことを言う 	state the obvious 
話題を変える 	change the subject 
政治的な問題 	a political issue 
メインテーマ 	the main theme 
私の注意を引く 	catch my attention 
鳥を捕らえる 	capture a bird 
宇宙の起源 	the origin of the universe 
情報の発信源を特定する 	identify the source of information 
人材不足 	the lack of human resources 
私の夢を実現する 	realize my dream 
Ａの重要性を認識する 	recognize the importance of A 
善悪の区別をつける 	distinguish between right and wrong 
Ａの存在を認める 	acknowledge the existence of A 
大きな変化が起きる 	great changes occur 
Ａについて疑問が生じる． 	A question arises about A. 
財産の所有者 	a property owner 
莫大な資産がある 	possess a fortune 
財産を相続する 	inherit property 
購入価格 	the purchase price 
学費 	school expenses 
富の分配 	the distribution of wealth 
飢餓と貧困 	hunger and poverty 
行動を改める 	change behavior 
子どものようにふるまう 	behave like a child 
Ａを忘れがちである 	tend to forget A 
Ａを知ったかぶりはできない． 	I can't pretend to know A. 
インタビューを行う 	conduct an interview 
芸術は自然を模倣する． 	Art imitates nature. 
乗客を運ぶ 	carry passengers 
牛乳を配達する 	deliver milk 
日本から車を輸入する 	import cars from Japan 
商品を輸送する 	transport goods 
難局を処理する 	handle a difficult situation 
状況による 	depend on the circumstances 
均等な機会を得る 	have an equal opportunity 
あるとき 	on one occasion 
非常口 	an emergency exit 
天気が許せば 	if the weather permits 
気候変動 	climate change 
体温 	the body temperature 
あらしの前の静けさ 	the calm before the storm 
トランペットを吹く 	blow the trumpet 
`;

const STAGE_DATA_4 = `
関連記事 	related articles 
相対的な重要性 	the relative importance 
成功するかはＡしだいだ． 	Success depends on A. 
経済的に自立している 	be financially independent 
完全なリスト 	a complete list 
引き締まった筋肉 	firm muscles 
固形食 	solid food 
曲げやすいプラスチック 	flexible plastic 
勉強を続ける 	continue my education 
経済成長を維持する 	sustain economic growth 
古いやり方に固執する 	persist in the old ways 
現代のテクノロジー 	modern technology 
現代美術 	contemporary art 
古代都市 	the ancient city 
未開社会 	a primitive society 
現代 	the modern era 
起こりうる結果 	the likely outcome 
安全性を確認する 	ensure the safety 
将来の可能性（見通し） 	future prospects 
人類の平和 	the peace of mankind 
我々の古い先祖 	our early ancestors 
若々しいエネルギー 	the energy of youth 
健康な幼児 	a healthy infant 
健全な経済状況 	a sound economy 
人工衛星 	an artificial satellite 
世界の人口 	the world population 
銃規制 	gun control 
（大声などで）会話を支配する 	dominate the conversation 
世界を征服する 	conquer the world 
似た問題 	a similar problem 
平等の権利 	equal rights 
等しい価値 	equivalent value 
お互いに似ている 	resemble each other 
正確に一致する 	correspond exactly 
砂糖の代用品 	a sugar substitute 
親しい友人 	a close friend 
遠い未来 	the distant future 
領域を分ける 	separate the areas 
生演奏 	live music 
生き続ける 	stay alive 
攻撃から生き延びる 	survive the attack 
年配の人たち 	elderly people 
死体 	a dead body 
墓地に埋葬される 	be buried in the cemetery 
自殺未遂（直訳：試みられた自殺） 	an attempted suicide 
確かに 	for certain 
自信を持つ，信頼を築く 	build confidence 
勝利を確信している 	be convinced of victory 
彼女の身元を証明する 	confirm her identity 
自社の製品を売り込む 	promote our products 
すぐに適応する 	adapt quickly 
セッティングを調節する 	adjust the settings 
肉を冷凍する 	freeze meat 
成長を促す 	stimulate growth 
間違った主張 	the false claims 
実地の経験 	practical experience 
問題はＡに存在する． 	The problem exists in A. 
あらゆるリスクを想定する 	assume all risks 
法律上の権利 	the legal right 
常習的な犯罪者 	a habitual criminal 
無罪を宣告される 	be found not guilty 
犯罪者を罰する 	punish a criminal 
ベッドで横になる 	lie in bed 
土台を置く 	lay the foundation 
帽子を壁に掛ける 	hang my hat on the wall 
主要な役割 	a major role 
特別な身分 	a special status 
最高経営責任者の地位を提示する 	offer the post of CEO 
専門家チーム 	a team of experts 
最高経営陣 	top executives 
消極的な態度 	a negative attitude 
Ａを十分認識している 	be fully aware of A 
重要性に気づいている 	be conscious of the importance 
事実を無視する 	ignore the fact 
中心市街地 	urban centers 
株式資本 	share capital 
町の中心街で働く 	work downtown 
反対側 	the opposite side 
わきへどく 	step aside 
可能ならどこででも 	wherever possible 
文化的な伝統 	cultural traditions 
地方の慣習 	the local customs 
健康的な習慣 	healthy habits 
絶えず進化する 	evolve constantly 
新種 	a new species 
小型のほ乳動物 	a small mammal 
遺伝子を持っている 	carry a gene 
化石燃料 	fossil fuel 
絶滅の危険にさらされている鳥 	an endangered bird 
死火山 	an extinct volcano 
独特な特徴 	the unique characteristics 
新たな特徴 	a new feature 
さまざまな側面 	various aspects 
従業員を雇う 	employ workers 
アルバイトを雇う 	hire part-time workers 
申し込み用紙 	an application form 
ボランティア活動に携わっている 	be engaged in volunteer activities 
現代 	the present day 
しょっちゅう欠席している 	be regularly absent 
会議に出席する 	attend the meeting 
作品を演じる 	perform the work 
Ａの存在を示す 	indicate the presence of A 
クリスマスツリーを飾る 	decorate the Christmas tree 
真実を明らかにする 	reveal the truth 
一般公開 	public display 
極度のプレッシャー 	extreme pressure 
かなり難しい 	be rather difficult 
完全に新しい 	be totally new 
かなり単純である 	be fairly simple 
いくぶん驚いたように見える 	look somewhat surprised 
現在の流行 	the current trend 
黒いスーツ 	a black suit 
細長い布切れ 	a strip of cloth
`;

const STAGE_DATA_5 = `
損傷を受ける 	suffer an injury 
彼の生命を脅かす 	threaten his life 
重荷に耐える 	bear the burden 
在日外国人 	foreign residents in Japan 
アンティーク家具 	antique furniture 
建築様式 	the style of architecture 
地下水 	underground water 
幹線道路を建設する 	construct a highway 
完全に倒壊する 	collapse completely 
考えを提案する 	suggest the idea 
変更を提案する 	propose changes 
いいホテルを推薦する 	recommend a good hotel 
私に留まるよう強く勧める 	urge me to stay 
効果的な方法 	an effective method 
手段を提供する 	provide a means 
彼にいたずらをする 	play tricks on him 
何としてでも 	somehow or other 
Ａの理由で 	on account of A 
医療費請求書 	the medical bills 
Ａに多額の金を投資する 	invest heavily in A 
食事のしたくをする 	prepare meals 
会議の手配をする 	organize a conference 
会議の手はずを整える 	arrange a meeting 
有名なブランド 	the famous brand 
国際的な評判 	an international reputation 
利口な男性 	a clever man 
賢明な行動 	a smart move 
賢い選択 	a wise choice 
思慮のあるアドバイス 	sensible advice 
知的障害 	intellectual disabilities 
非常に頭のよい 	highly intelligent 
人工知能 	artificial intelligence 
単純な事実 	the simple fact 
複雑なシステム 	a complex system 
込み入った事情 	a complicated situation 
精巧なメカニズム 	an elaborate mechanism 
ほとんど驚くべきことではない 	be hardly surprising 
めったに起こらない 	rarely happen 
めったに見られない 	be seldom seen 
アクセスを拒否する 	deny access 
肯定的な側面 	the positive aspects 
強みがある，有利である 	have an advantage 
利益を提供する 	provide benefits 
利益を生み出す 	generate profits 
プログラムに参加する 	participate in the program 
リーダーのもとに団結する 	unite behind the leader 
上級職員 	a senior official 
代表サンプル 	a representative sample 
一般の人々 	ordinary folks 
事実に言及する 	refer to the fact 
彼の名をあげる 	mention his name 
詳細を知らされている 	be fully informed 
その問題について話し合う 	discuss the issue 
車を盗む 	steal a car 
軽犯罪を犯す 	commit a minor offense 
高等裁判所判事 	a high court judge 
重い罰金 	a heavy fine 
彼らの経験を分かち合う 	share their experiences 
リーフレットを配布する 	distribute leaflets 
少しだけ時間を割く 	spare a few minutes 
大いに（直訳：大きな度合いまで） 	to a large degree 
低学年 	the lower grades 
ある程度は 	to a certain extent 
比較的少数のＡ 	a relatively small number of A 
ただ単に時間の問題である 	be merely a question of time 
大きく異なる 	vary widely 
さまざまな種類 	various kinds 
多様な集団 	diverse groups 
今度の日曜日に予定されている 	be due next Sunday 
テーブルを予約する 	reserve a table 
東京行きを延期する 	postpone going to Tokyo 
歯医者の予約をする 	make a dentist's appointment 
市場戦略 	a marketing strategy 
刑に服する 	serve a sentence 
英文学 	English literature 
この文脈では 	in this context 
文章を翻訳する 	translate the text 
乗り物を操作する 	operate a vehicle 
エネルギーを消費する 	consume energy 
アルバイトの人を不当に使う 	exploit part-time workers 
利用可能な資源 	available resources 
必要な技能 	the necessary skills 
不可欠の栄養素 	an essential nutrient 
必然的な結末 	an inevitable consequence 
必然的にＡを必要とする 	necessarily need A 
人口を見積もる 	estimate the population 
人々を困惑させる 	confuse people 
疑いをかける 	cast doubt 
ロマンチックな出会いを想像する 	conceive a romantic meeting 
自由経済 	a free economy 
財政援助 	financial assistance 
国際貿易 	international trade 
経済的繁栄 	economic prosperity 
情報を交換する 	exchange information 
社会を変革する 	transform society 
私の見方を変える 	modify my views 
Ａの流れを変える 	alter the course of A 
突然破裂する 	burst suddenly 
政治改革 	political reform 
特別な興味 	a special interest 
熱心なファン 	eager fans 
無関心な態度 	an indifferent attitude 
退屈な映画 	a dull movie 
プロジェクトを管理する 	manage the project 
商業の中心地 	a commercial center 
教職 	a teaching career 
低賃金労働 	cheap labor 
営業部 	the sales department 
`;

const STAGE_DATA_6 = `
地域社会 	the local community 
地方全体 	the entire region 
日本の領土 	Japanese territory 
商店街 	the shopping district 
北部郊外に住む 	live in the northern suburbs 
性格と異なる，柄に合わない 	out of character 
積極的参加 	active participation 
好奇心に満ちた目 	curious eyes 
脳細胞 	brain cells 
有害なバクテリア 	harmful bacteria 
動物性タンパク質 	an animal protein 
本能で 	by instinct 
女性の登場人物 	the female characters 
男性の友人 	a male friend 
急速に繁殖する 	reproduce rapidly 
議論を締めくくる 	conclude the argument 
マイナスの結果 	negative consequences 
結局Ａになる 	eventually become A 
結婚してくれませんか？ 	Will you marry me? 
離婚率 	the divorce rate 
交流する方法 	a way to interact 
明白な疑問 	the obvious question 
明らかな変化 	an apparent change 
語を定義する 	define the term 
交通事故 	traffic accident 
電気自動車 	electric vehicles 
世界経済 	the global economy 
全世界に通用する魅力 	a universal appeal 
世界的な認知 	worldwide recognition 
市場に参入する 	enter the market 
地域を囲む 	surround the area 
その国を孤立させる 	isolate the country 
村を占領する 	occupy a village 
ニューヨークに移る 	transfer to New York 
正しい方向 	the right direction 
日光を反射する 	reflect sunlight 
決定をくつがえす 	reverse a decision 
前へ動く 	move ahead 
肉体と魂 	body and soul 
精神的ストレス 	emotional stress 
そんなのばかげている! 	That's crazy ! 
生き残るために努力する 	struggle for survival 
問題を解決する 	settle the case 
負の感情 	negative emotions 
緊張状態 	nervous tension 
私がリラックスするのに役立つ 	help me relax 
聴衆に感銘を与える 	impress the audience 
何を悩んで（直訳：何があなたを悩ませて）いるの？ 	What's bothering you? 
装置をつなぐ 	connect the device 
強い関連がある 	be strongly linked 
要素を結合させる 	combine elements 
主な理由 	a chief reason 
きわめて重要な役割 	a vital role 
主任研究員 	the principal investigator 
決定的な要因 	a crucial factor 
最後の決断を下す 	make the ultimate decision 
事実を強調する 	emphasize the fact 
新聞を広げる 	spread the newspaper 
期限を延ばす 	extend the deadline 
子どもたちの間で広まっている 	prevail among children 
名誉を受ける 	receive the honor 
彼女の成果を誇りに思っている 	be proud of her accomplishments 
恥じる必要のないこと 	nothing to be ashamed of 
恥ずかしそうに見える 	look embarrassed 
彼の罪を認める 	admit his guilt 
必要性を確認する 	identify the need 
Ａの意味を解釈する 	interpret the meaning of A 
自由民主主義 	liberal democracy 
自由主義的な考え方 	a liberal view 
大統領選挙 	the presidential election 
無所属の立候補者 	an independent candidate 
キャンペーンを起こす 	launch a campaign 
最新技術 	the latest technology 
つい最近 	just lately 
最近発売された 	recently released 
しかし今日では， 	but nowadays , 
現在の状況 	the current situation 
Ａについての知識を得る 	gain knowledge about A 
情報を得る 	obtain information 
目標を達成する 	achieve the objectives 
私の仕事を成し遂げる 	accomplish my task 
満足感を得る 	derive satisfaction 
私の責任を果たす 	fulfill my responsibility 
この方法のほうを好む 	prefer this method 
犯罪を憎む 	hate crimes 
その考えを嫌う 	dislike the idea 
福祉サービス 	welfare service 
献身的なボランティア 	dedicated volunteers 
障害をもつ人々 	disabled people 
障害をもつ子ども 	handicapped children 
目の見えない男性 	a blind man 
耳が聞こえない人 	a deaf person 
生徒を勇気づける 	encourage students 
真実を話す勇気がある 	have the courage to tell the truth 
勇気を出して！ 	Be brave ! 
的をはずす 	miss the target 
仕事を試みる 	attempt the task 
仕事の目標 	business objectives 
犯罪の動機 	the motive for the crime 
最終目的地 	the final destination 
またとない経験 	a unique experience 
費用を比べる 	compare the costs 
明確な対照 	a sharp contrast 
概数で 	in round figures 
第一四半期，第一クォーター 	the first quarter 
1ダースの卵 	a dozen eggs 
少ない量 	small quantities 
`;

const STAGE_DATA_7 = `
正確な情報 	the correct information 
正確な測定，寸法 	an accurate measurement 
正確な報告書 	a precise report 
まったく同じ 	exactly the same 
私を怒らせる 	make me mad 
みじめな失敗 	a miserable failure 
必死の試み 	a desperate attempt 
感情を害されたように見える 	look offended 
いらいらしている（直訳：いらいらさせられている） 	be frustrated 
いらいらする（直訳：いらいらさせられる） 	get irritated 
同じ種類 	the same sort 
さまざまな部門 	various categories 
典型的な例 	a typical example 
Ａについては賞賛に値する 	deserve praise for A 
彼女の美しさを賞賛する 	admire her beauty 
責めないで． 	Don't blame me. 
政府を批判する 	criticize the government 
暴力行為を強く非難する 	condemn violence 
それは不公平だ. 	That's not fair . 
適切な処置 	appropriate treatment 
適切な配慮，世話 	proper care 
安全な場所 	a secure place 
危険な状況 	a dangerous situation 
脅迫をする 	make a threat 
消費者にＡを警告する 	warn consumers of A 
食糧危機 	a food crisis 
データを収集する 	collect data 
群衆が集まる． 	A crowd gathers . 
集中するのが難しいとわかる 	find it difficult to concentrate 
タイミングよく 	in a timely manner 
正式な合意 	a formal agreement 
礼儀正しい会話 	polite conversation 
こわれやすい陶器 	delicate china 
衝突を回避する 	avoid conflict 
批判的なスピーチ 	a critical speech 
高いレベルで競う 	compete at a high level 
自然災害 	a natural disaster 
洪水警報 	flood warning 
大飢饉 	a great famine 
Ａの犠牲になる 	fall victim to A 
悲劇的な結末を迎える 	end in tragedy 
一時避難所 	a makeshift shelter 
健康保険 	health insurance 
要望に応じる 	respond to requests 
メッセージに返事をする 	reply to the message 
状況に反応する 	react to the situation 
彼らの能力を証明する 	demonstrate their ability 
…するのは妥当だ 	it is reasonable to do 
合理的な決断 	a rational decision 
彼女の論理を受け入れる 	accept her logic 
思わず，不本意にも 	despite yourself 
健康を維持する 	maintain health 
記憶を維持する 	preserve the memory 
支配権を保持する 	retain control 
Ａへのアクセス権を与える 	grant access to A 
役を割り当てる 	assign a role 
犠牲を払う 	make sacrifices 
報酬として 	as a reward 
教育機関 	an educational institution 
一般市民 	ordinary citizens 
性差 	the gender gap 
組織の構造 	the organizational structure 
全人口 	the entire population 
全体的な効果 	the overall effect 
権利を守る 	protect the rights 
侵略戦争 	an aggressive war 
自由を守る 	defend freedom 
都市を侵略する 	invade a city 
金属製である 	be made of metal 
金鉱 	a gold mine 
肥えた土地 	fertile soil 
手を貸す 	lend a hand 
お金を借りる 	borrow money 
いくらお借りしてましたっけ？ 	How much do I owe you? 
車をレンタルする 	rent a car 
クレジットカードの利用限度額 	the credit limit 
海外旅行をする 	travel abroad 
不法移民 	an illegal immigrant 
国内総生産 	gross domestic product 
ヘリコプターによって救助される 	be rescued by helicopter 
Ａの創造を助ける 	assist in the creation of A 
金融援助 	financial aid 
彼に大変な頼み事をする（直訳：親切な行為を求める） 	ask him a big favor 
快適な部屋 	a comfortable room 
満足している消費者 	satisfied consumers 
声を大にして不満を言う 	complain loudly 
春になると現れる 	emerge in spring 
視界から消える 	disappear from view 
跡形もなく消える 	vanish without trace 
オリーブの枝 	an olive branch 
ヒマワリの種 	sunflower seeds 
問題の根幹 	the root of the problem 
患者を治療する 	treat a patient 
いやいやながらのほほえみ 	a reluctant smile 
一瞬ためらう 	hesitate for a moment 
多国籍企業 	a multinational corporation 
旅行代理店 	a travel agency 
重要な依頼人 	an important client 
契約書にサインする 	sign a contract 
教職 	the teaching occupation 
一休みする 	take a rest 
レジャー活動 	leisure activities 
スキーリゾート 	a ski resort 
病気休暇 	sick leave 
足を痛める 	hurt my foot 
膝を痛める 	injure my knee 
けがから回復する 	recover from injuries 
自然治癒 	natural cure 
ひどい頭痛 	a severe headache 
`;

const STAGE_DATA_8 = `
見慣れた顔 	a familiar face 
1マイル離れている 	be a mile apart 
遠く離れている場所 	remote areas 
子どもをしかる 	scold a child 
公に謝罪する 	apologize publicly 
彼の罪を許す 	forgive his sins 
メッセージを伝える 	convey a message 
情報を送る 	transmit information 
表面をひっかく，こする 	scratch the surface 
Ａの下［底，最下部］に 	at the bottom of A 
端を切断する 	cut edges 
平らな屋根 	a flat roof 
大雑把な見積もり 	a rough estimate 
円滑な移行 	a smooth transition 
ゆるんだ結び目 	a loose knot 
きつい靴 	tight shoes 
むだを減らす 	reduce waste 
家庭ごみ 	household garbage 
（公園などの）くずかご 	a trash basket 
多くの燃料を使う 	use a lot of fuel 
完全に溶ける 	melt completely 
じゃがいもをゆでる 	boil potatoes 
原子力発電所 	a nuclear power plant 
全宇宙 	the entire universe 
太陽光発電 	solar power 
火星の衛星 	a satellite of Mars 
理想的な解決策 	the ideal solution 
すばらしいサービス 	excellent service 
すぐれた業績 	superior performance 
いやな気分になる 	feel terrible 
深刻な害をもたらす 	cause serious harm 
上限 	the upper limit 
最大限に 	to the maximum 
公式の統計 	official statistics 
非常に重い（直訳：1トンの重さがある） 	weigh a ton 
限界を超える 	exceed the limit 
被害を防ぐ 	prevent damage 
株価の下落を予想する 	forecast a drop in stock prices 
経済発展を予期する 	anticipate economic development 
彼の社交的な性格 	his outgoing personality 
気前のよい申し出 	a generous offer 
十分に成熟している 	be mature enough 
けだるい午後 	a lazy afternoon 
わがままなふるまい 	selfish behavior 
敏感な肌 	sensitive skin 
彼女の疲れた目 	her tired eyes 
私を精神的に疲れ果てさせる 	exhaust me mentally 
損傷を修復する 	repair the damage 
自転車を修理する 	fix my bike 
靴を修繕する 	mend shoes 
新しい技術を習得する 	master a new technique 
意味をよく理解する 	grasp the meaning 
歴史学者 	a history scholar 
権利を主張する 	insist on the right 
政府を説得する 	persuade the government 
激しい討論 	a heated debate 
記者会見 	a press conference 
手術を行う 	conduct an operation 
心臓外科医 	a heart surgeon 
私のかかりつけの医師 	my personal physician 
ひどいけがをしている（直訳：ひどく負傷させられている） 	be badly wounded 
症状を引き起こす 	cause symptoms 
臓器移植 	organ transplant 
大きな驚き 	a big surprise 
彼の驚いた表情 	his surprised expression 
Ａを見て驚く 	be amazed to see A 
劇的な変化 	a dramatic change 
異常な状況 	unusual circumstances 
まれな機会 	rare occasions 
異常な状況 	extraordinary circumstances 
奇妙な人々 	odd people 
在来植物 	native plants 
民族集団 	an ethnic group 
人種，人類 	the human race 
砂漠で生活する部族 	a desert tribe 
独立を宣言する 	declare independence 
和平交渉をする 	negotiate for peace 
Ａの重要性を誇張する 	exaggerate the importance of A 
来客を迎える 	greet the guests 
単語を発音する 	pronounce a word 
やさしくささやく 	whisper softly 
カロリーを計算する 	count calories 
費用を計算する 	calculate the cost 
たくさんの例 	numerous examples 
子どもを教育する 	educate a child 
講義に出席する 	attend a lecture 
厳しい訓練 	strict discipline 
前大統領 	the former President 
無作為標本 	a random sample 
事実を隠す 	hide the fact 
スパイを見破る 	detect a spy 
アジトの場所を突き止める 	locate a safe house 
命令に従う 	obey orders 
貿易を規制する 	regulate trade 
命令を発する 	give a command 
地方自治体 	the local authorities 
奴隷になる 	become a slave 
自由の女神像 	the Statue of Liberty 
ぴったり合う 	fit perfectly 
蝶ネクタイ 	a bow tie 
裸体 	a naked body 
私の友達を信頼する 	trust my friend 
Ａに対する信用を失う 	lose faith in A 
街路をぶらぶらする 	wander the streets 
海にこぎ出す 	row out to the sea 
携帯機器 	mobile devices 
Ａに関わる（直訳：自分自身を伴う） 	involve oneself in A 
情報に頼る 	rely on information 
相互理解 	mutual understanding 
金曜日以外はいつでも 	anytime except Friday 
チームを奮い立たせる 	inspire the team 
君をがっかりさせたくないんだけど， 	I hate to disappoint you, 
Ａを見て（私は）残念に思う 	it depresses me to see A 
Ａを見るといらいらする 	it annoys me when I see A 
お悔やみの言葉 	a message of sympathy `;

const STAGE_DATA_9 = `
注射針を突き刺す 	stick a needle 
新聞をひもで束ねる 	bind newspapers with string 
広範囲 	a vast range 
広義 	a broad sense 
農業に使われる 	used for agriculture 
豊作 	a good crop 
収穫期 	harvest time 
畑を耕す 	cultivate a field 
障壁を取り除く 	remove barriers 
問題をなくす 	eliminate the problem 
脂肪分を除く 	exclude fat 
さもないと，かぜをひくよ． 	Otherwise , you'll get a cold. 
それにもかかわらず，彼らは成功した． 	Nevertheless , they succeeded. 
古いほうはより安いが， 	whereas the old one is cheaper, 
もし宿題を終えたなら 	provided that you finish your homework 
明るい未来 	a bright future 
明るい日ざし 	brilliant sunshine 
細胞を破壊する 	destroy the cells 
封筒を破ってあける 	tear an envelope open 
ダイナマイトを爆発させる 	explode dynamite 
古代ローマ遺跡 	ancient Roman ruins 
世界の残り（の地域） 	the rest of the world 
支払いができるお金がある 	afford the payments 
追加費用 	the extra cost 
そのうえ，それは見栄えがする． 	Besides , it looks great. 
暗号を解読する 	break a code 
まったくわからない(直訳：手がかりがない） 	have no clue 
神秘的な力 	a mysterious power 
警察からの要請により 	at the request of the police 
要望を出す 	launch an appeal 
自発的な参加者たち 	willing participants 
記念日を祝う 	celebrate the anniversary 
宗教的儀式 	a religious ritual 
葬儀 	a funeral service 
株に投資する 	put money into stocks 
予算を超える 	go over a budget 
借金をする 	get into debt 
前年 	the previous year 
長時間の遅延 	a long delay 
可能なときはいつでも 	whenever possible 
重傷 	severe injuries 
あわてないで． 	Don't be upset . 
怖いからやめてよ！ 	You're frightening me! 
歯痛に耐える 	endure a toothache 
年収 	an annual income 
常連客 	a frequent customer 
プロセスを繰り返す 	repeat the process 
障害に立ち向かう 	face an obstacle 
問題をうまく処理する 	handle the issue 
困難に打ち勝つ 	overcome a difficulty 
問題を処理する 	cope with the problem 
宗教を実践する 	practice their religion 
古代の神話 	ancient myth 
平和を祈願する 	pray for peace 
道徳的価値 	moral values 
倫理的な基準 	an ethical standard 
Ａを法の裁きにかける 	bring A to justice 
急成長 	the rapid growth 
素早い行動 	a prompt action 
ラッシュアワーに 	during rush hour 
徐々にＡになる 	gradually become A 
自然と調和して暮らす 	live in harmony with nature 
安定した環境 	a stable environment 
しっかりとした手つき 	a steady hand 
成功を保証する 	guarantee success 
私が保証します． 	I can assure you. 
軍隊 	military forces 
軍に入隊する 	join the army 
核兵器 	nuclear weapons 
敵軍兵士 	an enemy soldier 
撤退を余儀なくされる 	be forced to withdraw 
恋愛物語 	a romantic tale 
言い伝えによると， 	according to legend , 
大きなうそ 	a big lie 
Ａについて意見を述べる 	remark on A 
特定のニーズ 	the specific needs 
一見して明らかだ 	be plain to see 
具体的な証拠 	concrete evidence 
喫煙をやめる 	quit smoking 
喫煙をやめさせる 	discourage smoking 
退役する 	retire from service 
知事職を辞する 	resign as Governor 
ソフトウエアを更新する 	update software 
オンラインオークション 	an online auction 
深く感謝している 	be deeply grateful 
あなたの努力をありがたく思う 	appreciate your effort 
私にとってうれしいことに 	to my delight 
スペインとフランスの国境 	the border between Spain and France 
境界線を引く 	set a boundary 
無限の数 	an infinite number 
運がいい 	have the good fortune 
幸せな結婚生活 	a fortunate marriage 
運命のいたずらで 	by a twist of fate 
新しい概念 	a new concept 
あいまいな考え 	a vague notion 
異なった視点から 	from a different perspective 
人種的偏見 	racial prejudice 
保守的な社会 	a conservative society 
空想の世界 	a fantasy world 
幻想を抱いていない 	have no illusions 
古い迷信 	an old superstition 
緊急のメッセージ 	an urgent message 
致命的な事故 	a fatal accident 
取るに足りない出来事 	a trivial incident 
あなたの内なる声 	your inner voice 
目次（直訳：内容の一覧） 	table of contents 
それでＡを思い出した． 	That reminds me A. 
私の記憶が正しければ（直訳：私が正しく思い出すなら）， 	If I recall correctly, 
詩を覚える 	memorize a poem 
全く後悔していない 	have no regret 
私の座右の友 	my constant companion 
運のいいやつ 	a lucky fellow 
仕事の同僚 	work colleagues 
共通の知人 	a mutual acquaintance 
義務を果たす 	perform their duties 
我々の非を認める 	admit our fault 
責任ある態度 	a responsible attitude 
親から面倒を見てもらえない子どもたち 	neglected children 
勉強する権利を奪われている 	be deprived of the right to study 
盗難にあう（直訳：盗まれる） 	get robbed 
告発されている 	stand accused 
殺人未遂 	an attempted murder 
脱獄する 	break out of prison 
安全装置 	a safety device 
楽器を演奏する 	play an instrument 
キャスター付きのテーブル 	a table on wheels 
引き金を引く 	pull the trigger 
5つの特徴的なグループ 	five distinct groups 
間違いなく最高だ 	be definitely the best 
漠然とした考え 	a vague idea 
わずかな変化 	a subtle change 
洗練された作法 	sophisticated manners 
悪霊 	an evil spirit 
無礼な行動 	rude behavior 
子どもをいじめる 	bully children 
おいしい食べ物 	delicious food 
健康食 	healthy diet 
穀物市場 	the grain market 
小麦畑 	a field of wheat 
食欲不振 	loss of appetite 
栄養不足 	poor nutrition 
餓死する（直訳：死に至るまで飢える） 	starve to death
`;

const STAGE_DATA_10 = `
重要な点を説明する 	illustrate a point 
隠されていた真実を明らかにする 	expose the hidden truth 
新しいデザインの衣服を展示する 	exhibit new designs of clothes 
その名が示すとおり 	as the name implies 
プロセスを分析する 	analyze the process 
効果を査定する 	assess the effects 
可能性を探る 	explore the possibility 
状況を調査する 	investigate the situation 
定期的な再調査 	a regular review 
議論に巻き込まれる 	get into a dispute 
激しい口げんか 	a bitter quarrel 
反対の意見 	contrary opinions 
変化に抵抗する 	resist change 
平和を乱す 	disturb the peace 
お話中（直訳：じゃまして）すみません， 	Sorry to interrupt , 
改革を続行する 	proceed with reforms 
正しい順序で 	in the correct sequence 
愚かな間違い 	a stupid mistake 
愚かな決定 	a foolish decision 
ばかげた考え 	a silly idea 
ばかげて見える 	look ridiculous 
心配そうな顔つき 	an anxious look 
恐ろしい夢 	a horrible dream 
己の恐怖に打ち勝つ 	overcome my fear 
ストレスを解消する 	handle strain 
弁護士に意見を求める 	consult a lawyer 
十分な証拠 	sufficient evidence 
十分な説明 	an adequate explanation 
水不足 	water shortage 
優しいほほえみ 	a gentle smile 
厳しいコーチ 	a strict coach 
気楽に暮らす 	live at ease 
寒さの厳しい冬 	a harsh winter 
国外へ逃亡する 	flee the country 
ゴールをひたすらに目指す 	pursue a goal 
絶え間ない変化 	constant change 
10時間もつ 	last for 10 hours 
生産をやめる 	cease production 
彼の運転免許を停止にする 	suspend his driver's license 
過食 	excessive eating 
大成功 	tremendous success 
圧倒的多数 	an overwhelming majority 
内臓 	the internal organs 
外見 	the external appearance 
多数決 	a majority vote 
新しい校長を任命する 	appoint a new principal 
代替エネルギー 	alternative energy 
現実逃避する 	escape from reality 
すりを追いかける 	chase after a pickpocket 
直接の結果 	a direct result 
家庭内の問題に干渉する 	interfere in family problems 
注意を引く 	attract attention 
ますます魅了される 	become increasingly fascinated 
大きな魅力 	great charm 
他の人々に伝染する 	infect other people 
ウイルスを取り除く 	remove viruses 
薄い本 	a thin book 
厚手のコート 	a thick coat 
窓枠 	the frame of a window 
病気になる 	become ill 
免疫システム 	an immune system 
Ａの天賦の才がある 	have a natural talent for A 
天才的なひらめき 	a stroke of genius 
最も効率的な方法 	the most efficient way 
歴史を専攻する 	specialize in history 
性的虐待 	sexual abuse 
失業率 	the unemployment rate 
人種差別 	racial discrimination 
莫大な量のＡ 	considerable amount of A 
厳しい暑さ 	intense heat 
わずかな増加 	a slight increase 
単なる事実 	the mere fact 
Ａが完全にない 	be absolutely free of A 
中火で 	over medium heat 
事件を徹底的に調査する 	investigate a case thoroughly 
薬を生産する 	manufacture drugs 
電力を発生させる 	generate electricity 
オペラを作曲する 	compose an opera 
学校を設立する 	found a school 
利益を生む 	yield profit 
読み書き教室 	a literacy class 
ことわざにあるとおり 	as the proverb goes 
口約束 	a verbal promise 
言語の運用能力 	linguistic skills 
大統領に歓声を送る 	cheer the President 
恐怖で悲鳴をあげる 	scream with fear 
テーマ曲 	a theme tune 
2番ホームから出発する 	depart from platform 2 
ロケットを打ち上げる 	launch a rocket 
クマの足跡 	a bear's tracks 
跡形もなく 	without a trace 
出席を取る（直訳：名簿の名前を呼ぶ） 	call the register 
楽しい経験 	a pleasant experience 
人気のある趣味 	a popular hobby 
Ａをおもしろいと思う 	see the humor in A 
聴衆を楽しませる 	entertain the audience 
スチームアイロン 	a steam iron 
炭鉱 	a coal mine 
永久歯 	permanent teeth 
時代遅れの考え方 	an old-fashioned way of thinking 
簡潔な説明 	a brief description 
一時的な仕事 	a temporary job 
短期間で 	in a short time span 
不況に直面する 	confront a recession 
紛争を解決する 	resolve a dispute 
重荷を背負う 	carry the burden 
二酸化炭素 	carbon dioxide 
酸性雨 	acid rain 
浅海 	a shallow sea 
表面的な知識 	a superficial knowledge 
地面を掘る 	dig the ground 
ゆっくりと沈む 	sink slowly 
アルコール飲料の販売を禁止する 	prohibit the sale of alcohol 
国際的に禁止されている 	be banned internationally 
武器の輸入を禁止する 	forbid the import of weapons 
奴隷制度を廃止する 	abolish slavery 
有毒物質 	toxic substances 
いい物 	good stuff 
液状で 	in liquid form 
水を注ぐ 	pour water 
自由に漂う 	float freely 
牛乳を床中にこぼす 	spill milk all over the floor 
うれし涙を流す 	shed tears of joy 
かつては…ができた 	used to be able to do 
伝統的な方法 	a conventional way 
知恵と美徳 	wisdom and virtue 
ひどいにおい 	an awful smell 
景観を損なう 	spoil the view 
だまされちゃだめだよ！ 	Don't be deceived ! 
優雅なホテル 	an elegant hotel 
重要な役割を果たす 	play a prominent part 
針金を曲げる 	bend a wire 
公園の中を曲がりくねっている 	wind through the park 
深く頭を下げる 	bow deeply 
楽観的な雰囲気 	an optimistic mood 
控えめな提案 	a modest proposal 
残酷な行為 	a cruel act 
熱血教師 	a keen teacher 
熱狂的なサポーターたち 	enthusiastic supporters 
平静さを保つ（直訳：平静なままでいる） 	keep calm 
退屈する 	get bored 
新たな冒険 	a new adventure
`;

const getRawDataForStage = (stage: number): string => {
  switch (stage) {
    case 1: return STAGE_DATA_1;
    case 2: return STAGE_DATA_2;
    case 3: return STAGE_DATA_3;
    case 4: return STAGE_DATA_4;
    case 5: return STAGE_DATA_5;
    case 6: return STAGE_DATA_6;
    case 7: return STAGE_DATA_7;
    case 8: return STAGE_DATA_8;
    case 9: return STAGE_DATA_9;
    case 10: return STAGE_DATA_10;
    default: return STAGE_DATA_1;
  }
};

export const getStagePairs = (stage: number = 1): ChunkPair[] => {
  const rawData = getRawDataForStage(stage);
  const lines = rawData.split(/\r?\n/).filter(line => line.trim() !== '');
  const allPairs: ChunkPair[] = [];

  lines.forEach((line, index) => {
    // Split by tab or double space
    const parts = line.split(/\t|\s{2,}/);
    if (parts.length >= 2) {
      allPairs.push({
        id: `stage${stage}-${index}`,
        japanese: parts[0].trim(),
        english: parts[1].trim()
      });
    }
  });

  // Return ALL pairs, randomly shuffled
  return allPairs.sort(() => Math.random() - 0.5);
};
