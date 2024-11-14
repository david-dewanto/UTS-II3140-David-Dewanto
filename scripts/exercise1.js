import { backendURL } from "./url.js";

let activePart;
let activeSubpart;
let maxPart = 4;
let maxActivePart;
let maxActiveSubpart;
let activeModule;
let thisModule = 1;

async function initializeExercise() {
  try {
    const initialDataResponse = await getUserProgress();

    if (initialDataResponse?.progress) {
      activePart = initialDataResponse.progress.part;
      activeSubpart = initialDataResponse.progress.subpart;
      activeModule = initialDataResponse.progress.module;
      if (activeModule > thisModule) {
        activePart = 4;
        activeSubpart = 3;
      }
      maxActivePart = activePart;
      maxActiveSubpart = activeSubpart;
    }
  } catch (error) {
    console.error("Error initializing exercise:", error);
  }
}

const content = {
  // Module 1: Introduction
  "1_1": {
    header: "Hi 👋, A Warm Welcome to PyCademy!",
    text: "Nice to meet you 😄, before we start our journey on learning Python, we are going to do a couple of things. <br /><br />Please follow the instruction in this first part, if you have done any of the tutorial, you can go right through the next one. Happy Learning 🥳",
    type: "text-only",
  },
  "1_2": {
    header: "First Setup 1️⃣",
    text: "You need to install Python so you can try to run your code on your Computer. <br/><br/> You could try to see this <a href='https://www.digitalocean.com/community/tutorials/install-python-windows-10' style='background-color:rgb(218, 218, 218);'>link</a> to download Python.",
    type: "text-only",
  },
  "1_3": {
    header: "Getting Started 🚀",
    text: "Before starting, a little tips is that you can try to hover on text that has this kind of <mark>highlight<span class='tooltip-text'>You can hover highlited text and find some quick definition / hints!</span></mark>",
    type: "text-only",
  },

  // Module 2: Input/Output
  "2_1": {
    header: "First Thing in Mind, I/O",
    text: 'I/O stands for Input/Output, so as the name stands we will learn about the <mark>input<span class="tooltip-text">A way for a program to receive inputs from user</span></mark> and <mark>output<span class="tooltip-text">A way to deliver a result to the user</span></mark> <br/> <br/>There is many ways to output a program, but we will only learn <mark>print syntax<span class="tooltip-text">print("Hello World")</span></mark>. For inputs, we will be using the <mark>input syntax<span class="tooltip-text">S = input("Masukkan kalimat:")</span></mark>',
    type: "text-only",
  },
  "2_2": {
    header: "Now let's try out first exercise!",
    type: "drag-and-drop",
    code1: 'S = input("First Line Input, S as a String") #1',
    code2: 'A = int(input("Second Line Input, S as a Integer")) #2',
    code3: 'print("First Line Output") #3',
    code4: 'print("A added by 5 Equals to" + str(A+5)) #4',
  },
  "2_3": {
    header: "Well Done ! 🥳",
    type: "text-only",
    text: "You finished your first exercise at PyCademy! </br> </br> More things are coming your way :)",
  },

  // Module 3: Variables and Data Types
  "3_1": {
    header: "Variables and Data Types in Python 📝",
    text: 'In Python, we have several basic <mark>data types<span class="tooltip-text">Different types of data that can be stored in variables</span></mark>: <br/><br/> • <mark>int<span class="tooltip-text">Whole numbers like 1, 2, 3</span></mark> <br/> • <mark>float<span class="tooltip-text">Decimal numbers like 1.5, 2.7</span></mark> <br/> • <mark>str<span class="tooltip-text">Text data like "Hello"</span></mark> <br/> • <mark>bool<span class="tooltip-text">True or False values</span></mark>',
    type: "text-only",
  },
  "3_2": {
    header: "Let's Practice Variables!",
    type: "drag-and-drop",
    code1: 'name = "John" #1',
    code2: "age = 25 #2",
    code3: "height = 1.75 #3",
    code4: 'print(f"Name: {name}, Age: {age}, Height: {height}m") #4',
  },
  "3_3": {
    header: "Excellent Progress! 🌟",
    type: "text-only",
    text: "You've learned about different data types and how to use variables in Python! </br> </br> Let's move on to more exciting topics!",
  },

  // Module 4: Basic Operations
  "4_1": {
    header: "Basic Operations in Python ➕",
    text: 'Python supports various <mark>arithmetic operations<span class="tooltip-text">Mathematical operations like +, -, *, /</span></mark> and <mark>comparison operations<span class="tooltip-text">Operations that compare values like >, <, ==</span></mark>. <br/><br/> You can perform calculations and compare values easily!',
    type: "text-only",
  },
  "4_2": {
    header: "Try These Operations!",
    type: "drag-and-drop",
    code1: "x = 10 #1",
    code2: "y = 5 #2",
    code3: 'print(f"Sum: {x + y}, Product: {x * y}") #3',
    code4: 'print(f"Is x greater? {x > y}") #4',
  },
  "4_3": {
    header: "Great Job! 🎉",
    type: "text-only",
    text: "You now understand basic operations in Python! </br> </br> You're making excellent progress in your Python journey!",
  },
  "loader":{
    type: "loader"
  }
};

function setActivePart() {
  const allStep = document.querySelectorAll(`.step`);
  for (const element of allStep) {
    element.classList.remove("active");
  }
  allStep[activePart - 1].classList.add("active");
}

function autoArrangeDragAndDrop() {
  const codeBlocks = document.querySelectorAll('.code-block');
  const dropArea = document.querySelector('.droppable-area');
  
  if (!dropArea || !codeBlocks.length) return;
  
  const sortedBlocks = Array.from(codeBlocks).sort((a, b) => {
    return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'));
  });
  
  sortedBlocks.forEach(block => {
    dropArea.appendChild(block);
  });
}

function setContent(contentData) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  let finalhtml = "";

  if (contentData.type === "loader") {
    finalhtml = `
    <div class="ui segment">
      <div class="ui active inverted dimmer">
        <div class="ui text loader" style="background-color : rgb(218, 218, 218);">Loading</div>
      </div>
    <p></p>
    </div>
    `;
    container.innerHTML = finalhtml;
    return;
  }

  if (contentData.type === "text-only") {
    finalhtml = `
      <article class="course-title">
        <h1>${contentData.header}</h1>
      </article>
      <article class="education-text">
        <p>${contentData.text}</p>
      </article>
      ${buttonContent()}
    `;
  } else if (contentData.type === "drag-and-drop") {
    finalhtml = `
      <article class="course-title">
        <h1>${contentData.header}</h1>
      </article>
      <article class="code-exercise-container">
        <div class="droppable-area" id="code-target"></div>
        <div class="code-blocks-area" id="code-blocks">
          <div class="code-block" draggable="true" data-order="1">${
            contentData.code1
          }</div>
          <div class="code-block" draggable="true" data-order="3">${
            contentData.code3
          }</div>
          <div class="code-block" draggable="true" data-order="2">${
            contentData.code2
          }</div>
          <div class="code-block" draggable="true" data-order="4">${
            contentData.code4
          }</div>
        </div>
      </article>
      ${buttonContent()}
    `;
  }

  container.innerHTML = finalhtml;

  const buttonContentBack = document.querySelector(
    ".content-button .back-button"
  );
  const buttonContentForward = document.querySelector(
    ".content-button .forward-button"
  );

  buttonContentBack?.addEventListener("click", backSubsetActivePart);
  buttonContentForward?.addEventListener("click", forwardSubsetActivePart);

  if (contentData.type === "drag-and-drop") {
    initializeDragAndDrop();
        
    if ((maxActivePart == 4 && maxActiveSubpart == 3)||((maxActivePart != activePart && maxActiveSubpart != activeSubpart) && (maxActivePart >= activePart))) {
      autoArrangeDragAndDrop();
    }
  }
}

function buttonContent() {
  return `
    <article class="content-button">
      <button class="back-button">&lt; Back</button>
      <button class="forward-button">Next &gt;</button>
    </article>
  `;
}

function initializeDragAndDrop() {
  const codeBlocks = document.querySelectorAll(".code-block");
  const dropArea = document.querySelector(".droppable-area");
  let draggingElement = null;

  if (!dropArea) return;

  codeBlocks.forEach((block) => {
    block.addEventListener("dragstart", (e) => {
      draggingElement = block;
      block.classList.add("dragging");
      e.dataTransfer.setData("text/plain", "");
    });

    block.addEventListener("dragend", () => {
      block.classList.remove("dragging");
      draggingElement = null;
    });
  });

  dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dropArea, e.clientY);
    if (draggingElement) {
      if (afterElement) {
        dropArea.insertBefore(draggingElement, afterElement);
      } else {
        dropArea.appendChild(draggingElement);
      }
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = Array.from(
    container.querySelectorAll(".code-block:not(.dragging)")
  );

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

async function forwardSubsetActivePart() {
  const contentKeyTest = `${activePart}_${activeSubpart}`;

  if (content[contentKeyTest].type === "drag-and-drop") {
    if (
      !checkDragAndDrop(content[contentKeyTest] && window.innerWidth > 1000)
    ) {
      return;
    }
  }

  if (activeSubpart === 3) {
    forwardActivePart();
    return;
  } 
    
  setContent(content["loader"]);
  activeSubpart += 1;

  if (maxActiveSubpart < activeSubpart) {
    maxActivePart = activePart;
    maxActiveSubpart = activeSubpart;
    await saveUserProgress(thisModule, activePart, activeSubpart);
  }

  if (activePart == 4 && activeSubpart == 3) {
    saveUserProgress(2, 1, 1);
    changeWarningMessage(
      "Congratulation, Now You Can Go to The Next Module (Go The Dashboard and Choose Module)"
    );
    showWarning("#99ff7d");
  }

  const contentKey = `${activePart}_${activeSubpart}`;
  setContent(content[contentKey]);
}


function backSubsetActivePart() {
  if (activeSubpart === 1) {
    backActivePart();
  } else {
    activeSubpart -= 1;
    const contentKey = `${activePart}_${activeSubpart}`;
    setContent(content[contentKey]);
  }
}

async function forwardActivePart() {

  if (activePart === maxPart) {
    changeWarningMessage(
      "Congratulation, Now You Can Go to The Next Module (Go The Dashboard and Choose Module)"
    );
    showWarning("#99ff7d");
    return;
  }

  setContent(content["loader"]);

  activePart += 1;
  activeSubpart = 1;
  setActivePart();

  if (maxActivePart < activePart) {
    maxActivePart = activePart;
    maxActiveSubpart = activeSubpart;
    await saveUserProgress(thisModule, activePart, activeSubpart);
  }

  const contentKey = `${activePart}_${activeSubpart}`;
  setContent(content[contentKey]);
}

function backActivePart() {
  if (activePart === 1) return;

  activePart -= 1;
  activeSubpart = 3;
  setActivePart();

  const contentKey = `${activePart}_${activeSubpart}`;
  setContent(content[contentKey]);
}

function showWarning(color) {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
  warningMessage.style.backgroundColor = color;
  if (color == "#ff7d7d") {
    warningMessage.style.color = "white";
  } else {
    warningMessage.style.color = "black;";
  }
  const warningMessageSpan = document.querySelector(".warning-message span");
  warningMessageSpan.style.backgroundColor = color;
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
}

function checkDragAndDrop(contentData) {
  const droppedBlocks = document
    .querySelector(".droppable-area")
    ?.querySelectorAll(".code-block");

  if (!droppedBlocks || droppedBlocks.length !== 4) {
    changeWarningMessage("Wrong Answer ☹️, Please Try Again");
    showWarning("#ff7d7d");
    return false;
  }
  let isCorrect = true;
  droppedBlocks.forEach((block, index) => {
    const orderNum = parseInt(block.getAttribute("data-order"));
    if (orderNum !== index + 1) {
      isCorrect = false;
    }
  });

  if (!isCorrect) {
    changeWarningMessage("Wrong Answer ☹️, Please Try Again");
    showWarning("#ff7d7d");
    return false;
  }
  return true;
}

function changeWarningMessage(warningMessage) {
  let placeholder = document.querySelector(".warning-message span");
  placeholder.innerHTML = warningMessage;
}

async function checkMobile() {
  try {

    const isMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      const hasOrientation = typeof window.orientation !== 'undefined';
      const platform = navigator.platform.toLowerCase();
      const mobilePlatforms = /android|iphone|ipod|ipad/i;
      const windowWidth = window.innerWidth;
      const hasSmallScreen = windowWidth < 700;
      
      return mobileKeywords.test(userAgent) || hasOrientation || mobilePlatforms.test(platform) ||hasSmallScreen;
    };

    const container = document.querySelector("#container");
    const container2 = document.querySelector(".progress-bar");
    const container3 = document.querySelector(".back-to-account button");
    const container4 = document.querySelector("header a img");

    if (isMobile()) {
      if (container) {
        container.innerHTML = `<article class="course-title">
          <h1 style="font-size:5vw; text-align:center; padding-top:15vh;">This Course Cannot be Taken On A Mobile Screen, </br>Please Change to A Bigger Screen</h1>
        </article>`;
      }

      if (container2) container2.innerHTML = "";
      if (container3) container3.style.fontSize = "4vw";
      if (container4) container4.style.width = "30vw";
    } else {
      const contentKey = `${activePart}_${activeSubpart}`;
      if (content[contentKey] && container) {
        setContent(content[contentKey]);
      }

      if (container2) {
        container2.innerHTML = `
          <li class="step">Part 1</li>
          <li class="step">Part 2</li>
          <li class="step">Part 3</li>
          <li class="step">Part 4</li>
        `;
      }

      if (container3) container3.style.fontSize = "2vw";
      if (container4) container4.style.width = "17vw";
      setActivePart();
    }
  } catch (error) {
    console.error('Error in checkMobile:', error);
  }
}

async function saveUserProgress(module, part, subpart) {
  const token = await checkAuth();
  if (!token) return;

  try {
    const response = await fetch(backendURL + `user/saveProgress/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        module,
        part,
        subpart,
        timestamp: new Date().toISOString(),
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error saving progress:", error);
    throw error;
  }
}

async function getUserProgress() {
  const token = await checkAuth();
  if (!token) return;

  try {
    const response = await fetch(backendURL + `user/getProgress/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
      }),
    });

    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error("Error getting progress:", error);
    throw error;
  }
}

async function checkAuth() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/account/login.html";
    return false;
  }
  return token;
}

document.addEventListener("DOMContentLoaded", async () => {
  window.addEventListener("resize", checkMobile);

  try {
    setContent(content["loader"]);

    await initializeExercise();

    const contentKey = `${activePart}_${activeSubpart}`;
    if (content[contentKey]) {
      setContent(content[contentKey]);
      checkMobile();
      setActivePart();
    } else {
      console.error(`Content not found for key: ${contentKey}`);
    }

    const closeButton = document.querySelector("#close-btn");
    if (closeButton) {
      closeButton.addEventListener("click", closeWarning);
    }
  } catch (error) {
    console.error("Error in DOMContentLoaded:", error);
  }
});
