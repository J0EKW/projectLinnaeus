import React from 'react'
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data/data.json')

export default function setCats(cats: Cat[]) {
    fs.writeFileSync(dataDirectory, JSON.stringify(cats))
}
