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

function toyPopulator(toyObject) {
  const toyCollection = document.getElementById('toy-collection');
  toyObject.forEach((element) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

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

    toyCollection.append(card);
  });
}