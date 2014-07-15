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
    this_class.axis_object   = new chart_elements.axis(axis_settings);

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
