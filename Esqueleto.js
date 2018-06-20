var Tank = Entity.extend(function () {
		this.currState = undefined; // estado atual;

		var podeDisparar = false;
		this.states = {
			ATACAR: 'attack',
			MORRER: 'dead',
			ATINGIDO: 'hit',
			PARADO: 'idle',
			REAGIR: 'react',
			ANDAR: 'walk'
		};

		this.constructor = function (spriteSheet, x, y) {
			this.super();
			this.x = x;
			this.y = y;
			this.spriteSheet = spriteSheet;
			this.currState = this.states.PARADO;
			this.currentFrame = 0;
			setup();
		};

		this.update = function () {

			if (this.currState == this.states.ATINGIDO && this.currentFrame == this.frames.length - 1)
				return;

			// passar � proxima frame e voltar a zero se chegar ao fim do array; M�todo mais eficiente pois utiliza s� opera��es
			// aritm�ticas e n�o recorre a condi��es
			this.currentFrame = (++this.currentFrame) % this.frames.length;

			this.width = this.frames[this.currentFrame].width; //atualizar a altura
			this.height = this.frames[this.currentFrame].height; // atualizar os


			if (this.currState === this.states.ATACAR && this.currentFrame == this.frames.length - 1) {
				this.parar();
			}

		};

		this.getSprite = function () {
			return this.frames[this.currentFrame];
		};

		var setup = function () {
//	ATACAR: 'attack',
	MORRER: 'dead',
	ATINGIDO: 'hit',
	PARADO: 'idle',
	REAGIR: 'react',
	ANDAR: 'walk'
			this.eStates['ATACAR'] = this.spriteSheet.getStats('attack');
			this.eStates['MORRER'] = this.spriteSheet.getStats('dead');
			this.eStates['ATINGIDO'] = this.spriteSheet.getStats('hit');
			this.eStates['PARADO'] = this.spriteSheet.getStats('idle');
			this.eStates['REAGIR'] = this.spriteSheet.getStats('react');
			this.eStates['ANDAR'] = this.spriteSheet.getStats('walk');


			this.frames = this.eStates[this.currState];
			this.width = this.frames[0].width; //atualizar a altura
			this.height = this.frames[0].height; // atualizar os

			// atualizar o array de frames atual

		}.bind(this);

		this.andar = function () {
			toogleState(this.states.ANDAR);
		};

		this.parar = function () {
			toogleState(this.states.PARADO);
		};

		this.atacar = function () {
			toogleState(this.states.ATACAR);
		};

		this.atingido = function () {
			toogleState(this.states.ATINGIDO);
		};
		this.morrer = function () {
			toogleState(this.states.MORRER);
		};
		this.reagir = function () {
			toogleState(this.states.REAGIR);
		};

		var toogleState = function (theState) {
			if (this.killed)
				return;
			if (this.currState != theState) {
				this.currState = theState;
				this.frames = this.eStates[theState];
				this.currentFrame = 0;
			}
		}.bind(this);

	});
