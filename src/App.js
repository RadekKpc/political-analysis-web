import './App.css';
import {Checkbox} from 'carbon-components-react';
function App() {
  return (
    <fieldset className="bx--fieldset">
      <legend className="bx--label">Checkbox heading</legend>
      <Checkbox defaultChecked labelText="Checkbox label" id="checked" />
      <Checkbox labelText="Checkbox label" id="checked-2" />
    </fieldset>
  );
}

export default App;
