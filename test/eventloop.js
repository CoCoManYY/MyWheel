
/**
 * 执行栈中注册 setTimeout 计时器
 */
setTimeout(function () {
    // 4. timers 阶段。timer watcher 遍历计时器 Map 的 key，
    // 如果有 key <= timeout，执行该 key 对应的 value（计时器任务）；
    // 否则等到 poll 阶段再检查一次
    console.log('setTimeout');
   
    setTimeout(function () {
    // 11. 注册 setTimeout 计时器。UV_RUN_ONCE 模式下，
    // 会在循环结束之前再执行时间下限到达的计时器任务，取决于进程性能
    // 1 <= TIMEOUT_MAX <= 2 ^ 31 - 1
    console.log('setTimeout in setTimeout');
     }, 0);
   
    setImmediate(function () {
    // 9. 注册 setImmediate 计时器。在当前循环的 check 阶段执行。
    // （注：这是新的 ImmediateList，当前循环内有 3 个 ImmediateList 了）
    console.log('setImmediate in setTimeout');
     });
    
    process.nextTick(function () { 
    // 6. 为 nextTickQueue 添加任务，timers 阶段结束前唤醒 idle watcher
    // idle watcher 检查 nextTickQueue，执行任务
    console.log('nextTick in setTimeout');
     });
   }, 0);
   
   /**
    * 执行栈中注册 setImmediate 计时器
    */
   setImmediate(function () {
    // 7. poll 阶段没有可执行任务，阶段结束前唤醒 idle watcher，idle watcher 继续睡；
    // 接着唤醒 check watcher，检测到 ImmediateList 不为空，进入 check 阶段。
    // check watcher 执行第一个任务 
    console.log('setImmediate');
   
    setTimeout(function () {
    // 13. 注册 setTimeout 计时器
    // 由于机器性能，在循环结束前才执行
    console.log('setTimeout in setImmediate');
     }, 0);
   
    setImmediate(function () {
    // 12. 为当前 ImmediateList 添加任务
    // 由于机器性能优越，前面 nextTickQueue 为空了，直接进入 check 阶段
    console.log('setImmediate in setImmediate');
     });
    
    process.nextTick(function () {
    // 10. 为 nextTickQueue 添加任务，当所有 ImmediateList 的队首任务都执行完毕时，
    // 唤醒 idle watcher，检查 nextTickQueue，执行队列任务
    console.log('nextTick in setImmediate');
     });
   });
   
   /**
    * 执行栈中为 nextTickQueue 添加任务
    */
   process.nextTick(function () {
    // 2. 执行栈为空，进入事件循环准备阶段，唤醒 prepare watcher，
    // 检查 nextTickQueue，执行队列中的任务
    console.log('nextTick');
   
    setTimeout(function () {
    // 5. 注册计时器任务，timers 阶段到达时间下限则执行该任务，
    // 否则等到 poll 阶段
    console.log('setTimeout in nextTick');
     }, 0);
   
    setImmediate(function () {
    // 8. 注册 setI mmediate 计时器，在当前循环的 check 阶段执行。
    // （注：这是新的 ImmediateList，当前循环内有 2 个 ImmediateList 了）
    console.log('setImmediate in nextTick');
     });
    
    process.nextTick(function () {
    // 3. prepare watcher 处于活跃状态，检测 nextTickQueue 的新任务，
    // 执行完所有任务后沉睡
    console.log('nextTick in nextTick');
     });
   });
   
   console.log('main thread'); // 1. 执行栈的任务