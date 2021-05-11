//Create variables here
var dog, happyDog, database, foodS, foodStock
var dog_Img, happy_Img
function preload()
{
	//load images here
  dog_Img = loadImage("images/dogImg.png");
  happy_Img = loadImage("images/dogImg1.png")
  
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database()

  dog=createSprite(250,300);
  dog.addImage(dog_Img)
  dog.scale = 0.15;
  foodStock = database.ref("Food");
  foodStock.on("value", readStock)
  
}


function draw() {  
  background("black")

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happy_Img);
  }

  drawSprites();
  fill("blue")
  stroke("blue")
  textSize(15)
  text("Food Remaining:" + foodS, 170,100)
  text("Note: press Up arrow to feed the dog", 130,10, 300,20)
  //add styles here
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



