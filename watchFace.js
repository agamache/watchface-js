/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas')
/** @type {CanvasRenderingContext2D} */
var ctx = canvas.getContext('2d')
/** @type {Image} */
var face = new Image()
face.src = 'Watch Face.png'
if (Math.round(canvas.width*.9)/2 % 2 != 0) {
    var faceSize = Math.round(canvas.width*95/100)+1
} else {
    var faceSize = Math.round(canvas.width*95/100)
}
function Origin() {
    this.x = canvas.width/2
    this.y = canvas.height/2
}
var origin = new Origin()
function polarToRect(radius, offset) {
    this.y = -1*(radius * Math.cos(offset))+origin.y
    this.x = (radius * Math.sin(offset))+origin.x
}


function draw() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.drawImage(face, (canvas.width-faceSize)/2, (canvas.height-faceSize)/2, faceSize, faceSize)

    var now = new Date()
    var hr = now.getHours()
    var min = now.getMinutes()
    var sec = now.getSeconds()
    var msec = now.getMilliseconds()

    //draw hour hand
    var hrPos = new polarToRect(canvas.width/5, 2*Math.PI*(hr%12)/12 + 2*Math.PI*min/(12*60) + 2*Math.PI*sec/(12*60*60) + 2*Math.PI*msec/(12*60*60*1000))
    ctx.strokeStyle = '#bbbbbb'
    ctx.lineWidth = 10
    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(hrPos.x, hrPos.y)
    ctx.stroke()
    ctx.closePath()

    //draw minute hand
    var minPos = new polarToRect(canvas.width/4, 2*Math.PI*min/60 + 2*Math.PI*sec/(60*60)+ 2*Math.PI*msec/(60*60*1000))
    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(minPos.x,minPos.y)
    ctx.stroke()
    ctx.closePath()

    //draw second hand
    var secPos = new polarToRect(canvas.width/3, 2*Math.PI*sec/60 + 2*Math.PI*msec/(60*1000))
    ctx.strokeStyle = '#bbbbff'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(origin.x,origin.y)
    ctx.lineTo(secPos.x, secPos.y)
    ctx.stroke()
    ctx.closePath()

    window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw)
