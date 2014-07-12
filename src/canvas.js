function BrightCanvas (canvas_settings) {

  function canvas() {
    var margin = {top: 20, right: 20, bottom: 30, left: 50}
      , width  = canvas_settings.width()  - margin.left - margin.right
      , height = canvas_settings.height() - margin.top  - margin.bottom
      , output = {};

    output.canvas  = d3.select(canvas_settings.target()).append("svg").attr('style', 'background-color: lightblue').attr("width", canvas_settings.width()).attr("height", canvas_settings.height()).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    output.x_scale = d3.time.scale().range([0, width]);
    output.y_scale = d3.scale.linear().range([height, 0]);
    output.x_axis  = d3.svg.axis().scale(output.x_scale).orient("bottom");
    output.y_axis  = d3.svg.axis().scale(output.y_scale).orient("left");

    output.canvas.append("g").attr("transform", "translate(0," + height + ")").call(output.x_axis);
    output.canvas.append("g").call(output.y_axis);

    return output;
  }

  return canvas;
}
