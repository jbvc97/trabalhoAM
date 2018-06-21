var Tank = Entity.extend(function() {
  this.currState = undefined; // estado atual;
  var podeDisparar = false;
  this.states = {
    RODAR: 'RODAR'
  }


  this.constructor = function(spriteSheet, x, y) {
    this.super();
    this.x = x;
    this.y = y;
    this.spriteSheet = spriteSheet;
    this.currState = this.states.RODAR;
    this.currentFrame = 0;
    this.active = true;
    setup();
  };

  this.update = function() {

    if (this.currState == this.states.ATINGIDO && this.currentFrame == this.frames.length - 1) {
      this.active = false;
      return;
    }

    this.currentFrame = (this.currentFrame + 1) % (this.frames.length);

    this.width = this.frames[this.currentFrame].width; //atualizar a altura
    this.height = this.frames[this.currentFrame].height; // atualizar os

    if (this.currState === this.states.DISPARAR && this.currentFrame == this.frames.length - 1) {
      this.parar();
    }

  };

  this.getSprite = function() {
    return this.frames[this.currentFrame];
  };


  var setup = function() {

    this.eStates['RODAR'] = this.spriteSheet.getStats('RODAR');

    this.frames = this.eStates[this.currState];
    this.width = this.frames[0].width; //atualizar a altura
    this.height = this.frames[0].height; // atualizar os

    // atualizar o array de frames atual

  }.bind(this);



  this.andar = function() {
    toogleState(this.states.ANDAR);
  }

  this.parar = function() {
    toogleState(this.states.PARADO);
  }

  this.disparar = function() {
    toogleState(this.states.DISPARAR);
  }

  this.destruir = function() {
    toogleState(this.states.ATINGIDO);
  }

  var toogleState = function(theState) {
    if (this.killed) return;
    if (this.currState != theState) {
      this.currState = theState;
      this.frames = this.eStates[theState];
      this.currentFrame = 0;
    }
  }.bind(this);

});