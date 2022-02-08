import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function add1(x) {
  return x + 1
}


/**
 * Assumption n does not have more than two digits
 *
 * > toTwoDigitString(15)
 * < "15"
 * > toTwoDigitString(5)
 * > "05"
 */
function toTwoDigitString(n) {
  // if (n > 99 || n < 0) {
  //   throw Error("n is weird I dunno what to do")
  // }

  if (n > 9) {
    return "" + n
  } else {
    return "0" + n
  }
}

//add1(1, 2, 3) // 2
//add1()  // NaN =  Not A Number
//add1(undefined)  // NaN =  Not A Number

function App(props) {
  let secondDuration = props.secondDuration
  if (secondDuration === undefined) {
    secondDuration = 1000
  }
  // const secondDuration = props.secondDuration ?? 1000

  // const [minutes, setMinutes] = useState(3)
  //const [secondsHighDigit, setSecondsHighDigit] = useState(6) //test für 10 sekunden.
  //const [secondsLowDigit, setSecondsLowDigit] = useState(0)

  const [seconds, setSeconds] = useState(3);
  const [minutes , setMinutes] = useState(0);

  const [timeoutId, setTimeoutId] = useState() //aus startCounting() rausgeholt, damit wir sie global sehen können
  const [isClockRunning, setIsClockRunning] = useState(false) //Timer läuft nicht
  const [buttonState, setButtonState] = useState("Start")

  //console.log("render")

  // function nextSecond() {

    // Two ways to call a state setter function:
    // With a value:
    // setSeconds(seconds + 1)

    // or with an update function:
    // Update function must take exactly one parameter, which is the old state
    //setSeconds(add1)  //WICHTIG: WENN MAN EINE FUNKTION AN DIE SET-HOOK ÜBERGIBT, DANN ÜBERGIBT DIE SETHOOK IMMER DEN ALTEN WERT IHRER VARIABLE (HIER SECONDS) AN DIESE FUNKTION, AUCH WENN ICH DIESE IN DER FUNKTION GARNICHT VERWENDEN WILL
    // setSeconds(s => s + 1)
    // somewhere in react internals, this happens:
    // setSeconds(add1(seconds)) - man kann der set-Methode anstelle von einem direkten Wert auch eine Funktion übergeben. macht hier Sinn, weil wenn die App rerendert wird, die funktion mit einer neuen Variable seconds gebaut wird, welches keinen Bezug mehr zu dem alten seconds hat und dadurh funktioniert das nicht mehr - "scoping"
    //setSeconds(oldSeconds => oldSeconds -1)// Oldseconds wird an eine Funktion ohne Name übergeben, die sie um eins erniedrigt. 
    //WICHTIG: WENN MAN EINE FUNKTION AN DIE SET-HOOK ÜBERGIBT, DANN ÜBERGIBT DIE SETHOOK IMMER DEN ALTEN WERT IHRER VARIABLE (HIER SECONDS) AN DIESE FUNKTION, AUCH WENN ICH DIESE IN DER FUNKTION GARNICHT VERWENDEN WILL
    
    
  //   setSeconds((oldSeconds) => oldSeconds -1)
  // }

  // function nextDigits(){
  //   // uebergang: :10 => :09
  //   if(secondsLowDigit === 0 && secondsHighDigit != 0){
  //     setSecondsLowDigit((secondsLowDigit) => 9);
  //     console.log(secondsLowDigit);//secondsLowDigit belibt 0????
  //     setSecondsHighDigit((secondsHighDigit) => secondsHighDigit -1);
      
      
  //   }
  //   //Timer terminieren
  //   else if(secondsLowDigit === 0 && secondsHighDigit === 0){
  //     stopCounting(); 
  //     setIsClockRunning(false);
  //     setButtonState("Start");

  //   }
  //   else{
  //     setSecondsLowDigit((secondsLowDigit) => secondsLowDigit -1);
  //   }
  //   startCounting()
  // }

  function nextDigits(){
    //normalize seconds:
    //const secondsNormalized = toTwoDigitString(seconds);
    setSeconds((oldSeconds) => oldSeconds - 1); //newSeconds machen
    
    console.log(seconds);
     if(seconds === 0){
      console.log("render");
      stopCounting(); 
      setIsClockRunning(false);
      setButtonState("Start");
     }
     else{
      startCounting();
     }
    
   
  }


  function startCounting() {
    // Lieber browser, benutz diese Funktion namens nextSeconds und ruf sie einmal pro sekund auf
    const timeoutId = setTimeout(nextDigits, secondDuration) //setTimeout gibt einen Wert zurück - eine ID.
    setTimeoutId(timeoutId); //damit die timeoutID von außen sichtbar ist und sich nicht mit jedem rerender verändert.
   
  }

  //useEffect(startCounting, []) 

  // function stopCountingAt30() {
  //   if (seconds === 30) {
  //     clearInterval(timeoutId)
  //   }
  // }

  //useEffect(stopCountingAt30, [seconds, timeoutId])

  // Dieser Effect wird nur einmal ausgeführt. Wenn sich etwas in der dependencylist verändert, wird er erneut ausgeführt und damit seine im Inneren befindliche Funktion
  //useEffect(() => {
  //  console.log("effect")
  //}, [] /* dependency list */)




  function stopCounting(){
    clearTimeout(timeoutId)
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

  // useEffect(() => {
  //   document.title = "seconds remaining: " + (seconds)
  // }, [seconds])

  return (
    <div>
      {minutes}:{seconds} <button onClick={handleButton}>{buttonState}</button>
    </div>
  );
}

export default App;
