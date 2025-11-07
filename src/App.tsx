import { Button } from "./components/Button";
import { Dropdown } from "./components/Dropdown";

function App() {
  return (
    <>
      <h1 className="font-bold text-red-500">Vite + React</h1>
      <Button text="Hello Button" />
      <Dropdown
        options={["시즌1", "Option 2", "Option 3"]}
        defaultOption="Option 2"
        onChange={(option) => console.log("Selected:", option)}
      />
    </>
  );
}

export default App;
