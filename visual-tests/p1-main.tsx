import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ActionCard, AlertDialog, Avatar, Breadcrumb, Button, ButtonGroup, ChattyBunnyProvider,
  Drawer, FormField, Link, NavigationMenu, NumberInput, OTPInput, Pagination, ProfileCard,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Timeline, Toggle, ToggleGroup,
} from "../src/components";
import "../src/styles.css";

function Fixture() {
  const [otp, setOtp] = useState("2481");
  const [page, setPage] = useState(3);
  const [layout, setLayout] = useState("grid");
  const [favorite, setFavorite] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [alert, setAlert] = useState(false);
  return <ChattyBunnyProvider locale="zh-CN"><main className="min-h-screen bg-page p-4 sm:p-6"><div className="mx-auto max-w-5xl space-y-5"><header><p className="cb-eyebrow">P1 VISUAL BASELINE</p><h1 className="mt-1 text-3xl font-bold text-text-strong">交互完成度</h1></header>
    <NavigationMenu items={[{ value: "product", label: "产品", children: [{ title: "学习中心", description: "管理课程与进度", href: "#learn" }, { title: "数据报告", description: "查看团队表现", href: "#data" }] }, { value: "docs", label: "文档", href: "#docs" }]} />
    <Breadcrumb items={[{ label: "首页", href: "#" }, { label: "工作区", href: "#" }, { label: "交互验收", current: true }]} />
    <section className="grid gap-4 md:grid-cols-2"><div className="space-y-4 rounded-cb border border-border bg-surface p-4"><FormField label="账号邮箱" required helper="用于接收安全通知"><input className="cb-field h-12 w-full px-3 outline-none" value="sunny@example.com" readOnly /></FormField><NumberInput label="每日目标" value={12} min={1} max={30} /><OTPInput length={6} value={otp} onChange={setOtp} /></div><div className="space-y-4 rounded-cb border border-border bg-surface p-4"><ButtonGroup><Button size="medium">保存</Button><Button size="medium" variant="secondary">预览</Button></ButtonGroup><div className="flex flex-wrap gap-3"><Toggle pressed={favorite} onPressedChange={setFavorite} icon="favorite">收藏</Toggle><ToggleGroup value={layout} onValueChange={(value) => setLayout(value as string)} aria-label="布局"><Toggle value="grid">网格</Toggle><Toggle value="list">列表</Toggle></ToggleGroup></div><p className="text-sm text-text-muted">阅读 <Link href="#docs">组件文档</Link> 或 <Link href="https://github.com" externalIndicator>外部资源</Link>。</p></div></section>
    <Table striped><TableHeader><TableRow><TableHead>成员</TableHead><TableHead>学习进度</TableHead><TableHead>状态</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Sunny</TableCell><TableCell>86%</TableCell><TableCell>已完成</TableCell></TableRow><TableRow><TableCell>Alex</TableCell><TableCell>64%</TableCell><TableCell>进行中</TableCell></TableRow></TableBody></Table><Pagination page={page} totalPages={8} onChange={setPage} />
    <section className="grid gap-4 md:grid-cols-2"><div className="space-y-3"><ActionCard title="继续今日学习" description="还有 8 个单词" icon="play" badge="推荐" onClick={() => undefined} /><ProfileCard orientation="compact" avatar={<Avatar initials="SB" alt="Sunny Bunny" />} name="Sunny Bunny" subtitle="连续学习 12 天" /></div><Timeline items={[{ title: "创建计划", timestamp: "09:00", state: "completed" }, { title: "完成练习", timestamp: "10:20", state: "current" }, { title: "参加测验", timestamp: "周五" }]} /></section>
    <div className="flex gap-3"><Button block={false} onClick={() => setDrawer(true)}>打开抽屉</Button><Button block={false} variant="secondary" onClick={() => setAlert(true)}>危险确认</Button></div>
  </div><Drawer open={drawer} onOpenChange={setDrawer} title="学习设置" description="调整当前计划" footer={<Button onClick={() => setDrawer(false)}>保存</Button>}><NumberInput label="每天新词" defaultValue={10} min={1} max={30} /></Drawer><AlertDialog open={alert} onOpenChange={setAlert} title="删除记录？" description="删除后无法恢复，请确认是否继续。" confirmLabel="确认删除" onConfirm={() => setAlert(false)} /></main></ChattyBunnyProvider>;
}

createRoot(document.getElementById("root")!).render(<StrictMode><Fixture /></StrictMode>);
