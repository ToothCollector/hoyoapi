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
var request_exports = {}
__export(request_exports, {
  HTTPRequest: () => HTTPRequest,
})
module.exports = __toCommonJS(request_exports)
var import_https = require('https')
var import_zlib = require('zlib')
var import_error = require('../error')
var import_request = require('./request.helper')
var import_cache = require('../cache')
var import_crypto = require('crypto')
var import_language = require('../language')
class HTTPRequest {
  constructor(cookie) {
    /**
     * Query parameters for the request.
     */
    __publicField(this, 'params', {})
    /**
     * Body of the request.
     */
    __publicField(this, 'body', {})
    /**
     * The cache used for the request
     */
    __publicField(this, 'cache')
    /*
     * Headers for the request.
     */
    __publicField(this, 'headers', {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'sec-ch-ua':
        '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.46',
      'x-rpc-app_version': '1.5.0',
      'x-rpc-client_type': '5',
      'x-rpc-language': 'en-us',
    })
    /**
     * Flag indicating whether Dynamic Security is used.
     */
    __publicField(this, 'ds', false)
    /**
     * The number of request attempts made.
     */
    __publicField(this, 'retries', 1)
    __publicField(this, 'http')
    if (cookie) this.headers.Cookie = cookie
    this.cache = new import_cache.Cache()
  }
  /**
   * Sets search parameters or query parameter.
   *
   * @param params - An object of query parameter to be set.
   * @returns Returns this Request object.
   */
  setQueryParams(params) {
    this.params = { ...this.params, ...params }
    return this
  }
  /**
   * Set Body Parameter
   *
   * @param body - RequestBodyType as object containing the body parameters.
   * @returns This instance of Request object.
   */
  setBody(data) {
    this.body = { ...this.body, ...data }
    return this
  }
  /**
   * Set Referer Headers
   *
   * @param url - The URL string of referer
   * @returns The updated Request instance.
   */
  setReferer(url) {
    this.headers.Referer = url.toString()
    this.headers.Origin = url.toString()
    return this
  }
  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  setLang(lang) {
    this.headers['x-rpc-language'] = import_language.Language.parseLang(lang)
    return this
  }
  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag indicating whether to use dynamic security or not (default: true).
   * @returns {this} The current Request instance.
   */
  setDs(flag = true) {
    this.ds = flag
    return this
  }
  /**
   * Send the HTTP request.
   *
   * @param url - The URL to send the request to.
   * @param method - The HTTP method to use. Defaults to 'GET'.
   * @param ttl - The TTL value for the cached data in seconds.
   * @returns A Promise that resolves with the response data, or rejects with a HoyoAPIError if an error occurs.
   * @throws {HoyoAPIError} if an error occurs rejects with a HoyoAPIError
   */
  async send(url, method = 'GET', ttl = 60) {
    const fetch = (url2, method2) => {
      return new Promise((resolve, reject) => {
        const hostname = new URL(url2)
        const queryParams = new URLSearchParams(hostname.searchParams)
        Object.keys(this.params).forEach((val) => {
          var _a, _b
          queryParams.append(
            val,
            (_b = (_a = this.params[val]) == null ? void 0 : _a.toString()) !=
              null
              ? _b
              : '',
          )
        })
        hostname.search = queryParams.toString()
        const options = {
          method: method2,
          headers: this.headers,
        }
        const client = (0, import_https.request)(hostname, options, (res) => {
          if (res.statusCode === 429) {
            return resolve({
              response: {
                data: null,
                message: 'Too Many Request',
                retcode: 429,
              },
              status: {
                code: 429,
                message: 'Too Many Request',
              },
              headers: res.headers,
              body: this.body,
              params: this.params,
            })
          } else if (
            res.statusCode &&
            res.statusCode >= 400 &&
            res.statusCode < 600
          ) {
            reject(
              new import_error.HoyoAPIError(
                'HTTP '.concat(res.statusCode, ': ').concat(res.statusMessage),
                res.statusCode,
                {
                  response: res.statusMessage,
                  request: {
                    params: this.params,
                    body: this.body,
                    headers: this.headers,
                  },
                },
              ),
            )
          }
          const stream = []
          res.on('data', (chunk) => {
            stream.push(chunk)
          })
          res.on('end', () => {
            var _a, _b, _c, _d
            let buffer = Buffer.concat(stream)
            const encoding = res.headers['content-encoding']
            if (encoding === 'gzip') {
              buffer = (0, import_zlib.gunzipSync)(buffer)
            } else if (encoding === 'deflate') {
              buffer = (0, import_zlib.inflateSync)(buffer)
            } else if (encoding === 'br') {
              buffer = (0, import_zlib.brotliDecompressSync)(buffer)
            }
            const responseString = buffer.toString('utf8')
            let response
            if (res.headers['content-type'] === 'application/json') {
              try {
                response = JSON.parse(responseString)
                resolve({
                  response: {
                    data:
                      (_a = response == null ? void 0 : response.data) != null
                        ? _a
                        : null,
                    message:
                      (_b = response == null ? void 0 : response.message) !=
                      null
                        ? _b
                        : '',
                    retcode:
                      (_c = response == null ? void 0 : response.retcode) !=
                      null
                        ? _c
                        : -1,
                  },
                  status: {
                    /* c8 ignore next */
                    code: (_d = res.statusCode) != null ? _d : -1,
                    message: res.statusMessage,
                  },
                  headers: res.headers,
                  body: this.body,
                  params: this.params,
                })
              } catch (error) {
                reject(
                  new import_error.HoyoAPIError(
                    'Failed to parse response body as JSON',
                  ),
                )
              }
            } else {
              reject(
                new import_error.HoyoAPIError(
                  'Response Content-Type is not application/json',
                ),
              )
            }
          })
          res.on('error', (err) => {
            reject(new import_error.HoyoAPIError(err.message))
          })
        })
        if (method2 === 'POST') {
          client.write(JSON.stringify(this.body))
        }
        client.end()
      })
    }
    const cacheKey = (0, import_crypto.createHash)('md5')
      .update(
        JSON.stringify({
          url,
          method,
          body: this.body,
          params: this.params,
        }),
      )
      .digest('hex')
    const cachedResult = this.cache.get(cacheKey)
    if (cachedResult) {
      return cachedResult
    }
    if (this.ds) {
      this.headers.DS = (0, import_request.generateDS)()
    }
    const req = await fetch(url, method)
    if (
      [-1004, -2016, -500004, 429].includes(req.response.retcode) &&
      this.retries <= 120
    ) {
      this.retries++
      await (0, import_request.delay)(1)
      return this.send(url, method)
    }
    this.retries = 1
    this.body = {}
    this.params = {}
    this.cache.set(cacheKey, req, ttl)
    return req
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    HTTPRequest,
  })
