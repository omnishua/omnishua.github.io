let gameData = {
  player: {
    level: 1,
    xpGoal: 100,
    elixir: 0,
    gold: 0,
    xp: 0,
  },

  enemies: [
    {
      hp: 100,
      fullHp: 100,
      name: "slime",
      level: 1,
    },
    {
      hp: 175,
      fullHp: 175,
      name: "goblin",
      level: 1,
    },
    {
      hp: 250,
      fullHp: 250,
      name: "orc",
      level: 1,
    },
    {
      hp: 500,
      fullHp: 500,
      name: "troll",
      level: 1,
    },
  ]
};

let player = gameData.player;
let enemies = gameData.enemies;

let updatePlayer = () => {
  let playerLevel = document.getElementById('player-level');
  let xpBar = document.querySelector('.xp-bar span');
  let elixir = document.getElementById('elixir');
  let gold = document.getElementById('gold');

  playerLevel.textContent = player.level;
  xpBar.style.width = player.xp / player.xpGoal * 100 + "%";
  elixir.textContent = player.elixir;
  gold.textContent = player.gold;
}

let updateEnemy = (index) => {
  let hpBar = document.querySelectorAll('.enemy-hp span');
  hpBar[index].style.width = enemies[index].hp / enemies[index].fullHp * 100 + "%";
}

let enemyContainer = document.querySelector('.enemies');
enemies.forEach((enemy, index) => {
  let enemyBox = document.createElement('section');
  enemyBox.className = "enemy";
  enemyBox.innerHTML =
    `
      <section class="stats">
        <p>${enemy.name}</p>
        <p>LVL. <span>${enemy.level}</span></p>
      </section>
      <section class="enemy-hp"><span></span></section>
      <button class="attack">attack</button>
    `;
  enemyContainer.append(enemyBox);

  updateEnemy(index);
  updatePlayer();

  document.querySelectorAll('.attack').forEach((button, index) => {
    button.onclick = () => {
      console.log(enemies[index].name);
      enemies[index].hp = Math.max(0, enemies[index].hp - 10);
      if (enemies[index].hp === 0) {
        button.disabled = true;
        button.textContent = "respawning";
        player.gold = Math.min(999999, player.gold + 10)
        if (player.xp < player.xpGoal) {
          player.xp = Math.min(player.xpGoal, player.xp + 30);
          if (player.xp >= player.xpGoal) {
            player.level += 1;
            player.xpGoal += 10;
            player.xp = 0;
            updatePlayer();
          }
        }
        updatePlayer();
        setTimeout(() => {
          enemies[index].hp = enemies[index].fullHp;
          button.textContent = "attack";
          button.disabled = false;
          updateEnemy(index);
        }, 3000);
      }
      updateEnemy(index);
    }
  });
});

let searchInput = document.getElementById('search');

searchInput.addEventListener('input', (event) => {
  const searchQuery = event.target.value.toLowerCase();

  enemies.forEach((enemy, index) => {
    const enemyElement = document.querySelectorAll('.enemy')[index];
    if (enemy.name.toLowerCase().includes(searchQuery)) {
      enemyElement.style.display = "grid";
    } else {
      enemyElement.style.display = "none";
    }
  });
});