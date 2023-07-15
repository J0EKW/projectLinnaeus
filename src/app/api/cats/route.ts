import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import getCats from '../../../../lib/getCats';

const dataDirectory = path.join(process.cwd(), 'data/data.json')

export async function GET(request: NextRequest) {
    var body: any = {error: 'Something went wrong, please try again'};
    var status  = 500;

    const cats = getCats()
    if (cats !== undefined) {
        body = cats
        status = 200
    }
    return NextResponse.json(body, { status: status })
}
