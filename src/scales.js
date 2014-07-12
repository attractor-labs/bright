function BrightScales (scales_settings) {

  var x_scale = null
    , y_scale = null;

  function scales() {
    var output     = {};
    output.x_scale = scales.x_scale();
    output.y_scale = scales.y_scale();

    x_scale.domain(d3.extent(scales_settings.dataset(), function(d) { return d.date; }));
    y_scale.domain([0, 2]);

    return output;
  }

  scales.x_scale = function () {
    if (x_scale) { return x_scale } else {
      x_scale = d3.time.scale().range([0, scales_settings.width()])
      return x_scale;
    }
  }

  scales.y_scale = function () {
    if (y_scale) { return y_scale } else {
      y_scale = d3.scale.linear().range([scales_settings.height(), 0]);
      return y_scale;
    }
  }

  return scales();
}
