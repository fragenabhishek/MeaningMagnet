// script.js
document.getElementById('textContainer').addEventListener('click', handleWordClick);

function handleWordClick(event) {
  const word = getSelectedWord();
  if (word) {
    fetchWordInfo(word);
  }
}

function getSelectedWord() {
  const selection = window.getSelection();
  return selection.toString().trim();
}

async function fetchWordInfo(word) {
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${word}&origin=*`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Unable to fetch word information.');
    }

    const data = await response.json();
    displayWordInfo(word, data);
  } catch (error) {
    console.error(error.message);
  }
}

function displayWordInfo(word, data) {
  const wordElement = document.getElementById('word');
  const infoElement = document.getElementById('info');
  const popup = document.getElementById('infoPopup');

  const page = data.query.pages[Object.keys(data.query.pages)[0]];
  const extract = page.extract;

  wordElement.textContent = `Word: ${word}`;
  infoElement.innerHTML = extract;

  // Show the popup
  popup.classList.remove('hidden');
}

// Close the popup on click
document.getElementById('infoPopup').addEventListener('click', function () {
  this.classList.add('hidden');
});
