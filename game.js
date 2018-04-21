//Aliases
let Application = PIXI.Application,
  Container = PIXI.Container,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite;

let type = "WebGL";
let gridSize = 32,
  appWidth = 256,
  appHeight = 256;

if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas";
}

PIXI.utils.sayHello(type);

//Create a Pixi Application
let app = new Application({
  width: appWidth,
  height: appHeight,
  antialiasing: true,
  transparent: false,
  resolution: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader.add("images/ca.png").load(setup);

//Define any variables that are used in more than one function
let cat, state;

function setup() {
  //Create the `cat` sprite
  cat = new Sprite(resources["images/ca.png"].texture);
  cat.x = 0;
  cat.y = 0;
  app.stage.addChild(cat);
  //Capture the keyboard arrow keys
  let left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);
  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    cat.x -= gridSize;
    if (cat.x < 0) {
      cat.x = 0;
    }
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && cat.vy === 0) {
    }
  };
  //Up
  up.press = () => {
    cat.y -= gridSize;
    if (cat.y < 0) {
      cat.y = 0;
    }
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
    }
  };
  //Right
  right.press = () => {
    if (cat.x + gridSize < appWidth) {
      cat.x += gridSize;
    }
  };
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
    }
  };
  //Down
  down.press = () => {
    if (cat.y + gridSize < appHeight) {
      cat.y += gridSize;
    }
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
    }
  };
  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}
function gameLoop(delta) {
  //Update the current game state:
  state(delta);
}
function play(delta) {
  //Use the cat's velocity to make it move
}
//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };
  //The `upHandler`
  key.upHandler = event => {
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
