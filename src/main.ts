import * as PIXI from "pixi.js";
import { Snake } from "./snake";

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

export let gridSize = 32,
  appWidth = 256,
  appHeight = 256;

document.addEventListener(
  "DOMContentLoaded",
  () => {
    let renderer = PIXI.autoDetectRenderer(600, 400, {
      antialias: true,
      transparent: false,
      resolution: 1,
      backgroundColor: 0xffffff
    });
  },
  false
);

let config: PIXI.ApplicationOptions = {
  width: appWidth,
  height: appHeight,
  antialias: true,
  transparent: false,
  resolution: 1
};

//Create a Pixi Application
let app = new Application(config);

document.body.appendChild(app.view);

loader.add("./assets/ca.png").load(setup);

//Define any variables that are used in more than one function
let state: any;
let snake: Snake;

function setup() {
  //Create the `cat` sprite
  snake = new Snake(app);
  // cat = new Sprite(resources["./assets/ca.png"].texture);
  // cat.x = 0;
  // cat.y = 0;
  // app.stage.addChild(snake);
  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    snake.move("left");
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
  };
  //Up
  up.press = () => {
    snake.move("up");
  };
  up.release = () => {};
  //Right
  right.press = () => {
    snake.move("right");
  };
  right.release = () => {};
  //Down
  down.press = () => {
    snake.move("down");
  };
  down.release = () => {};
  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta: any) {
  //Update the current game state:
  state(delta);
}
function play(delta: any) {
  //Use the cat's velocity to make it move
}
//The `keyboard` helper function
function keyboard(keyCode: number) {
  var key: any = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event: any) => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = (event: any) => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };
  //Attach event listeners
  window.addEventListener("keydown", key.downHandler.bind(key), false);
  window.addEventListener("keyup", key.upHandler.bind(key), false);
  return key;
}