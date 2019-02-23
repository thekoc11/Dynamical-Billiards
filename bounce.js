const data = [];
const dataLength = [],
	dataAngle = [];
const dataset = [];
const label = [];
const datasetSize = 100;
var timeLimit;

const ex = [];
tdata = [];

const labelSet = [
    'Rational',
    'Irrational'
];


function userInputs() {


	var N, T, txt;
	timeLimit = document.getElementById("timeStep").value;
	var Time = [];
	N = 10; //document.getElementById("number").value;
	T = Math.floor(Math.random() * 2); //document.getElementById("confirmation").value;

	if (isNaN(N) || isNaN(T) || T < 0 || T > 1) {
		txt = "Input not valid";
	} else {
		txt = "";
	}
	while (dataset.length < datasetSize) {
		T = Math.floor(Math.random() * 2);
		var canvas = document.getElementById("canvas"),
			context = canvas.getContext("2d"),
			width = canvas.width = window.innerWidth,
			height = canvas.height = window.innerHeight;
		context.transform(1, 0, 0, -1, 0, height);
		var s = shape.create(N, T);
		var p = particle.create(s.particleInitiator(), Math.random() * 360, 1, Math.random() * 360);
		var x = p.position.getX(),
			y = p.position.getY();

		p.radius = 8;
		context.beginPath();
		context.fillStyle = 'blue';
		context.arc(0, 0, p.radius, 0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
		context.fill();
		time = 0;
		let _dataVal;

		while (time < timeLimit) {
			time = p.update(s, time);
			data.push([p.position, time]);
			dataLength.push(p.position.getLength());
			dataAngle.push(p.position.getAngle());
			Time.push(time);
			time = time + 1;
			l = data.length;
			// console.log("the value of t is", time);
			// plt(Time, p);
			// console.log("Data recorded?", data[l-1][0].getLength());
		}
		// update();
		// context.clearRect(-width, -height, 2*width, 2*height);
		// update();
		// console.log("Particle X and Y (initial)", x, y, s.vertsX[0], T);
		for (i = 0; i < dataLength.length; ++i) {
			if (!isNaN(dataLength[i]) && dataLength[i] !== Infinity) {
				ex.push([dataLength[i]/s.verts[0].getLength(), dataAngle[i]/360]);
			}
		}

		// console.log(ex[0]);
		if(ex.length !== 0){
			_dataVal = pca(ex);
			dataset.push(_dataVal);
			label.push(T);
			// console.log(_dataVal);
		}
		
		// pca(ex).then((res)=>{
		// 	_dataVal = res;
		// 	console.log(res);
		// }).catch((err) => console.log(err));
		l = data.length;
		tdata.push(data);

		ex.splice(0, ex.length);
		data.splice(0, data.length);
		dataLength.splice(0, dataLength.length);
		dataAngle.splice(0, dataAngle.length);

		p.clear();
		s.clear();
		console.log("Code Completion", dataset.length);
	}
	
	//Create Tensors that can be used as Training and Testing sets from the obtained dataset. %data for test= 1.5%
	[xTrain, xTest, yTrain, yTest] = convertToTensors(dataset, label, 0.2);

	// Classify the obtained data and predict
	classify(xTrain, xTest, yTrain, yTest);

	function update() {
		if (time < timeLimit) {
			time = p.update(s, time);
			context.fillStyle = "#F00000";
			context.strokeStyle = 'green';
			context.lineWidth = 1;
			context.lineTo(p.position.getX(), p.position.getY());
			context.stroke();
			context.beginPath();
			context.arc(p.position.getX(), p.position.getY(), p.radius - 4, 0, Math.PI * 2, false);
			context.fill();

			if (p.position.getX() + p.radius > width) {
				p.position.setX(width - p.radius);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if (p.position.getX() - p.radius < -width) {
				p.position.setX(p.radius - width);
				p.velocity.setX(p.velocity.getX() * p.bounce);
			}
			if (p.position.getY() + p.radius > height) {
				p.position.setY(height - p.radius);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
			if (p.position.getY() - p.radius < -height) {
				p.position.setY(p.radius - height);
				p.velocity.setY(p.velocity.getY() * p.bounce);
			}
			time = time + 1;
			// console.log("the value of time is now", time, timeLimit, data.length);
			var l = data.length;
			data.push([p.position, time]);
			dataLength.push(p.position.getLength());
			dataAngle.push(p.position.getAngle());
			Time.push(time);
			// console.log("position angle at time", time , " is: ", data[l].getAngle());
			// plt( Time, p);
			requestAnimationFrame(update);
		}
		// else{

		// }
	}
};

function plt(Time, p) {

	console.log("The size of the arrays is: ", dataLength.length, Time.length);

	var data1 = trace.create(Time, dataLength);
	var data2 = trace.create(Time, dataAngle);
	data1.name = "LengthData";
	data2.name = "AngleData";
	data1.line = {
		color: 'red',
		width: 1
	};
	var Data = [data1];
	layout.yaxis = {
		title: 'Distance from Origin'
	};
	layout.xaxis = {
		title: 'Time Elapsed'
	}
	Plotly.newPlot('LengthVsT', Data, layout);

	data2.line = {
		color: 'green',
		width: 1
	};
	Data = [data2];
	layout.yaxis = {
		title: 'Angle in degrees'
	};
	Plotly.newPlot('AngleVsT', Data, layout);

};