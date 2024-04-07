document.getElementById('save-image-btn').addEventListener('click', function () {
  var canvas = document.getElementById('canvas1');
  var link = document.createElement('a');
  link.download = 'my_card.png';
  link.href = canvas.toDataURL();
  link.click();
});

document.getElementById('add-text-btn').addEventListener('click', function () {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  var text = document.getElementById('text-input').value;
  var x = 50;
  var y = 50;
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y);
});

document.getElementById('insert-text-btn').addEventListener('click', function (event) {
  event.preventDefault();
  var textEditor = document.getElementById('text-editor');
  textEditor.style.display = 'block';
  document.addEventListener('click', hideTextEditorOutsideClick);
});

document.getElementById('add-text-btn').addEventListener('click', function () {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  var text = document.getElementById('text-input').value;
  var x = 50;
  var y = 50;
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(text, x, y);
  var textEditor = document.getElementById('text-editor');
  textEditor.style.display = 'none';
});

function drawImageActualSize(canvas, ctx, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var imageAspectRatio = img.width / img.height;
  var canvasAspectRatio = canvas.width / canvas.height;
  var renderWidth, renderHeight, x, y;
  if (imageAspectRatio > canvasAspectRatio) {
    renderWidth = canvas.width;
    renderHeight = renderWidth / imageAspectRatio;
    x = 0;
    y = (canvas.height - renderHeight) / 2;
  } else {
    renderHeight = canvas.height;
    renderWidth = renderHeight * imageAspectRatio;
    y = 0;
    x = (canvas.width - renderWidth) / 2;
  }
  ctx.drawImage(img, x, y, renderWidth, renderHeight);
}

document.getElementById('load-image-btn').addEventListener('click', function () {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  var imageSelector = document.getElementById('image-selector');
  imageSelector.style.opacity = '0';
  imageSelector.style.display = 'block';
  setTimeout(function () {
    imageSelector.style.opacity = '1';
  }, 100);
});

document.getElementById('add-from-file-btn').addEventListener('click', function () {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', function (event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var canvas = document.getElementById('canvas1');
        var ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = function () {
          drawImageActualSize(canvas, ctx, img);
          document.getElementById('save-image-btn').addEventListener('click', function () {
            var link = document.createElement('a');
            link.download = 'my_card.png';
            link.href = canvas.toDataURL();
            link.click();
          });
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  input.click();
});

document.querySelectorAll('.image-option').forEach(function (option) {
  option.addEventListener('click', function () {
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = function () {
      drawImageActualSize(canvas, ctx, img);
    };
    img.src = this.src;
    document.getElementById('image-selector').style.display = 'none';
  });
});

document.getElementById('clear-canvas-btn').addEventListener('click', function () {
  var canvas = document.getElementById('canvas1');
  var ctx = canvas.getContext('2d');
  var particles = [];
  function createParticles(x, y) {
    for (var i = 0; i < 100; i++) {
      particles.push({
        x: x,
        y: y,
        radius: Math.random() * 5,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 5 + 1,
        color: 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')'
      });
    }
  }
  function animateExplosion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (particle) {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed;
      particle.radius *= 0.95;
    });
    particles = particles.filter(function (particle) {
      return particle.radius > 0.1;
    });
    if (particles.length > 0) {
      requestAnimationFrame(animateExplosion);
    }
  }
  createParticles(canvas.width / 2, canvas.height / 2);
  animateExplosion();
});

function playSound() {
  var audio = document.getElementById('audio');
  audio.play();
}

var buttons = document.querySelectorAll('button');
buttons.forEach(function (button) {
  button.addEventListener('click', playSound);
});

function vibrateDevice() {
  if ("vibrate" in navigator) {
    navigator.vibrate(100);
  } else {
    console.log("API вибрации не поддерживается в вашем браузере.");
  }
}

var buttons = document.querySelectorAll('button');
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    vibrateDevice();
  });
});

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var selectedImage = {
  img: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  dragging: false,
  startX: 0,
  startY: 0,
  resizing: false,
  startWidth: 0,
  startHeight: 0
};

function drawImageActualSize(canvas, ctx, img) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var imageAspectRatio = img.width / img.height;
  var canvasAspectRatio = canvas.width / canvas.height;
  var renderWidth, renderHeight, x, y;
  if (imageAspectRatio > canvasAspectRatio) {
    renderWidth = canvas.width;
    renderHeight = renderWidth / imageAspectRatio;
    x = 0;
    y = (canvas.height - renderHeight) / 2;
  } else {
    renderHeight = canvas.height;
    renderWidth = renderHeight * imageAspectRatio;
    y = 0;
    x = (canvas.width - renderWidth) / 2;
  }
  ctx.drawImage(img, x, y, renderWidth, renderHeight);
  selectedImage.img = img;
  selectedImage.x = x;
  selectedImage.y = y;
  selectedImage.width = renderWidth;
  selectedImage.height = renderHeight;
}

document.getElementById('load-image-btn').addEventListener('click', function () {
  var imageSelector = document.getElementById('image-selector');
  imageSelector.style.opacity = '0';
  imageSelector.style.display = 'block';
  setTimeout(function () {
    imageSelector.style.opacity = '1';
  }, 100);
});

document.querySelectorAll('.image-option').forEach(function (option) {
  option.addEventListener('click', function () {
    var img = new Image();
    img.onload = function () {
      drawImageActualSize(canvas, ctx, img);
    };
    img.src = this.src;
    document.getElementById('image-selector').style.display = 'none';
  });
});

canvas.addEventListener('mousedown', function (event) {
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  if (
    mouseX >= selectedImage.x &&
    mouseX <= selectedImage.x + selectedImage.width &&
    mouseY >= selectedImage.y &&
    mouseY <= selectedImage.y + selectedImage.height
  ) {
    selectedImage.dragging = true;
    selectedImage.startX = mouseX - selectedImage.x;
    selectedImage.startY = mouseY - selectedImage.y;
  }
});

canvas.addEventListener('mousemove', function (event) {
  if (selectedImage.dragging) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    selectedImage.x = mouseX - selectedImage.startX;
    selectedImage.y = mouseY - selectedImage.startY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageActualSize(canvas, ctx, selectedImage.img);
  }
});

canvas.addEventListener('mouseup', function (event) {
  selectedImage.dragging = false;
});

canvas.addEventListener('mousedown', function (event) {
  var mouseX = event.clientX - canvas.offsetLeft;
  var mouseY = event.clientY - canvas.offsetTop;
  if (
    mouseX >= selectedImage.x + selectedImage.width - 10 &&
    mouseX <= selectedImage.x + selectedImage.width + 10 &&
    mouseY >= selectedImage.y + selectedImage.height - 10 &&
    mouseY <= selectedImage.y + selectedImage.height + 10
  ) {
    selectedImage.resizing = true;
    selectedImage.startWidth = selectedImage.width;
    selectedImage.startHeight = selectedImage.height;
    selectedImage.startX = mouseX;
    selectedImage.startY = mouseY;
  }
});

canvas.addEventListener('mousemove', function (event) {
  if (selectedImage.resizing) {
    var mouseX = event.clientX - canvas.offsetLeft;
    var mouseY = event.clientY - canvas.offsetTop;
    var dx = mouseX - selectedImage.startX;
    var dy = mouseY - selectedImage.startY;
    selectedImage.width = Math.max(10, selectedImage.startWidth + dx);
    selectedImage.height = Math.max(10, selectedImage.startHeight + dy);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageActualSize(canvas, ctx, selectedImage.img);
  }
});

canvas.addEventListener('mouseup', function (event) {
  selectedImage.resizing = false;
});

document.getElementById('save-image-btn').addEventListener('click', function () {
  var link = document.createElement('a');
  link.download = 'my_card.png';
  link.href = canvas.toDataURL();
  link.click();
});

document.querySelector('.icon-7png').addEventListener('click', function () {
  var imageUrl = 'https://bogidaevamarina.github.io/img/free-icon-in-love-14352240.png';
  var img = new Image();
  img.onload = function () {
    var canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
  img.src = imageUrl;
  var isResizing = false;
  var startWidth = 0;
  var startHeight = 0;
  function startResizing(event) {
    isResizing = true;
    startWidth = event.clientX || event.touches[0].clientX;
    startHeight = event.clientY || event.touches[0].clientY;
  }
  function resizeBackground(event) {
    if (isResizing) {
      var canvas = document.getElementById('canvas1');
      var moveX = (event.clientX || event.touches[0].clientX) - startWidth;
      var moveY = (event.clientY || event.touches[0].clientY) - startHeight;
      canvas.width += moveX;
      canvas.height += moveY;
      startWidth = event.clientX || event.touches[0].clientX;
      startHeight = event.clientY || event.touches[0].clientY;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }
  function stopResizing() {
    isResizing = false;
  }
  canvas.addEventListener('mousedown', startResizing);
  canvas.addEventListener('mousemove', resizeBackground);
  canvas.addEventListener('mouseup', stopResizing);
  canvas.addEventListener('touchstart', startResizing);
  canvas.addEventListener('touchmove', resizeBackground);
  canvas.addEventListener('touchend', stopResizing);
});
