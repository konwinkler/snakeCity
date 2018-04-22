import * as PIXI from "pixi.js";

export class Street {
  lifeTime: number = 0;
  sprite: PIXI.Sprite;

  constructor(app: PIXI.Application, position: PIXI.Point) {
    this.sprite = new PIXI.Sprite(
      PIXI.loader.resources["./assets/street.png"].texture
    );
    this.sprite.x = position.x;
    this.sprite.y = position.y;
    app.stage.addChildAt(this.sprite, 0);
    this.increaseLife();
  }

  increaseLife() {
    this.lifeTime += 480;
  }

  positionString() {
    return `${this.sprite.x}, ${this.sprite.y}`;
  }

  /**
   *
   * @param delta time update
   * @returns whether the street has disappeared
   */
  udpate(delta: number): boolean {
    this.lifeTime -= delta;

    if (this.lifeTime <= 0) {
      this.sprite.parent.removeChild(this.sprite);
      this.sprite.destroy;
      return true;
    }

    return false;
  }
}
