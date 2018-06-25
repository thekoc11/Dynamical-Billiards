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

			var l = this.sides.length, lv = this.vertsX.length;
			var x = Math.max(...this.vertsX),
			y = Math.max(...this.vertsY),
			_x = Math.min(...this.vertsX),
			_y = Math.min(...this.vertsY),
			x1 = (x + _x)/2,
			y1 = (y + _y)/2;
//Randomly allocate the nth vertwx at the maximum widh or height.
			var seed = this.getRandomInt(5);
			// console.log("Seed is", seed);
			if(seed == 3){
				this._vertX = (Math.random() * (window.innerWidth - x) + x);
				this._vertY = Math.random() * window.innerHeight;
		}
			else{
				this._vertX = Math.random() * window.innerWidth;
				this._vertY = Math.random() * (window.innerHeight - y) + y;
			}


			var locVertsX = [this.vertsX[0], this.vertsX[lv-2], this.vertsX[lv-1]],
			locVertsY = [this.vertsY[0], this.vertsY[lv-2], this.vertsY[lv-1]];
			var c = [], m = [];
			var locSides = [];
			console.log(locVertsX);
			console.log(locVertsY);

			for(var i = 0; i < 3; i += 1)
			{
				locSides.push(vector.create((locVertsX[(i + 1)%3] - locVertsX[(i % 3)]), (locVertsY[(i + 1) % 3] - locVertsY[(i % 3)])));
				m.push(locSides[i].getSlope());

			}
			var pointDir = this.getDirection(locSides, locVertsX, locVertsY);
			console.log("greater than?", pointDir);
			for(var i = 0; i < 3; i += 1)
			{
				c.push(locVertsY[(i % 3)] - m[i] * locVertsX[(i % 3)]);
				//console.log("From function", locSides[i].getAngle(), locSides[i].getSlope(), c[i]);
				//var m = locSides[i].getSlope();
			}
			var eq = (this._vertY) - m[0] * (this._vertX + c[0]);
			var eq1 = (this._vertY) - m[1] * (this._vertX + c[1]);
 			console.log("The value of eq is", eq);
			console.log("the second eq is", eq1);

			// if(!((eq > 0 && eq1 < 0)||(eq < 0 && eq1 > 0)))
			// {
			// 	console.log("-----------------POINT REGENERATED------------------");
			// 	this.generateRandomPoint();
			// }
			// else{
				this.verts.push(vector.create(this._vertX, this._vertY));
				this.vertsX.push(this._vertX);
				this.vertsY.push(this._vertY);
			// }
		}
	},

	getDirection: function(sides, vertsX, vertsY){
		var  s1 = sides[0], s2 = sides[1], s3 = sides[2];
		for(var i=0; i<3; i+=1){
			console.log("From function", sides[i].getAngle(), sides[i].getSlope());

		}
		var angle1 = s1.getAngle(), angle2 = s2.getAngle(), angle3 = s3.getAngle();
		if( ((angle1>0 && angle1<90)  && (angle2>=90 && angle2<180)) || ((angle1>270 && angle1<360) && (angle2>180 && angle2<270))){
			return 1;
		}
		else if ((angle1>90 && angle1<180)  && (angle3>270 || angle3<90)) {
			return true;
		}
		else if ((angle1>=270 && angle1<360) && (angle3<90)) {
			return true;
		}
		else {
			return false;
		}
	},

}
