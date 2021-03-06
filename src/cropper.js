function BrightCropper (cropper_settings) {

  this.cropper = function () {
    var output = {}
    cropper_settings.canvas_object.canvas()
                    .append("g")
                    .append("defs")
                    .append("clipPath")
                    .attr("id", "clippast" + cropper_settings.chart_identifier())
                    .append("rect")
                    .attr("width", cropper_settings.canvas_object.inner_width())
                    .attr("height", cropper_settings.canvas_object.inner_height())

     cropper_settings.canvas_object.chart_space()
               .attr("clip-path", "url(#clippast" + cropper_settings.chart_identifier() +")")

    cropper_settings.canvas_object.canvas()
                    .append("g")
                    .append("defs")
                    .append("clipPath")
                    .attr("id", "cropxaxisright" + cropper_settings.chart_identifier())
                    .append("rect")
                    .attr("transform", "translate(-5," + (cropper_settings.canvas_object.inner_height() - 2) + ")")
                    .attr("width", cropper_settings.canvas_object.inner_width() + 5)
                    .attr("height", 20)

    return output;
  }

  return this.cropper();
}
