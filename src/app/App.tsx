import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AchievementBadge,
  AchievementCard,
  AnswerFeedback,
  AudioButton,
  Badge,
  BottomSheet,
  BottomTabBar,
  BrandLogo,
  Button,
  Card,
  Checkbox,
  Chip,
  CollocationItem,
  DifferenceBlock,
  EmptyState,
  ExampleSentence,
  FlashCard,
  Icon,
  IconButton,
  Input,
  LearningProgressCard,
  ListItem,
  Loading,
  Mascot,
  MascotCallout,
  Modal,
  OnboardingHint,
  PermissionState,
  Progress,
  PronunciationButton,
  QuizOption,
  Radio,
  ReviewCard,
  Search,
  Segment,
  SettingListItem,
  Skeleton,
  StepIndicator,
  StreakBadge,
  StudyProgress,
  Switch,
  TabBarItem,
  Tabs,
  Tag,
  Toast,
  TopNavigation,
  UnitCard,
  WordCard,
  WordHeader,
  WordListItem,
} from "../components";
import type { IconName } from "../components/Icon";
import { cn } from "../lib/cn";

const categories: Array<{ id: string; number: string; name: string; description: string; icon: IconName }> = [
  { id: "foundation", number: "01", name: "Foundation", description: "颜色、字体、间距与图标", icon: "star" },
  { id: "actions", number: "02", name: "Actions", description: "按钮与图标操作", icon: "play" },
  { id: "inputs", number: "03", name: "Inputs", description: "输入、搜索与选择控件", icon: "microphone" },
  { id: "data-display", number: "04", name: "Data Display", description: "标签、徽标与进度", icon: "achievement" },
  { id: "cards", number: "05", name: "Cards", description: "通用与学习语义卡片", icon: "book" },
  { id: "lists", number: "06", name: "Lists", description: "通用、单词与设置列表", icon: "review" },
  { id: "navigation", number: "07", name: "Navigation", description: "顶部、底部与页签导航", icon: "home" },
  { id: "learning", number: "08", name: "Learning", description: "词汇学习专属组件", icon: "learn" },
  { id: "feedback", number: "09", name: "Feedback", description: "反馈、加载与状态页面", icon: "info" },
  { id: "brand", number: "10", name: "Brand", description: "Logo、Mascot 与品牌徽章", icon: "favorite" },
];

const tabItems: TabBarItem[] = [
  { value: "home", label: "首页", icon: "home" },
  { value: "learn", label: "学习", icon: "learn" },
  { value: "review", label: "复习", icon: "review", badge: "3" },
  { value: "achievement", label: "成就", icon: "achievement" },
  { value: "profile", label: "我的", icon: "profile" },
];

function SideNav({ active }: { active: string }) {
  return <nav aria-label="组件分类" className="space-y-1">{categories.map((item) => <a key={item.id} href={`#${item.id}`} className={cn("group flex items-center gap-3 rounded-br-sm px-3 py-2.5 text-sm transition hover:bg-[#F2F7FF]", active === item.id ? "bg-[#E6F1FF] font-semibold text-brand" : "text-muted")}><span className={cn("flex size-8 items-center justify-center rounded-[10px] bg-[#F2F7FF] text-brand", active === item.id && "bg-brand text-white")}><Icon name={item.icon} size={16} /></span><span className="min-w-0 flex-1"><span className="block truncate">{item.number} · {item.name}</span><span className="block truncate text-[11px] font-normal text-[#8A96A8]">{item.description}</span></span></a>)}</nav>;
}

function DocSection({ id, number, title, description, children }: { id: string; number: string; title: string; description: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-24 border-t border-line py-12 first:border-0 first:pt-0"><header className="mb-7"><span className="br-eyebrow">{number} · COMPONENTS</span><div className="mt-2 flex flex-col justify-between gap-2 md:flex-row md:items-end"><h2 className="text-3xl font-bold tracking-tight text-brand-deep">{title}</h2><p className="max-w-xl text-sm leading-relaxed text-muted md:text-right">{description}</p></div></header>{children}</section>;
}

function Showcase({ title, purpose, children, className, code, note }: { title: string; purpose: string; children: ReactNode; className?: string; code?: string; note?: string }) {
  return <article className={cn("overflow-hidden rounded-br border border-line bg-white", className)}><header className="border-b border-line px-4 py-3.5 sm:px-5"><h3 className="text-[17px] font-semibold text-brand-deep">{title}</h3><p className="mt-0.5 text-sm text-muted">{purpose}</p></header><div className="bg-[radial-gradient(#CFE4FF_0.7px,transparent_0.7px)] bg-[length:14px_14px] p-4 sm:p-5"><div className="rounded-br-sm bg-white/80 p-1">{children}</div></div>{note && <p className="border-t border-line bg-[#FAFBFC] px-4 py-3 text-xs leading-relaxed text-muted"><strong className="text-brand-deep">使用说明：</strong>{note}</p>}{code && <details className="border-t border-line"><summary className="br-focus cursor-pointer list-none px-4 py-3 text-sm font-semibold text-brand hover:bg-[#F2F7FF]">查看示例代码</summary><pre className="br-code m-4 mt-0"><code>{code}</code></pre></details>}</article>;
}

function Guidelines({ doText, dontText }: { doText: string; dontText: string }) {
  return <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-br-sm bg-[#ECFDF3] p-4 text-sm leading-relaxed text-[#166534]"><strong className="mb-1 flex items-center gap-1"><Icon name="check" size={16} />推荐</strong>{doText}</div><div className="rounded-br-sm bg-[#FFF1F0] p-4 text-sm leading-relaxed text-[#B42318]"><strong className="mb-1 flex items-center gap-1"><Icon name="close" size={16} />避免</strong>{dontText}</div></div>;
}

function Foundation() {
  const colors = [
    ["Brand", "#0A7CFF"], ["Deep", "#0F2749"], ["Blue 050", "#F2F7FF"], ["Page", "#F7FAFE"], ["Line", "#E5EAF2"], ["Muted", "#68758A"], ["Success", "#22C55E"], ["Warning", "#F59E0B"], ["Error", "#F04438"],
  ];
  const spaces = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Color Tokens" purpose="品牌色、语义色与中性色都通过 Tailwind token 引用" className="xl:col-span-2" note="状态色只表达真实状态；正文使用深海蓝或灰色，不使用纯黑。"><div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">{colors.map(([name, hex]) => <div key={name} className="min-w-0"><span className="block aspect-square rounded-br-sm border border-black/5" style={{ background: hex }} /><strong className="mt-2 block truncate text-xs text-brand-deep">{name}</strong><span className="block text-[10px] uppercase text-[#8A96A8]">{hex}</span></div>)}</div></Showcase><Showcase title="Typography" purpose="适配中文与英文内容的完整层级"><div className="space-y-5"><div><span className="text-xs text-[#8A96A8]">Word XL · 36 / Bold</span><p className="text-4xl font-bold leading-tight text-brand-deep">father</p></div><div><span className="text-xs text-[#8A96A8]">H1 · 28 / Bold</span><p className="text-[28px] font-bold leading-tight text-brand-deep">大嘴小兔 UI Kit</p></div><div><span className="text-xs text-[#8A96A8]">H2 · 20 / Semibold</span><p className="text-xl font-semibold text-brand-deep">用有趣的方式学英语</p></div><div><span className="text-xs text-[#8A96A8]">Body · 16 / Regular</span><p className="text-base leading-relaxed">让每个孩子在快乐中成长</p></div><div><span className="text-xs text-[#8A96A8]">Secondary / Caption</span><p className="text-sm text-muted">Small steps, big future.</p></div></div></Showcase><Showcase title="Spacing & Radius" purpose="4pt 间距网格与固定圆角等级"><div><div className="flex items-end gap-3 overflow-x-auto pb-4">{spaces.map((value) => <div key={value} className="shrink-0 text-center"><span className="block rounded bg-[#CFE4FF]" style={{ width: Math.max(12, value), height: Math.max(12, value) }} /><span className="mt-1 block text-[10px] text-muted">{value}</span></div>)}</div><div className="mt-5 grid grid-cols-3 gap-3">{[["8", "rounded-lg"], ["12", "rounded-br-sm"], ["16", "rounded-br-md"], ["20", "rounded-br"], ["24", "rounded-[24px]"], ["Pill", "rounded-full"]].map(([name, radius]) => <div key={name} className={cn("flex h-16 items-center justify-center bg-[#E6F1FF] text-xs font-semibold text-brand", radius)}>{name}</div>)}</div></div></Showcase><Showcase title="Icon System" purpose="统一圆角线性图标，视觉尺寸与点击区分离" className="xl:col-span-2" note="图标视觉尺寸为 16 / 20 / 24 / 32px；可交互图标必须放入至少 44×44px 点击区。"><div className="flex flex-wrap gap-3">{(["home", "book", "learn", "review", "achievement", "profile", "search", "audio", "favorite", "share", "check", "error", "warning", "info", "lock", "calendar"] as IconName[]).map((name) => <div key={name} className="flex min-w-20 flex-col items-center rounded-br-sm bg-[#F7FAFE] p-3 text-brand"><Icon name={name} /><span className="mt-2 text-[10px] text-muted">{name}</span></div>)}</div></Showcase></div>;
}

function Actions() {
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Button" purpose="触发页面中的主要和次要动作" code={'<Button variant="primary">继续学习</Button>'} note="Large 48px，Medium 44px；同一页面只保留一个 Primary CTA。"><div className="grid gap-3 sm:grid-cols-2"><Button>继续学习</Button><Button variant="secondary">查看详情</Button><Button variant="ghost" icon="play">开始试听</Button><Button loading>提交中</Button><Button disabled>不可点击</Button><Button size="medium">中型按钮</Button></div><Guidelines doText="用简短动词说明动作结果，如“继续学习”。" dontText="不要在同一屏放置多个同等强度的主按钮。" /></Showcase><Showcase title="IconButton" purpose="承载收藏、分享和导航等紧凑操作" code={'<IconButton icon="favorite" label="收藏" variant="soft" />'} note="无论图标是 20px 还是 24px，点击区域始终不小于 44px。"><div className="flex flex-wrap gap-3"><IconButton icon="arrow-left" label="返回" /><IconButton icon="search" label="搜索" variant="soft" /><IconButton icon="favorite" label="收藏" variant="outlined" selected /><IconButton icon="share" label="分享" variant="outlined" /><IconButton icon="more" label="更多" disabled /></div></Showcase></div>;
}

function Inputs() {
  const [name, setName] = useState("father");
  const [search, setSearch] = useState("");
  const [radio, setRadio] = useState("a");
  const [checks, setChecks] = useState({ audio: true, hint: false });
  const [enabled, setEnabled] = useState(true);
  const [segment, setSegment] = useState("all");
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Input & Search" purpose="收集短文本与快速筛选内容" code={'<Input label="单词" value={value} onChange={...} />'} note="错误态同时提供图标、颜色和文字说明，不仅改变边框颜色。"><div className="space-y-4"><Input label="单词" value={name} onChange={(e) => setName(e.target.value)} onClear={() => setName("")} helper="输入你想学习的英文单词" /><Input label="邮箱" defaultValue="wrong@email" errorMessage="请输入有效邮箱地址" /><Input label="班级" placeholder="不可编辑" disabled /><Search value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch("")} placeholder="搜索组件、单词或课程…" /></div></Showcase><Showcase title="Selection" purpose="单选、多选与布尔状态控制" note="整行标签都可点击，并保留原生语义以支持键盘和读屏器。"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-1"><Radio label="基础词汇" value="a" checked={radio === "a"} onChange={() => setRadio("a")} /><Radio label="日常生活" value="b" checked={radio === "b"} onChange={() => setRadio("b")} /><Radio label="暂未开放" disabled /></div><div className="space-y-1"><Checkbox label="自动播放发音" checked={checks.audio} onChange={(value) => setChecks({ ...checks, audio: value })} /><Checkbox label="显示学习提示" checked={checks.hint} onChange={(value) => setChecks({ ...checks, hint: value })} /><Switch label="学习提醒" checked={enabled} onChange={setEnabled} /></div></div></Showcase><Showcase title="Segment" purpose="同层级、少量选项间的即时切换" className="xl:col-span-2" code={'<Segment items={items} value={value} onChange={setValue} />'}><Segment items={[{ label: "全部", value: "all" }, { label: "未学习", value: "new" }, { label: "已掌握", value: "done" }]} value={segment} onChange={setSegment} /><p className="mt-3 text-center text-sm text-muted">当前选择：{segment === "all" ? "全部" : segment === "new" ? "未学习" : "已掌握"}</p></Showcase></div>;
}

function DataDisplay() {
  const [selected, setSelected] = useState(false);
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Chip, Tag & Badge" purpose="表达筛选、属性和轻量状态" note="单个页面建议不超过 4 种语义颜色，避免彩虹式标签。"><div className="space-y-5"><div className="flex flex-wrap gap-2"><Chip variant="info" selected={selected} onSelectedChange={setSelected} icon="star">基础词汇</Chip><Chip variant="neutral">日常生活</Chip><Chip variant="success">已掌握</Chip><Chip variant="warning">重点</Chip></div><div className="flex flex-wrap gap-2"><Tag>默认</Tag><Tag variant="info">学习中</Tag><Tag variant="success" icon="check">已完成</Tag><Tag variant="warning">需复习</Tag><Tag variant="error">答错</Tag></div><div className="flex items-center gap-4"><Badge>8</Badge><Badge variant="success">NEW</Badge><Badge variant="error">99+</Badge><Badge dot variant="error">新消息</Badge></div></div></Showcase><Showcase title="Progress" purpose="让用户始终知道当前完成程度" note="短流程可用步骤指示；连续进度使用 Progress，避免混用造成干扰。"><div className="space-y-7"><Progress value={40} label="单元进度" showValue /><Progress value={72} size="slim" label="今日学习" showValue /><Progress value={100} state="success" label="本课完成" showValue /><StepIndicator items={[{ label: "学习" }, { label: "练习" }, { label: "测验" }, { label: "完成" }]} current={1} /></div></Showcase></div>;
}

function Cards() {
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Card" purpose="用于真正独立的内容或操作单元" code={'<Card title="学习提示" variant="soft">...</Card>'}><div className="grid gap-3 sm:grid-cols-2"><Card title="默认卡片" description="以边框和留白建立层级。"><p className="text-sm">卡片内容区域</p></Card><Card title="柔和卡片" description="适合提示或选中内容。" variant="soft" /><Card title="选中状态" state="selected" /><Card title="轻阴影" shadow="soft" description="仅用于需要额外层级时。" /></div><Guidelines doText="内容需要分组、表达状态或整块可点击时使用卡片。" dontText="不要卡片套卡片，也不要给每个模块都加阴影。" /></Showcase><Showcase title="Learning Cards" purpose="带有明确学习语义，不使用万能卡片替代"><div className="space-y-3"><LearningProgressCard title="家庭与朋友" subtitle="第 1 单元 · 20 个单词" value={30} /><UnitCard unit="UNIT 02" title="学校与课堂" description="校园生活 · 20 个词" progress={60} state="current" /><WordCard word="father" phonetic="/ˈfɑːðər/" meaning="n. 父亲；爸爸" favorite /></div></Showcase><Showcase title="Review & Achievement" purpose="复习任务和成就使用各自独立的视觉结构" className="xl:col-span-2"><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><ReviewCard title="今日复习" description="需要巩固的单词" count={12} /><ReviewCard title="挑战模式" description="完成上一单元解锁" count={0} state="locked" /><AchievementCard title="单词达人" description="累计学习 50 词" state="completed" /><AchievementCard title="测验高手" description="连续答对 10 题" state="locked" /></div></Showcase></div>;
}

function Lists() {
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="List Item" purpose="用扁平列表清晰呈现可扫描内容" note="单行高度 56px，双行高度 64px；同组列表共享一个外层边框。"><div className="overflow-hidden rounded-br border border-line"><ListItem leadingIcon="book" title="课程内容" description="查看全部学习单元" trailing="12 单元" /><ListItem leadingIcon="calendar" title="学习计划" description="每天 10 个新词" state="selected" /><ListItem leadingIcon="achievement" title="已完成任务" state="completed" /><ListItem leadingIcon="lock" title="高级挑战" state="locked" /></div></Showcase><Showcase title="Word List" purpose="统一承载序号、单词、释义和学习状态"><div className="overflow-hidden rounded-br border border-line"><WordListItem index={1} word="family" meaning="n. 家庭" /><WordListItem index={2} word="father" meaning="n. 父亲；爸爸" state="current" status="学习中" /><WordListItem index={3} word="mother" meaning="n. 母亲；妈妈" state="completed" status="已掌握" /><WordListItem index={4} word="brother" meaning="n. 兄弟；哥哥" state="locked" /></div></Showcase><Showcase title="Settings List" purpose="设置项使用相同的信息结构" className="xl:col-span-2"><div className="mx-auto max-w-2xl overflow-hidden rounded-br border border-line"><SettingListItem icon="review" title="学习报告" description="查看本周的学习表现" /><SettingListItem icon="settings" title="学习设置" value="每天 10 词" /><SettingListItem icon="info" title="关于我们" value="v0.1.0" /></div></Showcase></div>;
}

function Navigation() {
  const [tab, setTab] = useState("home");
  const [lineTab, setLineTab] = useState("all");
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Top Navigation" purpose="保持页面位置和退出路径清晰"><div className="overflow-hidden rounded-br border border-line"><TopNavigation title="单词学习" subtitle="2 / 5" actionIcon="more" /><TopNavigation title="我的成就" back={false} actionIcon="share" align="left" /></div></Showcase><Showcase title="Tabs" purpose="在同一页面内切换同层级内容"><div className="space-y-5"><Tabs items={[{ label: "全部", value: "all" }, { label: "未学习", value: "new" }, { label: "已掌握", value: "done" }]} value={lineTab} onChange={setLineTab} /><Tabs variant="pill" items={[{ label: "单词", value: "words" }, { label: "短语", value: "phrases" }]} value={lineTab === "words" ? "words" : "phrases"} onChange={setLineTab} /></div></Showcase><Showcase title="Bottom Tab Bar" purpose="最多承载 4–5 个顶层目的地" className="xl:col-span-2" note="移动端固定在安全区上方；桌面端通常由侧栏导航替代。"><div className="mx-auto max-w-xl overflow-hidden rounded-br border border-line pt-16"><BottomTabBar items={tabItems} value={tab} onChange={setTab} /></div></Showcase></div>;
}

function Learning() {
  const [quiz, setQuiz] = useState("c");
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [flashSide, setFlashSide] = useState<"front" | "back">("front");
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Quiz Option" purpose="学习答题专用选择，不直接用 Radio 替代" code={'<QuizOption prefix="C" label="father" state="correct" />'}><div className="space-y-3"><QuizOption prefix="A" label="mother" state={quiz === "a" ? "selected" : "default"} onClick={() => setQuiz("a")} /><QuizOption prefix="B" label="brother" state={quiz === "b" ? "selected" : "default"} onClick={() => setQuiz("b")} /><QuizOption prefix="C" label="father" state={quiz === "c" ? "correct" : "default"} onClick={() => setQuiz("c")} /><QuizOption prefix="D" label="sister" state="incorrect" /></div></Showcase><Showcase title="Audio & Pronunciation" purpose="提供发音播放、录音、处理和结果反馈"><div className="flex min-h-56 flex-col items-center justify-center gap-6"><div className="flex flex-wrap justify-center gap-3"><AudioButton playing={playing} onClick={() => setPlaying(!playing)} /><AudioButton size="small" /></div><PronunciationButton state={recording ? "recording" : "ready"} onClick={() => setRecording(!recording)} /></div></Showcase><Showcase title="Word Header" purpose="聚合单词、音标、释义、发音与收藏"><WordHeader word="father" phonetic="/ˈfɑːðər/" meaning="n. 父亲；爸爸" playing={playing} favorite={favorite} onAudio={() => setPlaying(!playing)} onFavorite={() => setFavorite(!favorite)} /></Showcase><Showcase title="Example & Difference" purpose="用示例和对比帮助理解，不堆叠长文"><div className="space-y-3"><ExampleSentence sentence="My father works in a hospital." translation="我的父亲在医院工作。" /><DifferenceBlock firstWord="father" firstDescription="较正式，用于书面或普通表达" secondWord="dad" secondDescription="更口语、更亲切" /></div></Showcase><Showcase title="Collocations" purpose="呈现可快速扫描的固定搭配"><div className="space-y-2"><CollocationItem phrase="my father" translation="我的父亲" selected /><CollocationItem phrase="a good father" translation="一位好父亲" /><CollocationItem phrase="father and son" translation="父子" /></div></Showcase><Showcase title="Flash Card" purpose="通过正反面切换进行回忆练习"><FlashCard side={flashSide} word="father" phonetic="/ˈfɑːðər/" meaning="n. 父亲；爸爸" example="My father works in a hospital." onFlip={() => setFlashSide(flashSide === "front" ? "back" : "front")} /></Showcase><Showcase title="Answer Feedback" purpose="每次答题反馈都包含状态和解释" className="xl:col-span-2"><div className="grid gap-4 lg:grid-cols-2"><AnswerFeedback variant="correct" title="太棒了！" explanation="你正确理解了 father 的含义。" answer="father = 父亲" /><AnswerFeedback variant="incorrect" title="再看看这个区别" explanation="mother 表示母亲，father 才表示父亲。" answer="mother" expected="father" /></div></Showcase><Showcase title="Study Progress" purpose="清楚表达已完成、当前和未来步骤" className="xl:col-span-2"><StudyProgress title="本次学习" items={[{ label: "理解" }, { label: "示例" }, { label: "练习" }, { label: "完成" }]} current={2} /></Showcase></div>;
}

function Feedback() {
  const [modal, setModal] = useState(false);
  const [sheet, setSheet] = useState(false);
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Toast" purpose="短暂、非阻塞地确认结果或提醒状态"><div className="space-y-3"><Toast message="已添加到生词本" variant="success" /><Toast message="网络连接已恢复" variant="info" actionLabel="查看" /><Toast message="请选择一个答案" variant="warning" /><Toast message="操作失败，请重试" variant="error" /></div></Showcase><Showcase title="Loading & Skeleton" purpose="保持布局稳定并告知用户正在处理"><div className="grid gap-5 sm:grid-cols-2"><Skeleton rows={2} /><div className="flex min-h-40 items-center justify-center rounded-br border border-line"><Loading label="正在准备课程" /></div></div></Showcase><Showcase title="Modal & Bottom Sheet" purpose="处理需要确认或从少量操作中选择的任务"><div className="grid gap-3 sm:grid-cols-2"><Button onClick={() => setModal(true)}>打开确认弹窗</Button><Button variant="secondary" onClick={() => setSheet(true)}>打开底部面板</Button></div><Modal open={modal} title="退出学习？" description="本次进度会自动保存，下次可以继续。" confirmLabel="确认退出" variant="destructive" onConfirm={() => setModal(false)} onCancel={() => setModal(false)} onClose={() => setModal(false)} /><BottomSheet open={sheet} title="选择学习模式" options={[{ label: "单词学习", value: "word", icon: "book", description: "通过图片和例句学习" }, { label: "趣味测验", value: "quiz", icon: "achievement", description: "边练边记" }, { label: "听力练习", value: "audio", icon: "audio" }]} onSelect={() => setSheet(false)} onClose={() => setSheet(false)} /></Showcase><Showcase title="Onboarding Hint" purpose="首次使用时解释当前最重要的一个动作"><OnboardingHint step={1} total={3} title="点击这里开始学习" description="不懂的单词可以随时加入生词本，之后集中复习。" /></Showcase><Showcase title="Empty State" purpose="空状态说明原因，并给出有意义的下一步"><EmptyState title="这里还没有内容" description="当列表为空时，用友好说明帮助用户继续探索。" actionLabel="去看看" /></Showcase><Showcase title="Permission State" purpose="在申请权限前解释原因和用户收益"><PermissionState title="需要麦克风权限" description="为了让你可以跟读练习并获得发音反馈，请允许麦克风访问。" actionLabel="去开启" secondaryLabel="稍后再说" /></Showcase></div>;
}

function Brand() {
  const states = ["welcome", "learning", "thinking", "success", "error", "encourage", "empty", "locked", "sleep", "celebrate"] as const;
  return <div className="grid gap-5 xl:grid-cols-2"><Showcase title="Brand Logo" purpose="在不同空间中保持一致的品牌识别"><div className="flex flex-wrap items-center gap-8"><BrandLogo variant="app-icon" /><BrandLogo variant="horizontal" /><BrandLogo variant="compact" /><BrandLogo variant="mascot-only" /></div></Showcase><Showcase title="Mascot Callout" purpose="以陪伴感提供鼓励和关键提示"><MascotCallout message="太棒了！" supportingText="每天进步一点点，你已经做得很好。" state="encourage" /></Showcase><Showcase title="Mascot States" purpose="同一角色覆盖学习、反馈和空状态" className="xl:col-span-2" note="保持白色主体、蓝色大嘴、五官比例与插画风格一致，不更改物种或写实化。"><div className="grid grid-cols-2 gap-4 sm:grid-cols-5">{states.map((state) => <div key={state} className="flex flex-col items-center rounded-br-sm bg-[#F2F7FF] p-3"><Mascot state={state} size="medium" /><span className="mt-2 text-xs text-muted">{state}</span></div>)}</div></Showcase><Showcase title="Achievement Badge" purpose="成就需同时呈现图形、名称和达成状态"><div className="grid grid-cols-3 gap-2"><AchievementBadge label="单词达人" description="累计 50 词" /><AchievementBadge label="七天打卡" description="连续学习" icon="fire" variant="gold" /><AchievementBadge label="进步之星" description="尚未解锁" state="locked" /></div></Showcase><Showcase title="Streak Badge" purpose="用温暖的奖励色表达连续学习"><div className="flex flex-wrap gap-3"><StreakBadge days={7} /><StreakBadge days={30} label="本月全勤" state="completed" /></div></Showcase></div>;
}

function Hero() {
  const [copied, setCopied] = useState(false);
  const install = "npm install bigrabbit-ui";
  async function copyInstall() { await navigator.clipboard?.writeText(install); setCopied(true); window.setTimeout(() => setCopied(false), 1600); }
  return <section className="relative overflow-hidden rounded-[28px] border border-[#CFE4FF] bg-gradient-to-br from-white via-[#F7FBFF] to-[#E6F1FF] p-5 sm:p-8 lg:p-10"><div className="absolute -right-16 -top-20 size-72 rounded-full bg-[rgba(10,124,255,.05)]" /><div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center"><div><span className="br-eyebrow">OPEN SOURCE · TAILWIND CSS</span><h1 className="mt-3 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-brand-deep sm:text-5xl">大嘴小兔<br /><span className="text-brand">Web UI Kit</span></h1><p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">从微信小程序 Design System 迁移而来的 React 组件库。保留蓝白品牌视觉，并为桌面、平板和手机补齐响应式与无障碍体验。</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="#actions" className="br-control inline-flex h-12 items-center justify-center gap-2 rounded-br-md bg-brand px-5 font-semibold text-white hover:bg-brand-hover">浏览组件 <Icon name="arrow-right" size={20} /></a><button onClick={copyInstall} className="br-control inline-flex h-12 items-center justify-center gap-3 rounded-br-md border border-[#CFE4FF] bg-white px-5 font-mono text-sm font-semibold text-brand-deep hover:bg-[#F2F7FF]"><span>{install}</span><span className="text-xs text-brand">{copied ? "已复制" : "复制"}</span></button></div><div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"><span className="flex items-center gap-1.5"><Icon name="check" size={16} className="text-success" />响应式</span><span className="flex items-center gap-1.5"><Icon name="check" size={16} className="text-success" />TypeScript</span><span className="flex items-center gap-1.5"><Icon name="check" size={16} className="text-success" />键盘可访问</span><span className="flex items-center gap-1.5"><Icon name="check" size={16} className="text-success" />MIT</span></div></div><div className="mx-auto w-full max-w-[320px] rounded-[36px] border-[8px] border-brand-deep bg-white p-2 shadow-floating"><div className="overflow-hidden rounded-[24px] bg-[#F7FAFE]"><TopNavigation title="今日学习" back={false} actionIcon="more" /><div className="space-y-3 p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-muted">你好，小朋友！</p><p className="text-xl font-bold text-brand-deep">继续保持 👋</p></div><Mascot state="welcome" size="medium" /></div><Progress value={30} label="今日学习 3 / 10" showValue /><Button>继续学习</Button><UnitCard unit="UNIT 01" title="家庭与朋友" description="生活场景" progress={30} /></div><BottomTabBar items={tabItems.slice(0, 4)} value="home" /></div></div></div></section>;
}

function CaseShowcase() {
  return <section id="showcase" className="scroll-mt-24 py-14"><header className="mb-7 max-w-2xl"><span className="br-eyebrow">BUILT WITH BIG RABBIT UI</span><h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-deep">从组件到完整产品</h2><p className="mt-2 text-sm leading-relaxed text-muted">同一套设计令牌可以覆盖学生移动端、教师工作台和产品官网。以下案例全部由当前开源组件组合，不依赖私有样式。</p></header><div className="grid gap-5 lg:grid-cols-3"><article className="overflow-hidden rounded-br border border-line bg-white"><div className="min-h-72 bg-gradient-to-b from-[#F2F7FF] to-white p-5"><div className="mx-auto max-w-[270px] overflow-hidden rounded-[26px] border-[6px] border-brand-deep bg-white shadow-soft"><TopNavigation title="单词学习" subtitle="2 / 5" /><div className="space-y-3 p-4"><WordHeader word="father" phonetic="/ˈfɑːðər/" meaning="父亲；爸爸" /><Progress value={40} size="slim" /></div></div></div><div className="border-t border-line p-5"><Tag variant="info">学生端</Tag><h3 className="mt-2 text-lg font-semibold text-brand-deep">移动学习流程</h3><p className="mt-1 text-sm text-muted">单词、发音、进度与即时反馈组成清晰的学习路径。</p></div></article><article className="overflow-hidden rounded-br border border-line bg-white"><div className="min-h-72 bg-[#F7FAFE] p-5"><div className="rounded-br border border-line bg-white p-4 shadow-soft"><div className="flex items-center justify-between"><div><p className="text-xs text-muted">本周班级表现</p><p className="mt-1 text-xl font-bold text-brand-deep">学习概览</p></div><IconButton icon="more" label="更多" /></div><div className="mt-4 grid grid-cols-3 gap-2">{[["完成率", "86%"], ["新词", "248"], ["连续", "12天"]].map(([label, value]) => <div key={label} className="rounded-br-sm bg-[#F2F7FF] p-3 text-center"><strong className="block text-lg text-brand">{value}</strong><span className="text-[10px] text-muted">{label}</span></div>)}</div><Progress className="mt-4" value={86} label="课程完成" showValue /><div className="mt-4 overflow-hidden rounded-br-sm border border-line"><ListItem leadingIcon="profile" title="晨光班" trailing="32 人" /><ListItem leadingIcon="achievement" title="本周测验" trailing="已发布" /></div></div></div><div className="border-t border-line p-5"><Tag variant="success">教师端</Tag><h3 className="mt-2 text-lg font-semibold text-brand-deep">教学管理工作台</h3><p className="mt-1 text-sm text-muted">用卡片、数据与列表构建适合宽屏的管理界面。</p></div></article><article className="overflow-hidden rounded-br border border-line bg-white"><div className="flex min-h-72 flex-col items-center justify-center bg-gradient-to-br from-brand to-[#58A8FF] p-6 text-center text-white"><Mascot state="celebrate" size="large" /><p className="mt-4 text-xs font-semibold tracking-[.18em] text-white/80">SMALL STEPS · BIG FUTURE</p><h3 className="mt-2 text-2xl font-bold">让学习产品更快上线</h3><p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80">响应式组件、学习场景和品牌系统，从第一天保持一致。</p><span className="mt-4 inline-flex min-h-11 items-center rounded-br-md bg-white px-5 font-semibold text-brand">开始构建</span></div><div className="border-t border-line p-5"><Tag variant="warning">官网</Tag><h3 className="mt-2 text-lg font-semibold text-brand-deep">教育产品落地页</h3><p className="mt-1 text-sm text-muted">品牌、说明和行动入口保持轻量而有识别度。</p></div></article></div></section>;
}

function AppHeader() {
  return <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-4 sm:px-6"><a href="#top" aria-label="返回顶部"><BrandLogo variant="compact" /></a><div className="flex items-center gap-1 sm:gap-2"><a className="hidden min-h-11 items-center rounded-br-sm px-3 text-sm font-medium text-muted hover:bg-[#F2F7FF] md:flex" href="#showcase">案例</a><a className="hidden min-h-11 items-center rounded-br-sm px-3 text-sm font-medium text-muted hover:bg-[#F2F7FF] sm:flex" href="#foundation">设计规范</a><a className="br-focus inline-flex min-h-11 items-center gap-2 rounded-br-sm bg-[#F2F7FF] px-3 text-sm font-semibold text-brand" href="https://github.com/sermixzhou/bigrabbit-ui" target="_blank" rel="noreferrer"><Icon name="share" size={20} />GitHub</a></div></div></header>;
}

export function App() {
  const [active, setActive] = useState("foundation");
  const sectionIds = useMemo(() => categories.map((item) => item.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -65%", threshold: [0.05, 0.2] });
    sectionIds.forEach((id) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [sectionIds]);

  return <div id="top"><AppHeader /><main className="mx-auto max-w-[1480px] px-4 pb-20 pt-5 sm:px-6 sm:pt-8"><Hero /><CaseShowcase /><div className="sticky top-16 z-30 -mx-4 overflow-x-auto border-y border-line bg-white/95 px-4 py-2 backdrop-blur-xl lg:hidden"><div className="flex min-w-max gap-2">{categories.map((item) => <a key={item.id} href={`#${item.id}`} className={cn("flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-medium", active === item.id ? "bg-brand text-white" : "bg-[#F2F7FF] text-brand-deep")}><Icon name={item.icon} size={16} />{item.number}</a>)}</div></div><div id="components" className="mt-12 grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]"><aside className="hidden lg:block"><div className="sticky top-24 rounded-br border border-line bg-white p-3 shadow-soft"><p className="mb-3 px-3 pt-2 text-xs font-semibold uppercase tracking-[.16em] text-[#8A96A8]">组件目录</p><SideNav active={active} /><div className="mt-4 rounded-br-sm bg-[#F2F7FF] p-3"><p className="text-xs font-semibold text-brand-deep">设计原则</p><p className="mt-1 text-xs leading-relaxed text-muted">一个页面一个主任务；用层级解决问题，而不是增加装饰。</p></div></div></aside><div className="min-w-0"><DocSection id="foundation" number="01" title="Foundation" description="共享 token 是组件库的底层契约。所有颜色、字号、间距、圆角和阴影都由 Tailwind 主题统一管理。"><Foundation /></DocSection><DocSection id="actions" number="02" title="Actions" description="清晰、可预测的操作层级；完整覆盖鼠标、键盘和触摸交互。"><Actions /></DocSection><DocSection id="inputs" number="03" title="Inputs" description="受控组件 API、明确的错误说明，并保留浏览器原生语义。"><Inputs /></DocSection><DocSection id="data-display" number="04" title="Data Display" description="用有限的颜色和稳定的信息密度呈现状态、属性与进度。"><DataDisplay /></DocSection><DocSection id="cards" number="05" title="Cards" description="按真实语义拆分卡片，避免一个万能组件承载所有场景。"><Cards /></DocSection><DocSection id="lists" number="06" title="Lists" description="扁平、可扫描的列表结构适合桌面与移动端高频浏览。"><Lists /></DocSection><DocSection id="navigation" number="07" title="Navigation" description="移动端保留底部导航，桌面端使用更适合宽屏的侧栏信息架构。"><Navigation /></DocSection><DocSection id="learning" number="08" title="Learning" description="围绕理解、示例、练习、反馈构建的大嘴小兔专属学习组件。"><Learning /></DocSection><DocSection id="feedback" number="09" title="Feedback" description="反馈不仅有颜色和图标，也要用文字解释发生了什么、下一步做什么。"><Feedback /></DocSection><DocSection id="brand" number="10" title="Brand" description="稳定的 Logo、Mascot 和奖励语言，让产品保持友好而不过度儿童化。"><Brand /></DocSection></div></div></main><footer className="border-t border-line bg-white"><div className="mx-auto flex max-w-[1480px] flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between"><BrandLogo variant="compact" /><p>基于 Tailwind CSS 4 · React · TypeScript · MIT License</p></div></footer></div>;
}
