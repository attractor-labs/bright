function BrightBuilder (chart_elements) {
  var canvas_object = null
    , scales_object = null
    , axis_object   = null;

  function builder () {
    builder.draw_canvas().prepare_scales().build_axis();
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
