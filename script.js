var canvas = document.getElementById('canvas').getContext("2d")

var bg = new Bg(0,0,300,500, "assets/images/sky.png")
var bg2 = new Bg(300,0,300,500, "assets/images/sky.png")
var ground = new Ground(0,450,300,160, "assets/images/ground.png")
var ground2 = new Ground(300,450,300,160, "assets/images/ground.png")
var bird = new Bird(50,250,35,30, "assets/images/bird0.png")

var pipe1 = new Pipe(250, 360, 67, 250, "assets/images/pipe1.png")
var pipe2 = new Pipe(250, 0, 67, 250, "assets/images/pipe2.png")

var  coin = new Coin(50,50, 35, 45, "assets/images/3.png")

var score = 0
var scoreText = new Text()

var fly = new Audio("assets/sounds/wing.ogg")
var coinPick = new Audio("assets/sounds/point.ogg")
var gameOver = new Audio("assets/sounds/hit.ogg")

var play = true

document.addEventListener("click", (e) => {
    bird.vel -= 15 
    fly.play()
})

function draw () {
    bg.draw()
    bg2.draw()
    pipe1.draw()
    pipe2.draw()
    ground.draw()
    ground2.draw()
    bird.draw()
    coin.draw()
    scoreText.drawText(60, "Arial", 150, 50, "blue")
}

function collision () {
    if (bird.collide(coin)) {
        if (coin.setVisible) {
            coin.setVisible = false
            score += 1
            coinPick.play()
        }
    }

    if (bird.collide (pipe1) || bird.collide(pipe2)) {
        gameOver.play()
        play = false
    }
}

function update () {
    if (play) {
        bg.move(1, -300, 0)
        bg2.move(1, 0, 300)

        ground.move(2, -300, 0)
        ground2.move(2, 0, 300)

        bird.animation(8, 4, "bird")
        bird.move()
        bird.limits()

        pipe1.move(1, -100, 400, pipe2)
        coin.move(pipe1)
        coin.animation(8,5,"")

        scoreText.text = score

        collision()        
    }
}

function main () {
    canvas.clearRect(0,0,300,500)
    draw()
    update ()
    requestAnimationFrame(main);
}

main()