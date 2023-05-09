const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 48*22
canvas.height = 48*10

let parsedCollisions
let collisionBlocks
let background
let doors
let smallDogs
let bigDogs
let lastLevel = false

const player = new Player({
    imageSrc: './img/cat/myIdleRight.png',
    frameRate: 23,
    animations: {
        idleRight: {
            frameRate: 23,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/cat/myIdleRight.png',
        },
        idleLeft: {
            frameRate: 23,
            frameBuffer: 10,
            loop: true,
            imageSrc: './img/cat/myIdleLeft.png',
        },
        runRight: {
            frameRate: 6,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/cat/myWalkRight.png',
        },
        runLeft: {
            frameRate: 6,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/cat/myWalkLeft.png',
        },
        jumpRight: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './img/cat/myJumpRight.png',
        },
        jumpLeft: {
            frameRate: 1,
            frameBuffer: 1,
            loop: true,
            imageSrc: './img/cat/myJumpLeft.png',
        },
        invincibility: {
            frameRate: 4,
            frameBuffer: 12,
            loop: true,
            imageSrc: './img/cat/invincibility.png',
        },
        sleep: {
            frameRate: 34,
            frameBuffer: 12,
            loop: false,
            imageSrc: './img/cat/roseSleep.png',
        },
        enterDoor: {
            frameRate: 12,
            frameBuffer: 8,
            loop: false,
            imageSrc: './img/cat/myWalkExit.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        levels[level].init(),
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 1.png'
            })

            smallDogs = []

            bigDogs = []

            doors = [
                new Sprite ({
                    position: {
                        x: 880,
                        y: 312, 
                    },
                    imageSrc: './img/myDoorOpen.png',
                    frameRate: 6,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                }),
            ]
        },
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 0
            player.position.y = 400
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 2.png'
            })

            smallDogs = [
                new Sprite ({
                    position: {
                        x: 615,
                        y: 418, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            bigDogs = []

            doors = [
                new Sprite ({
                    position: {
                        x: 880,
                        y: 312, 
                    },
                    imageSrc: './img/myDoorOpen.png',
                    frameRate: 6,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                }),
            ]
        },
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 0
            player.position.y = 400
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 3.png'
            })

            smallDogs = []

            bigDogs = [
                new Sprite ({
                    position: {
                        x: 280,
                        y: 312, 
                    },
                    imageSrc: './img/dog/aspenSleep_bigAlt.png',
                    frameRate: 4,
                    frameBuffer: 35,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/aspenSleep_bigAlt.png',
                            frameRate: 4,
                            frameBuffer: 35,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/aspenAlert_Big.png',
                            frameRate: 9,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            doors = [
                new Sprite ({
                    position: {
                        x: 880,
                        y: 312, 
                    },
                    imageSrc: './img/myDoorOpen.png',
                    frameRate: 6,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                }),
            ]
        },
    },
    4: {
        init: () => {
            parsedCollisions = collisionsLevel4.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 0
            player.position.y = 400
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 4.png'
            })

            smallDogs = [
                new Sprite ({
                    position: {
                        x: 400,
                        y: 82, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            bigDogs = [
                new Sprite ({
                    position: {
                        x: 850,
                        y: 201, 
                    },
                    imageSrc: './img/dog/aspenSleep_bigAlt.png',
                    frameRate: 4,
                    frameBuffer: 35,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/aspenSleep_bigAlt.png',
                            frameRate: 4,
                            frameBuffer: 35,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/aspenAlert_Big.png',
                            frameRate: 9,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            doors = [
                new Sprite ({
                    position: {
                        x: 956,
                        y: 298, 
                    },
                    imageSrc: './img/myDoorOpen_small.png',
                    frameRate: 6,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                }),
            ]
        },
    },
    5: {
        init: () => {
            parsedCollisions = collisionsLevel5.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 0
            player.position.y = 400
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 5.png'
            })

            smallDogs = [
                new Sprite ({
                    position: {
                        x: 425,
                        y: 130, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            bigDogs = [
                new Sprite ({
                    position: {
                        x: 627,
                        y: 405, 
                    },
                    imageSrc: './img/dog/aspenSleep_bigAlt.png',
                    frameRate: 4,
                    frameBuffer: 35,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/aspenSleep_bigAlt.png',
                            frameRate: 4,
                            frameBuffer: 35,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/aspenAlert_Big.png',
                            frameRate: 9,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            doors = [
                new Sprite ({
                    position: {
                        x: 920,
                        y: 312, 
                    },
                    imageSrc: './img/myDoorOpen.png',
                    frameRate: 6,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                }),
            ]
        },
    },
    6: {
        init: () => {
            lastLevel = true
            parsedCollisions = collisionsLevel6.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 0
            player.position.y = 400
            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/Level 6.png'
            })

            smallDogs = [
                new Sprite ({
                    position: {
                        x: 225,
                        y: 226, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
                new Sprite ({
                    position: {
                        x: 520,
                        y: 322, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
                new Sprite ({
                    position: {
                        x: 900,
                        y: 165, 
                    },
                    imageSrc: './img/dog/mapleSleep_Big.png',
                    frameRate: 4,
                    frameBuffer: 20,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/mapleSleep_Big.png',
                            frameRate: 4,
                            frameBuffer: 20,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/mapleAlert_Big.png',
                            frameRate: 8,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            bigDogs = [
                new Sprite ({
                    position: {
                        x: 410,
                        y: 404, 
                    },
                    imageSrc: './img/dog/aspenSleep_bigAlt.png',
                    frameRate: 4,
                    frameBuffer: 35,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/aspenSleep_bigAlt.png',
                            frameRate: 4,
                            frameBuffer: 35,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/aspenAlert_Big.png',
                            frameRate: 9,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
                new Sprite ({
                    position: {
                        x: 795,
                        y: 72, 
                    },
                    imageSrc: './img/dog/aspenSleep_bigAlt.png',
                    frameRate: 4,
                    frameBuffer: 35,
                    loop: true,
                    autoplay: true,
                    animations: {
                        sleepDog: {
                            imageSrc: './img/dog/aspenSleep_bigAlt.png',
                            frameRate: 4,
                            frameBuffer: 35,
                            loop: true,
                            autoplay: true,
                        },
                        alertDog: {
                            imageSrc:  './img/dog/aspenAlert_Big.png',
                            frameRate: 9,
                            frameBuffer: 9,
                            loop: false,
                            autoplay: true,
                        }
                    }
                }),
            ]

            doors = [
                new Sprite ({
                    position: {
                        x: 860,
                        y: 325, 

                        // x: 80,
                        // y: 365, 
                    },
                    imageSrc: './img/cat/sproutSleep_big.png',
                    frameRate: 11,
                    frameBuffer: 11,
                    loop: true,
                    autoplay: true
                }),
            ]
        },
    },
}

const keys = {
    ArrowUp: {
        pressed: false,
    },
    W: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    A: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    D: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

const overlay = {
    opacity : 0,
}

function animate() {
    window.requestAnimationFrame(animate)
    
    background.draw()
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.draw()
    // })

    doors.forEach((door) => {
        door.draw()
    })

    smallDogs.forEach((smallDog) => {
        smallDog.draw()
    })

    bigDogs.forEach((bigDog) => {
        bigDog.draw()
    })
    
    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.restore()
}

levels[level].init()
animate()