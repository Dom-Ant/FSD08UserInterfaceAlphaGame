// Initialize timer variables
let timerInterval;
let timerCount = 0;

/**
 *  Function to start the timer
 */
function startTimer() {
    // Start the timer and update every second
    timerInterval = setInterval(() => {
        timerCount++;
        // Format time and update timer display
        let minutes = Math.floor(timerCount / 60);
        let seconds = timerCount % 60;
        document.getElementById('timer-minutes').textContent = `${minutes}:`;
        document.getElementById('timer-seconds').textContent = `${seconds < 10 ? '0' + seconds : seconds}`;
    }, 1000);
}
/**
 *  Function to stop the timer
 */
function stopTimer() {
    clearInterval(timerInterval);
}
/**
 * Function to reset the timer
 */
function resetTimer() {
    stopTimer();
    timerCount = 0;
    document.getElementById('timer-minutes').textContent = "0:";
    document.getElementById('timer-seconds').textContent = "00";
}

let currentScore = 0;
let bestScore = Infinity;

// HTML elements setup
document.addEventListener("DOMContentLoaded", (event) => {
    // Header
    let header1 = document.getElementById("gameHeader");
    let h1Top = document.createElement("h1");
    h1Top.textContent = "Memory Game";
    header1.appendChild(h1Top);
    let para1 = document.createElement("p");
    para1.textContent = "Pair each image to a matching image.";
    header1.append(para1);


    // Add timer elements
    let timer = document.createElement("p");
    timer.textContent = "Time: ";
    let timerMinutes = document.createElement("span");
    timerMinutes.id = 'timer-minutes';
    timerMinutes.textContent = "0:";
    timer.appendChild(timerMinutes);
    let timerSeconds = document.createElement("span");
    timerSeconds.id = 'timer-seconds';
    timerSeconds.textContent = "00";
    timer.appendChild(timerSeconds);
    header1.appendChild(timer);


    // Add current score element
    let currentScoreEl = document.createElement("p");
    currentScoreEl.id = 'current-score';
    currentScoreEl.textContent = 'Current Score: 0';
    header1.appendChild(currentScoreEl);

    // Add best score element
    let bestScoreEl = document.createElement("p");
    bestScoreEl.id = 'best-score';
    bestScoreEl.textContent = `Best Score: ${bestScore === Infinity ? '-' : bestScore}`;
    header1.appendChild(bestScoreEl);

    // Difficulty selector html
    let labelD = document.createElement("label");
    labelD.setAttribute("for", "chooseDiff");
    labelD.textContent = "Select Difficulty:";
    document.getElementById("gameDifficulty").appendChild(labelD);

    let diffSelect = document.createElement("select");
    diffSelect.id = "chooseDiff";
    let optEasy = document.createElement("option");
    optEasy.value = "Easy";
    optEasy.text = "Easy (12 cards)";
    diffSelect.appendChild(optEasy);
    let optMed = document.createElement("option");
    optMed.value = "Medium";
    optMed.text = "Medium (24 cards)";
    diffSelect.appendChild(optMed);
    let optHard = document.createElement("option");
    optHard.value = "Hard";
    optHard.text = "Hard (36 cards)";
    diffSelect.appendChild(optHard);
    let optCustom = document.createElement("option");
    optCustom.value = "Custom";
    optCustom.text = "Custom";
    diffSelect.appendChild(optCustom);

    document.getElementById("gameDifficulty").appendChild(diffSelect);
    // Hidden custom input
    let customInputCont = document.createElement("div");
    customInputCont.id = "customInputContainer";
    customInputCont.style.display = "none";

    let customInputLabel = document.createElement("label");
    customInputLabel.setAttribute("for", "customInput");
    customInputLabel.textContent = "How many cards do you want (up to 100 and must be an even number)";
    customInputCont.appendChild(customInputLabel);

    let customInput = document.createElement("input");
    customInput.id = "customInput";
    customInput.type = "number";
    customInput.min = 4;
    customInput.max = 100;
    customInputCont.appendChild(customInput);

    document.getElementById("gameDifficulty").appendChild(customInputCont);
});



// Image pool
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

// global 
var cardsNum;
var cardShowing = -1;

/**
 *  Function to initialize game elements
 * @param {boolean} blnStart - trigger
 */
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
/**
 * Function to show/hide custom input
 */
function toggleCustom() {
    if ($("#chooseDiff").val() == "Custom") {
        $("#customInputContainer").css("display", "block");
    } else {
        $("#customInputContainer").css("display", "none");
    }
}
/**
 * Function to start a new game
 */
function newGame() {

    resetTimer();
    startTimer();
    //call initialize function
    initialize(false);
    //clear vars
    cardShowing = -1;
    // Reset the current score
    currentScore = 0;
    document.getElementById('current-score').textContent = 'Current Score: 0';

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
        cardsNum = 20;
    } else if (diff == "Hard") {
        cardsNum = 30;
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

/**
 * shuffle order of array
 * @param {*} arr - array
 */
function shuffle(arr) {
    for (let i = arr.length; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
}
/**
 * Turn card over
 * @param {*} event - click
 */
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
        currentScore++;
        // Update the current score display
        document.getElementById('current-score').textContent = `Current Score: ${currentScore}`;
    }
}



/**
 * Function to check if game is finished
 */
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
        stopTimer();
        showScore();

        if (currentScore < bestScore) {
            bestScore = currentScore;
            // Update the best score display
            document.getElementById('best-score').textContent = `Best Score: ${bestScore}`;
        }

    }

    console.log('showing:' + cardShowing);
    console.log(card);


}
/**
 * Function to display the game score
 */
function showScore() {
    $("#score").append("Success!");
}
/**
 * Function to turn a card to the front image
 * @param {*} card - clicked card
 */
function turn2front(card) {
    card.setAttribute("showing", "front");
    card.src = arrImg[card.getAttribute("num")];

}

/**
 * Function to turn a card to the back image
 * @param {*} card - clicked card
 */
function turn2back(card) {
    setTimeout(() => {
        card.setAttribute("showing", "back");
        card.src = "images/cardback.jpg";
    }, 800);


}
/**
 * Function to turn a card to Match image
 * @param {*} card - clicked card
 */
function turn2None(card) {
    setTimeout(() => {
        card.setAttribute("showing", "none");
        card.src = "Images/Match.jpg";
    }, 800);

}
/**
 * Function to close the game
 */
function closeGame() {

    //clear score
    $("#score").text("");

    initialize(true);
}

//initialize
$(document).ready(function () {
    initialize(true);
    toggleCustom();
    $("#btnStart").on("click", newGame);
    $("#btnClose").on("click", closeGame);
    $("#chooseDiff").on("change", toggleCustom);
});

