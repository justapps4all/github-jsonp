var GitHubJsonP;

require(['require', 'GitHubJsonP'], function (require) {
    GitHubJsonP = require('GitHubJsonP');
});

describe('GitHubJsonP', function(){

    it('VERSION check', function(){
        expect( GitHubJsonP.VERSION ).toBe( '0.1.0' );
    })

    it('noConflict check', function(){
        expect( GitHubJsonP.noConflict ).not.toBe(null);
    })


})