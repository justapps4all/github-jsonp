if( typeof mymodule === 'undefined' ) {
    var mymodule = require('..')
}

describe('mymodule', function(){

    it('something must be done', function(){
        expect( mymodule.VERSION ).toBe( '0.1.0' )
    })

})