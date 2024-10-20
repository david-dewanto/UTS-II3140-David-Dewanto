var i = 0;
var wordIndex = 0;
var txt = ['Fun Way', 'Free Way', 'Easy Way', 'Interactively'];
var speed = 100;
var cursorSpeed = 400;



function typeWriter() {
  const currentWord = txt[wordIndex];
  
  if (i < currentWord.length) {
    for (let a = 0; a<5; a++){
      document.getElementById("changing-text").innerHTML = currentWord.substring(0, i + 1) + randomCharacter(2) + '<span class="cursor">|</span>';
    }
    document.getElementById("changing-text").innerHTML = currentWord.substring(0, i + 1) + '<span class="cursor">|</span>';
    i++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(() => {
      i = 0;
      wordIndex = (wordIndex + 1) % txt.length;
      typeWriter();
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeWriter();
  setInterval(toggleCursorVisibility, cursorSpeed);
});

function toggleCursorVisibility() {
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
  }
}

function randomCharacter(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

