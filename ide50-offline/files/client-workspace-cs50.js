"use strict";

module.exports = function(options) {
    // Remove C runner
    delete options.runners["C (simple)"];
    options.projectName = "ide50-offline";

    var config = require("./client-default")(options);

    var includes = [
        "plugins/c9.ide.cs50.simple/simple50",
        "plugins/c9.ide.cs50.info/info50",
        "plugins/c9.ide.cs50.themes/themes50",
        "plugins/c9.ide.cs50.previewer/previewer50"
    ];

    var excludes = {
        "plugins/c9.ide.login/login": true,
        "plugins/c9.ide.welcome/welcome": true
    };

    config = config.concat(includes).map(function(p) {
        if (typeof p == "string")
            p = { packagePath: p };
        return p;
    }).filter(function (p) {
        if (p.packagePath == "plugins/c9.ide.layout.classic/preload") {
            p.defaultTheme = "flat-light"; // set flat theme as default
        }
        else if (p.packagePath == "plugins/c9.fs/fs.cache.xml") {
            p.rootLabel = "~/workspace";
        }
        else if (p.packagePath == "plugins/c9.core/settings") {
            if (p.settings)
                p.settings.user = {}; // reset user settings
        }
        return !excludes[p.packagePath];
    });
    
    return config;
};
