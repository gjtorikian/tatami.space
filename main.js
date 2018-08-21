const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Code courtesy of http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file
function saveCanvas() {
  var image = canvas.toDataURL("image/png");
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  image = image.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  image = image.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=tatami.png');
  this.href = image;
}
/* REGISTER DOWNLOAD HANDLER */
/* Only convert the canvas to Data URL when the user clicks.
   This saves RAM and CPU ressources in case this feature is not required. */
document.getElementById('save').addEventListener('click', saveCanvas, false);

function draw() {

  colors = ['#ff0000', '#00ff00', '#0000ff', 'black'];

  context.lineWidth = 5;
  // frame
  context.rect(0, 0, 360, 360);
  context.stroke();

  context.lineWidth = 1;

  let image = new Image();
  image.src = "patterns/download.png";

  image.onload = function() {
    let pattern = context.createPattern(image, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 240, 240, 120);
  }

  // bottom right
  context.fillStyle = "orange";
  context.fillRect(240, 120, 120, 240);

  // top right
  context.fillStyle = "blue";
  context.fillRect(120, 0, 240, 120);

  // top left
  context.fillStyle = "green";
  context.fillRect(0, 0, 120, 240);

  // center
  context.fillStyle = "red";
  context.fillRect(120, 120, 120, 120);
  context.stroke();
}
