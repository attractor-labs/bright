function BrightCanvas (canvas_settings) {

  var margin         = { top: 20, right: 20, bottom: 65, left: 50 }

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
