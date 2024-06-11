import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  IHIAbyss,
  IHIArena,
  IHICharacter,
  IHIElysian,
  IHIRecord,
} from './interfaces'
/**
 * HIRecordModule class provides methods to interact with Honkai Impact record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export declare class HIRecordModule {
  private request
  private lang
  private region
  private uid
  /**
   * Creates an instance of HSRRecordModule.
   *
   * @param request The HTTPRequest object used for making API requests.
   * @param lang The language enum value.
   * @param region The region string or null if not provided.
   * @param uid The UID number or null if not provided.
   */
  constructor(
    request: HTTPRequest,
    lang: LanguageEnum,
    region: string | null,
    uid: number | null,
  )
  /**
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHIRecord>} A Promise that resolves to the HI record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  records(): Promise<IHIRecord>
  /**
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHICharacter[]>} A Promise that resolves to an array of HI characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  characters(): Promise<IHICharacter[]>
  /**
   * Retrieves the abyss information associated with the provided region and UID.
   *
   * @returns {Promise<IHIAbyss>} A Promise that resolves to the HI abyss information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  abyss(): Promise<IHIAbyss>
  /**
   * Retrieves the arena information associated with the provided region and UID.
   *
   * @returns {Promise<IHIArena>} A Promise that resolves to the HI arena information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  arena(): Promise<IHIArena>
  /**
   * Retrieves the elysian information associated with the provided region and UID.
   *
   * @returns {Promise<IHIElysian>} A Promise that resolves to the HI elysian information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  elysian(): Promise<IHIElysian>
}
