describe('Bright', function() {

  var width   = 100
    , height  = 200
    , id      = 'test-id';

  describe('size getter and setter methods', function() {

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
