import {Event} from "../util/event";
import {observe} from "../util/Observe";
import Watcher from "../util/Watcher";
import Computed from "./computed.js";

export function proxy(target, sourceKey, key) {
    const sharedPropertyDefinition = {
        enumerable: true,
        configurable: true,
        get() {
        },
        set() {
        }
    }
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

let uid = 0

export class Vue extends Event {
    constructor(options) {
        super()
        this._init(options)
    }

    _init(options) {
        let vm = this
        vm.uid = uid++

        if (options.methods) {
            for (let key in options.methods) {
                vm[key] = options.methods[key].bind(vm)
            }
        }

        vm._data = options.data.call(vm)
        observe(vm._data)
        for (let key in vm._data) {
             //代理属性，保证舰艇结构是一个完整的对象，也就是我们把他转化一下，以致于可以this.x访问
            proxy(vm, '_data', key)
        }
        //添加watch
        // 参一：watcher 的运行环境
        // 参二：获取注册该 watcher 属性
        // 参三：触发监听时的回调 
        for (let key in options.watch) {
            new Watcher(vm, () => {
                return key.split('.').reduce((obj, name) => obj[name], vm)
            }, options.watch[key])
        }
        for (let key in options.computed) {
            new Computed(vm, key, options.computed[key])
        }


    }
}
