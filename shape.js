let a_gen = tf.linspace(2, 10, 9);

let A = a_gen.dataSync();
let A2 = a_gen.sqrt().dataSync();
let fin_A = [];

for (let i = 0; i < A.length; i++) {
    let g = A.indexOf(A2[i]);
    if (g === -1) {
        fin_A.push(A2[i]);
    }
}

function genRandomIrr(N) {
	let irrs = [];
	if((N%2) === 0){
		const fIr = () => {return fin_A[Math.floor(Math.random() * fin_A.length)];}
		let divisor = 1/(N/4);
		
		for (let i = 0; i < (N/2); i++) {
        	irrs.push(divisor/fIr());
        
    	}
    	for (let i = (N/2); i < (N); i++) {
        	irrs.push(divisor - (irrs[i - (N/2)]));
        
		}
		
		return irrs;
	}
	else{
		let E = genRandomIrr(N+1);  
	
		let _temp = E.pop();
		// let _temp1 = E[1].pop();
	
		let _exec = E;
		// let _irrs = E[1];
		 for(let i = 0; i < N; i++){
			 _exec[i] += (_temp/N);
			//  _irrs[i] += (_temp1/N);
		 }
	
	
		 return _exec;
	 }
}

function genRandomRat(N) {
	let exes = [];
	if ((N % 2) === 0) {
		const f = () => {return A[Math.floor(Math.random() * A.length)];}
	   let divisor = 1/(N/4);
   
	   for (let i = 0; i < (N/2); i++) {
		   exes.push(divisor/f());
		   
	   }
	   for (let i = (N/2); i < (N); i++) {
		   exes.push(divisor - (exes[i - N/2]));
		   
	   }

	//    console.log(exes.length);
	//    const Exes = tf.tensor1d(exes);
	//    Exes.print();
	//    Exes.sum().print();
	return exes;

   }
   else{
	let E = genRandomRat(N+1);  

	let _temp = E.pop();
	// let _temp1 = E[1].pop();

	let _exec = E;
	// let _irrs = E[1];
	 for(let i = 0; i < N; i++){
		 _exec[i] += (_temp/N);
		//  _irrs[i] += (_temp1/N);
	 }


	 return _exec;
 }
}

var shape = {
	sides: [],
	verts: [],
	vertsX: [],
	vertsY: [],
	side: 3,
	noOfVert: 3,
	_vertX: 0,
	_vertY: 0,
	_sideX: [],
	_sideY: [],
	rat: [],
	irrat: [],

	create: function (n, T) {
		var obj = Object.create(this);
		obj.side = 3;
		var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
			height = canvas.height = window.innerHeight;

		context.transform(0.5, 0, 0, -0.5, width / 2, height / 2);

		console.log(width, height);

		obj.noOfVert = obj.getRandomInt(n);
		console.log(obj.noOfVert);
		obj.rat = genRandomRat(obj.noOfVert);
		obj.irrat = genRandomIrr(obj.noOfVert);
		//Loop for creating the vertices
		for (var i = 0; i < obj.noOfVert; i += 1) {
			// console.log("The value input for T is", T);
			if (T == 1) {
				obj.generateRandomPoint( /*0, obj.noOfVert, RXMap, RYMap*/ );
			} else {
				obj.generateRandomPointRational();
			}
			context.fillStyle = "#FF0000";
			context.beginPath();
			context.arc(obj._vertX, obj._vertY, 8, 0, Math.PI * 2, false);
			context.fill();
			var vertLen = this.verts.length;
			if (i > 0) {
				for (var j = 0; j <= 1; j++) {
					obj._sideX.push(obj.vertsX[vertLen - (2 - j)]);
					obj._sideY.push(obj.vertsY[vertLen - (2 - j)]);
				}
				obj.sides.push(side.create(obj._sideX[0], obj._sideY[0], obj._sideX[1], obj._sideY[1]));
				obj._sideX.splice(0, obj._sideX.length);
				obj._sideY.splice(0, obj._sideY.length);
			}
		}

		if (obj.sides.length == obj.verts.length - 1) {
			var l = obj.verts.length - 1;
			obj.sides.push(side.create(obj.vertsX[l], obj.vertsY[l], obj.vertsX[0], obj.vertsY[0]));
		}
		var data = trace.create(obj.vertsX, obj.vertsY);
		console.log(data.x, data.y);
		data = [data];

		Plotly.newPlot('page', data, layout);

		for (var i = 0; i < obj.noOfVert; i += 1) {
			if (i < obj.noOfVert - 1) {
				console.log(obj.sides[i].getSlope());
				//	console.log(obj.sides[i].getAngle());
			}
			context.moveTo(obj.vertsX[i], obj.vertsY[i]);

			if (i + 1 >= obj.noOfVert) {
				var j = 0;
				context.lineTo(obj.vertsX[i - 1], obj.vertsY[i - 1]);
				context.stroke();
				context.moveTo(obj.vertsX[i], obj.vertsY[i]);
			} else if (i > 0) {
				var j = i - 1;
			}
			context.lineTo(obj.vertsX[j], obj.vertsY[j]);
			context.stroke();
		}
		return obj;
	},

	calcTimeIndex: function (p) {
		var _an = p.velocity.getAngle();
		var time = 1,
			ti = [],
			tj = [];
		var least_index = 0;

		// console.log("The number os sides is:", this.sides.length);
		var x1 = p.position.getX(),
			y1 = p.position.getY();
		var vx = p.velocity.getX(),
			vy = p.velocity.getY();
		console.log("Particle position and veloity are", x1, y1, ":", vx, vy);
		var s = this.sides.length;
		for (var i = 0; i < s; i += 1) {
			var m = this.sides[i].getSlope(),
				c = this.sides[i].getY_Intercept();
			ti.push((m * x1 + c - y1) / (vy - m * vx));
			if (ti[i] <= 0.00001) {
				tj.push(Infinity);
			} else {
				tj.push(ti[i]);
			}

			if (tj[i] < tj[least_index]) {
				least_index = i;
			}

			// console.log("Time of collision with", i, "th side is:", tj[i]);

		}
		// console.log("the least time required for collision is", tj[least_index], "at index", least_index);
		p.setTime(tj[least_index]);

		return least_index;

	},

	getRandomInt: function (max) {
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - 3) + 3);
	},

	generateRandomPoint: function () {
		if (this.verts.length < 1) {

			var _side = vector.create(0.5 * window.innerWidth, 0.5 * window.innerHeight);
			var _length = _side.getLength();
			var lenGen = Math.random() * _length / 4 + 0.5 * _length;
			var angleGen = this.irrat[this.verts.length]*180; //Math.random() * 30 + this.sides.length*20;
			var tempVert = vector.createP(lenGen, angleGen);
			this._vertX = tempVert.getX(); // + (window.innerWidth*r_x))/nVert;
			this._vertY = tempVert.getY(); // + (window.innerHeight*r_y))/nVert;
			this.verts.push(vector.create(this._vertX, this._vertY));
			this.vertsX.push(this._vertX);
			this.vertsY.push(this._vertY);

		} else {

			var l = this.sides.length,
				lv = this.vertsX.length;

			var c = 0; //Math.abs(this.sides[l - 1].getY_Intercept());
			var _length = 0;
			c = 0;
			if (c > this.verts[lv - 1].getLength() && c < 1.75 * this.verts[lv - 1].getLength()) {
				_length = c;
			} else {
				_length = this.verts[lv - 1].getLength();
			}

			var recent_angle = this.verts[lv - 1].getAngle();

			var angleGen = this.irrat[this.verts.length]*180 + recent_angle;
			var diff = 360 - angleGen;
			if (diff < 0) {
				angleGen = Math.random() * (360 - Math.abs(diff)) + recent_angle;
			}
			var _lengthL = _length,
				_lengthU = _length;
			var lenGen = Math.random() * (_lengthU - _lengthL) + _lengthL;


			var tempVert = vector.createP(lenGen, angleGen);

			this._vertX = tempVert.getX();
			this._vertY = tempVert.getY();

			this.verts.push(vector.create(this._vertX, this._vertY));
			this.vertsX.push(this._vertX);
			this.vertsY.push(this._vertY);
		}
	},

	generateRandomPointRational: function () {
		if (this.verts.length < 1) {

			var _side = vector.create(window.innerWidth / 2, window.innerHeight / 2);
			var _length = _side.getLength();
			var lenGen = Math.random() * (_length - 3 * _length / 4) + _length / 2;
			var angleGen = this.rat[this.verts.length]*180; //Math.random() * 30 + this.sides.length*20;
			var tempVert = vector.createP(lenGen, angleGen);
			this._vertX = tempVert.getX(); // + (window.innerWidth*r_x))/nVert;
			this._vertY = tempVert.getY(); // + (window.innerHeight*r_y))/nVert;
			this.verts.push(vector.create(this._vertX, this._vertY));
			this.vertsX.push(this._vertX);
			this.vertsY.push(this._vertY);

		} else {

			var l = this.sides.length,
				lv = this.vertsX.length;
			var LCM = this.noOfVert * 2;
			var inter = (180 / LCM);
			var c = 0; //Math.abs(this.sides[l - 1].getY_Intercept());
			var _length = 0;

			_length = this.verts[lv - 1].getLength();


			var recent_angle = this.verts[lv - 1].getAngle();
			// if(l == (this.noOfVert - 1)){
			// 	c = 2*LCM - 
			// }
			var angleGen = this.rat[this.verts.length]*180 + recent_angle;
			//var angleGen =c * inter + recent_angle;
			var _lengthL = _length,
				_lengthU = _length;
			var lenGen = Math.random() * (_lengthU - _lengthL) + _lengthL;


			var tempVert = vector.createP(lenGen, angleGen);

			this._vertX = tempVert.getX();
			this._vertY = tempVert.getY();

			this.verts.push(vector.create(this._vertX, this._vertY));
			this.vertsX.push(this._vertX);
			this.vertsY.push(this._vertY);
		}
	},
	particleInitiator: function () {
		var s = [];

		var l = this.sides.length;
		for (var i = 0; i < l; i += 1) {
			s.push(this.sides[i].distanceFromOrigin());
		}

		return Math.random() * Math.min(...s);
	},

	getDirection: function (sides, vertsX, vertsY) {
		var s1 = sides[0],
			s2 = sides[1],
			s3 = sides[2];
		for (var i = 0; i < 3; i += 1) {
			console.log("From function", sides[i].getAngle(), sides[i].getSlope());
		}
		var angle1 = s1.getAngle(),
			angle2 = s2.getAngle(),
			angle3 = s3.getAngle();
		return (angle2 - angle1);
	},

}