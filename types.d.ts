type Allele = {
    phenotype: number,
    genotype: number[]
}

type Genome = {
    sex: boolean,
    coatCol: Allele,
    orange: Allele
}

type Cat = {
    id: readonly number,
    name: string,
    parentIds: { m: number, f: number },
    generation: number,
    genes: Genome
}