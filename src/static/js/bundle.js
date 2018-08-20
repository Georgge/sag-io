(function (loki) {
  'use strict';

  loki = loki && loki.hasOwnProperty('default') ? loki['default'] : loki;

  const db = new loki('sandbox.db');
  const parentPath = db.addCollection('path');

  var getParentPath$1 = null;

  const resolution = getParentPath$1();
  console.log(resolution);

}(loki));
