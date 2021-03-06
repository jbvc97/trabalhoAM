var Moeda = Entity.extend(function () {
		this.currState = undefined; // estado atual;

		var podeDisparar = false;
		this.states = {
			RODAR: 'rodar'

		};

		this.constructor = function (spriteSheet, x, y) {
			this.super();
			this.x = x;
			this.y = y;
			this.spriteSheet = spriteSheet;
			this.currState = this.states.RODAR;
			this.currentFrame = 0;
			setup();
		};
		this.render = function (ds) {
			if (!this.active) return;

			var sprite = this.getSprite();
			ds.drawImage
			(
				this.spriteSheet.img,
				sprite.x, sprite.y,
				sprite.width, sprite.height,
				Math.floor(this.x), Math.floor(this.y),
				Math.floor(this.width), Math.floor(this.height));
		};

		this.update = function () {



			// passar � proxima frame e voltar a zero se chegar ao fim do array; M�todo mais eficiente pois utiliza s� opera��es
			// aritm�ticas e n�o recorre a condi��es

			this.currentFrame = (++this.currentFrame) % this.frames.length;

			this.width = this.frames[this.currentFrame].width ; //atualizar a altura
			this.height = this.frames[this.currentFrame].height; // atualizar os




		};

		this.getSprite = function () {
			return this.frames[this.currentFrame];
		};

		var setup = function () {

			this.eStates['rodar'] = this.spriteSheet.getStats('rodar');



			this.frames = this.eStates[this.currState];
			console.log(this.spriteSheet.getStats('rodar'));
			this.width = this.frames[0].width; //atualizar a altura
			this.height = this.frames[0].height; // atualizar os

			// atualizar o array de frames atual

		}.bind(this);

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
