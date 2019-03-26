const path = require('path');
const serviceWorker = require('.');

serviceWorker.register('file://' + path.join(__dirname, 'sw.js'));
