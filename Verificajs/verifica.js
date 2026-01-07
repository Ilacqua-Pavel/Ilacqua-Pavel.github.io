const customName = document.getElementById("custom-name");
const generateBtn = document.querySelector(".generate");
const deleteBtn = document.querySelector(".delete");
const story = document.querySelector(".story");
const saveBtn = document.querySelector(".save");
const fontSizeInput = document.getElementById("font-size");
const fontSizeValue = document.getElementById("font-size-value");
const fontFamilySelect = document.getElementById("font-family");

const charactersUS = ["Trevor", "Eddie", "Frank"];
const charactersUK = ["Oliver", "Harry", "Jack"];
const charactersITA = ["Luca", "Marco", "Giovanni"];
const characters = charactersUS.concat(charactersUK, charactersITA);
const places = ["the soup kitchen", "Disneyland", "the White House"];
const events = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and slithered away",
];
const posti=["la mensa", "Disneyland", "la Casa Bianca"];
const eventi=[
  "è andato in combustione spontanea",
  "si è sciolto in una pozza sul marciapiede",
  "si è trasformato in una lumaca e se ne è andato strisciando",
];
function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function returnRandomStoryString() {
  const randomPersonaggi = randomValueFromArray(charactersITA);
  const randomCharacter = randomValueFromArray(characters);
  const randomPlace = randomValueFromArray(places);
  const randomPosti = randomValueFromArray(posti);
  const randomEvent = randomValueFromArray(events);
  const randomEventi = randomValueFromArray(eventi);

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
    saveTextToFile(textToSave, "silly-story.txt");
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
  if (document.getElementById("ita").checked) {
    const weight = `136 kg`;
    const temperature = `34 gradi Celsius`;
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 Fahrenheit", temperature);
    let storyText = `Fuori c'erano 36 gradi Celsius, quindi ${randomPersonaggi} andarono a fare una passeggiata. Quando arrivarono a ${randomPosti}, rimasero a guardare inorriditi per qualche istante, poi ${randomEventi}. Bob vide tutto, ma non ne fu sorpreso: ${randomPersonaggi} pesa 136 chili, ed era una giornata calda.`;
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

fontFamilySelect.addEventListener("change", fontFamilyChange);

function fontFamilyChange() {
  const selectedFont = fontFamilySelect.value;
  story.style.fontFamily = selectedFont;
}







