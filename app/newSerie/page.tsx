import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { CgClose } from 'react-icons/cg'


const NewSerie = ({ openModal, setOpenModal, addSeries }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const session: any = useSession()
  const user = session.data?.user
  const onSubmit = handleSubmit(async (data) => {
    data.numberOfSeasons = parseInt(data.numberOfSeasons)
    data.rating = parseInt(data.rating)
    data.userId = user.id
    const res = await fetch('/api/recommendations', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const newSerie = await res.json()
    newSerie.user = user
    if (res.ok) {
      addSeries(newSerie)
      // console.log(newSerie)
      setOpenModal(false)
    }
  })

  return (
    openModal &&
    (<div className='relative'>
      <CgClose className='absolute top-2 right-2 cursor-pointer text-black text-xl' onClick={() => setOpenModal(false)} />
      <form action="" onSubmit={onSubmit} className='flex flex-col w-9/12  md:w-full mx-auto mb-32 shadow-2xl p-4 rounded bg-white justify-evenly'>
        <h1 className='text-2xl font-bold text-sky-700'>Nueva serie</h1>
        <label htmlFor="title" className='mt-5 text-blue-600 mb-1 text-sm'>Nombre</label>
        <input type="text" placeholder="Nombre"
          {...register('title',
            { required: 'Nombre es requerido' })}
          className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700' />
        {errors.title && <span className='text-red-500 text-sm'>{errors.title.message?.toString()}</span>}

        <label htmlFor="description" className='mt-5 text-blue-600 mb-1 text-sm'>Descripción</label>
        <input type="text" placeholder="Descripción"
          {...register('description',
            { required: 'Descripción es requerida' })}
          className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700' />
        {errors.description && <span className='text-red-500 text-sm'>{errors.description.message?.toString()}</span>}

        <label htmlFor="category" className='mt-5 text-blue-600 mb-1 text-sm'>Categoría</label>
        <select {...register('category', { required: 'Categoría es requerida' })} className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700'>
          <option value="Comedia">Comedia</option>
          <option value="Drama">Drama</option>
          <option value="Terror">Terror</option>
          <option value="Aventuras">Aventuras</option>
          <option value="Fantasía">Fantasía</option>
        </select>

        <label htmlFor="service" className='mt-5 text-blue-600 mb-1 text-sm'>Servicio</label>
        <select {...register('service', { required: 'Servicio es requerido' })} className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700'>
          <option value="Netflix">Netflix</option>
          <option value="Amazon Prime">Amazon Prime</option>
          <option value="Disney Plus">Disney Plus</option>
          <option value="HBO">HBO</option>
          <option value="Apple TV">Apple TV</option>
        </select>

        <label htmlFor="rating" className='mt-5 text-blue-600 mb-1 text-sm'>Rating</label>
        <input type="number" placeholder="Rating"
          {...register('rating',
          { required: 'Rating es requerido', min: { value: 0, message: 'Rating debe ser mayor o igual a 0' }, max: { value: 10, message: 'Rating debe ser menor o igual a 10' } })}
          className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700' />

        <label htmlFor="numberOfSeasons" className='mt-5 text-blue-600 mb-1 text-sm'>Number of Seasons</label>
        <input type="number" placeholder="Number of Seasons"
          {...register('numberOfSeasons',
          { required: 'Seasons es requerido', min: { value: 1, message: 'Seasons debe ser mayor o igual a 1' } })}
          className='bg-whitep-2 rounded-md h-10 p-2 border border-slate-200 text-gray-700' />


        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-8' >
          Crear
        </button>
      </form>
    </div>)
  )
}

export default NewSerie