function BrightReader (reader_settings) {

  var dataset         = reader_settings.dataset()
    , stacked_dataset = null;

  function reader() {
    var output = {}; reader.parse_dates();
    output.dataset         = reader.dataset;
    output.stacked_dataset = reader.stacked_dataset;
    return output;
  }

  reader.dataset = function () {
    return dataset;
  }

  reader.stacked_dataset = function () {
    if (stacked_dataset) { return stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      var color = d3.scale.category20();
      color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));
      stacked_dataset = stack(color.domain().map(function(name) {
        return { name: name, values: dataset.map(function(d) { return { date: d.date, y: d[name] / 100 } }) };
      }));
      return stacked_dataset;
    }
  }

  reader.parse_date = function (date) {
    return d3.time.format("%y-%b-%d").parse(date);
  }

  reader.parse_dates = function () {
    dataset.forEach(function (datapoint) {
      datapoint.date = reader.parse_date(datapoint.date);
    });
  }

  return reader();
}


// var parseDate = d3.time.format("%y-%b-%d").parse,
  // data.forEach(function(d) {
  //   d.date = parseDate(d.date);
  // });

// var stack = d3.layout.stack()
//     .values(function(d) { return d.values; });

// color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));


  // var browsers = stack(color.domain().map(function(name) {
  //   return {
  //     name: name,
  //     values: data.map(function(d) {
  //       return {date: d.date, y: d[name] / 100};
  //     })
  //   };
  // }));

function BrightAxis (axis_settings) {

  var x_axis_place = axis_settings.canvas().append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
    , y_axis_place = axis_settings.canvas().append("g").attr("class", "x axis")
    , x_axis       = null
    , y_axis       = null;

  function axis() {
    var output = {};

    output.x_axis = axis.x_axis();
    output.y_axis = axis.y_axis();

    x_axis_place.call(output.x_axis);
    y_axis_place.call(output.y_axis);

    return output;
  }

  axis.x_axis = function () {
    if (x_axis) { return x_axis } else {
      x_axis = d3.svg.axis().scale(axis_settings.x_scale).orient("bottom");
      return x_axis;
    }
  }

  axis.y_axis = function () {
    if (y_axis) { return y_axis } else {
      y_axis = d3.svg.axis().scale(axis_settings.y_scale).orient("left");
      return y_axis;
    }
  }

  return axis();
}

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

function BrightBuilder (chart_elements) {
  var canvas_object  = null
    , scales_object  = null
    , axis_object    = null
    , dataset_object = null;

  function builder () {
    builder.draw_canvas().read_initial_dataset()
           .prepare_scales().build_axis();
  }

  builder.read_initial_dataset = function () {
    var read_settings     = {};
    read_settings.dataset = chart_elements.settings.initial_dataset;
    dataset_object        = chart_elements.reader(read_settings);

    return builder;
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
    var scales_settings     = {};
    scales_settings.dataset = dataset_object.dataset;
    scales_settings.width   = canvas_object.inner_width;
    scales_settings.height  = canvas_object.inner_height;
    scales_object           = chart_elements.scales(scales_settings);

    return builder;
  }

  builder.build_axis = function () {
    var axis_settings       = {};
    axis_settings.canvas    = canvas_object.canvas;
    axis_settings.x_scale   = scales_object.x_scale;
    axis_settings.y_scale   = scales_object.y_scale;
    axis_settings.height    = canvas_object.inner_height;
    axis_object             = chart_elements.axis(axis_settings);

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
    var chart_elements            = {};
    chart_elements.settings       = settings
    chart_elements.canvas         = BrightCanvas
    chart_elements.scales         = BrightScales
    chart_elements.axis           = BrightAxis
    chart_elements.chart          = BrightStackedArea
    chart_elements.reader         = BrightReader
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

var bright = Bright();