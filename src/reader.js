function BrightReader (reader_settings) {

  var this_class = this;

  this.dataset         = JSON.parse(JSON.stringify(reader_settings.dataset()));
  this.y_max           = 0;
  this.stacked_dataset = null;
  this.color           = null;

  this.reader = function () {
    var output = {}; this_class.reader.parse_dates(); this_class.reader.enrich_dataset();

    this_class.color = d3.scale.category20();
    this_class.color.domain(d3.keys(this_class.dataset[0]).filter(function(key) { return key !== "date"; }));
    this_class.reader.stacked_dataset();

    this_class.reader.get_y_max();

    output.dataset         = this_class.reader.dataset;
    output.stacked_dataset = this_class.reader.stacked_dataset;
    output.color           = this_class.reader.color();
    output.y_max           = this_class.y_max;
    return output;
  }

  this.reader.get_y_max = function () {
    var keys = d3.keys(this_class.dataset[0]).filter(function(key) { return key !== "date"; });
    this_class.dataset.forEach(function (datapoint){
      var current_sum = keys.map(function(attribute) { return(datapoint[attribute]/1) }).reduce(function(a, b) { return a + b })
      if (this_class.y_max < current_sum) { this_class.y_max = current_sum }
    });
  }

  this.reader.dataset = function () {
    return this_class.dataset;
  }

  this.reader.color = function () {
    return this_class.color;
  }

  this.reader.stacked_dataset = function () {
    if (this_class.stacked_dataset) { return this_class.stacked_dataset } else {
      var stack = d3.layout.stack().values(function(d) { return d.values; })
      this_class.stacked_dataset = stack(this_class.color.domain().map(function(name) {
        return { name: name, values: this_class.dataset.map(function(d) { return { date: d.date, y: d[name]/1 } }) };
      }));
      return this_class.stacked_dataset;
    }
  }

  this.reader.parse_date = function (date) {
    return d3.time.format(reader_settings.date_format()).parse(date);
  }

  this.reader.parse_dates = function () {
    this_class.dataset.forEach(function (datapoint) {
      datapoint.date = this_class.reader.parse_date(datapoint.date);
    });
  }

  this.reader.enrich_dataset = function () {
    var id_length = this_class.dataset.length;

    d3.keys(this_class.dataset[0]).forEach(function (key) {
      var i = 0;
      while (i < id_length) {
        if (!this_class.dataset[i][key]) { this_class.dataset[i][key] = '0' };
        i++;
      }
      // console.log(JSON.stringify(dataset))
    });

    d3.keys(this_class.dataset[0]).forEach(function (key) {
      var i = 0;
      var all_zero = true;
      while (i < id_length) {
        if (this_class.dataset[i][key] != '0') { all_zero = false };
        i++;
        if (i == id_length && all_zero == true) {
          this_class.dataset.forEach(function (element) {
            delete element[key];
          });
        }
      }

    });
  }


  return this.reader();
}
