var ScreenShotReporter = require('protractor-screenshot-reporter');
var fs = require('fs');
var path = require('path');

//will be written to functionalResults.json to be read by index.html for display using AngularJS
var functionalResults = {"passed": [],"failed": []};

var pathBuilder = function(spec, descriptions, results, capabilities){
    return path.join(""+capabilities.caps_.browserName, descriptions.join('-'));
};

function defaultMetaDataBuilder(spec, descriptions, results, capabilities) {
    var metaData = {
        description: descriptions.join(' ')
        , passed: results.passed()
        , os: capabilities.caps_.platform
        , browser: {
            name: capabilities.caps_.browserName
            , version: capabilities.caps_.version
        }
    };

    if(results.items_.length > 0) {
        var result = results.items_[0];
        metaData.message = result.message;
        metaData.trace = result.trace.stack;
    }//end if

    if(metaData.passed){
        functionalResults.passed.push(metaData);
    }else{
        functionalResults.failed.push(metaData);
    }//end if
    return metaData;
}


exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    chromeOnly: true,
    capabilities: {
        'browserName' : 'chrome'
    },
    specs: ['test/functional/**/*Spec.js'],

    onPrepare: function() {
        // Add a screenshot reporter and store screenshots.
        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory:  '../rexpress/frontend/test/functional',
            pathBuilder: pathBuilder,
            metaDataBuilder: defaultMetaDataBuilder
        }));
    },

    onCleanUp: function(exitCode) {
        //After all of the tests have run, we write out the json file so index.html AngularJS file can process the results
        fs.writeFileSync("../rexpress/frontend/test/functional/results.json",JSON.stringify(functionalResults));
    }

};