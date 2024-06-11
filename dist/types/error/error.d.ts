import { IHTTPError } from './error.inteface'
/**
 * Represents an error that can be thrown during interactions with the Hoyolab API.
 *
 * @class
 * @category Main
 */
export declare class HoyoAPIError extends Error {
  /**
   * The name of this error.
   */
  readonly name: string
  /**
   * The message associated with this error.
   */
  readonly message: string
  /**
   * The HTTP object
   */
  readonly http?: IHTTPError
  /**
   * The error code
   */
  readonly code?: number
  /**
   * Constructs a new instance of the HoyolabError class with the specified message.
   *
   * @param message The message to associate with this error.
   */
  constructor(message: string, code?: number, http?: IHTTPError)
}
