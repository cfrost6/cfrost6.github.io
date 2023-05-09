window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            if (player.preventInput) return

            for (let i=0; i < doors.length; i++) {
                const door = doors[i]

                if (player.hitbox.position.x + player.hitbox.width + 30 < door.position.x + door.width &&
                    player.hitbox.position.x - 30 > door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height &&
                    player.velocity.y == 0) {
                        if (lastLevel == true) {
                            player.velocity.x = 0
                            player.velocity.y = 0
                            player.preventInput = true
                            player.switchSprite('sleep') 
                            setTimeout(function() {
                                gsap.to(overlay, {
                                    opacity: 1
                                })}, 
                                7500
                            )
                            endGame()
                            return
                        }
                        else {
                            player.velocity.x = 0
                            player.velocity.y = 0
                            player.preventInput = true
                            player.switchSprite('enterDoor')
                            door.play()
                            return
                        }
            }
        }

        if (player.velocity.y === 0) player.velocity.y = -16
            keys.w.pressed = true
            break
        case 'a':
        case 'A':
        case 'ArrowLeft':
            keys.a.pressed = true
            break
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = true
            break
        }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
        case 'ArrowUp':
            keys.w.pressed = false
            break
        case 'a':
        case 'A':
        case 'ArrowLeft':
            keys.a.pressed = false
            break
        case 'd':
        case 'D':
        case 'ArrowRight':
            keys.d.pressed = false
            break
        }
})