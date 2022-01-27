// count down by one second
function tick() {
    
}

setTimeout(tick, 1000)  // run tick() once after 1 second
setInterval(tick, 1000)  // run tick() every 1 second



const timeoutId = setTimeout(tick, 1000)  // run tick() once after 1 second
clearTimeout(timeoutId)



const intervalId = setInterval(tick, 1000)  // run tick() once after 1 second
clearInterval(intervalId)


const timestamp = Date.now()  // UNIX timestamp in ms
                              // ms since 1.1.1970

