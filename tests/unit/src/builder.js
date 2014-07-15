describe('BrightBuilder', function() {

  describe('methods', function() {

    it('should return default canvas object', function() {
      assert.equal(new BrightBuilder().canvas_object(), null);
    });

    it('should return default scales object', function() {
      assert.equal(new BrightBuilder().scales_object(), null);
    });

    it('should return default axis object', function() {
      assert.equal(new BrightBuilder().axis_object(), null);
    });

    it('should return default dataset object', function() {
      assert.equal(new BrightBuilder().dataset_object(), null);
    });

    it('should return default chart object', function() {
      assert.equal(new BrightBuilder().chart_object(), null);
    });

  });

});
