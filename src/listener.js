 function BrightListener (listener_settings) {

  var initial_dataset = listener_settings.initial_dataset()
    , day_distance    = listener_settings.x_scale(new Date(0)) - listener_settings.x_scale(new Date(24*3600*1000))
    , chart = listener_settings.chart
    , painted_x_axis = listener_settings.painted_x_axis
    , painted_y_axis = listener_settings.painted_y_axis
    , area           = listener_settings.area
    , chart_place    = listener_settings.chart_place
    , steps = 1;

  function listen () {}

  listen.push = function (datapoint) {
    listen.enrich_initial_dataset(datapoint);

    var reader_output = new listener_settings.reader({'date_format': listener_settings.date_format, 'dataset': function (){ return initial_dataset }});

    var recalculated_scales = listener_settings.scales({'y_max': reader_output.y_max, 'dataset': reader_output.dataset, 'width': function () { return listener_settings.width() - day_distance }, 'height': listener_settings.height});
    var recalculated_axis   = listener_settings.axis({'skip': true, 'painted_x': painted_x_axis, 'painted_y': painted_y_axis,'canvas': listener_settings.canvas, 'x_scale': recalculated_scales.x_scale, 'y_scale': recalculated_scales.y_scale, 'height': listener_settings.height});

    var recalculated_area   = d3.svg.area().interpolate("monotone")
                                .x(function(d) { return listener_settings.x_scale(d.date); })
                                .y0(function(d) { return recalculated_scales.y_scale(d.y0); })
                                .y1(function(d) { return recalculated_scales.y_scale(d.y0 + d.y); });

    chart_place = chart_place.data(reader_output.stacked_dataset());

    chart_place.attr("transform", "translate(" + day_distance*(steps-1) + ",0)")
               .attr("d", function(d) { return area(d.values); })
               .transition().duration(1000).attr("transform", "translate(" + day_distance*(steps) + ",0)")
               .attr("d", function(d) { return recalculated_area(d.values); });

    chart_place.enter().append("path")
                       .attr("d", function(d) { return area(d.values); })
                       .transition().duration(1000).attr("transform", "translate(" + day_distance*(steps) + ",0)")
                       .style("fill", function(d) { return reader_output.color(d.name); })
                       .attr("d", function(d) { return recalculated_area(d.values); });

    chart_place.exit().remove()

    painted_y_axis.transition().duration(1000).call(recalculated_axis.y_axis)

    recalculated_axis.painted_x_axis.attr("transform", "translate(" + day_distance*(0) + "," + listener_settings.height() + ")")
    recalculated_axis.painted_x_axis.transition().duration(1000).attr("transform", "translate(" + day_distance*(1) + "," + listener_settings.height() + ")")

    legend_settings = {}
    legend_settings.x_scale      = recalculated_scales.x_scale;
    legend_settings.canvas       = listener_settings.canvas;
    legend_settings.inner_height = listener_settings.height;
    legend_settings.inner_width  = listener_settings.width;
    legend_settings.color        = reader_output.color;
    legend_settings.dataset      = reader_output.dataset;
    d3.select(".legend").remove();
    listener_settings.legend(legend_settings);

    tooltips_settings = {}
    tooltips_settings.x_scale      = recalculated_scales.x_scale;
    tooltips_settings.canvas       = listener_settings.canvas;
    tooltips_settings.chart_space  = listener_settings.chart_space;
    tooltips_settings.inner_height = listener_settings.height;
    tooltips_settings.inner_width  = listener_settings.width;
    tooltips_settings.color        = reader_output.color;
    tooltips_settings.dataset      = reader_output.dataset;
    tooltips_settings.shift        = 1;
    listener_settings.tooltips(tooltips_settings)

    area = recalculated_area;

    initial_dataset.shift();
    steps++;


    return listen;
  }

  listen.enrich_initial_dataset = function (datapoint) {
    initial_dataset.push(datapoint);
    var id_length = initial_dataset.length;
    d3.keys(datapoint).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!initial_dataset[i][key]) { initial_dataset[i][key] = '0' };
        i++;
      }
    });

    d3.keys(initial_dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!initial_dataset[i][key]) { initial_dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(initial_dataset))
    });

    d3.keys(initial_dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (initial_dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          initial_dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
    // console.log(JSON.stringify(initial_dataset))
  }

  return listen;
}
