function BrightBuilder (chart_elements) {
  var canvas_object = null;

  function builder () {
    builder.draw_canvas()
    canvas_object()
    // alert(JSON.stringify(chart_elements.settings.width()))
  }

  builder.draw_canvas = function () {
    var canvas_settings    = {};
    canvas_settings.width  = chart_elements.settings.width;
    canvas_settings.height = chart_elements.settings.height;
    canvas_settings.target = chart_elements.settings.target;
    canvas_object          = chart_elements.canvas(canvas_settings);

    return builder
  }

  builder.build = function () {
    return builder()
  }

  return builder;
}

function BrightCanvas (canvas_settings) {

  function canvas() {
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
      , width  = canvas_settings.width()  - margin.left - margin.right
      , height = canvas_settings.height() - margin.top  - margin.bottom
      , output = {};

    output.canvas  = d3.select(canvas_settings.target()).append("svg").attr('style', 'background-color: lightblue').attr("width", canvas_settings.width()).attr("height", canvas_settings.height()).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    output.x_scale = d3.time.scale().range([0, width]);
    output.y_scale = d3.scale.linear().range([height, 0]);
    output.x_axis  = d3.svg.axis().scale(output.x_scale).orient("bottom");
    output.y_axis  = d3.svg.axis().scale(output.y_scale).orient("left");

    output.canvas.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(output.x_axis);
    output.canvas.append("g").attr("class", "y axis").call(output.y_axis);

    return output;
  }

  return canvas;
}

// DOMAIN IS NOT SPECIFIED!!!
function BrightStackedArea (parent_chart) {

  function chart() {
    alert('YO! ' + parent_chart.render_target())
  }

  return chart;
}

function Bright() {
  var width              = 100
    , height             = 200
    , target      = 'body'
    , initial_dataset    = []
    , data_stream        = null
    , chart_type         = 'stacked-area';

  function settings() {
    var chart_elements      = {};
    chart_elements.settings = settings
    chart_elements.canvas   = BrightCanvas
    chart_elements.chart    = BrightStackedArea
    BrightBuilder(chart_elements).build()
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
