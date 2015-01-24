var parallelLimit = require('../index.js');
var assert = require('assert');

describe('parallel-limit', function(){
  it('add single', function(done){
    var instance = parallelLimit(function(data){
      return data;
    });
    instance.add('welefen').then(function(data){
      assert.equal(data, 'welefen')
      done();
    })
  })
  it('add multi', function(done){
    var instance = parallelLimit(function(data){
      return data;
    });
    var promises = [];
    for(var i = 0; i< 10;i++){
      var promise = instance.add('welefen').then(function(data){
        assert.equal(data, 'welefen')
      })
      promises.push(promise);
    }
    Promise.all(promises).then(function(){
      done();
    })
  })
  it('addAll', function(done){
    var instance = parallelLimit(function(data){
      return data;
    });
    instance.addAll(['welefen', 'suredy']).then(function(data){
      assert.deepEqual(data, ['welefen', 'suredy'])
      done();
    })
  })
  it('addAll callback', function(done){
    var instance = parallelLimit();
    instance.addAll([function(){
      return 'welefen';
    }]).then(function(data){
      assert.deepEqual(data, ['welefen'])
      done();
    })
  })
})