var particle = {
	position: null,
	velocity: null,
	mass: 1,
	radius: 0,
	bounce: -1,
	gravity: 0,
	_t:1,

	create: function(l, theta, speed, direction) {
		var obj = Object.create(this);
		obj.position = vector.createP(l, theta);
		obj.velocity = vector.createP(speed, direction);

		// obj.gravity = vector.create(0, grav || 0);
		return obj;
	},

	clear: function(){
		this.position = null;
		this.velocity = null;
		this.mass = 1;
		this.radius = 0;
		this.bounce = -1;
		this.gravity = 0;
		this._t = 1;
	},
	getPosition : function(){
		return this.position;
	},
	accelerate: function(accel) {
		this.velocity.addTo(accel);
	},

	update: function(s, t_) {
		var t = s.calcTimeIndex(this);
		// this.gravity.multiplyBy(this._t);
		// this.velocity.addTo(this.gravity);
		this.velocity.multiplyBy(this._t);
		this.position.addTo(this.velocity);

		var main = s.sides[t];
		if((this.position.getX() == main.getX1() || this.position.getX() == main.getX2()) && (this.position.getY() == main.getY1() || this.position.getY() == main.getY2())){
			this.velocity = vector.createP(0, 0);
		}
		else{
			var mainAngle = main.getAngle(), normal = 0;

			if(mainAngle > 90 && mainAngle < 270){
				normal = mainAngle - 90;
			}
			else {
				normal = mainAngle + 90;
			}

			if(normal > 360){
				normal = normal - 360;
			}
		// console.log("Angle of side and normal", mainAngle, normal);

		// if(t_ == Math.floor(this._t))
		// {
			// console.log("The least time is", this._t);
			var incident = this.velocity.getAngle();
			var diff = Math.abs(normal - incident);
			var reflected = 0;

			if(incident < normal)
			{
				reflected = (incident + 2*diff) - 180;
			}
			else {
				reflected = (incident - 2*diff) + 180;
			}
			this.velocity = vector.createP(1, reflected);
			// console.log("Particle Velocity now is vx", this.velocity.getX(), " and vy", this.velocity.getY());
			// t_ = 0;
		// }
		// else {
			// t_ = t_ + 1;
		// }
		}
		return t_;
	},

	setTime: function(t) {
		this._t = t;
	},

	angleTo: function(p2) {
		return Math.atan2(p2.position.getY() - this.position.getY(), p2.position.getX() - this.position.getX());
	},

	distanceTo: function(p2) {
		var dx = p2.position.getX() - this.position.getX(),
			dy = p2.position.getY() - this.position.getY();

		return Math.sqrt(dx * dx + dy * dy);
	},

	gravitateTo: function(p2) {
		var grav = vector.create(0, 0),
			dist = this.distanceTo(p2);

		grav.setLength(p2.mass / (dist * dist));
		grav.setAngle(this.angleTo(p2));
		this.velocity.addTo(grav);
	}
};
