function BrightStackedArea (chart_settings) {

  function chart() {
    var output = {}

    var area = d3.svg.area()
                 .x(function(d) { return chart_settings.x_scale(d.date); })
                 .y0(function(d) { return chart_settings.y_scale(d.y0); })
                 .y1(function(d) { return chart_settings.y_scale(d.y0 + d.y); });

    output.chart_place = chart_settings.canvas().selectAll()
                                       .data(chart_settings.dataset()).enter().append("g");

    output.chart = output.chart_place.append("path")
                         .attr("class", "area").attr("d", function(d) { return area(d.values); })
                         .style("fill", function(d) { return chart_settings.color(d.name); });

    return output;
  }

  return chart();
}
