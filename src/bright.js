function Bright() {
  var this_class = this;

  this.width              = 100
  this.height             = 200
  this.target             = 'body'
  this.date_format        = '%y-%b-%d'
  this.initial_dataset    = []
  this.data_stream        = null
  this.chart_type         = 'stacked-area';

  this.settings = function () {
    var chart_elements            = {};
    chart_elements.settings       = this_class.settings
    chart_elements.canvas         = BrightCanvas
    chart_elements.scales         = BrightScales
    chart_elements.axis           = BrightAxis
    chart_elements.chart          = BrightStackedArea
    chart_elements.reader         = BrightReader
    chart_elements.cropper        = BrightCropper
    chart_elements.tooltips       = BrightTooltips
    chart_elements.legend         = BrightLegend
    chart_elements.listener       = BrightListener
    return new BrightBuilder(chart_elements).build()
  }

  this.settings.activate = function() {
    return this_class.settings()
  }

  this.settings.date_format = function(format) {
    if (!arguments.length) return this_class.date_format; this_class.date_format = format;
    return this_class.settings;
  }

  this.settings.chart_type = function(type) {
    if (!arguments.length) return this_class.chart_type; this_class.chart_type = type;
    return this_class.settings;
  }

  this.settings.initial_dataset = function(dataset) {
    if (!arguments.length) return this_class.initial_dataset; this_class.initial_dataset = dataset;
    return this_class.settings;
  }

  this.settings.data_stream = function(stream_function) {
    if (!arguments.length) return this_class.data_stream; this_class.data_stream = stream_function;
    return this_class.settings;
  }

  this.settings.target = function(identifier) {
    if (!arguments.length) return this_class.target; this_class.target = identifier;
    return this_class.settings;
  }

  this.settings.width = function(value) {
    if (!arguments.length) return this_class.width; this_class.width = value;
    return this_class.settings;
  };

  this.settings.height = function(value) {
    if (!arguments.length) return this_class.height; this_class.height = value;
    return this_class.settings;
  };

  return this_class.settings;
}

var bright = Bright();







// function pageTrafficLogger (config) {

//   var this_class                = this
//     , config                    = config || {};
//   this.kinesis_listener         = config.kinesis_listener;


//   this.log = function () {
//     var url_parts_config      = { require_page_parts: true }
//       , lookup_keys_config    = { key_params: ['project', 'part_id', 'scaled_timestamp'] }
//       , counters_config       = { lookup_keys_table: 'attractor_page_traffic',
//                                   lookup_keys_column_name: 'project:id:timestamp',
//                                   lookup_keys_counter_name: 'visitors' }
//       , caching_config        = { scope_name: 'page:traffic', counter_name: 'visitors' }
//       , counters_saver_config = { table_name: 'attractor_page_traffic',
//                                   lookup_key_name: 'project:id:timestamp',
//                                   counter_name: 'visitors' };

//     this_class.kinesis_listener
//               .pipe(new datapointsComponent().stream)
//               .pipe(new urlPartsComponent(url_parts_config).stream)
//               .pipe(new timestampsComponent().stream)
//               .pipe(new lookupKeysComponent(lookup_keys_config).stream)
//               .pipe(new countersComponent(counters_config).stream)
//               .pipe(new countersCachingComponent(caching_config).stream)
//               .pipe(new countersSaverComponent(counters_saver_config).stream);
//   }

// }

// module.exports = pageTrafficLogger;
