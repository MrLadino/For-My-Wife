function startFlower() {
  document.body.style.background = "black";
  document.querySelector("button").style.display = "none";

  const canvas = document.getElementById("flowerCanvas");
  const ctx = canvas.getContext("2d");
  canvas.style.display = "block";

  let animationFrame = 0;
  const flowerCenters = [
    { x: 250, y: 500 },
    { x: 450, y: 500 },
    { x: 650, y: 500 }
  ];

  const flowers = flowerCenters.map(pos => ({
    ...pos,
    petals: [],
    state: 0,
    height: 0
  }));

  function drawStem(x, y, h) {
    ctx.strokeStyle = "#228B22";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - h);
    ctx.stroke();
  }

  function drawPetal(x, y, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = "#9b30ff";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(15, -40, 0, -60);
    ctx.quadraticCurveTo(-15, -40, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawCore(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffccff";
    ctx.fill();
  }

  function animateGarden() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let flower of flowers) {
      if (flower.state === 0) {
        flower.height += 3;
        drawStem(flower.x, flower.y, flower.height);
        if (flower.height >= 150) flower.state = 1;
      } else if (flower.state === 1) {
        drawStem(flower.x, flower.y, 150);
        flower.state = 2;
      } else if (flower.state === 2 && flower.petals.length < 12) {
        drawStem(flower.x, flower.y, 150);
        const angle = (Math.PI * 2 * flower.petals.length) / 12;
        flower.petals.push(angle);
        for (let a of flower.petals) {
          drawPetal(flower.x, flower.y - 150, a);
        }
      } else {
        drawStem(flower.x, flower.y, 150);
        for (let a of flower.petals) {
          drawPetal(flower.x, flower.y - 150, a);
        }
        drawCore(flower.x, flower.y - 150);
      }
    }

    animationFrame++;
    if (animationFrame <= 150) {
      requestAnimationFrame(animateGarden);
    } else {
      document.getElementById("loveMessage").style.opacity = 1;
      document.getElementById("topText").style.opacity = 1;
    }
  }

  animateGarden();
}
