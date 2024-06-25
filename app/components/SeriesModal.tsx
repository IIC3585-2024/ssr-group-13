import { CgClose } from 'react-icons/cg'
import { SiTarget } from 'react-icons/si'

export const SeriesModal = ({openModal, setOpenModal, serie}: any) => {

  return(
    openModal &&
    (<div className='absolute bg-slate-700 rounded-lg shadow-lg w-full sm:h-full'>
      <CgClose className='absolute top-2 right-2 cursor-pointer text-slate-200 text-xl' onClick={() => setOpenModal(false)} />
      <div className='flex flex-col mx-6 justify-between h-full'>
        {/* <h1 className='text-2xl font-bold text-sky-700'>Serie</h1> */}
        <h2 className='text-2xl font-bold text-slate-300 mt-3'>{serie.title}</h2>
        <p className='text-slate-300'>{serie.description}</p>
        <div className='flex flex-col gap-2 justify-evenly my-3 sm:flex-row'>
          <p className='text-gray-700 rounded-md bg-red-400 p-1 font-semibold'>
            {serie.category}
          </p>
          <p className='text-gray-700 rounded-md bg-lime-600 p-1 font-semibold'>
            {serie.service}
          </p>
          <p className='text-gray-700 rounded-md bg-blue-400 p-1 font-semibold'>
            {serie.rating} stars
          </p>
          <p className='text-gray-700 rounded-md bg-yellow-400 p-1 font-semibold'>
            {serie.numberOfSeasons} seasons
          </p>
        </div>
      </div>
    </div>)
  )
}