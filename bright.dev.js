function BrightLegend (legend_settings) {

  var day_distance = legend_settings.x_scale(new Date(0)) - legend_settings.x_scale(new Date(24*3600*1000));

  var tooltip_item_place = legend_settings.canvas().append("g").attr("class", "legend")

  var tooltip_item = tooltip_item_place.selectAll("rect.tooltipitem").data(legend_settings.color.domain());

  var tooltip_item_enter = tooltip_item.enter().append("rect")
                          .attr("class", "tooltipitem")
                          .attr("width", 15)
                          .attr("height", 15)
                          .attr("transform", function (d, i) {
                            if (i <= 2) {
                              return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                            } else if (i <= 5) {
                              return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                            } else {
                              return "translate( " + 180*(i - 6) + ", " + (legend_settings.inner_height()+70) + ")";
                            }
                          })
                          .attr("fill", function (d, i) { return legend_settings.color(d) });

  var tooltip_item_enter = tooltip_item.enter().append("text")
                          .attr("class", "tooltipitemtext")
                          .attr("dx", 18).attr("dy", 12)
                          .attr("style", "font-size: 12px")
                          .attr("transform", function (d, i) {
                            if (i <= 2) {
                              return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                            } else if (i <= 5) {
                              return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                            } else {
                              return "translate( " + 180*(i - 6) + ", " + (legend_settings.inner_height()+70) + ")";
                            }
                          })

  tooltip_item_enter.text(function (dat, i) { return dat })

  function legend () {}

  return legend();
}

function BrightTooltips (tooltips_settings) {

  var day_distance = tooltips_settings.x_scale(new Date(0)) - tooltips_settings.x_scale(new Date(24*3600*1000));

  var focus = tooltips_settings.canvas().append("g")
                               .attr("class", "focus")
                               .style("display", "none");

  focus.append("rect")
      .attr("class", "y0")
      .attr("width", 0.75)
      .attr("height", tooltips_settings.inner_height()-15);

  focus.append("text")
      .attr("class", "y0")
      .attr("style", "font-size: 12px")
      .attr("dy", "-1em");

  var legend_place = focus.append("rect")
      .attr("class", "tpbox")
      .attr("width", "200")
      .attr("height", tooltips_settings.color.domain().length*21)
      .attr("style", "fill: white; opacity: 0.7")

  focus.append("text")
       .attr("class", "tpcontent")
       .attr("style", "font-size: 12px")
       .attr("dy", "20")
       .attr("dx", "20");

  var tooltip_item_place = focus.append("g")

  var tooltip_item = tooltip_item_place.selectAll("rect.tooltipitem").data(tooltips_settings.color.domain());

  var tooltip_item_enter = tooltip_item.enter().append("rect")
                          .attr("class", "tooltipitem")
                          .attr("width", 15)
                          .attr("height", 15)
                          .attr("transform", function (d, i) { return "translate( 0, " + 20*i + ")"; })
                          .attr("fill", function (d, i) { return tooltips_settings.color(d) });

  var tooltip_item_enter = tooltip_item.enter().append("text")
                          .attr("class", "tooltipitemtext")
                          .attr("dx", 18).attr("dy", 12)
                          .attr("style", "font-size: 12px")
                          .attr("transform", function (d, i) { return "translate( 0, " + 20*i + ")"; })

  var overlay = tooltips_settings.canvas()
                .append("rect").attr("style", "fill: transparent")
                .attr("width", tooltips_settings.inner_width())
                .attr("height", tooltips_settings.inner_height())
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);

  var bisect_date = d3.bisector(function(d) { return d.date; }).left;

  function mousemove() {
    var x0 = tooltips_settings.x_scale.invert(d3.mouse(this)[0])
      , i  = bisect_date(tooltips_settings.dataset(), x0, 1)
      , d  = tooltips_settings.dataset()[i]
      , d_used  = tooltips_settings.shift ? tooltips_settings.dataset()[i+tooltips_settings.shift] : d;

    focus.select("rect.y0").transition().duration(50).attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");

    tooltip_item_enter.text(function (dat, i) { return "" + dat + " " + parseInt(d_used[dat]); })

    if (tooltips_settings.inner_width() - tooltips_settings.x_scale(d.date) > 200) {
      focus.select("rect.tpbox").attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");
      tooltip_item_place.attr("transform", "translate(" + (tooltips_settings.x_scale(d.date) + 5) + ", 20)")
    } else {
      focus.select("rect.tpbox").attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");
      focus.select("rect.tpbox").attr("transform", "translate(" + (tooltips_settings.x_scale(d.date) - 200) + ", 15)");
      tooltip_item_place.attr("transform", "translate(" + ((tooltips_settings.x_scale(d.date) - 200) + 5) + ", 20)");
    }
    focus.select("text.y0").transition().duration(50).attr("transform", "translate( 10, 20)").text(d_used.date);

  }

  function tooltips () {}

  return tooltips();
}

function BrightCropper (cropper_settings) {

  function cropper() {
    var output = {}
    cropper_settings.canvas_object.canvas()
                    .append("g")
                    .append("defs")
                    .append("clipPath")
                    .attr("id", "clippast")
                    .append("rect")
                    .attr("width", cropper_settings.canvas_object.inner_width())
                    .attr("height", cropper_settings.canvas_object.inner_height())

     cropper_settings.canvas_object.chart_space()
               .attr("clip-path", "url(#clippast)")

    cropper_settings.canvas_object.canvas()
                    .append("g")
                    .append("defs")
                    .append("clipPath")
                    .attr("id", "cropxaxisright")
                    .append("rect")
                    .attr("transform", "translate(-5," + (cropper_settings.canvas_object.inner_height() - 2) + ")")
                    .attr("width", cropper_settings.canvas_object.inner_width() + 5)
                    .attr("height", 20)

    return output;
  }

  return cropper();
}

 function BrightListener (listener_settings) {

  var initial_dataset = listener_settings.initial_dataset()
    , day_distance    = listener_settings.x_scale(new Date(0)) - listener_settings.x_scale(new Date(24*3600*1000))
    , chart = listener_settings.chart
    , painted_x_axis = listener_settings.painted_x_axis
    , painted_y_axis = listener_settings.painted_y_axis
    , area           = listener_settings.area
    , chart_place    = listener_settings.chart_place
    , steps = 1;

  function listen () {}

  listen.push = function (datapoint) {
    listen.enrich_initial_dataset(datapoint);

    var reader_output = listener_settings.reader({'dataset': function (){ return initial_dataset }});

    var recalculated_scales = listener_settings.scales({'y_max': reader_output.y_max, 'dataset': reader_output.dataset, 'width': function () { return listener_settings.width() - day_distance }, 'height': listener_settings.height});
    var recalculated_axis   = listener_settings.axis({'skip': true, 'painted_x': painted_x_axis, 'painted_y': painted_y_axis,'canvas': listener_settings.canvas, 'x_scale': recalculated_scales.x_scale, 'y_scale': recalculated_scales.y_scale, 'height': listener_settings.height});

    var recalculated_area   = d3.svg.area().interpolate("monotone")
                                .x(function(d) { return listener_settings.x_scale(d.date); })
                                .y0(function(d) { return recalculated_scales.y_scale(d.y0); })
                                .y1(function(d) { return recalculated_scales.y_scale(d.y0 + d.y); });

    chart_place = chart_place.data(reader_output.stacked_dataset());

    chart_place.attr("transform", "translate(" + day_distance*(steps-1) + ",0)")
               .attr("d", function(d) { return area(d.values); })
               .transition().duration(1000).attr("transform", "translate(" + day_distance*(steps) + ",0)")
               .attr("d", function(d) { return recalculated_area(d.values); });

    chart_place.enter().append("path")
                       .attr("d", function(d) { return area(d.values); })
                       .transition().duration(1000).attr("transform", "translate(" + day_distance*(steps) + ",0)")
                       .style("fill", function(d) { return reader_output.color(d.name); })
                       .attr("d", function(d) { return recalculated_area(d.values); });

    chart_place.exit().remove()

    painted_y_axis.transition().duration(1000).call(recalculated_axis.y_axis)

    recalculated_axis.painted_x_axis.attr("transform", "translate(" + day_distance*(0) + "," + listener_settings.height() + ")")
    recalculated_axis.painted_x_axis.transition().duration(1000).attr("transform", "translate(" + day_distance*(1) + "," + listener_settings.height() + ")")

    legend_settings = {}
    legend_settings.x_scale      = recalculated_scales.x_scale;
    legend_settings.canvas       = listener_settings.canvas;
    legend_settings.inner_height = listener_settings.height;
    legend_settings.inner_width  = listener_settings.width;
    legend_settings.color        = reader_output.color;
    legend_settings.dataset      = reader_output.dataset;
    d3.select(".legend").remove();
    listener_settings.legend(legend_settings);

    tooltips_settings = {}
    tooltips_settings.x_scale      = recalculated_scales.x_scale;
    tooltips_settings.canvas       = listener_settings.canvas;
    tooltips_settings.chart_space  = listener_settings.chart_space;
    tooltips_settings.inner_height = listener_settings.height;
    tooltips_settings.inner_width  = listener_settings.width;
    tooltips_settings.color        = reader_output.color;
    tooltips_settings.dataset      = reader_output.dataset;
    tooltips_settings.shift        = 1;
    listener_settings.tooltips(tooltips_settings)

    area = recalculated_area;

    initial_dataset.shift();
    steps++;


    return listen;
  }

  listen.enrich_initial_dataset = function (datapoint) {
    initial_dataset.push(datapoint);
    var id_length = initial_dataset.length;
    d3.keys(datapoint).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!initial_dataset[i][key]) { initial_dataset[i][key] = '0' };
        i++;
      }
    });

    d3.keys(initial_dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!initial_dataset[i][key]) { initial_dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(initial_dataset))
    });

    d3.keys(initial_dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (initial_dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          initial_dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
    // console.log(JSON.stringify(initial_dataset))
  }

  return listen;
}

function BrightStackedArea (chart_settings) {

  function chart() {
    var output = {}

    output.area = d3.svg.area().interpolate("monotone")
                 .x(function(d) { return chart_settings.x_scale(d.date); })
                 .y0(function(d) { return chart_settings.y_scale(d.y0); })
                 .y1(function(d) { return chart_settings.y_scale(d.y0 + d.y); });

    output.chart_identifier = "chart-" + Math.floor(Math.random()*10000000);


    output.chart_place = chart_settings.chart_space().selectAll('.' + output.chart_identifier)
                                       .data(chart_settings.dataset());

    output.chart = output.chart_place.enter().append("path").attr("class", '' + output.chart_identifier)
                         .attr("class", "area").attr("d", function(d) { return output.area(d.values); })
                         .style("fill", function(d) { return chart_settings.color(d.name); })

    output.chart_place.exit().remove();

    return output;
  }

  return chart();
}


function BrightReader (reader_settings) {

  var dataset         = JSON.parse(JSON.stringify(reader_settings.dataset()))
    , y_max           = 0
    , stacked_dataset = null
    , color           = null;

  function reader() {
    var output = {}; reader.parse_dates(); reader.enrich_dataset();

    color = d3.scale.category20();
    color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));
    reader.stacked_dataset();

    reader.get_y_max();

    output.dataset         = reader.dataset;
    output.stacked_dataset = reader.stacked_dataset;
    output.color           = reader.color();
    output.y_max           = y_max;
    return output;
  }

  reader.get_y_max = function () {
    var keys = d3.keys(dataset[0]).filter(function(key) { return key !== "date"; });
    dataset.forEach(function (datapoint){
      var current_sum = keys.map(function(attribute) { return(datapoint[attribute]/1) }).reduce(function(a, b) { return a + b })
      if (y_max < current_sum) { y_max = current_sum }
    });
  }

  reader.dataset = function () {
    return dataset;
  }

  reader.color = function () {
    return color;
  }

  reader.stacked_dataset = function () {
    if (stacked_dataset) { return stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      stacked_dataset = stack(color.domain().map(function(name) {
        return { name: name, values: dataset.map(function(d) { return { date: d.date, y: d[name]/1 } }) };
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

  reader.enrich_dataset = function () {
    var id_length = dataset.length;

    d3.keys(dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!dataset[i][key]) { dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(dataset))
    });

    d3.keys(dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
  }


  return reader();
}

function BrightAxis (axis_settings) {

  var x_axis_place = axis_settings.canvas().append("g").attr("clip-path", "url(#cropxaxisright)").append("g").attr("class", "x axis").attr("transform", "translate(0," + axis_settings.height() + ")")
    , y_axis_place = axis_settings.canvas().append("g").attr("clip-path", "url(#cropxayisright)").append("g").attr("class", "x axis")
    , x_axis       = null
    , y_axis       = null;

  function axis() {
    var output = {};

    output.x_axis = axis.x_axis();
    output.y_axis = axis.y_axis();

    output.x_axis_place = x_axis_place;
    output.y_axis_place = y_axis_place;


    var paint_x_target    = axis_settings.painted_x || x_axis_place;
    var paint_y_target    = axis_settings.painted_y || y_axis_place;
    output.painted_x_axis = paint_x_target.call(output.x_axis);

    if (!axis_settings.skip) {
      output.painted_y_axis = paint_y_target.call(output.y_axis);
    }

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
    y_scale.domain([0, parseInt(scales_settings.y_max+0.1*scales_settings.y_max)]);


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
  var canvas_object   = null
    , scales_object   = null
    , axis_object     = null
    , dataset_object  = null
    , chart_object    = null;

  function builder () {
    return builder.draw_canvas().read_initial_dataset()
                  .prepare_scales().build_axis().build_chart()
                  .crop_edges().prepare_legend().prepare_tooltips().listen();
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
    scales_settings.y_max   = dataset_object.y_max;
    scales_settings.width   = canvas_object.inner_width;
    scales_settings.height  = canvas_object.inner_height;
    scales_object           = chart_elements.scales(scales_settings);

    return builder;
  }

  builder.build_axis = function () {
    var axis_settings        = {};
    axis_settings.canvas     = canvas_object.canvas;
    axis_settings.x_scale    = scales_object.x_scale;
    axis_settings.y_scale    = scales_object.y_scale;
    axis_settings.height     = canvas_object.inner_height;
    axis_object              = chart_elements.axis(axis_settings);

    return builder;
  }

  builder.build_chart = function () {
    var chart_settings         = {};
    chart_settings.chart_space = canvas_object.chart_space;
    chart_settings.dataset     = dataset_object.stacked_dataset;
    chart_settings.color       = dataset_object.color;
    chart_settings.x_scale     = scales_object.x_scale;
    chart_settings.y_scale     = scales_object.y_scale;
    chart_object               = chart_elements.chart(chart_settings);

    return builder;
  }

  builder.crop_edges = function () {
    var crop_settings = {}
    crop_settings.canvas_object = canvas_object;
    crop_settings.axis_object   = axis_object;
    crop_object                 = chart_elements.cropper(crop_settings);
    return builder;
  }

  builder.prepare_tooltips = function () {
    var tooltips_settings = {}
    tooltips_settings.x_scale      = scales_object.x_scale;
    tooltips_settings.canvas       = canvas_object.canvas;
    tooltips_settings.chart_space  = canvas_object.chart_space;
    tooltips_settings.inner_height = canvas_object.inner_height;
    tooltips_settings.inner_width  = canvas_object.inner_width;
    tooltips_settings.color        = dataset_object.color;
    tooltips_settings.dataset      = dataset_object.dataset;
    tooltips_object                = chart_elements.tooltips(tooltips_settings);
    return builder;
  }

  builder.prepare_legend = function () {
    var legend_settings = {}
    legend_settings.x_scale      = scales_object.x_scale;
    legend_settings.canvas       = canvas_object.canvas;
    legend_settings.inner_height = canvas_object.inner_height;
    legend_settings.inner_width  = canvas_object.inner_width;
    legend_settings.color        = dataset_object.color;
    legend_settings.dataset      = dataset_object.dataset;
    legend_object                = chart_elements.legend(legend_settings);
    return builder;
  }

  builder.listen = function () {
    var listener_settings = {};
    listener_settings.tooltips         = chart_elements.tooltips
    listener_settings.legend           = chart_elements.legend

    listener_settings.canvas           = canvas_object.canvas;
    listener_settings.chart            = chart_object.chart;
    listener_settings.chart_identifier = chart_object.chart_identifier;
    listener_settings.chart_place      = chart_object.chart_place;
    listener_settings.chart_space      = canvas_object.chart_space;
    listener_settings.area             = chart_object.area;
    listener_settings.reader           = chart_elements.reader;
    listener_settings.x_scale          = scales_object.x_scale;
    listener_settings.y_scale          = scales_object.y_scale;

    listener_settings.width            = canvas_object.inner_width;
    listener_settings.height           = canvas_object.inner_height;
    listener_settings.scales           = chart_elements.scales;
    listener_settings.painted_x_axis   = axis_object.painted_x_axis;
    listener_settings.painted_y_axis   = axis_object.painted_y_axis;
    listener_settings.axis             = chart_elements.axis;


    listener_settings.initial_dataset  = chart_elements.settings.initial_dataset;

    return chart_elements.listener(listener_settings);
  }

  builder.build = function () {
    return builder();
  }

  return builder;
}

function BrightCanvas (canvas_settings) {

  var margin         = { top: 20, right: 20, bottom: 85, left: 50 }

    , canvas_element = d3.select(canvas_settings.target())
                         .append("svg").attr('style', 'background-color: transparent')
                         .attr("width", canvas_settings.width())
                         .attr("height", canvas_settings.height())
                         .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    , chart_space    = canvas_element.append("g");

  function canvas() {
    var output          = {};
    output.canvas       = canvas.canvas;
    output.chart_space  = canvas.chart_space;
    output.inner_width  = canvas.inner_width;
    output.inner_height = canvas.inner_height;

    return output;
  }

  canvas.chart_space  = function () {
    return chart_space;
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