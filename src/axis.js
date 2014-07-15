function BrightAxis (axis_settings) {

  var this_class    = this;
  this.x_axis_place = axis_settings.canvas().append("g").attr("clip-path", "url(#cropxaxisright" + axis_settings.chart_identifier() + " )").append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
  this.y_axis_place = axis_settings.canvas().append("g").attr("clip-path", "url(#cropxayisright" + axis_settings.chart_identifier() + " )").append("g").attr("class", "x axis")
  this.x_axis       = null
  this.y_axis       = null;

  this.axis = function () {
    var output = {};

    output.x_axis = this_class.axis.x_axis();
    output.y_axis = this_class.axis.y_axis();

    output.x_axis_place = this_class.x_axis_place;
    output.y_axis_place = this_class.y_axis_place;


    var paint_x_target    = axis_settings.painted_x || this_class.x_axis_place;
    var paint_y_target    = axis_settings.painted_y || this_class.y_axis_place;
    output.painted_x_axis = paint_x_target.call(output.x_axis);

    if (!axis_settings.skip) {
      output.painted_y_axis = paint_y_target.call(output.y_axis);
    }

    return output;
  }

  this.axis.x_axis = function () {
    if (this_class.x_axis) { return this_class.x_axis } else {
      this_class.x_axis = d3.svg.axis().scale(axis_settings.x_scale).orient("bottom");
      return this_class.x_axis;
    }
  }

  this.axis.y_axis = function () {
    if (this_class.y_axis) { return this_class.y_axis } else {
      this_class.y_axis = d3.svg.axis().scale(axis_settings.y_scale).orient("left");
      return this_class.y_axis;
    }
  }

  return this_class.axis();
}
