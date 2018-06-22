var shape = {
	sides : [],
	verts: [],
	vertsX: [],
	vertsY: [],
	side: 3,
	noOfVert: 3,
	_vertX: 0,
	_vertY: 0,
	_side: 0,

	create: function(){
		var obj = Object.create(this);
		obj.side = 3;
		// obj.vertsX = [0, window.innerWidth/2, window.innerWidth];
		// obj.vertsY = [0, window.innerHeight, 0];
		var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		context.transform(1, 0, 0, -1, 0, height);

		console.log(width, height);


		obj.noOfVert = obj.getRandomInt(5);
		console.log(obj.noOfVert);

//Loop for creating the vertices
		for(var i = 0; i < obj.noOfVert; i += 1) {
			// obj._vertX = (Math.random() * width);// + (width * i))/obj.noOfVert;
			// obj._vertY = (Math.random() * height); //+ (height * i))/obj.noOfVert;

			// console.log(obj._vertX);
			// console.log(obj._vertY);

			obj.generateRandomPoint();
			context.fillStyle = "#FF0000";
			context.beginPath();
			context.arc(obj._vertX, obj._vertY, 8, 0, Math.PI * 2, false);
			context.fill();

			// obj.verts.push(vector.create(obj._vertX, obj._vertY));
			// obj.vertsX.push(obj._vertX);
			// obj.vertsY.push(obj._vertY);
			if(i>0){
				obj.sides.push(vector.create((obj._vertX - obj.vertsX[i-1]), (obj._vertY - obj.vertsY[i-1])));
			}
		}

		var data = trace.create(obj.vertsX, obj.vertsY);
		console.log(data.x, data.y);
		data = [data];

		Plotly.newPlot('page', data, layout);

//Check for loops(Crosses)
		// for(var i = 0; i < obj.noOfVert; i += 1) {
		// 	var j = obj.noOfVert % (i+1);
		//
		// 	if((obj.vertsY[j] ) || ())
		// }

		for(var i = 0; i < obj.noOfVert; i += 1) {
			if(i < obj.noOfVert - 1) {
				console.log(obj.sides[i].getSlope());
				console.log(obj.sides[i].getAngle());

			}
			context.moveTo(obj.vertsX[i], obj.vertsY[i]);

			if(i+1 >= obj.noOfVert){
				var j = 0;
				context.lineTo(obj.vertsX[i-1], obj.vertsY[i-1]);
				context.stroke();
				context.moveTo(obj.vertsX[i], obj.vertsY[i]);

			}
			else if(i > 0){
				var j = i - 1;
			}
			context.lineTo(obj.vertsX[j], obj.vertsY[j]);
			context.stroke();
			// obj._side = vector.create((obj.vertsX[j]-obj.vertsX[i]), (obj.vertsY[j] - obj.vertsY[i]));
			// obj.sides.push(obj._side);
		//	console.log(obj._side.getAngle()*180/Math.PI);
		}
	},

	calcTime: function(p){
		var _an  = p.velocity.getAngle();
		var hasCollided = false;

	},

	getRandomInt: function(max){
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - 3) + 3);
	},

	generateRandomPoint: function(){
		//var i = 0;
		//var obj = Object.create(this);
		if (this.sides.length == 0){

			this._vertX = Math.random() * window.innerWidth;
			this._vertY = Math.random() * window.innerHeight;



		}
		else{

			var l = this.sides.length;
			var x = Math.max(...this.vertsX),
			y = Math.max(...this.vertsY);

			var seed = this.getRandomInt(5);
			console.log("Seed is", seed);
			if(seed == 3){
				this._vertX = (Math.random() * (window.innerWidth - x) + x);
				this._vertY = Math.random() * window.innerHeight;
		}
			else{
				this._vertX = Math.random() * window.innerWidth;
				this._vertY = Math.random() * (window.innerHeight - y) + y;
			}

			var locVertsX = [this.vertsX[0], this.vertsX[l-1], this.vertsX[l]],
			locVertsY = [this.vertsY[0], this.vertsY[l-1], this.vertsY[l]];

			var locSides = [];
			for(var i = 0; i < 3; i += 1)
			{
				locSides.push(vector.create((locVertsX[(i + 1)%3] - locVertsX[(i % 3)]), (locVertsY[(i + 1) % 3] - locVertsY[(i % 3)])));
			}
			for(var i = 0; i < 3; i += 1)
			{
				console.log("From function", locSides[i].getAngle(), locSides[i].getSlope());
			}

		}

		this.verts.push(vector.create(this._vertX, this._vertY));
		this.vertsX.push(this._vertX);
		this.vertsY.push(this._vertY);
	},



}
