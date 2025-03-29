import { db } from '../utils/db'
import { defineEventHandler, readBody } from 'h3'
import { RowDataPacket } from 'mysql2'

interface Exercise extends RowDataPacket {
    name: string              // 운동 이름 (기본 키)
    description: string       // 운동 설명
    muscle_group: string      // 운동이 주로 사용하는 근육 그룹
    equipment: string         // 필요한 운동 기구
    difficulty: string        // 난이도
    created_at: string        // 생성 시간 (TIMESTAMP 문자열)
}

export default defineEventHandler(async (event) => {
    // event.node.req.method를 사용하여 HTTP 요청 메서드를 대문자로 가져옵니다.
    // 만약 메서드가 없으면 'GET'을 기본값으로 사용합니다.
    const method = (event.node.req.method || 'GET').toUpperCase()

    switch (method) {
        case 'GET': {
            // GET 요청: exercise_name 테이블의 모든 데이터를 조회합니다.
            const [rows] = await db.query<Exercise[]>('SELECT * FROM exercise_name')
            
            return rows
        }
        case 'POST': {
            // POST 요청: 새 운동 데이터를 삽입합니다.
            const body = await readBody(event)
            const { name, description, muscle_group, equipment, difficulty } = body

            // 필수 필드가 누락되었으면 에러 메시지를 반환합니다.
            if (!name || !description || !muscle_group || !equipment || !difficulty) {
                return { error: '필수 필드가 누락되었습니다.' }
            }

            // INSERT 쿼리를 실행하여 새 운동 데이터를 추가합니다.
            // created_at은 NOW()로 설정합니다.
            await db.query(
                'INSERT INTO exercise_name (name, description, muscle_group, equipment, difficulty, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
                [name, description, muscle_group, equipment, difficulty]
            )

            return { message: '운동 데이터가 성공적으로 삽입되었습니다.' }
        }
        case 'PUT': {
            // PUT 요청: 기존 운동 데이터를 수정합니다.
            const body = await readBody(event)
            const { name, description, muscle_group, equipment, difficulty } = body

            // 기본 키인 name이 제공되지 않으면 에러 메시지를 반환합니다.
            if (!name) {
                return { error: '수정할 운동의 name(기본 키)이 필요합니다.' }
            }

            // UPDATE 쿼리를 실행하여 해당 운동 데이터를 업데이트합니다.
            await db.query(
                'UPDATE exercise_name SET description = ?, muscle_group = ?, equipment = ?, difficulty = ? WHERE name = ?',
                [description, muscle_group, equipment, difficulty, name]
            )

            return { message: '운동 데이터가 성공적으로 수정되었습니다.' }
        }
        case 'DELETE': {
            // DELETE 요청: 특정 운동 데이터를 삭제합니다.
            const { name } = await readBody(event)

            // 삭제할 운동의 name(기본 키)이 제공되지 않으면 에러 메시지를 반환합니다.
            if (!name) {
                return { error: '삭제할 운동의 name(기본 키)이 필요합니다.' }
            }

            // DELETE 쿼리를 실행하여 해당 운동 데이터를 삭제합니다.
            await db.query('DELETE FROM exercise_name WHERE name = ?', [name])

            return { message: '운동 데이터가 성공적으로 삭제되었습니다.' }
        }
        default: {
            // 허용되지 않는 HTTP 메서드일 경우, 응답 코드 405를 설정하고 에러 메시지를 반환합니다.
            event.node.res.statusCode = 405

            return { error: '허용되지 않는 HTTP 메서드입니다.' }
        }
    }
})
