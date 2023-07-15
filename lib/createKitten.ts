import { randomInt } from 'crypto'
import React, { useState } from 'react'
import getPhenotype from './getPhenotype'

export default function createKitten(male:Cat, female:Cat, id: number) {
    const gen = male.generation > female.generation ? male.generation + 1 : female.generation + 1
    const sex = Boolean(randomInt(0, 2))
    const coatCol: Allele = {
        phenotype: 0,
        genotype: [
            male.genes.coatCol.genotype[randomInt(0, 2)],
            female.genes.coatCol.genotype[randomInt(0, 2)],
        ]
    }
    const orange: Allele = {
        phenotype: 0,
        genotype: sex ? [
            male.genes.orange.genotype[0],
            female.genes.orange.genotype[randomInt(0, 2)],
        ] : [
            female.genes.orange.genotype[randomInt(0, 2)],
        ]
    }
    coatCol.phenotype = getPhenotype(coatCol.genotype)
    orange.phenotype = getPhenotype(orange.genotype)
    
    const newCat: Cat = {
        id: id,
        name: String(id),
        parentIds: {
            m: male.id,
            f: female.id,
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
