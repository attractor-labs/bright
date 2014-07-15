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
