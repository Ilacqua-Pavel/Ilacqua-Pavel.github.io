const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const deleteBtn = document.querySelector(".delete");
const story = document.querySelector(".story");
const saveBtn = document.querySelector(".save");
const fontSizeInput = document.getElementById("font-size");
const fontSizeValue = document.getElementById("font-size-value");
const shiftInput = document.getElementById("shift");
const encryptBtn = document.querySelector(".encrypt");
const searchInput = document.getElementById("search-term");
const searchBtn = document.querySelector(".search");
const searchCount = document.getElementById("search-count");

const characters = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away",
];

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function returnRandomStoryString() {
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomEvent = randomValueFromArray(events);

  let storyText = `It was 94 Fahrenheit outside, so ${randomCharacter} went for a walk. When they got to ${randomPlace}, they stared in horror for a few moments, then ${randomEvent}. Bob saw the whole thing, but was not surprised — ${randomCharacter} weighs 300 pounds, and it was a hot day.`;

  return storyText;
}


generateBtn.addEventListener("click", generateStory);
deleteBtn.addEventListener("click", deleteStory);
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    if (!story.textContent || story.style.visibility === "hidden") {
      alert("Nessuna storia da salvare");
      return;
    }
    let textToSave = story.textContent;
    if (encryptCheckbox && encryptCheckbox.checked) {
      const rawShift = parseInt(shiftInput.value, 10);
      const shift = Number.isNaN(rawShift) ? 3 : rawShift;
      textToSave = caesarEncrypt(textToSave, shift);
    }
    saveTextToFile(textToSave, "silly-story.txt");
  });
}


if (encryptBtn) {
  encryptBtn.addEventListener("click", () => {
    if (!story.textContent || story.style.visibility === "hidden") {
      alert("Nessuna storia da cifrare");
      return;
    }
    const rawShift = parseInt(shiftInput.value, 10);
    const shift = Number.isNaN(rawShift) ? 3 : rawShift;
    story.textContent = caesarEncrypt(story.textContent, shift);
  });
}

const colorPicker = document.querySelector('input[type="color"]');
const storySfondo = document.querySelector('.story');


if (fontSizeInput) {
  story.style.fontSize = fontSizeInput.value + "px";
  fontSizeValue.textContent = fontSizeInput.value + "px";
  fontSizeInput.addEventListener("input", () => {
    story.style.fontSize = fontSizeInput.value + "px";
    fontSizeValue.textContent = fontSizeInput.value + "px";
  });
}

function generateStory() {
  let newStory = returnRandomStoryString();

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(300 / 14)} stone`;
    const temperature = `${Math.round((94 - 32) * (5 / 9))} Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}

function deleteStory() {
  story.textContent = "";
  story.style.visibility = "hidden";
}

colorPicker.addEventListener('input', function() {
  storySfondo.style.backgroundColor = colorPicker.value;
});

function saveTextToFile(text, filename){
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


function caesarEncrypt(text, shift) {
  const s = ((shift % 26) + 26) % 26;
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const code = text.charCodeAt(i);
    if (code >= 65 && code <= 90) {
    
      out += String.fromCharCode(((code - 65 + s) % 26) + 65);
    } else if (code >= 97 && code <= 122) {
    
      out += String.fromCharCode(((code - 97 + s) % 26) + 97);
    } else {
      out += ch;
    }
  }
  return out;
}


function clearHighlights() {

  if (story) story.innerHTML = story.textContent;
  if (searchCount) searchCount.textContent = "";
}

function performSearch() {
  if (!story.textContent || story.style.visibility === "hidden") {
    alert("Nessuna storia da cercare");
    return;
  }
  const term = (searchInput && searchInput.value || "").trim();
  if (!term) {
    clearHighlights();
    return;
  }
  const text = story.textContent;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "gi");
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;
  const highlighted = text.replace(regex, (m) => `<span class="highlight">${m}</span>`);
  story.innerHTML = highlighted;
  if (searchCount) searchCount.textContent = ` (${count} trovate)`;
}


if (searchBtn) {
  searchBtn.addEventListener("click", performSearch);
}
if (searchInput) {

  searchInput.addEventListener("input", () => {
    if (!searchInput.value) clearHighlights();
  });
}