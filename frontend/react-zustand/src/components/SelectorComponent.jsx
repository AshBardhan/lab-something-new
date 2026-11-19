import { usePersonStore } from "../store";

export default function SelectorComponent() {
  const firstName = usePersonStore((s) => s.person.firstName);
  const setFirstName = usePersonStore((s) => s.setFirstName);
  console.log("%c[SelectorComponent render]", "color: green");

  return (
    <div style={{ border: "1px solid", padding: 10, marginBottom: 10 }}>
      <h3>Selector Component</h3>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <p>First Name: {firstName}</p>
    </div>
  );
}
