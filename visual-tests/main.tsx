import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Button, Card, ChattyBunnyProvider, ChoiceCard, ChoiceGroup, Combobox, DropdownMenu,
  FileUpload, IconButton, Input, Navbar, Popover, Select, Sidebar, StatCard, Tooltip,
} from "../src/components";
import "../src/styles.css";

const options = [
  { value: "sh", label: "上海" },
  { value: "bj", label: "北京", disabled: true },
  { value: "sz", label: "深圳" },
];

function Fixture() {
  const [choice, setChoice] = useState<string | string[]>("focus");
  const [city, setCity] = useState("sh");
  const [country, setCountry] = useState<string>();
  return <ChattyBunnyProvider locale="zh-CN"><main className="min-h-screen bg-page p-4 sm:p-6">
    <div className="mx-auto max-w-6xl space-y-5">
      <Navbar brand={<strong>Chatty Bunny</strong>} items={[{ label: "产品", active: true }, { label: "文档" }]} action={<Button size="medium">开始使用</Button>} />
      <header><p className="cb-eyebrow">P0 VISUAL BASELINE</p><h1 className="mt-1 text-3xl font-bold text-text-strong">核心组件稳定性</h1></header>
      <section className="grid gap-4 md:grid-cols-2" aria-label="基础状态">
        <Card title="Actions" description="Default, loading and disabled states"><div className="grid gap-3 sm:grid-cols-3"><Button>继续</Button><Button loading>提交</Button><Button disabled>禁用</Button></div></Card>
        <Card title="Fields" description="Default, error and disabled states"><div className="space-y-3"><Input label="昵称" value="Sunny" readOnly /><Input label="邮箱" value="bad" errorMessage="请输入有效邮箱" readOnly /><Input label="不可编辑" disabled placeholder="Disabled" /></div></Card>
        <Card title="ChoiceGroup"><ChoiceGroup aria-label="学习模式" value={choice} onValueChange={setChoice}><ChoiceCard value="focus" title="专注模式" description="减少干扰" /><ChoiceCard value="relaxed" title="轻松模式" description="保留提醒" /><ChoiceCard value="locked" title="稍后开放" disabled /></ChoiceGroup></Card>
        <Card title="Data"><div className="grid grid-cols-2 gap-3"><StatCard label="完成任务" value="24" progress={72} /><StatCard label="连续学习" value="7 天" state="success" supportingText="本周 +2" /></div></Card>
        <Card title="Select & Combobox"><div className="space-y-3"><Select label="城市" options={options} value={city} onChange={setCity} /><Combobox label="搜索城市" options={options} value={country} onChange={setCountry} /></div></Card>
        <Card title="File states"><div className="grid gap-3 sm:grid-cols-2"><FileUpload label="上传附件" helper="PNG · 最大 5 MB" /><FileUpload label="处理中" loading /></div></Card>
        <Card title="Sidebar" className="md:col-span-2"><div className="h-52 overflow-hidden rounded-cb-sm border border-border"><Sidebar className="!static !h-52 !w-full !translate-x-0 !shadow-none sm:!w-64" header={<strong>工作空间</strong>} groups={[{ label: "导航", items: [{ label: "首页", value: "home", active: true }, { label: "项目", value: "projects", badge: "3" }, { label: "设置", value: "settings" }] }]} /></div></Card>
      </section>
      <section className="rounded-cb border border-border bg-surface p-4" aria-label="浮层碰撞测试">
        <h2 className="font-semibold text-text-strong">Overlay foundation</h2>
        <div className="mt-4 flex min-h-28 items-start justify-between gap-3">
          <DropdownMenu align="start" trigger={<Button size="medium" block={false}>菜单</Button>} items={[{ id: "edit", label: "编辑" }, { id: "copy", label: "复制" }, { id: "delete", label: "删除", destructive: true }]} />
          <div className="flex items-center gap-2"><Tooltip content="收藏到稍后阅读" delay={0}><IconButton icon="favorite" label="提示" variant="outlined" /></Tooltip><Popover placement="bottom" trigger={<Button size="medium" block={false} variant="secondary">弹层</Button>} showCloseButton><p className="max-w-52 text-sm text-text-muted">浮层会自动翻转、避让视口边缘并跟随滚动。</p></Popover></div>
        </div>
      </section>
    </div>
  </main></ChattyBunnyProvider>;
}

createRoot(document.getElementById("root")!).render(<StrictMode><Fixture /></StrictMode>);
