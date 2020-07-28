import React, {useState} from 'react';
//import logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import AddAlertIcon from '@material-ui/icons/Delete';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
}));

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
  const [lists, setLists] = useState([])
  const classes = useStyles();

  function handleClicked(text) {
    console.log("@App myButtonClicked " + text)
    setName(text)
    var newId = (lists.length === 0) ? (0) : (lists[lists.length-1].id + 1) // assign id
    setLists([...lists, {id: newId, text: text} ]); // Append list
    console.log(lists)
  }

  function handleRemove(id) { // Handle remove button
    console.log(id)
    // Filter function to filter data in array
    // IF condition is TRUE, the item in lists will not be removed.
    const newList = lists.filter((item) => !(item.id === id) ) // Remove item by id
    setLists(newList)
  }

  return (
    <div style={{color: "blue"}}>
      <h1>{name}</h1>
      <MorningComponent/>
      <Button variant="contained" color="secondary">
        Primary
      </Button>
      <AddAlertIcon style={{color: true ? "blue" : "green"}}/> 
      <AddAlertIcon className="myStyle" /> 
      <IconButton onClick={() => { handleClicked('DEL') }}>
        <AddAlertIcon/>
      </IconButton>
      <MyButton text="Hello" onClick={handleClicked}/>
      <MyButton text="Bye" onClick={handleClicked}/>
      <table>
        <tbody>
          {
          lists.map((item) => (
            <tr key={item.id}>
              <td style={{border: "1px solid green"}}>{item.id}</td>
              <td style={{border: "1px solid green"}}>{item.text}</td>
              <td><button onClick={()=>{handleRemove(item.id)}}>REMOVE</button></td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
