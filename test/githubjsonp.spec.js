if( typeof myModule === 'undefined' ) {
    var require = require || null;
    var window = window || null;
    if(require != null){

        var myModule;
        if(window==null){
            myModule = require('..')
        }else{
            myModule = GitHubJsonP;
        }
    }
}

describe('mymodule', function(){

    it('something must be done', function(){
        expect( myModule.VERSION ).toBe( '0.1.0' )
    })

})