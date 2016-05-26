import LocalNcaFile from '../../../src/domain/local-nca-file'
import assert from 'power-assert'


describe('LocalNcaFile', function() {


    it('should throw error when given dir is not found', function() {
        assert.throws(()=> new LocalNcaFile('abcd'), /No such directory/)
    })

    it('should throw error when given dir is not project root', function() {
        assert.throws(()=> new LocalNcaFile(__dirname), /is missing/)
    })


    it('should throw error when given dir does not have node-circleci-autorelease', function() {
        assert.throws(()=> new LocalNcaFile(__dirname + '/../data'), /is not installed/)
    })


    it('is ok with project dir containing node-circleci-autorelease', function() {
        assert.doesNotThrow(()=> new LocalNcaFile(__dirname + '/../../../'))
    })
})
