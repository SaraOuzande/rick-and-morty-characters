const characterContainer = document.getElementById('character-list');  
const prevButton = document.getElementById('prev-page'); 
const nextButton = document.getElementById('next-page'); 
let currentPage = 1; 

async function fetchCharacters(page) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();
    
    console.log(data);

    characterContainer.innerHTML = '';

    data.results.forEach(character => {
      const card = document.createElement('li');  
      card.classList.add('character-card');  

      card.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
        <p>${character.species}</p>
      `;

      characterContainer.appendChild(card);  
    });

    prevButton.disabled = !data.info.prev;  
    nextButton.disabled = !data.info.next;  

  } catch (error) {
    console.error('Error al obtener personajes:', error);
  }
}

prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);  
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  fetchCharacters(currentPage);  
});

fetchCharacters(currentPage);
