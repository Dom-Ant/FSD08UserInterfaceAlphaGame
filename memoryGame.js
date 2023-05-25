//header
document.addEventListener("DOMContentLoaded", (event) => {

    let header1 = document.getElementById("gameHeader");
    let h1Top = document.createElement("h1");
    h1Top.textContent = "Memory Game";
    header1.appendChild(h1Top);
    let para1 = document.createElement("p");
    para1.textContent = "Pair each image to a matching image.";
    header1.append(para1);
});



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


var cardsNum;
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

function toggleCustom() {
    if ($("#chooseDiff").val() == "Custom") {
        $("#customInputContainer").css("display", "block");
    } else {
        $("#customInputContainer").css("display", "none");
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

    //get cardsNum
    let diff = document.getElementById("chooseDiff").value;
    if (diff == "Easy") {
        cardsNum = 12;
    } else if (diff == "Medium") {
        cardsNum = 24;
    } else if (diff == "Hard") {
        cardsNum = 36;
    } else if (diff == "Custom") {
        let customInput = $("#customInput").val();
        if (!isNaN(customInput) && customInput % 2 == 0 && customInput !== null && customInput >= 4 && customInput <= 100) {
            cardsNum = parseInt(customInput);
        } else {
            cardsNum = 12;
            alert("Invalid Custom Number");
        }
    }

    //generate 6 pairs of cards
    let arrCards = [];
    for (let i = 0; i < cardsNum / 2; i++) {
        let randomImg = Math.floor(Math.random() * arrImg.length);
        let card = document.createElement("img");
        card.src = "Images/cardback.jpg";
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
            setTimeout(checkFinished, 1000);
        } else {
            turn2back(card);
            turn2back(cardShowing);
            cardShowing = -1;
        }

    }
}

function checkFinished() {
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
    setTimeout(() => {
        card.setAttribute("showing", "back");
        card.src = "images/cardback.jpg";
    }, 1000);


}

function turn2None(card) {
    setTimeout(() => {
        card.setAttribute("showing", "none");
        card.src = "Images/Match.jpg";
    }, 1000);

}

function closeGame() {

    //clear score
    $("#score").text("");

    initialize(true);
}


$(document).ready(function () {
    initialize(true);
    toggleCustom();
    $("#btnStart").on("click", newGame);
    $("#btnClose").on("click", closeGame);
    $("#chooseDiff").on("change", toggleCustom);
});
