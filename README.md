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
var instance = parallelLimit(limitNums, callback);
```

* `limitNums` limit nums, default: 10
* callback 

## API

### add(data)

```
var instance = parallelLimit(function(data){
    return Promise.resolve(xxx);
});
instance.add('welefen').then(function(data){
    console.log(data);    
})
```


### add(callback)
```
var instance = parallelLimit();
instance.add(function(data){
    return Promise.resolve(xxx);
})
```

### addAll(dataList, ignoreError)

```
var instance = parallelLimit(5, function(data){
    return Promise.resolve(xxx);
});
//ignore promise errors
instance.addAll(['welefen', 'suredy'], true).then(function(data){
    //all task finished
})
```

### addAll(callbackList, ignoreError)

```
var instance = parallelLimit(5);
instance.addAll([function(data){
    return Promise.resolve(xxx);
}, function(data){
    return Promise.resolve(yyy);
}]).then(function(data){
    //all task finished
})
```
