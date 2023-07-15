import { randomInt } from 'crypto'
import getPhenotype from './getPhenotype'
import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), 'data/id.json')

export default async function createCat(id: number) {
    const gen = 1
    const sex = Boolean(randomInt(0, 2))
    const coatCol: Allele = {
        phenotype: 0,
        genotype: [
            randomInt(0, 3),
            randomInt(0, 3),
        ]
    }
    const orange: Allele = {
        phenotype: 0,
        genotype: sex ? [
            randomInt(0, 2),
            randomInt(0, 2),
        ] : [
            randomInt(0, 2),
        ]
    }
    coatCol.phenotype = getPhenotype(coatCol.genotype)
    orange.phenotype = getPhenotype(orange.genotype)
    
    const newCat: Cat = {
        id: id,
        name: String(id),
        parentIds: {
            m: -1,
            f: -1,
        },
        generation: gen,
        genes: {
            sex: sex,
            coatCol: coatCol,
            orange: orange
        }
    }
    return newCat
}
