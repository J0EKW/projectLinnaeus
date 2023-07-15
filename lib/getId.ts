import React from 'react'
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data/id.json')

export default function getId(): number | undefined {
    const data = fs.readFileSync(dataDirectory, 'utf8')
    const id = JSON.parse(data)
    if (id !== undefined) {
        return id.id
    }
    return id
}
