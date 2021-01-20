
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feed,addFood;

function preload()
{
  
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  background=loadImage("images/backgroundImg.png");
}

function setup() {

  database = firebase.database();
  console.log(database);
  
  createCanvas(500, 500);


  feed=createButton("Feed the dog");
  feed.position(500,70);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(600,70);
  addFood.mousePressed(addFoods);

  dog=createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale=0.2;

  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  
background();

if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDog);
}

dog.display();
  drawSprites();
  
  textSize(20);
  fill(255,255,254);
   text("Food Remaining:" + foodS, 250,480);
   text("Press Up Arrow Key To Feed Jack !!",120,80);

   
   textSize(15);
   if(lastFed>=12){
     text("last Feed :" + lastFed%12 + "PM" ,350,350 )
   }else if(lastFed==0){
     text("Last Feed : 12AM" , 350,350)
   }else{
     text("Last Feed :" + lastFed +"AM",350,350)
   }
}

function readStock(data){
  foodS=data.val();
  
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
     food:x
})

}
function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

function feedDog(){
    dog.addImage(happyDog);
    foodObject.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }