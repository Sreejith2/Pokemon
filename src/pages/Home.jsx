import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

function Home() {
    const [posts, setPosts] = useState(null)
    const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [prevUrl, setPrevUrl] = useState(null)
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon')
    const [searchTerm, setSearchTerm] = useState('')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await axios.get(currentUrl)
            const allPosts = response.data.results
            const postWithImages = []

            for (let post of allPosts) {
                const details = await axios.get(post.url)
                postWithImages.push({ name: post.name, imgURL: details.data.sprites.front_default })
            }

            setPosts(postWithImages)
            setNextUrl(response.data.next)
            setPrevUrl(response.data.previous)
            setLoading(false)
        }

        fetchData()
    }, [currentUrl])

    const handleNext = () => {
        if (nextUrl) {
            setCurrentUrl(nextUrl)
        }
    }

    const handlePrev = () => {
        if (prevUrl) {
            setCurrentUrl(prevUrl)
        }
    }

    const handleSearch = async ()=>{
        setLoading(true)
        setSearchTerm('')
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
            const postWithImages = [{
                name: response.data.name,
                imgURL: response.data.sprites.front_default
            }]
            setPosts(postWithImages)
        } catch (error) {
            alert('Pokemon not found')
        }
        setLoading(false)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-5 py-10'>
            {loading ?
                <p className=' animate-pulse text-[20px]'>Loading...</p>
                :<div className=' flex flex-col gap-5'>
                    <div className=' flex'>
                        <input className=' flex-1 border border-black outline-none p-2' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} type='text' placeholder='Search here...' />
                        <button onClick={handleSearch} className='bg-black text-white p-2'>Search</button>
                    </div>
                    <div className='grid grid-cols sm:grid-cols-3 gap-5 lg:grid-cols-4'>
                        {posts && posts.map((item, index) => <Card key={index} name={item.name} imgURL={item.imgURL} />)}
                    </div>
                </div>
            }
            {!loading?<div className=' flex items-center gap-5'>
                <button onClick={handleNext} className='bg-black text-white p-1 w-20'>Next</button>
                <button onClick={handlePrev} className='bg-black text-white p-1 w-20'>Previous</button>
            </div>:null
            }
        </div>
    )
}

export default Home
