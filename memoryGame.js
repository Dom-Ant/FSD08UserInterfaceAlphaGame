
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

function initialize(blnStart) {
    
    if (blnStart) {
        $("#cardsContainer").hide();
        $("#score").hide();
        $("#closeGame").hide();
        $("#startGame").show();
    } else{
        $("#cardsContainer").show();
        $("#score").show();
        $("#closeGame").show();
        $("#startGame").hide();
    }

}
const cardsNum = 12;
function newGame() {

    initialize(false);
    //clear vars
    
    
    //fill cards
    let cardsContainer = document.getElementById("cardsContainer");
    while (cardsContainer.firstChild){ cardsContainer.removeChild(cardsContainer.firstChild) };
    for (let i = 0; i < cardsNum / 2; i++){
        let randomImg = Math.floor(Math.random() * arrImg.length);
        let card = document.createElement("img");
        card.src = arrImg[randomImg];
        card.style.width = "100px";
        card.style.height = "100px";
        
        card.setAttribute("num", randomImg);console.log(card);
        cardsContainer.appendChild(card);
        cardsContainer.appendChild(card.cloneNode());

    }
    
    

}



$(document).on("load",initialize(true));
$("#btnStart").on("click", newGame);
$("#btnClose").on("click", initialize);