function BrightBuilder (chart_elements) {
  var canvas_object   = null
    , scales_object   = null
    , axis_object     = null
    , dataset_object  = null
    , chart_object    = null;

  function builder () {
    return builder.draw_canvas().read_initial_dataset()
                  .prepare_scales().build_axis().build_chart()
                  .crop_edges().prepare_tooltips().listen();
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
    tooltips_settings.inner_height = canvas_object.inner_height;
    tooltips_settings.inner_width  = canvas_object.inner_width;
    tooltips_settings.color        = dataset_object.color;
    tooltips_settings.dataset      = dataset_object.dataset;
    tooltips_object                = chart_elements.tooltips(tooltips_settings);
    return builder;
  }

  builder.listen = function () {
    var listener_settings = {};
    listener_settings.tooltips         = chart_elements.tooltips

    listener_settings.canvas           = canvas_object.canvas;
    listener_settings.chart            = chart_object.chart;
    listener_settings.chart_identifier = chart_object.chart_identifier;
    listener_settings.chart_place      = chart_object.chart_place;
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
