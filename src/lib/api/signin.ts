import client from './client'
import handleError from './handleError';

export async function getTokenAPI(uid: string, password: string, remember: boolean) {
    if (!uid || !password) {
        alert("값을 입력해주세요.")
    }
    return await handleError(async () => {
        const req = await client.post('/auth', { uid, password, remember });
        return req.data.token;
    })
}