var desert;
var desertImg;
var simba;
var obstacle, obs1, obs2, obs3, obstacleGroup;
var score;
var gameState = "play";
var restart, restartImg;
var simbaAnimation;
var groundLine;
var obstacleType;


function preload() {
    desertImg = loadImage("assets/desert.jpg")
    simbaAnimation = loadAnimation("assets/simbarun.gif")
    obs1 = loadAnimation("assets/mickeyrun.gif")
    obs2 = loadAnimation("assets/donald.gif")
    obs3 = loadAnimation("assets/minnie.gif")
    restartImg = loadImage("assets/restart.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    desert = createSprite(width / 2, height / 2);
    desert.addImage("desert", desertImg);
    desert.scale = 3
    desert.velocityX = 7
    simba = createSprite(width * 4 / 5, 500);
    simba.scale = 1.5
    simba.addAnimation("simba", simbaAnimation);
    groundLine = createSprite(width / 2, height * 17 / 18, width, 10);
    groundLine.visible = false;
    simba.setCollider("rectangle", 0, 0, simba.width / 2, simba.height / 2.2)
    //simba.debug = true;
    restart = createSprite(width / 2, height / 2);
    restart.addImage("restart", restartImg)

    obstacleGroup = new Group();
}

function draw() {

    background(0);

    if (gameState == "play") {
        score = score + 1;
        restart.visible = false;
        play();
        createObstacles();


    }
    if (gameState == "end") {
        end();
    }

    simba.collide(groundLine)

    drawSprites();
}

function play() {
    desert.velocityX = 7
    simba.visible = true;
    obstacleGroup.visible = false;
    restart.visible = false;
    obstacleGroup.visible = true;
    if (desert.x > 800) {
        desert.x = desert.width / 2
    }
    if (keyDown("space") && simba.y > 400) {
        simba.velocityY = -7
    }
    simba.velocityY += 1

    if (simba.isTouching(obstacleGroup)) {
        gameState = "end";
    }

}

function end() {
    restart.visible = true;
    desert.velocityX = 0;
    simba.visible = false;
    obstacleGroup.destroyEach();
    if(mousePressedOver(restart)){
        gameState = "play";
        obstacleGroup.destroyEach();
    }

}

function createObstacles() {
    if (frameCount % 100 == 0) {
        obstacle = createSprite(0, height * 7 / 8);
        obstacle.velocityX = 7
        var obstacleType = Math.round(random(1, 3));
        if (obstacleType == 1) {
            obstacle.addAnimation("obs1", obs1);
        } else if (obstacleType == 2) {
            obstacle.addAnimation("obs2", obs2);
        } else if (obstacleType == 3) {
            obstacle.addAnimation("obs3", obs3);
        }
        //obstacle.debug = true;
        obstacleGroup.add(obstacle);
        obstacle.lifetime = 700;
        obstacle.scale = 0.35;
    }
}