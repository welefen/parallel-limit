# parallel-limit

parallels task limited based on Promise.

## install

```
npm install parallel-limit
```

## how to use

```
var parallelLimit = require('parallel-limit');
```

### get instance

```
var instance = new parallelLimit(limitNums, callback);
```

* `limitNums` limit nums, default: 10
* callback 

## API

### add(data)

```
var instance = new parallelLimit(function(data){
    return Promise.resolve(xxx);
});
instance.add('welefen').then(function(data){
    console.log(data);    
})
```


### add(callback)
```
var instance = new parallelLimit();
instance.add(function(){
    return Promise.resolve(xxx);
}).then(function(data){

})
```

### addAll(dataList, ignoreError)

```
var instance = new parallelLimit(5, function(data){
    return Promise.resolve(xxx);
});
//ignore promise errors
instance.addAll(['welefen', 'suredy'], true).then(function(data){
    //all task finished
})
```

### addAll(callbackList, ignoreError)

```
var instance = new parallelLimit(5);
instance.addAll([function(data){
    return Promise.resolve(xxx);
}, function(data){
    return Promise.resolve(yyy);
}]).then(function(data){
    //all task finished
})
```
