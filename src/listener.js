 function BrightListener (listener_settings) {

  var initial_dataset = listener_settings.initial_dataset()
    , day_distance    = listener_settings.x_scale(new Date(0)) - listener_settings.x_scale(new Date(24*3600*1000))
    , chart = listener_settings.chart
    , painted_x_axis = listener_settings.painted_x_axis
    , painted_y_axis = listener_settings.painted_y_axis
    , area           = listener_settings.area
    , steps = 1;

  function listen () {}

  listen.push = function (datapoint) {
    initial_dataset.push(datapoint);

    var reader_output = listener_settings.reader({'dataset': function (){ return initial_dataset }});

    var recalculated_scales = listener_settings.scales({'y_max': reader_output.y_max, 'dataset': reader_output.dataset, 'width': function () { return listener_settings.width() - day_distance }, 'height': listener_settings.height});
    var recalculated_axis   = listener_settings.axis({'skip': true, 'painted_x': painted_x_axis, 'painted_y': painted_y_axis,'canvas': listener_settings.canvas, 'x_scale': recalculated_scales.x_scale, 'y_scale': recalculated_scales.y_scale, 'height': listener_settings.height});

    var recalculated_area   = d3.svg.area().interpolate("monotone")
                                .x(function(d) { return listener_settings.x_scale(d.date); })
                                .y0(function(d) { return recalculated_scales.y_scale(d.y0); })
                                .y1(function(d) { return recalculated_scales.y_scale(d.y0 + d.y); });

    chart.data(reader_output.stacked_dataset()).attr("transform", "translate(" + day_distance*(steps-1) + ",0)")
                           .attr("d", function(d) { return area(d.values); })
                           .transition().duration(1000).attr("transform", "translate(" + day_distance*(steps) + ",0)")
                           .attr("d", function(d) { return recalculated_area(d.values); })

    painted_y_axis.transition().duration(1000).call(recalculated_axis.y_axis)

    recalculated_axis.painted_x_axis.attr("transform", "translate(" + day_distance*(0) + "," + listener_settings.height() + ")")
    recalculated_axis.painted_x_axis.transition().duration(1000).attr("transform", "translate(" + day_distance*(1) + "," + listener_settings.height() + ")")

    tooltips_settings = {}
    tooltips_settings.x_scale      = recalculated_scales.x_scale;
    tooltips_settings.canvas       = listener_settings.canvas;
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

  // listen.enrich_initial_dataset = function (datapoint) {
  //   var id_length = initial_dataset.length - 1;
  //   var i = 0;
  //   d3.keys(datapoint).forEach(function (key) {
  //     while (i < id_length) {
  //       // if (!initial_dataset[i][key]) { initial_dataset[i][key] = '0' };
  //       initial_dataset[i]
  //       console.log(initial_dataset[i])
  //       i++;
  //     }
  //     // initial_dataset = initial_dataset.map(function (previous_datapoint) {
  //     //   var upda
  //     //   if (!previous_datapoint[key]) { previous_datapoint[key] = '0' };
  //     //   return previous_datapoint
  //     // });
  //     // console.log(JSON.stringify(initial_dataset))
  //   });
  // }

  return listen;
}
