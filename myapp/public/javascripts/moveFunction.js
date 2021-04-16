var Message = require("./messageClass");

module.exports = function (info) {
    let posX = info.x;
    let posY = info.y;
    let directionX = info.directionX;
    let directionY = info.directionY;
    let steps = info.dice;                        //take the dice's value and perform the movements respectively
    let stepsPawn = info.steps;
    for (let i = 0; i < steps; i++) {
        stepsPawn++;
        if (stepsPawn > 56) continue;           // if the pawn's steps are more than 56 skip iteration
        if (stepsPawn > 50 && stepsPawn <= 56) {        // the pawn goes to the end/final point depending on it color
            if (info.color == "red") {
                posX += 48;
            }
            else if (info.color == "yellow") posX -= 48;
            console.log(posX);
            continue;                           //skip iteration 
        }
        if (directionX == 1)                                              //if x is 1 goes right
        {
            if (posX >= 0 && posX < 288)                                       //check the position of the element on the board
            {
                if (posX + 48 >= 288)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posX += 48;                                             //goes one right
                    posY -= 48;                                             //goes one up
                    directionX = 0;                                      //x becomes 0 and the pawn stop going right
                    directionY = -1;                                     //change the direction now it goes up
                }
                else posX += 48;                                            //else move the object with one position on the right
            }
            else if (posX >= 288 && posX < 432)                                //check the position of the element on the board
            {
                if (posX + 48 >= 432)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posY += 48;                                             //goes one down
                    directionX = 0;                                      //x becomes 0 and the pawn stop going right
                    directionY = 1;                                      //change the direction now it goes down
                }
                else posX += 48;                                            //else move the object with one position on the right
            }
            else if (posX >= 432 && posX < 720)                                //check the position of the element on the board
            {
                if (posX + 48 >= 720)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posY += 48;                                             //goes one down
                    directionX = 0;                                      //x becomes 0 and the pawn stop going right
                    directionY = 1;                                      //change the direction now it goes down
                }
                else posX += 48;                                            //else move the object with one position on the right
            }
        }
        else if (directionX == -1)                                        //if x is -1 goes left
        {
            if (posX >= 432 && posX < 720)                                     //check the position of the element on the board
            {
                if (posX - 48 < 432)                                           //control the movement for example the pawn to make a left or right turn
                {
                    posX -= 48;                                             //goes one left
                    posY += 48;                                             //goes one down
                    directionX = 0;                                      //x becomes 0 and the pawn stop going left
                    directionY = 1;                                      //change the direction now it goes down
                }
                else posX -= 48;                                            //else move the object with one position on the left
            }
            else if (posX >= 288 && posX < 480)                                //check the position of the element on the board
            {
                if (posX - 48 < 288)                                           //control the movement for example the pawn to make a left or right turn
                {
                    posY -= 48;                                             //goes one up
                    directionX = 0;                                      //x becomes 0 and the pawn stop going left
                    directionY = -1;                                     //change the direction now it goes up
                }
                else posX -= 48;                                            //else move the object with one position on the left
            }
            else if (posX >= 0 && posX < 288)                                  //check the position of the element on the board
            {
                if (posX - 48 < 0)                                             //control the movement for example the pawn to make a left or right turn
                {
                    posY -= 48;                                             //goes one up
                    directionX = 0;                                      //x becomes 0 and the pawn stop going left
                    directionY = -1;                                     //change the direction now it goes up
                }
                else posX -= 48;                                            //else move the object with one position on the left
            }
        }
        else if (directionY == -1)                                        //if y is -1 goes up
        {
            if (posY >= 432 && posY < 720)                                     //check the position of the element on the board
            {
                if (posY - 48 < 432)                                           //control the movement for example the pawn to make a left or right turn
                {
                    posY -= 48;                                                 //goes one up
                    posX -= 48;                                             //goes one left
                    directionY = 0;                                      //y becomes 0 and the pawn stop going up
                    directionX = -1;                                     //change the direction now it goes left
                }
                else posY -= 48;                                            //else move the object with one position on the up
            }
            else if (posY >= 288 && posY < 432)                                //check the position of the element on the board
            {
                if (posY - 48 < 288)                                           //control the movement for example the pawn to make a left or right turn
                {
                    posX += 48;                                             //goes one right
                    directionY = 0;                                      //y becomes 0 and the pawn stop going up
                    directionX = 1;                                     //change the direction now it goes right
                }
                else posY -= 48;                                            //else move the object with one position on the up
            }
            else if (posY >= 0 && posY < 288)                                  //check the position of the element on the board
            {
                if (posY - 48 < 0)                                             //control the movement for example the pawn to make a left or right turn
                {
                    posX += 48;                                             //goes one right
                    directionY = 0;                                      //y becomes 0 and the pawn stop going up
                    directionX = 1;                                      //change the direction now it goes right
                }
                else posY -= 48;                                            //else move the object with one position on the up
            }
        }
        else if (directionY == 1)                                         //if y is 1 goes down
        {
            if (posY >= 0 && posY < 288)                                       //check the position of the element on the board
            {
                if (posY + 48 >= 288)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posY += 48;                                             //goes one down
                    posX += 48;                                             //goes one right
                    directionY = 0;                                      //y becomes 0 and the pawn stop going down
                    directionX = 1;                                      //change the direction now it goes right
                }
                else posY += 48;                                            //else move the object with one position on the down
            }
            else if (posY >= 288 && posY < 432)                                //check the position of the element on the board
            {
                if (posY + 48 >= 432)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posX -= 48;                                             //goes one left
                    directionY = 0;                                      //y becomes 0 and the pawn stop going down
                    directionX = -1;                                     //change the direction now it goes left
                }
                else posY += 48;                                            //else move the object with one position on the down
            }
            else if (posY >= 432 && posY < 720)                                //check the position of the element on the board
            {
                if (posY + 48 >= 720)                                          //control the movement for example the pawn to make a left or right turn
                {
                    posX -= 48;                                             //goes one left
                    directionY = 0;                                      //y becomes 0 and the pawn stop going down
                    directionX = -1;                                    //change the direction now it goes left
                }
                else posY += 48;                                            //else move the object with one position on the down
            }

        }
        //console.log(this.x+" "+this.y);

    }
    let color = info.diceColor;                 //change the dice color 
    if (steps != 6) {
        if (info.diceColor == "red") color = "yellow";
        else color = "red";
    }
    let newInfo = new Message("MovePawn", null, info.idPawn, posX, posY, directionX, directionY, stepsPawn, info.color, info.dice, color); //return new message to the server
    //console.log(newInfo);
    return newInfo;
}