 document.addEventListener("DOMContentLoaded", () => {
    const characterButtons = document.querySelectorAll(".character-btn");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");
    
    let characters = [];
  
    // Fetch data from the local JSON server
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(data => {
        characters = data;
        setupCharacterButtons();
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  
    // Setup character buttons and event listeners
    function setupCharacterButtons() {
      characterButtons.forEach(button => {
        const characterId = parseInt(button.getAttribute("data-character-id"));
        button.addEventListener("click", () => {
          const selectedCharacter = characters.find(character => character.id === characterId);
          displayCharacterDetails(selectedCharacter);
        });
      });
    }
  
    // Display character details
    function displayCharacterDetails(character) {
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      voteCountElement.textContent = character.votes;
  
      votesForm.addEventListener("submit", event => {
        event.preventDefault();
        const votes = parseInt(document.getElementById("votes").value);
        if (!isNaN(votes)) {
          character.votes += votes;
          voteCountElement.textContent = character.votes;
        }
      });
  
      resetButton.addEventListener("click", () => {
        character.votes = 0;
        voteCountElement.textContent = character.votes;
      });
    }
  });
  