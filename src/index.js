const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// add the toys to the page
const parseJSON = resp => resp.json()
const url = 'http://localhost:3000/toys'

function putToysOnPage(toys) {
	const toyCollectionDiv = document.getElementById('toy-collection')
	// const toyCollectionDiv = document.querySelector('#toy-collection')
	toys.forEach(function(toy) {
		toyCollectionDiv.innerHTML += `
            <div class="card">
              <h2>${toy.name}</h2>
              <img src="${toy.image}" class="toy-avatar">
              <p>${toy.likes} Likes<p>
              <button class="like-btn">Like <3</button>
            </div>
        `
	})
}

fetch(url)
	.then(parseJSON)
	.then(putToysOnPage)

// new toy submission
const addToyForm = document.querySelector('.add-toy-form')
// const addToyForm = document.getElementsByClassName('add-toy-form')[0]
addToyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  let data = {
    name: document.querySelectorAll('.input-text')[0].value,
    image: document.querySelectorAll('.input-text')[1].value,
    likes: 0
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(parseJSON)
    .then(putToysOnPage)
})

document.body.addEventListener('click', function increaseLikes(event) {
  if (event.target.className === 'like-btn') {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount} likes`


    fetch(url + '/' + id, {
      method: "PATCH",
      headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({likes: likeCount})
    })
      .then(parseJSON)
      .then(console.log)
    // console.log('clicked', event.target);
  }
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!






// THIS IS ALL MY OLD CODE

// const url = 'http://localhost:3000/toys'
// const divId = document.getElementById.('toy-collection')
// function createNode(element) {
//   return document.createElement(element); // Create the type of element you pass in the parameters
// }
// function append(parent, el) {
//   return parent.appendChild(el); // Append the second parameter(element) to the first one
// }

// fetch(url)
// 	.then((response) => response.json())
// 		.then(function(data) {
// 			let toys = data.results;
// 			return toys.map(function(toy) {
// 				let div = createNode('div'),
// 			})
//   	});

