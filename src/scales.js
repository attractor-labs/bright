function BrightScales (scales_settings) {

  function scales() {
    var output     = {};
    output.x_scale = scales.x_scale;
    output.y_scale = scales.y_scale;

    return output;
  }

  scales.x_scale = function () {
    return d3.time.scale().range([0, scales_settings.width()]);
  }

  scales.y_scale = function () {
    return d3.scale.linear().range([scales_settings.height(), 0]);
  }

  return scales();
}
