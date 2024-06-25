"use client"
import prisma from '@/libs/db'
import { Select, Slider } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import { use, useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { BiDownArrow, BiUpArrow, BiUser } from 'react-icons/bi'
import { FaStar } from 'react-icons/fa'
import { SeriesModal } from '../components/SeriesModal'
import NewSerie from '../newSerie/page'

function Menu() {
  const [recommendations, setRecommendations] = useState<any>([])
  const [categories, setCategories] = useState<any>([])
  const [filteredRecommendations, setFilteredRecommendations] = useState<any>([])
  const [ratingValue, setRatingValue] = useState([0, 10])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [compressed, setCompressed] = useState(false)
  const [modalNewSerie, setModalNewSerie] = useState(false)
  const [modealSeries, setModalSeries] = useState(false)
  const [selectedSerie, setSelectedSerie] = useState<any>({})

  const session: any = useSession({
    required: true,
    onUnauthenticated() {
      return { redirect: '/auth/login' }
    }
  })

  // console.log(session)

  useEffect(() => {
    fetch('/api/recommendations')
      .then(response => response.json())
      .then(data => {
        const categories: any = []
        setRecommendations(data)
        setFilteredRecommendations(data)
        data.forEach((recommendation: any) => {
          if (!categories.includes(recommendation.category)) {
            categories.push(recommendation.category)
          }
        })
        setCategories(categories)
      })
  }, [])

  useEffect(() => {
    handleFilter()
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [ratingValue, selectedCategory, selectedService])

  const addSeries = (serie: any) => {
    setRecommendations([...recommendations, serie])
    setFilteredRecommendations([...recommendations, serie])
  }



  const handleFilter = () => {
    const filtered = recommendations.filter((recommendation: any) => {
      const matchesCategory = selectedCategory == "all" ? true : selectedCategory ? recommendation.category === selectedCategory : true;
      const matchesService = selectedService == "all" ? true : selectedService ? recommendation.service === selectedService : true;
      const matchesRating = recommendation.rating >= ratingValue[0] && recommendation.rating <= ratingValue[1];
      return matchesCategory && matchesService && matchesRating;
    });
    setFilteredRecommendations(filtered);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = (modalNewSerie || modealSeries) ? 'hidden' : 'auto'
  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [modalNewSerie, modealSeries])

  const handleChange1 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setRatingValue([Math.min(newValue[0], ratingValue[1] - 2), ratingValue[1]]);
    } else {
      setRatingValue([ratingValue[0], Math.max(newValue[1], ratingValue[0] + 2)]);
    }
  }



  return (
    <div className={`flex flex-col min-h-screen justify-center items-center sm:flex-row sm:items-start sm:justify-start`}>
      <div className='flex w-10/12 sm:w-3/12 sm:min-w-64 '>
        <div className='w-full bg-gray-800 text-white p-4 mx-3 mt-5 mb-2 shadow-lg rounded-md'>
          <div className='flex flex-row h-12 gap-3'>
            <BiUser className='text-4xl text-white' />
            <p className='text-lg font-bold'>{session.data?.user?.name}</p>
            <button
              className='bg-red-500 text-white px-2 rounded-md hover:bg-red-600 font-bold text-xs h-8'
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              Cerrar Sesión
            </button>
          </div>
          <h1 className='text-2xl font-bold'>Filtrar</h1>
          {!compressed ? (
            <div className='flex flex-col relative'>
              <div className='mt-4'>
                <h2 className='text-lg font-bold'>Categoría</h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value) }}
                  className='w-full p-2 rounded-md mt-2 bg-gray-900 text-white'>
                  <option value='all'>Todas</option>
                  {categories.map((category: any) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className='mt-4'>
                <h2 className='text-lg font-bold'>Rating</h2>
                <Slider
                  getAriaLabel={() => 'Rating range'}
                  value={ratingValue}
                  min={0}
                  max={10}
                  step={1}
                  onChange={handleChange1}
                  className='w-full'
                  valueLabelDisplay="auto"
                  getAriaValueText={() => 'Rating'}
                />
              </div>
              <div className='mt-4'>
                <h2 className='text-lg font-bold'>Service</h2>
                <select
                  value={selectedService}
                  className='w-full p-2 rounded-md mt-2 bg-gray-900 text-white'
                  onChange={(e) => { setSelectedService(e.target.value) }}
                >
                  <option value='all'>Todas</option>
                  <option value='Netflix'>Netflix</option>
                  <option value='Amazon Prime'>Amazon Prime</option>
                  <option value='HBO'>HBO</option>
                  <option value='Disney+'>Disney+</option>
                </select>
              </div>
              <div className='mt-4'>
                <button
                  className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4 font-bold text-xs w-full flex self-center text-center justify-center'
                  onClick={() => {
                    setSelectedCategory('')
                    setSelectedService('')
                    setRatingValue([0, 10])
                  }}
                >
                  Limpiar Filtros
                </button>
              </div>
              <div className='mt-2'>
                <button
                  className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4 font-bold text-xs w-full flex self-center text-center justify-center'
                  onClick={() => { setModalNewSerie(true) }}
                >
                  Agregar serie
                </button>
              </div>
              <div className='flex flex-col relative'>
                <button
                  className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 absolute font-bold text-xs flex self-center text-center justify-center mt-6'
                  onClick={() => { setCompressed(true) }}
                >
                  <BiUpArrow className='text-sm' />
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col relative'>
              <button
              onClick={() => { setCompressed(false) }}
              className='bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 absolute font-bold text-xs flex self-center text-center justify-center mt-6' >
                <BiDownArrow className='text-sm' />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`flex flex-col w-8/12 mx-10 my-10 `}>
        {modalNewSerie &&
        (
          <div className='absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center w-screen h-screen'>
            <div className='bg-transparent p-4 shadow-lg rounded-md w-3/5'>
              <NewSerie openModal={modalNewSerie} setOpenModal={setModalNewSerie} addSeries={addSeries} />
            </div>
          </div>
        )}
        {modealSeries &&
        (
          <div className='absolute top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center w-screen h-screen'>
            <div className='bg-transparent w-4/5 sm:w-3/5 min-h-60 relative'>
              <SeriesModal openModal={modealSeries} setOpenModal={setModalSeries} serie={selectedSerie} />
            </div>
          </div>
        )
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filteredRecommendations.map((recommendation: any) => (
            <button key={recommendation.id}
            onClick={() => {
              setSelectedSerie(recommendation)
              setModalSeries(true)
            }}
            className='bg-white p-4 shadow-md rounded-md text-black flex flex-col hover:bg-slate-200'>
              <h2 className={`text-base font-bold bg-gray-200 rounded-md px-2 h-8 flex items-center ${recommendation.title.length > 12 ? 'text-xs' : ''}`}>
                {recommendation.title}
              </h2>
              <div className='flex flex-row mt-2 gap-3'>
                <span className='text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded-xl'>{recommendation.category}</span>
                <span className='text-xs text-gray-500 border border-gray-300 px-2 py-1 rounded-xl'>{recommendation.numberOfSeasons} Seasons</span>
              </div>
              <p className='text-xs h-24 mt-2 mb-2 overflow-hidden text-start'>{recommendation.description}</p>
              <div className='flex flex-row justify-between w-full self-center'>
                <div className='text-black rounded-md mt-4 flex flex-row justify-center items-center gap-2 font-semibold'>
                  <FaStar className='text-yellow-500 text-lg' />
                  {recommendation.rating}
                </div>
                <button className='text-blue-500  rounded-md mt-4 font-bold text-xs'>
                  {recommendation.user.name}
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu