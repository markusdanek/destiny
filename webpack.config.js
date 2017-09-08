var path = require('path');

module.exports = {
    entry: './build/main.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'destiny.js',
        libraryTarget: 'var',
        library: 'Destiny'
    }
};
