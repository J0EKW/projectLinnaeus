'use client'

import Link from 'next/link'
import React, { useEffect, useState, KeyboardEvent, MouseEvent } from 'react'
import Parents from './components/parents'
import CalculateColour from './components/calculateColour'
import { useRouter } from 'next/navigation'

type Props = {
    params: {
        catId: number
    }
}

const defaultParent: Cat = {
    id: -1,
    name: "First",
    parentIds: {m: -1, f: -1},
    generation: -1,
    genes: {sex: true, coatCol: {phenotype: -1, genotype: [-1, -1]}, orange: {phenotype: -1, genotype: [-1, -1]}}
}

const sexLookup = [[0, "male"], [1, "female"]]
const coatColLookup = [["b1", "Cinnamon"], ["b", "Brown"], ["B", "Black"]]
const orangeLookup = [["o", "non-orange"], ["O", "Orange"]]

export default function page({ params: { catId } }: Props) {
    const router = useRouter()
    const [nameChange, setNameChange] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cat, setCat] = useState<Cat | undefined>(undefined)
    const [male, setMale] = useState<Cat | undefined>(undefined)
    const [female, setFemale] = useState<Cat | undefined>(undefined)

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/api/cat?id=${catId}`)
        .then((data) => data.json())
        .then((data) => {
          setCat(Object.keys(data).length == 0 ?  undefined : data)
        })
      }, [])
    
    useEffect(() => {
        if (cat !== undefined) {
            if (cat.parentIds.m == -1 && cat.parentIds.f == -1) {
                setMale(defaultParent)
                setFemale(defaultParent)
                setLoading(false)
            } else {
                fetch(`http://localhost:3000/api/cat?id=${cat.parentIds.m}`)
                .then((data) => data.json())
                .then((data) => {
                    setMale(data)
                    setLoading(false)
                })
                fetch(`http://localhost:3000/api/cat?id=${cat.parentIds.f}`)
                .then((data) => data.json())
                .then((data) => {
                    setFemale(data)
                    setLoading(false)
                })
            }
        }
    }, 
    [cat])

    const nameChangeHandle = async (e: MouseEvent) => {
        setNameChange(!nameChange)
    }

    const submitNameHandle = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const name: string = e.currentTarget.value
            const data = {
                id: cat?.id,
                newName: name
            }
            const jsonData = JSON.stringify(data)
            const endpoint = '/api/cat/name'
            const options = {
                method: 'POST',
                headers: {
                  'contentType': 'application/json'
                },
                body: jsonData,
            }
            const response = await fetch(endpoint, options)
            console.log({status: response.status, message: await response.json()})
            if (cat !== undefined) {
                cat.name = name
                setCat(cat)
            }
            setNameChange(!nameChange)
        }
    }

    const deleteHandle = async (id: number) => {
        const endpoint = `/api/cat?id=${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'contentType': 'application/json'
            },
        }
        const response = await fetch(endpoint, options)
        console.log({status: response.status, message: await response.json()})
        router.push('/cattery')
    }

    if (cat == undefined) {
        return <p className="text-black dark:text-white">A cat with that ID does not exist</p>
    }
    if (loading) {
        return <p className="text-black dark:text-white">Loading...</p>
      }
    if (cat !== undefined && male !== undefined && female !== undefined) {
        return (
            <>
            <title>{cat.name + ' - Project Linnaeus'}</title>
            <div className="mx-auto max-w-lg my-10">
                { nameChange ? <input type='text' defaultValue={cat.name} onKeyDown={(e) => submitNameHandle(e)}/> : 
                <h1 onClick={e => nameChangeHandle(e)} className="text-black dark:text-white text-3xl font-bold">{ cat.name }</h1>
                }<br/>
                <h1 className="text-black dark:text-white text-2xl font-bold">Description</h1>
                <p className="text-black dark:text-white">This is a { sexLookup[Number(cat.genes.sex)][1] } cat from generation { cat.generation }. <Parents params={{male: {name:male.name, id:male.id}, female: {name:female.name, id:female.id}}} /> It has  
                <CalculateColour params={{sex: cat.genes.sex, coatCol: cat.genes.coatCol, orange: cat.genes.orange}}/> coat</p>
                <br/>
                <h1 className="text-black dark:text-white text-2xl font-bold">DNA</h1>
                <p className="text-black dark:text-white">Coat colour: ({ coatColLookup[cat.genes.coatCol.genotype[0]][0] }, { coatColLookup[cat.genes.coatCol.genotype[1]][0] })</p>
                { cat.genes.sex ?
                    <p className="text-black dark:text-white">Orange: ({ orangeLookup[cat.genes.orange.genotype[0]][0] }, { orangeLookup[cat.genes.orange.genotype[1]][0] })</p>
                  : <p className="text-black dark:text-white">Orange: { orangeLookup[cat.genes.orange.genotype[0]][0] }</p> }
                <Link className=" absolute bottom-10 hover:underline font-bold dark:text-white text-black" href='http://localhost:3000/cattery'>CATTERY</Link>
                <p>
                    <button className="text-black dark:text-white font-bold hover:underline" onClick={() => deleteHandle(cat.id)}>DELETE</button>
                </p>
            </div>
            </>
        )
    }
    return (
        <div>page</div>
    )
}
