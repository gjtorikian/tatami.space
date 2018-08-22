const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const patterns = [
  "patterns/aztec_tribal_white_blue.png",
  "patterns/fondo_con_mosaico_rojo.png",
  "patterns/orange_red_grid.png",
  "patterns/pink_argyle.png",
  "patterns/pink_sakura.png",
  "patterns/purple_waves.png",
  "patterns/ukiyo_e_hibiscus_tricube.png"
]

context.globalCompositeOperation='destination-over';

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Code courtesy of http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file
function saveCanvas() {
  var image = canvas.toDataURL("image/png");
  // Change MIME type to trick the browser to downlaod the file instead of displaying it
  image = image.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
  // In addition to <a>'s "download" attribute, you can define HTTP-style headers
  image = image.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=tatami.png');
  this.href = image;
}

// Only convert the canvas to Data URL when the user clicks.
document.getElementById('save').addEventListener('click', saveCanvas, false);

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(patterns.length));
}

function draw(clear) {
  let state = window.location.search.substr("?state=".length);
  let images = clear ? [] : window.atob(state).split("|");

  let tatami = function(src, x, y, w, h) {
    let img = new Image();
    img.src = src;
    img.onload = function() {
      let pattern = context.createPattern(img, 'repeat');
      context.fillStyle = pattern;
      context.fillRect(x, y, w, h);

      // context.strokeStyle = "#000000";
      // context.lineWidth   = 1;
      // context.strokeRect(x, y, w, h);
    }
    return
  }

  // bottom left
  let img_bl_src = images[0] || patterns[getRandomInt()];
  tatami(img_bl_src, 0, 240, 240, 120);

  // bottom right
  let img_br_src = images[1] || patterns[getRandomInt()];
  tatami(img_bl_src, 240, 120, 120, 240);

  // top right
  let img_tr_src = images[2] || patterns[getRandomInt()];
  tatami(img_tr_src, 120, 0, 240, 120);

  // top left
  let img_tl_src = images[3] || patterns[getRandomInt()];
  tatami(img_tl_src, 0, 0, 120, 240);

  // center
  let img_c_src = images[4] || patterns[getRandomInt()];
  tatami(img_c_src, 120, 120, 120, 120);

  // frame
  context.strokeStyle = "#000000";
  context.lineWidth   = 5;
  context.strokeRect(0, 0, 360, 360);

  let img_state = `${img_bl_src}|${img_br_src}|${img_tr_src}|${img_tl_src}|${img_c_src}`;
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
