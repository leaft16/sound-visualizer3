//var song
var mic
var fft
var rot = 0
var extra = 0
var bgvid = document.getElementById("bgvid");

function preload() {
  //song = loadSound('improv39_master2.mp3')
  diamond = loadModel('diamond.obj')
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight, WEBGL)
  myCanvas.parent("fundo")
  angleMode(DEGREES)
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT()
  fft.setInput(mic)
  bgvid.play()
  //noLoop()
}

function draw() {
  background(0, 0, 0, 0)

  rotateX(60 + rot/2)
  rotateY(rot)
  rotateZ(-rot)

  noFill()
  stroke(255)
  //stroke('#00FFC6')
  strokeWeight(4)

  var wave = fft.waveform()

  for (var i = 0; i < 80; i+=5) {

    //var r = 245 - i*2
    //var g = 240 - i*3
    //var b = 245 - i/3
    //stroke(r + 2*extra, g + extra/2, b - 1.5*extra);

    /*
    var r = random(200, 255) - i
    var g = random(200, 255) - i*3
    var b = random(200, 255) - i*2
    stroke(r, g, b)
    */

    beginShape()
    for (var j = 0; j < 360; j += 1) {
      var index = floor(map(j, 0, 360, 0, wave.length - 1))
      var rr = map(wave[index], -1, 1, 150, 200)
      var rad = (rr/16)*i
      var x = rad * cos(j)
      var y = rad * sin(j)
      var z = sin(frameCount*2 + i * 5) * 80

      vertex(x, y, z)
    }
    endShape(CLOSE)
  }

  rot+=.2

  strokeWeight(3)
  stroke(255)
  //stroke('rgb(255, 254, 133)')
  fill('rgba(255, 255, 255, 0.7)')
  //fill('rgba(255, 163, 134, 0.7)')
  scale(130)
  translate(0, 0, 1.6)
  rotateX(90)
  model(diamond)

  //stroke('rgb(97, 255, 244)')
  //fill('rgba(229, 172, 255, 0.7)')
  translate(0, -3.2, 0)
  rotateX(180)
  model(diamond)
  /*
  if ((r + 2*extra > 255) || (g + extra > 255) || (b - extra) > 255)
    flag = 0
  
  if (extra <= 0)
    flag = 1

  if (flag === 1)
    extra += .1

  if (flag === 0)
    extra -= .1
  */
}

/*
function mouseClicked() {
  //animation.loop()
  if (animation.loop()) {
    song.pause()
    noLoop()
    bgvid.pause()
  } else {
    song.play()
    loop()
    bgvid.play()
  }
}

function keyPressed() {
  // 32 - spacebar; 13 - enter
  if (keyCode === 32 || keyCode === 13) {
    if (animation.loop()) {
      song.pause()
      noLoop()
      bgvid.pause()
    } else {
      song.play()
      loop()
      bgvid.play()
    } 
  }
}
*/