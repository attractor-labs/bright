function BrightStackedArea (chart_settings) {

  this.chart = function () {
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

  return this.chart();
}

