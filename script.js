function promiseAfterTimeout(seconds) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), seconds * 1000);
    });
}

function rotateWheel(degr) {
    let wheel = document.querySelector('.wheel');
    wheel.style.transition = 'transform 1s ease-out'; // Зменшуємо час обертання
    wheel.style.transform = 'rotate(' + degr + 'deg)';
    return promiseAfterTimeout(1); // Зменшуємо час обертання
}

function randomDegrees() {
    let randomFloat = Math.random() * 360;
    let descreetDegrees = Math.round(randomFloat / 60) * 60;
    return descreetDegrees;
}

function getCurrentColor(currentDegrees) {
    let colors = ["green", "red", "orange", "cyan", "yellow", "blue"];
    let segmentCount = parseInt(currentDegrees / 60);
    let segmentShift = segmentCount % colors.length;

    return colors[segmentShift];
}

function launchSpin() {
    const extraRotations = 5 * 360; // П'ять повних обертів
    currentRotation += extraRotations + randomDegrees();

    rotateWheel(currentRotation)
        .then(() => {
            let wheel = document.querySelector('.wheel-container');
            wheel.style.display = 'none';

            if (spinCount % 2 === 0) {
                document.getElementById('popup1').classList.add('visible');
                document.getElementById('popup1').classList.remove('hidden');
            } else {
                document.getElementById('popup2').classList.add('visible');
                document.getElementById('popup2').classList.remove('hidden');
            }
            spinCount++;
        });
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.remove('visible');
    document.getElementById(popupId).classList.add('hidden');

    let wheel = document.querySelector('.wheel-container');
    wheel.style.display = 'block';
}

let currentRotation = 0;
let spinCount = 0;
let spinButton = document.querySelector('.spin');
spinButton.addEventListener('click', launchSpin);

document.querySelector('#popup1 .close-btn').addEventListener('click', () => closePopup('popup1'));
document.querySelector('#popup2 .close-btn').addEventListener('click', () => closePopup('popup2')); 
 
 
 
 
// Т А Й М Е Р   
 
function startCountdownBack() {
   
    var minutesElement = document.getElementById('minutes');
    var secondsElement = document.getElementById('seconds');

   
    var initialTime = moment.duration({ minutes: 5, seconds: 25 });

  
    var timer = setInterval(function() {
       
        initialTime.subtract(1, 'seconds');

        
        minutesElement.innerText = initialTime.minutes();
        secondsElement.innerText = initialTime.seconds();

       
        if (initialTime.asSeconds() <= 0) {
            clearInterval(timer);
        }
    }, 1000); 
}


function checkPopupVisibility() {
   
    var popup = document.querySelector('.popup.popup-2');

    
    if (popup && popup.classList.contains('popup') && popup.classList.contains('popup-2') && popup.classList.contains('visible')) {
       
        startCountdownBack();
    }
}


var observer = new MutationObserver(checkPopupVisibility);


var targetNode = document.querySelector('.popup.popup-2');
if (targetNode) {
    observer.observe(targetNode, { attributes: true, attributeFilter: ['class'] });
}
