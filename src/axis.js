function BrightAxis (axis_settings) {

  var x_axis_place = axis_settings.canvas().append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
    , y_axis_place = axis_settings.canvas().append("g").attr("class", "x axis");

  function axis() {
    var output     = {};

    output.x_axis = axis.x_axis;
    output.y_axis = axis.y_axis;

    x_axis_place.call(output.x_axis());
    y_axis_place.call(output.y_axis());

    return output;
  }

  axis.x_axis = function () {
    return d3.svg.axis().scale(axis_settings.x_scale()).orient("bottom");
  }

  axis.y_axis = function () {
    return d3.svg.axis().scale(axis_settings.y_scale()).orient("left");
  }

  return axis();
}
