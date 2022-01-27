import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function add1(x) {
  return x + 1
}

//add1(1, 2, 3) // 2
//add1()  // NaN =  Not A Number
//add1(undefined)  // NaN =  Not A Number

function App() {

  const [seconds, setSeconds] = useState(300)
  const [intervalId, setIntervalId] = useState() //aus startCounting() rausgeholt, damit wir sie global sehen können
  const [isClockRunning, setIsClockRunning] = useState(false) //Timer läuft nicht
  const [buttonState, setButtonState] = useState("Start")

  //console.log("render")

  function nextSecond() {

    // Two ways to call a state setter function:
    // With a value:
    // setSeconds(seconds + 1)

    // or with an update function:
    // Update function must take exactly one parameter, which is the old state
    //setSeconds(add1)  //WICHTIG: WENN MAN EINE FUNKTION AN DIE SET-HOOK ÜBERGIBT, DANN ÜBERGIBT DIE SETHOOK IMMER DEN ALTEN WERT IHRER VARIABLE (HIER SECONDS) AN DIESE FUNKTION, AUCH WENN ICH DIESE IN DER FUNKTION GARNICHT VERWENDEN WILL
    // setSeconds(s => s + 1)
    // somewhere in react internals, this happens:
    // setSeconds(add1(seconds)) - man kann der set-Methode anstelle von einem direkten Wert auch eine Funktion übergeben. macht hier Sinn, weil wenn die App rerendert wird, die funktion mit einem neuen seconds gebaut wird, welches keinen Bezug mehr zu dem alten seconds hat und dadurh funktioniert das nicht mehr - "scoping"
    setSeconds(oldSeconds => oldSeconds -1)// Oldseconds wird an eine Funktion ohne Name übergeben, die sie um eins erniedrigt
  }

  function startCounting() {
    // Lieber browser, benutz diese Funktion und ruf sie einmal pro sekund auf
    const intervalId = setInterval(nextSecond, 1000) //setInterval gibt einen Wert zurück - eine ID
    console.log(intervalId)
    setIntervalId(intervalId)
  }

  //useEffect(startCounting, []) 

  function stopCountingAt30() {
    if (seconds === 30) {
      clearInterval(intervalId)
    }
  }

  //useEffect(stopCountingAt30, [seconds, intervalId])

  // Dieser Effect wird nur einmal ausgeführt. Wenn sich etwas in der dependencylist verändert, wird er erneut ausgeführt und damit seine im Inneren befindliche Funktion
  //useEffect(() => {
  //  console.log("effect")
  //}, [] /* dependency list */)




  function stopCounting(){
    clearInterval(intervalId)
  }

  // Kurzfassung
  // useEffect(() => {

  //   setInterval(() => setSeconds(s => s + 1), 1000)

  // }, [setSeconds])
  function handleButton(_e){
    switch(isClockRunning){
      case false: {
        startCounting();
        setIsClockRunning(true);
        //setIsClockRunning(cs => !cs) //nur bei Booleans!!!!!!!
        setButtonState("Stop");
        break
      }
      case true: {
        stopCounting();
        setIsClockRunning(false);
        //setIsClockRunning(cs => !cs)
        setButtonState("Start");
        break
      }
    }
  }

  useEffect(() => {
    document.title = "seconds remaining: " + (seconds)
  }, [seconds])


  return (
    <div>
      {seconds} <button onClick={handleButton}>{buttonState}</button>
    </div>
  );
}

export default App;


