function BrightLegend (legend_settings) {

  var day_distance = legend_settings.x_scale(new Date(0)) - legend_settings.x_scale(new Date(24*3600*1000));

  var legend_item_place = legend_settings.canvas().append("g").attr("class", "legend")

  var legend_item = legend_item_place.selectAll("rect.legenditem").data(legend_settings.color.domain());

  var legend_item_enter = legend_item.enter().append("rect")
                          .attr("class", "legenditem")
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
                          .attr("class", "legenditemtext")
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

  function legend () {}

  return legend();
}
