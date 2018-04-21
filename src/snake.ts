import * as PIXI from "pixi.js";
import { gridSize, appWidth, appHeight } from "./main";

export class Snake {
  bodyParts: Array<PIXI.Sprite> = [];

  constructor(app: PIXI.Application) {
    for (var i = 0; i < 1; i++) {
      var bodyPart = new PIXI.Sprite(
        PIXI.loader.resources["./assets/ca.png"].texture
      );
      bodyPart.x = 0;
      bodyPart.y = 0;
      this.bodyParts.push(bodyPart);
      app.stage.addChild(bodyPart);
    }
  }

  move(direction: "left" | "right" | "up" | "down") {
    switch (direction) {
      case "left":
        if (this.bodyParts[0].x - gridSize >= 0) {
          this.bodyParts[0].x -= gridSize;
        }
        break;
      case "right":
        if (this.bodyParts[0].x + gridSize < appWidth) {
          this.bodyParts[0].x += gridSize;
        }
        break;
      case "up":
        if (this.bodyParts[0].y - gridSize >= 0) {
          this.bodyParts[0].y -= gridSize;
        }
        break;
      case "down":
        if (this.bodyParts[0].y + gridSize < appHeight) {
          this.bodyParts[0].y += gridSize;
        }
        break;
    }
  }
}
