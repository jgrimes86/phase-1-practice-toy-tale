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
.then(response => response.json())
.then(toyPopulator)

const toyCollection = document.getElementById('toy-collection');

function toyPopulator(toyArray) {
  toyArray.forEach((toyObject) => {
    
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    card.setAttribute('data-id', toyObject.id);
    const toyName = document.createElement('h2');
    const toyImage = document.createElement('img');
    toyImage.setAttribute('class', 'toy-avatar');
    const toyLikes = document.createElement('p');
    const button = document.createElement('button');
    button.setAttribute('id', toyObject.id);
    card.append(toyName, toyImage, toyLikes, button);

    toyName.textContent = toyObject.name;
    toyImage.src = toyObject.image;
    toyLikes.textContent = toyObject.likes+' likes';
    button.textContent = 'like';

    button.addEventListener('click', (event) => {
      let numberOfLikesString = toyLikes.textContent;
      let numberOfLikesArray = numberOfLikesString.split(' ');
      ++numberOfLikesArray[0]
      numberOfLikes = numberOfLikesArray[0]
      toyLikes.textContent = numberOfLikes+" Likes"
  
      let toyId = event.target.getAttribute('id');
      likePatchRequest(numberOfLikes, toyId);
    })

    toyCollection.append(card);
  });
}

const form = document.querySelector('form');

form.addEventListener('submit', newToy);

function newToy(submitEvent) {
  submitEvent.preventDefault();
    
  let toyName = submitEvent.target.name.value
  let toyImage = submitEvent.target.image.value
  
  const databaseUpdate = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0,
    })
  }
  
  fetch(toyDatabase, databaseUpdate)
    .then(response => response.json())
    .then(response => {
      newToyArray = [response];
      toyPopulator(newToyArray)
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
      likes: `${numberOfLikes}`})
  }

  fetch('http://localhost:3000/toys/'+toyId, patchObject)
 
  
}

