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
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Typography } from '@material-ui/core';

const ipcRenderer  = window.require("electron").ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainContainer: {
    height: 'calc(100vh - 20px)',
    width: '100%',
    marginTop: 0, 
    marginLeft: 0, marginRight: 0
  },
  fullHeight: {
    height: '100%',
  },
  messageLog: {
    textAlign:"left", height: '100%', overflow: 'scroll'
  },
}));

// Function component
function App() {
  const [Input, setInput] = useState(false)
  const [inputIoT, setinputIoT] = useState(false)
  const [messageLog, setmessageLog]   = useState([])

  // componentDidMount
  useEffect(() => {
    console.log("useEffect active")

    ipcRenderer.on("inputHW", (event, value) => {
      setInput(Input => (value))
      appendLog(`InputHW ${value}`)
    })

    ipcRenderer.on("inputIoT", (event, value) => {
      setinputIoT(inputIoT => (value))
      appendLog(`inputIoT ${value}`)
    })

  }, [])

  function setOutput (value) {
    appendLog(`Output ${value}`)
  }

  function appendLog (msg) {
    var d = new Date()
    let dateString = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    // setmessageLog([...messageLog, `${dateString} ${msg}`])
    setmessageLog(messageLog => ([`${dateString} ${msg}`, ...messageLog]))
  }

  const classes = useStyles();
  return (
    <Grid container spacing={2} justify="space-around" alignItems="flex-start" direction="row" className={classes.mainContainer} >
      <Grid item xs={6} className={classes.fullHeight}>
        <Card variant="outlined" className={classes.fullHeight}>
          <CardHeader title={"Lighting Control"}></CardHeader>
          <Divider />
          <CardContent style={{textAlign:"center"}}>
            <div>
              <div style={{display:"inline-block"}}>
                <Typography variant="h6"> Input HW</Typography>
                <WbIncandescentIcon style={{ 
                  color: green[Input ? 500 : 0], fontSize: 100
                }}/> 
              </div>
              <div style={{display:"inline-block"}}>
                <Typography variant="h6"> Input IoT</Typography>
                <WbIncandescentIcon style={{ 
                  color: green[inputIoT ? 500 : 0], fontSize: 100
                }}/> 
              </div>
            </div>
            <div>
              <Typography variant="h6"> Output</Typography>
              <Button onClick={()=>setOutput(true)} size="large" variant="contained" color="primary">
                ON
              </Button>
              <Button onClick={()=>setOutput(false)} size="large" variant="contained" color="secondary">
                OFF
              </Button>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} className={classes.fullHeight}>
        <Card variant="outlined" className={classes.fullHeight} style={{}}>
          <CardHeader title={"Logging"}></CardHeader>
          <Divider />
          <CardContent  className={classes.messageLog} >
            {messageLog.map((log) => (
              <p>{log}</p>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
export default App;


