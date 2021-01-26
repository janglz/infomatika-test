"use strict";

//информация, которая в реальных условиях должна получаться через xml-запрос
const matchesTimetable = [{
    "timestamp": "2022-07-27T18:30:00", 
    "stadium": "Лужники", 
    "team1": "Спартак", 
    "team2": "Цска",
    "url": "https://github.com/janglz"
}, 
{
    "timestamp": "2022-08-03T18:30:00", 
    "stadium": "Олимпийский", 
    "team1": "Локомотив", 
    "team2": "Зенит",
    "url": "https://github.com/janglz/infomatika-test"
},
{
    "timestamp": "2022-08-12T19:00:00", 
    "stadium": "Метеор", 
    "team1": "Пахтакор", 
    "team2": "Ливерпуль",
    "url": "https://github.com/janglz"
},
{
    "timestamp": "2022-08-21T18:00:00", 
    "stadium": "Стадион Им. Ленина", 
    "team1": "К. Роналду", 
    "team2": "Спартак",
    "url": "https://github.com/janglz"
},
{
    "timestamp": "2022-08-25T18:30:00", 
    "stadium": "Стадион Им. Ленина", 
    "team1": "ЦСКА", 
    "team2": "NY Yankees",
    "url": "https://github.com/janglz"
},
{
    "timestamp": "2022-09-02T18:30:00", 
    "stadium": "ВТБ-Арена", 
    "team1": "ЦСКА", 
    "team2": "Крылья Советов",
    "url": "https://github.com/janglz/infomatika-test"
},
{
    "timestamp": "2022-09-05T19:30:00", 
    "stadium": "ВТБ-Арена", 
    "team1": "ЦСКА", 
    "team2": "Крылья Советов",
    "url": "https://google.com"
}
];

const box = document.querySelector('.box')
const hexCollection = document.querySelectorAll('.hex');
const hexArray = Array.prototype.slice.call(hexCollection);  
const numOfHexes = hexArray.length;
const eventListNode = document.querySelectorAll('.event');
let centerHex = Math.floor(numOfHexes / 2); //округляется в меньшую сторону - на случай нечетного количества

//const hexDistance = (numOfHexes - centerHex) / 100 ; //%
let hexStep = 0;

//Массив месяцев
const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
//функция, обрезающая лишний ноль в месяце
const removeFirstZero = (str) => {
    if (str[0] == 0 ) {
        return str.substring(1, 2)
        } else {
        return str;
    }
}
//функция, обрезающая строку > 14 символов
const shortenString = (str) => {
    if (str.length > 14) {
        return str.substring(0, 13) + '...'
        } else {
        return str;
    }
}
//функция, отвечающая за перелистывание
const moveList = (hexStep) =>  {
    for (let i = 0; i < hexArray.length; i++) {
        let elem = hexCollection[i];
        const infoInHex = elem.querySelector('.info-in-hex');
        const dateInHex = elem.firstElementChild;
        infoInHex.classList.remove('visible');
        dateInHex.classList.add('visible');
        
        // Вытягивание инфы из массива в гексы
        //debugger;
        const team_1 = eventListNode[i].querySelector('.team-1');
        const team_2 = eventListNode[i].querySelector('.team-2');
        const stadium = infoInHex.querySelector('.stadium');
        const activeHexDate = infoInHex.querySelector('.date');
        const time = infoInHex.querySelector('.time');
        const href = infoInHex.querySelector('.href-in-hex');
        const timestamp = matchesTimetable[i].timestamp;
        const eventMonth = months[(timestamp.slice(5, 7)-1)];
        const eventDate = removeFirstZero(timestamp.slice(8, 10));

       
        //вставка значений 
       
        time.innerHTML = ``;
        team_1.innerHTML= ``;
        team_2.innerHTML  = ``;
        stadium.innerHTML = ``;
        activeHexDate.innerHTML = ``;
        time.innerHTML = ``;
        href.href = ``;
        dateInHex.innerHTML = `${eventDate}<br>${eventMonth.toLowerCase()}`;
        // Позиционирование гексов
        //let x = ((i + hexStep) * 20 - 60) * 6 ;
        let x = ((i + hexStep) * 20 - 60) * 6 + 60;
        elem.style.transform = `translate(${x / 1.2}%,${-x / 1.6 - 10}%)`;
        if (i == centerHex  - hexStep) {
            elem.style.transform = `scale(1.4) translate(${x / 1.7}%,${-x / 1.8}%)`;
            infoInHex.classList.add('visible');
            dateInHex.classList.remove('visible');
            team_1.innerHTML= `<p>${matchesTimetable[i].team1}</p>`;
            team_2.innerHTML = `<p>${matchesTimetable[i].team2}</p>`;
            stadium.innerHTML = `${shortenString(matchesTimetable[i].stadium)}`;
            activeHexDate.innerHTML = `${eventDate} ${eventMonth}`;
            time.innerHTML = `${timestamp.slice(-8, -3)}`;
            href.href = `${matchesTimetable[i].url}`;
        } else if (i > centerHex - hexStep + 1 || i < centerHex - hexStep - 1 ) {
            elem.style.transform = `scale(.7) translate(${x * 1.1 + 10}%,${-x / 1.25 - 20}%)`;
        }
        if (i > centerHex - hexStep + 2 || i < centerHex - hexStep - 2 ) {
            elem.classList.remove('visible');
            } else {
            elem.classList.add('visible');
        }
    } 
};

moveList(0); //стартовый вызов

//Функция, вычисляющая положение гекса
const mouseWheelHandler = (e) => {
  if (e.deltaY > 0) {
    hexStep -= 1;
    if (hexStep <= - (centerHex )) { hexStep = (-centerHex) + 1}
  }
  if (e.deltaY < 0) {
    hexStep += 1;
    if (hexStep > centerHex) { hexStep = centerHex }
  }
  moveList(hexStep);
}

//Листнеры скролла и нажатия
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

//Свайп
box.addEventListener('touchstart', handleTouchStart, false);        
box.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */ 
            hexStep -=1;
        } else {
            /* right swipe */
            hexStep +=1;
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            hexStep +=1;
        } else { 
            /* down swipe */
            hexStep -=1;
        }                                                                 
    }

    if (hexStep <= - (centerHex )) { hexStep = (-centerHex) + 1};
    if (hexStep > centerHex) { hexStep = centerHex };
    moveList(hexStep);
    /* reset values */
    xDown = null;
    yDown = null;                                             
};