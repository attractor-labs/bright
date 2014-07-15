function BrightLegend (legend_settings) {

  var day_distance = legend_settings.x_scale(new Date(0)) - legend_settings.x_scale(new Date(24*3600*1000));

  var legend_item_place = legend_settings.canvas().append("g").attr("class", "legend")

  var legend_item = legend_item_place.selectAll("rect.legenditem").data(legend_settings.color.domain());

  var legend_item_enter = legend_item.enter().append("rect")
                          .attr("class", "legenditem")
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

  var legend_item_enter = legend_item.enter().append("text")
                          .attr("class", "legenditemtext")
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

  legend_item_enter.text(function (dat, i) { return dat })

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

    var reader_output = new listener_settings.reader({'date_format': listener_settings.date_format, 'dataset': function (){ return initial_dataset }});

    var recalculated_scales = new listener_settings.scales({'y_max': reader_output.y_max, 'dataset': reader_output.dataset, 'width': function () { return listener_settings.width() - day_distance }, 'height': listener_settings.height});
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

  var this_class = this;

  this.dataset         = JSON.parse(JSON.stringify(reader_settings.dataset()));
  this.y_max           = 0;
  this.stacked_dataset = null;
  this.color           = null;

  this.reader = function () {
    var output = {}; this_class.reader.parse_dates(); this_class.reader.enrich_dataset();

    this_class.color = d3.scale.category20();
    this_class.color.domain(d3.keys(this_class.dataset[0]).filter(function(key) { return key !== "date"; }));
    this_class.reader.stacked_dataset();

    this_class.reader.get_y_max();

    output.dataset         = this_class.reader.dataset;
    output.stacked_dataset = this_class.reader.stacked_dataset;
    output.color           = this_class.reader.color();
    output.y_max           = this_class.y_max;
    return output;
  }

  this.reader.get_y_max = function () {
    var keys = d3.keys(this_class.dataset[0]).filter(function(key) { return key !== "date"; });
    this_class.dataset.forEach(function (datapoint){
      var current_sum = keys.map(function(attribute) { return(datapoint[attribute]/1) }).reduce(function(a, b) { return a + b })
      if (this_class.y_max < current_sum) { this_class.y_max = current_sum }
    });
  }

  this.reader.dataset = function () {
    return this_class.dataset;
  }

  this.reader.color = function () {
    return this_class.color;
  }

  this.reader.stacked_dataset = function () {
    if (this_class.stacked_dataset) { return this_class.stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      this_class.stacked_dataset = stack(this_class.color.domain().map(function(name) {
        return { name: name, values: this_class.dataset.map(function(d) { return { date: d.date, y: d[name]/1 } }) };
      }));
      return this_class.stacked_dataset;
    }
  }

  this.reader.parse_date = function (date) {
    return d3.time.format(reader_settings.date_format()).parse(date);
  }

  this.reader.parse_dates = function () {
    this_class.dataset.forEach(function (datapoint) {
      datapoint.date = this_class.reader.parse_date(datapoint.date);
    });
  }

  this.reader.enrich_dataset = function () {
    var id_length = this_class.dataset.length;

    d3.keys(this_class.dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!this_class.dataset[i][key]) { this_class.dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(dataset))
    });

    d3.keys(this_class.dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (this_class.dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          this_class.dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
  }


  return this.reader();
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

  var this_class = this;
  this.x_scale = null;
  this.y_scale = null;

  this.scales = function () {
    var output     = {};

    output.x_scale = this_class.scales.x_scale();
    output.y_scale = this_class.scales.y_scale();

    this_class.x_scale.domain(d3.extent(scales_settings.dataset(), function(d) { return d.date; }));
    this_class.y_scale.domain([0, parseInt(scales_settings.y_max+0.1*scales_settings.y_max)]);

    return output;
  }

  this.scales.x_scale = function () {
    if (this_class.x_scale) { return this_class.x_scale } else {
      this_class.x_scale = d3.time.scale().range([0, scales_settings.width()])
      return this_class.x_scale;
    }
  }

  this.scales.y_scale = function () {
    if (this_class.y_scale) { return this_class.y_scale } else {
      this_class.y_scale = d3.scale.linear().range([scales_settings.height(), 0]);
      return this_class.y_scale;
    }
  }

  return this_class.scales();
}

function BrightBuilder (chart_elements) {

  var this_class       = this;
  this.canvas_object   = null
  this.scales_object   = null
  this.axis_object     = null
  this.dataset_object  = null
  this.chart_object    = null;

  this.builder = function () {
    return this_class.builder.draw_canvas().read_initial_dataset()
                     .prepare_scales().build_axis().build_chart()
                     .crop_edges().prepare_legend().prepare_tooltips().listen();
  }

  this.builder.canvas_object  = function () {
    return this_class.canvas_object
  }

  this.builder.scales_object  = function () {
    return this_class.scales_object
  }

  this.builder.axis_object    = function () {
    return this_class.axis_object
  }

  this.builder.dataset_object = function () {
    return this_class.dataset_object
  }

  this.builder.chart_object   = function () {
    return this_class.chart_object
  }

  this.builder.read_initial_dataset = function () {
    var read_settings         = {};
    read_settings.dataset     = chart_elements.settings.initial_dataset;
    read_settings.date_format = chart_elements.settings.date_format;
    this_class.dataset_object = new chart_elements.reader(read_settings);

    return this_class.builder;
  }

  this.builder.draw_canvas = function () {
    var canvas_settings      = {};
    canvas_settings.width    = chart_elements.settings.width;
    canvas_settings.height   = chart_elements.settings.height;
    canvas_settings.target   = chart_elements.settings.target;
    this_class.canvas_object = new chart_elements.canvas(canvas_settings);

    return this_class.builder;
  }

  this.builder.prepare_scales = function () {
    var scales_settings      = {};
    scales_settings.dataset  = this_class.dataset_object.dataset;
    scales_settings.y_max    = this_class.dataset_object.y_max;
    scales_settings.width    = this_class.canvas_object.inner_width;
    scales_settings.height   = this_class.canvas_object.inner_height;
    this_class.scales_object = new chart_elements.scales(scales_settings);

    return this_class.builder;
  }

  this.builder.build_axis = function () {
    var axis_settings        = {};
    axis_settings.canvas     = this_class.canvas_object.canvas;
    axis_settings.x_scale    = this_class.scales_object.x_scale;
    axis_settings.y_scale    = this_class.scales_object.y_scale;
    axis_settings.height     = this_class.canvas_object.inner_height;
    this_class.axis_object   = chart_elements.axis(axis_settings);

    return this_class.builder;
  }

  this.builder.build_chart = function () {
    var chart_settings         = {};
    chart_settings.chart_space = this_class.canvas_object.chart_space;
    chart_settings.dataset     = this_class.dataset_object.stacked_dataset;
    chart_settings.color       = this_class.dataset_object.color;
    chart_settings.x_scale     = this_class.scales_object.x_scale;
    chart_settings.y_scale     = this_class.scales_object.y_scale;
    this_class.chart_object    = chart_elements.chart(chart_settings);

    return this_class.builder;
  }

  this.builder.crop_edges = function () {
    var crop_settings = {}
    crop_settings.canvas_object = this_class.canvas_object;
    crop_settings.axis_object   = this_class.axis_object;
    this_class.crop_object      = chart_elements.cropper(crop_settings);
    return this_class.builder;
  }

  this.builder.prepare_tooltips = function () {
    var tooltips_settings = {}
    tooltips_settings.x_scale      = this_class.scales_object.x_scale;
    tooltips_settings.canvas       = this_class.canvas_object.canvas;
    tooltips_settings.chart_space  = this_class.canvas_object.chart_space;
    tooltips_settings.inner_height = this_class.canvas_object.inner_height;
    tooltips_settings.inner_width  = this_class.canvas_object.inner_width;
    tooltips_settings.color        = this_class.dataset_object.color;
    tooltips_settings.dataset      = this_class.dataset_object.dataset;
    this_class.tooltips_object     = chart_elements.tooltips(tooltips_settings);
    return this_class.builder;
  }

  this.builder.prepare_legend = function () {
    var legend_settings = {}
    legend_settings.x_scale      = this_class.scales_object.x_scale;
    legend_settings.canvas       = this_class.canvas_object.canvas;
    legend_settings.inner_height = this_class.canvas_object.inner_height;
    legend_settings.inner_width  = this_class.canvas_object.inner_width;
    legend_settings.color        = this_class.dataset_object.color;
    legend_settings.dataset      = this_class.dataset_object.dataset;
    this_class.legend_object     = chart_elements.legend(legend_settings);
    return this_class.builder;
  }

  this.builder.listen = function () {
    var listener_settings = {};
    listener_settings.tooltips         = chart_elements.tooltips
    listener_settings.legend           = chart_elements.legend

    listener_settings.canvas           = this_class.canvas_object.canvas;
    listener_settings.chart            = this_class.chart_object.chart;
    listener_settings.chart_identifier = this_class.chart_object.chart_identifier;
    listener_settings.chart_place      = this_class.chart_object.chart_place;
    listener_settings.chart_space      = this_class.canvas_object.chart_space;
    listener_settings.area             = this_class.chart_object.area;
    listener_settings.reader           = chart_elements.reader;
    listener_settings.date_format      = chart_elements.settings.date_format;
    listener_settings.x_scale          = this_class.scales_object.x_scale;
    listener_settings.y_scale          = this_class.scales_object.y_scale;

    listener_settings.width            = this_class.canvas_object.inner_width;
    listener_settings.height           = this_class.canvas_object.inner_height;
    listener_settings.scales           = chart_elements.scales;
    listener_settings.painted_x_axis   = this_class.axis_object.painted_x_axis;
    listener_settings.painted_y_axis   = this_class.axis_object.painted_y_axis;
    listener_settings.axis             = chart_elements.axis;


    listener_settings.initial_dataset  = chart_elements.settings.initial_dataset;

    return chart_elements.listener(listener_settings);
  }

  this.builder.build = function () {
    return this_class.builder();
  }

  return this_class.builder;
}

function BrightCanvas (canvas_settings) {

  var this_class = this;

  this.margin         = { top: 20, right: 20, bottom: 85, left: 50 };

  this.canvas_element = d3.select(canvas_settings.target())
                         .append("svg").attr('style', 'background-color: transparent')
                         .attr("width", canvas_settings.width()).attr("height", canvas_settings.height())
                         .append("g").attr("transform", "translate(" + this_class.margin.left + "," + this_class.margin.top + ")");

  this.chart_space    = this_class.canvas_element.append("g");

  this.canvas = function () {
    var output          = {};
    output.canvas       = this_class.canvas.canvas;
    output.chart_space  = this_class.canvas.chart_space;
    output.inner_width  = this_class.canvas.inner_width;
    output.inner_height = this_class.canvas.inner_height;

    return output;
  }

  this.canvas.chart_space  = function () {
    return this_class.chart_space;
  }

  this.canvas.canvas  = function () {
    return this_class.canvas_element;
  }

  this.canvas.inner_width  = function () {
    return canvas_settings.width() - this_class.margin.left - this_class.margin.right;
  }

  this.canvas.inner_height = function () {
    return canvas_settings.height() - this_class.margin.top - this_class.margin.bottom;
  }

  return this.canvas();
}

function Bright() {
  var this_class = this;

  this.width              = 100
  this.height             = 200
  this.target             = 'body'
  this.date_format        = '%y-%b-%d'
  this.initial_dataset    = []
  this.data_stream        = null
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
