const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const patterns = [
  "aztec_tribal_white_blue",
  "bananas",
  "blue_hair",
  "colorful_floral",
  "indian_flower",
  "maneki_neko",
  "orange_red_grid",
  "pink_argyle",
  "pink_sakura",
  "seamless_argyle",
  "orange_zaps",
  "tropical_floral",
  "ukiyo_e_hibiscus_tricube",
  "weave"
];

context.globalCompositeOperation = "destination-over";

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Code courtesy of http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file
function saveCanvas() {
  var image = canvas.toDataURL("image/png");
  // Change MIME type to trick the browser to download the file instead of displaying it
  image = image.replace(/^data:image\/[^;]*/, "data:application/octet-stream");
  // In addition to <a>'s "download" attribute, you can define HTTP-style headers
  image = image.replace(
    /^data:application\/octet-stream/,
    "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=tatami"
  );
  this.href = image;
}

// Only convert the canvas to Data URL when the user clicks.
document.getElementById("save").addEventListener("click", saveCanvas, false);

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(patterns.length));
}

function makeImageSrc(image) {
  return `patterns/${image}.png`;
}

function encode(string) {
  return window.btoa(string);
}

function decode(string) {
  return window.atob(string).split("|");
}

function draw(clear) {
  let state = window.location.search.substr("?state=".length);
  // force refresh from Generate New button
  let images = clear ? [] : decode(state);

  let tatami = function(src, x, y, w, h) {
    let img = new Image();
    img.src = makeImageSrc(src);
    img.onload = function() {
      let pattern = context.createPattern(img, "repeat");
      context.fillStyle = pattern;
      context.fillRect(x, y, w, h);

      // context.strokeStyle = "#000000";
      // context.lineWidth = 1;
      // context.strokeRect(x, y, w, h);
    };
    return;
  };

  // bottom left
  let imgBLSrc = images[0] || patterns[getRandomInt()];
  tatami(imgBLSrc, 0, 240, 240, 120);

  // bottom right
  let imgBRSrc = images[1] || patterns[getRandomInt()];
  tatami(imgBLSrc, 240, 120, 120, 240);

  // top right
  let imgTRSrc = images[2] || patterns[getRandomInt()];
  tatami(imgTRSrc, 120, 0, 240, 120);

  // top left
  let imgTLSrc = images[3] || patterns[getRandomInt()];
  tatami(imgTLSrc, 0, 0, 120, 240);

  // center
  let imgCTSrc = images[4] || patterns[getRandomInt()];
  tatami(imgCTSrc, 120, 120, 120, 120);

  // frame
  context.strokeStyle = "#000000";
  context.lineWidth = 5;
  context.strokeRect(0, 0, 360, 360);

  let img_state = `${imgBLSrc}|${imgBRSrc}|${imgTRSrc}|${imgTLSrc}|${imgCTSrc}`;
  let encoded_img_state = encode(img_state);

  // don't push a state if it is already the one being loaded
  if (state != encoded_img_state) {
    window.history.pushState(
      { state: encoded_img_state },
      document.title,
      `?state=${encoded_img_state}`
    );
  }
}

window.onpopstate = function(event) {
  if (event.state != null) {
    let state = event.state.state;
    history.replaceState({ state: state }, document.title, `?state=${state}`);
  }
  draw();
};
