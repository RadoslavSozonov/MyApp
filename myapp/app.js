var express = require("express");
var http = require("http");
const websocket = require("ws");
var foo = require("./public/javascripts/moveFunction");
var Message = require("./public/javascripts/messageClass");
var module = require("./public/javascripts/MessageTypes");
var MessageTypes = module.MessageTypes;
//let mee = new Message()
var port = process.argv[2];
var app = express();
var ServerStats = function () {                   //Keeps track of the game stats:
  this.numOfPlayers = 0;                          //number of all players
  this.numGamesFinished = 0;                      //the number of finshed games
  this.numOfGames = 0;                            //the number of all games
  this.numActiveGames = 0;                        // the number of active games
}
var gameStats = new ServerStats();
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('splash.ejs', {                      //sends the stats to the splash screen
    numOfPlayers: gameStats.numOfPlayers, 
    numGamesFinished: gameStats.numGamesFinished,
    numOfGames: gameStats.numOfGames,
    numActiveGames: gameStats.numActiveGames
  });
})

app.get("/", function (req, res) {
  res.sendFile("splash.html", { root: "./public" });
});
let websockets = [];                                          //keep track of the webSockets adresses
let Games = [];                                               //keep track of the game. Objects of type games are pushed here
let playerCounter = 0;                                        //count the players
app.use(express.static(__dirname + "/public"));
const server = http.createServer(app).listen(port);
const wss = new websocket.Server({ server });                 //create a server
let gamesCounter = 0;                                         //count the games




/*
    Object Game - keeps track of the game as gameId and players' sockets adresses
*/
var Game = function (gameID) {            
  this.playerRedSocket = null;
  this.playerYellowSocket = null;
  this.id = gameID;
  this.turnRed = true;
}
wss.on("connection", function (ws) {                   // on connection - create a new player 
  let con = ws;                                       //create a variable to keep track of the socket
  //let a = new Message("NewPlayerHasCome", null, null, null, null, null, null, null, null, null);
  if (gameStats.numOfPlayers % 2 == 0) con.send(JSON.stringify(new Message(MessageTypes[6], "red", null, null, null, null, null, null, "red", null, "red")));//send info to the client who is first
  //else con.send(colors[1]);
  //playerCounter++;                                     //increment the number of players
  gameStats.numOfPlayers++;
  con.id = gameStats.numOfGames;                                //give to that socket id of the game number
  con.send(JSON.stringify(new Message(MessageTypes[5], gameStats.numOfGames, null, null, null, null, null, null, null, null, null)));//send info to the clint
  websockets.push(con);                               //push the socket in the websockets
  if (websockets.length == 2) {                       //check if the length of the array is two. When the array becomes of size to the two sockets' adresses are popped out
    let game = new Game(gameStats.numOfGames);                //create a Game object and intialize the two players sockets
    game.playerYellowSocket = websockets.pop();
    game.playerRedSocket = websockets.pop();
    Games.push(game);                                 //push the object in the array of Games
    game.playerRedSocket.send(JSON.stringify(new Message(MessageTypes[6], "null", null, null, null, null, null, null, "yellow", null, "red")));//send info to the clients depending on the message and also their colors
    game.playerYellowSocket.send(JSON.stringify(new Message(MessageTypes[6], "yellow", null, null, null, null, null, null, "red", null, "red")));
    game.playerYellowSocket.send(JSON.stringify(new Message(MessageTypes[6], "null", null, null, null, null, null, null, "yellow", null, "red")));
    game.playerRedSocket.send(JSON.stringify(new Message(MessageTypes[7], null, null, null, null, null, null, null, null, null, "red")));
    //gamesCounter++;                                   //increament the game counter
    gameStats.numOfGames++;
    gameStats.numActiveGames++;                       //increament the active games
  }
  ws.on("message", function incoming(messageJson) {         //receive message of JSON format and convert to JS
                                                            //Depending of the message of the client the diffrent if cases do differnt things
    var message = JSON.parse(messageJson);
    if (message.messageType == MessageTypes[2]) {               
      //console.log(message);                               //Send to the both the dice value
      let sendInfoToGame = Games[message.idGame];           //find the game id in the Games array
      sendInfoToGame.playerRedSocket.send(JSON.stringify(message)); //send to the both client the new information
      sendInfoToGame.playerYellowSocket.send(JSON.stringify(message));
    }
    if (message.messageType == MessageTypes[1]) {       //Send the new pawn on the board
      let sendInfoToGame = Games[message.idGame];           //find the game id in the Games array
      sendInfoToGame.playerRedSocket.send(JSON.stringify(message));     //send to the both client the new information
      sendInfoToGame.playerYellowSocket.send(JSON.stringify(message));
    }
    if (message.messageType == MessageTypes[0]) {              //send the movement of the pawn on the board
      let sendInfoToGame = Games[message.idGame];         //find the game id in the Games array
      //console.log(message);
      let info = foo(message);
      sendInfoToGame.playerRedSocket.send(JSON.stringify(info));    //send to the both client the new information
      sendInfoToGame.playerYellowSocket.send(JSON.stringify(info));
    }
    if (message.messageType == MessageTypes[3])                  //Send info who has won
    {
      let sendInfoToGame = Games[message.idGame];         //find the game id in the Games array
      sendInfoToGame.playerRedSocket.send(JSON.stringify(message));   //send to the both client the new information
      sendInfoToGame.playerYellowSocket.send(JSON.stringify(message));
    }
  });

  con.on("close", function incoming() {
    var message = new Message(MessageTypes[4], null, null, null, null, null, null, null, null, null, null);
    let sendInfoToGame = Games[con.id];           //find the game id in the Games array. The first game is with id 0 and is in the array cell with index 0
    sendInfoToGame.playerRedSocket.send(JSON.stringify(message));//send to the both client the new information
    sendInfoToGame.playerYellowSocket.send(JSON.stringify(message));
    gameStats.numActiveGames--;                 //decreament the respective game statistics
    gameStats.numGamesFinished++;
    gameStats.numOfPlayers--;
  });


});
