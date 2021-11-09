var war;
var heli,crashed;
var tank;
var gamestate = fly;
var target=0
var fly=1
var tankCount=0
var bullet
var score=0

function preload(){
war=loadImage("1.jpg")
heli=loadImage("heli1.png")
tank=loadImage("tank.png")
targeter=loadImage("target.png")
bullet=loadImage("bullets5 (1).png")
}

function setup() {
 createCanvas(600,400)
 warzone=createSprite(250,400)
 warzone.addImage(war)
 warzone.depth=0.5
 warzone.velocityY=4

 fighter=createSprite(300,300)
 fighter.addImage(heli)
 fighter.depth=2
 fighter.scale=0.5
 targetG=createGroup()
 tankG=createGroup()
 bulletG=createGroup()
 bullets=createSprite(fighter.x,fighter.y)
 bullets.visible=false
 bulletG.add(bullets)
}

function draw() {
 background(0)
 
    text ("score :"+score,200,300)

if (warzone.Y<2000) {
 warzone.Y=warzone.height/2
}
if(warzone.y>350){
    warzone.y=warzone.height/2
    }
    Tanks()

if (keyDown("space")) {
 gamestate=target
 targetG.destroyEach()
 missiles()

}
if (gamestate===target&&mouseIsPressed) {
    bullets.addImage(bullet)
    bullets.visible=true
    bullet.scale=0.3
    bullets.x=fighter.x-20
    bullets.depth=1
}
if (gamestate===fly) {
    bullets.visible=false
    targetG.setVisibleEach=false
}
if (gamestate===target&&targetG.collide(tankG)&&mouseIsPressed) {
        tankG.destroyEach()
        score=score+5
    }
if (keyWentUp("space")) {
    gamestate=fly
}



if (gamestate===fly) {
  
if (keyDown("a")) {
    fighter.x=fighter.x-10
}
if (keyDown("d")) {
    fighter.x=fighter.x+10
}
if (keyDown("w")) {
    fighter.y=fighter.y-10
}
if (keyDown("s")) {
    fighter.y=fighter.y+10
}  
}


 drawSprites()
}



function Tanks(){
 if (frameCount%100===0&&tankCount<5) {
  var randX = Math.round(random(20,300))
  var randY = Math.round(random(50,400))
  armour=createSprite(randX,randY)
  armour.addImage(tank)
  armour.scale=0.6
  tankCount=tankCount+1
  //armour.setCollider(rect,30,20)
  tankG.add(armour)

 }
}


function missiles(){
targeting=createSprite(fighter.x-200,fighter.y)
targeting.addImage(targeter)
targeting.x=mouseX
targeting.y=mouseY
targeting.scale=0.1
targetG.add(targeting)
}