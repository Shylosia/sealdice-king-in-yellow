// ==UserScript==
// @name         黄衣之王(纯文字版)
// @author       巫洁鸾
// @version      1.0.2
// @description  “王与杖”牌阵以及其他常用牌阵的纯文字版本，去除了所有图片依赖和CQ码。
// @timestamp    1716940800
// @license      MIT
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

let ext = seal.ext.find('KingInYellowSuite');
if (!ext) {
    ext = seal.ext.new('KingInYellowSuite', '巫洁鸾', '1.0.2');
    seal.ext.register(ext);
}

// === 卡牌数据 ===
const CARD_DB = [
    { en: "Le Mat", cn: "愚者" }, { en: "I: Le Bateleur", cn: "魔术师" }, { en: "II: Junon", cn: "女祭司" }, 
    { en: "III: L'Impératrice", cn: "皇后" }, { en: "IV: L'Empereur", cn: "皇帝" }, { en: "V: Jupiter", cn: "教皇" }, 
    { en: "VI: Les Amoureux", cn: "恋人" }, { en: "VII: Le Chariot", cn: "战车" }, { en: "VIII: La Force", cn: "力量" }, 
    { en: "IX: L'Ermite", cn: "隐士" }, { en: "X: La Roue de Fortune", cn: "命运之轮" }, { en: "XI: La Justice", cn: "正义" }, 
    { en: "XII: Le Pendu", cn: "倒吊人" }, { en: "XIII: La Mort", cn: "死神" }, { en: "XIV: Temperance", cn: "节制" }, 
    { en: "XV: Le Diable", cn: "恶魔" }, { en: "XVI: La Maison Dieu", cn: "高塔" }, { en: "XVII: L'Etoile", cn: "星星" }, 
    { en: "XVIII: La Lune", cn: "月亮" }, { en: "XIX: Le Soleil", cn: "太阳" }, { en: "XX: Le Jugement", cn: "审判" }, 
    { en: "XXI: Le Monde", cn: "世界" }
];

const SUITS = [
    { name_en: "d'Épée", name_cn: "宝剑" },   
    { name_en: "de Bâton", name_cn: "权杖" }, 
    { name_en: "de Coupe", name_cn: "圣杯" }, 
    { name_en: "de Denier", name_cn: "星币" } 
];
const RANKS = [
    { en: "Roi", cn: "国王" }, { en: "Reine", cn: "王后" }, { en: "Chevalier", cn: "骑士" }, { en: "Valet", cn: "侍从" },
    { en: "X", cn: "十" }, { en: "IX", cn: "九" }, { en: "VIII", cn: "八" }, { en: "VII", cn: "七" }, 
    { en: "VI", cn: "六" }, { en: "V", cn: "五" }, { en: "IV", cn: "四" }, { en: "III", cn: "三" }, 
    { en: "II", cn: "二" }, { en: "I", cn: "一" }
];

SUITS.forEach(suit => {
    RANKS.forEach(rank => {
        CARD_DB.push({
            en: `${rank.en} ${suit.name_en}`,
            cn: `${suit.name_cn}${rank.cn}`
        });
    });
});

// === KAS 文本数据库 ===
const TEXT_DATA = {
    en: {
        danger_tag: "⚠️",
        monarch_title: "0. The Monarch",
        monarch_footer: "The King sits upon his throne, laughing at the farce.",
        monarch_warn: "The King is in play. The seal is broken.",
        signifier_title: "1. Signifier",
        signifier_desc: "The card chosen by the querent to suggest the situation.",
        unknown_card: "The Ineffable",
        // 增加正逆位文本
        upright: " (Upright)",
        reversed: " (Reversed)",
        positions: [
            null, null,
            { title: "2. Mask", desc: "This is how the querent presents themself to others." },
            { title: "3. Performance", desc: "The events and other factors immediately around the situation." },
            { title: "4. Audience", desc: "The people immediately surrounding the situation." },
            { title: "5. Unconscious", desc: "The inner nature of the querent as it relates to the situation." },
            { title: "6. Actor", desc: "How the querent perceives themself as relates to the situation." },
            { title: "7. Script", desc: "The factors that brought the situation to its present state." },
            { title: "8. Stage", desc: "The backdrop of the situation. This concerns factors less visible than the Performance but sometimes more crucial." },
            { title: "9. Unexpected", desc: "A surprise that lies in wait." },
            { title: "10. Rising Action", desc: "The next phase of the situation." },
            { title: "11. Fate", desc: "That which cannot be changed." },
            { title: "12. Revelation", desc: "That which will be revealed." },
            { title: "13. Denouement", desc: "The final outcome of the situation." }
        ]
    },
    cn: {
        danger_tag: "⚠️",
        monarch_title: "0. 致敬",
        monarch_footer: "王在王座上端坐，笑看闹剧。",
        monarch_warn: "王已入局。封印解除。",
        signifier_title: "1. 指示物",
        signifier_desc: "求问者选择的牌，用于暗示当前的处境。",
        unknown_card: "不可名状之牌",
        // 增加正逆位文本 (无括号)
        upright: " (正位)",
        reversed: " (逆位)",
        positions: [
            null, null,
            { title: "2. 面具", desc: "求问者如何向他人展示自己。" },
            { title: "3. 表演", desc: "与现在的处境直接相关的事件和其他因素。" },
            { title: "4. 观众", desc: "与现在的处境相关的人们。" },
            { title: "5. 潜意识", desc: "求问者与现在的处境相关的内在本质。" },
            { title: "6. 演员", desc: "求问者在处境中对自我的认知。" },
            { title: "7. 剧本", desc: "导致处境发展至当前状态的因素。" },
            { title: "8. 舞台", desc: "处境发生的背景。这涉及了一些比表演更隐蔽，但有时更关键的因素。" },
            { title: "9. 意外", desc: "尚未发生的意外。" },
            { title: "10. 上升情节", desc: "处境的下一个阶段。" },
            { title: "11. 命运", desc: "无法改变的事物。" },
            { title: "12. 启示", desc: "将被揭示的事物。" },
            { title: "13. 结局", desc: "处境的最终结果。" }
        ]
    }
};

// === 文档部分 (无图片) ===

const LORE_EN = `【The King and Staff Reading Method】
For some clients, Sosostris used a novel reading method apparently of her own invention that is unique to this deck. (The method was later known as King and Staff owing to its suggestive form, but we have no evidence that Sosostris ever used this term herself.) Its most unusual aspect is that the governing metaphor is that of a theatrical play and its elements: the script, the stage, the actor, and so on. This suggests that Sosostris had a background in the theater, although there is no information or even rumor to that effect. It also thematically aligns with the King in Yellow play, which is doubly curious given that the deck was long rumored to exist before the play was ever published.

If you wish to perform a reading using this method and the Arc Dream edition of the King in Yellow deck, the following steps are the best reconstruction we can make from our limited sources.

First, remove the Emperor card from the deck and set it aside since it was not present in the original King in Yellow deck except under unusual circumstances. We encourage you to leave our version of the Emperor face up, right side up, off to the side, as a show of respect befitting such a revered monarch.

Second, the medium hands the deck to the querent. The querent looks at all the cards and chooses one as the Signifier, which is placed on the table at the top of the formation. The Signifier represents the querent’s idea of the situation they are here to explore. It can be upright or inverted as the querent or the medium think best.

Third, the trickiest and most crucial part: the selection of the ineffable card. The medium shuffles the deck face down and then cuts it just as you would a deck of playing cards. The bottom card of the upper half of the cut deck is flipped so it now faces up—but retaining its normal or reversed orientation—and it is returned to its place. This manipulation must be conducted with neither the medium nor the querent seeing its face. You now have a deck comprising 76 face-down cards and one face-up card. This unusual card is known as the ineffable and its nature and meaning are not for the living to see or understand. Rather, it is meant for any unseen observers in attendance at the reading.

Fourth, the two halves of the deck are recombined and then flipped over and shuffled face up, so the ineffable card may migrate freely face down without its identity being revealed.

Fifth, the medium deals out twelve cards face up from the bottom of the deck into the depicted pattern beneath the Signifier. The cards should be laid out in order from 2–13. If the ineffable card is dealt, it will already be face down and it must stay so even when laid out for the reading. That card may not be seen by the living. When the reading is concluded, the card should be restored to its normal facing and shuffled into the deck, yet again without anyone seeing what it was.

Sixth, if the ineffable card is not among those drawn for the reading, the medium should find it in the deck and place it face down and unseen covering the Signifier card where it represents an unknowable influence upon the life of the querent.

Finally, the medium interprets the reading.`;

const LORE_CN = `【王与杖解读法】
对于某些客户，索索斯特里斯使用了一种显然由她自己发明的新颖阅读方法，这是这套牌独有的。（由于其暗示性的形式，这种方法后来被称为“王与杖”，但我们没有证据表明索索斯特里斯本人曾使用过这个术语。）它最不寻常的地方在于，其核心隐喻是一出戏剧及其元素：剧本、舞台、演员等等。这表明索索斯特里斯有戏剧背景，尽管没有任何信息甚至谣言能证实这一点。它在主题上也与《黄衣之王》剧本相吻合，考虑到这套牌据传在剧本出版之前很久就已经存在，这更是加倍的离奇。

如果您希望使用这种方法和 Arc Dream 版的《黄衣之王》塔罗牌进行阅读，以下步骤是我们根据有限的资料所能做出的最佳复原。

第一，从牌组中移除皇帝牌并将其放在一边，因为除了极不寻常的情况外，原来的《黄衣之王》牌组中并不存在这张牌。我们鼓励您将我们版本的皇帝牌面朝上、正位放置在一旁，以示对这位尊崇君主的敬意。

第二，灵媒将牌组交给求问者。求问者查看所有的牌并选择一张作为指示物，将其放在牌阵的最上方。指示物代表了求问者对他们此次想要探索的处境的看法。它可以是正位或逆位，取决于求问者或灵媒认为怎样最好。

第三，最棘手也是最关键的部分：不可名状之牌的选择。灵媒将牌组面朝下洗牌，然后像切普通扑克牌一样切牌。被切开的牌组上半部分的底牌被翻转过来，使其面朝上——但保持其原有的正位或逆位方向——然后放回原处。这一操作必须在灵媒和求问者都看不见牌面的情况下进行。现在您有一副包含 76 张面朝下的牌和 1 张面朝上的牌的牌组。这张不寻常的牌被称为不可名状之牌，其性质和意义不是给活人看或理解的。相反，它是为了阅读过程中任何看不见的观察者准备的。

第四，将牌组的两半重新组合，然后整体翻转过来面朝上洗牌，这样不可名状之牌就可以在不暴露身份的情况下，以面朝下的状态自由移动。

第五，灵媒从牌组底部抽出十二张牌，面朝上按照描绘的模式发到指示物下方。牌应当按 2–13 的顺序排列。如果发到了不可名状之牌，它已经是面朝下的，并且必须保持这样，即使放在牌阵中也是如此。活人不得观看那张牌。当阅读结束时，该牌应恢复其正常朝向并洗回牌组，同样不能让任何人看到它是什么。

第六，如果“不可名状之牌”不在抽出的牌中，灵媒应在牌组中找到它，并将其面朝下、不被看见地覆盖在“指示物”牌上，它在那里代表着对求问者生命的一种不可知的、幽冥的影响。

最后，灵媒解读牌阵。`;

// 2. Help: 操作手册 (中/英)
const USAGE_EN = `【King and Staff Commands】
.kas [Id] [Orientation] [Language] [Special]
(Parameters can be entered in any order)

1. Id: 0-77
   Selects the Signifier. Default is random.
2. Orientation: + (Upright), - (Reversed)
   Forces the orientation of the Signifier.
3. Language: en, cn (Default is CN)
   en: English output.
   cn: Chinese output.
4. Special: danger
   Activates Danger Mode. The Emperor enters the deck.

【Examples】
.kas            (Random, Chinese)
.kas en         (Random, English)
.kas 10- en     (Sig 10 Reversed, English)
.kas danger     (Danger Mode)

【Other】
.kas lore       (View the background story in Chinese)
.kas lore en    (View the background story in English)`;

const USAGE_CN = `【王与杖指令手册】
.kas [序号] [方向] [语言] [特殊]
(支持乱序输入)

1. 序号：0-77
   用于指定指示物。若不填则随机抽取。
2. 方向：+ (正位), - (逆位)
   用于强制指定指示物的方向。
3. 语言：en, cn (默认为中文)
   en: 切换至英文/法文版输出。
   cn: 保持中文输出。
4. 特殊：danger (或：危)
   开启危险模式。皇帝牌将解除封印，混入牌堆。

【使用示例】
.kas            (全随机，中文)
.kas en         (全随机，英文)
.kas 10 cn      (指定10号牌为指示物，中文)
.kas 10- en     (指定10号逆位，英文)
.kas danger     (危险模式，皇帝入局)

【其他功能】
.kas lore       (查看中文仪式背景故事)
.kas lore en    (查看英文仪式背景故事)`;

// ==========================================
// KAS 指令逻辑
// ==========================================
const cmdKas = seal.ext.newCmdItemInfo();
cmdKas.name = 'King and Staff';
cmdKas.help = USAGE_CN; 

cmdKas.solve = function (ctx, msg, argv) {
    const args = argv.args;
    
    // === 指令分流 (Help & Lore) ===
    if (args.length > 0) {
        const cmd = args[0].toLowerCase();
        
        // Help 指令
        if (cmd === 'help' || cmd === '-h') {
            if (args.length > 1 && (args[1].toLowerCase() === 'en' || args[1].toLowerCase() === 'english')) {
                seal.replyToSender(ctx, msg, USAGE_EN);
            } else {
                seal.replyToSender(ctx, msg, USAGE_CN);
            }
            return seal.ext.newCmdExecuteResult(true);
        }

        // Lore 指令
        if (cmd === 'lore' || cmd === '仪式' || cmd === '背景') {
            if (args.length > 1 && (args[1].toLowerCase() === 'en' || args[1].toLowerCase() === 'english')) {
                seal.replyToSender(ctx, msg, LORE_EN);
            } else {
                seal.replyToSender(ctx, msg, LORE_CN);
            }
            return seal.ext.newCmdExecuteResult(true);
        }
    }

    const EMPEROR_ID = 4;
    const BACK_ID = 78;
    const MAX_ID = 77;

    // 默认值
    let signifierId = -1;
    let isAutoSignifier = true;
    let forceSigReversed = null;
    let isDangerMode = false;
    let lang = 'cn'; // <--- 默认中文

    for (let i = 0; i < args.length; i++) {
        let arg = args[i].toLowerCase();
        
        if (arg === 'cn' || arg === 'zh' || arg === '中文') { lang = 'cn'; continue; }
        if (arg === 'en' || arg === 'english') { lang = 'en'; continue; }
        if (arg === 'danger' || arg === 'emperor' || arg === '危') { isDangerMode = true; continue; }
        if (arg === '+' || arg === '正') { forceSigReversed = false; continue; }
        if (arg === '-' || arg === '逆') { forceSigReversed = true; continue; }
        
        if (arg.includes('+') || arg.includes('正')) forceSigReversed = false;
        else if (arg.includes('-') || arg.includes('逆')) forceSigReversed = true;

        let numMatch = arg.match(/\d+/);
        if (numMatch) {
            let pid = parseInt(numMatch[0]);
            if (pid >= 0 && pid <= MAX_ID) {
                signifierId = pid;
                isAutoSignifier = false;
            }
        }
    }

    const T = TEXT_DATA[lang];

    function formatCard(id, isReversed) {
        if (id === BACK_ID) {
            // 不可名状之牌不显示正逆位
            return `【???】 ${T.unknown_card}`;
        }
        const cardName = (lang === 'cn') ? CARD_DB[id].cn : CARD_DB[id].en;
        const orientationStr = isReversed ? T.reversed : T.upright; // " (逆位)" 或 " (正位)"
        return `【${id}】 ${cardName}${orientationStr}`;
    }

    let output = ">>> King and Staff";
    if (isDangerMode) output += ` ${T.danger_tag}`;
    output += "\n";

    if (!isDangerMode) {
        output += "--------------------\n";
        output += `${T.monarch_title}\n`;
        const empName = (lang === 'cn') ? CARD_DB[EMPEROR_ID].cn : CARD_DB[EMPEROR_ID].en;
        output += `【${EMPEROR_ID}】 ${empName}\n`;
        output += `${T.monarch_footer}\n`;
    } else {
        output += `${T.monarch_warn}\n`;
    }

    let deck = [];
    for (let i = 0; i <= MAX_ID; i++) {
        if (!isDangerMode && i === EMPEROR_ID) continue; 
        if (!isAutoSignifier && i === signifierId) continue;
        deck.push(i);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    deck = shuffle(deck);

    if (isAutoSignifier) signifierId = deck.shift();
    let sigReversed = (forceSigReversed !== null) ? forceSigReversed : (Math.random() < 0.5);

    const randomIdx = Math.floor(Math.random() * deck.length);
    deck[randomIdx] = BACK_ID;

    deck = shuffle(deck);
    const spreadIds = deck.slice(0, 12);

    let ineffableIsOnTable = false;
    let spreadOutput = "";

    for (let i = 0; i < 12; i++) {
        let id = spreadIds[i];
        let isReversed = Math.random() < 0.5;
        if (id === BACK_ID) ineffableIsOnTable = true;
        
        const pos = T.positions[i + 2];
        spreadOutput += `${pos.title}:\n${pos.desc}\n${formatCard(id, isReversed)}\n\n`;
    }

    let sigDisplay = `${T.signifier_title}:\n${T.signifier_desc}\n${formatCard(signifierId, sigReversed)}`;
    
    if (!ineffableIsOnTable) {
        // 文字替代图片：不可名状之牌覆盖在指示物上
        const hiddenText = (lang === 'cn') ? "[一张面朝下的牌覆盖于此]" : "[A face-down card covers this]";
        sigDisplay += `\n\n${hiddenText}`;
    }

    output += "--------------------\n";
    output += sigDisplay + "\n\n";
    output += spreadOutput;

    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
};

// ==========================================
// Tarot 通用牌阵
// ==========================================
const cmdTarot = seal.ext.newCmdItemInfo();
cmdTarot.name = 'tarot';
// 修改：Tarot Help 适配主流关键字
cmdTarot.help = '通用塔罗牌阵\n' +
    '------------------------------\n' +
    '基础牌阵：\n' +
    '.tarot 圣杯        是与否问题\n' +
    '.tarot 圣三角      过去、现在、未来\n' +
    '.tarot 四元素      土、水、火、风状态\n' +
    '\n' +
    '进阶牌阵：\n' +
    '.tarot 十字        基础十字，5张牌\n' +
    '.tarot 五芒星      发展与内心，5张牌\n' +
    '.tarot 六芒星      身心灵环境，6张牌\n' +
    '.tarot 七芒星      障碍与结果，7张牌\n' +
    '.tarot 凯尔特      凯尔特十字，10张牌\n' +
    '\n' +
    '特殊牌阵：\n' +
    '.tarot 十二星座    黄道十二宫运势\n' +
    '.tarot 四季        季度运势';

cmdTarot.solve = function (ctx, msg, argv) {
    if (argv.getArgN(1) === 'help' || argv.getArgN(1) === '-h') {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true; return ret;
    }
    const method = argv.getArgN(1).toLowerCase();
    const MAX_ID = 77;
    let deck = [];
    for (let i = 0; i <= MAX_ID; i++) deck.push(i);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 纯文字版格式化函数
    function formatCard(id, isReversed) {
        const name = CARD_DB[id].cn; 
        const orientationStr = isReversed ? " (逆位)" : " (正位)";
        return `【${id}】 ${name}${orientationStr}`;
    }

    deck = shuffle(deck);
    let titles = [];
    let spreadName = "";

    if (['圣杯', 'grail'].includes(method)) { 
        spreadName = "圣杯阵"; 
        titles = ["1. 回答"]; 
    } 
    else if (['十字', 'cross'].includes(method)) { 
        spreadName = "十字阵"; 
        titles = ["1. 提问者", "2. 过去", "3. 现在", "4. 未来", "5. 潜在影响"]; 
    }
    else if (['六芒星', 'hexagram'].includes(method)) { 
        spreadName = "六芒星阵"; 
        titles = ["1. 中心", "2. 身体", "3. 精神", "4. 情感", "5. 环境", "6. 社会关系"]; 
    }
    // 关键字 七芒星 / seven / 七张
    else if (['七芒星', 'seven', '七张'].includes(method)) { 
        spreadName = "七芒星牌阵"; 
        titles = ["1. 现状", "2. 过去", "3. 发展方向", "4. 外部影响", "5. 内心期望", "6. 障碍", "7. 最终结果"]; 
    }
    else if (['凯尔特', 'celtic'].includes(method)) { 
        spreadName = "凯尔特十字"; 
        titles = ["1. 现状", "2. 阻碍", "3. 基础", "4. 过去", "5. 目标", "6. 未来", "7. 自我", "8. 环境", "9. 希望与恐惧", "10. 结果"]; 
    }
    // 关键字 圣三角 / 三张
    else if (['圣三角', '三张', 'three'].includes(method)) { 
        spreadName = "圣三角牌阵"; 
        titles = ["1. 过去", "2. 现在", "3. 未来"]; 
    }
    // 关键字 五芒星 / 五张
    else if (['五芒星', '五张', 'five'].includes(method)) { 
        spreadName = "五芒星牌阵"; 
        titles = ["1. 现状", "2. 过去", "3. 未来", "4. 外部影响", "5. 内心想法"]; 
    }
    // 关键字 四元素 / 元素
    else if (['四元素', '元素', 'element'].includes(method)) { 
        spreadName = "四元素阵"; 
        titles = ["1. 土 (物质)", "2. 水 (情感)", "3. 火 (行动)", "4. 风 (思想)"]; 
    }
    // 关键字 十二星座 / 星座
    else if (['十二星座', '星座', 'zodiac'].includes(method)) { 
        spreadName = "十二星座阵"; 
        titles = ["1. 白羊宫", "2. 金牛宫", "3. 双子宫", "4. 巨蟹宫", "5. 狮子宫", "6. 处女宫", "7. 天秤宫", "8. 天蝎宫", "9. 射手宫", "10. 摩羯宫", "11. 水瓶宫", "12. 双鱼宫"]; 
    }
    // 关键字 四季 / 季节
    else if (['四季', '季节', 'season'].includes(method)) { 
        spreadName = "四季阵"; 
        titles = ["1. 春", "2. 夏", "3. 秋", "4. 冬"]; 
    }
    else { 
        spreadName = "单张指引"; 
        titles = ["1. 结果"]; 
    }

    let count = titles.length;
    const spreadIds = deck.slice(0, count);
    let output = `>>> ${spreadName}\n--------------------\n`;
    for (let i = 0; i < count; i++) {
        let id = spreadIds[i];
        let isReversed = Math.random() < 0.5;
        output += `${titles[i]}:\n${formatCard(id, isReversed)}\n\n`;
    }
    seal.replyToSender(ctx, msg, output);
    return seal.ext.newCmdExecuteResult(true);
};

// 注册
ext.cmdMap['kas'] = cmdKas;           
ext.cmdMap['King and Staff'] = cmdKas; 
ext.cmdMap['tarot'] = cmdTarot;
// 已移除 draw 别名