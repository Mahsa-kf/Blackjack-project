
window.onload = pageLoaded;

function pageLoaded() {
    //creating cards Array that holds all 52 cards. Each card is an object with CardName and Value properties 
    //S: spade, H: Heart, C: Clubs, D: Diamonds
    cards = [
        {cardName: "AS",  value: 1}, {cardName: "2S",  value: 2}, {cardName: "3S",  value: 3} , {cardName: "4S",  value: 4} , {cardName: "5S",  value: 5}, {cardName: "6S",  value: 6}, {cardName: "7S",  value: 7}, {cardName: "8S",  value: 8} , {cardName: "9S",  value: 9} , {cardName: "10S",  value: 10},{cardName: "JS",  value: 10}, {cardName: "QS",  value: 10}, {cardName: "KS",  value: 10},
        {cardName: "AH",  value: 1}, {cardName: "2H",  value: 2}, {cardName: "3H",  value: 3} , {cardName: "4H",  value: 4} , {cardName: "5H",  value: 5}, {cardName: "6H",  value: 6}, {cardName: "7H",  value: 7}, {cardName: "8H",  value: 8} , {cardName: "9H",  value: 9} , {cardName: "10H",  value: 10},{cardName: "JH",  value: 10}, {cardName: "QH",  value: 10}, {cardName: "KH",  value: 10},
        {cardName: "AC",  value: 1}, {cardName: "2C",  value: 2}, {cardName: "3C",  value: 3} , {cardName: "4C",  value: 4} , {cardName: "5C",  value: 5}, {cardName: "6C",  value: 6}, {cardName: "7C",  value: 7}, {cardName: "8C",  value: 8} , {cardName: "9C",  value: 9} , {cardName: "10C",  value: 10},{cardName: "JC",  value: 10}, {cardName: "QC",  value: 10}, {cardName: "KC",  value: 10},
        {cardName: "AD",  value: 1}, {cardName: "2D",  value: 2}, {cardName: "3D",  value: 3} , {cardName: "4D",  value: 4} , {cardName: "5D",  value: 5}, {cardName: "6D",  value: 6}, {cardName: "7D",  value: 7}, {cardName: "8D",  value: 8} , {cardName: "9D",  value: 9} , {cardName: "10D",  value: 10},{cardName: "JD",  value: 10}, {cardName: "QD",  value: 10}, {cardName: "KD",  value: 10},
        
    ];

	//create variables for required HTML elements
    var dealerSumElement = document.getElementById("dealer-sum");
    var playerSumElement = document.getElementById("player-sum");
    var dealerCardElement = document.getElementById("dealerCardSection");
    var playerCardSElement = document.getElementById("playerCardSection");

    var resultElement = document.getElementById("result");
    var winsElement = document.getElementById("wins");
    var lossesElement = document.getElementById("losses");
    var drawsElement = document.getElementById("draws");

    var newGameBtn = document.getElementById("newGameBtn");
    var hitBtn = document.getElementById("hitBtn");
    var standBtn = document.getElementById("standBtn");
    var resetResultBtn = document.getElementById("resetResult");

    //Set event listeners
    newGameBtn.onclick = onNewGameClick;
    hitBtn.onclick = onGetPlayerNewCard;
    standBtn.onclick = onStandClick;
    resetResultBtn.onclick = onResetResultClick;

    //create sumDealer and sumPlayer variable so all functions have access to it
    var sumDealer;
    var sumPlayer;
    
    var wins = 0;
    var losses = 0;
    var draws = 0;

    //checking if the wins store exist
    if (localStorage.getItem("wins") == null){
        // if the store is not exist create it and set the value to 0
        localStorage.setItem("wins", 0);
    } else {
        // if the wins store has value then get the value and display
        wins = localStorage.getItem("wins");
        winsElement.innerHTML = wins;
    }
    if (localStorage.getItem("losses") == null){
        localStorage.setItem("losses", 0);
    }
    else {
        losses = localStorage.getItem("losses");
        lossesElement.innerHTML = losses;

    }
    if (localStorage.getItem("draws") == null){
        localStorage.setItem("draws", 0);
    } else {
        draws = localStorage.getItem("draws");
        drawsElement.innerHTML = draws;
    }



    //Create and initialize variables to store the list of Player Cards and Dealer Cards. These are list of objects with CardName and Value properties 
    var playerCards = [];
    var dealerCards = [];

    //Give two cards to the player and one cards to the dealer at the beginning     
    givePlayerCard();
    giveDealerCard();
    onGetPlayerNewCard();

    //Calculate and display the sum of the player's cards
    sumPlayer = getCardsSum(playerCards);
    playerSumElement.innerHTML = sumPlayer;

    //Calculate and display the sum of the dealer's cards
    sumDealer = getCardsSum(dealerCards);
    dealerSumElement.innerHTML = sumDealer;


    //Crating function which listen to click on New Game's button. This function will be reloaded the page.
    function onNewGameClick(){
        location.reload();
    }

    //Creating function which listen to click on Hit button.
    function onGetPlayerNewCard(){
        //player asked for a new card, so we call the givePlayerCard()
        givePlayerCard();

        //Calculate and display the sum of the player's cards
        sumPlayer = getCardsSum(playerCards);
        playerSumElement.innerHTML = sumPlayer;
        
        //Check if the sum is 21, then player won, and if the sum is grater tah 21 then player lost. Otherwise game is not finish yet.
        if (sumPlayer === 21) {
            playerWin();
        } else if (sumPlayer> 21){
            playerLoose();
        }
    }
    
    // creating function which listen to click on stand button
    function onStandClick(){
        // give the dealer cards until the sum is equal or greater than player' sum
        do{
            //give a new card to dealer
            giveDealerCard();
            //calculate the sum and display it
            sumDealer = getCardsSum(dealerCards);
            dealerSumElement.innerHTML = sumDealer;
        } while( sumDealer < sumPlayer)
        
        //when dealer's sum is greater than 21, dealer loss and player win
        if(sumDealer > 21){
            playerWin();
        // when dealer's sum is equal with player's sum then it is draw 
        } else if(sumPlayer === sumDealer){
            draw();
         // when none of above conditions happen it means dealer win and player loos
        }else {
            playerLoose();
        }

    }

    //creating function which listen to click on Reset Result button
    function onResetResultClick(){
        //clearing the store and refresh the page
        localStorage.clear();
        location.reload();
    }


    function playerWin(){
        //when player win show the message in green color
        resultElement.innerHTML = "Congratulation! You win 😍 Click New Game to play again.";
        resultElement.style.color= "#278D27";
        //add one to the total number of wins
        wins++;
        //display the new value and store it in local storage
        localStorage.setItem("wins", wins);
        winsElement.innerHTML = wins;
        //lock the Hit and Stand buttons
        endGame();
     }

    function playerLoose(){
        //when player lose show the message in red color
        resultElement.innerHTML = "Sorry! You Lose 😓 Click New Game to play again.";
        resultElement.style.color= "#E21818"
         //add one to the total number of losses
        losses++;
        //display the new value and store it in local storage
        localStorage.setItem("losses", losses);
        lossesElement.innerHTML = losses;
        //lock the Hit and Stand buttons
        endGame();
    }

    function draw(){
         //when both the results are equal show the message in blue colour
        resultElement.innerHTML = "Draw! 😎 Click New Game to play again";
        resultElement.style.color= "#5114DF";
        //add one to the total number of draws
        draws++;
        //display the new value and store it in local storage
        localStorage.setItem("draws", draws);
        drawsElement.innerHTML = draws;
        //lock the Hit and Stand buttons
        endGame();
    }

    function endGame(){
        //when game ends lock the Hit and Stand buttons
        standBtn.disabled = true;
        hitBtn.disabled = true;
    }

    function getCardsSum(cardsList) {
        var sum = 0;
        var hasAce = 0;

        for (var i = 0; i < cardsList.length; i++) {
            //calculating the sum
            sum += cardsList[i].value;
            //check if we have any Ace
            if (cardsList[i].value === 1) {
                hasAce = true;
            }
        }
        // If the sum is less or equal 11 and we have ace card we can consider the Ace card's value 11 otherwise the Ace card value must count as default 1.
        // only one Ace can be 11 because If we consider value of 2 Aces 11, then the sum will be greater than 21
        if (sum <= 11 && hasAce === true) {
            sum += 10;
        }

        return sum;
    }

    function giveDealerCard(){
        //creating a random card
        var newCard = giveNewCard();
        //Adding a new card to the player
        dealerCards.push(newCard);
         //Showing the new card
        dealerCardElement.innerHTML +=`<img src="images/cards/${newCard.cardName}.jpg" alt="${newCard.cardName}">`;
    }

    function givePlayerCard(){
        //creating a random card
        var newCard = giveNewCard();
        //Adding a new card to the player
        playerCards.push(newCard);
        //Showing the new card
        playerCardSElement.innerHTML += `<img src="images/cards/${newCard.cardName}.jpg" alt="${newCard.cardName}">`;       
    }

    function giveNewCard() {
        var randomIndex = Math.floor(Math.random() * this.cards.length);
        var result = this.cards[randomIndex];
        //removed selected card from cards list
        this.cards.splice(randomIndex, 1)
        return result;
    }
}

