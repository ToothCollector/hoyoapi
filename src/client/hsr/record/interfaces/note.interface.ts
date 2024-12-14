export interface IHSRExpedition {
  avatars: string[]
  status: string
  remaining_time: number
  name: string
  item_url: string
}
export interface IHSRNote {
  current_stamina: number
  max_stamina: number
  current_reserve_stamina: number
  is_reserve_stamina_full: boolean
  stamina_recover_time: number
  stamina_full_ts: number
  accepted_epedition_num: number
  total_expedition_num: number
  expeditions: IHSRExpedition[]
}
