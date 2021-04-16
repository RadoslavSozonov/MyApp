/*
    Information of the messages which the server/client receives or sends 
*/

module.exports = function (typeOfmessage, gameId, pawnId, posX, posY, dirX, dirY, stepsPawn, colorPawn, diceValue, colorOfDice) {
    this.messageType = typeOfmessage;
    this.idGame = gameId;
    this.idPawn = pawnId;
    this.x = posX;
    this.y = posY;
    this.directionX = dirX;
    this.directionY = dirY;
    this.steps = stepsPawn;
    this.color = colorPawn;
    this.dice = diceValue;
    this.diceColor = colorOfDice;
  }

