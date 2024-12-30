serial.setBaudRate(BaudRate.BaudRate115200)
serial.redirectToUSB()

let xOld = -1
let yOld = -1
let xDisplayOld = -1
let yDisplayOld = -1
basic.forever(function on_forever() {
    let x = Math.floor((pins.analogReadPin(AnalogPin.P0) - 498) / 4)
    if (x <=5 || x >= -5) {
        x = 0
    }

    basic.showString("X:")
    basic.showNumber(x)
    let xVal = pins.analogReadPin(AnalogPin.P0) - 111
    if (xVal < 0) {
        xVal = 0
    }

    let xDisplay = 4 - Math.round(xVal / 170)
    if(xDisplay < 0)
        xDisplay = 0
    if (xDisplay > 4)
        xDisplay = 4
    let y = Math.floor((pins.analogReadPin(AnalogReadWritePin.P1) - 543) / 4)
    if (y <= 5 || y >= -5) {
        y = 0
    }
    basic.showString("Y:")
    basic.showNumber(y)
    let yVal = pins.analogReadPin(AnalogReadWritePin.P1) - 172
    if (yVal < 0) {
        yVal = 0
    }

    let yDisplay = Math.round(yVal / 170)
    if (yDisplay < 0)
        yDisplay = 0
    if (yDisplay > 4)
        yDisplay = 4

    if (xOld != xVal || yOld != yVal) {
        if (xDisplayOld >= 0 || yDisplayOld >= 0) {
            led.toggle(xDisplayOld, yDisplayOld)
            serial.writeLine(xVal.toString() + ";" + yVal.toString())
        }
        
        led.toggle(xDisplay, yDisplay)
        xOld = xVal
        yOld = yVal
        xDisplayOld = xDisplay
        yDisplayOld = yDisplay
    }
})
