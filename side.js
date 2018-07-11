var side = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  slope: 0,
  length: 0,
  _s: 0,

  create : function(x1, y1, x2, y2){
    var obj = Object.create(this);
    obj.x1 = x1;
    obj.y1 = y1;
    obj.x2 = x2;
    obj.y2 = y2;
    obj._s = vector.create(x2-x1, y2-y1);
    obj.length = Math.sqrt((x2-x1)**2 + (y2 - y1)**2);
    obj.slope = obj._s.getSlope();
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

  getX_Intercept : function(){
    return (this.slope*this.x1 - this.y1)/this.slope;
  },

  getY_Intercept : function(){
    var m = this.slope;
    return (this.y1 - m * this.x1);
  },

}
