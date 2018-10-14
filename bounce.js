const data = [];

function userInputs() {


	var N, T, txt;
	const timeLimit = document.getElementById("timeStep").value;
	var Time = [];
	N = document.getElementById("number").value;
	T = document.getElementById("confirmation").value;
	 
	if(isNaN(N) || isNaN(T) || T < 0 || T > 1){
		txt = "Input not valid";
	}
	else{
		txt = "";
	}
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	context.transform(1, 0, 0, -1, 0, height);
	var	s = shape.create(N, T);
  var p = particle.create(s.particleInitiator(), Math.random() * 360, 1, Math.random() * 360);
	var x = p.position.getX(), y = p.position.getY();
	//	context.fillStyle = "black";
	p.radius = 8;
	context.fillStyle = "#FF0000";
	context.beginPath();
	context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
	context.fill();
	var time = 0;
	data.push(p.position);
	Time.push(time);
// for(var i = 0; i < 5; i += 1){
		// time = p.update(s, time);
		// console.log("least time is", time);

/*		context.fillStyle = "#FFF000";
		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
		context.fill();}*/
	update();

	function update() {
		if(time < timeLimit){
			time = p.update(s, time);
			context.fillStyle = "#F00000";
			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), p.radius - 4, 0, Math.PI * 2, false);
			context.fill();

			if(p.position.getX() + p.radius > width) {
				p.position.setX(width - p.radius);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if(p.position.getX() - p.radius < -width) {
				p.position.setX(p.radius - width);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if(p.position.getY() + p.radius > height) {
				p.position.setY(height - p.radius);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
			if(p.position.getY() - p.radius < -height) {
				p.position.setY(p.radius - height);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
			time = time + 1;
			// console.log("the value of time is now", time, timeLimit, data.length);
			var l = data.length;
			data.push(p);
			Time.push(data, time);
			console.log("position angle at time", time , " is: ", data[l].position.getAngle());
			plt(Time);
			requestAnimationFrame(update);
		}
		// else{
			
		// }
	}
};

function plt(data, Time){
	var dataLength = [], dataAngle = []; 
	console.log("The size of the arrays is: ", data.length);
			for(var i = 0; i < data.length; i++){
				dataLength.push(data[i].position.getLength());
				dataAngle.push(data[i].position);
			}
			var data1 = trace.create(dataLength, Time);
			var data2 = trace.create(dataAngle, Time);
			data1.name = "LengthData";
			data2.name = "AngleData";
			var Data = [data1, data2];
			Plotly.newPlot('dataVsT', Data, layout);
};