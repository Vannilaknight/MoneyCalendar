var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
  development: {
    db: 'mongodb://admin:password@ds023570.mlab.com:23570/moneycalendar',
    rootPath: rootPath,
    port: process.env.PORT || 3030
  },
  production: {
    rootPath: rootPath,
    db: 'mongodb://admin:password@ds023570.mlab.com:23570/moneycalendar',
    port: process.env.PORT || 80
  }
}