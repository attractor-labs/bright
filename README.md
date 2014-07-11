:sunflower: bright
=========

Another glance at the issue of interactive realtime charts based on D3.js.

## Example

```javascript

initialDatasetExtractor(function (error, initial_dataset) {
  var chart = Bright().width(640).height(480)
                      .chart_type('area').render_target('body')
                      .initial_dataset(initial_dataset)
                      .data_stream(newDatapointsExtractor)
                      .activate();
});
```


