import React from 'react'

export default function getPhenotype(genotype: number[]): number {
    const a = genotype[0]
    const b = genotype[1]
    return a > b ? a : b
}
