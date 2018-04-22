export class House {
  sprite: PIXI.Sprite;

  constructor(app: PIXI.Application, position: PIXI.Point) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources["./assets/house.png"].texture
    );
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    app.stage.addChildAt(this.sprite, 0);
  }

  positionString() {
    return `${this.sprite.x}, ${this.sprite.y}`;
  }
}
