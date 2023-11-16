// content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'activateExtension') {
      handleWordInfo();
    }
  });
  
  function handleWordInfo() {
    document.addEventListener('click', function (event) {
      const word = getSelectedWord();
      if (word) {
        fetchWordInfo(word);
      }
    });
  
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
      const wordElement = document.createElement('p');
      const infoElement = document.createElement('p');
  
      wordElement.textContent = `Word: ${word}`;
      infoElement.innerHTML = data.query.pages[Object.keys(data.query.pages)[0]].extract;
  
      showPopup(wordElement, infoElement);
    }
  
    function showPopup(wordElement, infoElement) {
      const popup = document.createElement('div');
      popup.id = 'wordInfoPopup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.padding = '15px';
      popup.style.backgroundColor = '#fff';
      popup.style.border = '1px solid #ccc';
      popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
      popup.style.zIndex = '1000';
      popup.style.maxWidth = '80vw';
      popup.style.maxHeight = '80vh';
      popup.style.overflowY = 'auto';
  
      popup.appendChild(wordElement);
      popup.appendChild(infoElement);
  
      document.body.appendChild(popup);
    }
  }
  