function BrightStackedArea (parent_chart, target) {

  function chart() {
    alert('YO! ' + parent_chart.target)
  }

  chart.activate = function() {
    return chart()
  }

  return chart;
}
