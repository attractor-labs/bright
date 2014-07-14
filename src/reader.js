function BrightReader (reader_settings) {

  var dataset         = JSON.parse(JSON.stringify(reader_settings.dataset()))
    , y_max           = 0
    , stacked_dataset = null
    , color           = null;

  function reader() {
    var output = {}; reader.parse_dates(); reader.enrich_dataset();

    color = d3.scale.category20();
    color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));
    reader.stacked_dataset();

    reader.get_y_max();

    output.dataset         = reader.dataset;
    output.stacked_dataset = reader.stacked_dataset;
    output.color           = reader.color();
    output.y_max           = y_max;
    return output;
  }

  reader.get_y_max = function () {
    var keys = d3.keys(dataset[0]).filter(function(key) { return key !== "date"; });
    dataset.forEach(function (datapoint){
      var current_sum = keys.map(function(attribute) { return(datapoint[attribute]/1) }).reduce(function(a, b) { return a + b })
      if (y_max < current_sum) { y_max = current_sum }
    });
  }

  reader.dataset = function () {
    return dataset;
  }

  reader.color = function () {
    return color;
  }

  reader.stacked_dataset = function () {
    if (stacked_dataset) { return stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      stacked_dataset = stack(color.domain().map(function(name) {
        return { name: name, values: dataset.map(function(d) { return { date: d.date, y: d[name]/1 } }) };
      }));
      return stacked_dataset;
    }
  }

  reader.parse_date = function (date) {
    return d3.time.format("%y-%b-%d").parse(date);
  }

  reader.parse_dates = function () {
    dataset.forEach(function (datapoint) {
      datapoint.date = reader.parse_date(datapoint.date);
    });
  }

  reader.enrich_dataset = function () {
    var id_length = dataset.length;

    d3.keys(dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!dataset[i][key]) { dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(dataset))
    });

    d3.keys(dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
  }


  return reader();
}
