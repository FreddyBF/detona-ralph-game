
const state = {
    /*Variaveis que alteram 
    algum um elemento visual na Tela (Views) */
    view: {
        squares:document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 1000,
        hitPostion: 0,
        result: 0,
        currentTime:60,

    },
    /**chamadas de funçoes que executam alguma acção */
    actions: {
        timerId: setInterval(randomsquare,1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
       clearInterval(state.actions.countDownTimerId);
       clearInterval(state.actions.timerId);
    }
}


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.2;
    audio.play();
}

function randomsquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPostion = randomSquare.id;
}


function addListenerHitBox() {
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPostion){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPostion = null;
                playSound("hit.m4a");
            }
        });
    });
}

/*Pode se chamar de main */
function initialize() {
   addListenerHitBox();
}


initialize();