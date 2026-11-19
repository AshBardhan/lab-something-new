import { usePersonStore } from "../store";

export default function DestructureComponent() {
  const { person, setLastName } = usePersonStore();
  console.log("%c[DestructureComponent render]", "color: red");

  return (
    <div style={{ border: "1px solid", padding: 10, marginBottom: 10 }}>
      <h3>Destructure Component</h3>
      <input
        type="text"
        value={person.lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <p>Last Name: {person.lastName}</p>
    </div>
  );
}
