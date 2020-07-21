import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './index.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ipcRenderer  = window.require("electron").ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

// Function component
function App() {
  const [buttonStatus, setButtonStatus] = useState(false)

  // componentDidMount
  useEffect(() => {
    console.log("useEffect active")

    ipcRenderer.on("buttonStatus", (event, message) => {
      console.log("New buttonStatus " + message)
      setButtonStatus(message)
    })

  }, [])

  const classes = useStyles();
  return (
    <div>
      {buttonStatus ? "ON" : "OFF"}
      <WbIncandescentIcon style={{ 
        color: green[buttonStatus ? 500 : 0], fontSize: 100
        }}/> 
    </div>
  );
}
export default App;


