import { useState, type ReactNode } from "react";
import {
  ActionCard,
  AlertDialog,
  Avatar,
  Breadcrumb,
  Button,
  ButtonGroup,
  Drawer,
  FormField,
  Icon,
  Link,
  NavigationMenu,
  Navbar,
  NumberInput,
  Pagination,
  ProfileCard,
  Sidebar,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Timeline,
  Toggle,
  ToggleGroup,
} from "../components";

function Scenario({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return <section className="rounded-cb border border-border bg-surface p-5 shadow-soft"><p className="cb-eyebrow">{label}</p><h2 className="mb-5 mt-1 text-2xl font-bold text-text-strong">{title}</h2>{children}</section>;
}

export function P1Acceptance() {
  const [page, setPage] = useState(1);
  const [density, setDensity] = useState("comfortable");
  const [drawer, setDrawer] = useState(false);
  const [alert, setAlert] = useState(false);
  const [selected, setSelected] = useState(false);

  return <main className="min-h-screen bg-page px-4 py-8 sm:px-6"><div className="mx-auto max-w-6xl space-y-6"><header><p className="cb-eyebrow">INTERNAL ACCEPTANCE</p><h1 className="mt-1 text-3xl font-bold text-text-strong">P1 Interaction Completion</h1><p className="mt-2 text-text-muted">三个真实组合场景，用于键盘、触摸和响应式人工验收。</p></header>
    <Scenario label="CASE A" title="账号设置"><Breadcrumb className="mb-4" items={[{ label: "首页", href: "#" }, { label: "设置", href: "#" }, { label: "账号", current: true }]} /><div className="grid gap-5 lg:grid-cols-[15rem_1fr]"><div className="h-56 overflow-hidden rounded-cb border border-border"><Sidebar className="!static !h-56 !w-full !translate-x-0 !shadow-none" header={<strong>设置</strong>} groups={[{ items: [{ label: "个人资料", value: "profile", active: true }, { label: "安全", value: "security" }, { label: "通知", value: "notifications" }] }]} /></div><div className="grid gap-5 md:grid-cols-2"><div className="space-y-4"><FormField label="账号邮箱" required helper="用于接收登录提醒"><input type="email" className="cb-field h-12 w-full px-3 outline-none" defaultValue="sunny@example.com" /></FormField><NumberInput label="每日摘要上限" defaultValue={3} min={0} max={10} /><Toggle pressed={selected} onPressedChange={setSelected}>公开个人资料</Toggle><ButtonGroup><Button size="medium">保存</Button><Button size="medium" variant="secondary">取消</Button></ButtonGroup></div><ProfileCard avatar={<Avatar initials="SB" alt="Sunny Bunny" size="large" status="online" />} name="Sunny Bunny" subtitle="个人账号" description="安全设置已完成 2 / 3" metadata={<Link href="#case-b">查看登录记录</Link>} actions={<Button size="medium" variant="ghost" onClick={() => setAlert(true)}>停用账号</Button>} /></div></div></Scenario>
    <Scenario label="CASE B" title="活动工作台"><div id="case-b" className="space-y-5"><Navbar brand={<strong>Acme Home</strong>} items={[{ label: "概览", active: true }, { label: "活动" }, { label: "团队" }]} /><NavigationMenu items={[{ value: "workspace", label: "工作区", children: [{ title: "成员", description: "团队与权限", href: "#members" }, { title: "任务", description: "计划与进度", href: "#plans" }] }, { value: "reports", label: "报告", href: "#reports" }]} /><div className="grid gap-3 sm:grid-cols-3"><StatCard label="活跃成员" value="24" /><StatCard label="本周任务" value="86" progress={72} /><StatCard label="完成率" value="91%" state="success" /></div><div className="flex flex-wrap items-center justify-between gap-3"><Breadcrumb items={[{ label: "首页", href: "#" }, { label: "团队", href: "#" }, { label: "成员", current: true }]} /><ToggleGroup aria-label="表格密度" value={density} onValueChange={(value) => setDensity(value as string)}><Toggle value="comfortable">舒适</Toggle><Toggle value="compact">紧凑</Toggle></ToggleGroup></div><Table id="members" density={density === "compact" ? "compact" : "default"} striped><TableHeader><TableRow><TableHead>成员</TableHead><TableHead>角色</TableHead><TableHead>完成任务</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Sunny</TableCell><TableCell>Owner</TableCell><TableCell>24</TableCell></TableRow><TableRow><TableCell>Alex</TableCell><TableCell>Editor</TableCell><TableCell>18</TableCell></TableRow></TableBody></Table><Pagination page={page} totalPages={6} onChange={setPage} /><Timeline items={[{ title: "Alex 更新了项目状态", timestamp: "10:20", state: "completed" }, { title: "Sunny 邀请了新成员", timestamp: "11:05", state: "current" }]} /></div></Scenario>
    <Scenario label="CASE C" title="文件与活动管理"><div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]"><div className="space-y-3"><ActionCard title="设计规范.pdf" description="2.4 MB · 刚刚更新" icon="book" selected={selected} onClick={() => setSelected(!selected)} /><ActionCard title="品牌素材" description="12 个文件" icon="star" onClick={() => setDrawer(true)} /><div className="flex items-center gap-3"><Toggle pressed={selected} onPressedChange={setSelected}>仅显示已选择</Toggle><Button size="medium" variant="secondary" block={false} onClick={() => setDrawer(true)}>文件详情</Button></div></div><Timeline items={[{ title: "创建项目", timestamp: "09:00", state: "completed" }, { title: "上传设计规范", timestamp: "10:12", state: "completed" }, { title: "等待团队审核", timestamp: "现在", state: "current" }]} /></div></Scenario>
  </div><Drawer open={drawer} onOpenChange={setDrawer} title="文件详情" description="品牌素材 · 12 个文件" footer={<Button onClick={() => setDrawer(false)}>完成</Button>}><NumberInput label="保留版本数" defaultValue={5} min={1} max={20} /><p className="mt-5 text-sm leading-relaxed text-text-muted">抽屉保持页面上下文，支持 Escape、外部点击与焦点返回。</p></Drawer><AlertDialog open={alert} onOpenChange={setAlert} title="停用账号？" description="停用后将退出所有设备，历史数据仍会保留。" confirmLabel="确认停用" onConfirm={() => setAlert(false)} /></main>;
}
