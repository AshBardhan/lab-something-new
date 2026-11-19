import { useEffect } from "react";
import { useFormStore } from "../store";

export default function Canvas() {
  const fields = useFormStore((s) => s.form.fields);
  const addField = useFormStore((s) => s.addField);

  useEffect(() => {
    console.log("[Canvas Render]");
  });

  return (
    <div style={{ padding: ".5rem 1rem" }}>
      <h3>Canvas</h3>
      <button onClick={addField}>Add Field</button>
      <br />
      <br />
      {fields.length > 0 && (
        <div style={{ border: "1px solid #ccc" }}>
          {fields.map((f, i) => (
            <div
              key={f.id}
              style={{
                backgroundColor: i % 2 === 0 ? "#eee" : "#fff",
                padding: ".25rem .5rem",
              }}
            >
              {f.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
