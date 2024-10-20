var wordIndex = 0;
var firstWord = false;
var txt1 = ["The ", 'At ', 'For ', 'At ', 'From ']
var txt2 = ['Fun Way','Your Own Pace','Free', 'Anytime', 'Anywhere'];
var speed = 75;
var cursorSpeed = 300;

async function typeWriter() {
  const currentWord1 = txt1[wordIndex];
  const currentWord2 = txt2[wordIndex];

  console.log(currentWord1.length);

  for (let i = 0; i < currentWord1.length; i++) {
    for (let a = 0; a<3; a++){
      document.getElementById("changing-text1").innerHTML = currentWord1.substring(0, i) + randomCharacter(1) + '<span class="cursor">|</span>';
      await sleep(speed/1.3);
    }
    console.log(currentWord1.substring(0, i));
    document.getElementById("changing-text1").innerHTML = currentWord1.substring(0, i + 1);
  }
  
  for (let i = 0; i < currentWord2.length; i++) {
    for (let a = 0; a<3; a++){
      document.getElementById("changing-text2").innerHTML = currentWord2.substring(0, i) + randomCharacter(1) + '<span class="cursor">|</span>';
      await sleep(speed);
    }
    document.getElementById("changing-text2").innerHTML = currentWord2.substring(0, i+1) + '<span class="cursor">|</span>';
  }

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % txt2.length;
    document.getElementById("changing-text1").innerHTML = '';
    document.getElementById("changing-text2").innerHTML = '';
    typeWriter();
  }, 3250);
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

function sleep(delay){
  return new Promise((resolve) => setTimeout(resolve, delay))
}
