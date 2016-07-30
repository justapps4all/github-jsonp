var GitHubJsonP;

require(['require', 'GitHubJsonP'], function (require) {
    GitHubJsonP = require('GitHubJsonP');
});

describe('mymodule', function(){

    it('something must be done', function(){
        expect( GitHubJsonP.VERSION ).toBe( '0.1.0' )
    })

})