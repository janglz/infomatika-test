"use strict";
const matchesTimetable = {
    timestamp: , 
    stadium: , 
    team1: , 
    team2: ,
};

const box = document.querySelector('.box')
const hexCollection = document.querySelectorAll('.hex');
const hexArray = Array.prototype.slice.call(hexCollection);  
const numOfHexes = hexArray.length;
let centerHex = Math.floor(numOfHexes / 2); //округляется в меньшую сторону - на случай нечетного количества

const hexSize = 100;
const hexDistance = (numOfHexes - centerHex) / 100 ; //%
let hexStep = 0;

//функция, отвечающая за перелистывание
const moveList = (hexStep) =>  {
    for (let i = 0; i < hexArray.length; i++) {
        let elem = hexCollection[i];
        const infoInHex = elem.querySelector('.info-in-hex');
        const dateInHex = elem.firstElementChild;
        //infoInHex.style.opacity = `0`;
        //dateInHex.style.opacity = `1`;
        infoInHex.classList.remove('visible');
        dateInHex.classList.add('visible');
        
        let x = ((i + hexStep) * 20 - 60) * 6;
        console.log(hexStep + ' ' + hexDistance + ' ' + i + ' ' + x);
        elem.style.transform = `translate(${x*0.9}%,${-x/1.8}%)`;
        if (i == centerHex  - hexStep) {
            elem.style.transform = `scale(1.4) translate(${x}%,${-x/2}%)`;
            //infoInHex.style.opacity = `1`;
            //dateInHex.style.opacity = `0`;
            infoInHex.classList.add('visible');
            dateInHex.classList.remove('visible');
        



        } else if (i > centerHex - hexStep + 1 || i < centerHex - hexStep - 1 ) {
            elem.style.transform = `scale(.7) translate(${x*1.15}%,${-x/1.4}%)`;
        }
        if (i > centerHex - hexStep + 2 || i < centerHex - hexStep - 2 ) {

            //elem.style.opacity = `0`
            elem.classList.remove('visible');
            } else {
            //elem.style.opacity = `1`
            elem.classList.add('visible');
        }
    } 
};

const showInfoInHex = (elem) => {
  const infoInHex = elem.querySelector('.info-in-hex');
  if (infoInHex) infoInHex.classList.add('visible');
};

const hideInfoInHex = (elem) => {
  const infoInHex = elem.querySelector('.info-in-hex');
  if (infoInHex) infoInHex.classList.remove('visible');
};

moveList(0); //стартовый вызов

//функция, вычисляющая шаг
const mouseWheelHandler = (e) => {
  if (e.deltaY > 0) {
    hexStep -= 1;
    if (hexStep <= - (centerHex + 1)) { hexStep = (-centerHex) + 1}
  }
  if (e.deltaY < 0) {
    hexStep += 1;
    if (hexStep > centerHex) { hexStep = centerHex }
  }
  moveList(hexStep);
}

let flag = true;
box.addEventListener('wheel', (e) => {
  let delta = e.deltaY || e.detail || e.wheelDelta;
  if (delta !==0 && flag) { 
    e.preventDefault();
    e.stopPropagation();
    mouseWheelHandler(e); 
  };
  flag = false;
  setTimeout(function(){flag = true}, 1100);
});

for (let num of hexArray) {
  let hexIndex = -(hexArray.indexOf(num) - centerHex );
  num.addEventListener('click', ()=>moveList(hexIndex));
}