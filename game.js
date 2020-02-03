var deck = new Array();
var suits = ["spades", "daimonds","clubs","hearts"];
var values =["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
var playerhand;
var dealerhand;
var gameover = false
var playerwon = false
var dealerwon = false
let gamebutton = document.getElementById('gamebutton');
let hitButton = document.getElementById('hitbutton');
let stayButton = document.getElementById('staybutton');
//new game button event
gamebutton.addEventListener('click', function() {
    gameStarted = true;
    console.log('gameStarted');
    startgame();
    updateView();
})
// hit button event
hitButton.addEventListener('click', function(){
    hit();
})
//stay button event
stayButton.addEventListener('click', function(){
    checkendgame();
})

function updateView(){
    //it displays player cards weight
    document.getElementById("phcards").innerHTML = playerhand;
    //it displays dealer cards weight
    document.getElementById("dhcards").innerHTML = dealerhand;
    //it displays playerhand sum 
    document.getElementById("playerhandsum").innerHTML = gethandvalue(playerhand)
    //it displays dealerhand sum 
    document.getElementById("dealerhandsum").innerHTML = gethandvalue(dealerhand)
}

deck = createdeck();
function createdeck() {
    //it creates deck of cards(52)
    for(let i = 0; i < suits.length; i++){
        for(let x =0; x < values.length; x++){
            //declaring  A,J,Q,K weights 
            var weight = parseInt(values[x])
            if (values[x] == 'J' || values[x] == 'Q' || values[x] == 'K')
            weight = 10;
            if (values[x] == 'A')
            weight = 11;
            //var card = [value: values[x], suit: suits[i], weight: weight];
            var card = [weight];
            deck.push(card);
        }
    }
    return deck;
}
//console.log(deck);
//shuffle the deck and pic 2random locations
function shuffle(deck){
    // for(let j = 0; j < deck.length; j++){
    //     var dealer = [Math.floor(Math.random() * deck.length)];
    //     var player = [Math.floor(Math.random() * deck.length)];

    //       var temp = deck[dealer]
    //       deck[dealer] = deck[player];
    //       deck[player] = temp;
    // }
//console.log(dealer,player);

// generate the randomindex from deck of cards
    var randomindex = [Math.floor(Math.random() * deck.length)];
    return deck[randomindex];
}
//console.log(shuffle(deck));

// start game function will generate two cards foreach  dealerhand and playerhand
function startgame(){
    gameover = false
    //calling a function two times in a array, so when function invoked random card will get.
    dealerhand = [shuffle(deck), shuffle(deck)];
    playerhand = [shuffle(deck), shuffle(deck)];
    document.getElementById("gamestatus").innerHTML = ""
}

 
 //getting the both hand values and adding them and gives the sum result
 function gethandvalue(hand){
     var sum = 0;
    for(let i = 0; i < hand.length; i++){
        sum = sum+parseInt(hand[i]);
    }
    return sum;
 }

//when hit clicked  it adds a card to player hand
 function hit(){
     playerhand.push(shuffle(deck));
     console.log('new playerhand:' + playerhand);
     if(gethandvalue(playerhand) > 21)
     {
         console.log("BUST");
         document.getElementById("gamestatus").innerHTML = "BUST"
     }

     updateView();
 }

 
 function checkendgame() {
    if(!gameover){
        while( gethandvalue(playerhand) <=21 && gethandvalue(dealerhand) <=21){
            dealerhand.push(shuffle(deck));
            updateView()
        }
    }
 
    if(gethandvalue(playerhand) > 21){
        playerwon = false;
        dealerwon = true;
        gameover = true;
    }
    else if(gethandvalue(dealerhand) >21){
        dealerwon = false
        playerwon = true;
        gameover = true;
    }
    
    
    if(gameover){

        if(playerwon){
            console.log("player won")
            document.getElementById("gamestatus").innerHTML = "Player Won"
        }else{
            console.log("player lost")
            document.getElementById("gamestatus").innerHTML = "Player Lost"
        }
    }

}

 startgame();
//  console.log('playerhand:' + playerhand);
//  console.log('playerhand sum value:' + gethandvalue(playerhand));
//  console.log('dealerhand:' + dealerhand);
//  console.log('dealerhand sum value:' + gethandvalue(dealerhand));
updateView();

//  document.getElementById(playerhand).innerHTML = playerhand;
//  document.getElementById(playerhand).innerHTML = playerhand;