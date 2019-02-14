var side = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  slope: 0,
  length: 0,
  angle: 0,
  _s: null,

  create : function(x1, y1, x2, y2){
    var obj = Object.create(this);
    obj.x1 = x1;
    obj.y1 = y1;
    obj.x2 = x2;
    obj.y2 = y2;
    obj._s = vector.create(x2-x1, y2-y1);
    obj.length = Math.sqrt((x2-x1)**2 + (y2 - y1)**2);
    obj.slope = obj._s.getSlope();
    obj.angle = obj._s.getAngle();
    return obj;
  },

  getX1 : function(){
    return this.x1;
  },

  getY1 : function(){
    return this.y1;
  },

  getX2 : function(){
    return this.x2;
  },

  getY2: function(){
    return this.y2;
  },

  getLength : function(){
    return this.length;
  },

  getSlope : function(){
    return this.slope;
  },

  getAngle : function(){
      return this.angle;
  },
  getX_Intercept : function(){
    return (this.slope*this.x1 - this.y1)/this.slope;
  },

  getY_Intercept : function(){
    var m = this.slope;
    return (this.y1 - m * this.x1);
  },

  distanceFromOrigin : function(){
    var a = this.slope, b = -1, c = (this.getY_Intercept() != Infinity)?this.getY_Intercept():99999.0;
    c = (this.getY_Intercept() === -Infinity)? -99999.0 : c;
    a = (this.slope === Infinity) ? 99999.0 : a;
    a = (this.slope === -Infinity) ? -99999.0: a;
    var dist = Math.abs(a*0 + b*0 + c)/Math.sqrt(a*a + b*b);

    // console.log("distance from origin", dist, a, b, c);
    return dist;
  }
}
