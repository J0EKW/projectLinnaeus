import React from 'react'
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data/id.json')

export default function setId(): void {
    const data = fs.readFileSync(dataDirectory, 'utf8')
    const idData = JSON.parse(data)
    if (idData !== undefined) {
        const id = idData.id
        fs.writeFileSync(dataDirectory, JSON.stringify({id: id+1}))
    }
}
