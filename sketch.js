var balloon;
var balloonImage, balloonAnimation, bg;
var database;

function preload(){

  bg = loadImage("background.png");

  balloonImage = loadImage("Balloon1.png");
  balloonAnimation = loadAnimation("Balloon1.png", "Balloon2.png", "Balloon3.png");

  // balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
  //  balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
  //  "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
  //  "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");

}

function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonAnimation);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonAnimation);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonAnimation);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonAnimation);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
 // console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

// function setup() {

//   database=firebase.database();

//   createCanvas(500,500);

//   balloon = createSprite(200, 225, 10, 10);
//   balloon.addAnimation("hotAirBalloon", balloonImage);
//   balloon.scale = 0.75;

//   //balloon.addAnimation(hotairballoon2Img, hotairballoon3Img, hotairballoon4Img);

// }

// function draw() {
//   background(bg);
  
//   // if(keyDown(LEFT_ARROW)){

//   //   balloon.x = balloon.x -10;
    
//   // }
//   // else if(keyDown(RIGHT_ARROW)){

//   //   balloon.x = balloon.x + 10;

//   // }
//   // else if(keyDown(UP_ARROW)){

//   //   balloon.y = balloon.y -10;

//   // }
//   // else if(keyDown(DOWN_ARROW)){

//   //   balloon.y = balloon.y + 10;

//   // }

//   if(keyDown(LEFT_ARROW)){
//     updateHeight(-10,0);
//     balloon.addAnimation("hotAirBalloon",balloonAnimation);
//   }
//   else if(keyDown(RIGHT_ARROW)){
//     updateHeight(10,0);
//     balloon.addAnimation("hotAirBalloon",balloonAnimation);
//   }
//   else if(keyDown(UP_ARROW)){
//     updateHeight(0,-10);
//     balloon.addAnimation("hotAirBalloon",balloonAnimation);
//     balloon.scale=balloon.scale -0.005;
//   }
//   else if(keyDown(DOWN_ARROW)){
//     updateHeight(0,+10);
//     balloon.addAnimation("hotAirBalloon",balloonAnimation);
//     balloon.scale=balloon.scale+0.005;
//   }

//   drawSprites();
//   fill(0);
//   stroke("white");
//   textSize(25);
//   text("Use arrow keys to move Hot Air Balloon!",40,40);
// }

// function updateHeight(x,y){
//   database.ref('balloon/height').set({
//     'x': height.x + x ,
//     'y': height.y + y
//   })
// }

// function readHeight(data){

//   height = data.val();
//   balloon.x = balloon.x;
//   balloon.y = balloon.y;

// }

// function showError(){

//   console.log("Error in writing to the database");

// }