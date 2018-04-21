import * as PIXI from "pixi.js";
import { gridSize, appWidth, appHeight } from "./main";

export class Snake {
  bodyParts: Array<PIXI.Sprite> = [];

  constructor(app: PIXI.Application) {
    for (var i = 0; i < 5; i++) {
      var bodyPart = new PIXI.Sprite(
        PIXI.loader.resources["./assets/ca.png"].texture
      );
      bodyPart.x = 0;
      bodyPart.y = 0;
      this.bodyParts.push(bodyPart);
      app.stage.addChild(bodyPart);
    }
  }

  head(): PIXI.Sprite {
    return this.bodyParts[0];
  }

  move(direction: "left" | "right" | "up" | "down") {
    var oldHead: PIXI.Point;
    switch (direction) {
      case "left":
        if (this.head().x - gridSize >= 0) {
          oldHead = new PIXI.Point(this.head().x, this.head().y);
          this.head().x -= gridSize;
        }
        break;
      case "right":
        if (this.head().x + gridSize < appWidth) {
          oldHead = new PIXI.Point(this.head().x, this.head().y);
          this.head().x += gridSize;
        }
        break;
      case "up":
        if (this.head().y - gridSize >= 0) {
          oldHead = new PIXI.Point(this.head().x, this.head().y);
          this.head().y -= gridSize;
        }
        break;
      case "down":
        if (this.head().y + gridSize < appHeight) {
          oldHead = new PIXI.Point(this.head().x, this.head().y);
          this.head().y += gridSize;
        }
        break;
    }
    if (oldHead) {
      for (var i = this.bodyParts.length - 1; i > 0; i--) {
        this.bodyParts[i].position = this.bodyParts[i - 1].position;
      }
      this.bodyParts[1].position = oldHead;
    }
  }
}
