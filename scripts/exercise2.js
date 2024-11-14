import { backendURL } from "./url.js";

let activePart;
let activeSubpart;
let maxPart = 4;
let maxActivePart;
let maxActiveSubpart;
let activeModule;
let thisModule = 2;

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
  // Module 1: Introduction to Loops
  "1_1": {
    header: "Understanding Loops in Python 🔄",
    text: "Welcome to the Loops module! In programming, we often need to repeat certain tasks. This is where loops come in handy. <br/><br/>In this module, we'll learn about two main types of loops in Python: <mark>while loops<span class='tooltip-text'>Repeats code while a condition is True</span></mark> and <mark>for loops<span class='tooltip-text'>Repeats code for each item in a sequence</span></mark>",
    type: "text-only",
  },
  "1_2": {
    header: "Why Do We Need Loops? 🤔",
    text: "Imagine you need to print numbers from 1 to 100. Without loops, you'd have to write 100 print statements! <br/><br/>With loops, you can achieve this with just a few lines of code. Loops help us write <mark>efficient code<span class='tooltip-text'>Code that uses less lines and is easier to maintain</span></mark> and avoid repetition.",
    type: "text-only",
  },
  "1_3": {
    header: "Getting Started with Loops 🚀",
    text: "Before we dive in, remember that loops have three main components:<br/><br/>• <mark>Initialization<span class='tooltip-text'>Setting up starting values</span></mark><br/>• <mark>Condition<span class='tooltip-text'>When should the loop continue?</span></mark><br/>• <mark>Update<span class='tooltip-text'>How values change in each iteration</span></mark>",
    type: "text-only",
  },

  // Module 2: While Loops
  "2_1": {
    header: "While Loops Explained 🔁",
    text: 'A while loop repeats code as long as a condition is True. Think of it like saying "Keep doing this WHILE something is true".<br/><br/>The basic syntax is: <mark>while (condition):<span class="tooltip-text">while (True):\n    print("Hello")</span></mark><br/><br/>The code inside the loop will keep running until the condition becomes False.',
    type: "text-only",
  },
  "2_2": {
    header: "Let's Practice While Loops!",
    type: "drag-and-drop",
    code1: "count = 1 #1",
    code2: "while count <= 5: #2",
    code3: '    print(f"Count is {count}") #3',
    code4: "    count += 1 #4",
  },
  "2_3": {
    header: "Well Done with While Loops! 🎉",
    type: "text-only",
    text: "You've learned how while loops work! Remember to always include a way to make the condition False, or you'll create an infinite loop! </br></br>Now, let's move on to for loops.",
  },

  // Module 3: For Loops
  "3_1": {
    header: "Introduction to For Loops 🔄",
    text: "For loops are used to iterate over sequences (like lists, strings, or ranges). They're perfect when you know exactly how many times you want to repeat something.<br/><br/>The basic syntax is:<br/><mark>for item in sequence:<span class=\"tooltip-text\">for i in range(5):\n    print(i)</span></mark>",
    type: "text-only",
  },
  "3_2": {
    header: "Practice For Loops!",
    type: "drag-and-drop",
    code1: "fruits = ['apple', 'banana', 'orange'] #1",
    code2: "for fruit in fruits: #2",
    code3: '    print(f"I like {fruit}") #3',
    code4: 'print("That\'s all fruits!") #4',
  },
  "3_3": {
    header: "Great Progress with For Loops! 🌟",
    type: "text-only",
    text: "You've mastered the basics of for loops! They're incredibly useful for working with lists, dictionaries, and other Python sequences.</br></br>Let's move on to some practical examples!",
  },

  // Module 4: Practical Applications
  "4_1": {
    header: "Combining What We've Learned 🔨",
    text: 'Both while and for loops have their own use cases:<br/><br/>• Use <mark>while loops<span class="tooltip-text">When you don\'t know how many iterations you need</span></mark> when the number of iterations is uncertain<br/><br/>• Use <mark>for loops<span class="tooltip-text">When you know exactly what to iterate over</span></mark> when working with sequences or known ranges',
    type: "text-only",
  },
  "4_2": {
    header: "Final Practice Exercise!",
    type: "drag-and-drop",
    code1: "numbers = [1, 2, 3, 4, 5] #1",
    code2: "sum = 0 #2",
    code3: "for num in numbers: #3",
    code4: "    sum += num #4",
  },
  "4_3": {
    header: "Congratulations! 🎉",
    type: "text-only",
    text: "You've completed the loops module! You now understand:<br/><br/>• How while loops work<br/>• How for loops work<br/>• When to use each type of loop<br/>",
  },
  "loader": {
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
        
    if (maxActivePart >= activePart && maxActiveSubpart >= activeSubpart) {
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
    saveUserProgress(3, 1, 1);
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