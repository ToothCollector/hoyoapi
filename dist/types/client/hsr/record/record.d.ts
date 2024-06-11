import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  IHSRCharacterFull,
  IHSRForgottenHall,
  IHSRNote,
  IHSRRecord,
} from './interfaces'
import { ForgottenHallScheduleEnum } from './record.enum'
/**
 * HSRRecordModule class provides methods to interact with Honkai Star Rail record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export declare class HSRRecordModule {
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
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHSRCharacterFull[]>} A Promise that resolves to an array of full HSR characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  characters(): Promise<IHSRCharacterFull[]>
  /**
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHSRRecord>} A Promise that resolves to the HSR record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  records(): Promise<IHSRRecord>
  /**
   * Retrieves the note associated with the provided region and UID.
   *
   * @returns {Promise<IHSRNote>} A Promise that resolves to the HSR note object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  note(): Promise<IHSRNote>
  /**
   * Retrieves the forgotten hall information associated with the provided region and UID.
   *
   * @param scheduleType The schedule type for the forgotten hall (optional, defaults to CURRENT).
   * @returns {Promise<IHSRForgottenHall>} A Promise that resolves to the forgotten hall information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if the given scheduleType parameter is invalid.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  forgottenHall(
    scheduleType?: ForgottenHallScheduleEnum,
  ): Promise<IHSRForgottenHall>
}
