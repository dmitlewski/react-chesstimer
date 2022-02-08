// count down by one second
function tick() {
    
}

setTimeout(tick, 1000)  // run tick() once after 1 second
setInterval(tick, 1000)  // run tick() every 1 second



const timeoutId = setTimeout(tick, 1000)  // run tick() once after 1 second
clearTimeout(timeoutId)



const intervalId = setInterval(tick, 1000)  // run tick() once after 1 second. WICHTIG: WENN GERERENDERT WIRD, DANN WIRD IMMERNOCH DIE ALTE FUNKTION AUSGEFÜHRT WEIL BEIM RERENDERN EINE NEUE FUNKTION TICK ERSCHAFFEN WIRD...
clearInterval(intervalId)


const timestamp = Date.now()  // UNIX timestamp in ms
                              // ms since 1.1.1970

// ---

const someArray = [
  "Hello",
  "World",
]
someArray[1]  // "World"


// JS: Object is an instance. Keine Klasse sondern eine Instanz.
const someObject = {
  // Key: Value
  foo: "Hello",
  bar: "World",
}
someObject.foo  // "Hello"


const someOtherObject = {
  // Key: Value
  a: 1,
  b: 2,
  c: "hello",
}
someOtherObject.a  // 1
someOtherObject.z  // undefined

const vectorAsArray = [1, 24, 1337]
const vectorAsObject = { x: 1, y: 24, z: 1337 }



let o //ist ein Objekt
o = {x: 1, y: 5}
o = {"x": 1, "y": 5}
o = {["x"]: 1, ["y"]: 5}
o = {["X".toLowerCase()]: 1, ["Y".toLowerCase()]: 5}

const key = "z"
o = { ...o, [key]: 13 }  // {x: 1, y: 5, z: 13}


const uglyObject = {
  "": "don't do this",
  "1": "or this",
  2: "or this",
  "data-testid": "asdf"
}
uglyObject["data-testid"]
uglyObject["1"]
uglyObject[2]
uglyObject[""]


// Was ist eine Methode in JavaScript - selbes Prinzip: Key -value, nur das der value jetzt eine Funktion ist, die dort definiert wurde
const myObjectWithFunction = {
  // Key: Value
  foo: "Hello",
  bar: "World",
  fn: function sayHello(name) { console.log("hello", name) }
}
myObjectWithFunction.fn("David")


class Greeter {

  // Attributers (for TypeScript)
  // name: string
  // fn?: () => void


  constructor(name) {
    this.name = name
  }

  // Regular method
  sayHello() {
    console.log("hello", this.name)
  }

  // An attribute with a function as value
  sayHello2 = () => {
    console.log("hello", this.name)
  }

}

const myGreeter = new Greeter("Dave")
myGreeter.sayHello()

myGreeter.name = "Phil"

myGreeter.fn = function() { console.log("poop") }
myGreeter.fn()






class Greeter {

  constructor(name) {
    this.name = name
  }

  sayHello() {
    console.log("hello", this.name)
  }

}


function Greeter(name) {
  this.name = name
}
Greeter.prototype.sayHello = function() {
  console.log("hello", this.name)
}
new Greeter("foo").sayHello()
