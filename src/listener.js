 function BrightListener (listener_settings) {

  var this_class = this;

  this.initial_dataset = listener_settings.initial_dataset()
  this.day_distance    = listener_settings.x_scale(new Date(0)) - listener_settings.x_scale(new Date(listener_settings.time_interval()))
  this.chart           = listener_settings.chart
  this.painted_x_axis  = listener_settings.painted_x_axis
  this.painted_y_axis  = listener_settings.painted_y_axis
  this.area            = listener_settings.area
  this.chart_place     = listener_settings.chart_place
  this.steps           = 1;

  this.listen = function () {}

  this.listen.push = function (datapoint) {
    this_class.listen.enrich_initial_dataset(datapoint);

    var reader_output = new listener_settings.reader({'date_format': listener_settings.date_format, 'dataset': function (){ return this_class.initial_dataset }});

    var recalculated_scales = new listener_settings.scales({'y_max': reader_output.y_max, 'dataset': reader_output.dataset, 'width': function () { return listener_settings.width() - this_class.day_distance }, 'height': listener_settings.height});
    var recalculated_axis   = new listener_settings.axis({'chart_identifier': listener_settings.chart_identifier, 'skip': true, 'painted_x': this_class.painted_x_axis, 'painted_y': this_class.painted_y_axis,'canvas': listener_settings.canvas, 'x_scale': recalculated_scales.x_scale, 'y_scale': recalculated_scales.y_scale, 'height': listener_settings.height});

    var recalculated_area   = d3.svg.area().interpolate("monotone")
                                .x(function(d) { return listener_settings.x_scale(d.date); })
                                .y0(function(d) { return recalculated_scales.y_scale(d.y0); })
                                .y1(function(d) { return recalculated_scales.y_scale(d.y0 + d.y); });

    this_class.chart_place = this_class.chart_place.data(reader_output.stacked_dataset());

    this_class.chart_place.attr("transform", "translate(" + this_class.day_distance*(this_class.steps-1) + ",0)")
               .attr("d", function(d) { return this_class.area(d.values); })
               .transition().duration(1000).attr("transform", "translate(" + this_class.day_distance*(this_class.steps) + ",0)")
               .attr("d", function(d) { return recalculated_area(d.values); });

    this_class.chart_place.enter().append("path")
                       .attr("d", function(d) { return this_class.area(d.values); })
                       .transition().duration(1000)
                       .attr("transform", "translate(" + this_class.day_distance*(this_class.steps) + ",0)")
                       .style("fill", function(d) { return reader_output.color(d.name); })
                       .attr("d", function(d) { return recalculated_area(d.values); });

    this_class.chart_place.exit().remove()

    this_class.painted_y_axis.transition().duration(1000).call(recalculated_axis.y_axis)

    recalculated_axis.painted_x_axis.attr("transform", "translate(" + this_class.day_distance*(0) + "," + listener_settings.height() + ")")
    recalculated_axis.painted_x_axis.transition().duration(1000).attr("transform", "translate(" + this_class.day_distance*(1) + "," + listener_settings.height() + ")")

    legend_settings = {}
    legend_settings.x_scale      = recalculated_scales.x_scale;
    legend_settings.canvas       = listener_settings.canvas;
    legend_settings.inner_height = listener_settings.height;
    legend_settings.inner_width  = listener_settings.width;
    legend_settings.color        = reader_output.color;
    legend_settings.dataset      = reader_output.dataset;
    legend_settings.chart_identifier = listener_settings.chart_identifier;
    d3.select(".legend"+listener_settings.chart_identifier()).remove();
    new listener_settings.legend(legend_settings);

    tooltips_settings = {}
    tooltips_settings.x_scale      = recalculated_scales.x_scale;
    tooltips_settings.canvas       = listener_settings.canvas;
    tooltips_settings.chart_space  = listener_settings.chart_space;
    tooltips_settings.inner_height = listener_settings.height;
    tooltips_settings.inner_width  = listener_settings.width;
    tooltips_settings.color        = reader_output.color;
    tooltips_settings.dataset      = reader_output.dataset;
    tooltips_settings.shift        = 1;
    new listener_settings.tooltips(tooltips_settings)

    this_class.area = recalculated_area;

    this_class.initial_dataset.shift();
    this_class.steps++;


    return this_class.listen;
  }

  this.listen.enrich_initial_dataset = function (datapoint) {
    this_class.initial_dataset.push(datapoint);
    var id_length = this_class.initial_dataset.length;
    d3.keys(datapoint).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!this_class.initial_dataset[i][key]) { this_class.initial_dataset[i][key] = '0' };
        i++;
      }
    });

    d3.keys(this_class.initial_dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!this_class.initial_dataset[i][key]) { this_class.initial_dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(initial_dataset))
    });

    d3.keys(this_class.initial_dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (this_class.initial_dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          this_class.initial_dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }
    });

    d3.keys(this_class.initial_dataset[0]).forEach(function (key) {
      var i = 0;
      var more_than_two = false;
      while (i < id_length) {
        if (Object.keys(this_class.initial_dataset[i]).length > 2) { more_than_two = true };
        i++;
        if (i == id_length && more_than_two == true) {
          this_class.initial_dataset.forEach(function (element) {
            delete element['no data'];
          });
        }
      }
    });
    // console.log(JSON.stringify(initial_dataset))
  }

  return this.listen;
}
