function BrightLegend (legend_settings) {

  this.legend = function () {
    var legend_item_place = legend_settings.canvas().append("g").attr("class", "legend"+legend_settings.chart_identifier())
    var legend_item = legend_item_place.selectAll("rect.legenditem").data(legend_settings.color.domain());
    var legend_item_enter = legend_item.enter().append("rect")
                            .attr("class", "legenditem"+legend_settings.chart_identifier())
                            .attr("width", 15)
                            .attr("height", 15)
                            .attr("transform", function (d, i) {
                              if (i <= 2) {
                                return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                              } else if (i <= 5) {
                                return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                              } else {
                                return "translate( " + 180*(i - 6) + ", " + (legend_settings.inner_height()+70) + ")";
                              }
                            })
                            .attr("fill", function (d, i) { return legend_settings.color(d) });
    var legend_item_enter = legend_item.enter().append("text")
                            .attr("class", "legenditemtext"+legend_settings.chart_identifier())
                            .attr("dx", 18).attr("dy", 12)
                            .attr("style", "font-size: 12px")
                            .attr("transform", function (d, i) {
                              if (i <= 2) {
                                return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                              } else if (i <= 5) {
                                return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                              } else {
                                return "translate( " + 180*(i - 6) + ", " + (legend_settings.inner_height()+70) + ")";
                              }
                            })
    legend_item_enter.text(function (dat, i) { return dat })
  }

  return this.legend();
}
