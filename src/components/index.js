import React, {useState} from 'react';
import logo from './logo.svg';
import './index.css';

function MorningComponent () {
  return (
    <div>
      <p>Good morning</p>
      <p>Today is a holiday.</p>
    </div>
  )
}
function MyButton (props) { // Function Component: <MyButton/>
  //console.log(props.text)

  function handleOnClick(text) { 
    console.log(`@MyButton: ${text} is clicked.`)
    // Pass data (Variable or func) from child to parent
    props.onClick(text) 
  }
  return (
      <button 
        style={{
          color: "#e2516a", backgroundColor: "black", 
          height: "100px", width: "150px", fontSize: "50px"
        }}
        onClick={()=>handleOnClick(props.text)}>
        {props.text}
      </button>
  )
}
function App() { // Function Component: <App/>
  const [name, setName] = useState("RAI") // name will be dynamics var
  const [lists, setLists] = useState([0, 1])

  function handleClicked(text) {
    console.log("@App myButtonClicked " + text)
    setName(text)
     // Append List for React
    setLists([...lists, text]);
  }

  return (
    <div style={{color: "blue"}}>
      <h1>{name}</h1>
      <MorningComponent/>
      <MyButton text="Hello" onClick={handleClicked}/>
      <MyButton text="Bye" onClick={handleClicked}/>
      <ul>
      {
        lists.map((item) => (
          <li>{item}</li>
        ))
      }
      </ul>
    </div>
  );
}

export default App;
