var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(800,400);
  
  monkey = createSprite(100,340,20,50); 
  monkey.addAnimation("Running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,375,800,10);
  ground.velocity.X=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  ground.shapeColor="darkgreen";
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
}


function draw() {
  background("lightgreen");
  
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score=score+2;
     }
  if(obstacleGroup.isTouching(monkey)){
     score=score-4;
     }
  
  drawSprites();
  Food();
  Obstacle();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,700,40);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,25,40);
  
}

function Food(){
  
  if (frameCount % 80 === 0) {
    banana=createSprite(500,250,40,10); 
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX=-5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
    }
}
function Obstacle() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,350,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}