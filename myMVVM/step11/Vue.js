import {Event} from "../util/event";
import {observe} from "../util/Observe";
import Watcher from "../util/Watcher";
import Computed from "../util/computed.js";
import {mergeOptions} from './options.js';
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
        this.uid = uid++
        this._init(options)
    }

    _init(options) {
        let vm = this

        vm.$options = mergeOptions(
            this.constructor.options,
            options,
            vm
        )


        for (let key in vm.$options.methods) {
            vm[key] = vm.$options.methods[key].bind(vm)
        }

        vm._data = vm.$options.data.call(vm)
        observe(vm._data)
        for (let key in vm._data) {
            proxy(vm, '_data', key)
        }

        for (let key in vm.$options.watch) {
            new Watcher(vm, () => {
                return key.split('.').reduce((obj, name) => obj[name], vm)
            }, (newValue, oldValue) => {
                vm.$options.watch[key].forEach(fnc => fnc(newValue, oldValue))
            })
        }

        for (let key in vm.$options.computed) {
            new Computed(vm, key, vm.$options.computed[key])
        }

    }
}

Vue.options = {
    components: {},
    _base: Vue
}

Vue.extend = function (extendOptions) {
    const Super = this

    class Sub extends Super {
        constructor(options) {
            super(options)
        }
    }

    Sub.options = mergeOptions(
        Super.options,
        extendOptions
    )

    Sub.super = Super
    Sub.extend = Super.extend

    return Sub
}
