import { useState } from "react";

/** @deprecated Demo-only state helper retained for backwards compatibility. It is not part of the supported component system. */
export function DemoForm() {
  const [text, setText] = useState("father");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(true);
  const [segment, setSegment] = useState("all");
  return { text, setText, search, setSearch, checked, setChecked, segment, setSegment };
}
