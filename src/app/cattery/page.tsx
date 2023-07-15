'use client'

import React, { useEffect, useState, MouseEvent } from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

export default function page() {
  const [cats, setCats] = useState<Cat[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError]     = useState<boolean>(false)
  const [getCats, setGetCats] = useState<boolean>(false)
  
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/cats')
    .then((data) => data.json())
    .then((data) => {
      if (data.error) {
        setError(true)
      } else {
        setCats(data)
        setError(false)
      }
      setLoading(false)
    })
  }, [getCats])
  
  const breedHandle = async (e: MouseEvent) => {
    e.preventDefault()
    const male   = document.getElementById('male') as HTMLSelectElement
    const female = document.getElementById('female') as HTMLSelectElement

    if (male !== null && female !== null) {
      const data = {
        maleId: male.value,
        femaleId: female.value,
      }
      const jsonData = JSON.stringify(data)
      const endpoint = '/api/cat'
      const options = {
        method: 'POST',
        headers: {
          'contentType': 'application/json'
        },
        body: jsonData,
      }
      const response = await fetch(endpoint, options)
      console.log({status: response.status, message: await response.json()})
      setGetCats(!getCats)
    }
  }


  const newCatHandle = async (e: MouseEvent) => {
    e.preventDefault()
    const data = {
      maleId: undefined,
      femaleId: undefined,
    }
    const jsonData = JSON.stringify(data)
    const endpoint = '/api/cat'
    const options = {
      method: 'POST',
      headers: {
        'contentType': 'application/json'
      },
      body: jsonData
    }
    const response = await fetch(endpoint, options)
    console.log({status: response.status, message: await response.json()})
    setGetCats(!getCats)
  }

  if (loading) {
    return <p className="text-black dark:text-white">Loading...</p>
  }

  if (error) {
    return <p className="text-black dark:text-white">An error occurred, please try again</p>
  }

  return (
    <>
      <title>Cattery - Project Linnaeus</title>
      <div className="mx-auto max-w-lg my-10 justify">
      <h1 className="text-black dark:text-white text-3xl font-bold">Cattery</h1>
      <br />
        {cats.map((x, i) => { return (
          <Link className="list-item dark:text-white font-bold hover:underline" href={`http://localhost:3000/${x.id}`} key={i}>{x.name}</Link>
        )})}
      <br />
        <div className="justify-evenly items-start">
          <select id='male'>
          {cats.map((x, i) => { 
            if (!x.genes.sex) {
              return (
                <option key={i} value={x.id}>{x.name}</option>
              )}})
            }
          </select>
          <p className="text-black dark:text-white">X</p>
          <select id='female'>
          {cats.map((x, i) => { 
            if (x.genes.sex) {
              return (
                <option key={i} value={x.id}>{x.name}</option>
              )}})
            }
          </select>
          <p>
            <button className="text-black dark:text-white font-bold hover:underline" onClick={e => breedHandle(e)}>BREED</button>
          </p>
          <p>
            <button className="text-black dark:text-white font-bold hover:underline" onClick={e => newCatHandle(e)}>NEW CAT</button>
          </p>
        </div>
      </div>
    </>
  )
}
