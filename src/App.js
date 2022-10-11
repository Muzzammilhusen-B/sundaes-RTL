import {useState} from "react";
import "./App.css";

function App() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const newButtonColor1 = checked1 ? "red" : "";
  const newButtonColor2 = checked2 ? "green" : "";

  return (
    <div>
      <div>
        <span>
          <input
            type="checkbox"
            id="red-checkbox"
            onChange={(e) => setChecked1(e.target.checked)}
            defaultChecked={checked1}
          />
          <label htmlFor="red-checkbox">Red</label>
        </span>
        <span>
          <input
            type="checkbox"
            id="green-checkbox"
            onChange={(e) => setChecked2(e.target.checked)}
            defaultChecked={checked2}
          />
          <label htmlFor="green-checkbox">Green</label>
        </span>
      </div>
      <div>
        <button style={{backgroundColor: newButtonColor1}}>Button1</button>
        <button style={{backgroundColor: newButtonColor2}}>Button2</button>
      </div>
    </div>
  );
}

export default App;
