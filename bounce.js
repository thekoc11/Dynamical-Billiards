window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	context.transform(1, 0, 0, -1, 0, height);
	var	s = shape.create(),
		p = particle.create(width /2, height/2, Math.random()*5, 2*Math.PI*Math.random(), 0);
	//	context.fillStyle = "black";
	p.radius = 8;
	context.fillStyle = "#FF0000";
	context.beginPath();
	context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
	context.fill();

	//p.bounce = -0.9;
		// 	console.log(p.velocity.getX());
		// console.log(p.velocity.getY());

//	console.log(verts[1].getAngle());
	// console.log("velocity angle is",p.velocity.getAngle()*180/Math.PI);
	// console.log("position angle is",p.position.getAngle()*180/Math.PI);
	// update();

	function update() {
		context.clearRect(0, 0, width, height);
		//context.fillRect(0, 0, width, height);
		p.update();
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
		context.fill();
	 	// var s = shape.create();
		// context.moveTo(0,height);
		// context.lineTo(window.innerWidth, 0);
		// context.stroke();

		// console.log(p.velocity.getX());
		// console.log(p.velocity.getY());

		if(p.position.getX() + p.radius > width) {
			p.position.setX(width - p.radius);
			p.velocity.setX(p.velocity.getX() * p.bounce);
		}
		if(p.position.getX() - p.radius < 0) {
			p.position.setX(p.radius);
			p.velocity.setX(p.velocity.getX() * p.bounce);
		}
		if(p.position.getY() + p.radius > height) {
			p.position.setY(height - p.radius);
			p.velocity.setY(p.velocity.getY() * p.bounce);
		}
		if(p.position.getY() - p.radius < 0) {
			p.position.setY(p.radius);
			p.velocity.setY(p.velocity.getY() * p.bounce);
		}
		// if(p.position.getY() - (height/width)*p.position.getX() < p.radius){
		// 	p.position.setY((height/width)*p.position.getX() + p.radius);
		// 	if(p.velocity.getAngle() > 0){
		// 		p.velocity.setAngle(p.velocity.getAngle() + 2*verts[1].getAngle());
		// 	}
		// 	if(p.velocity.getAngle() < 0){
		// 		p.velocity.setAngle(-1*p.velocity.getAngle() + 2*verts[1].getAngle());
		// 	}
		// }
		requestAnimationFrame(update);
	}
};
