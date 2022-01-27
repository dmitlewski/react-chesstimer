import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function add1(x) {
  return x + 1
}

add1(1, 2, 3) // 2
add1()  // NaN =  Not A Number
add1(undefined)  // NaN =  Not A Number

function App() {

  const [seconds, setSeconds] = useState(0)

  console.log("render")

  function nextSecond() {

    // Two ways to call a state setter function:
    // With a value:
    // setSeconds(seconds + 1)

    // or with an update function:
    // Update function must take exactly one parameter, which is the old state
    setSeconds(add1)
    // setSeconds(s => s + 1)
    // somewhere in react internals, this happens:
    // setSeconds(add1(seconds))
  }

  function startCounting() {
    // Lieber browser, benutz diese Funktion und ruf sie einmal pro sekund auf
    setInterval(nextSecond, 1000)
  }

  useEffect(startCounting, [])

  // Dieser Effect wird nur einmal ausgeführt
  useEffect(() => {
    console.log("effect")
  }, [] /* dependency list */)


  // Kurzfassung
  // useEffect(() => {

  //   setInterval(() => setSeconds(s => s + 1), 1000)

  // }, [setSeconds])


  useEffect(() => {

    document.title = "seconds: " + (seconds + 2)

  }, [seconds])


  return (
    <div>
      {seconds} <button onClick={nextSecond}>Tick</button>
    </div>
  );
}

export default App;


