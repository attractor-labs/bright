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
