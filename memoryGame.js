
//img pool
const arrImg = ["images/1.jpg"
    , "images/2.jpg"
    , "images/3.jpg"
    , "images/4.jpg"
    , "images/5.jpg"
    , "images/6.jpg"
    , "images/7.jpg"
    , "images/8.jpg"
    , "images/9.jpg"
];
const cardsNum = 12;
var cardShowing = -1;
function initialize(blnStart) {

    if (blnStart) {
        $("#cardsContainer").hide();
        $("#score").hide();
        $("#closeGame").hide();
        $("#startGame").show();
    } else {
        $("#cardsContainer").show();
        $("#score").show();
        $("#closeGame").show();
        $("#startGame").hide();
    }

}


function newGame() {

    //call initialize function
    initialize(false);
    //clear vars
    cardShowing = -1;

    //clear cards
    let cardsContainer = document.getElementById("cardsContainer");
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild)
    };

    //generate 6 pairs of cards
    let arrCards = [];
    for (let i = 0; i < cardsNum / 2; i++) {
        let randomImg = Math.floor(Math.random() * arrImg.length);
        let card = document.createElement("img");
        card.src = arrImg[randomImg];
        card.style.width = "100px";
        card.style.height = "100px";
        card.setAttribute("num", randomImg);
        arrCards.push(card);
        arrCards.push(card.cloneNode());

    }
    //call shuffle function to randomize order, assign id to each card, set onclick event
    shuffle(arrCards);
    for (let i = 0; i < arrCards.length; i++) {
        arrCards[i].setAttribute("id", `card${i}`);
        arrCards[i].onclick = turnOver;
        cardsContainer.appendChild(arrCards[i]);

    }
    for (let i = 0; i < cardsContainer.children.length; i++) {
        cardsContainer.children[i].setAttribute("showing", "back");
    }
    console.log(cardsContainer.children);

}
//shuffle order of array
function shuffle(arr) {
    for (let i = arr.length; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
}

function turnOver(event) {
    card = event.target;
    if (card.getAttribute("showing") == "none") return;

    if (cardShowing == -1) {
        if (card.getAttribute("showing") == "back") {
            turn2front(card);
            cardShowing = card;
        } else {
            turn2back(card);
        }
    } else if (cardShowing == card) {
        turn2back(card);
        cardShowing = -1;
    } else {
        turn2front(card);
        if (card.getAttribute("num") == cardShowing.getAttribute("num")) {
            turn2None(card);
            turn2None(cardShowing);
            cardShowing = -1;
        } else {
            turn2back(card);
            turn2back(cardShowing);
            cardShowing = -1;
        }

    }

    let cardsContainer = document.getElementById("cardsContainer");

    let gameDone = true;
    for (let i = 0; i < cardsContainer.children.length; i++) {
        console.log(cardsContainer.children[i]);
        if (cardsContainer.children[i].getAttribute("showing") != "none") {
            gameDone = false;
            break;
        }
    }

    if (gameDone) {
        showScore();
    }
    console.log('showing:' + cardShowing);
    console.log(card);



}
function showScore() {
    $("#score").append("Success!");
}

function turn2front(card) {
    card.setAttribute("showing", "front");
    card.src = arrImg[card.getAttribute("num")];

}
function turn2back(card) {
    card.setAttribute("showing", "back");
    card.src = "images/cardback.jpg";

}

function turn2None(card){
    card.setAttribute("showing", "none");
    card.src = "Images/Match.jpg";
}

function closeGame() {

    //clear score
    $("#score").text("");

    initialize(true);
}

$(document).on("load", initialize(true));
$("#btnStart").on("click", newGame);
$("#btnClose").on("click", closeGame);