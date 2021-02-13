
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

var PLAY=1
var ENd=0;
var gameState=1;

var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,450);
  
  monkey = createSprite(80,300,20,20);
   monkey.addAnimation("running", monkey_running);
  monkey.scale=0.15;

  ground = createSprite(400,350,1200,10);
  
  score=0;
  survivalTime=0;
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
}


function draw() {
  background("white");
  
 if(gameState===1){
   monkey.collide(ground);

   food();
   spawnObstacle();
   
   ground.velocityX=-4;
   ground.x=ground.width/2;
     
  
   
   if(keyDown("space")&& monkey.y>=298.95){
     monkey.velocityY=-15;
     
   }
   
   monkey.velocityY = monkey.velocityY+0.8;
  
   
   if(monkey.isTouching(FoodGroup)){
     score=score+2;
     FoodGroup.destroyEach();
   }
   else if(monkey.isTouching(obstacleGroup)){
     textSize(30)
          text("You Lose",200,200);

     gameState=0;
     
   }
 }
  
  if(gameState===0){
    monkey.velocity=0;
     FoodGroup.destroyEach();
     obstacleGroup.destroyEach();
    ground.velocityX = 0;
  }

  drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score = "+score,40,40);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time = "+survivalTime,340,40);
  
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(700,Math.round(random(120,200)),20,20);
    banana.addImage("banana", bananaImage);
    banana.velocityX=-4-score/2;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount%300===0){
    var obstacle=createSprite(700,315,20,20)
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-4-score/2;
    obstacleGroup.add(obstacle);
  }
}


