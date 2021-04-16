let pawns = [];                                                                   //keeps the pawns 
let x = document.getElementById("myAudio");
var PlayerStats = function ()                                                       //class for the player status
{
    this.idGame;                                                            //keeps the id of the game
    this.colorOfPlayer = "null";                                            //keeps the color of the player depending on the pawn color
    this.pawnsFinish = 0;                                                   //looks after the number of finished players
    this.diceClicked = "true"                                               //keep if the player has clicked the dice in order to move pawn
}
var player = new PlayerStats();                                             //create a new player for every client only one player object is created

socket = new WebSocket("ws://localhost:3000");
socket.onmessage = function (event) {                                       //receives messages from the server and depending on the message type do the respective tasks
    let message = JSON.parse(event.data);
    if (message.messageType == "NewPawn") {                                 //create a new pawns in the array of pawns depending of the color of the pawn
        console.log(message.color);
        if (message.idGame != "null")                                       //give the player red or yellow color
        {
            player.colorOfPlayer = message.idGame;                          //in this case we use the id in the message also as a color
            document.getElementById("plColor").innerHTML=player.colorOfPlayer;
            console.log(message.color);
        }
        if (message.color == "red") {
            startGameRed();                                                 //creates red pawns
        }
        else {
            startGameYellow();                                              //creates yellow pawns
        }
        document.getElementById("dice").style.backgroundColor = message.diceColor;
    }
    else if (message.messageType == "NewPlayerHasCome") {                   //message for the coming of the other player
        window.alert("New player has come!!!");
    }
    else if (message.messageType == "DiceValue") {                          //message for the dice value update and color
        console.log(message);
        document.getElementById("dice").value = message.dice;
        document.getElementById("dice").style.backgroundColor = message.diceColor;
    }
    else if (message.messageType == "NewPawnOnTheBoard") {                  //put a new pawn on the gameboard depending of the pawn id
        let pawn = pawns[message.idPawn];                                   //find the pawn in the array of pawns in order to do the movement
        pawn.setToStart(message.x, message.y);
    }
    else if (message.messageType == "MovePawn") {                           //move the pawn ahd update its position, direction of movement and steps
        let pawn = pawns[message.idPawn];                                   //find the pawn in the array of pawns in order to do the movement
        pawn.movePosNew(message.x, message.y, message.directionX, message.directionY);
        pawn.steps = message.steps;                                         //increament the steps of the pawn on the board
        document.getElementById("dice").style.backgroundColor = message.diceColor;
        if (message.steps >= 56) {                                          //if the steps are >=56 the pawn has finished the game
            player.pawnsFinish++;                                           //increament the number of pawns who has finished
            console.log(player.pawnsFinish);
        }
        if (player.pawnsFinish == 4) {                                      //check if all pawns have finshed and if yes send info to the server
            console.log("Send");
            socket.send(JSON.stringify(new Message("ThisWon", player.idGame, null, null, null, null, null, null, player.colorOfPlayer, null, null)));
        }
    }
    else if (message.messageType == "ThisWon")                              //alert the player color who has won
    {
        window.alert(message.color + " has won!!!");
    }
    else if (message.messageType == "GameFinito") {                         //message when the other player leave the game
        window.alert("The other player has disconnected. The game has finished :(")
    }
    else if (message.messageType == "GameId") player.idGame = message.idGame;//set to the player the game ID


};
/*
    Information of the messages which the server/client receives or sends 
*/
var Message = function (typeOfmessage, gameId, pawnId, posX, posY, dirX, dirY, stepsPawn, colorPawn, diceValue, colorOfDice) {
    this.messageType = typeOfmessage;                                       //The type of the message
    this.idGame = gameId;                                                   //the id of the game
    this.idPawn = pawnId;                                                   //the id of the pawn 
    this.x = posX;                                                          //the x pos og the pawn
    this.y = posY;                                                          //the y pos of the pawn
    this.directionX = dirX;                                                 //direction of movement right/left
    this.directionY = dirY;                                                 //direction of movement up/down
    this.steps = stepsPawn;                                                 //the number of steps of the pawn
    this.color = colorPawn;                                                 //the color of the new pawns
    this.dice = diceValue;                                                  //dice value
    this.diceColor = colorOfDice;                                           //dice color
}
var Pawn = function (idPlayer, xPos, yPos, colorP, image, startPosX, startPosY, dirX, dirY, play) {
    this.playerId = idPlayer;
    this.NotPlayPosX = xPos;                                                  //keep the value of x when the pawn is not playing on the board
    this.NotPlayPosY = yPos;                                                  //keep the value of y when the pawn is not playing
    this.startX = startPosX;                                                  //keep the value of x when the pawn is selected to play         the cordinates
    this.startY = startPosY;                                                  ////keep the value of y when the pawn is selected to play       of the start cell
    this.x = xPos;                                                            //keep the current value of the x on the board
    this.y = yPos;                                                            //keep the current value of the y on the board
    this.target = document.createElement("img");                              //create element of type image
    this.target.style.width = "44px";                                         //set the pawn sizes
    this.target.style.height = "44px";
    this.target.style.position = "absolute";                                  //set the element position in the div/container
    this.target.src = image;                                                  //set image
    this.target.style.top = this.y + "px";                                    //set the style position of the element
    this.target.style.left = this.x + "px";
    this.path = 0
    container.appendChild(this.target);                                     //make the element part of the div/container
    let obj = this;
    this.isPlaying = play;                                                    //keep info if the pawn is playing activily on the board or it is at home
    this.color = colorP;                                                      //set the color of the pawn red green yellow blue
    this.steps = 0;

    //x=1 goes right, x=-1 goes left, y=1 goes down, y=-1 goes up
    this.startDirX = dirX;                                                    //keep the direction of movement before coming on the board
    this.startDirY = dirY;
    this.directionX = dirX;                                                   //keep track of the current direction of movement
    this.directionY = dirY;
    this.target.addEventListener("click", function () {                        //when the element is clicked on this here happens
        if (player.colorOfPlayer == obj.color && player.colorOfPlayer == document.getElementById("dice").style.backgroundColor && player.diceClicked == "true") {
            player.diceClicked = "false";
            if (obj.isPlaying === "false") {                                        //if the object is not playing and the dice value is 6 a new player can come on the board
                if (document.getElementById("dice").value == 6) {
                    obj.isPlaying = "true";
                    socket.send(JSON.stringify(new Message("NewPawnOnTheBoard", player.idGame, obj.playerId, obj.startX, obj.startY, null, null, obj.steps, obj.color, null, null)));
                }
            }
            else {
                let diceColor = document.getElementById("dice").style.backgroundColor;
                /*
                    Send message to move the pawn with steps equal to the dice value
                */
                socket.send(JSON.stringify(new Message("MovePawn", player.idGame, obj.playerId, obj.x, obj.y, obj.directionX, obj.directionY, obj.steps, obj.color, document.getElementById("dice").value, diceColor)));
            }
        }
    });
    this.target.addEventListener("mouseover",function(){
        if(obj.color=="red"&&player.colorOfPlayer=="red"){
            obj.target.src="images/redPawnB.png";
        }
        else{
            if(obj.color=="yellow"&&player.colorOfPlayer=="yellow"){
                obj.target.src="images/yellowPawnB.png";
            }
        }
        
    });
    this.target.addEventListener("mouseleave",function(){
        if(obj.color=="red"){
            obj.target.src="images/redPawn.png";
        }
        else{
            obj.target.src="images/yellowPawn.png";
        }
    });

}
Pawn.prototype.setToStart = function (posX, posY)                              //set the start position of the element
{
    this.isPlaying = "true";
    this.x = posX;
    this.y = posY;
    this.target.style.top = this.y + 2 + "px";
    this.target.style.left = this.x + 2 + "px";
    turnPlayed = "true";

}

Pawn.prototype.movePosNew = function (posX, posY, dirX, dirY) {                 //set the new coordinates to the element
    this.x = posX;
    this.y = posY;
    this.target.style.left = this.x + 2 + "px";                                   
    this.target.style.top = this.y + 2 + "px";
    this.directionX = dirX;
    this.directionY = dirY;
    for (let i = 0; i < pawns.length; i++)                                         //check if this pawn has the same position on the board with other
    {
        let pawn = pawns[i];
        if (this.x == pawn.x && this.y == pawn.y && this.color != pawn.color)          //ckeck if the positions are same and also the color
        {                                                                              //if true the another pawn is returned to home and start the circle again
            pawn.x = pawn.NotPlayPosX;                                                  //position in the home
            pawn.y = pawn.NotPlayPosY;
            pawn.target.style.left = pawn.x + "px";
            pawn.target.style.top = pawn.y + "px";
            pawn.isPlaying = "false";
            pawn.directionX = pawn.startDirX;                                           //the initial direction of movement
            pawn.directionY = pawn.startDirY;
            pawn.steps = 0;
        }
    }
    turnPlayed = "true";                                                                //make the turn played

}

function startGameRed() {
    let redPlayer1 = new Pawn(0, 96, 96, "red", "images/redPawn.png", 48, 288, 1, 0, "false");//position in the home, color, image, the start position, direction,direction
    pawns.push(redPlayer1);
    console.log(redPlayer1);
    let redPlayer2 = new Pawn(1, 96, 144, "red", "images/redPawn.png", 48, 288, 1, 0, "false"); //x,y
    pawns.push(redPlayer2);
    let redPlayer3 = new Pawn(2, 144, 96, "red", "images/redPawn.png", 48, 288, 1, 0, "false");
    pawns.push(redPlayer3);
    let redPlayer4 = new Pawn(3, 144, 144, "red", "images/redPawn.png", 48, 288, 1, 0, "false");
    pawns.push(redPlayer4);
}

function startGameYellow() {
    let yellowPlayer1 = new Pawn(4, 720 - 4 * 48, 720 - 4 * 48, "yellow", "images/yellowPawn.png", 720 - 2 * 48, 720 - 7 * 48, -1, 0, "false");
    pawns.push(yellowPlayer1);
    let yellowPlayer2 = new Pawn(5, 720 - 4 * 48, 720 - 3 * 48, "yellow", "images/yellowPawn.png", 720 - 2 * 48, 720 - 7 * 48, -1, 0, "false");
    pawns.push(yellowPlayer2);
    let yellowPlayer3 = new Pawn(6, 720 - 3 * 48, 720 - 4 * 48, "yellow", "images/yellowPawn.png", 720 - 2 * 48, 720 - 7 * 48, -1, 0, "false");
    pawns.push(yellowPlayer3);
    let yellowPlayer4 = new Pawn(7, 720 - 3 * 48, 720 - 3 * 48, "yellow", "images/yellowPawn.png", 720 - 2 * 48, 720 - 7 * 48, -1, 0, "false");
    pawns.push(yellowPlayer4);
    timer();
}

function playAudio() {              //play the audio
    x.play();
}

function rollTheDice() {
    let color = document.getElementById("dice").style.backgroundColor;
    console.log(player.colorOfPlayer + " " + color);
    if (player.colorOfPlayer == color) {
        playAudio();                    //perform the audio on every click on the dice
        player.diceClicked = "true";
        let x = Math.floor(Math.random() * 6) + 1;            //choose a random number between 1 and 6
        document.getElementById("dice").value = x;        //set the new value to the dice
        turnPlayed = "false";                             //set the turn to false
        //document.getElementById("dice").style.backgroundColor = turns[0];
        if (isSmbPlay(color) == "false" && document.getElementById("dice").value != 6) {
            if (color == "red") color = "yellow";
            else color = "red";
        }
        let message = new Message("DiceValue", player.idGame, null, null, null, null, null, null, null, x, color); //send message to the server about the new dice value
        socket.send(JSON.stringify(message));
    }
}


function isSmbPlay(color) {         //Check if the player has pawns which are active on the board
    for (let i = 0; i < pawns.length; i++) {
        if (pawns[i].isPlaying == "true" && color == pawns[i].color) return true;
    }
    return "false";
}

function timer()
{
    var clock = document.getElementById("time");
    let time = 0;
    setInterval(function(){
        
        if(time%60<10)clock.innerHTML="Time played: "+Math.floor(time/60)+":0"+Math.floor(time%60);
        else clock.innerHTML="Time played: "+Math.floor(time/60)+":"+Math.floor(time%60);

        time++;
    },1000);
}

