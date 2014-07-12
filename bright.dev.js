function BrightAxis (axis_settings) {

  var x_axis_place = axis_settings.canvas().append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
    , y_axis_place = axis_settings.canvas().append("g").attr("class", "x axis");

  function axis() {
    var output     = {};

    output.x_axis = axis.x_axis;
    output.y_axis = axis.y_axis;

    x_axis_place.call(output.x_axis());
    y_axis_place.call(output.y_axis());

    return output;
  }

  axis.x_axis = function () {
    return d3.svg.axis().scale(axis_settings.x_scale()).orient("bottom");
  }

  axis.y_axis = function () {
    return d3.svg.axis().scale(axis_settings.y_scale()).orient("left");
  }

  return axis();
}

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

function BrightBuilder (chart_elements) {
  var canvas_object = null
    , scales_object = null
    , axis_object   = null;

  function builder () {
    builder.draw_canvas().prepare_scales().build_axis();
    // canvas_object()
    // alert(JSON.stringify(chart_elements.settings.width()))
  }

  builder.draw_canvas = function () {
    var canvas_settings    = {};
    canvas_settings.width  = chart_elements.settings.width;
    canvas_settings.height = chart_elements.settings.height;
    canvas_settings.target = chart_elements.settings.target;
    canvas_object          = chart_elements.canvas(canvas_settings);

    return builder;
  }

  builder.prepare_scales = function () {
    var scales_settings    = {};
    scales_settings.width  = canvas_object.inner_width;
    scales_settings.height = canvas_object.inner_height;
    scales_object          = chart_elements.scales(scales_settings);

    return builder;
  }

  builder.build_axis = function () {
    var axis_settings     = {};
    axis_settings.canvas  = canvas_object.canvas;
    axis_settings.x_scale = scales_object.x_scale;
    axis_settings.y_scale = scales_object.y_scale;
    axis_settings.height  = canvas_object.inner_height;
    axis_object           = chart_elements.axis(axis_settings);

    return builder;
  }

  builder.build = function () {
    return builder()
  }

  return builder;
}

function BrightCanvas (canvas_settings) {

  var margin         = { top: 20, right: 20, bottom: 30, left: 50 }
    , canvas_element = d3.select(canvas_settings.target())
                         .append("svg").attr('style', 'background-color: lightblue')
                         .attr("width", canvas_settings.width())
                         .attr("height", canvas_settings.height())
                         .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  function canvas() {
    var output          = {};
    output.canvas       = canvas.canvas;
    output.inner_width  = canvas.inner_width;
    output.inner_height = canvas.inner_height;

    return output;
  }

  canvas.canvas  = function () {
    return canvas_element;
  }

  canvas.inner_width  = function () {
    return canvas_settings.width() - margin.left - margin.right;
  }

  canvas.inner_height = function () {
    return canvas_settings.height() - margin.top - margin.bottom;
  }

  return canvas();
}

function BrightStackedArea (parent_chart) {

  function chart() {
    alert('YO! ' + parent_chart.render_target())
  }

  return chart;
}

function Bright() {
  var width              = 100
    , height             = 200
    , target             = 'body'
    , initial_dataset    = []
    , data_stream        = null
    , chart_type         = 'stacked-area';

  function settings() {
    var chart_elements      = {};
    chart_elements.settings = settings
    chart_elements.canvas   = BrightCanvas
    chart_elements.scales   = BrightScales
    chart_elements.axis     = BrightAxis
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
