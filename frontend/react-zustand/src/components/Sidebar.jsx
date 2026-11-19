import { useEffect } from "react";
import { useFormStore } from "../store";

export default function Sidebar() {
  const title = useFormStore((s) => s.form.title); // ✅ added
  const theme = useFormStore((s) => s.form.theme);
  const fields = useFormStore((s) => s.form.fields);
  const updateForm = useFormStore((s) => s.updateForm);
  const updateFieldLabel = useFormStore((s) => s.updateFieldLabel);

  useEffect(() => {
    console.log("[Sidebar Render]");
  });

  return (
    <aside style={{ backgroundColor: "lightgray", padding: ".5rem 1rem" }}>
      <h3>Sidebar</h3>
      <label>
        Title:
        <input
          value={title}
          onChange={(e) => updateForm("title", e.target.value)}
        />
      </label>
      <br />
      <label>
        Theme:
        <select
          value={theme}
          onChange={(e) => updateForm("theme", e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <h4>Edit Fields</h4>
      {fields.map((f) => (
        <div style={{ marginBottom: ".5rem" }} key={f.id}>
          <input
            value={f.label}
            onChange={(e) => updateFieldLabel(f.id, e.target.value)}
          />
        </div>
      ))}
    </aside>
  );
}
