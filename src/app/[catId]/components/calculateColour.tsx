import React from 'react'

type Props = {
    params: {
        sex: boolean,
        coatCol: Allele,
        orange: Allele
    }
}

const coatColLookup = [["b1", "Cinnamon"], ["b", "Brown"], ["B", "Black"]]

export default function calculateColour({ params: { sex, coatCol, orange } }: Props) {
    if ((sex && orange.genotype[0] == 1 && orange.genotype[1] == 1) || (!sex && orange.genotype[0] == 1)) {
        return(
            <>
            &nbsp;an orange
            </>
        )
    } else if (sex && (orange.genotype[0] == 1 || orange.genotype[1] == 1)) {
        return (
        <>
        &nbsp;an orange/{ coatColLookup[coatCol.phenotype][1] } tortoise-shell
        </>
        )
    } else {
        return (
            <>
            &nbsp;a { coatColLookup[coatCol.phenotype][1] }
            </>
            )
    }
}
