function Bright() {
  var width         = 100
    , height        = 200
    , render_target = 'body';

  function chart() {}

  chart.render_target = function(identifier) {
    if (!arguments.length) return render_target; render_target = identifier;
    return chart;
  }

  chart.width = function(value) {
    if (!arguments.length) return width; width = value;
    return chart;
  };

  chart.height = function(value) {
    if (!arguments.length) return height; height = value;
    return chart;
  };

  return chart;
}
