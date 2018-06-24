var fs = require('fs');


module.exports = (function() {
    var bundles = JSON.parse(fs.readFileSync('./bundle.develop.json', 'utf8')).bundle;
    var newBundles = {};

    Object.keys(bundles).forEach(function(bundleName) {
        var bundle = bundles[bundleName];

        newBundles[bundleName] = {
            scripts: bundle.scripts.map(function(scr){ return './' + scr; }),
            styles: bundle.styles.map(function(scr){ return './' + scr; }),
            options: bundle.options,
        };
    });

    return { bundle: newBundles };
})();
