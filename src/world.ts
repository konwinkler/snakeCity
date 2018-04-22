import { Street } from "./street";
import { Snake } from "./snake";

export class World {
  snake: Snake;
  streets: Map<PIXI.Point, Street> = new Map();
  app: PIXI.Application;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.snake = new Snake(app);
  }

  update(delta: number) {
    let lastPosition = this.snake.update(delta);
    this.streets.forEach((value: Street, key: PIXI.Point) => {
      let destroy = value.udpate(delta);
      if (destroy) {
        this.streets.delete(key);
      }
    });

    if (lastPosition) {
      if (this.streets.has(lastPosition)) {
        this.streets.get(lastPosition).increaseLife();
      } else {
        var street = new Street(this.app, lastPosition);
        this.streets.set(lastPosition, street);
      }
    }
  }
}
