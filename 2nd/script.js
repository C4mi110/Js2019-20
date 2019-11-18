let channel1Start;
let channel2Start;
let channel3Start;
let channel4Start;

const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];

const sounds = {
    KeyA: '#boom',
    KeyS: '#clap',
    KeyD: '#snare',
    KeyF: '#kick',
    KeyG: '#openhat',
    KeyH: '#ride',
};

window.onload= function (){

document.body.addEventListener('keypress', onKeyPress);

document.querySelector('#channel1Rec').addEventListener('click', btnChannel1Click);
document.querySelector("#channel1Play").addEventListener("click",playChannel(channel1));
document.querySelector('#channel2Rec').addEventListener('click', btnChannel2Click);
document.querySelector("#channel2Play").addEventListener("click",playChannel(channel2));
document.querySelector('#channel3Rec').addEventListener('click', btnChannel3Click);
document.querySelector("#channel3Play").addEventListener("click",playChannel(channel3));
document.querySelector('#channel4Rec').addEventListener('click', btnChannel4Click);
document.querySelector("#channel4Play").addEventListener("click",playChannel(channel4));
document.querySelector("#playAll").addEventListener("click",playAll);

let channel1radio = document.querySelector("#channel1");
let channel2radio = document.querySelector("#channel2");
let channel3radio = document.querySelector("#channel3");
let channel4radio = document.querySelector("#channel4");

const divs = ["channel1div", "channel2div", "channel3div", "channel4div"]
const channels = document.querySelectorAll(".channels input");
channels.forEach((input, index) => {
    input.addEventListener("click", function() {
        document.querySelector("#"+divs[index]).classList.remove("hidden");
        for(var i=0; i<channels.length; i++)
            if (i!=index) document.querySelector("#"+divs[i]).classList.add("hidden");
    });
});




function playChannel(channel){
    channel.forEach((el) => {
        setTimeout(() => {
            playSound(sounds[el.sound]);
        }, el.time);
    });
};

function playAll(){
    playChannel1();
    playChannel2();
    playChannel3();
    playChannel4();
};

function onKeyPress(e) {
    playSound(sounds[e.code]);
    let timeStart;
    if (channel1radio.checked == true) timeStart = channel1Start;
    if (channel2radio.checked == true) timeStart = channel2Start;
    if (channel3radio.checked == true) timeStart = channel3Start;
    if (channel4radio.checked == true) timeStart = channel4Start;

    const time = Date.now() - timeStart;
    const sound = {
        sound: e.code,
        time: time
    }

    if (channel1radio.checked == true) channel1.push(sound);
    if (channel2radio.checked == true) channel2.push(sound);
    if (channel3radio.checked == true) channel3.push(sound);
    if (channel4radio.checked == true) channel4.push(sound);
};

function playSound(id) {
    const audioTag = document.querySelector(id);
    audioTag.currentTime = 0;
    audioTag.play();
};

function btnChannel1Click() {
    channel1Start = Date.now();
    //channel1.length=0; //clear array
};
function btnChannel2Click() {
    channel2Start = Date.now();
};
function btnChannel3Click() {
    channel3Start = Date.now();
};
function btnChannel4Click() {
    channel4Start = Date.now();
};

}