'use strict';

var thinkit = require('thinkit');

module.exports = thinkit.Class({
  /**
   * limit nums
   * @type {Number}
   */
  limit: 10,
  /**
   * doing nums
   * @type {Number}
   */
  doing: 0,
  /**
   * index
   * @type {Number}
   */
  index: 0,
  /**
   * deferred array
   * @type {Array}
   */
  deferreds: [],
  /**
   * init
   * @return {} []
   */
  init: function(limit, callback){
    if (typeof limit === 'function') {
      callback = limit;
      limit = undefined;
    }
    if (limit) {
      this.limit = limit;
    }
    this.index = 0;
    this.callback = callback;
  },
  /**
   * add item data
   * @param {data} item []
   */
  add: function(item){
    var deferred = Promise.defer();
    deferred.data = item;
    this.deferreds.push(deferred);
    this.run();
    return deferred.promise;
  },
  /**
   * add all data once
   * @param {Array} arr [data array]
   */
  addAll: function(arr, ignoreError){
    if (!arr || arr.length === 0) {
      return Promise.resolve();
    }
    var self = this;
    arr.forEach(function(item){
      return self.add(item);
    })
    var promises = this.deferreds.map(function(deferred){
      //ignore erros
      if (ignoreError) {
        return deferred.promise.catch(function(){
          return;
        })
      }
      return deferred.promise;
    })
    return Promise.all(promises);
  },
  /**
   * run
   * @return {} []
   */
  run: function(){
    if (this.doing >= this.limit || this.index >= this.deferreds.length) {
      return;
    }
    this.doing++;
    var self = this, item = this.deferreds[this.index++];
    var callback = thinkit.isFunction(item.data) ? item.data : this.callback;
    if (!thinkit.isFunction(callback)) {
      throw new Error('data item or callback must be a function');
    }
    var result = callback(item.data);
    if (!thinkit.isPromise(result)) {
      result = Promise.resolve(result);
    }
    return result.then(function(data){
      self.doing --;
      self.run();
      //resolve item
      item.resolve(data);
    }).catch(function(err){
      self.doing --;
      self.run();
      //reject item
      item.reject(err);
    })
  }
})