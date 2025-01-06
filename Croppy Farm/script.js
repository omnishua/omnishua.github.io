let player = {
  crops: 0,
  level: 1,
}

let crops = [
  {
    yield: 1,
    name: "wheat",
    cost: 3,
    level: 1,
  },
  {
    yield: 3,
    name: "corn",
    cost: 5,
    level: 1,
  },
];

let playerLevel = document.querySelector('#level');
let playerCrops = document.getElementById('crops');

let playerDisplay = () => {
  playerCrops.textContent = player.crops.toLocaleString();
}

let cropDisplay = (index) => {
  let level = cropBoxes[index].querySelector('.crop-level');
  let cost = cropBoxes[index].querySelector('.cost');

  level.textContent = crops[index].level;
  cost.textContent = crops[index].cost;
}

const generateCrops = (crop, index) => {
  setInterval(() => {
    player.crops += crop.yield;
    playerDisplay();
    cropDisplay(index);
  }, 300);
};

let cropList = document.querySelector('.crops');
let cropBoxes = [];

crops.forEach((crop, index) => {
  let cropBox = document.createElement('section');
  cropBox.className = 'crop';
  cropBox.innerHTML =
    `
      <section class="stats">
        <p>${crop.name}</p>
        <p>lvl. <span class="crop-level">${crop.level}</span></p>
      </section>
      <section class="info">
        <button class="yieldDisplay">crops/s: + <span class="yield">${crop.yield}</yield></button>
        <button class="upgrade">costs/u: - <span class="cost">${crop.cost.toLocaleString()}</span></button>
      </section>
    `;
  cropList.append(cropBox);
  cropBoxes.push(cropBox);
  generateCrops(crop, index);
});

let upgrade = document.querySelectorAll('.upgrade');

upgrade.forEach((button, index) => {
  button.onclick = () => {
    if (player.crops >= crops[index].cost) {
      player.crops -= crops[index].cost;
      crops[index].cost += 10;
      crops[index].level += 1;
      playerDisplay();
      cropDisplay(index);
    };
  }
});