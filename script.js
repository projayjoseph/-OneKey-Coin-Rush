let coins = Number(localStorage.getItem("coins")) || 0;
let power = Number(localStorage.getItem("power")) || 1;
let cost = Number(localStorage.getItem("cost")) || 50;

let achievements = JSON.parse(
    localStorage.getItem("achievements")
) || [];


const coinText = document.getElementById("coins");
const powerText = document.getElementById("power");
const costText = document.getElementById("cost");
const achievementBox = document.getElementById("achievements");


let holding = false;
let holdTimer;


function update() {
    coinText.textContent = coins;
    powerText.textContent = power;
    costText.textContent = cost;

    achievementBox.innerHTML = "";

    achievements.forEach(a => {
        let li = document.createElement("li");
        li.textContent = "🏆 " + a;
        achievementBox.appendChild(li);
    });
}


function save() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("power", power);
    localStorage.setItem("cost", cost);
    localStorage.setItem(
        "achievements",
        JSON.stringify(achievements)
    );
}


function achievement(name) {

    if (!achievements.includes(name)) {
        achievements.push(name);
    }

}


function addCoins() {

    coins += power;

    achievement("First Press");

    if (coins >= 100)
        achievement("100 Coins");

    if (coins >= 1000)
        achievement("Coin Master");

    showCoin("+" + power);

    update();
}


function buyUpgrade() {

    if (coins >= cost) {

        coins -= cost;
        power++;

        cost = Math.floor(cost * 1.8);

        achievement("Upgrader");

        document.getElementById("message")
        .textContent =
        "Upgrade purchased!";

        update();
    }
}


function showCoin(text){

    let c = document.createElement("div");

    c.className="coin";
    c.textContent=text;

    c.style.left =
    Math.random()*window.innerWidth+"px";

    c.style.top="300px";

    document.body.appendChild(c);


    setTimeout(()=>{
        c.remove();
    },1000);
}



document.addEventListener("keydown", e=>{

    if(e.code==="Space" && !holding){

        holding=true;

        holdTimer=setTimeout(()=>{
            buyUpgrade();
        },1000);

    }

});



document.addEventListener("keyup", e=>{

    if(e.code==="Space"){

        clearTimeout(holdTimer);

        if(holding){
            addCoins();
        }

        holding=false;
    }

});



setInterval(save,1000);

update();