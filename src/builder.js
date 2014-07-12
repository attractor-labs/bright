function BrightBuilder (chart_elements) {
  var canvas_object  = null
    , scales_object  = null
    , axis_object    = null
    , dataset_object = null
    , chart_object   = null;

  function builder () {
    builder.draw_canvas().read_initial_dataset()
           .prepare_scales().build_axis().build_chart();
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

  builder.build_chart = function () {
    var chart_settings       = {};
    chart_settings.canvas    = canvas_object.canvas;
    chart_settings.dataset   = dataset_object.stacked_dataset;
    chart_settings.color     = dataset_object.color;
    chart_settings.x_scale   = scales_object.x_scale;
    chart_settings.y_scale   = scales_object.y_scale;
    chart_object             = chart_elements.chart(chart_settings);

    return builder;
  }

  builder.build = function () {
    return builder()
  }

  return builder;
}
