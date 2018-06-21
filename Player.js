var Player = Entity.extend(function () {
		this.currState = undefined; // estado atual;

		var podeDisparar = false;
		this.states = {
			ATACAR_1: 'adventurer-attack1',
			ATACAR_2: 'adventurer-attack2',
			ATACAR_3: 'adventurer-attack3',
			CORRER: 'adventurer-run',
			PARADO: 'adventurer-idle',
			SALTAR: 'adventurer-jump',
			BAIXAR: 'adventurer-crouch',
			CAIR: 'adventurer-fall',
			ATINGIDO:'adventurer-hurt',
			MORRER: 'adventurer-die'
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

			this.eStates['adventurer-attack1'] = this.spriteSheet.getStats('adventurer-attack1');
			this.eStates['adventurer-attack2'] = this.spriteSheet.getStats('adventurer-attack2');
			this.eStates['adventurer-attack3'] = this.spriteSheet.getStats('adventurer-attack3');
			this.eStates['adventurer-run'] = this.spriteSheet.getStats('adventurer-run');
			this.eStates['adventurer-idle'] = this.spriteSheet.getStats('adventurer-idle');
			this.eStates['adventurer-jump'] = this.spriteSheet.getStats('adventurer-jump');
			this.eStates['adventurer-crouch'] = this.spriteSheet.getStats('adventurer-crouch');
			this.eStates['adventurer-fall'] = this.spriteSheet.getStats('adventurer-fall');
			this.eStates['adventurer-hurt'] = this.spriteSheet.getStats('adventurer-hurt');
			this.eStates['adventurer-die'] = this.spriteSheet.getStats('adventurer-die');


			this.frames = this.eStates[this.currState];
			console.log(this.spriteSheet.getStats('adventurer-attack1'));
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
