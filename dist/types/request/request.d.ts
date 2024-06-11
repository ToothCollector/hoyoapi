/// <reference types="node" />
import type {
  HTTPBody,
  HTTPQueryParams,
  HTTPServerResponse,
} from './request.inteface'
/**
 * Class for handling HTTP requests with customizable headers, body, and parameters.
 *
 * @class
 * @internal
 * @category Internal
 */
export declare class HTTPRequest {
  /**
   * Query parameters for the request.
   */
  private params
  /**
   * Body of the request.
   */
  private body
  /**
   * The cache used for the request
   */
  private cache
  private headers
  /**
   * Flag indicating whether Dynamic Security is used.
   */
  private ds
  /**
   * The number of request attempts made.
   */
  private retries
  http?: {
    response?: object
    request?: object
    code?: number
  }
  constructor(cookie?: string)
  /**
   * Sets search parameters or query parameter.
   *
   * @param params - An object of query parameter to be set.
   * @returns Returns this Request object.
   */
  setQueryParams(params: HTTPQueryParams): this
  /**
   * Set Body Parameter
   *
   * @param body - RequestBodyType as object containing the body parameters.
   * @returns This instance of Request object.
   */
  setBody(data: HTTPBody): this
  /**
   * Set Referer Headers
   *
   * @param url - The URL string of referer
   * @returns The updated Request instance.
   */
  setReferer(url: string | URL): this
  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  setLang(lang: string): this
  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag indicating whether to use dynamic security or not (default: true).
   * @returns {this} The current Request instance.
   */
  setDs(flag?: boolean): this
  /**
   * Send the HTTP request.
   *
   * @param url - The URL to send the request to.
   * @param method - The HTTP method to use. Defaults to 'GET'.
   * @param ttl - The TTL value for the cached data in seconds.
   * @returns A Promise that resolves with the response data, or rejects with a HoyoAPIError if an error occurs.
   * @throws {HoyoAPIError} if an error occurs rejects with a HoyoAPIError
   */
  send(
    url: string,
    method?: 'GET' | 'POST',
    ttl?: number,
  ): Promise<HTTPServerResponse>
}
