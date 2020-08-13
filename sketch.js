var player1,villain,edges,p2,p3,p4;
var backgroundImg,captinamericaimg,thanosimg,lazerimg,looseimg,lazers;
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var scale = 2;
var animationimg;
var reset;
var shieldgroup;
function preload() {
  backgroundImg=loadImage("battle.jpg");
  winimge=loadImage("download.png")
  ironmanimg=loadImage("ironman.png")
  winsound=loadSound("Ta-da-sound.mp3")
  spidermanimg=loadImage("spiderman.png")
  hulkImg=loadImage("Hulk.png")
  thorimg=loadImage("thor.png")
  lazersound=loadSound("lazer.mp3")
  //captinamericaimg = loadImage("captin.png");
  //thanosimg=loadImage("Thanos.png");
  lazerimg=loadImage("lazer.png")
  playerimg = loadImage("captin.png")

  looseimg=loadImage("looses.png");
  animationimg=loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","12.png")
  shieldimg = loadImage("shield.png");
}
function setup(){
  //canvas is created
  canvas=createCanvas(windowWidth,windowHeight);

  //player1 is created
  player1 = new player(200,590,200,200);
  player1.sprite.addImage("play",playerimg);
  player1.sprite.addAnimation("loose",looseimg);
  player1.sprite.addAnimation("attack",animationimg);

  playerimg.resize(100, 300);
reset = createSprite(20,20,100,100);
reset.visible=false;
 
  player1.sprite.depth = 1;
  player1.sprite.setCollider("rectangle",0,0,100,100)
  lazersgroup= new Group();

  shieldgroup=new Group()
  
  
  villain = new Villians(1300,300,200,200);
  villain.sprite.setCollider("rectangle",0,0,100,100)
  villain.sprite.debug=true;
  villain.sprite.depth=1;
  console.log(villain.sprite.depth)
  
    randomvelocity();




}
function draw(){
  background(backgroundImg);
  if(villain.sprite.collide(player1.sprite)){
player1.sprite.changeAnimation("loose")
  }
  if(gameState===PLAY){
    spawnlazers();

    if(keyWentDown("SHIFT")){
    
  
      player1.sprite.changeAnimation("attack");
      spawnshield();
    }
    else if (keyWentUp("SHIFT")){

      player1.sprite.changeImage("play");
      
    }
   
    
    
    
    if(lazersgroup.collide(player1.sprite)){
      gameState=END
      player1.sprite.changeImage("loose");
    }
  }

  else if(gameState===END){
picture();



  }
  if(gameState===WIN){
var youwin = createSprite(800,100,20,20);
youwin.addImage(winimge)
player1.sprite.y=590;
player1.sprite.x=770;
var p2 = createSprite(600,590,20,20)
p2.addImage(ironmanimg);

p2.scale=0.5
var p3 = createSprite(1000,590,20,20)

p3.addImage(spidermanimg);

var p4= createSprite(1200,590,20,20);
p4.addImage(hulkImg);

var p5= createSprite(400,590,20,20);
p5.addImage(thorimg)


  }
  edges = createEdgeSprites();
  villain.sprite.bounceOff(edges)
 player1.movement();
 player1.sprite.depth =1;
    //player1.display();
    villain.display();
    
  player1.sprite.debug = true;
    
    console.log(player1.sprite.depth);
    if(shieldgroup.collide(villain.sprite)){
      villain.sprite.remove();
      winsound.play();
      gameState=WIN
      
      } 

       
      
 
  drawSprites();
}

function randomvelocity()
{
    villain.sprite.velocityY = random(-7,7);
}

function spawnlazers(){
  if(frameCount % 40 === 0) {
    var lazers = createSprite(1060,200,10,10);
lazers.depth=1;
lazersound.play();
    lazers.addToGroup(lazersgroup);
    //lazers.visible=true;
    lazers.debug =true;
    lazers.x=villain.sprite.x;
    lazers.y=villain.sprite.y;
    lazers.addImage(lazerimg)
    lazers.velocityX = -6;
    
   } //console.log(lazers.depth);
    
  }
  function spawnshield(){
    
      var shield = createSprite(200,590,10,10);
  shield.depth=4;
  shield.scale = 0.1;
    shield.addToGroup(shieldgroup);
      //lazers.visible=true;
      shield.debug =true;
      shield.x=player1.sprite.x;
      shield.y=player1.sprite.y;
      shield.addImage(shieldimg)
      shield.velocityX = 6;
      
      //console.log(lazers.depth);
      
    

  }

  function picture()
  {
    
    lazersgroup.removeSprites();
    lazersgroup.setVelocityXEach(0);
  }


  

function resetbutton(){
  if(mousePressedOver(reset)){
    gameState=PLAY;
  }
}
