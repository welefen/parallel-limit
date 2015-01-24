# parallel-limit

Node.js下基于Promise的并发执行任何限制模块。

## install

```
npm install parallel-limit
```

## how to use

```
var parallelLimit = require('parallel-limit');
```

## API

### limit

```
//限制一次最大执行条数为5条
var instance = parallelLimit(5, function(){
    
});
```

### add(data)

```
var instance = parallelLimit(function(data){
    //异步执行某个逻辑，然后返回promise
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
    //异步执行某个代码，并返回promise
    return Promise.resolve(xxx);
})
```

### addAll(dataList, ignoreError)

```
var instance = parallelLimit(5, function(data){
    //异步执行某个代码，并返回promise
    return Promise.resolve(xxx);
});
//忽略某个promise执行报错
instance.addAll(['welefen', 'suredy'], true).then(function(data){
    //所有任务都执行完成后的回调
})
```

### addAll(callbackList)

```
var instance = parallelLimit(5);
//忽略某个promise执行报错
instance.addAll([function(data){
    return Promise.resolve(xxx);
}, function(data){
    return Promise.resolve(yyy);
}]).then(function(data){
    //所有任务都执行完成后的回调
})
```
