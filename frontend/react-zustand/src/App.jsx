import "./App.css";
import SelectorComponent from "./components/SelectorComponent";
import DestructureComponent from "./components/DestructureComponent";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="App">
      <h1>Zustand</h1>
      <section>
        <h2>Component Re-Rendering</h2>
        <Header />
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ flex: 2 }}>
            <Canvas />
          </div>
          <div style={{ flex: 1 }}>
            <Sidebar />
          </div>
        </div>
      </section>
      <section>
        <h2>Selector vs Destructuring</h2>
        <SelectorComponent />
        <DestructureComponent />
      </section>
    </div>
  );
}
export default App;
