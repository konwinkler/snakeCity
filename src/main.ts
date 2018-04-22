import * as PIXI from "pixi.js";
import { Snake, Direction } from "./snake";
import { Street } from "./street";
import { World } from "./world";

let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

export let gridSize = 32,
  appWidth = 512,
  appHeight = 512;

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

let app = new Application(config);
document.body.appendChild(app.view);

loader
  .add("./assets/ca.png")
  .add("./assets/street.png")
  .add("./assets/house.png")
  .load(setup);

//Create a Pixi Application

let world: World;

//Define any variables that are used in more than one function
let state: any;

function setup() {
  world = new World(app);
  //Create the `cat` sprite
  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
  //Left arrow key `press` method
  left.press = () => {
    world.snake.direction = Direction.Left;
  };

  //Left arrow key `release` method
  left.release = () => {};
  //Up
  up.press = () => {
    world.snake.direction = Direction.Up;
  };
  up.release = () => {};
  //Right
  right.press = () => {
    world.snake.direction = Direction.Right;
  };
  right.release = () => {};
  //Down
  down.press = () => {
    world.snake.direction = Direction.Down;
  };
  down.release = () => {};
  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta: number) {
  //Update the current game state:
  state(delta);
}

function play(delta: number) {
  world.update(delta);
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
