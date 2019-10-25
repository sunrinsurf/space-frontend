import client from "./client";

async function checkOverlap(column: string, value: any) {
    const req = await client.post('/user/overlap', {
        type: column,
        content: value
    });

    return req.data.overlap;
}

export default checkOverlap;