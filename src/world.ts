import { Street } from "./street";
import { Snake } from "./snake";
import { House } from "./house";
import { gridSize, appHeight } from "./main";

export class World {
  snake: Snake;
  streets: Map<string, Street> = new Map();
  houses: Map<string, House> = new Map();
  app: PIXI.Application;
  spawnRate: number = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.snake = new Snake(app);
  }

  pointToString(point: PIXI.Point) {
    return `${point.x}, ${point.y}`;
  }

  update(delta: number) {
    // update snake
    let lastPosition = this.snake.update(delta);

    // update streets
    this.streets.forEach((value: Street, key: string) => {
      let destroy = value.udpate(delta);
      if (destroy) {
        this.streets.delete(key);
      }
    });

    // extend/creat streets
    if (lastPosition) {
      let key = this.pointToString(lastPosition);
      if (this.streets.has(key)) {
        this.streets.get(key).increaseLife();
      } else {
        var street = new Street(this.app, lastPosition);
        this.streets.set(key, street);
      }
    }

    // spawn houses
    // every street has a chance to spawn houses next to it
    this.spawnRate += delta;
    if (this.spawnRate >= 60) {
      this.spawnRate = 0;
      this.streets.forEach((value: Street, key: string) => {
        // on chance
        if (Math.random() < 0.1) {
          // spawn
          let housePosition = new PIXI.Point(
            value.sprite.x,
            value.sprite.y + gridSize
          );
          let newKey = this.pointToString(housePosition);
          console.log(
            `${newKey},${!this.streets.has(newKey) && !this.houses.has(newKey)}`
          );
          if (
            !this.streets.has(newKey) &&
            !this.houses.has(newKey) &&
            housePosition.y < appHeight
          ) {
            let house = new House(this.app, housePosition);
            this.houses.set(newKey, house);
          }
        }
      });
    }
  }
}
