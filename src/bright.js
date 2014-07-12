function Bright() {
  var width              = 100
    , height             = 200
    , render_target      = 'body'
    , initial_dataset    = []
    , data_stream        = null
    , chart_type         = 'linear';

  function chart() {
    if (chart.chart_type() == 'stacked-area') {
      BrightStackedArea(chart).activate()
    }
  }

  chart.chart_type = function(type) {
    if (!arguments.length) return chart_type; chart_type = type;
    return chart;
  }

  chart.initial_dataset = function(dataset) {
    if (!arguments.length) return initial_dataset; initial_dataset = dataset;
    return chart;
  }

  chart.data_stream = function(stream_function) {
    if (!arguments.length) return data_stream; data_stream = stream_function;
    return chart;
  }

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

  chart.activate = function() {
    return chart()
  }

  return chart;
}
