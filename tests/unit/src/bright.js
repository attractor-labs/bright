describe('Bright', function() {

  var width   = 100
    , height  = 200
    , id      = 'test-id';

  describe('size getter and setter methods', function() {

    it('should return default chart type', function() {
      assert.equal(Bright().chart_type(), 'linear');
    });

    it('should return specified chart type', function() {
      assert.equal(Bright().chart_type('area').chart_type(), 'area');
    });

    it('should return default stream function', function() {
      assert.equal(Bright().data_stream(), null);
    });

    it('should return specified stream function', function(done) {
      var test_func = function (callback) { return callback(null, 100500) }
      Bright().data_stream(test_func).data_stream()(function(test_func_error, test_func_result) {
        assert.equal(test_func_result, 100500);
        done();
      });
    });

    it('should return default initial dataset', function() {
      assert.equal(JSON.stringify(Bright().initial_dataset()), '[]');
    });

    it('should return specified initial dataset', function() {
      assert.equal(JSON.stringify(Bright().initial_dataset(['foo']).initial_dataset()), '["foo"]');
    });

    it('should return default render target', function() {
      assert.equal(Bright().render_target(), 'body');
    });

    it('should return specified render target', function() {
      assert.equal(Bright().render_target('foo').render_target(), 'foo');
    });

    it('should return default width', function() {
      assert.equal(Bright().width(), 100);
    });

    it('should set new width', function() {
      assert.equal(Bright().width(999).width(), 999);
    });

    it('should set new height', function() {
      assert.equal(Bright().height(777).height(), 777);
    });

    it('should return default height', function() {
      assert.equal(Bright().height(), 200);
    });

  });

});
