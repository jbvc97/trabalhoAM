(function() {
  window.onload = init;

  var canvases = {
    background: {
      canvas: null,
      drawingSurface: null
    },
    entities: {
      canvas: null,
      drawingSurface: null
    },
    components: {
      canvas: null,
      drawingSurface: null
    },
  };

  var entities = [];
  var assetsLoaded;
  var assets = [];
  var teclas = [];
  var player;
  var camera;
  var gameWorld;

  function init() {
    canvases.background.canvas = document.getElementById("background");
    canvases.background.drawingSurface = canvases.background.canvas.getContext("2d");
    canvases.entities.canvas = document.getElementById("entities");
    canvases.entities.drawingSurface = canvases.entities.canvas.getContext("2d");

    gameWorld = new GameWorld(0, 0, 2561, 1922);

    camera = new Camera(0, 0, canvases.entities.canvas.width, canvases.entities.canvas.height);

    var sp = new SpriteSheet();
    sp.load("assets//coin//coin.png", "assets//coin//coin.json", loaded);
    assets.push(sp);
  }

  function loaded(notification) {
    console.log(notification);
    if (assetsLoaded < assets.length) return;
    console.log("Jogo carregado! Navegue utilizando as teclas direcionais");
    window.addEventListener("keypress", setupGame, false);

  }

  function setupGame() {
    window.removeEventListener("keypress", setupGame, false);
    player = new Tank(gSpriteSheets["assets//coin//coin.png"], 100, 100);

    window.addEventListener("keydown", function(e) {
      teclas[e.keyCode] = true;
    }, false);
    window.addEventListener("keyup", function(e) {
      teclas[e.keyCode] = false;
    }, false);

    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);

    update();
  }

  function keyDownHandler(e) {
    var codTecla = e.keyCode;
    teclas[codTecla] = true;
  }

  function keyUpHandler(e) {
    var codTecla = e.keyCode;
    teclas[codTecla] = false;
  }


  function update() {

    if (teclas[keyboard.LEFT]) player.vx = -5;
    if (teclas[keyboard.RIGHT]) player.vx = 5;
    if (teclas[keyboard.UP]) player.vy = -5;
    if (teclas[keyboard.DOWN]) player.vy = 5;

    if (!teclas[keyboard.LEFT] && !teclas[keyboard.RIGHT]) player.vx = 0;
    if (!teclas[keyboard.UP] && !teclas[keyboard.DOWN]) player.vy = 0;

    //mover o gato e mante-lo dentro do mundo
    player.x = Math.max(0, Math.min(player.x + player.vx, gameWorld.width - player.width));
    player.y = Math.max(0, Math.min(player.y + player.vy, gameWorld.height - player.height));

    if (player.x < camera.leftInnerBoundary())
      camera.x = Math.floor(player.x - (camera.width * 0.25));

    if (player.y < camera.topInnerBoundary())
      camera.y = Math.floor(player.y - (camera.height * 0.25));

    if (player.x + player.width > camera.rightInnerBoundary())
      camera.x = Math.floor(player.x + player.width - (camera.width * 0.75));

    if (player.y + player.height > camera.bottomInnerBoundary())
      camera.y = Math.floor(player.y + player.height - (camera.height * 0.75));


    //manter a camara dentro dos limites do mundo

    if (camera.x < gameWorld.x) camera.x = gameWorld.x;
    if (camera.y < gameWorld.y) camera.y = gameWorld.y;
    if (camera.x + camera.width > gameWorld.x + gameWorld.width) camera.x = gameWorld.x + gameWorld.width - camera.width;
    if (camera.y + camera.height > gameWorld.height) camera.y = gameWorld.height - camera.height;

    requestAnimationFrame(update);

    render();
  }

  function render() {
    canvases.entities.drawingSurface.clearRect(0, 0, canvases.entities.canvas.width, canvases.entities.canvas.height);
    canvases.entities.drawingSurface.save();
    canvases.entities.drawingSurface.translate(-camera.x, -camera.y);

    player.render(canvases.entities.drawingSurface);
    player.drawColisionBoundaries(canvases.entities.drawingSurface, true, true, "red", "blue");
    camera.drawFrame(canvases.entities.drawingSurface, true);
    canvases.entities.drawingSurface.restore();

  }



})();