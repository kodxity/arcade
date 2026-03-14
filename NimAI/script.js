let turn = 0;
var piles = [];
let startingval = 100;
let currval = startingval;

let result = 0;

const settingsopen = document.getElementById("settings");
const settings_container = document.getElementById("modal_settings");
const settingsclose = document.getElementById("settingsclose");

settingsopen.addEventListener('click', () => {
    settings_container.classList.add('show');
});

settingsclose.addEventListener('click', () => {
    settings_container.classList.remove('show');
});

const infoopen = document.getElementById("info");
const info_container = document.getElementById("modal_info");
const infoclose = document.getElementById("infoclose");

infoopen.addEventListener('click', () => {
    info_container.classList.add('show');
});

infoclose.addEventListener('click', () => {
    info_container.classList.remove('show');
});


const gameboard = document.getElementById("gameboard");

const input = document.getElementById("playermove");
const error = document.getElementById("errormessage");

function validateNumber() {
    const allowedNumbers = [1,2,3,4,5];
    
    const value = parseInt(input.value);
    
    if (!allowedNumbers.includes(value) || currval-value<0) {
        
        error.textContent = "This number is not allowed";
        return 0;
    }
    else{
        
        error.textContent = "";
        return value;
    }
    
}


const playerturn = document.getElementById("playerturn");
const pile = document.getElementById("pile");
pile.textContent = startingval;
playerturn.textContent = "Player "+(turn%2+1);

function move(){
    validnum = validateNumber(); // 0 if bad, >=1 if good
    if(validnum){
        currval -= validnum
        pile.textContent = currval;
        if(turn%2==0){
            console.log("flag")
            addmove(validnum);
        }
        else{
            document.getElementById(`move${turn}`).textContent = validnum;
        }
        if(currval==0){
            result=(turn%2+1);
            pile.textContent = "Player "+result+" Wins!";
            gameboard.classList.add("won");
        }
        turn++;
        playerturn.textContent = "Player "+(turn%2+1);
        
        
    }
}

const record = document.getElementById("record");
record.oldHTML=record.innerHTML;
function addmove(num){
    var tr = document.createElement('tr');
    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    td1.setAttribute("id", `move${turn}`);
    td2.setAttribute("id", `move${turn+1}`);
    td1.innerHTML = num;
    record.appendChild(tr);
}



const restart = document.getElementById("restart");
restart.addEventListener('click', () => {
    pile.textContent = startingval;
    currval=startingval;
    turn = 0;
    record.innerHTML = record.oldHTML;
    gameboard.classList.remove("won");
    playerturn.textContent = "Player "+(turn%2+1);
});