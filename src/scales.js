function BrightScales (scales_settings) {

  var this_class = this;
  this.x_scale = null;
  this.y_scale = null;

  this.scales = function () {
    var output     = {};

    output.x_scale = this_class.scales.x_scale();
    output.y_scale = this_class.scales.y_scale();

    this_class.x_scale.domain(d3.extent(scales_settings.dataset(), function(d) { return d.date; }));
    this_class.y_scale.domain([0, parseInt(scales_settings.y_max+0.1*scales_settings.y_max)]);

    return output;
  }

  this.scales.x_scale = function () {
    if (this_class.x_scale) { return this_class.x_scale } else {
      this_class.x_scale = d3.time.scale().range([0, scales_settings.width()])
      return this_class.x_scale;
    }
  }

  this.scales.y_scale = function () {
    if (this_class.y_scale) { return this_class.y_scale } else {
      this_class.y_scale = d3.scale.linear().range([scales_settings.height(), 0]);
      return this_class.y_scale;
    }
  }

  return this_class.scales();
}
