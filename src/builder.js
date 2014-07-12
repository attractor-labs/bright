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
