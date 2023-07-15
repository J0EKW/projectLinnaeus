import React from 'react'

type Props = {
    params: {
        male: {
            name: string,
            id: number,
        },
        female: {
            name: string,
            id: number
        }
    }
}

export default function Parents({ params: { male, female } }: Props) {
    if (male.id !== -1 && female.id !== -1) {
        return(
            <>
            It is the child of <a className="hover:underline font-bold dark:text-white text-black" href={`http://localhost:3000/${male.id}`}>{ male.name }</a> and <a className="hover:underline font-bold dark:text-white text-black" href={`http://localhost:3000/${female.id}`}>{ female.name }</a>.
            </>
        )
    } else {
        return (
        <>
            It has no parents.
        </>
        )
    }
}
