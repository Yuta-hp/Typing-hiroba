let GamePlayerData = {
    Score:0,
    Clears:[
    ],
}

/**
 * ひらがなまたはカタカナからローマ字へ変換
 * @param {string} targetStr ローマ字へ変換する文字列（変換元の文字列）
 * @param {"hepburn"|"kunrei"} [type="hepburn"] ローマ字の種類
 * @param {Object} [options] その他各種オプション
 *                           {boolean} [options.bmp=true] ... "ん"（n）の次がb.m.pの場合にnからmへ変換するかどうか
 *                           {"latin"|"hyphen"} [options.longSound="latin"] ... 長音の表し方
 * @return {string} ローマ字へ変換された文字列を返す
 */
var kanaToRoman = function(targetStr, type, options) {
	/**
	 * 変換マップ
	 */
	var romanMap = {
		'あ' : 'a',
		'い' : 'i',
		'う' : 'u',
		'え' : 'e',
		'お' : 'o',
		'か' : 'ka',
		'き' : 'ki',
		'く' : 'ku',
		'け' : 'ke',
		'こ' : 'ko',
		'さ' : 'sa',
		'し' : { hepburn : 'shi', kunrei : 'si' },
		'す' : 'su',
		'せ' : 'se',
		'そ' : 'so',
		'た' : 'ta',
		'ち' : { hepburn : 'chi', kunrei : 'ti' },
		'つ' : { hepburn : 'tsu', kunrei : 'tu' },
		'て' : 'te',
		'と' : 'to',
		'な' : 'na',
		'に' : 'ni',
		'ぬ' : 'nu',
		'ね' : 'ne',
		'の' : 'no',
		'は' : 'ha',
		'ひ' : 'hi',
		'ふ' : { hepburn : 'fu', kunrei : 'hu' },
		'へ' : 'he',
		'ほ' : 'ho',
		'ま' : 'ma',
		'み' : 'mi',
		'む' : 'mu',
		'め' : 'me',
		'も' : 'mo',
		'や' : 'ya',
		'ゆ' : 'yu',
		'よ' : 'yo',
		'ら' : 'ra',
		'り' : 'ri',
		'る' : 'ru',
		'れ' : 're',
		'ろ' : 'ro',
		'わ' : 'wa',
		'ゐ' : 'wi',
		'ゑ' : 'we',
		'を' : { hepburn : 'o', kunrei : 'wo' },
		'ん' : 'nn',
		'が' : 'ga',
		'ぎ' : 'gi',
		'ぐ' : 'gu',
		'げ' : 'ge',
		'ご' : 'go',
		'ざ' : 'za',
		'じ' : { hepburn : 'ji', kunrei : 'zi' },
		'ず' : 'zu',
		'ぜ' : 'ze',
		'ぞ' : 'zo',
		'だ' : 'da',
		'ぢ' : { hepburn : 'ji', kunrei : 'di' },
		'づ' : { hepburn : 'zu', kunrei : 'du' },
		'で' : 'de',
		'ど' : 'do',
		'ば' : 'ba',
		'び' : 'bi',
		'ぶ' : 'bu',
		'べ' : 'be',
		'ぼ' : 'bo',
		'ぱ' : 'pa',
		'ぴ' : 'pi',
		'ぷ' : 'pu',
		'ぺ' : 'pe',
		'ぽ' : 'po',
		'きゃ' : 'kya',
		'きぃ' : 'kyi',
		'きゅ' : 'kyu',
		'きぇ' : 'kye',
		'きょ' : 'kyo',
		'くぁ' : 'qa',
		'くぃ' : 'qi',
		'くぇ' : 'qe',
		'くぉ' : 'qo',
		'くゃ' : 'qya',
		'くゅ' : 'qyu',
		'くょ' : 'qyo',
		'しゃ' : { hepburn : 'sha', kunrei : 'sya' },
		'しぃ' : 'syi',
		'しゅ' : { hepburn : 'shu', kunrei : 'syu' },
		'しぇ' : 'sye',
		'しょ' : { hepburn : 'sho', kunrei : 'syo' },
		'ちゃ' : { hepburn : 'cha', kunrei : 'tya' },
		'ちぃ' : ['tyi'],
		'ちゅ' : { hepburn : 'chu', kunrei : 'tyu' },
		'ちぇ' : ['tye'],
		'ちょ' : { hepburn : 'cho', kunrei : 'tyo' },
		'てゃ' : 'tha',
		'てぃ' : 'thi',
		'てゅ' : 'thu',
		'てぇ' : 'the',
		'てょ' : 'tho',
		'ひゃ' : 'hya',
		'ひぃ' : 'hyi',
		'ひゅ' : 'hyu',
		'ひぇ' : 'hye',
		'ひょ' : 'hyo',
		'ふぁ' : 'fa',
		'ふぃ' : 'fi',
		'ふぇ' : 'fe',
		'ふぉ' : 'fo',
		'みゃ' : 'mya',
		'みぃ' : 'myi',
		'みゅ' : 'myu',
		'みぇ' : 'mye',
		'みょ' : 'myo',
		'ヴぁ' : 'va',
		'ヴぃ' : 'vi',
		'ヴぇ' : 've',
		'ヴぉ' : 'vo',
		'ぎゃ' : 'gya',
		'ぎぃ' : 'gyi',
		'ぎゅ' : 'gyu',
		'ぎぇ' : 'gye',
		'ぎょ' : 'gyo',
		'じゃ' : { hepburn : 'ja', kunrei : 'zya' },
		'じぃ' : 'zyi',
		'じゅ' : { hepburn : 'ju', kunrei : 'zyu' },
		'じぇ' : 'zye',
		'じょ' : { hepburn : 'jo', kunrei : 'zyo' },
		'ぢゃ' : { hepburn : 'dya', kunrei : 'zya' },
		'ぢぃ' : 'dyi',
		'ぢゅ' : { hepburn : 'dyu', kunrei : 'zya' },
		'ぢぇ' : 'dye',
		'ぢょ' : { hepburn : 'dyo', kunrei : 'zya' },
		'びゃ' : 'bya',
		'びぃ' : 'byi',
		'びゅ' : 'byu',
		'びぇ' : 'bye',
		'びょ' : 'byo',
		'ぴゃ' : 'pya',
		'ぴぃ' : 'pyi',
		'ぴゅ' : 'pyu',
		'ぴぇ' : 'pye',
		'ぴょ' : 'pyo',
		'ぁ' : 'xa',
		'ぃ' : 'xi',
		'ぅ' : 'xu',
		'ぇ' : 'xe',
		'ぉ' : 'xo',
		'ゃ' : 'xya',
		'ゅ' : 'xyu',
		'ょ' : 'xyo',
		'っ' : 'xtu',
		'ヴ' : 'vu',
		'ー' : '-',
		'、' : ', ',
		'，' : ', ',
		'。' : '.'
	};

	/**
	 * 長音のラテン文字
	 */
	var latins = {
		hepburn : {
			'a' : 257,
			'i' : 299,
			'u' : 363,
			'e' : 275,
			'o' : 333
		},
		kunrei : {
			'a' : 226,
			'i' : 238,
			'u' : 251,
			'e' : 234,
			'o' : 244
		}
	};

	if (typeof targetStr !== 'string' && typeof targetStr !== 'number') {
		throw '変換する対象が文字列ではありません。';
	}

	if (typeof type !== 'string' || !type.match(/^(hepburn|kunrei)$/)) type = 'hepburn';

	if (!options) options = {};
	if (typeof options.kana !== 'string') options.kana = 'all';
	if (!options.kana.match(/^(all|hiragana|katakana)$/)) options.kana = 'all';
	if (typeof options.bmp !== 'boolean') options.bmp = true;
	if (typeof options.longSound !== 'string') options.longSound = 'latin';
	if (!options.longSound.match(/^(latin|hyphen)$/)) options.longSound = 'latin';

	var remStr = String(targetStr), result = '', slStr, roman, lastStr;

	/**
	 * 残りの文字列から1文字を切り抜く
	 * @return {string} 切り抜いた1つの文字列を返す
	 */
	var splice = function() {
		var oneChar = remStr.slice(0, 1);
		remStr = remStr.slice(1);
		return oneChar;
	};

	/**
	 * 残りの文字列の最初が小文字か判定
	 * @return {boolean} 小文字の場合はtrue、そうでない場合はfalseを返す
	 */
	var isSmallChar = function() {
		return !!remStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょァィゥェォャュョ]$/);
	};

	/**
	 * カタカナからひらがなへ変換
	 * @param {string} kana 元とおなるカタカナ
	 * @return {string} ひらがなへ変換された文字列
	 */
	var toHiragana = function(kana) {
		return kana.replace(/[\u30a1-\u30f6]/g, function(match) {
			return String.fromCharCode(match.charCodeAt(0) - 0x60);
		});
	};

	/**
	 * ひらがなから対応するローマ字を取得
	 * @param {string} kana 元となるひらがな
	 * @return {string} 見つかった場合は対応するローマ字、見つからなかったら元のひらがなを返す
	 */
	var getRoman = function(kana) {
		var roman = romanMap[toHiragana(kana)];
		if (roman) {
			if (typeof roman === 'string') {
				return roman;
			} else if (type === 'hepburn') {
				return roman.hepburn;
			} else if (type === 'kunrei') {
				return roman.kunrei;
			}
		} else {
			return kana;
		}
	};

	while (remStr) {
		slStr = splice();

		if (slStr.match(/^(っ|ッ)$/)) {
			slStr = splice();
			if (isSmallChar()) slStr += splice();

			roman = getRoman(slStr);
			roman = (roman !== slStr ? roman.slice(0, 1) : '') + roman;
		} else {
			if (isSmallChar()) slStr += splice();

			roman = getRoman(slStr);
		}

		var nextRoman = kanaToRoman(remStr.slice(0, 1));
		if (roman === 'n') {
			if (nextRoman.match(/^[aiueo]$/)) {
				roman += type === 'hepburn' ? '-': '\'';
			} else if (options.bmp && nextRoman.match(/^[bmp]/) && type === 'hepburn') {
				roman = 'm';
			}
		}

		result += roman;
	}

	return result;
};

const isUpperCase = c => {
	return /^[A-Z]+$/g.test(c)
}

function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }

	return arr;
}

let GameSystemData = {
    Questions:[
        ["ピンク","pinnku"],
        ["赤","aka"],
        ["オレンジ色","orennziiro"],
        ["黄色","kiiro"],
        ["黄緑","kimidori"],
        ["緑","midori"],
        ["青","ao"],
        ["水色","mizuiro"],
        ["紫色","murasakiiro"],
        ["犬","inu"],
        ["猫","neko"],
        ["本","hon"],
        ["家","ie"],
        ["電車","dennsya"],
        ["車","kuruma"],
        ["飛行機","hikouki"],
        ["北海道",kanaToRoman("ほっかいどう","kunrei")],
        ["青森県",kanaToRoman("あおもりけん","kunrei")],
        ["岩手県",kanaToRoman("いわてけん","kunrei")],
        ["宮城県",kanaToRoman("みやぎけん","kunrei")],
        ["秋田県",kanaToRoman("あきたけん","kunrei")],
        ["山形県",kanaToRoman("やまがたけん","kunrei")],
        ["福島県",kanaToRoman("ふくしまけん","kunrei")],
        ["茨城県",kanaToRoman("いばらきけん","kunrei")],
        ["栃木県",kanaToRoman("とちぎけん","kunrei")],
        ["群馬県",kanaToRoman("ぐんまけん","kunrei")],
        ["埼玉県",kanaToRoman("さいたまけん","kunrei")],
        ["千葉県",kanaToRoman("ちばけん","kunrei")],
        ["東京都",kanaToRoman("とうきょうと","kunrei")],
        ["神奈川県",kanaToRoman("かながわけん","kunrei")],
        ["新潟県",kanaToRoman("にいがたけん","kunrei")],
        ["富山県",kanaToRoman("とやまけん","kunrei")],
        ["石川県",kanaToRoman("いしかわけん","kunrei")],
        ["福井県",kanaToRoman("ふくいけん","kunrei")],
        ["山梨県",kanaToRoman("やまなしけん","kunrei")],
        ["長野県",kanaToRoman("ながのけん","kunrei")],
        ["岐阜県",kanaToRoman("ぎふけん","kunrei")],
        ["静岡県",kanaToRoman("しずおかけん","kunrei")],
        ["愛知県",kanaToRoman("あいちけん","kunrei")],
        ["三重県",kanaToRoman("みえけん","kunrei")],
        ["滋賀県",kanaToRoman("しがけん","kunrei")],
        ["京都府",kanaToRoman("きょうとふ","kunrei")],
        ["大阪府",kanaToRoman("おおさかふ","kunrei")],
        ["兵庫県",kanaToRoman("ひょうごけん","kunrei")],
        ["奈良県",kanaToRoman("ならけん","kunrei")],
        ["和歌山県",kanaToRoman("わかやまけん","kunrei")],
        ["鳥取県",kanaToRoman("とっとりけん","kunrei")],
        ["島根県",kanaToRoman("しまねけん","kunrei")],
        ["岡山県",kanaToRoman("おかやまけん","kunrei")],
        ["広島県",kanaToRoman("ひろしまけん","kunrei")],
        ["山口県",kanaToRoman("やまぐちけん","kunrei")],
        ["徳島県",kanaToRoman("とくしまけん","kunrei")],
        ["香川県",kanaToRoman("かがわけん","kunrei")],
        ["愛媛県",kanaToRoman("えひめけん","kunrei")],
        ["高知県",kanaToRoman("こうちけん","kunrei")],
        ["福岡県",kanaToRoman("ふくおかけん","kunrei")],
        ["佐賀県",kanaToRoman("さがけん","kunrei")],
        ["長崎県",kanaToRoman("ながさきけん","kunrei")],
        ["熊本県",kanaToRoman("くまもとけん","kunrei")],
        ["大分県",kanaToRoman("おおいたけん","kunrei")],
        ["宮崎県",kanaToRoman("みやざきけん","kunrei")],
        ["鹿児島県",kanaToRoman("かごしまけん","kunrei")],
        ["沖縄県",kanaToRoman("おきなわけん","kunrei")],
    ]
}

GameSystemData.Questions = fisherYatesShuffle(GameSystemData.Questions);
GameSystemData.Questions.length = 10;

const vcan = document.createElement("canvas");
const vcon = vcan.getContext("2d");

const can = document.createElement("canvas");
const con = can.getContext("2d");

document.body.appendChild(can);

const input = document.getElementById("input");

const VS_W = 800;
const VS_H = 500;

const SCENE_00_TITLE = 0;
const SCENE_01_MENU = 1;
const SCENE_02_GAME = 2;
const SCENE_03_KEYSELECT = 3;

let menu_index = 0;
let q_index = 0;

let scene = SCENE_00_TITLE;

let keynames = [
	["1","2","3","4","5","6","7","8","9","0","-"],
	["q","w","e","r","t","y","u","i","o","p"],
	["a","s","d","f","g","h","j","k","l"],
	["z","x","c","v","b","n","m"],
]

let frame = 0;
let key = "";
let beforeKey = "";
let NextSceneFrame = 0;

let isOkShow = false;
let isOkFrame = -1;

const GAMEMODE_00_ROME = 0;
const GAMEMODE_01_KANA = 1;
const GAMEMODE_02_KEY = 2;

let GameMode = -1;

function G_Loop() {
    vcon.clearRect(0, 0, 500, 300);

    switch(scene){
        case SCENE_00_TITLE:
            G_Title_Draw();
            break;
        case SCENE_01_MENU:
            G_Menu_Draw();
            break;
        case SCENE_02_GAME:
            G_Game_Draw();
            break;
		case SCENE_03_KEYSELECT:
            G_KeySelect_Draw();
			break;
    }

    con.drawImage(vcan, 0, 0, VS_W, VS_H, 0, 0, can.width, can.height);

    frame++;
    requestAnimationFrame(G_Loop);
}

function G_Init() {
    let ScreenSize = innerHeight/VS_H - 0.05;

    can.width = VS_W*ScreenSize;
    can.height = VS_H*ScreenSize;

    con.imageSmoothingEnabled = false;
    vcon.imageSmoothingEnabled = false;

    vcan.width = VS_W;
    vcan.height = VS_H;

    requestAnimationFrame(G_Loop);
}

function ConReset(con) {
    con.fillStyle = "";
    con.strokeStyle = "";
    con.lineWidth = "";
    con.font = "";
}

function G_Title_Draw() {
    q_index = 0;

    vcon.fillStyle = "#76c8f1";
    vcon.fillRect(0, 0, VS_W, VS_H);

    vcon.textAlign = "center";
    vcon.font = "bold 40px sans-serif";
    vcon.fillStyle = "#7548ef";

    let text = vcon.measureText("タイピング 広場");
    vcon.fillText("タイピング 広場",VS_W/2,100 + 120 + Math.sin((frame - 50) / 10) * 7,text.width)

    vcon.textAlign = "center";
    vcon.font = "bold 40px sans-serif";
    vcon.fillStyle = "#272727";

    text = vcon.measureText("スペースキーを押してください");
    vcon.fillText("スペースキーを押してください",VS_W/2,VS_H/2 + 120 + Math.sin(frame / 10) * 10,text.width)

    if(input.value === " ") input.value = "", scene++;

    input.value = ""

    ConReset(vcon);
}

function G_Menu_Draw() {
    q_index = 0;

    vcon.fillStyle = "#76c8f1";
    vcon.fillRect(0, 0, VS_W, VS_H);

    vcon.textAlign = "left";
    vcon.font = "bold 28px sans-serif";
    vcon.fillStyle = "#272727";

    if(input.value === "w" && menu_index !== 0) input.value = "", menu_index--;
    if(input.value === "s" && menu_index !== 2) input.value = "", menu_index++;

	if(menu_index === GAMEMODE_00_ROME && input.value === "\n") {
		input.value = "";
		scene = SCENE_02_GAME;
		GameMode = GAMEMODE_00_ROME;
		return;
	}

	if(menu_index === GAMEMODE_01_KANA && input.value === "\n") {
		input.value = "";
		scene = SCENE_02_GAME;
		GameMode = GAMEMODE_01_KANA;
		return;
	}

	if(menu_index === GAMEMODE_02_KEY && input.value === "\n") {
		input.value = "";
		scene = SCENE_03_KEYSELECT;
		GameMode = GAMEMODE_02_KEY;
		NextSceneFrame = frame;
		return;
	}

    input.value = ""

    let text = vcon.measureText("ローマ字モード");
    vcon.fillText("ローマ字モード",130,170 + Math.cos(frame / 10) * 2,text.width)

	text = vcon.measureText("かなモード");
    vcon.fillText("かなモード",130,220 + Math.cos(frame / 10) * 2,text.width)

	text = vcon.measureText("キーの場所");
    vcon.fillText("キーの場所",130,270 + Math.cos(frame / 10) * 2,text.width)

	text = vcon.measureText(">");
	vcon.fillText(">",100 + Math.sin(frame / 10) * 8,170 + menu_index * 50 + Math.cos(frame / 10) * 2,text.width)

	text = vcon.measureText("'W'で↑、'S'で↓、'エンター'で決定");
    vcon.fillText("'W'で↑、'S'で↓、エンターで決定",130,100 + Math.cos(frame / 10) * 2,text.width)

    ConReset(vcon);
}

function G_Game_Draw(){
    vcon.fillStyle = "#76c8f1";
    vcon.fillRect(0, 0, VS_W, VS_H);

    vcon.textAlign = "left";
    vcon.font = "bold 40px sans-serif";
    vcon.fillStyle = "#272727";

	if(GameMode === GAMEMODE_00_ROME) {
		if(GameSystemData.Questions[q_index][1] === input.value){
			input.value = "";
			q_index++;
			if(q_index === GameSystemData.Questions.length) {
				alert("終了しました");
				scene = SCENE_00_TITLE;
				return;
			}
		}

		vcon.font = "normal 15px sans-serif";
		vcon.fillStyle = "#eee";
		let text = con.measureText("'esc'で終了         ");
		vcon.fillText("'esc'で終了",100,30,text.width);

		vcon.fillStyle = "#272727";
		vcon.font = "bold 40px  sans-serif";

		text = vcon.measureText(GameSystemData.Questions[q_index][0]);
		vcon.fillText(GameSystemData.Questions[q_index][0],100,80,text.width)
		ConReset(vcon);
		let rometext = GameSystemData.Questions[q_index][1].split("");
		let inputtext = input.value.split("");
		let romewidth = 0;

		for(let i = 0; i < rometext.length; i++)
		{
			if(inputtext.length > i && inputtext[i] === rometext[i]){
				vcon.fillStyle = "#16a";
			}else if(inputtext.length > i){
				vcon.fillStyle = "#a16";
			}else{
				vcon.fillStyle = "#272727";
			}

			text = vcon.measureText(rometext[i]);
			vcon.fillText(rometext[i],romewidth + 100,40+80,text.width)
			ConReset(vcon);
			romewidth += text.width;
		}

		vcon.fillStyle = "#272727";
		text = vcon.measureText(input.value);
		vcon.fillText(input.value,100,130+80,text.width)
		ConReset(vcon);

		if(isEscKey){
			scene = SCENE_00_TITLE;
		}
	}else if(GameMode === GAMEMODE_01_KANA){
		if(GameSystemData.Questions[q_index][0] + "\n" === input.value && isEnterKey){
			input.value = "";
			q_index++;
			if(q_index === GameSystemData.Questions.length) {
				alert("終了しました");
				scene = SCENE_00_TITLE;
				return;
			}
		}

		vcon.font = "normal 15px sans-serif";
		vcon.fillStyle = "#eee";
		let text = con.measureText("'esc'で終了         ");
		vcon.fillText("'esc'で終了",100,30,text.width);

		text = vcon.measureText(GameSystemData.Questions[q_index][1]);
		vcon.fillText(GameSystemData.Questions[q_index][1],100,120,text.width)

		let kanatext = GameSystemData.Questions[q_index][0].split("");
		let inputtext = input.value.split("");
		let kanawidth = 0;

		for(let i = 0; i < kanatext.length; i++)
		{
			if(inputtext.length > i && inputtext[i] === kanatext[i]){
				vcon.fillStyle = "#16a";
			}else if(inputtext.length > i){
				vcon.fillStyle = "#a16";
			}else{
				vcon.fillStyle = "#272727";
			}

			text = vcon.measureText(kanatext[i]);
			vcon.fillText(kanatext[i],kanawidth + 100,80,text.width)
			ConReset(vcon);
			kanawidth += text.width;
		}

		vcon.fillStyle = "#272727";
		text = vcon.measureText(input.value);
		vcon.fillText(input.value,100,130+80,text.width)
		ConReset(vcon);

		if(isEscKey){
			scene = SCENE_00_TITLE;
		}
	}else if(GameMode === GAMEMODE_02_KEY) {
		vcon.textAlign = "left";
		vcon.fillStyle = "#939494";
		vcon.fillRect(25,170,360,150)
		vcon.font = "normal 15px sans-serif";

		vcon.fillStyle = "#eee";
		let text = con.measureText("'d'で戻る         ");
		vcon.fillText("'d'で戻る",100,50,text.width);

		vcon.fillStyle = "#272727";
		vcon.textAlign = "center";
		vcon.font = "bold 40px sans-serif";

		for(let x = 0; x < 11; x++) {
			vcon.fillStyle = "#252526";
			vcon.fillRect(30 + x * 32,175,30,30);

			if(key.toLocaleLowerCase() === keynames[0][x]){
				vcon.font = "bold 15px sans-serif";
				vcon.fillStyle = "#ff5";
			}else{
				vcon.font = "normal 15px sans-serif";
				vcon.fillStyle = "#eee";
			}

			let text = con.measureText(keynames[0][x]);
			vcon.fillText(keynames[0][x],30 + x * 32 + 15,175 + 15 + text.actualBoundingBoxAscent / 2,30,30);
		}

		for(let x = 0; x < 10; x++) {
			vcon.fillStyle = "#252526";
			vcon.fillRect(40 + x * 32,175 + 32 * 1 ,30,30);

			if(key.toLocaleLowerCase() === keynames[1][x]){
				vcon.font = "bold 15px sans-serif";
				vcon.fillStyle = "#ff5";
			}else{
				vcon.font = "normal 15px sans-serif";
				vcon.fillStyle = "#eee";
			}
			let text = con.measureText(keynames[1][x]);
			vcon.fillText(keynames[1][x],40 + x * 32 + 15,175 + 32 * 1 + 15 + text.actualBoundingBoxAscent / 2,30,30);
		}

		for(let x = 0; x < 9; x++) {
			vcon.fillStyle = "#252526";
			vcon.fillRect(50 + x * 32,175 + 32 * 2 ,30,30);

			if(key.toLocaleLowerCase() === keynames[2][x]){
				vcon.font = "bold 15px sans-serif";
				vcon.fillStyle = "#ff5";
			}else{
				vcon.font = "normal 15px sans-serif";
				vcon.fillStyle = "#eee";
			}

			let text = con.measureText(keynames[2][x]);
			vcon.fillText(keynames[2][x],50 + x * 32 + 15,175 + 32 * 2 + 15 + text.actualBoundingBoxAscent / 2,30,30);
		}

		for(let x = 0; x < 7; x++) {
			vcon.fillStyle = "#252526";
			vcon.fillRect(62 + x * 32,175 + 32 * 3 ,30,30);

			if(key.toLocaleLowerCase() === keynames[3][x]){
				vcon.font = "bold 15px sans-serif";
				vcon.fillStyle = "#ff5";
			}else{
				vcon.font = "normal 15px sans-serif";
				vcon.fillStyle = "#eee";
			}

			let text = con.measureText(keynames[3][x]);
			vcon.fillStyle = "#eee";
			vcon.fillText(keynames[3][x],62 + x * 32 + 15,175 + 32 * 3 + 15 + text.actualBoundingBoxAscent / 2,30,30);
		}

		if(input.value === "d"){
			scene = SCENE_03_KEYSELECT;
			NextSceneFrame = 0;
		}

		input.value = "";
	}
}

function G_KeySelect_Draw() {
    vcon.fillStyle = "#76c8f1";
    vcon.fillRect(0, 0, VS_W, VS_H);

	vcon.font = "normal 15px sans-serif";
	vcon.fillStyle = "#eee";
	let text = con.measureText("'esc'で終了         ");
	vcon.fillText("'esc'で終了",100,30,text.width);

    vcon.textAlign = "left";
    vcon.font = "bold 28px sans-serif";
    vcon.fillStyle = "#272727";

	if(input.value.length >= 2 && input.value[1] !== "\n") {
		input.value = input.value[1];
	}

	text = vcon.measureText("位置を知りたいキーを押してください：" + input.value);
    vcon.fillText("位置を知りたいキーを押してください：" + input.value,130,100 + Math.cos(frame / 10),text.width)

	vcon.textAlign = "center";
	vcon.fillStyle = "#939494";

	vcon.fillRect(25,170,360,150)
	vcon.font = "normal 15px sans-serif";

	for(let x = 0; x < 11; x++) {
		vcon.fillStyle = "#252526";
		vcon.fillRect(30 + x * 32,175,30,30);

		if(input.value.toLocaleLowerCase() === keynames[0][x]){
			vcon.font = "bold 15px sans-serif";
			vcon.fillStyle = "#ff5";
		}else{
			vcon.font = "normal 15px sans-serif";
			vcon.fillStyle = "#eee";
		}

		let text = con.measureText(keynames[0][x]);
		vcon.fillText(keynames[0][x],30 + x * 32 + 15,175 + 15 + text.actualBoundingBoxAscent / 2,30,30);
	}

	for(let x = 0; x < 10; x++) {
		vcon.fillStyle = "#252526";
		vcon.fillRect(40 + x * 32,175 + 32 * 1 ,30,30);

		if(input.value.toLocaleLowerCase() === keynames[1][x]){
			vcon.font = "bold 15px sans-serif";
			vcon.fillStyle = "#ff5";
		}else{
			vcon.font = "normal 15px sans-serif";
			vcon.fillStyle = "#eee";
		}
		let text = con.measureText(keynames[1][x]);
		vcon.fillText(keynames[1][x],40 + x * 32 + 15,175 + 32 * 1 + 15 + text.actualBoundingBoxAscent / 2,30,30);
	}

	for(let x = 0; x < 9; x++) {
		vcon.fillStyle = "#252526";
		vcon.fillRect(50 + x * 32,175 + 32 * 2 ,30,30);

		if(input.value.toLocaleLowerCase() === keynames[2][x]){
			vcon.font = "bold 15px sans-serif";
			vcon.fillStyle = "#ff5";
		}else{
			vcon.font = "normal 15px sans-serif";
			vcon.fillStyle = "#eee";
		}

		let text = con.measureText(keynames[2][x]);
		vcon.fillText(keynames[2][x],50 + x * 32 + 15,175 + 32 * 2 + 15 + text.actualBoundingBoxAscent / 2,30,30);
	}

	for(let x = 0; x < 7; x++) {
		vcon.fillStyle = "#252526";
		vcon.fillRect(62 + x * 32,175 + 32 * 3 ,30,30);

		if(input.value.toLocaleLowerCase() === keynames[3][x]){
			vcon.font = "bold 15px sans-serif";
			vcon.fillStyle = "#ff5";
		}else{
			vcon.font = "normal 15px sans-serif";
			vcon.fillStyle = "#eee";
		}

		let text = con.measureText(keynames[3][x]);
		vcon.fillText(keynames[3][x],62 + x * 32 + 15,175 + 32 * 3 + 15 + text.actualBoundingBoxAscent / 2,30,30);
	}

	if(isEnterKey && NextSceneFrame+20 < frame && input.value.length !== 0 && input.value !== "\n") {
		scene = SCENE_02_GAME;
		key = input.value[0];
		NextSceneFrame = 0;
	}

	if(isEscKey && NextSceneFrame+60 < frame ){
		scene = SCENE_00_TITLE;
		NextSceneFrame = 0;
	}
}

let isEnterKey = false;
let isEscKey = false;

G_Init();

input.onblur = () => {
    input.focus();
}

input.onkeydown = (e) => {
	if(e.key === "Enter") {
		isEnterKey = true;
	}
	if(e.key === "Escape") {
		isEscKey = true;
	}
}

input.onkeyup = (e) => {
	if(e.key === "Enter") {
		isEnterKey = false;
	}
	if(e.key === "Escape") {
		isEscKey = false;
	}
}