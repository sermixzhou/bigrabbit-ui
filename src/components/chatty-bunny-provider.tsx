import { createContext, useContext, useMemo, type ReactNode } from "react";

export type ChattyBunnyLocale = "en" | "zh-CN";

export interface ChattyBunnyMessages {
  loading: string;
  statusHint: string;
  stepProgress: string;
  contentLoading: string;
  close: string;
  confirm: string;
  cancel: string;
  next: string;
  skip: string;
  more: string;
  back: string;
  mainNavigation: string;
  sidebarNavigation: string;
  openNavigationMenu: string;
  closeNavigationMenu: string;
  closeSidebar: string;
  selectPlaceholder: string;
  comboboxPlaceholder: string;
  comboboxEmpty: string;
  clearInput: string;
  clearSearch: string;
  clearSelection: string;
  showPassword: string;
  hidePassword: string;
  show: string;
  hide: string;
  fileProcessing: string;
  fileProcessingHint: string;
  fileSelected: (count: number) => string;
  fileReplace: string;
  fileDrop: string;
  dropdownMenu: string;
  popover: string;
  correct: string;
  incorrect: string;
  selected: string;
  audio: string;
  playing: string;
  pronunciationReady: string;
  pronunciationRecording: string;
  pronunciationProcessing: string;
  pronunciationSuccess: string;
  pronunciationRetry: string;
  unavailable: string;
  favorite: string;
  unfavorite: string;
  correctAnswer: string;
  notStarted: string;
  inProgress: string;
  completed: string;
  locked: string;
  start: string;
  continue: string;
  nextQuestion: string;
  flipCard: string;
  completeAction: string;
  lockedAction: string;
  increment: string;
  decrement: string;
  verificationCode: string;
  codeCharacter: (index: number) => string;
  breadcrumb: string;
  pagination: string;
  previousPage: string;
  nextPage: string;
  pageLabel: (page: number) => string;
  navigationMenu: string;
  required: string;
  days: (count: number) => string;
  streak: string;
}

export const zhCNMessages: ChattyBunnyMessages = {
  loading: "加载中", statusHint: "状态提示", stepProgress: "步骤进度", contentLoading: "内容加载中", close: "关闭", confirm: "确定", cancel: "取消", next: "下一步", skip: "跳过", more: "更多", back: "返回",
  mainNavigation: "主导航", sidebarNavigation: "侧边导航", openNavigationMenu: "打开导航菜单", closeNavigationMenu: "关闭导航菜单", closeSidebar: "关闭侧边栏",
  selectPlaceholder: "请选择", comboboxPlaceholder: "搜索并选择", comboboxEmpty: "没有匹配的选项", clearInput: "清空输入", clearSearch: "清空搜索", clearSelection: "清除选择",
  showPassword: "显示密码", hidePassword: "隐藏密码", show: "显示", hide: "隐藏",
  fileProcessing: "正在处理文件", fileProcessingHint: "请稍候，不要关闭页面", fileSelected: (count) => `已选择 ${count} 个文件`, fileReplace: "点击或拖放以重新选择", fileDrop: "点击上传或拖放文件",
  dropdownMenu: "操作菜单", popover: "弹出内容", correct: "正确", incorrect: "错误", selected: "已选",
  audio: "发音", playing: "播放中", pronunciationReady: "按住朗读", pronunciationRecording: "录音中", pronunciationProcessing: "处理中", pronunciationSuccess: "发音正确", pronunciationRetry: "再试一次", unavailable: "不可用",
  favorite: "收藏", unfavorite: "取消收藏", correctAnswer: "正确答案", notStarted: "未开始", inProgress: "进行中", completed: "已完成", locked: "未解锁", start: "开始", continue: "继续",
  nextQuestion: "下一题", flipCard: "点击翻面", completeAction: "完成", lockedAction: "锁定",
  increment: "增加", decrement: "减少", verificationCode: "验证码", codeCharacter: (index) => `验证码第 ${index} 位`,
  breadcrumb: "面包屑导航", pagination: "分页导航", previousPage: "上一页", nextPage: "下一页", pageLabel: (page) => `第 ${page} 页`, navigationMenu: "导航菜单", required: "必填",
  days: (count) => `${count} 天`, streak: "连续学习",
};

export const enMessages: ChattyBunnyMessages = {
  loading: "Loading", statusHint: "Status", stepProgress: "Step progress", contentLoading: "Content loading", close: "Close", confirm: "Confirm", cancel: "Cancel", next: "Next", skip: "Skip", more: "More", back: "Back",
  mainNavigation: "Main navigation", sidebarNavigation: "Sidebar navigation", openNavigationMenu: "Open navigation menu", closeNavigationMenu: "Close navigation menu", closeSidebar: "Close sidebar",
  selectPlaceholder: "Select an option", comboboxPlaceholder: "Search and select", comboboxEmpty: "No matching options", clearInput: "Clear input", clearSearch: "Clear search", clearSelection: "Clear selection",
  showPassword: "Show password", hidePassword: "Hide password", show: "Show", hide: "Hide",
  fileProcessing: "Processing files", fileProcessingHint: "Please wait and keep this page open", fileSelected: (count) => `${count} file${count === 1 ? "" : "s"} selected`, fileReplace: "Click or drop to choose again", fileDrop: "Click to upload or drop files",
  dropdownMenu: "Actions", popover: "Popover", correct: "Correct", incorrect: "Incorrect", selected: "Selected",
  audio: "Pronunciation", playing: "Playing", pronunciationReady: "Hold to speak", pronunciationRecording: "Recording", pronunciationProcessing: "Processing", pronunciationSuccess: "Pronunciation correct", pronunciationRetry: "Try again", unavailable: "Unavailable",
  favorite: "Favorite", unfavorite: "Remove favorite", correctAnswer: "Correct answer", notStarted: "Not started", inProgress: "In progress", completed: "Completed", locked: "Locked", start: "Start", continue: "Continue",
  nextQuestion: "Next question", flipCard: "Flip card", completeAction: "Complete", lockedAction: "Locked",
  increment: "Increase", decrement: "Decrease", verificationCode: "Verification code", codeCharacter: (index) => `Code character ${index}`,
  breadcrumb: "Breadcrumb", pagination: "Pagination", previousPage: "Previous page", nextPage: "Next page", pageLabel: (page) => `Page ${page}`, navigationMenu: "Navigation menu", required: "Required",
  days: (count) => `${count} day${count === 1 ? "" : "s"}`, streak: "Learning streak",
};

const localeMessages: Record<ChattyBunnyLocale, ChattyBunnyMessages> = { en: enMessages, "zh-CN": zhCNMessages };
const ChattyBunnyContext = createContext<ChattyBunnyMessages>(zhCNMessages);

export interface ChattyBunnyProviderProps {
  locale?: ChattyBunnyLocale;
  messages?: Partial<ChattyBunnyMessages>;
  children: ReactNode;
}

export function ChattyBunnyProvider({ locale = "zh-CN", messages, children }: ChattyBunnyProviderProps) {
  const value = useMemo(() => ({ ...localeMessages[locale], ...messages }), [locale, messages]);
  return <ChattyBunnyContext.Provider value={value}>{children}</ChattyBunnyContext.Provider>;
}

export function useChattyBunnyMessages() {
  return useContext(ChattyBunnyContext);
}
