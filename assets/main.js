const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const patterns = [
  "patterns/orange_red_grid.png",
  "patterns/pink_sakura.png"
]

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

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(patterns.length));
}

function draw(clear) {
  let state = window.location.search.substr("?state=".length);
  let images = clear ? [] : window.atob(state).split("|");

  // bottom left
  let img_bl = new Image();
  img_bl.src = images[0] || patterns[getRandomInt()];
  img_bl.onload = function() {
    let pattern = context.createPattern(img_bl, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 240, 240, 120);
  }

  // bottom right
  let img_br = new Image();
  img_br.src = images[1] || patterns[getRandomInt()];
  img_br.onload = function() {
    let pattern = context.createPattern(img_br, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(240, 120, 120, 240);
  }

  // top right
  let img_tr = new Image();
  img_tr.src = images[2] || patterns[getRandomInt()];
  img_tr.onload = function() {
    let pattern = context.createPattern(img_tr, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(120, 0, 240, 120);
  }

  // top left
  let img_tl = new Image();
  img_tl.src = images[3] || patterns[getRandomInt()];
  img_tl.onload = function() {
    let pattern = context.createPattern(img_tl, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, 120, 240);
  }

  // center
  let img_c = new Image();
  img_c.src = images[4] || patterns[getRandomInt()];
  img_c.onload = function() {
    let pattern = context.createPattern(img_c, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(120, 120, 120, 120);
  }

  let img_state = `${img_bl.src}|${img_br.src}|${img_tr.src}|${img_tl.src}|${img_c.src}`;
  let base64_img_state = window.btoa(img_state);

  // don't push a state if it is already the one being loaded
  if (state != base64_img_state) {
    window.history.pushState({ state: base64_img_state }, document.title, `?state=${base64_img_state}`);
  }
}

window.onpopstate = function(event) {
  if (event.state != null) {
    let state = event.state.state;
    history.replaceState({ state: state }, document.title, `?state=${state}`);
  }
  draw();
};
