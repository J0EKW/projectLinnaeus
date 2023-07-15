import { NextRequest, NextResponse } from 'next/server'
import getCats from '../../../../../lib/getCats'
import setCats from '../../../../../lib/setCats'

export async function POST(request: NextRequest) {
    const { id, newName } = await request.json()
    var body: any = { error: 'Something went wrong, please try again' };
    var status  = 500;

    if (id !== undefined && newName !== undefined) {
        const data = await getCats()
        
        if (data !== undefined) {
            const cat = data.find(cat => cat.id == id)
            if (cat !== undefined) {
                cat.name = newName
                const index = data.indexOf(cat)
                data[index] = cat
                setCats(data)
                body = cat
                status  = 200
            } else {
                body = { error: 'A cat with that ID could not be found' }
                status  = 404
            }
        } 
    }  else if (id == undefined) {
        body = { error: 'ID for the cat was not correctly provided' }
        status  = 400
    } else if (newName == undefined) {
        body = { error: 'A new name was not correctly provided' }
        status  = 400
    }
    
    return NextResponse.json(body, { status: status })
}