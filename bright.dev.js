function Bright() {
  var width  = 100
    , height = 200;

  function chart() {}

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
