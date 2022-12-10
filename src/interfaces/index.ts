export interface ISelectOptions {
  label: string
  value: string | number
}

export interface IAddrsses {
  id: string
  addrs_name: string
  addrs_number: number
  zip_code: string
  district: string
}

export interface ICategory {
  id: string
  title: string
  slug: string
  image: string
}

export interface IZone {
  id: string
  name: string
  description: string
  image: string
  phone: string
  email: string
  mesoregion_id?: number
  microregion_id?: number
  addresses: IAddrsses[]
  items: { id: string; title: string }[]
}

export interface IZonesFC {
  mesoRegionId: number
  microRegionId: number
  selectCategory: ICategory[]
}
