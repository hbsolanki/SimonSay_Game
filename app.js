let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let highestScore=0;
let h2=document.querySelector("h2");

document.addEventListener("keypress",()=>{
    if(started==false){
        console.log("Game is Started");
        started=true;

        levelUp();
    }
})

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>{
        btn.classList.remove("userflash");
    },250)
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerHTML=`<b>Highest Score ${highestScore}</b> <br>Level ${level}`;

    //random btn choose
    let randomIdx=Math.floor(Math.random()*3);
    let randomColor=btns[randomIdx];
    let randombtn=document.querySelector(`.${randomColor}`);
    // console.log(randomIdx);
    // console.log(randomColor);
    // console.log(randombtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randombtn);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000)
        }
    }else{
        h2.innerHTML=`Game Over! your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="white";

        },150)
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtn=document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click",btnPress);
}

function reset(){
    if(level>highestScore){
        highestScore=level;
        console.log(highestScore);
    }
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}