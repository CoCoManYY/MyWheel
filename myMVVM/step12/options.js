import {merge,clone} from 'ramda'

export function mergeOptions(parent, child) {
    // data/methods/watch/computed
    let options = {}

    // 合并 data
    options.data = mergeData(parent.data, child.data)

    // 合并 methods 同名覆盖
    options.methods = merge(parent.methods, child.methods)

    // 合并 watcher 同名合并成一个数组
    options.watch = mergeWatch(parent.watch, child.watch)

    // 合并 computed 同名覆盖
    options.computed = merge(parent.computed, child.computed)

    return options
}

function mergeData(parentValue, childValue) {
    if (!parentValue) {
        return childValue
    }
    if (!childValue) {
        return parentValue
    }
    return function mergeFnc() {
        return merge(parentValue.call(this), childValue.call(this))
    }
}

function mergeWatch(parentVal, childVal) {
    if (!childVal) return clone(parentVal || {})
    let ret = merge({}, parentVal)
    for (let key in childVal) {
        let parent = ret[key]
        let child = childVal[key]
        if (parent && !Array.isArray(parent)) {
            parent = [parent]
        }
        ret[key] = parent
            ? parent.concat(child)
            : Array.isArray(child) ? child : [child]
    }
    return ret
}