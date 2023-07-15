import React from 'react'
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data/data.json')

export default function getCats(ids?: number[]): Cat[] | undefined {
    const data = fs.readFileSync(dataDirectory, 'utf8')
    const cats: Cat[] | undefined = JSON.parse(data)
    if (ids !== undefined && cats !== undefined) {
        const returnCat = cats.filter(cat => ids.find(id => id == cat.id) !== undefined)
        if (returnCat.length == 0) {
            return undefined
        }
        return returnCat
    }
    return cats
}
