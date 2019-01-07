### 感想
```
$once(eventName, fn) {
        let object = this

        function on() {
            // 先取消，然后触发，确保仅一次
            object.$off(eventName, on)
            fn.apply(object, arguments)
        }

        on.fn = fn//清空的最后一种情况有用。黑盒，用户不会知道on函数的！
        object.$on(eventName, on)
        return object
    }
```
这个on.fn=fn真的可以啊哈哈哈