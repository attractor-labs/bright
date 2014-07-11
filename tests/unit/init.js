process.env.TZ = "America/Los_Angeles";

var jsdom = require('jsdom')
  , url   = require('url')
  , html  = "<html><head></head><body></body></html>";

global.assert = require('chai').assert;

before(function(done) {
  return jsdom.env({
    html: html,
    scripts: ["http://d3js.org/d3.v3.min.js", "../../js/bright.dev.js"],
    done: function(errors, window) {
      global.Epoch = window.Epoch;
      global.d3 = window.d3;
      global.doc = window.document;
      window.devicePixelRatio = 2;
      return done();
    }
  });
});

global.addStyleSheet = function(css) {
  var head, style;
  head = doc.head;
  style = doc.createElement('style');
  style.type = 'text/css';
  style.appendChild(doc.createTextNode(css));
  head.appendChild(style);
  return style;
};
