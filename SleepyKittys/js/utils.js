Array.prototype.parse2D = function() {
    const rows = []
    for (let i = 0; i < this.length; i+=88) {
        rows.push(this.slice(i,i+88))
    }

    return rows
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 292) {
                objects.push(
                    new CollisionBlock({
                        position: {
                            x: x * 12,
                            y: y * 12,
                        }
                    })
                )
            }
        })
    })

    return objects
}