var harrypotter,harryImage
var back, invisibleground
var potion,potionImage,potion2Image
var voldemort,voldemortImage
var score=0
var PLAY=1
var END=0
var gameState=1
var deadImage,dead
var restart,restartImage

function preload(){
  harryImage=loadImage("harry potter.png")
  backgroundImage=loadImage("hogwarts.webp")
  potionImage=loadImage("potions.png")
  potion2Image=loadImage("Potion2.png")
  voldemortImage=loadImage("volde1.png")
  deadImage=loadImage("dead.jpg")
  restartImage=loadImage("restart.jpeg")
}

function setup() {
 createCanvas(600,400)
  
  back= createSprite(300,200)
  back.addImage(backgroundImage)
  back.scale=0.7
  
  invisibleground=createSprite(0,340,1200,10)
  invisibleground.visible=false
  
  harrypotter=createSprite(50,300,10,10)
  harrypotter.addImage(harryImage)
  harrypotter.scale=0.3
  
  dead=createSprite(300,100,10,10)
  dead.addImage(deadImage)
  dead.scale=0.3
  
  restart=createSprite(300,200,10,10)
  restart.addImage(restartImage)
  restart.scale=0.3
  
  potionsGroup=createGroup()
  voldemortGroup=createGroup()
}

function draw() {
  
 if(gameState===PLAY) {
    if(potionsGroup.isTouching(harrypotter)){
     potionsGroup.destroyEach() 
      score=score+1
  }

    if((keyDown("space") || touches.length>0)&& harrypotter.y >= windowHeight-70){
      harrypotter.velocityY=-7
      touches=[]
    }
   
   if(voldemortGroup.isTouching(harrypotter)){
     gameState=END
   }
 
  harrypotter.velocityY=harrypotter.velocityY+0.8
  harrypotter.collide(invisibleground)
    
  spawnPotions()
  Enemy()
   
  dead.visible=false
  restart.visible=false
 }
  
  if(gameState===END){
    if(voldemortGroup.isTouching(harrypotter)){
      voldemortGroup.destroyEach()
      harrypotter.visible=false
  }
    potionsGroup.setVelocityXEach(0)
    voldemortGroup.setVelocityXEach(0)
    
    if(mousePressedOver(restart) || touches.length>0 || keyDown("space")){
      reset() 
      touches=[]
        }
    
    dead.visible=true
    restart.visible=true
  }
 drawSprites()
  stroke("white")
  fill("white")
  textSize(16)
  text("Score: "+ score, 500,50);
}

function spawnPotions(){
 if(frameCount%200===0){
  potion=createSprite(590,200,10,10)
  var selectpotion=Math.round(random(1,2))
     switch (selectpotion){
      case 1:
           potion.addImage(potionImage)
         break
      case 2:
          potion.addImage(potion2Image)
         break
         default: break;
  }
   potion.scale=0.2
   potion.velocityX=-5
   potionsGroup.add(potion)
 }
}

function Enemy(){
  if(frameCount%300===0){
    voldemort=createSprite(590,300,10,10)
    voldemort.addImage(voldemortImage)
    voldemort.scale=0.2
    voldemort.velocityX=-5
    voldemortGroup.add(voldemort)
  }
}

function reset(){
  gameState=PLAY
  voldemortGroup.destroyEach()
  potionsGroup.destroyEach()
  harrypotter.visible=true
  score=0
}