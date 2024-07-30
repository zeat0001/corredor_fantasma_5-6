  
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}


function draw() {
  background(255);

  if(tower.y > 400){
    tower.y = 300;
  }
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
      //escribir aquí el código para mover el fantasma a la izquierda al presionar la flecha izquierda
      ghost.x = ghost.x -3
    }
    if(keyDown("right_arrow")){
      //escribir aquí el código para mover el fantasma a la derecha al presionar la flecha derecha
      ghost.x = ghost.x + 3
    }
    if(keyDown("space")){
      //escribir aquí el código para mover el fantasma hacia arriba al presionar la flecha hacia arriba
      ghost.velocityY = -5;
    }
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
   
      //escribir una condición para desplazar infinitamente la torre
    
      spawnDoors();

  
      //escribir el código para hacer que climbersGroup colisione con el fantasma y cambiar la velocidad del fantasma  
      if(climbersGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }
//escribir aquí el código para hacer que invisibleBlockGroup colisione con el fantasma, destruir el fantasma y cambiar gamestate a end.
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end";
      } 
  
  drawSprites();
}
  if (gameState === "end"){
    stroke("black");
    fill("black");
    textSize(30);
    text("Fin del juego", 230,250)
  }
}

function spawnDoors()
 {
  //escribir aquí el código para aparecer los obstáculos
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    //agregar la función random
    //
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //cambiar la profundidad del fantasma y de la puerta
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
     

    
    //asignar lifetime a obstacle.lifetime = 300; aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    //agregar cada obstáculo al grupo obstaclesGroup.add(obstacle);aquí los obstáculos son la puerta, la barandilla y el bloque invisible
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
