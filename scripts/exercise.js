let activePart = 1;
let subsetActivePart = 1;
let maxPart = 2;

const content = {
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
};

function setActivePart() {
  const allStep = document.querySelectorAll(`.step`);
  for (const element of allStep) {
    element.classList.remove("active");
  }
  allStep[activePart - 1].classList.add("active");
}

function setContent(contentData) {
  const container = document.querySelector("#container");
  container.innerHTML = "";
  let finalhtml = "";

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

function forwardSubsetActivePart() {
  if (subsetActivePart === 3) {
    forwardActivePart();
  } else {
    const contentKeyTest = `${activePart}_${subsetActivePart}`;
    if (content[contentKeyTest].type === "drag-and-drop") {
      if (
        !checkDragAndDrop(content[contentKeyTest] && window.innerWidth > 1000)
      ) {
        return;
      }
    }
    subsetActivePart += 1;
    const contentKey = `${activePart}_${subsetActivePart}`;
    setContent(content[contentKey]);
  }
}

function backSubsetActivePart() {
  if (subsetActivePart === 1) {
    backActivePart();
  } else {
    subsetActivePart -= 1;
    const contentKey = `${activePart}_${subsetActivePart}`;
    setContent(content[contentKey]);
  }
}

function forwardActivePart() {
  if (activePart === maxPart) {
    changeWarningMessage("This Area is Still Under Development ☹️");
    showWarning();
    return;
  }

  activePart += 1;
  subsetActivePart = 1;
  setActivePart();

  const contentKey = `${activePart}_${subsetActivePart}`;
  setContent(content[contentKey]);
}

function backActivePart() {
  if (activePart === 1) return;

  activePart -= 1;
  subsetActivePart = 3;
  setActivePart();

  const contentKey = `${activePart}_${subsetActivePart}`;
  setContent(content[contentKey]);
}

function showWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.add("show");
}

function closeWarning() {
  const warningMessage = document.querySelector(".warning-message");
  warningMessage?.classList.remove("show");
}

function checkDragAndDrop(contentData) {
  const droppedBlocks = document
    .querySelector(".droppable-area")
    ?.querySelectorAll(".code-block");

  if (!droppedBlocks || droppedBlocks.length === 0) {
    changeWarningMessage("Wrong Answer ☹️, Please Try Again");
    showWarning();
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
    showWarning();
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const contentKey = `${activePart}_${subsetActivePart}`;
  setContent(content[contentKey]);
  checkMobile();
  setActivePart();
});

function changeWarningMessage(warningMessage) {
  let placeholder = document.querySelector(".warning-message span");
  placeholder.innerHTML = warningMessage;
}

function checkMobile() {
  const container2 = document.querySelector(".progress-bar");
  const container3 = document.querySelector(".back-to-account button");
  const container4 = document.querySelector("header a img");

  if (window.innerWidth < 1000) {
    const container = document.querySelector("#container");
    container.innerHTML = "";

    let finalHTML = `<article class="course-title">
          <h1 style="font-size:5vw; text-align:center; padding-top:15vh;">This Courses Cannot be Taken On A Mobile Screen, </br>Please Change to A Bigger Screen</h1>
        </article>`;

    container.innerHTML = finalHTML;
    container2.innerHTML = "";

    container3.style.fontSize = "4vw";
    container4.style.width = "30vw";

  } else {
    const contentKey = `${activePart}_${subsetActivePart}`;
    setContent(content[contentKey]);
    container2.innerHTML = `
      <li class="step">Part 1</li>
      <li class="step">Part 2</li>
      <li class="step">Part 3</li>
      <li class="step">Part 4</li>
      <li class="step">Part 5</li>
    `;

    container3.style.fontSize = "2vw";
    container4.style.width = "17vw";
    setActivePart();
  }
}

window.addEventListener("resize", checkMobile);
