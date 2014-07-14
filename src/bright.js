function Bright() {
  var width              = 100
    , height             = 200
    , target             = 'body'
    , initial_dataset    = []
    , data_stream        = null
    , chart_type         = 'stacked-area';

  function settings() {
    var chart_elements            = {};
    chart_elements.settings       = settings
    chart_elements.canvas         = BrightCanvas
    chart_elements.scales         = BrightScales
    chart_elements.axis           = BrightAxis
    chart_elements.chart          = BrightStackedArea
    chart_elements.reader         = BrightReader
    chart_elements.cropper        = BrightCropper
    chart_elements.tooltips       = BrightTooltips
    chart_elements.legend         = BrightLegend
    chart_elements.listener       = BrightListener
    return BrightBuilder(chart_elements).build()
  }

  settings.activate = function() {
    return settings()
  }

  settings.chart_type = function(type) {
    if (!arguments.length) return chart_type; chart_type = type;
    return settings;
  }

  settings.initial_dataset = function(dataset) {
    if (!arguments.length) return initial_dataset; initial_dataset = dataset;
    return settings;
  }

  settings.data_stream = function(stream_function) {
    if (!arguments.length) return data_stream; data_stream = stream_function;
    return settings;
  }

  settings.target = function(identifier) {
    if (!arguments.length) return target; target = identifier;
    return settings;
  }

  settings.width = function(value) {
    if (!arguments.length) return width; width = value;
    return settings;
  };

  settings.height = function(value) {
    if (!arguments.length) return height; height = value;
    return settings;
  };

  return settings;
}

var bright = Bright();