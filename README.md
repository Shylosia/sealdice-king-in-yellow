黄衣之王 (King in Yellow) - SealDice JavaScript 插件
“王端坐于王座上，笑看闹剧。”

本插件为 SealDice 实现了 “王与杖” (King and Staff) 塔罗牌阵抽取功能。该牌阵源自 Arc Dream Publishing 出版的《黄衣之王》塔罗牌（The King in Yellow Tarot），用于模拟一种诡谲、戏剧性的占卜体验。

此外，本插件还集成了通用的塔罗牌阵（如凯尔特十字、圣三角等）。

⚠️ 版权与图片说明 (Copyright Notice)
请务必仔细阅读本节内容：

出于版权保护原因（Arc Dream Publishing 保留所有权利），本插件不包含任何《黄衣之王》塔罗牌的原版卡面图片文件。

图片占位符：插件代码中预设了图片读取路径，但在您未手动将图片配置到本地文件夹前前，骰娘将无法发送卡面图片（或显示为空白/错误）。

自行配置：如果您拥有该套实体卡牌或合法的数字版资源，请按照下方的【文件目录结构】自行将图片资源填入对应文件夹。

替代方案：如果您没有原版图片，可以使用任意塔罗牌图片，或者仅使用文本结果进行占卜。

📂 安装与配置
1. 安装脚本
将 King and Staff.js 放入您的 SealDice data/Default/scripts 目录（或您使用的加载器的相应的本地目录），并在控制台重载 js 脚本。

2. 配置图片资源 (必须)
为了让插件正确发送图片，您需要在 SealDice 的 data/images 目录下建立以下文件夹结构，并放入对应的图片文件：

路径：data/images/KingInYellow

Plaintext

data/images/KingInYellow
├── Pos.png              <-- 王与杖牌阵的位置示意图

├── 正位                 <-- 存放正位卡图文件夹

│   ├── 0.png            <-- 愚者/Le Mat

│   ├── 1.png            <-- 魔术师

│   ├── ...              <-- (以此类推至 77.png)

│   └── 78.png           <-- 必须包含：卡背/不可名状之牌

└── 逆位                 <-- 存放逆位卡图文件夹
    
    ├── 0.png
    
    ├── ...
    
    ├── 77.png
    
    └── 78.png
    
图片命名规则：文件名必须为纯数字 0 到 77（对应卡牌 ID），格式为 .png。

ID 78：请在 正位 文件夹中放入一张名为 78.png 的图片，作为“不可名状之牌”或卡背的显示图片。

注意：如果您的图片存放在其他位置，请修改脚本开头的 BASE_PATH 变量。

📖 使用指南
1. 王与杖牌阵 (King and Staff)
这是本插件的核心功能，基于戏剧隐喻的特殊占卜法。

基础指令：

.kas
高级用法： 支持乱序参数输入，参数之间用空格分隔。

指定语言：
.kas en - 输出英文结果（原汁原味的法语标题）。
.kas cn - 输出中文结果（默认）。

指定指示物：
.kas 10 - 强制指定 ID 为 10 的牌作为指示物。
如果不指定，将随机抽取。

指定正逆位：
.kas + 或 .kas 正 - 指示物强制正位。
.kas - 或 .kas 逆 - 指示物强制逆位。

危险模式 (Danger Mode)：
.kas danger 或 .kas 危 - 皇帝入局。

设定：在原版规则中，皇帝牌通常被移除。开启此模式意味着封印解除，皇帝可能被抽中。

指令示例：
.kas               # 随机抽取，中文
.kas en danger     # 英文版，危险模式
.kas 0 +           # 指定0号牌(愚者)为指示物，强制正位

查看背景设定：
.kas lore - 查看中文背景故事（王与杖解读法）。
.kas lore en - 查看英文背景故事。

2. 通用塔罗牌阵 (General Tarot)
插件内置了主流的塔罗牌阵，使用 .tarot 或 .draw 指令调用。

基础牌阵：
.tarot 圣杯 - 是与否问题
.tarot 圣三角 - 过去、现在、未来
.tarot 四元素 - 土、水、火、风状态分析

进阶牌阵：
.tarot 十字 - 基础十字阵 (5张)
.tarot 五芒星 - 发展与内心 (5张)
.tarot 六芒星 - 身心灵环境 (6张)
.tarot 七芒星 - 障碍与结果 (7张)
.tarot 凯尔特 - 凯尔特十字 (10张)

特殊牌阵：
.tarot 十二星座 - 黄道十二宫运势
.tarot 四季 - 季度运势

🛠️ 技术细节
版本：1.0.0
作者：巫洁鸾
依赖：SealDice JavaScript 扩展支持

逻辑：
实现了独特的“不可名状之牌” 逻辑：即使未被抽出，也会在最后覆盖在指示物上。

支持自定义卡牌名称和描述的本地化。

📄 License
GNU Affero General Public License v3.0

This plugin is a fan-made creation and is not affiliated with Arc Dream Publishing.
