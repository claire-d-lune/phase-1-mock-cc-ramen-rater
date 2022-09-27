// write your code here

//creating variables for the divs we want to fill
const menu = document.querySelector("#ramen-menu")
const ramenDetail = document.querySelector("#ramen-detail")
const ramenForm = document.querySelector("#new-ramen")
let currentCard = {};


fetch("http://localhost:3000/ramens")
.then(res => res.json())
.then(data => {data.forEach(card => renderToMenu(card)); return data})
.then(dataAfter => renderToDetails(dataAfter[0]))

//Callback functions:
function renderToMenu(card) {
    const img = document.createElement('img')
    img.src = card.image
    menu.append(img)
    img.addEventListener('click', () => renderToDetails(card))
}


function renderToDetails(card)
{
    currentCard = card
    console.log(currentCard)
    ramenDetail.querySelector('img').src = currentCard.image
    ramenDetail.querySelector('h2').textContent = currentCard.name
    ramenDetail.querySelector('h3').textContent = currentCard.restaurant
    document.querySelector('#rating-display').textContent = currentCard.rating
    document.querySelector('#comment-display').textContent = currentCard.comment
}

ramenForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newName = e.target.querySelector('#new-name').value
    const newRestaurant = e.target.querySelector('#new-restaurant').value
    const newImageUrl = "./assets/ramen/kojiro.jpg"; //I default to a given picture
    const newRating = e.target.querySelector('#new-rating').value;
    const newComment = e.target.querySelector('#new-comment').value;

    let newObject ={
        name: newName,
        restaurant: newRestaurant,
        image: newImageUrl,
        rating: newRating,
        comment: newComment
    }

    const configurationObject ={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newObject)
    }

    fetch("http://localhost:3000/ramens", configurationObject)
    .then(res => res.json())
    .then(info => console.log(info))

    }
)
