function changeTab(selectedIndex) {
  const buttons = document.querySelectorAll('.tabs-button');
  buttons.forEach(button => button.classList.remove('active'));

  buttonSelected = selectedIndex;
  buttons[buttonSelected].classList.add('active');

  const contentDiv = document.getElementById("content-div");
  contentDiv.classList.remove('fade-in');
  contentDiv.classList.add('fade-out');

  setTimeout(() => {
      contentDiv.innerHTML = ''; 

      switch (buttonSelected) {
          case 0:
              contentDiv.innerHTML = '<p>I/O</p><img src="assets/arrow.svg" /><p>Data Types</p><img src="assets/arrow.svg" /><p>Arithmetic Operations</p>';
              break;
          case 1:
              contentDiv.innerHTML = '<p>While Loop</p><img src="assets/arrow.svg" /><p>For Loop</p>';
              break;
          case 2:
              contentDiv.innerHTML = '<p>Array and Variables</p><img src="assets/arrow.svg" /><p>Strings</p>';
              break;
          case 3:
              contentDiv.innerHTML = '<p>Functions</p><img src="assets/arrow.svg" /><p>Procedures</p><img src="assets/arrow.svg" /><p>Matrix</p>';
              break;
      }
      contentDiv.classList.remove('fade-out');
      contentDiv.classList.add('fade-in');
  }, 350); 

}

document.addEventListener("DOMContentLoaded", () => {
  changeTab(0);
});