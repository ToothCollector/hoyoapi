'use strict'
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __hasOwnProp = Object.prototype.hasOwnProperty
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
var diary_interface_exports = {}
__export(diary_interface_exports, {
  DiaryEnum: () => DiaryEnum,
  DiaryMonthEnum: () => DiaryMonthEnum,
})
module.exports = __toCommonJS(diary_interface_exports)
const currentMonth = /* @__PURE__ */ new Date().getMonth()
const oneMonthAgo = /* @__PURE__ */ new Date()
oneMonthAgo.setMonth(currentMonth - 1)
const twoMonthAgo = /* @__PURE__ */ new Date()
twoMonthAgo.setMonth(currentMonth - 2)
var DiaryMonthEnum = ((DiaryMonthEnum2) => {
  DiaryMonthEnum2[(DiaryMonthEnum2['CURRENT'] = currentMonth + 1)] = 'CURRENT'
  DiaryMonthEnum2[
    (DiaryMonthEnum2['ONE_MONTH_AGO'] = oneMonthAgo.getMonth() + 1)
  ] = 'ONE_MONTH_AGO'
  DiaryMonthEnum2[
    (DiaryMonthEnum2['TWO_MONTH_AGO'] = twoMonthAgo.getMonth() + 1)
  ] = 'TWO_MONTH_AGO'
  return DiaryMonthEnum2
})(DiaryMonthEnum || {})
var DiaryEnum = /* @__PURE__ */ ((DiaryEnum2) => {
  DiaryEnum2[(DiaryEnum2['PRIMOGEMS'] = 1)] = 'PRIMOGEMS'
  DiaryEnum2[(DiaryEnum2['MORA'] = 2)] = 'MORA'
  return DiaryEnum2
})(DiaryEnum || {})
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    DiaryEnum,
    DiaryMonthEnum,
  })
