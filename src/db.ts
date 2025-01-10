import {JSONFilePreset} from 'lowdb/node'

type Data = {
    initial: string[]
}

const defaultData: Data = { initial: [] }
export const db = await JSONFilePreset<Data>('db.json', defaultData)