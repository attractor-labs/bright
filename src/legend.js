function BrightLegend (legend_settings) {

  var day_distance = legend_settings.x_scale(new Date(0)) - legend_settings.x_scale(new Date(24*3600*1000));

  var tooltip_item_place = legend_settings.canvas().append("g")

  var tooltip_item = tooltip_item_place.selectAll("rect.tooltipitem").data(legend_settings.color.domain());

  var tooltip_item_enter = tooltip_item.enter().append("rect")
                          .attr("class", "tooltipitem")
                          .attr("width", 15)
                          .attr("height", 15)
                          .attr("transform", function (d, i) {
                            if (i <= 2) {
                              return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                            } else {
                              return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                            }
                          })
                          .attr("fill", function (d, i) { return legend_settings.color(d) });

  var tooltip_item_enter = tooltip_item.enter().append("text")
                          .attr("class", "tooltipitemtext")
                          .attr("dx", 18).attr("dy", 12)
                          .attr("style", "font-size: 12px")
                          .attr("transform", function (d, i) {
                            if (i <= 2) {
                              return "translate( " + 180*i + ", " + (legend_settings.inner_height()+30) + ")";
                            } else {
                              return "translate( " + 180*(i - 3) + ", " + (legend_settings.inner_height()+50) + ")";
                            }
                          })

  tooltip_item_enter.text(function (dat, i) { return dat })

  function legend () {}

  return legend();
}
