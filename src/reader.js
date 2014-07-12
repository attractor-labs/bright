function BrightReader (reader_settings) {

  var dataset         = reader_settings.dataset()
    , stacked_dataset = null;

  function reader() {
    var output = {}; reader.parse_dates();
    output.dataset         = reader.dataset;
    output.stacked_dataset = reader.stacked_dataset;
    return output;
  }

  reader.dataset = function () {
    return dataset;
  }

  reader.stacked_dataset = function () {
    if (stacked_dataset) { return stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      var color = d3.scale.category20();
      color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "date"; }));
      stacked_dataset = stack(color.domain().map(function(name) {
        return { name: name, values: dataset.map(function(d) { return { date: d.date, y: d[name] / 100 } }) };
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

  return reader();
}


// var parseDate = d3.time.format("%y-%b-%d").parse,
  // data.forEach(function(d) {
  //   d.date = parseDate(d.date);
  // });

// var stack = d3.layout.stack()
//     .values(function(d) { return d.values; });

// color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));


  // var browsers = stack(color.domain().map(function(name) {
  //   return {
  //     name: name,
  //     values: data.map(function(d) {
  //       return {date: d.date, y: d[name] / 100};
  //     })
  //   };
  // }));
