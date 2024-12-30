
xOld = -1
yOld = -1

def on_forever():
    global xOld, yOld
    xVal = pins.analog_read_pin(AnalogPin.P0) - 111
    xVal = Math.round(xVal / (170))
    yVal = pins.analog_read_pin(AnalogReadWritePin.P1) - 172
    yVal = Math.round(yVal / 170)
    if xOld != xVal or yOld != yVal:
        if xOld >= 0 or yOld >= 0:
            led.toggle(xOld, yOld)
        led.toggle(xVal, yVal)
        xOld = xVal
        yOld = yVal
basic.forever(on_forever)
