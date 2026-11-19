import { useEffect } from "react";
import { useFormStore } from "../store";

export default function Header() {
  const title = useFormStore((s) => s.form.title);

  useEffect(() => {
    console.log("[Header Render]");
  });

  return (
    <header
      style={{
        color: "#fff",
        backgroundColor: "#000",
        padding: ".125rem",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>
    </header>
  );
}
