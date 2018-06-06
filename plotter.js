var trace = {
  x: [],
  y: [],
  mode: 'markers',

  create: function(x, y){
    var obj = Object.create(this);

    obj.x = x;
    obj.y = y;
    return obj;
  },
};

var layout = {};
