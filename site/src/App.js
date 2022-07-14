import React from 'react'
import Input from './components/Input';
import Textarea from './components/Textarea';
import store from './Store';

function App() {
  const [array, setArray] = React.useState([]);
  const [formName, setFormName] = React.useState('');

  let body = {
    "jsonrpc": "2.0",
    "method": "createForm",
    "params": {
      "form_name": formName,
      template: [
      ]
    },
    "id": "1"
  };

  let options = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };


  function saveTemplate() {
    body.params.template.push(store.getTemplate());
    fetch("http://localhost:8000/create", options).then((result) => result.json()).then((json_result) => console.log(json_result));
  };

  return (
    <div className="App">
      <div>
        <p>Form name:</p>
        <input value={formName} onChange={(e) => setFormName(e.target.value)} />
      </div>
      <button onClick={() => setArray([...array, "input"])}>Add input</button>
      <button onClick={() => setArray([...array, "textarea"])}>Add textarea</button>
      {array.map((el) => (
        el == "input" ? <Input /> : <Textarea />
      ))}
      <button style={{ marginLeft: "100px" }} onClick={() => saveTemplate()}>Save Form</button>
    </div>
  );
}

export default App;
