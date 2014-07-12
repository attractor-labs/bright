function BrightAxis (axis_settings) {

  var x_axis_place = axis_settings.canvas().append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
    , y_axis_place = axis_settings.canvas().append("g").attr("class", "x axis")
    , x_axis       = null
    , y_axis       = null;

  function axis() {
    var output = {};

    output.x_axis = axis.x_axis();
    output.y_axis = axis.y_axis();

    x_axis_place.call(output.x_axis);
    y_axis_place.call(output.y_axis);

    return output;
  }

  axis.x_axis = function () {
    if (x_axis) { return x_axis } else {
      x_axis = d3.svg.axis().scale(axis_settings.x_scale).orient("bottom");
      return x_axis;
    }
  }

  axis.y_axis = function () {
    if (y_axis) { return y_axis } else {
      y_axis = d3.svg.axis().scale(axis_settings.y_scale).orient("left");
      return y_axis;
    }
  }

  return axis();
}
