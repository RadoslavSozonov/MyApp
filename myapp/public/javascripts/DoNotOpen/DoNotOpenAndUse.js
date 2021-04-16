/* let steps=document.getElementById("dice").value;                        //take the dice's value and perform the movements respectively
        for(let i=0;i<steps;i++){
            if(this.directionX==1)                                              //if x is 1 goes right
            {
                if(this.x>=0&&this.x<288)                                       //check the position of the element on the board
                {
                    if(this.x+48>=288)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.x+=48;                                             //goes one right
                        this.y-=48;                                             //goes one up
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going right
                        this.directionY=-1;                                     //change the direction now it goes up
                    }
                    else this.x+=48;                                            //else move the object with one position on the right
                }
                else if(this.x>=288&&this.x<432)                                //check the position of the element on the board
                {
                    if(this.x+48>=432)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.y+=48;                                             //goes one down
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going right
                        this.directionY=1;                                      //change the direction now it goes down
                    }
                    else this.x+=48;                                            //else move the object with one position on the right
                }
                else if(this.x>=432&&this.x<720)                                //check the position of the element on the board
                {
                    if(this.x+48>=720)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.y+=48;                                             //goes one down
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going right
                        this.directionY=1;                                      //change the direction now it goes down
                    }
                    else this.x+=48;                                            //else move the object with one position on the right
                }
            }
            else if(this.directionX==-1)                                        //if x is -1 goes left
            {
                if(this.x>=432&&this.x<720)                                     //check the position of the element on the board
                {
                    if(this.x-48<432)                                           //control the movement for example the pawn to make a left or right turn
                    {
                        this.x-=48;                                             //goes one left
                        this.y+=48;                                             //goes one down
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going left
                        this.directionY=1;                                      //change the direction now it goes down
                    }
                    else this.x-=48;                                            //else move the object with one position on the left
                }
                else if(this.x>=288&&this.x<480)                                //check the position of the element on the board
                {
                    if(this.x-48<288)                                           //control the movement for example the pawn to make a left or right turn
                    {
                        this.y-=48;                                             //goes one up
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going left
                        this.directionY=-1;                                     //change the direction now it goes up
                    }
                    else this.x-=48;                                            //else move the object with one position on the left
                }
                else if(this.x>=0&&this.x<288)                                  //check the position of the element on the board
                {
                    if(this.x-48<0)                                             //control the movement for example the pawn to make a left or right turn
                    {
                        this.y-=48;                                             //goes one up
                        this.directionX=0;                                      //x becomes 0 and the pawn stop going left
                        this.directionY=-1;                                     //change the direction now it goes up
                    }
                    else this.x-=48;                                            //else move the object with one position on the left
                }
            }
            else if(this.directionY==-1)                                        //if y is -1 goes up
            {
                if(this.y>=432&&this.y<720)                                     //check the position of the element on the board
                {
                    if(this.y-48<432)                                           //control the movement for example the pawn to make a left or right turn
                    {
                        this.y-=48;                                                 //goes one up
                        this.x-=48;                                             //goes one left
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going up
                        this.directionX=-1;                                     //change the direction now it goes left
                    }
                    else this.y-=48;                                            //else move the object with one position on the up
                }
                else if(this.y>=288&&this.y<432)                                //check the position of the element on the board
                {
                    if(this.y-48<288)                                           //control the movement for example the pawn to make a left or right turn
                    {
                        this.x+=48;                                             //goes one right
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going up
                        this.directionX=1;                                     //change the direction now it goes right
                    }
                    else this.y-=48;                                            //else move the object with one position on the up
                }
                else if(this.y>=0&&this.y<288)                                  //check the position of the element on the board
                {
                    if(this.y-48<0)                                             //control the movement for example the pawn to make a left or right turn
                    {
                        this.x+=48;                                             //goes one right
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going up
                        this.directionX=1;                                      //change the direction now it goes right
                    }
                    else this.y-=48;                                            //else move the object with one position on the up
                }
            }
            else if(this.directionY==1)                                         //if y is 1 goes down
            {
                if(this.y>=0&&this.y<288)                                       //check the position of the element on the board
                {
                    if(this.y+48>=288)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.y+=48;                                             //goes one down
                        this.x+=48;                                             //goes one right
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going down
                        this.directionX=1;                                      //change the direction now it goes right
                    }
                    else this.y+=48;                                            //else move the object with one position on the down
                }
                else if(this.y>=288&&this.y<432)                                //check the position of the element on the board
                {
                    if(this.y+48>=432)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.x-=48;                                             //goes one left
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going down
                        this.directionX=-1;                                     //change the direction now it goes left
                    }
                    else this.y+=48;                                            //else move the object with one position on the down
                }
                else if(this.y>=432&&this.y<720)                                //check the position of the element on the board
                {
                    if(this.y+48>=720)                                          //control the movement for example the pawn to make a left or right turn
                    {
                        this.x-=48;                                             //goes one left
                        this.directionY=0;                                      //y becomes 0 and the pawn stop going down
                        this.directionX=-1;                                    //change the direction now it goes left
                    }
                    else this.y+=48;                                            //else move the object with one position on the down
                }
            }
            //console.log(this.x+" "+this.y);

        }*/
        //console.log("");