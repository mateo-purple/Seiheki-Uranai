const DISLIKE_DELETE_THRESHOLD = 5;
const TRAIT_REPORT_DELETE_THRESHOLD = 5;
const TRAIT_REQUEST_APPROVE_THRESHOLD = 2;
const RESET_STORAGE_VERSION = "request-report-v1";
const HIDDEN_TRAIT_LABEL = "非公開項目";
const IP_LOOKUP_URL = "https://api.ipify.org?format=json";

const DEFAULT_LUCKY_ITEMS = [
  {
    name: "スカート",
    desc: "軽やかに揺れる距離感が今日の追い風です。",
    image: ""
  }
];

const DETAIL_COMMENT_PATTERNS = [
  [
    "「{trait}」は朝イチから反応が速い日。{item}を見たら、アンテナが一段だけ立ちます。",
    "今日の{trait}は目覚まし直後がピーク。{item}があると、刺さる角度がかなり見つけやすいです。",
    "{trait}の気配が強め。{item}を合図にすると、順位{rank}らしい勢いが出ます。"
  ],
  [
    "{trait}は静かに始まって後から効くタイプ。{item}が近くにあると、じわじわ主張してきます。",
    "今日は{trait}を急がせないのが吉。{item}の説明どおり、余韻を残すと強いです。",
    "{trait}はゆっくり点火。{item}を置いておくと、午後に小さく巻き返します。"
  ],
  [
    "順位{rank}の{trait}は、ちょっと意外な角度から来ます。{item}があると発見率が上がります。",
    "今日の{trait}は予想外枠。{item}を見た瞬間に、刺さる理由がわかるかも。",
    "{trait}は変化球の日。{item}がその変化球を受け止めるラッキーアイテムです。"
  ],
  [
    "{trait}は見た目より繊細。{item}があると、細部のツボに気づきやすくなります。",
    "今日は{trait}の細かいニュアンスが光ります。{item}をきっかけに観察モードへ。",
    "{trait}は小さな差分で勝つ日。{item}がその差分を拾ってくれます。"
  ],
  [
    "{trait}は勢いより間が大事。{item}を挟むと、ちょうどいいテンポになります。",
    "今日の{trait}は余白が魅力。{item}があると、詰めすぎない良さが出ます。",
    "{trait}は間合い勝負。{item}を意識すると、順位{rank}でも存在感があります。"
  ],
  [
    "今日は{trait}が少し照れています。{item}を添えると、その照れが味になります。",
    "{trait}は照れ隠しが強い日。{item}があると、かわし方まで楽しめます。",
    "{trait}の照れポイントが浮上中。{item}を見つけたら深追いしすぎないのが吉。"
  ],
  [
    "{trait}は朝より夜に伸びます。{item}はその伸びしろを残すための目印です。",
    "今日の{trait}は後半型。{item}をキープしておくと、夜に効いてきます。",
    "{trait}は遅れて刺さるタイプ。{item}があると、その遅効性がいい感じになります。"
  ],
  [
    "{trait}は今日はクセ強め。{item}があると受け止めやすくなります。",
    "今日の{trait}は少し濃いめ。{item}で温度を整えると楽しみやすいです。",
    "{trait}が濃く出る日。{item}を添えて、軽めに眺めるのがちょうどいいです。"
  ],
  [
    "{trait}は王道から半歩ずれたところが魅力。{item}がその半歩を目立たせます。",
    "今日は{trait}のズレが良い方向に出ます。{item}があれば迷わず拾えます。",
    "{trait}は少し外した位置で光ります。{item}がそのズレをラッキーに変えます。"
  ],
  [
    "{trait}は言葉にすると強くなる日。{item}の説明を借りて、ちゃんと名付けるのが吉。",
    "今日の{trait}は言語化で伸びます。{item}があると、ツボの説明がしやすくなります。",
    "{trait}は名前を呼ぶほど存在感が増します。{item}とセットで覚えておくと強いです。"
  ],
  [
    "{trait}は軽いノリで扱うと吉。{item}があると、重たくならずに楽しめます。",
    "今日は{trait}を真面目に語りすぎない方が良さげ。{item}で軽く流すとちょうどいいです。",
    "{trait}は冗談半分くらいが強い日。{item}が場の温度をほどよく下げます。"
  ],
  [
    "{trait}は一点突破型。{item}を見つけたら、今日はそこだけ見れば十分です。",
    "今日の{trait}はピンポイントで刺さります。{item}がその一点を照らします。",
    "{trait}は広げるより絞る日。{item}を軸にすると迷いません。"
  ],
  [
    "{trait}は意外とやさしい日。{item}があると、とげが丸くなって見えます。",
    "今日は{trait}の柔らかい側面が出ます。{item}で受け止めると穏やかです。",
    "{trait}は攻めより包み込み。{item}がその柔らかさを引き出します。"
  ],
  [
    "{trait}は順位{rank}でも油断できません。{item}があると急に存在感を出します。",
    "今日の{trait}は低めに見えて伏兵です。{item}をきっかけに急浮上するかも。",
    "{trait}は静かな伏兵。{item}があると、ふとした瞬間に目立ちます。"
  ],
  [
    "{trait}は組み合わせで化けます。{item}と一緒なら、いつも以上に感じる日。",
    "今日は{trait}単体よりセット運。{item}が隣にあると一気に輪郭が出ます。",
    "{trait}は相棒次第。{item}があると、いつもより扱いやすいです。"
  ],
  [
    "{trait}は観察向き。{item}を目印に、今日は眺める側で楽しむのが吉。",
    "今日の{trait}は見守るほど味が出ます。{item}が観察ポイントです。",
    "{trait}は近づきすぎない方が光ります。{item}越しに見るくらいがちょうどいいです。"
  ],
  [
    "{trait}は朝のテンションと相性よし。{item}があれば、起き抜けの勘が働きます。",
    "今日の{trait}は目覚めが勝負。{item}を見たら一日のテーマにしてよさそう。",
    "{trait}は朝に名前を出すと伸びます。{item}がそのスイッチです。"
  ],
  [
    "{trait}は今日、少しレトロに見えます。{item}があると懐かしい味が出ます。",
    "今日は{trait}に懐かしさが混ざります。{item}で古き良きムードを拾えます。",
    "{trait}はレトロ補正の日。{item}がその空気をきれいにまとめます。"
  ],
  [
    "{trait}は予告なしに刺さります。{item}を見たら、突然のヒットに備えて。",
    "今日の{trait}は不意打ち型。{item}があると、刺さった理由をあとで説明できます。",
    "{trait}は急に来ます。{item}がその瞬間の目印になります。"
  ],
  [
    "{trait}は少しだけ背伸びしたい日。{item}があれば、無理なく一段上へ行けます。",
    "今日は{trait}に背伸び感があります。{item}を使うと気取りすぎず決まります。",
    "{trait}は上品に盛ると吉。{item}がその盛り方を整えます。"
  ],
  [
    "{trait}は下位でも個性が残ります。{item}があると、その個性を笑って楽しめます。",
    "今日の{trait}は順位より味。{item}を添えれば、低めでもちゃんと楽しいです。",
    "{trait}は沈んでも消えません。{item}が小さく灯りをつけます。"
  ],
  [
    "{trait}は誰かに話すと強くなる日。{item}をネタにすると会話が転がります。",
    "今日は{trait}を共有すると吉。{item}が話し出しのきっかけになります。",
    "{trait}はひとりで抱えるより会話向き。{item}がちょうどいい入口です。"
  ],
  [
    "{trait}は細く長く効きます。{item}があると、今日一日じわっと残ります。",
    "今日の{trait}は持続型。{item}をそばに置くと余韻が続きます。",
    "{trait}は短距離走ではなく持久走。{item}がペースメーカーです。"
  ],
  [
    "{trait}は少しミステリアス。{item}があると、謎のまま楽しむ余裕が出ます。",
    "今日は{trait}を解き明かしすぎない方が吉。{item}が謎のまま支えます。",
    "{trait}はわからなさが魅力。{item}がその謎をきれいに残します。"
  ],
  [
    "{trait}は見た目の第一印象が強い日。{item}があると、ぱっと見の引力が増します。",
    "今日の{trait}はビジュアル運。{item}が第一印象を押し上げます。",
    "{trait}は一目で決まるタイプ。{item}が視線の着地点になります。"
  ],
  [
    "{trait}は音やリズムと相性よし。{item}を合図に、テンポよく楽しめます。",
    "今日は{trait}にリズムがあります。{item}がその拍子を取りやすくします。",
    "{trait}はテンポで勝つ日。{item}があると流れに乗れます。"
  ],
  [
    "{trait}は小物で伸びます。{item}があるだけで、見え方が変わります。",
    "今日の{trait}はアイテム運が強いです。{item}を持つと急にまとまります。",
    "{trait}は小さな道具が鍵。{item}があれば印象が締まります。"
  ],
  [
    "{trait}はやや玄人向け。{item}があると、入口が少しだけやさしくなります。",
    "今日は{trait}のクセが出ます。{item}で入口を作ると入りやすいです。",
    "{trait}は深めの味。{item}が最初の一口を軽くします。"
  ],
  [
    "{trait}は素直に楽しむのが正解。{item}を添えて、難しく考えないのが吉。",
    "今日の{trait}は直感型。{item}を見てピンと来たら、それで十分です。",
    "{trait}は説明より反応。{item}があれば、考える前に楽しめます。"
  ],
  [
    "{trait}は締めの一言で決まります。{item}があると、今日の占いがきれいに閉じます。",
    "今日は{trait}を最後に思い出すと吉。{item}がその余韻を残します。",
    "{trait}は終盤に効くタイプ。{item}が一日のオチを作ってくれます。"
  ]
];

const BLOCKED_WORD_PATTERNS = [
];

const REPLACEMENT_WORDS = [""];

const RAW_SEIHEKI_DEVIATION_TABLE_ALL = [
  { deviation: 74, names: ["ドラゴンカーセックス"] },
  { deviation: 73, names: ["拷問(強)", "自己暗殺愛好"] },
  { deviation: 72, names: ["鏡越し嗜好", "人肉嗜食", "ボレアフィリア", "経済的支配", "ユダのゆりかご"] },
  { deviation: 71, names: ["無機物", "スカル", "脳姦", "スフィンクス姦", "昆虫性愛", "蟲化", "ギロチンセックス"] },
  { deviation: 70, names: ["マトリョーシ姦", "屍姦", "焼死体", "眼姦", "首吊り", "ドラゴン"] },
  { deviation: 69, names: ["丸呑み", "へそ姦", "ケンタウロス", "てるてる坊主"] },
  { deviation: 68, names: ["丸刈り", "ゾンビ", "赤ちゃん", "尿道姦", "クイーンズスタリオン", "獣姦"] },
  { deviation: 67, names: ["石像", "人間真空パック", "老婆", "マミフィケーション", "老化", "手術跡", "実父"] },
  { deviation: 66, names: ["コルセットピアス", "実母", "冷凍人間", "ヒトイヌ", "奇形", "虫姦", "堕胎", "ガナニー", "四肢切断", "乳首チンコ", "肥育", "美少女着ぐるみ", "内臓"] },
  { deviation: 65, names: ["型取り", "植物姦", "歯牙", "耳姦", "鼻姦", "胎内回帰", "巨人", "ダルマ", "石化", "蝋人間", "出産", "性器破壊", "生理", "超乳"] },
  { deviation: 64, names: ["状態変化", "欠損", "鼻フック", "窒息", "B専", "獣姦", "剛毛", "箱化"] },
  { deviation: 63, names: ["去勢", "義母", "蝋人間", "ゲロ", "園児", "幽霊", "断食", "ガイジ", "義手義足", "単眼", "全身ラバースーツ"] },
  { deviation: 62, names: ["宙吊り", "チューブ連結", "人魚", "刺青", "人形", "病気", "人外", "ヒトイヌ", "針", "全身タイツ", "顔ストッキング"] },
  { deviation: 61, names: ["ニプルファック", "食ザー", "金蹴り", "腋毛", "マッチョ娘", "流血", "産卵", "家具系女子"] },
  { deviation: 60, names: ["おむつ", "飲尿", "奇乳", "小人", "ケモショタ", "ロウソク", "壁尻", "脱子宮", "親子姦", "スカトロ"] },
  { deviation: 59, names: ["フィストファック", "長乳首", "盲目", "聾唖", "妖精オナホ", "そばかす", "仮面", "食器系女子", "盗撮", "ドM", "乳首チンコ", "闇堕ち", "獣姦", "デブ専", "女体化", "鼻水・鼻くそ", "ゲップ"] },
  { deviation: 58, names: ["薬漬け", "水責め", "まぐろ女", "顔踏み", "精液風呂", "ボコられ", "拷問", "剃毛", "クスコ", "熟女", "泥まみれ"] },
  { deviation: 57, names: ["異種間", "髪コキ", "汗だく", "眼帯", "顔踏み", "暗闇", "ペニスソックス", "ロート精液", "電流", "未亡人", "ケツ毛", "催眠姦"] },
  { deviation: 56, names: ["クリピアス", "女装", "子宮口", "顔スト", "飲尿", "セルフフェラ", "AV出演シチュ", "ロボ娘", "幼児プレイ", "ボールギャグ", "尿道責め", "おなら", "NTR", "快楽堕ち", "ドS", "輪姦"] },
  { deviation: 55, names: ["浣腸", "ナプキン", "子宮姦", "腹パン", "腋コキ", "恥部バンソウコウ", "射精管理", "貞操帯", "傷跡ペロペロ", "開口器", "軟体", "盗撮", "義姉妹"] },
  { deviation: 54, names: ["マゾヒズム", "サディズム", "ランドセル", "クリ肥大", "ニューハーフ", "女戦士", "おでこコキ", "性転換", "ペニスバンド", "機械姦", "ふたなり", "妊婦", "ガチイキ", "貞操感逆転", "ショタ"] },
  { deviation: 53, names: ["娘", "おもらし", "放尿", "体臭", "ながらエッチ", "青肌", "シュシュ", "ソープ", "アクメ", "前立腺", "青姦", "手首", "公園", "子宮精子貯め", "盗撮", "スライム娘", "体臭", "ふんどし"] },
  { deviation: 52, names: ["乳首ピアス", "ボディペイント", "二穴同時", "パンツ被り", "コンビニ", "痙攣", "逆レイプ", "男の娘", "触手", "レイプ", "唾液", "道ばた", "パイパン"] },
  { deviation: 51, names: ["姉妹", "事後", "クリ肥大", "三角木馬", "電車", "顔面騎乗", "ほっぺコキ", "ふたなり", "オフパコシチュ", "耳かき", "搾乳", "高身長", "野外ローター系", "メンヘラ", "学ラン女子", "しおふき"] },
  { deviation: 50, names: ["レオタード", "中だしプレス", "裸ネクタイ", "男装っ娘", "援助交際", "日焼け跡", "エルフ", "放置プレイ", "チクニー", "ハイヒール", "露出", "盗撮", "耳責め", "陰毛"] },
  { deviation: 49, names: ["アヘ顔", "ぽっちゃり", "言葉責め", "母乳", "ローション", "膝裏", "透明人間", "盗撮", "包帯", "ムチ", "尻コキ", "露出", "女子小学生"] },
  { deviation: 48, names: ["ストリップ", "ふくらはぎ", "全身舐め", "時間停止", "企画物AV"] },
  { deviation: 47, names: ["素股", "ヤンデレ", "八重歯", "舌", "メガネ", "ポロリ", "マッサージ", "寝取り", "裸ネクタイ", "孕ませ", "首輪", "ふでおろし", "女子小学生"] },
  { deviation: 46, names: ["パイズリ", "イラマチオ", "まんぐり返し", "裸ワイシャツ", "教室", "四つん這い", "落書き", "媚薬", "ボテ腹", "中だしプレス"] },
  { deviation: 45, names: ["着物", "M字開脚", "たくし上げ", "痴漢", "ボンテージ", "人妻", "電波っ娘", "踊ってみた"] },
  { deviation: 44, names: ["断面図", "緊縛", "女王様", "魔法少女", "目隠し", "縞パン", "うなじ", "おっぱい", "外国人", "魔法使い", "VTuber", "コンドーム", "乱交"] },
  { deviation: 43, names: ["のぞき", "異物挿入", "アナル舐め", "裸エプロン", "シックスナイン", "女子アナ", "処女膜", "天使", "ハーフ", "三つ編", "おばショタ", "ハーレム", "二の腕"] },
  { deviation: 42, names: ["家庭教師", "チャイナ服", "だいしゅきホールド", "ショートヘア", "チアガール", "素人", "ノーパン", "視姦"] },
  { deviation: 41, names: ["オナホール", "ぶっかけ", "マン筋", "アナルビーズ", "咥えゴム", "足裏", "ギャル", "ノーブラ", "催眠音声"] },
  { deviation: 40, names: ["女子中学生", "乱交", "足コキ", "陵辱", "調教", "拘束", "体育倉庫", "バニーガール", "巫女", "放課後", "MMD"] },
  { deviation: 39, names: ["後背位", "縞パン", "水着", "方言", "カチューシャ", "保健の先生", "ミニスカ"] },
  { deviation: 38, names: ["くすぐり", "セーラー服", "ブレザー", "清楚", "酒酔い", "百合", "女医", "妹", "ハイグレ", "ボーイッシュ"] },
  { deviation: 37, names: ["乳首舐め", "キス", "女教師", "ガーターベルト", "3P", "ローション", "手コキ", "褐色", "CFNM"] },
  { deviation: 36, names: ["フェラ", "姉", "バイブ", "クンニ", "側位", "耳", "ディープキス", "痴女", "スカートめくり", "体操着", "おねショタ", "CMNF"] },
  { deviation: 35, names: ["お姫様", "びしょ濡れ", "処女", "アナル", "ラブホ", "声", "OL", "婦警", "金髪", "ハニートラップ"] },
  { deviation: 34, names: ["女子大生", "腋", "ケモミミ", "騎乗位", "自宅", "腕"] },
  { deviation: 33, names: ["唇", "アイドル", "チアガール", "パンチラ", "年上", "靴下"] },
  { deviation: 32, names: ["ツンデレ", "風紀委員", "まんこ", "お嬢様", "着衣", "見えそうで見えない"] },
  { deviation: 31, names: ["ツインテール", "サイドテール", "タイツ", "ナース", "オナニー", "正常位", "対面座位"] },
  { deviation: 30, names: ["お姉さん", "メイド", "ポニーテール", "セミロング", "水着", "天然"] },
  { deviation: 29, names: ["キス", "女子高生", "中だし"] },
  { deviation: 28, names: ["幼馴染", "膝枕"] },
  { deviation: 27, names: ["足"] },
  { deviation: 26, names: ["下着"] },
  { deviation: 25, names: ["おっぱい", "尻", "太もも"] }
];

const storageKeys = {
  traits: "mezamashiTraitsV2",
  pendingTraits: "mezamashiPendingTraitsV1",
  traitReports: "mezamashiTraitReportsV1",
  hiddenTraits: "mezamashiHiddenTraitsV1",
  favorites: "mezamashiFavoritesV1",
  favoriteCounts: "mezamashiFavoriteCountsV1",
  traitImages: "mezamashiTraitImagesV1",
  traitVotes: "mezamashiTraitVotesV1",
  traitVoteUsers: "mezamashiTraitVoteUsersV1",
  visitorId: "mezamashiVisitorIdV1",
  votes: "mezamashiItemVotesV2",
  itemVoteUsers: "mezamashiItemVoteUsersV1",
  images: "mezamashiItemImagesV2",
  resetVersion: "mezamashiResetVersion"
};

const els = {
  onlineDate: document.querySelector("#onlineDate"),
  shareButton: document.querySelector("#shareButton"),
  allRankingButton: document.querySelector("#allRankingButton"),
  allRankingButtonInline: document.querySelector("#allRankingButtonInline"),
  luckyMedia: document.querySelector("#luckyMedia"),
  luckyImage: document.querySelector("#luckyImage"),
  luckyName: document.querySelector("#luckyName"),
  luckyDesc: document.querySelector("#luckyDesc"),
  likeButton: document.querySelector("#likeButton"),
  dislikeButton: document.querySelector("#dislikeButton"),
  likeCount: document.querySelector("#likeCount"),
  dislikeCount: document.querySelector("#dislikeCount"),
  imageUpload: document.querySelector("#imageUpload"),
  addForm: document.querySelector("#addForm"),
  traitInput: document.querySelector("#traitInput"),
  itemInputs: [
    document.querySelector("#itemInput1"),
    document.querySelector("#itemInput2"),
    document.querySelector("#itemInput3"),
    document.querySelector("#itemInput4")
  ],
  itemDescInputs: [
    document.querySelector("#itemDesc1"),
    document.querySelector("#itemDesc2"),
    document.querySelector("#itemDesc3"),
    document.querySelector("#itemDesc4")
  ],
  itemImageInputs: [
    document.querySelector("#itemImage1"),
    document.querySelector("#itemImage2"),
    document.querySelector("#itemImage3"),
    document.querySelector("#itemImage4")
  ],
  topList: document.querySelector("#topList"),
  bottomList: document.querySelector("#bottomList"),
  topSpotlight: document.querySelector("#topSpotlight"),
  bottomSpotlight: document.querySelector("#bottomSpotlight"),
  favoriteRankList: document.querySelector("#favoriteRankList"),
  favoriteEmptyText: document.querySelector("#favoriteEmptyText"),
  detailDialog: document.querySelector("#detailDialog"),
  closeDetail: document.querySelector("#closeDetail"),
  detailRank: document.querySelector("#detailRank"),
  detailName: document.querySelector("#detailName"),
  detailText: document.querySelector("#detailText"),
  detailItems: document.querySelector("#detailItems"),
  allDialog: document.querySelector("#allDialog"),
  closeAll: document.querySelector("#closeAll"),
  allSearch: document.querySelector("#allSearch"),
  allRankingList: document.querySelector("#allRankingList"),
  rankingNotice: document.querySelector("#rankingNotice"),
  moderationNotice: document.querySelector("#moderationNotice"),
  deleteNotice: document.querySelector("#deleteNotice")
};

const state = {
  dateSeed: "",
  ranked: [],
  currentLuckyItem: null,
  requestIdentity: ""
};

init();

async function init() {
  resetOldLocalStorageOnce();
  const today = await getOnlineDate().catch(() => "オンライン日付を取得できません");
  state.requestIdentity = await getRequestIdentity();
  state.dateSeed = today;
  els.onlineDate.textContent = today;
  bindEvents();
  render();
}

function resetOldLocalStorageOnce() {
  if (localStorage.getItem(storageKeys.resetVersion) === RESET_STORAGE_VERSION) return;
  localStorage.removeItem(storageKeys.traits);
  localStorage.removeItem(storageKeys.pendingTraits);
  localStorage.removeItem(storageKeys.traitReports);
  localStorage.removeItem(storageKeys.hiddenTraits);
  localStorage.removeItem(storageKeys.votes);
  localStorage.removeItem(storageKeys.images);
  localStorage.setItem(storageKeys.resetVersion, RESET_STORAGE_VERSION);
}

function bindEvents() {
  els.addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addTraitFromForm();
  });

  els.likeButton.addEventListener("click", () => voteCurrentItem("likes"));
  els.dislikeButton.addEventListener("click", () => voteCurrentItem("dislikes"));

  els.imageUpload.addEventListener("change", async () => {
    const file = els.imageUpload.files?.[0];
    if (!file || !state.currentLuckyItem) return;

    const images = loadJson(storageKeys.images, {});
    images[itemKey(state.currentLuckyItem.name)] = await readFile(file);
    saveJson(storageKeys.images, images);

    els.imageUpload.value = "";
    renderLuckyItem();
  });

  els.closeDetail.addEventListener("click", () => els.detailDialog.close());
  els.closeAll.addEventListener("click", () => els.allDialog.close());
  els.shareButton.addEventListener("click", shareOnX);
  els.allRankingButton.addEventListener("click", showAllRanking);
  els.allRankingButtonInline.addEventListener("click", showAllRanking);
  els.allSearch.addEventListener("input", renderAllRankingList);
}

async function getOnlineDate() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Tokyo", { cache: "no-store" });
    if (!response.ok) throw new Error("time api failed");
    const data = await response.json();
    return data.datetime.slice(0, 10);
  } catch {
    const response = await fetch("https://www.timeapi.io/api/time/current/zone?timeZone=Asia/Tokyo", { cache: "no-store" });
    if (!response.ok) throw new Error("backup time api failed");
    const data = await response.json();
    return data.dateTime.slice(0, 10);
  }
}

async function getRequestIdentity() {
  try {
    const response = await fetch(IP_LOOKUP_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("ip lookup failed");
    const data = await response.json();
    if (data?.ip) return `ip:${data.ip}`;
  } catch {
    // 静的サイトの試作用フォールバック。本番の重複防止はバックエンドで行う。
  }

  let visitorId = localStorage.getItem(storageKeys.visitorId);
  if (!visitorId) {
    visitorId = `local:${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(storageKeys.visitorId, visitorId);
  }
  return visitorId;
}

function render() {
  state.ranked = rankTraits(getDailyTraits(), state.dateSeed);
  renderSpotlights();
  renderFavoriteRanks();
  renderList(els.topList, state.ranked.slice(1, 15), { featuredCount: 2 });
  renderList(els.bottomList, state.ranked.slice(-15, -1));
  renderLuckyItem();
}

function getBaseTraits() {
  return RAW_SEIHEKI_DEVIATION_TABLE_ALL.flatMap((row) =>
    row.names.map((rawName, index) => {
      const safeName = sanitizeTraitName(rawName);
      const uniqueName =
        safeName === HIDDEN_TRAIT_LABEL
          ? `${HIDDEN_TRAIT_LABEL}-${row.deviation}-${String(index + 1).padStart(2, "0")}`
          : safeName;

      return {
        name: uniqueName,
        displayName: safeName,
        rawName,
        deviation: row.deviation,
        items: [createItemRecord(DEFAULT_LUCKY_ITEMS[0].name, DEFAULT_LUCKY_ITEMS[0].desc)],
        source: "base"
      };
    })
  );
}

function getCustomTraits() {
  const saved = loadJson(storageKeys.traits, []);
  return saved.map(normalizeTraitRecord).filter(Boolean);
}

function getAllTraits() {
  const hidden = new Set(loadJson(storageKeys.hiddenTraits, []));
  return mergeTraits([...getBaseTraits(), ...getCustomTraits()]).filter((trait) => !hidden.has(traitKey(trait.name)));
}

function getDailyTraits() {
  return mergeTraits(getBaseTraits());
}

function normalizeTraitRecord(record) {
  if (typeof record === "string") {
    const safeName = sanitizeTraitName(record);
    if (!safeName || safeName === HIDDEN_TRAIT_LABEL) return null;

    return {
      name: safeName,
      displayName: safeName,
      registrationCount: 2,
      requestIdentities: [],
      deviation: calculateDeviationFromRegistrations(2),
      items: [createItemRecord(DEFAULT_LUCKY_ITEMS[0].name, DEFAULT_LUCKY_ITEMS[0].desc)],
      source: "custom"
    };
  }

  const safeName = sanitizeTraitName(record?.name || "");
  if (!safeName || safeName === HIDDEN_TRAIT_LABEL) return null;

  const itemOnly = record?.itemOnly === true || record?.source === "itemOnly";
  const registrationCount = itemOnly ? Math.max(0, Number(record.registrationCount || 0)) : Math.max(1, Number(record.registrationCount || record.requestCount || 2));

  return {
    name: safeName,
    displayName: safeName,
    registrationCount,
    requestIdentities: Array.isArray(record.requestIdentities) ? record.requestIdentities : [],
    deviation: itemOnly ? 0 : calculateDeviationFromRegistrations(registrationCount),
    items: normalizeItemRecords(record.items || [createItemRecord(DEFAULT_LUCKY_ITEMS[0].name, DEFAULT_LUCKY_ITEMS[0].desc)]),
    source: itemOnly ? "itemOnly" : "custom",
    itemOnly
  };
}

function mergeTraits(traits) {
  const map = new Map();

  for (const trait of traits) {
    const key = traitKey(trait.name);
    const current = map.get(key);

    if (!current) {
      map.set(key, {
        ...trait,
        registered: trait.source === "custom",
        items: normalizeItemRecords(trait.items)
      });
      continue;
    }

    const isCustom = trait.source === "custom";
    current.items = normalizeItemRecords([...current.items, ...trait.items]);
    current.registered = current.registered || isCustom;
    current.registrationCount = Math.max(Number(current.registrationCount || 0), Number(trait.registrationCount || 0));
    current.requestIdentities = [...new Set([...(current.requestIdentities || []), ...(trait.requestIdentities || [])])];
    current.deviation = isCustom ? trait.deviation : current.registered ? current.deviation : Math.max(current.deviation, trait.deviation);
    current.displayName = current.displayName || trait.displayName || trait.name;
  }

  return [...map.values()];
}

async function addTraitFromForm() {
  const rawName = cleanText(els.traitInput.value);
  const safeName = sanitizeTraitName(rawName);
  const requestedItems = await collectRequestedItems();

  if (!rawName) {
    setNotice("性癖名を入れてください。");
    return;
  }

  if (requestedItems.error) {
    setNotice(requestedItems.error);
    return;
  }

  if (!safeName || safeName === HIDDEN_TRAIT_LABEL || containsBlockedWord(rawName)) {
    setNotice("公開サイト向けに危険な語は登録できない設定にしています。");
    return;
  }

  if ([...requestedItems.items.map((item) => item.name), ...requestedItems.items.map((item) => item.desc)].some(containsBlockedWord)) {
    setNotice("関連アイテムにも公開サイト向けに危険な語は使えません。");
    return;
  }

  const identity = state.requestIdentity || "unknown";
  const custom = getCustomTraits();
  const existingCustom = custom.find((trait) => traitKey(trait.name) === traitKey(safeName));
  const key = traitKey(safeName);

  if (getAllTraits().some((trait) => traitKey(trait.name) === key)) {
    addRelatedItemsToExistingTrait(custom, existingCustom, safeName, requestedItems.items);
    els.addForm.reset();
    setNotice(`「${safeName}」に関連アイテムを追加しました。`);
    render();
    return;
  }

  if (existingCustom?.requestIdentities?.includes(identity)) {
    setNotice("同じIPアドレスから同じ性癖のリクエストは受け付けない設定です。");
    return;
  }

  const pending = loadJson(storageKeys.pendingTraits, {});

  pending[key] ||= {
    name: safeName,
    displayName: safeName,
    deviation: calculateDeviationFromRegistrations(1),
    registrationCount: 0,
    requestCount: 0,
    requestIdentities: [],
    items: []
  };

  if (pending[key].requestIdentities?.includes(identity)) {
    setNotice("同じIPアドレスから同じ性癖のリクエストは受け付けない設定です。");
    return;
  }

  pending[key].requestCount += 1;
  pending[key].registrationCount = pending[key].requestCount;
  pending[key].requestIdentities = [...new Set([...(pending[key].requestIdentities || []), identity])];
  pending[key].deviation = calculateDeviationFromRegistrations(pending[key].registrationCount);
  pending[key].items = normalizeItemRecords([...pending[key].items, ...requestedItems.items]);

  if (pending[key].requestCount < TRAIT_REQUEST_APPROVE_THRESHOLD) {
    saveJson(storageKeys.pendingTraits, pending);
    els.addForm.reset();
    setNotice(`「${safeName}」のリクエストを受け付けました。あと${TRAIT_REQUEST_APPROVE_THRESHOLD - pending[key].requestCount}件でランキングに追加されます。`);
    return;
  }

  approvePendingTrait(pending[key]);
  delete pending[key];
  saveJson(storageKeys.pendingTraits, pending);

  els.addForm.reset();
  setNotice(`「${safeName}」は複数リクエストされたのでランキングに追加しました。`);
  render();
}

function addRelatedItemsToExistingTrait(custom, existingCustom, safeName, items) {
  if (existingCustom) {
    existingCustom.items = normalizeItemRecords([...existingCustom.items, ...items]);
  } else {
    custom.push({
      name: safeName,
      displayName: safeName,
      registrationCount: 0,
      requestIdentities: [],
      deviation: 0,
      items: normalizeItemRecords(items),
      source: "itemOnly",
      itemOnly: true
    });
  }

  saveJson(storageKeys.traits, custom);
}

function approvePendingTrait(record) {
  const custom = getCustomTraits();
  const existing = custom.find((trait) => traitKey(trait.name) === traitKey(record.name));
  const requestIdentities = [...new Set(record.requestIdentities || [])];
  const registrationCount = Math.max(Number(record.registrationCount || record.requestCount || requestIdentities.length || 1), requestIdentities.length);

  if (existing) {
    existing.registrationCount = Math.max(Number(existing.registrationCount || 0), registrationCount);
    existing.requestIdentities = [...new Set([...(existing.requestIdentities || []), ...requestIdentities])];
    existing.deviation = calculateDeviationFromRegistrations(existing.registrationCount);
    existing.items = normalizeItemRecords([...existing.items, ...record.items]);
  } else {
    custom.push({
      name: record.name,
      displayName: record.displayName || record.name,
      registrationCount,
      requestIdentities,
      deviation: calculateDeviationFromRegistrations(registrationCount),
      items: normalizeItemRecords(record.items),
      source: "custom"
    });
  }

  saveJson(storageKeys.traits, custom);
}

function renderList(container, items, options = {}) {
  container.innerHTML = "";

  for (const [index, item] of items.entries()) {
    const li = document.createElement("li");
    const button = document.createElement("div");
    button.className = "rank-item";
    const featuredFromStart = index < (options.featuredCount || 0);
    const featuredFromEnd = index >= items.length - (options.featuredLastCount || 0);
    if (featuredFromStart || featuredFromEnd) {
      button.classList.add("featured-rank");
    }
    button.tabIndex = 0;
    button.setAttribute("role", "button");

    const no = document.createElement("span");
    no.className = "rank-no";
    no.textContent = item.rank;

    const name = document.createElement("span");
    name.className = "rank-name";
    name.textContent = item.displayName || item.name;

    const deviation = document.createElement("span");
    deviation.className = "deviation";
    deviation.textContent = getVisibleDeviationText(item, options);

    const favorite = document.createElement("button");
    favorite.className = "favorite-button";
    favorite.type = "button";
    const isFavorite = isFavoriteTrait(item);
    favorite.classList.toggle("is-active", isFavorite);
    favorite.textContent = isFavorite ? "★ お気に入り" : "☆ お気に入り";
    favorite.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavoriteTrait(item);
    });

    const report = document.createElement("button");
    report.className = "report-button";
    report.type = "button";
    report.textContent = "通報";
    report.addEventListener("click", (event) => {
      event.stopPropagation();
      reportTrait(item);
    });

    button.append(no, name, deviation, favorite, report);
    button.addEventListener("click", () => showDetail(item));
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showDetail(item);
      }
    });
    li.append(button);
    container.append(li);
  }
}

function getVisibleDeviationText(item, options = {}) {
  if (options.favoriteStats) {
    return `Rank ${item.rank} / お気に入り ${getFavoriteCount(item)} / 偏差値 ${getFavoriteDeviation(item)}`;
  }

  if (item.registered) {
    return `登録 ${item.registrationCount || 0} / 偏差値 ${item.deviation}`;
  }

  return "";
}

function renderSpotlights() {
  const top = state.ranked[0];
  const bottom = state.ranked[state.ranked.length - 1];

  renderSpotlight(els.topSpotlight, top, "今日の1位", "Rank 1");
  renderSpotlight(els.bottomSpotlight, bottom, "今日の最下位", "Bottom rank");
}

function renderSpotlight(container, item, title, eyebrow) {
  container.innerHTML = "";
  if (!item) return;

  const media = document.createElement("div");
  media.className = "spotlight-media";
  const imageSrc = getTraitImage(item);

  if (imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = `${item.displayName || item.name}の画像`;
    media.append(img);
  } else {
    media.textContent = "画像なし";
  }

  const copy = document.createElement("div");
  copy.className = "spotlight-copy";

  const label = document.createElement("p");
  label.className = "eyebrow";
  label.textContent = eyebrow;

  const heading = document.createElement("h2");
  heading.textContent = item.displayName || item.name;

  const meta = document.createElement("p");
  meta.className = "notice";
  const deviationText = getVisibleDeviationText(item);
  meta.textContent = deviationText ? `${title} / ${deviationText}` : title;

  const votes = getTraitImageVotes(item);
  const voted = hasUserVoted(storageKeys.traitVoteUsers, traitKey(item.name));
  const voteRow = document.createElement("div");
  voteRow.className = "spotlight-votes";

  const like = document.createElement("button");
  like.type = "button";
  like.textContent = `高評価 ${votes.likes}`;
  like.disabled = voted;
  like.addEventListener("click", () => voteTraitImage(item, "likes"));

  const dislike = document.createElement("button");
  dislike.type = "button";
  dislike.textContent = `低評価 ${votes.dislikes}`;
  dislike.disabled = voted;
  dislike.addEventListener("click", () => voteTraitImage(item, "dislikes"));
  voteRow.append(like, dislike);

  const actionRow = document.createElement("div");
  actionRow.className = "spotlight-actions";

  const upload = document.createElement("label");
  upload.className = "spotlight-upload";
  upload.textContent = "画像を追加";
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    const images = loadJson(storageKeys.traitImages, {});
    images[traitKey(item.name)] = await readFile(file);
    saveJson(storageKeys.traitImages, images);
    render();
  });
  upload.append(input);

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-button";
  const active = isFavoriteTrait(item);
  favorite.classList.toggle("is-active", active);
  favorite.textContent = active ? "★ お気に入り" : "☆ お気に入り";
  favorite.addEventListener("click", () => toggleFavoriteTrait(item));

  const report = document.createElement("button");
  report.type = "button";
  report.className = "report-button";
  report.textContent = "通報";
  report.addEventListener("click", () => reportTrait(item));

  actionRow.append(upload, favorite, report);
  copy.append(label, heading, meta, voteRow, actionRow);
  container.append(media, copy);
}

function renderFavoriteRanks() {
  const favoriteKeys = new Set(loadJson(storageKeys.favorites, []));
  const favorites = state.ranked.filter((item) => favoriteKeys.has(traitKey(item.name)));
  els.favoriteRankList.innerHTML = "";
  els.favoriteEmptyText.style.display = favorites.length ? "none" : "block";

  if (!favorites.length) return;
  renderList(els.favoriteRankList, favorites, { favoriteStats: true });
}

function isFavoriteTrait(item) {
  return loadJson(storageKeys.favorites, []).includes(traitKey(item.name));
}

function toggleFavoriteTrait(item) {
  const key = traitKey(item.name);
  const favorites = new Set(loadJson(storageKeys.favorites, []));
  const counts = loadJson(storageKeys.favoriteCounts, {});

  if (favorites.has(key)) {
    favorites.delete(key);
    counts[key] = Math.max(0, Number(counts[key] || 1) - 1);
    setRankingNotice(`「${item.displayName || item.name}」をお気に入りから外しました。`);
  } else {
    favorites.add(key);
    counts[key] = Number(counts[key] || 0) + 1;
    setRankingNotice(`「${item.displayName || item.name}」をお気に入り登録しました。`);
  }

  saveJson(storageKeys.favorites, [...favorites]);
  saveJson(storageKeys.favoriteCounts, counts);
  render();
}

function getFavoriteCount(item) {
  return Number(loadJson(storageKeys.favoriteCounts, {})[traitKey(item.name)] || 0);
}

function getFavoriteDeviation(item) {
  return calculateDeviationFromRegistrations(getFavoriteCount(item) || 1);
}

function createTraitImagePanel(item) {
  const panel = document.createElement("div");
  panel.className = "trait-image-panel";
  panel.addEventListener("click", (event) => event.stopPropagation());

  const imageBox = document.createElement("div");
  imageBox.className = "rank-hero-image";
  const imageSrc = getTraitImage(item);

  if (imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = `${item.displayName || item.name}の画像`;
    imageBox.append(img);
  } else {
    imageBox.textContent = "画像なし";
  }

  const controls = document.createElement("div");
  controls.className = "trait-image-actions";

  const upload = document.createElement("label");
  upload.className = "mini-upload";
  upload.textContent = "画像追加";
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    const images = loadJson(storageKeys.traitImages, {});
    images[traitKey(item.name)] = await readFile(file);
    saveJson(storageKeys.traitImages, images);
    render();
  });
  upload.append(input);

  const votes = getTraitImageVotes(item);
  const voted = hasUserVoted(storageKeys.traitVoteUsers, traitKey(item.name));
  const like = document.createElement("button");
  like.className = "mini-vote";
  like.type = "button";
  like.textContent = `高評価 ${votes.likes}`;
  like.disabled = voted;
  like.addEventListener("click", () => voteTraitImage(item, "likes"));

  const dislike = document.createElement("button");
  dislike.className = "mini-vote";
  dislike.type = "button";
  dislike.textContent = `低評価 ${votes.dislikes}`;
  dislike.disabled = voted;
  dislike.addEventListener("click", () => voteTraitImage(item, "dislikes"));

  controls.append(upload, like, dislike);
  panel.append(imageBox, controls);
  return panel;
}

function getTraitImage(item) {
  return loadJson(storageKeys.traitImages, {})[traitKey(item.name)] || "";
}

function getTraitImageVotes(item) {
  const votes = loadJson(storageKeys.traitVotes, {});
  return votes[traitKey(item.name)] || { likes: 0, dislikes: 0 };
}

function voteTraitImage(item, type) {
  const key = traitKey(item.name);
  if (!recordUserVote(storageKeys.traitVoteUsers, key, type)) {
    setRankingNotice("評価は一人一回までです。");
    return;
  }

  const votes = loadJson(storageKeys.traitVotes, {});
  votes[key] ||= { likes: 0, dislikes: 0 };
  votes[key][type] += 1;
  saveJson(storageKeys.traitVotes, votes);

  if (type === "dislikes" && votes[key].dislikes >= DISLIKE_DELETE_THRESHOLD) {
    const images = loadJson(storageKeys.traitImages, {});
    delete images[key];
    saveJson(storageKeys.traitImages, images);
    delete votes[key];
    saveJson(storageKeys.traitVotes, votes);
    deleteVoteUsers(storageKeys.traitVoteUsers, key);
    setRankingNotice(`「${item.displayName || item.name}」の画像は低評価が多くなったので削除しました。`);
  }

  render();
}

function showDetail(item) {
  const lucky = pickRelatedItem(item);

  els.detailRank.textContent = item.registered
    ? `Rank ${item.rank} / 偏差値 ${item.deviation} / 登録 ${item.registrationCount || 0}`
    : `Rank ${item.rank}`;
  els.detailName.textContent = item.displayName || item.name;
  els.detailText.textContent = buildTraitComment(item, lucky);
  els.detailItems.innerHTML = "";

  for (const related of normalizeItemRecords(item.items)) {
    const tag = document.createElement("span");
    tag.textContent = related.name;
    els.detailItems.append(tag);
  }

  els.detailDialog.showModal();
}

function showAllRanking() {
  renderAllRankingList();

  if (!els.allDialog.open) {
    els.allDialog.showModal();
  }
}

function shareOnX() {
  const top = state.ranked[0];
  const bottom = state.ranked[state.ranked.length - 1];
  const lucky = state.currentLuckyItem;
  const text = [
    `目覚まし性癖占い ${state.dateSeed}`,
    `今日の1位: ${top?.displayName || top?.name || "-"}`,
    `今日の最下位: ${bottom?.displayName || bottom?.name || "-"}`,
    `ラッキーアイテム: ${lucky?.name || "-"}`
  ].join("\n");
  const params = new URLSearchParams({ text });
  const pageUrl = getShareablePageUrl();

  if (pageUrl) {
    params.set("url", pageUrl);
  }

  const url = `https://twitter.com/intent/tweet?${params.toString()}`;
  if (typeof window.open === "function") {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
}

function getShareablePageUrl() {
  if (!/^https?:$/.test(window.location.protocol)) return "";
  return window.location.href.split("#")[0];
}

function renderAllRankingList() {
  els.allRankingList.innerHTML = "";
  const query = cleanText(els.allSearch.value).toLocaleLowerCase("ja-JP");
  const items = query
    ? state.ranked.filter((item) => (item.displayName || item.name).toLocaleLowerCase("ja-JP").includes(query))
    : state.ranked;

  for (const item of items) {
    const li = document.createElement("li");

    const rank = document.createElement("span");
    rank.className = "rank-no";
    rank.textContent = item.rank;

    const name = document.createElement("strong");
    name.textContent = item.displayName || item.name;

    const deviation = document.createElement("span");
    deviation.className = "deviation";
    deviation.textContent = getVisibleDeviationText(item);

    const favorite = document.createElement("button");
    favorite.className = "favorite-button";
    favorite.type = "button";
    const isFavorite = isFavoriteTrait(item);
    favorite.classList.toggle("is-active", isFavorite);
    favorite.textContent = isFavorite ? "★" : "☆";
    favorite.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavoriteTrait(item);
      renderAllRankingList();
    });

    const report = document.createElement("button");
    report.className = "report-button";
    report.type = "button";
    report.textContent = "通報";
    report.addEventListener("click", (event) => {
      event.stopPropagation();
      reportTrait(item);
      renderAllRankingList();
    });

    li.append(rank, name, deviation, favorite, report);
    li.addEventListener("click", () => showDetail(item));
    els.allRankingList.append(li);
  }
}

function reportTrait(item) {
  const reports = loadJson(storageKeys.traitReports, {});
  const key = traitKey(item.name);

  reports[key] ||= { count: 0, name: item.displayName || item.name };
  reports[key].count += 1;
  saveJson(storageKeys.traitReports, reports);

  if (reports[key].count < TRAIT_REPORT_DELETE_THRESHOLD) {
    setRankingNotice(`「${item.displayName || item.name}」を通報しました。あと${TRAIT_REPORT_DELETE_THRESHOLD - reports[key].count}件でランキングから外れます。`);
    return;
  }

  deleteReportedTrait(item, key);
  setRankingNotice(`「${item.displayName || item.name}」は複数通報されたのでランキングから外しました。`);
  render();
}

function deleteReportedTrait(item, key) {
  const custom = getCustomTraits().filter((trait) => traitKey(trait.name) !== key);
  saveJson(storageKeys.traits, custom);

  const pending = loadJson(storageKeys.pendingTraits, {});
  delete pending[key];
  saveJson(storageKeys.pendingTraits, pending);

  if (item.source !== "custom") {
    const hidden = new Set(loadJson(storageKeys.hiddenTraits, []));
    hidden.add(key);
    saveJson(storageKeys.hiddenTraits, [...hidden]);
  }
}

function rankTraits(traits, seed) {
  return traits
    .map((trait) => ({
      ...trait,
      score: hash(`ranking-v2:${seed}:${trait.name}:${trait.deviation}`)
    }))
    .sort((a, b) => b.score - a.score || b.deviation - a.deviation)
    .map((trait, index) => ({ ...trait, rank: index + 1 }));
}

function buildLuckyItems() {
  const map = new Map(DEFAULT_LUCKY_ITEMS.map((item) => [itemKey(item.name), { ...item, source: "default" }]));

  for (const trait of getDailyTraits()) {
    for (const item of normalizeItemRecords(trait.items)) {
      const key = itemKey(item.name);
      if (!map.has(key)) {
        map.set(key, {
          name: item.name,
          desc: item.desc,
          image: item.image || null,
          source: "custom"
        });
      }
    }
  }

  return [...map.values()];
}

function renderLuckyItem() {
  const pool = buildLuckyItems();
  state.currentLuckyItem = pool[hash(`item:${state.dateSeed}`) % pool.length];

  const item = state.currentLuckyItem;
  const images = loadJson(storageKeys.images, {});
  const uploaded = images[itemKey(item.name)];
  const imageSrc = uploaded || item.image;

  els.luckyName.textContent = item.name;
  els.luckyDesc.textContent = item.desc;
  els.luckyMedia.classList.toggle("has-image", Boolean(imageSrc));
  els.luckyImage.removeAttribute("src");

  if (imageSrc) {
    els.luckyImage.src = imageSrc;
  }

  renderVotes();
}

function voteCurrentItem(type) {
  if (!state.currentLuckyItem) return;

  const votes = loadJson(storageKeys.votes, {});
  const key = itemKey(state.currentLuckyItem.name);
  if (!recordUserVote(storageKeys.itemVoteUsers, key, type)) {
    els.deleteNotice.textContent = "評価は一人一回までです。";
    window.setTimeout(() => {
      els.deleteNotice.textContent = "";
    }, 4500);
    return;
  }

  votes[key] ||= { likes: 0, dislikes: 0 };
  votes[key][type] += 1;
  saveJson(storageKeys.votes, votes);

  if (type === "dislikes" && votes[key].dislikes >= DISLIKE_DELETE_THRESHOLD) {
    deleteDislikedItem(key);
  }

  renderLuckyItem();
}

function deleteDislikedItem(key) {
  const images = loadJson(storageKeys.images, {});
  delete images[key];
  saveJson(storageKeys.images, images);

  const custom = getCustomTraits().filter((trait) => !normalizeItemRecords(trait.items).some((item) => itemKey(item.name) === key));
  saveJson(storageKeys.traits, custom);

  const votes = loadJson(storageKeys.votes, {});
  delete votes[key];
  saveJson(storageKeys.votes, votes);
  deleteVoteUsers(storageKeys.itemVoteUsers, key);

  els.deleteNotice.textContent = "低評価が多くなったので、この画像と関連する追加性癖を削除しました。";

  window.setTimeout(() => {
    els.deleteNotice.textContent = "";
  }, 5000);
}

function renderVotes() {
  if (!state.currentLuckyItem) return;

  const votes = loadJson(storageKeys.votes, {});
  const current = votes[itemKey(state.currentLuckyItem.name)] || { likes: 0, dislikes: 0 };
  const voted = hasUserVoted(storageKeys.itemVoteUsers, itemKey(state.currentLuckyItem.name));

  els.likeCount.textContent = current.likes;
  els.dislikeCount.textContent = current.dislikes;
  els.likeButton.disabled = voted;
  els.dislikeButton.disabled = voted;
}

function pickRelatedItem(item) {
  const items = normalizeItemRecords(item.items);
  return items[hash(`${state.dateSeed}:related:${item.name}`) % items.length];
}

function buildTraitComment(item, lucky) {
  const displayName = item.displayName || item.name;
  const luckyName = lucky?.name || DEFAULT_LUCKY_ITEMS[0].name;
  const luckyDesc = lucky?.desc || DEFAULT_LUCKY_ITEMS[0].desc;
  const group = DETAIL_COMMENT_PATTERNS[(item.rank - 1) % DETAIL_COMMENT_PATTERNS.length];
  const template = group[hash(`${state.dateSeed}:comment:${item.name}:${item.rank}`) % group.length];

  return `${template
    .replaceAll("{trait}", displayName)
    .replaceAll("{item}", luckyName)
    .replaceAll("{description}", luckyDesc)
    .replaceAll("{deviation}", item.deviation)
    .replaceAll("{rank}", item.rank)}`;
}

function sanitizeTraitName(value) {
  let text = cleanText(value);

  for (const replacement of REPLACEMENT_WORDS) {
    text = text.replace(replacement.pattern, replacement.value);
  }

  if (text.includes(HIDDEN_TRAIT_LABEL)) {
    return HIDDEN_TRAIT_LABEL;
  }

  return text;
}

function containsBlockedWord(text) {
  return BLOCKED_WORD_PATTERNS.some((pattern) => pattern.test(cleanText(text)));
}

async function collectRequestedItems() {
  const items = [];

  for (let index = 0; index < els.itemInputs.length; index += 1) {
    const name = cleanText(els.itemInputs[index]?.value);
    const desc = cleanText(els.itemDescInputs[index]?.value);
    const file = els.itemImageInputs[index]?.files?.[0];

    if (!name && !desc && file) return { error: `写真${index + 1}に対応する関連アイテム名と説明を入れてください。`, items: [] };
    if (!name && !desc) continue;
    if (name && !desc) return { error: `関連アイテム${index + 1}の説明を入れてください。`, items: [] };
    if (!name && desc) return { error: `説明${index + 1}に対応する関連アイテム名を入れてください。`, items: [] };

    items.push(createItemRecord(name, desc, file ? await readFile(file) : ""));
  }

  if (items.length < 2) {
    return { error: "関連ラッキーアイテムは2個以上必要です。", items: [] };
  }

  if (items.length > 4) {
    return { error: "関連ラッキーアイテムは最大4個までです。", items: [] };
  }

  return { error: "", items: normalizeItemRecords(items) };
}

function normalizeItemRecords(items) {
  const map = new Map();

  for (const item of items || []) {
    const record =
      typeof item === "string"
        ? createItemRecord(item, DEFAULT_LUCKY_ITEMS[0].desc)
        : createItemRecord(item?.name, item?.desc, item?.image);

    if (!record.name || !record.desc) continue;
    map.set(itemKey(record.name), record);
  }

  return [...map.values()].slice(0, 4);
}

function createItemRecord(name, desc, image = "") {
  return {
    name: cleanText(name),
    desc: cleanText(desc),
    image: cleanText(image)
  };
}

function calculateDeviationFromRegistrations(count) {
  const safeCount = Math.max(1, Number(count || 1));
  return Math.max(25, Math.min(74, Math.round(43 + Math.log2(safeCount) * 7)));
}

function getVoteIdentity() {
  return state.requestIdentity || localStorage.getItem(storageKeys.visitorId) || "unknown";
}

function hasUserVoted(storageKey, targetKey) {
  const votes = loadJson(storageKey, {});
  return Boolean(votes[targetKey]?.[getVoteIdentity()]);
}

function recordUserVote(storageKey, targetKey, type) {
  const identity = getVoteIdentity();
  const votes = loadJson(storageKey, {});
  votes[targetKey] ||= {};

  if (votes[targetKey][identity]) return false;

  votes[targetKey][identity] = type;
  saveJson(storageKey, votes);
  return true;
}

function deleteVoteUsers(storageKey, targetKey) {
  const votes = loadJson(storageKey, {});
  delete votes[targetKey];
  saveJson(storageKey, votes);
}

function cleanText(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function setNotice(message) {
  els.moderationNotice.textContent = message;

  window.setTimeout(() => {
    els.moderationNotice.textContent = "";
  }, 4500);
}

function setRankingNotice(message) {
  els.rankingNotice.textContent = message;

  window.setTimeout(() => {
    els.rankingNotice.textContent = "";
  }, 4500);
}

function itemKey(value) {
  return cleanText(value).toLocaleLowerCase("ja-JP");
}

function traitKey(value) {
  return itemKey(value);
}

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}

function hash(input) {
  let value = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    value ^= input.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }

  return value >>> 0;
}
