var shape = {
	sides : [],
	vertsX: [],
	vertsY: [],
	side: 3,
	vert: 3,
	_vertX: 0,
	_vertY: 0,
	_side: 0,

	create: function(){
		var obj = Object.create(this);
		obj.side = 3;
		obj.vertsX = [0, window.innerWidth/2, window.innerWidth];
		obj.vertsY = [0, window.innerHeight, 0];
		var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");

		for(var i = 0; i < obj.side; i += 1) {
			context.moveTo(obj.vertsX[i], obj.vertsY[i]);
			if(i+1 >= obj.side){
				var j = 0;
			}
			else{
				var j = i+1;
			}
			context.lineTo(obj.vertsX[j], obj.vertsY[j]);
			context.stroke();
			obj._side = vector.create((obj.vertsX[j]-obj.vertsX[i]), (obj.vertsY[j] - obj.vertsY[i]));
			obj.sides.push(obj._side);
		//	console.log(obj._side.getAngle()*180/Math.PI);
		}
	},

	calcTime: function(p){
		var _an  = p.velocity.getAngle();
		var hasCollided = false;
		
	},





}
