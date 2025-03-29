import { db } from '../utils/db'
import { defineEventHandler } from 'h3'  // '#imports' 대신 'h3' 사용
import { RowDataPacket } from 'mysql2'

interface NowRow extends RowDataPacket {
  now: string
}

export default defineEventHandler(async () => {
  const [rows] = await db.query<NowRow[]>('SELECT NOW() AS now')
  return { serverTime: rows[0].now }
})
