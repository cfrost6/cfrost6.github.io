class Player extends Sprite{
    constructor({collisionBlocks = [], imageSrc, frameRate, animations, loop}) {
        super({imageSrc, frameRate, animations,loop})
        this.position = {
            x: 0,
            y: 400,
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.gravity = 1

        this.collisionBlocks = collisionBlocks
    }

    update() {
        // Blue box for character
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.position.x += this.velocity.x

        
        this.updateHitbox()

        this.checkSmallDogHit()
        this.checkBigDogHit()
        this.checkLeftRightCanvas()
        this.checkHorizontalCollisions()
        this.applyGravity()

        this.updateHitbox()

        //Visual hitbox
        // c.fillRect(
        //   this.hitbox.position.x,
        //   this.hitbox.position.y,
        //   this.hitbox.width,
        //   this.hitbox.height
        // )

        this.checkAboveBelowCanvas()
        this.checkVerticalCollisions()
    }

    handleInput (keys) {
        if (this.preventInput) return
        this.velocity.x = 0
        if (this.velocity.y < 0 && 
            (keys.D.pressed ||keys.d.pressed || keys.ArrowRight.pressed)) {
            this.switchSprite('jumpRight')
            this.velocity.x = 3.5
            this.lastDirection = 'right'
        }
        else if (this.velocity.y < 0 && 
            (keys.A.pressed || keys.a.pressed || keys.ArrowLeft.pressed)) {
            this.switchSprite('jumpLeft')
            this.velocity.x = -3.5
            this.lastDirection = 'left'
        }
        
        else if (this.velocity.y < 0 && this.lastDirection === 'left') {
            this.switchSprite('jumpLeft')
        }
        else if (this.velocity.y < 0) {
            this.switchSprite('jumpRight')
        }
        else if(keys.D.pressed || keys.d.pressed || keys.ArrowRight.pressed) {
            this.switchSprite('runRight')
            this.velocity.x = 3.5
            this.lastDirection = 'right'
        }
        else if (keys.A.pressed || keys.a.pressed || keys.ArrowLeft.pressed) { 
            this.switchSprite('runLeft')
            this.velocity.x = -3.5
            this.lastDirection = 'left'
        }
        else if (this.lastDirection === 'left') this.switchSprite('idleLeft')
        else this.switchSprite('idleRight')     
    }

    // switchSprite(name) {
    //     if (this.image === this.animations[name].image) return
    //     this.currentFrame = 0
    //     this.image = this.animations[name].image
    //     this.frameRate = this.animations[name].frameRate
    //     this.frameBuffer = this.animations[name].frameBuffer
    //     this.loop = this.animations[name].loop
    //     this.currentAnimation = this.animations[name]
    // }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 70,
                y: this.position.y + 40,
            },
            width: 25,
            height: 48,
        }
    }

    checkHorizontalCollisions() {
        for (let i = 0; i<this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            // If a collision exists 
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    // Collision on x-axis
                    if (this.velocity.x < 0) {
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                    }

                    if (this.velocity.x > 0) {
                        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01
                        break
                    }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    checkVerticalCollisions() {
        // Check for vertical collisions
        for (let i = 0; i<this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            
            // If a collision exists 
            if (this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height) {
                    
                    // Collision on y-axis
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y
                        this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                        break
                    }

                    if (this.velocity.y > 0) {
                        this.velocity.y = 0
                        const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                        this.position.y = collisionBlock.position.y - offset - 0.01
                        break
                    }       
            }
        }
    }

    checkAboveBelowCanvas() {
        // Below Canvas
        if (this.hitbox.position.y + this.hitbox.height > canvas.height) {
            this.velocity.y = 0    
            const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
            this.position.y = canvas.height - offset - 0.01
        }
        // Above Canvas
        if (this.hitbox.position.y < -20) {
            this.velocity.y = 0
            const offset = this.hitbox.position.y - this.position.y
            this.position.y = -20 - offset + 0.01
        }
    }

    checkLeftRightCanvas() {
        // Left of Canvas
        if (this.hitbox.position.x - 16 <= 0) {
            const offset = this.hitbox.position.x - this.position.x 
            this.position.x = 0 - offset + 16.01
        }
        // Right of Canvas
        if (this.hitbox.position.x + this.hitbox.width + 10 >= canvas.width) {
            const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
            this.position.x = canvas.width - offset - 10.01
        }
    }

    checkSmallDogHit() {
        for (let i=0; i < smallDogs.length; i++) {
            const smallDog = smallDogs[i]

            if (player.hitbox.position.x + player.hitbox.width - 9 < smallDog.position.x + smallDog.width &&
                player.hitbox.position.x + 9 > smallDog.position.x &&
                player.hitbox.position.y + player.hitbox.height + 5 >= smallDog.position.y + 55 &&
                player.hitbox.position.y - 5 <= smallDog.position.y + smallDog.height) {
                    
                    this.velocity.x = 0
                    this.velocity.y = 0
                    player.preventInput = true
                    if (this.lastDirection == "left") {
                        player.switchSprite('idleLeft')
                    } else {
                        player.switchSprite('idleRight')
                    }

                    smallDog.switchSprite('alertDog')

                    setTimeout(function() {
                        dogHit(smallDog)}, 
                        2000
                    )

                    return
        }
    }
    }

    checkBigDogHit() {
        for (let i=0; i < bigDogs.length; i++) {
            const bigDog = bigDogs[i]

            if (player.hitbox.position.x + player.hitbox.width - 15 < bigDog.position.x + bigDog.width &&
                player.hitbox.position.x + 15 > bigDog.position.x &&
                player.hitbox.position.y + player.hitbox.height >= bigDog.position.y + 55 &&
                player.hitbox.position.y - 5 <= bigDog.position.y + bigDog.height) {
                    
                    this.velocity.x = 0
                    this.velocity.y = 0
                    player.preventInput = true
                    if (this.lastDirection == "left") {
                        player.switchSprite('idleLeft')
                    } else {
                        player.switchSprite('idleRight')
                    }

                    bigDog.switchSprite('alertDog')

                    setTimeout(function() {
                        dogHit(bigDog)}, 
                        2000
                    )

                    return
        }
    }
    }
}

function dogHit(dog) {
    player.position.x = 0
    player.position.y = 380
    player.switchSprite('invincibility')
    dog.switchSprite('sleepDog')

    setTimeout(function() {
        dogReset()}, 
        2500
    )
}

function dogReset() {
    player.preventInput = false
}