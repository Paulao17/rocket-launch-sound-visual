var canvas = document.getElementById('rocket');
var ctx = canvas.getContext('2d');

const squareSide = 400
const squareMiddle = squareSide / 2
const pixelToMeterRatio = 7650 / 122

x = 0
y = 0

function circle(x, y, radius, color) {
  ctx.strokeStyle = color
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.stroke();
}

function draw(x, y) {
  var ctx = document.getElementById('rocket').getContext('2d');
  ctx.clearRect(0, 0, squareSide, squareSide); // clear canvas

  ctx.fillStyle = 'red';
  ctx.fillRect(x - 10, y - 10, 20, 20); // Draw cursor location, centered to point. to change to character

  radius = ((x - squareMiddle)**2 + (y - squareMiddle)**2)**0.5 // Calculate radius with pythagorean theorem
  radiusInMeters = radius * pixelToMeterRatio
  circle(squareMiddle, squareMiddle, radius, 'red') // Draw radius circle

  rocketdb = document.getElementById('db').value // Sound level of rocket (dB)
  if (isNaN(rocketdb) || rocketdb == "") { // In case of faulty input
    rocketdb = 160.9
    document.getElementById('db').value = 160.9 // Reset in field
  }
  rocketdb = parseFloat(rocketdb) // Might be a string

  I0 = document.getElementById('I0').value // Sound intensity of rocket (W.m^-2)
  if (isNaN(I0) || I0 == "") { // In case of faulty input
    I0 = 0,000000000001
    document.getElementById('I0').value = 0,000000000001 // Reset in field
  }
  I0 = parseFloat(I0) // Might be a string

  I = 10 ** (rocketdb / 10) * I0 // Calculate rocket intensity with given equations (W.m^-2)

  r0 = document.getElementById('r0').value // Distance of sound level measure (meters)
  if (isNaN(r0) || r0 == "") { // In case of faulty input
    r0 = 38.1
    document.getElementById('r0').value = 38.1 // Reset in field
  }

  P = 4 * Math.PI * I * r0**2 // Calculate sound Power of rocket (Watts)

  Ir = P / (4 * Math.PI * radiusInMeters**2) // Calculate simulated sound intensity (W.m^-2)

  Lr = 10 * Math.log(Ir / I0) / Math.log(10) // Calculte sound intensity level in dB. Note that Math.log() is log base e.

  document.getElementById('coord-x').innerHTML = x // Show x coord
  document.getElementById('coord-y').innerHTML = y // Show y coord
  document.getElementById('coord-dist').innerHTML = Math.floor(radius) // Show distance to point in pixels
  document.getElementById('coord-distm').innerHTML = Math.floor(radiusInMeters) // Show distance to point in meters
  document.getElementById('I').innerHTML = Math.floor(I) // Show rocket intensity in W.m^-2
  document.getElementById('P').innerHTML = Math.floor(P) // Show rocket sound power in W
  document.getElementById('Ir').innerHTML = Ir.toExponential() // Show simulated sound intensity in W.m^-2
  document.getElementById('Lr').innerHTML = Math.floor(Lr) // Show simulated sound intensity level in dB
}

function click(e) {
  var rect = canvas.getBoundingClientRect();
  x = e.clientX - rect.left
  y = e.clientY - rect.top
  draw(x, y)
}

canvas.addEventListener('click', click)

document.getElementById('coord-pxtom').innerHTML = Math.floor(pixelToMeterRatio)
