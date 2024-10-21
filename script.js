let startBtn = document.querySelector('.start');
let resetBtn = document.querySelector('.reset');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');
let one_hunderth_second = document.querySelector('.one_hunderth_second');
let laps = document.querySelector('.laps')
let lapbox = document.querySelector('.lapbox')

let minute_now = 0;
let second_now = 0;
let miliSecond_now = 0;
let inervalID;


function updateTime() {
    if (miliSecond_now == 100) {
        second_now++;
        miliSecond_now = 0;
    }
    if (second_now == 60) {
        minute_now++;
        second_now = 0;
    }
    second.innerHTML = second_now.toString().padStart(2, 0);
    minute.innerHTML = minute_now.toString().padStart(2, 0);

    miliSecond_now++;
    one_hunderth_second.innerHTML = miliSecond_now.toString().padStart(2, 0);
}

function start_watch() {
    inervalID = setInterval(updateTime, 10);
}

function change_value() {
    if (startBtn.innerHTML === "Start") {
        startBtn.innerHTML = "Stop";
        resetBtn.innerHTML = "Lap";
        startBtn.style.cssText = "Background-color: red;";
        resetBtn.style.cssText = "Background-color: blue";
        start_watch();
    } else {
        clearInterval(inervalID)
        startBtn.style.cssText = "Background-color: #1ffb1f;";
        resetBtn.style.cssText = "Background-color: red";
        startBtn.innerHTML = "Start";
        resetBtn.innerHTML = "Reset";
    }
}

let lapcount = 1;
let minute_lap = 0;
let second_lap = 0;
let miliSecond_lap = 0;


function laped() {
    lapbox.classList.add('lapbox_open')
    let min;
    let sec;
    let mili;
    if((miliSecond_now - miliSecond_lap) < 0){
        sec = (second_now - second_lap - 1).toString().padStart(2, 0);
        mili = (100 + (miliSecond_now - miliSecond_lap)).toString().padStart(2, 0);
    }else{
        mili = (miliSecond_now - miliSecond_lap).toString().padStart(2, 0);
        sec = (second_now - second_lap).toString().padStart(2, 0);
    }
    
    if((second_now - second_lap) < 0){
        min = (minute_now - minute_lap -1).toString().padStart(2, 0);
        sec = (60 + parseInt(sec)).toString().padStart(2, 0);
    }else{
        min = (minute_now - minute_lap).toString().padStart(2, 0);
    }
    

    minute_lap = minute_now
    second_lap = second_now
    miliSecond_lap = miliSecond_now
    
    let current_lap = document.createElement('div')
    current_lap.classList.add('lap');
    current_lap.innerHTML = `
    <h3>${lapcount}.</h3>
    <h4>${min}:${sec}:${mili}</h4>
    <h4>${minute.innerHTML}:${second.innerHTML}:${one_hunderth_second.innerHTML}</h4>`
    laps.prepend(current_lap);
    lapcount++;
}

function reset_value() {
    if (resetBtn.innerHTML == "Reset") {
        minute_now = 0;
        second_now = 0;
        miliSecond_now = 0;
        lapcount = 1;
        minute_lap = 0;
        second_lap = 0;
        miliSecond_lap = 0
        lapbox.classList.remove('lapbox_open')
        laps.innerHTML = ""
        second.innerHTML = second_now.toString().padStart(2, 0);
        minute.innerHTML = minute_now.toString().padStart(2, 0);
        one_hunderth_second.innerHTML = miliSecond_now.toString().padStart(2, 0);
        resetBtn.style.cssText = "Background-color: black";
    } else {
        laped();
    }
}