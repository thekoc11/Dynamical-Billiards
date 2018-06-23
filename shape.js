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


		obj.noOfVert = obj.getRandomInt(6);
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
			//	obj.sides.push(vector.create((obj.vertsX[0] - obj._vertX), (obj.vertsY[0] - obj._vertY)));
			}

		}

		var data = trace.create(obj.vertsX, obj.vertsY);
		console.log(data.x, data.y);
		data = [data];

		Plotly.newPlot('page', data, layout);

		//obj.checkAngle();
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
		if (this.sides.length <= 1){

			this._vertX = Math.random() * window.innerWidth;
			this._vertY = Math.random() * window.innerHeight;

			//Just to make things easier, ensure that first two vertices are in the first half wrt width and height
			if(this._vertX > window.innerWidth/2){
				this._vertX -= window.innerWidth/2;
			}
			if(this._vertY > window.innerHeight/2){
				this._vertY -= window.innerHeight/2;
			}
			this.verts.push(vector.create(this._vertX, this._vertY));
			this.vertsX.push(this._vertX);
			this.vertsY.push(this._vertY);

		}
		else{

			var l = this.sides.length;
			var x = Math.max(...this.vertsX),
			y = Math.max(...this.vertsY);
//Randomly allocate the nth vertwx at the maximum widh or height.
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

			this.checkAngle();
			var locVertsX = [this.vertsX[0], this.vertsX[l-1], this.vertsX[l]],
			locVertsY = [this.vertsY[0], this.vertsY[l-1], this.vertsY[l]];
			var c = [], m = [];
			var locSides = [];
			for(var i = 0; i < 3; i += 1)
			{
				locSides.push(vector.create((locVertsX[(i + 1)%3] - locVertsX[(i % 3)]), (locVertsY[(i + 1) % 3] - locVertsY[(i % 3)])));
				m.push(locSides[i].getSlope());

			}
			for(var i = 0; i < 3; i += 1)
			{
				c.push(locVertsY[(i % 3)] - m[i] * locVertsX[(i % 3)]);
				console.log("From function", locSides[i].getAngle(), locSides[i].getSlope(), c[i]);
				//var m = locSides[i].getSlope();
			}
			var eq = (this._vertY) - m[0] * (this._vertX + c[0]);
			var eq1 = (this._vertY) - m[1] * (this._vertX + c[1]);
 			console.log("The value of eq is", eq);
			console.log("the second eq is", eq1);
			if(!((eq > 0 && eq1 < 0)||(eq < 0 && eq1 > 0)))
			{
				console.log("-----------------POINT REGENERATED------------------");
				this.generateRandomPoint();
			}
			else{
				this.verts.push(vector.create(this._vertX, this._vertY));
				this.vertsX.push(this._vertX);
				this.vertsY.push(this._vertY);
			}
				// if(!(locSides[i].getSlope() = NaN))
				// {
				//
				// }


		}
		//this.checkAngle(this._vertX, this._vertY);

	},

	checkAngle: function(){
		if(this.verts.length > 2){
			var l = this.sides.length;
			var locSides = this.sides;
			//locSides.pop();
			//locSides.push(vector.create((newX - this.vertsX[l]),(newY - this.vertsY[l])));
			//locSides.push(vector.create((this.vertsX[0] - newX), (this.vertsY[0] - newY)));
			if(Math.abs(locSides[l-1].getAngle() - locSides[l-2].getAngle()) > 140){
				console.log("the angle between the new and the old side is", (locSides[l-1].getAngle() - locSides[l-2].getAngle()));
				var tempX = this.vertsX[l],
				tempY = this.vertsY[l];
				this.vertsX[l] = this.vertsX[l - 1];
				this.vertsY[l] = this.vertsY[l - 1];
				this.vertsX[l - 1] = tempX;
				this.vertsY[l - 1] = tempY;
			}
		}
	},

}
