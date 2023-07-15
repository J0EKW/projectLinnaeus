import { NextRequest, NextResponse } from 'next/server'
import createKitten from '../../../../lib/createKitten'
import getCats from '../../../../lib/getCats'
import getId from '../../../../lib/getId'
import setCats from '../../../../lib/setCats'
import createCat from '../../../../lib/createCat'
import setId from '../../../../lib/setId'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const idParam = searchParams.get('id')
    var body: any = { error: "Something went wrong, please try again" };
    var status  = 500;
    const id = Number(idParam)
    
    if (idParam !== null && !Number.isNaN(id)) {
        const cat = getCats([id])
        if (cat !== undefined) {
            body = cat[0]
            status  = 200
        } else {
            body = { error: "Could not find a cat with that id" }
            status  = 404
        }
    } else {
        body = { error: "Invalid id provided" }
        status  = 400
    }
    return NextResponse.json(body, {status: status })
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    var body: any = { error: 'Something went wrong, please try again' };
    var status  = 500;

    if (data.maleId !== undefined && data.femaleId !== undefined) {
        const maleId = Number(data.maleId)
        const femaleId = Number(data.femaleId)
        const cats = getCats()
        if (cats !== undefined) {
            const male = cats.find(cat => cat.id == maleId)
            const female = cats.find(cat => cat.id == femaleId)
            if (male !== undefined && female !== undefined) {
                const id = getId()
                if (id !== undefined) {
                    const newCat: Cat = createKitten(male, female, id)
                    cats.push(newCat)
                    setCats(cats)
                    setId()
                    body = newCat
                    status  = 200
                }
            } else if (female == undefined) {
                body = { error: 'A female cat with that ID could not be found' }
                status  = 404
            } else {
                body = { error: 'A male cat with that ID could not be found' }
                status  = 404
            }
        }
    } else if (data.maleId == undefined && data.femaleId == undefined) {
        
        const cats = getCats()
        if (cats !== undefined) {
            const id = getId()
            if (id !== undefined) {
                const newCat: Cat = await createCat(id)
                cats.push(newCat)
                setCats(cats)
                setId()
                body = newCat
                status  = 200
            }
        }
    } else if (data.femaleId == undefined) {
        body = { error: 'ID for female cat was not correctly provided' }
        status  = 400
    } else if (data.maleId == undefined) {
        body = { error: 'ID for male cat was not correctly provided' }
        status  = 400
    }

    return NextResponse.json(body, { status: status })
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const idParam = searchParams.get('id')
    var body: any = { error: 'Something went wrong, please try again' };
    var status  = 500;
    const id = Number(idParam)

    if (idParam !== null && !Number.isNaN(id)) {
        const cats = getCats()
        if (cats !== undefined) {
            if (cats.find(cat => cat.id === id) !== undefined) {
                const newCats = cats.filter(cat => cat.id !== id)
                const data = setCats(newCats)
                body = { message: 'Cat was successfully deleted' }
                status  = 200
            } else {
                body = { error: 'Could not find a cat with that id' }
                status  = 404
            }
        }
    } else {
        body = { error: 'Invalid id provided' }
        status  = 400
    }

    return NextResponse.json(body, { status: status })
}