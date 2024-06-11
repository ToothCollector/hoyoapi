'use strict'
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value)
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true })
}
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        })
  }
  return to
}
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod)
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value)
  return value
}
var cache_exports = {}
__export(cache_exports, {
  Cache: () => Cache,
})
module.exports = __toCommonJS(cache_exports)
var import_os = require('os')
class Cache {
  /**
   * Creates an instance of Cache.
   */
  constructor() {
    __publicField(this, 'cache', /* @__PURE__ */ new Map())
    __publicField(this, 'maxCacheCap')
    this.maxCacheCap = this.calculateMaxCapacity()
  }
  /**
   * Calculates the maximum capacity of the cache based on available system memory.
   * @returns The maximum capacity of the cache.
   */
  calculateMaxCapacity() {
    const totalMemory = (0, import_os.totalmem)()
    const maxCapacityPercentage = 0.2
    const maxCapacityBytes = totalMemory * maxCapacityPercentage
    return Math.floor(maxCapacityBytes / (1024 * 50))
  }
  /**
   * Retrieves the value associated with the specified key from the cache.
   * @param key - The key to look up in the cache.
   * @returns The cached value if found and not expired; otherwise, returns null.
   */
  get(key) {
    const entry = this.cache.get(key)
    if (entry && Date.now() < entry.ttl) {
      return entry.value
    }
    return null
  }
  /**
   * Stores a key-value pair in the cache with a specified TTL (Time To Live).
   * @param key - The key to store in the cache.
   * @param value - The value to associate with the key.
   * @param ttl - The TTL (Time To Live) in seconds for the cached entry.
   */
  set(key, value, ttl) {
    if (ttl < 1) {
      return
    }
    if (this.cache.size >= this.maxCacheCap) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
    const expireTime = Date.now() + ttl * 1e3
    const entry = { value, ttl: expireTime }
    this.cache.set(key, entry)
  }
  /**
   * Removes the entry with the specified key from the cache.
   * @param key - The key to delete from the cache.
   */
  delete(key) {
    this.cache.delete(key)
  }
  /**
   * Checks if the cache contains an entry with the specified key.
   * @param key - The key to check in the cache.
   * @returns True if the cache contains the key; otherwise, false.
   */
  has(key) {
    return this.get(key) !== null
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    Cache,
  })
