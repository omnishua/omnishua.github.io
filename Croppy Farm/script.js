let player = {
  previousGoal: 3,
  crops: 0,
  level: 1,
  xpGoal: 3,
  xp: 0,
}

let crops = [
  {
    yield: 1,
    name: "berry",
    requiredLevel: 1,
    cost: 3,
    level: 1,
  },
  {
    yield: 2,
    name: "pepper",
    requiredLevel: 3,
    cost: 5,
    level: 1,
  },
  {
    yield: 3,
    name: "turnip",
    requiredLevel: 5,
    cost: 10,
    level: 1,
  },
  {
    yield: 4,
    name: "cucumber",
    requiredLevel: 10,
    cost: 20,
    level: 1,
  },
  {
    yield: 5,
    name: "tomato",
    requiredLevel: 15,
    cost: 30,
    level: 1,
  },
  {
    yield: 6,
    name: "potato",
    requiredLevel: 20,
    cost: 40,
    level: 1,
  },
  {
    yield: 7,
    name: "onion",
    requiredLevel: 25,
    cost: 50,
    level: 1,
  },
  {
    yield: 8,
    name: "eggplant",
    requiredLevel: 30,
    cost: 60,
    level: 1,
  },
  {
    yield: 9,
    name: "spinach",
    requiredLevel: 40,
    cost: 70,
    level: 1,
  },
  {
    yield: 10,
    name: "corn",
    requiredLevel: 50,
    cost: 80,
    level: 1,
  },
  {
    yield: 11,
    name: "carrot",
    requiredLevel: 60,
    cost: 90,
    level: 1,
  },
  {
    yield: 13,
    name: "cabbage",
    requiredLevel: 70,
    cost: 100,
    level: 1,
  },
  {
    yield: 13,
    name: "pumpkin",
    requiredLevel: 80,
    cost: 110,
    level: 1,
  },
  {
    yield: 14,
    name: "pineapple",
    requiredLevel: 100,
    cost: 110,
    level: 1,
  },
];

let playerLevel = document.querySelector('#level');
let playerCrops = document.getElementById('crops');
let xpBar = document.querySelector('.xp');

let playerDisplay = () => {
  playerCrops.textContent = Math.min(999999999999, player.crops).toLocaleString();
  playerLevel.textContent = Math.min(99, player.level);
  xpBar.style.width = player.xp / player.xpGoal * 100 + "%";
}

let isGenerating = false;

const generateCrops = (crop, index) => {
  if (!isGenerating) {
    isGenerating = true;
    setInterval(() => {
      player.xp += 1;
      let profitPerSecond;
      crops.forEach((crop, index) => {
        if (player.level >= crop.requiredLevel) {
          player.crops += crop.yield;
        }
      });
      setTimeout(() => {
        if (player.xp == player.xpGoal) {
          player.xp = 0;
          player.level += 1;
          player.previousGoal = player.xpGoal;
          player.xpGoal = Math.ceil(player.level / 0.5);
        }
      }, 0);
      displayProfit();
      playerDisplay();
      displayCrops();
      saveGame();
    }, 1000);
  }
};

let cropList = document.querySelector('.crops');

const displayCrops = () => {
  cropList.innerHTML = "";
  let unlockedCrops = crops.filter(crop => player.level >= crop.requiredLevel);
  unlockedCrops.forEach((crop, index) => {
    let cropBox = document.createElement('section');
    cropBox.className = 'crop';
    cropBox.innerHTML =
      `
        <section class="stats">
          <p>${crop.name}</p>
          <p>lvl. <span class="crop-level">${crop.level}</span></p>
        </section>
        <section class="info">
          <button class="yieldDisplay">crops/s: + <span class="yield">${crop.yield.toLocaleString()}</yield></button>
          <button class="upgrade">costs/u: - <span class="cost">${crop.cost.toLocaleString()}</span></button>
        </section>
      `;
    cropList.append(cropBox);
    generateCrops(crop, index);

    document.querySelectorAll('.upgrade').forEach((button, index) => {
      button.onclick = () => {
        if (player.crops >= crops[index].cost && crops[index].level < 99) {
          player.crops -= crops[index].cost;
          crops[index].yield = Math.ceil(crops[index].yield * 1.2);
          crops[index].cost = Math.floor(crops[index].cost * 1.5);
          crops[index].level = Math.min(99, crops[index].level + 1);
          displayProfit();
          playerDisplay();
          displayCrops();
        } else {
          button.textContent = "max";
          button.disabled = true;
        }
      }
    });
  });
}

const cropsPerSecond = () => {
  let cps = crops.reduce((total, crop) => {
    if (player.level >= crop.requiredLevel) {
      return total + crop.yield;
    }
    return total;
  }, 0);
  return cps;
}

const displayProfit = () => {
  document.querySelector('.cps').textContent = `${cropsPerSecond()}`
}

const saveGame = () => {
  localStorage.setItem('croppyFarmData', JSON.stringify({ player, crops }));
}

const loadGame = () => {
  let savedData = JSON.parse(localStorage.getItem('croppyFarmData')) || {};
  if (savedData) {
    Object.assign(player, savedData.player || {});
    crops = savedData.crops || crops;

    playerDisplay();
    displayCrops();
  } else {
    localStorage.removeItem('croppyFarmData', JSON.stringify({ player, crops }));
    window.reload();
  }
}

loadGame();