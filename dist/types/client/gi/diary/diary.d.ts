import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  DiaryEnum,
  DiaryMonthEnum,
  IGenshinDiaryDetail,
  IGenshinDiaryInfo,
} from './diary.interface'
/**
 * A module to interact with the Genshin Impact diary endpoints of the Hoyolab API
 *
 * @public
 * @internal
 * @category Module
 */
export declare class GenshinDiaryModule {
  private request
  private lang
  private region
  private uid
  /**
   * Constructs a DiaryModule instance
   *
   * @param request - An instance of the Request class to make HTTP requests
   * @param lang - A LanguageEnum value for the language of the user
   * @param region - A string value for the region of the user
   * @param uid - A number value for the UID of the user
   */
  constructor(
    request: HTTPRequest,
    lang: LanguageEnum,
    region: string | null,
    uid: number | null,
  )
  /**
   * Returns the diary information of a given month for a user
   *
   * @param month - A DiaryMonthEnum value for the month of the diary information requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryInfo object
   * @throws {@link HoyoAPIError} when the uid or region parameter is missing or invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  list(month?: DiaryMonthEnum): Promise<IGenshinDiaryInfo>
  /**
   * Returns the diary details of a given type and month for a user
   *
   * @param type - A DiaryEnum value for the type of diary details requested
   * @param month - A DiaryMonthEnum value for the month of the diary details requested. Default is CURRENT.
   * @returns A promise that resolves to an IGenshinDiaryDetail object
   * @throws {@link HoyoAPIError} when the uid or region parameter is missing or invalid, or when the type or month parameter is invalid
   * @remarks
   * This method sends a request to the Genshin Impact API to get the daily note information for a user.
   * The user's region and UID must be set before calling this method, otherwise an error will be thrown.
   */
  detail(type: DiaryEnum, month?: DiaryMonthEnum): Promise<IGenshinDiaryDetail>
}
