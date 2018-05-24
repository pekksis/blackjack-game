var deck = [];

function Card(suit, value){
  this.suit = suit;
  this.value = value;

/* Returns the name of the card. If the program calls this function with
  value = "Jack" and suit = "spades", this function will return "Jack of spades".*/
  this.getName = function(){
    return this.value + " of " + this.suit;
  }

  //Returns the numerical value of current card.
  this.getScoreValue = function(){
    if(this.value === "Jack" || this.value === "Queen" || this.value ==="King"){
      return 10;
    }
    else if(this.value ==="Ace") return 11;
    else return this.value;
  }
}

/*OPTIONAL: Constructor for Hand object. You do not necessarily need to use object
  for Hand. However, this way more players could be added later on easily by
  creating a new Hand object*/
function Hand(){
    this.hand = [];
    this.count = 0;
    this.score = 0;

/*Function for drawing a card from the deck and placing it into hand.
  player.drawCard() will draw the top card and place it into player's hand while
  dealer.drawCard() will draw the top card and place it into dealer's hand.*/
    this.drawCard = function(){
      var topCard = deck.pop(); //pop() removes the top card from the deck and returns it to var topCard
      var value = topCard.getScoreValue();

      //If the topCard is Ace (value = 11 by default), the function will check if the hand goes over 21 and the Ace needs to be 1
      if(topCard.value === 11)
      {
        if(this.score >= 11) topCard.value = 1;
      }
      this.hand.push(topCard); //Puts the drawn card to the hand.
      this.count++; //Keeps track of how many cards there are on this hand.
      this.score = this.score + topCard.value; //Updates the current hand score
    }

// Calculates current hand's score and changes Aces to 1 if the hand is over 21.
    this.getScore = function(){
      if(this.score > 21){
      /*Going through the hand and changing Aces to be of value 1. If the score is <= 21 afterwards, it returns the score.
        Otherwise it continues looking through the hand to see if there is another Ace*/
      for(let i = 0; i < hand.length; i++){
        if(hand[i].value === 11) hand[i].value = 1;
        if(this.score <= 21) return this.score;
        }
      }
    return this.score;
    }
}



/* Creates a new blackjack deck with as many decks as is needed.
numberOfDecks = how many decks is being created. Normal blackjack deck has 8 decks
of playing cards. Number of decks can be specified by changing the number
inside createDeck().
*/
function createDeck(numberOfDecks){
  var suits = ["diamonds", "hearts", "clubs", "spades"];
  var values = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

  if(numberOfDecks == null){numberOfDecks =1}

  for(let i = 0; i<numberOfDecks; i++){
    for(let j = 0; j<suits.length; j++){
      for(let k = 0; k<values.length; k++){
        var card = new Card(suits[j], values[k]);
        deck.push(card);
      }
    }
  }
}

//Durstenfeld shuffle algorithm.
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleDeck() {
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}


//Creates a blackjack deck consisting of 2 cards. The number on createDeck() can be changed to anything.
createDeck(2);
shuffleDeck();

/*Starting the game by creating a Hand-object for player and a Hand-object
  for dealer  (later on we could easily add more players).
  We give the player Hand two cards and one card to the dealer.
*/
function start(){
  var player = new Hand();
  var dealer = new Hand();
  player.drawCard();
  player.drawCard();  //Calling the draw function with both player and dealer - Hands
  dealer.drawCard();
  var playerScore = player.getScore();
  var dealerScore = dealer.getScore();

  //Stuff that tells the player what's going on.
  console.log("You have " + player.hand[0].getName() + " and " + player.hand[1].getName());
  console.log("Dealer has " + dealer.hand[0].getName());
  console.log("Your score is " + playerScore);
  console.log("Dealer's score is " + dealerScore);
  console.log("Do you want another card?");
}

//TODO: Ability to draw more cards.
function hit(){

}

//TODO: Ability to stop drawing cards and calculating who won.
function stand(){

}
