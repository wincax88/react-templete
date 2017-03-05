/**
 * Created by gavan on 16-7-16.
 */
'use strict';

let __DEV = process.env.NODE_ENV !== 'production';

let log = {
  debug: function() {
    __DEV && window.console.log.apply(window.console, arguments);
  }
}

;(function() {
  ['log', 'info', 'warn', 'error'].forEach(key => log[key] = () =>
    __DEV && window.console[key].apply(window.console, arguments)
  );

  ['warn', 'error'].forEach(key => log[key] = () =>
    window.console[key].apply(window.console, arguments)
  );
})();

module.exports = log;
