function Bright() {
  var this_class = this;

  this.width              = 100;
  this.height             = 200;
  this.target             = 'body';
  this.date_format        = '%y-%b-%d';
  this.time_interval      = 5000;
  this.initial_dataset    = [];
  this.data_stream        = null;
  this.chart_identifier   = "chart" + Math.floor(Math.random()*10000000);
  this.chart_type         = 'stacked-area';

  this.settings = function () {
    var chart_elements            = {};
    chart_elements.settings       = this_class.settings
    chart_elements.canvas         = BrightCanvas
    chart_elements.scales         = BrightScales
    chart_elements.axis           = BrightAxis
    chart_elements.chart          = BrightStackedArea
    chart_elements.reader         = BrightReader
    chart_elements.cropper        = BrightCropper
    chart_elements.tooltips       = BrightTooltips
    chart_elements.legend         = BrightLegend
    chart_elements.listener       = BrightListener
    return new BrightBuilder(chart_elements).build()
  }

  this.settings.activate = function() {
    return this_class.settings()
  }

  this.settings.chart_identifier = function() {
    return this_class.chart_identifier;
  }

  this.settings.time_interval = function(interval) {
    if (!arguments.length) return this_class.time_interval; this_class.time_interval = interval;
    return this_class.settings;
  }

  this.settings.date_format = function(format) {
    if (!arguments.length) return this_class.date_format; this_class.date_format = format;
    return this_class.settings;
  }

  this.settings.chart_type = function(type) {
    if (!arguments.length) return this_class.chart_type; this_class.chart_type = type;
    return this_class.settings;
  }

  this.settings.initial_dataset = function(dataset) {
    if (!arguments.length) return this_class.initial_dataset; this_class.initial_dataset = dataset;
    return this_class.settings;
  }

  this.settings.data_stream = function(stream_function) {
    if (!arguments.length) return this_class.data_stream; this_class.data_stream = stream_function;
    return this_class.settings;
  }

  this.settings.target = function(identifier) {
    if (!arguments.length) return this_class.target; this_class.target = identifier;
    return this_class.settings;
  }

  this.settings.width = function(value) {
    if (!arguments.length) return this_class.width; this_class.width = value;
    return this_class.settings;
  };

  this.settings.height = function(value) {
    if (!arguments.length) return this_class.height; this_class.height = value;
    return this_class.settings;
  };

  return this_class.settings;
}

var bright = Bright();
