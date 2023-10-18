let notificationInterval;
let inputValue;
let notifOn = true;
const errorTextElement = document.getElementById('errorText');
const numberInput = document.getElementById("numberInput"); // Get the reference to the number input element
const glassContainer = document.querySelector('.glass');

function onSubmit() {
  // Get the value of the number input.
  inputValue = parseInt(document.getElementById("numberInput").value);
  if (inputValue < 0) {
    errorTextElement.textContent = 'Error: Click count cannot be negative.';
    return; // Return early to prevent further execution
  }
  errorTextElement.textContent = '';
}

// Get references to the button and the click count element
const clickButton = document.getElementById('clickButton');
const clickCountElement = document.getElementById('clickCount');
const resetButton = document.getElementById('resetButton');
const resetIntervalButton = document.getElementById('resetIntervalButton');

// Initialize the click count to 0
let clickCount = 0;

// Add a click event listener to the button
clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountElement.textContent = clickCount;
    // Start the glass animation by adding the "drinking" class to the glassContainer
  glassContainer.classList.add('drinking');

  // Remove the "drinking" class after the animation duration (2 seconds in this example)
  setTimeout(() => {
    glassContainer.classList.remove('drinking');
  }, 2000); // Adjust the time to match the duration of the cup-fill animation
});

resetButton.addEventListener('click', () => {
  clickCount = 0;
  clickCountElement.textContent = clickCount;
});

resetIntervalButton.addEventListener('click', () => {
  notifOn = true;
  numberInput.value = '';
});

function fillWater() {
  if(notifOn){
    showNotification();
  }
  clearInterval(notificationInterval);
}

function startInterval() {
  notificationInterval = setInterval(fillWater, inputValue * 60000); // Convert inputValue to minutes
}

function showNotification() {
  const options = {
    type: "basic",
    title: "Water Reminder",
    message: "Time to drink water!",
    iconUrl: "img.png",
  };

  chrome.notifications.create(options);
}

document.getElementById("submit").addEventListener("click", () => {
  onSubmit(); 
  startInterval(); 
});

document.addEventListener("DOMContentLoaded", startInterval);
