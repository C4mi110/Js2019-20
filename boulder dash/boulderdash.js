class BoulderDash
{
    constructor(canvasId)
    {
        this.tiles = [];
        this.tileSize = 32;
        this.tileRows = 22;
        this.tittlesInRow = 40;

        //await this.loadSpriteStan(); //dodac to
        this.initializeCanvas(canvasId);
        this.generateLevel();
        this.renderLevel();
        
    }
    initializeCanvas(canvasId)
    {
        if (!canvasId) 
            throw new Error("Wpisz canvas id!");
        this.canvas = document.querySelector("#"+canvasId);
        this.ctx = this.canvas.getContext("2d");
    }
    renderLevel()
    {
        for (let y = 0; y < this.tileRows; y++)
            for (let x = 0; x < this.tittlesInRow; x++)
                {
                    const tile = this.tiles[y][x];
                    const xPos = x * this.tileSize;
                    const yPos = y * this.tileSize;
                    this.ctx.drawImage(
                        this.tilesSprite, 
                        tile.spriteXPos,
                        tile.spriteYPos,
                        this.tileSize,
                        this.tileSize,
                        xPos,
                        yPos
                    )
                }
    }
    generateLevel()
    {
        for (let y = 0; y < this.tileRows; y++)
        {
            const row = [];
            for (let x = 0; x < this.tittlesInRow; x++)
            {
                const rand = Math.floor(Math.random() * 5);
                let randTileType
                switch (rand){
                    case 0:
                        randTileType = TileProperties.empty.type;
                        break;
                    case 1:
                        randTileType = TileProperties.sand.type;
                        break;
                    case 2:
                        randTileType = TileProperties.stone.type;
                        break;
                    case 3:
                        randTileType = TileProperties.wall.type;
                        break;
                    case 4:
                        randTileType = TileProperties.diamond.type;
                        break;
                }
                const tile = new Tile(randTileType);
                row.push(tile);
            }
            this.tiles.push(row);
        }
    }
}