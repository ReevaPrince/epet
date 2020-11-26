//Create variables here
var database;

var dog, dog_img, happydog_img, foodS, foodstock;

var feed, addStock;
var fedTime, lastFed;
var foodObj;

var namebox, namebutton, name;

var foodlimit = 20;

function preload() {
  //load images here
  dog_img = loadImage("dogImg.png");
  happydog_img = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  foodObj = new Food();

  feed = createButton("Feed");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addStock = createButton("Add food");
  addStock.position(750, 95);
  addStock.mousePressed(addFood);

  dog = createSprite(250, 350);
  dog.addImage("normal", dog_img);
  dog.scale = 0.15;

  database = firebase.database();

  foodstock = database.ref("Food");
  foodstock.on("value", data => foodS = data.val());


  database.ref("/").update({
    "Food": 20
  });

  fedTime = database.ref("feedTime");
  fedTime.on("value", data => lastFed = data.val());

  namebox = createInput("Unknown Dog");
  namebox.position(410, 50);

  namebutton = createButton("Name");
  namebutton.position(410, 75);
  namebutton.mousePressed(() => {
    name = namebox.value();
  });
}


function draw() {
  background(46, 139, 87);

  foodObj.display();

  drawSprites();
  //add styles here
  textSize(20);
  fill(255);
  textAlign(CENTER, CENTER);
  text(`Food Remaining: ${foodS}`, 250, 85);

  text(name, 230, 465);

  if (lastFed == 0) {
    text(`Last Feed: 12 AM`, 350, 30);
  } else if (lastFed >= 12) {
    text(`Last Feed: ${lastFed % 12} PM`, 350, 30);
  } else {
    text(`Last Feed: ${lastFed} AM`, 350, 20);
  }

  if (foodS >= foodlimit) {
    text("Food Limit Reached!", 350, 275);
  }

}

function feedDog() {
  dog.addImage("happy", happydog_img);
  dog.changeImage("happy");


  writeStock();
  database.ref("/").update({
    "feedTime": hour()
  })
}

function addFood() {

  if (foodS < foodlimit) {
    foodS++;
    database.ref("/").update({
      "Food": foodS
    });
  }
}

function writeStock() {

  foodS--;
  database.ref("/").update({
    "Food": foodS
  });

  if (foodS < 0) {
    foodS = 0
  }
}