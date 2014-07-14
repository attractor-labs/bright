function BrightTooltips (tooltips_settings) {

  var day_distance = tooltips_settings.x_scale(new Date(0)) - tooltips_settings.x_scale(new Date(24*3600*1000));

  var focus = tooltips_settings.canvas().append("g")
                               .attr("class", "focus")
                               .style("display", "none");

  focus.append("rect")
      .attr("class", "y0")
      .attr("width", 0.75)
      .attr("height", tooltips_settings.inner_height()-15);

  focus.append("text")
      .attr("class", "y0")
      .attr("style", "font-size: 12px")
      .attr("dy", "-1em");

  var legend_place = focus.append("rect")
      .attr("class", "tpbox")
      .attr("width", "100")
      .attr("height", tooltips_settings.color.domain().length*21)
      .attr("style", "fill: white; opacity: 0.7")

  focus.append("text")
       .attr("class", "tpcontent")
       .attr("style", "font-size: 12px")
       .attr("dy", "20")
       .attr("dx", "20");

  var tooltip_item_place = focus.append("g")

  var tooltip_item = tooltip_item_place.selectAll("rect.tooltipitem").data(tooltips_settings.color.domain());

  var tooltip_item_enter = tooltip_item.enter().append("rect")
                          .attr("class", "tooltipitem")
                          .attr("width", 15)
                          .attr("height", 15)
                          .attr("transform", function (d, i) { return "translate( 0, " + 20*i + ")"; })
                          .attr("fill", function (d, i) { return tooltips_settings.color(d) });

  var tooltip_item_enter = tooltip_item.enter().append("text")
                          .attr("class", "tooltipitemtext")
                          .attr("dx", 18).attr("dy", 12)
                          .attr("style", "font-size: 12px")
                          .attr("transform", function (d, i) { return "translate( 0, " + 20*i + ")"; })

  var overlay = tooltips_settings.canvas()
                .append("rect").attr("style", "fill: transparent")
                .attr("width", tooltips_settings.inner_width())
                .attr("height", tooltips_settings.inner_height())
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);

  var bisect_date = d3.bisector(function(d) { return d.date; }).left;

  function mousemove() {
    var x0 = tooltips_settings.x_scale.invert(d3.mouse(this)[0])
      , i  = bisect_date(tooltips_settings.dataset(), x0, 1)
      , d  = tooltips_settings.dataset()[i]
      , d_used  = tooltips_settings.shift ? tooltips_settings.dataset()[i+tooltips_settings.shift] : d;

    focus.select("rect.y0").transition().duration(50).attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");

    tooltip_item_enter.text(function (dat, i) { return "" + dat + " " + parseInt(d_used[dat]); })

    if (tooltips_settings.inner_width() - tooltips_settings.x_scale(d.date) > 100) {
      focus.select("rect.tpbox").attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");
      tooltip_item_place.attr("transform", "translate(" + (tooltips_settings.x_scale(d.date) + 5) + ", 20)")
    } else {
      focus.select("rect.tpbox").attr("transform", "translate(" + tooltips_settings.x_scale(d.date) + ", 15)");
      focus.select("rect.tpbox").attr("transform", "translate(" + (tooltips_settings.x_scale(d.date) - 100) + ", 15)");
      tooltip_item_place.attr("transform", "translate(" + ((tooltips_settings.x_scale(d.date) - 100) + 5) + ", 20)");
    }
    focus.select("text.y0").transition().duration(50).attr("transform", "translate( 10, 20)").text(d_used.date);

  }

  function tooltips () {}

  return tooltips();
}
