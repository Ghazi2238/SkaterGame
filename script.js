//Bools to handle input

let canJump = false;
let isRunning = false;
let gameStart = false;
const player = document.querySelector('.game-player');
const mountain = document.querySelector('.game-mountains');
const park = document.querySelector('.game-park');
const road = document.querySelector('.game-road');
const stones = document.querySelectorAll('.game-stone');
const images = ['./assets/images/stone-1.png', './assets/images/stone-2.png', './assets/images/stone-3.png'];

document.body.addEventListener('keydown', (e) => {
    if (!gameStart && e.key == ' ')
    {
        startGame(player);
    }
    if(e.key == 'ArrowUp')
    {
        jump(player);
    }
})

function startGame()
{
    mountain.classList.add('game-mountains-move');
    park.classList.add('game-park-move');
    road.classList.add('game-road-move');
    document.querySelector('.game-instructions').classList.add('hide');
    setImage(player, './assets/images/skater/start-roll.gif')
    setTimeout(() => {
        setImage(player, './assets/images/skater/roll.gif');
        canJump = true;
    }, 1650)
    isRunning = true;
    gameStart = true;
    moveStone(stones[0], 17, -7);
    moveStone(stones[1], 23, -7);
    moveStone(stones[2], 10, -7);
    setInterval(() => {
        isRunning && collisionCheck();
    }, 100)
}

function jump()
{
    if(!canJump) return;
    setImage('./assets/images/skater/jump.gif');
    canJump = false;
    setTimeout(() => {
        setImage('./assets/images/skater/roll.gif');
        canJump = true;
    }, 2000)
}

function setImage(link)
{
    player.setAttribute('src', `${link}`);
}

function collisionCheck()
{
    let playerx = player.getBoundingClientRect().left;
    let stonex = getStone(playerx, stones);
    let score = document.querySelector('.game-score>span');
    if(addScore(stonex))
    {
        score.innerText = Number(score.innerHTML) + 1
    }
    if(isColliding(stonex, playerx))
    {
        playerFalling();
        stopGame();
    }
}

function getStone(playerx)
{
    let minDistance = Infinity;
    let minStone = null;

    stones.forEach((e) => {
        let stoneDistance = e.getBoundingClientRect().left - playerx;
        if(stoneDistance < minDistance && stoneDistance > 0)
        {
            minDistance = stoneDistance;
            minStone = e;
        }
    })

    return minDistance;
}

function isColliding(stonex)
{
    return (stonex > 27 && stonex < 33) && player.getAttribute('src') != './assets/images/skater/jump.gif';
}

function addScore(stonex)
{
    return (stonex > 20 && stonex < 23) && player.getAttribute('src') == './assets/images/skater/jump.gif';
}

function playerFalling()
{
    setImage(player, './assets/images/skater/falling.gif')
    setTimeout(() => {
        setImage(player, './assets/images/skater/fallen.png')
    }, 700);
}

function stopGame()
{
    mountain.classList.add('game-stop');
    park.classList.add('game-stop');
    road.classList.add('game-stop');
    canJump = false;
    isRunning = false;
    gameStart = true;
    document.querySelector('.game-over').classList.remove('hide');
    document.body.addEventListener('keydown', (e) => {
        if(e.key == " ") location.reload();
    })
}

function moveStone(stone, start, end)
{
    let coord = start;
    stone.style.left = coord + 'rem';
    setInterval(() => {
        if(isRunning)
        {
            stone.style.left = coord + 'rem';
            coord -= 0.02
            if(coord < end)
            {
                coord = Math.round(((Math.random() * 10) + 25), 0);
                stone.src = images[Math.floor(Math.random() * 3)];
            }
        }
    }, 10)
}

