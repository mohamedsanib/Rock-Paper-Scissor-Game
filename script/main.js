const data = {
    playerScore: 0,
    computerScore: 0,
    round: 5
}

let previousMove = "";
function displayResult() {
    let result_image = document.querySelector('.result_image');
    console.log("kl");
    result_image.innerHTML = `<img src="images/lose.png" alt="">`;

}

function showPop() {
    const overlay = document.querySelector('.overlay');
    const pop = document.querySelector('.pop_box');
    overlay.classList.add('js_overlay');
    pop.classList.add('js_pop_box');
    if((data.playerScore)<(data.computerScore)){
        displayResult();
    }
}
function removePop() {
    const overlay = document.querySelector('.overlay');
    const pop = document.querySelector('.pop_box');
    overlay.classList.remove('js_overlay');
    pop.classList.remove('js_pop_box');
}

const exit_btn = document.querySelector('.exit_btn');
exit_btn.addEventListener("click", function () {
    window.location.replace("index.html");
});
const retry_btn = document.querySelector('.retry_btn');
retry_btn.addEventListener("click", function () {
    window.location.reload();
});

function generateCmMove() {
    let random = Math.random();
    if (random < 1 / 3) {
        return "rock";
    }
    else if (random >= 1 / 3 && random < 2 / 3) {
        return "paper";
    }
    else {
        return "scissor";
    }
}

function compareMove(cm, plyr) {
    let result;
    if(cm == plyr){
        return "tie"
    }
    if (plyr == "rock") {
        if (cm == "scissor") {
            result = "win";
        }
        else {
            result = "lose";
        }
    }
    else if (plyr == "paper") {
        if (cm == "rock") {
            result = "win";
        }
        else {
            result = "lose";
        }
    }
    else {
        if (cm == "paper") {
            result = "win";
        }
        else {
            result = "lose";
        }
    }
    return result;
}

function displayMove(cmMove, plyrMove) {
    let p_img = plyrMove[0].toUpperCase() + plyrMove.slice(1);
    let c_img = cmMove[0].toUpperCase() + cmMove.slice(1);

    let before_play_view = document.querySelector('.before_play');
    before_play_view.classList.add('js_before_play');

    let plyr_move_disply = document.querySelector('.plyr_move_disply');
    plyr_move_disply.innerHTML = ` <img src="images/${p_img}.png" alt="">`;
    let cmp_move_disply = document.querySelector('.cmp_move_disply');
    cmp_move_disply.innerHTML = ` <img src="images/${c_img}.png" alt="">`;

    let playing_bar_view = document.querySelector('.playing_bar');
    playing_bar_view.classList.add('js_playing_bar');

}
function displayUpdates(result) {
    let round_bar = document.querySelector('.round_bar');
    round_bar.innerText = `Round ${data.round}`;

    let plyr_score_box = document.querySelector('.plyr_score_box');
    plyr_score_box.innerHTML = ` score : ${data.playerScore} <br>
    (Player)`;

    let cmptr_score_box = document.querySelector('.cmptr_score_box');
    cmptr_score_box.innerHTML = ` score : ${data.computerScore} <br>
    (System)`;

    let result_bar = document.querySelector('.result_bar');
    if (result == "win") {
        result_bar.innerText = "You Scored";
    }
    else if(result == "tie"){
        result_bar.innerText = "tie";
    }
    else {
        result_bar.innerText = "System Scored";
    }
}


function RunGame(plyrMove) {
    if (data.round <= 0) {
        showPop()
        return;
    }
    let cmMove = generateCmMove();
    while (cmMove == previousMove) {
        cmMove = generateCmMove();
    }
    displayMove(cmMove, plyrMove);
    let moveResult = compareMove(cmMove, plyrMove);
    previousMove = cmMove;
    if (moveResult == "win") {
        data.playerScore++;
        data.round--;
    }
    else if(moveResult == "lose"){
        data.computerScore++;
        data.round--;
    }
    displayUpdates(moveResult);
    if (data.round == 0) {
        showPop();
        return;
    }
}



