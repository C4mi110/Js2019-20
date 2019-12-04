class Tile {
    constructor(type) {
        if (!type) 
            throw new Error("Podaj typ");
        this.type = type;
        this.setSpritePosition(type);
    }
    setSpritePosition(type)
    {
        this.spriteXPos = TileProperties[type].spriteXPos;
        this.spriteYPos = TileProperties[type].spriteYPos;
    }
}

const TileProperties = {
    empty: {
        type: "empty",
        spriteXPos: 0,
        spriteYPos: 50
    },
    sand: {
        type: "sand",
        spriteXPos: 0,
        spriteYPos: 100
    },
    diamond: {
        type: "diamond",
        spriteXPos: 0,
        spriteYPos: 150     
    },
    wall: {
        type: "wall",
        spriteXPos: 0,
        spriteYPos: 200
    },
    stone: {
        type: "stone",
        spriteXPos: 0,
        spriteYPos: 224
    },
};