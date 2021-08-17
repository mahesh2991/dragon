'use strict'
var score = 0;
var cross = true
var audio = new Audio('super-mario.mp3');
var audiogo = new Audio('gameover-new.mp3');
setTimeout(() => {
    audio.play()
    audio.loop = true;
}, 1000);
document.onkeydown = function(e) {
    console.log('key code :', e.keyCode);
    if (e.keyCode == 38) {
        var dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 1000);

    }
    // if (e.keyCode == 39) {
    //     dino = document.querySelector('.dino');
    //     dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    //     dino.style.left = dinoX + 112 + 'px';
    // }
    // if (e.keyCode == 37) {
    //     dino = document.querySelector('.dino');
    //     dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    //     dino.style.left = (dinoX - 112) + 'px';
    // }

    if (e.keyCode == 39) {
        dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }

}
setInterval(() => {
    var dino = document.querySelector('.dino');
    var obstacle = document.querySelector('.obstacle');
    var dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    var dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    var ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    var oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    var offsetX = Math.abs(dx - ox);
    var offsetY = Math.abs(dy - oy);
    let btn = document.querySelector('.btn');

    let startbtn = document.querySelector('#startbtn');
    let stopbtn = document.querySelector('#stopbtn');
    let playbtn = document.querySelector('#playbtn');
    let pausebtn = document.querySelector('#pausebtn');

    startbtn.onclick = () => {
        obstacle.style.animationPlayState = 'running';
        // stoptbtn.innerHTML = 'PLAY'
    }
    stopbtn.onclick = () => {
        obstacle.style.animationPlayState = 'paused';
        stopbtn.innerHTML = 'PAUSE'
    }

    playbtn.onclick = () => {
        if (audio.paused) {
            audio.play();
            playbtn.innerHTML = 'VOL ON'
                // playbtn.innerHTML = "<img src=./unmute1.png\' width=\'2px\' height=\'2px\'>";
        } else {
            audio.pause();
            playbtn.innerHTML = 'VOL OFF'
        }

    }


    if (offsetX < 150 && offsetY < 150) {
        document.getElementsByClassName("popup")[0].classList.add("active");
        document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
            location.reload(true);
            document.getElementsByClassName("popup")[0].classList.remove("active");
        });
        if (score < 50) {
            let text = document.querySelector('#h1tag');
            text.innerHTML = `<h1 style="color: red;">Game Over</h1>`
        }
        let game = document.querySelector('.description');
        game.innerHTML = `<h2>${score}</h2>`
        game.style.visibility = 'visible';
        audiogo.play();
        setInterval(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        let scorebox = document.querySelector('.scorebox');
        scorebox.style.visibility = 'hidden';
        obstacle.classList.remove('animateObstacle');
        document.onkeydown = true;
    } else if (offsetX < 145 && cross) {
        score += 10;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true
        }, 1000);


    }
    setTimeout(() => {
        var aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        var newDur = aniDur - 0.01;
        obstacle.style.animationDuration = newDur + 's';
    }, 500);

    function updateScore(score) {
        updatescore.innerHTML = `Your Score:${score}`;
    }
}, 200);