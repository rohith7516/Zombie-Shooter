var bgImage,player,playerImage;
var zombie,zombieImage;
var edges,bullet,bulletImage,bulletSound;
var zombieGroup,bulletGroup;
var score =0;
var gameState="play";
var gameOverSound;
var restart,restartImage;

function preload(){
bgImage=loadImage("BG2.jpg");
playerImage=loadImage("soldier2.png");
zombieImage=loadImage("zombie1-.png")
bulletImage=loadImage("Bullet.png");
bulletSound=loadSound("Bullet sound.mp3")
gameOverSound=loadSound("End2.mp3");
restartImage=loadImage("Restart Image.png");
}


function setup() {
createCanvas(800,500);
//creating sprite for player
player=createSprite(50,400, 50, 50);
player.addImage(playerImage);
player.scale=0.3;
//player.setCollider("circle",0,0,300);
//creating sprite for restart button
restart=createSprite(400,300);
restart.addImage(restartImage);
restart.scale=0.5;
restart.visible=false;
//creating edge sprites 
edges=createEdgeSprites()
//creating group for zombies and bullets
zombieGroup=new Group()
bulletGroup=new Group()
}

function draw() {
  background(bgImage);
  text("Score: "+score,700,50);
//playstate  
if(gameState==="play"){

createZombie();
//To move the player
if(keyDown(UP_ARROW)){
player.y=player.y-5
}  
if(keyDown(DOWN_ARROW)){
  player.y=player.y+5
} 
if(keyDown(LEFT_ARROW)){
  player.x=player.x-5
} 
if(keyDown(RIGHT_ARROW)){
player.x=player.x+5
} 
//To shoot the bullet
if(keyDown("SPACE")){
  bullet=createSprite(145,400,50,50);
  bullet.addImage(bulletImage);
  bullet.scale=0.05;
  bullet.velocityX=10;
  bullet.y=player.y;
  bulletGroup.add(bullet);
  bulletSound.play();
}
//To destroy the zombies
if(bulletGroup.isTouching(zombie)){
zombieGroup.destroyEach();
score=score+5;
}
player.bounceOff(edges);
//To end the game
if(zombieGroup.isTouching(player)){
gameState="end"
  }

}
//endstate
if(gameState==="end"){
 // gameOverSound.play()
  restart.visible=true;
 textSize(70);
 fill(0);
 text("Game Over",200,200);
 player.visible=false;
 zombieGroup.destroyEach();
 if(mousePressedOver(restart)){
reset();
  
}

 }
  drawSprites();


}
//Creating zombies
function createZombie(){
if(frameCount%60===0){
zombie=createSprite(800,400,50,50)
zombie.velocityX=-(6+score/25);
zombie.addImage(zombieImage);
zombie.scale=0.3;
zombie.y=Math.round(random(275,450));
zombieGroup.add(zombie);
}




}
//To reset the game
function reset(){
gameState="play";
restart.visible=false;
score=0;
player.visible=true;

}
