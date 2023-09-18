let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyDatabase = 'http://localhost:3000/toys';

fetch(toyDatabase)
.then((response) => response.json())
.then(toyPopulator)

const toyCollection = document.getElementById('toy-collection');

function toyPopulator(toyObject) {
  toyObject.forEach((element) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data-id', element.id);

    const toyName = document.createElement('h2');
    const toyImage = document.createElement('img');
    toyImage.setAttribute('class', 'toy-avatar');
    const toyLikes = document.createElement('p');
    const button = document.createElement('button');

    card.append(toyName, toyImage, toyLikes, button);

    toyName.textContent = element.name;
    toyImage.src = element.image;
    toyLikes.textContent = element.likes;
    button.textContent = 'like';

    button.addEventListener('click', (event) => {
      let numberOfLikes = toyLikes.textContent++
      let toyDIV = event.target.parentElement;
      let toyId = toyDIV.getAttribute('data-id');
      likePatchRequest(numberOfLikes, toyId)
    })

    toyCollection.append(card);
  });
}



const form = document.querySelector('form');

form.addEventListener('submit', newToy);

function newToy(submitEvent) {
  submitEvent.preventDefault();
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  
  const toyName = document.createElement('h2');
  const toyImage = document.createElement('img');
  toyImage.setAttribute('class', 'toy-avatar');
  const toyLikes = document.createElement('p');
  const button = document.createElement('button');

  toyName.textContent = submitEvent.target.name.value
  toyImage.textContent = submitEvent.target.image.value

  toyLikes.innerText = 0 
  button.textContent = 'like';
  
  button.addEventListener('click', (event) => {
    let numberOfLikes = toyLikes.textContent++
    let toyDIV = event.target.parentElement;
    let toyId = toyDIV.getAttribute('data-id');
    likePatchRequest(numberOfLikes, toyId)
  })

  card.append(toyName, toyImage, toyLikes, button);
  toyCollection.append(card);
  
  const databaseUpdate = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: toyName.innerText,
      image: toyImage.innerText,
      likes: toyLikes.textContent,
    })
  }

  fetch(toyDatabase, databaseUpdate)
  .then((response) => response.json())
  .then((response) => {
    card.setAttribute('data-id', response.id)
  })
    
  form.reset();
}

function likePatchRequest(numberOfLikes, toyId) {

  const patchObject = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      likes: numberOfLikes})
  }

  fetch('http://localhost:3000/toys/'+toyId, patchObject)
 
  
}

