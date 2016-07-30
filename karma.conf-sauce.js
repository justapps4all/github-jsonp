var fs = require('fs');
var _ = require('underscore');

module.exports = function(config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        if (!fs.existsSync('sauce.json')) {
            console.log('Create a sauce.json with your credentials based on the sauce-sample.json file.');
            process.exit(1);
        } else {
            process.env.SAUCE_USERNAME = require('./sauce').username;
            process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
        }
    }

    var tmpPlatforms = [
        ['firefox', '47']
    ];
    //tmpPlatforms.concat(require('./sauce-platforms').ios_9_3);

    // Browsers to run on Sauce Labs
    var customLaunchers = _.reduce(tmpPlatforms
/*
   [
        ['firefox', '47'],
        ['firefox', '46'],
        ['firefox', '35'],
        ['firefox', '30'],
        ['firefox', '21'],
        ['firefox', '11'],
        ['firefox', '4'],

        ['chrome', '51'],
        ['chrome', '50'],
        ['chrome', '31'],
        ['chrome', '26'],

        ['microsoftedge', '20.10240', 'Windows 10'],
        ['internet explorer', '11', 'Windows 10'],
        ['internet explorer', '10', 'Windows 8'],
        ['internet explorer', '9', 'Windows 7'],
        // Currently disabled due to karma-sauce issues
        //['internet explorer', '8'],
        //['internet explorer', '7'],
        //['internet explorer', '6'],


        ['opera', '12'],
        ['opera', '11'],

        ['android', '5.1'],
        ['android', '5.0'],
        ['android', '4.4'],
        ['android', '4.3'],
        ['android', '4.0'],

        ['safari', '8.0', 'OS X 10.10'],
        ['safari', '7'],
        ['safari', '6'],
        ['safari', '5'],

        ['iphone', '9.3', 'OS X 10.10'],
        ['iphone', '9.2', 'OS X 10.10'],
        ['iphone', '9.1', 'OS X 10.10'],
        ['iphone', '9.0', 'OS X 10.10']
    ]
    */
    , function(memo, platform) {
        // internet explorer -> ie
        var label = platform[0].split(' ');
        if (label.length > 1) {
            label = _.invoke(label, 'charAt', 0)
        }
        label = (label.join("") + '_v' + platform[1]).replace(' ', '_').toUpperCase();
        memo[label] = _.pick({
            'base': 'SauceLabs',
            'browserName': platform[0],
            'version': platform[1],
            'platform': platform[2],
            'deviceName': platform[3],
        }, Boolean);
        return memo;
    }, {});

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/requirejs/require.js',
            'src/main.js',
            'test/*-spec.js'
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'saucelabs'],


        // web server port
        port: 9876,

        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        sauceLabs: {
            build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
            startConnect: true,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },
        captureTimeout: 240000,
        customLaunchers: customLaunchers,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: Object.keys(customLaunchers),
        singleRun: true
    });
};