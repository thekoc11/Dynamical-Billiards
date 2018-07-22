window.onload = function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	context.transform(1, 0, 0, -1, 0, height);
	var	s = shape.create(10);
  var p = particle.create(s.particleInitiator(), Math.random() * 360, 1, Math.random() * 360);
	var x = p.position.getX(), y = p.position.getY();
	//	context.fillStyle = "black";
	p.radius = 8;
	context.fillStyle = "#FF0000";
	context.beginPath();
	context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
	context.fill();
	var time = 0;
// for(var i = 0; i < 5; i += 1){
		// time = p.update(s, time);
		// console.log("least time is", time);

/*		context.fillStyle = "#FFF000";
		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius, 0, Math.PI * 2, false);
		context.fill();}*/
	update();

	function update() {
		// context.clearRect(0, 0, width, height);
		//context.fillRect(0, 0, width, height);
		time = p.update(s, time);
		context.fillStyle = "#FFF000";
		context.beginPath();
		context.arc(p.position.getX(), p.position.getY(), p.radius - 4, 0, Math.PI * 2, false);
		context.fill();
	 	// console.log("Update function running", p.position.getX(), p.position.getY());

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
