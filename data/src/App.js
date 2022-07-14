import react from 'react';

let json = [{
  "form_name": "Form number #2",
  "template": [
    {
      "type": "textarea",
      "about": "this is textarea",
      "value": "value"
    },
    {
      "type": "input",
      "about": "this is input",
      "value": "value"
    }
  ]
}, {
  "form_name": "Form number #3",
  "template": [
    {
      "type": "textarea",
      "about": "this is textarea",
      "value": "value"
    },
    {
      "type": "input",
      "about": "this is input",
      "value": "value"
    },
    {
      "type": "select",
      "about": "this is input",
      "value": "value",
      "options": ["1", "2", "3"]
    }
  ]
}
];

function App() {
  const [id, setID] = react.useState("");
  const [forms, setForms] = react.useState([]);

  function takejson(obj) {
    if (obj.type == "textarea") {
      return (<div>about:{obj.about} <textarea>{obj.value}</textarea></div>)
    }
    if (obj.type == "input") {
      return (<div>about:{obj.about} <input value={obj.value} /></div>)
    }
    if (obj.type == "select") {
      return (<div>about:{obj.about} <select value={obj.value}> {obj.options.map((option) => (<option value={option}> option</option>))} </select></div>)
    }
  }

  function fetchFnc(options) {
    fetch("http://localhost:8000/get", options).then(response => response.json()).then((responseJSON) => setForms([...forms, responseJSON.jsonrpc.params]))
  }

  let req = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "jsonrpc": "2.0",
      "method": "getForm",
      "params": { "id": id },
      "id": "1"
    })
  };

  return (
    <div className="App">
      <h5>Enter form id:</h5>

      <input value={id} onChange={(e) => setID(e.target.value)}></input>
      <button onClick={() => fetchFnc(req)}>Get form</button>

      {forms.map((form) => (
        <div style={{ backgroundColor: "#c7c7c7", color: "black" }}>
          <p>{form.form_name}</p>
          {form.template.map((el) => (
            takejson(el)
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
