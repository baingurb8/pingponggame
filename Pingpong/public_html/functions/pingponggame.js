/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


const canvas = document.getElementById("pong");
const content = canvas.getContext('2d');

canvas.addEventListener("mousemove", getMousePos);//allows mouse interaction


//creates the ping pong ball
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 8,
    velocityX : 8,
    velocityY : 8,
    speed : 7,
    color : "RED"
}


const user = {// creates user paddle
    x : 0, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 85,
    score : 0,
    color : "PURPLE"
}

const com = { //creates computer paddle
    x : canvas.width - 10, 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 85,
    score : 0,
    color : "GREEN"
}


function drawRect(x, y, w, h, color){ //draws rectangle for the paddles
    content.fillStyle = color;
    content.fillRect(x, y, w, h);
}

function drawArc(x, y, r, color){//draws a circle for the ping pong ball
    content.fillStyle = color;
    content.beginPath();
    content.arc(x,y,r,0,Math.PI*2,true);
    content.closePath();
    content.fill();
}

function getMousePos(evt){ //allows user to interact with the mouse
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}


function resetBall(){ //resets the ball everytime a point is scored
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

function drawText(text,x,y){ // draws rext to display scores
    content.fillStyle = "YELLOW";
    content.font = "80px arial";
    content.fillText(text, x, y);
}


function collision(b,p){ //checks if ball was hit 
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}
 //function from CodeExplainedRepo link: https://github.com/CodeExplainedRepo/Ping-Pong-Game-JavaScript



function calc(){
    
    //determines who has scored a point, updates score and a message is displayed
    if( ball.x - ball.radius < 0 ){
        alert("One Point to Computer");
        com.score++;
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        alert("You've won a point, CONGRATS!");
        user.score++;
        resetBall();
    }
    
    
    
    
    ball.x += ball.velocityX; 
    ball.y += ball.velocityY;
    // gives the ball velocity 
    
    com.y += ((ball.y - (com.y + com.height/2)))*0.1; //AI mechanics
    
    //when the ball is hit 
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
        
    }
    
    
    let player = (ball.x + ball.radius < canvas.width/2) ? user : com; //checks if ball is hit by computer or the user
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        
       
        
        let collidePoint = (ball.y - (player.y + player.height/2));
        
        collidePoint = collidePoint / (player.height/2);
        
        
        let angleRad = (Math.PI/4) * collidePoint;
        
        
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        //speeds up the ball everytime a paddle hits it
        ball.speed += 0.4;
    }
}
// calculations of ball hitting paddles/walls and AI from CodeExplainedRepo
// link: https://github.com/CodeExplainedRepo/Ping-Pong-Game-JavaScript

function winner (){ //determines a winner and displays winner when 20 points is scored 
    
    if (user.score > 19 && com.score < 20){
        
        alert("YOU WIN, CONGRATS!");
        user.score = 0;
        com.score = 0;
        resetBall();
    }
    else if(com.score > 19 && user.score < 20){
        alert("Computer Wins");
        user.score = 0;
        com.score = 0;
        resetBall();
    }
}


function drawing(){//draws all the elements 
    
    drawRect(0, 0, canvas.width, canvas.height, "#000"); //draws the canvas
    drawText(user.score,canvas.width/5,canvas.height/5);//draws user score
    drawText(com.score,3*canvas.width/4,canvas.height/5);//draws computer score
    drawRect(user.x, user.y, user.width, user.height, user.color);//draws user paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);//draws computer paddle
    drawArc(ball.x, ball.y, ball.radius, ball.color);//draws ping pong ball
}

function game(){//function which runs the game
    calc();//calls calc function
    drawing();///calls draw function
    winner ();//calls winner function
}

let framePerSecond = 50;
//calls the game function 50 times per second
let loop = setInterval(game,1000/framePerSecond);
