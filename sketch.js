const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground, rope2, rope3;
var fruit_con;
var fruit_con_2;

let canW, canH

var bg_img;
var food;
var rabbit;

var button,button2,button3;
var bunny;
var blink,eat,sad;
let eatingSound, ropeCut, cutSound, sound1, airSound, sadSound
let blower,muteButton 


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  eatingSound = loadSound("eating_sound.mp3")
  ropeCut = loadSound("rope_cut.mp3")
  cutSound = loadSound("Cutting Through Foliage.mp3")
  sound1 = loadSound("sound1.mp3")
  airSound = loadSound("air.wav")
  sadSound = loadSound("sad.wav")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  let isMobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    canW = displayWidth
    canH = displayHeight
    createCanvas(canW+80,canH);
  }else{
    canW = windowWidth
    canH = windowHeight
    createCanvas(windowWidth,windowHeight);
  }
  
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
 
  sound1.play()
  sound1.setVolume(0.5)


  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  button2 = createImg('cut_btn.png')
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png')
  button3.position(430,170);
  button3.size(50,50);
  button3.mouseClicked(drop3);  

  rope = new Rope(7,{x:40,y:30});
  rope2 = new Rope(8,{x:370,y:40})
  rope3 = new Rope(7,{x:460,y:180})


  ground = new Ground(canW/2,canH,canW,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20; 

  bunny = createSprite(230,canH-80);
  bunny.scale = 0.2;
  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  //blower = createImg ('balloon.png ')
  //blower.position(10,250)
  //blower.size(150,100)
  //blower.mouseClicked(airBlow)

  muteButton = createImg ( "mute.png ")
  muteButton.position(canW-150,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit)
  fruit_con_3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  

}

function draw() 
{
  background(51);
  image(bg_img,canW/2,canH/2,canW,canH);

  if(fruit!=null){
    //push()
    //imageMode(CENTER)
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope2.show()
  rope3.show()

  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    
    bunny.changeAnimation('eating');
    eatingSound.play()                         
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     sadSound.play()
   }

   drawSprites();
}

function drop()
{
  cutSound.play()
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  cutSound.play()
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}

function drop3()
{
  cutSound.play()
  rope3.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airBlow(){

  Matter.Body.applyForce(fruit,{x:0 , y:0},{x:0.01 , y: 0})
  airSound.play()

}

function mute(){

  if(sound1.isPlaying()){
    sound1.stop()

  }else {
    sound1.play()
  }
}