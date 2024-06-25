"use client"
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

function RegisterPage() {
  const { register, handleSubmit, formState: {errors}, getValues } = useForm()
  const router = useRouter()
  const onSubmit = handleSubmit ( async (data) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const json = await res.json()

    if (res.ok) {
      router.push('/auth/login')
    }
  })

  return (
    <div className='flex justify-center items-center h-screen'>
      <form action="" onSubmit={onSubmit} className='flex flex-col w-10/12 sm:w-4/12 mx-auto mb-32 shadow-2xl p-4 rounded bg-white justify-evenly'>
        <h1 className='text-2xl font-bold text-sky-700'>Registro de usuario</h1>

        <input type="text" placeholder="Name"
        {...register('name',
        {required: 'Username is required', minLength: {value: 5, message: 'Name must be at least 5 characters'}})}
        className='mt-8 bg-white p-2 rounded-md h-8 border border-slate-200 text-gray-700' />
        {errors.name && <span className='text-red-500 text-sm'>{errors.name.message?.toString()}</span>}

        <input type="email" placeholder="Email"
        {...register('email',
        {required: 'Email is required', pattern: {value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: 'Invalid email'}})}
        className='mt-8 bg-whitep-2 rounded-md h-8 p-2 border border-slate-200 text-gray-700' />
        {errors.email && <span className='text-red-500 text-sm'>{errors.email.message?.toString()}</span>}

        <input type="password" placeholder="Password"
        {...register('password',
        {required: 'Password is required', minLength: {value: 8, message: 'Password must be at least 8 characters'}})}
        className='mt-8 bg-white p-2 rounded-md h-8 border border-slate-200 text-gray-700' />
        {errors.password && <span className='text-red-500 text-sm'>{errors.password.message?.toString()}</span>}

        <input type="password" placeholder="Confirm Password"
        {...register('confirmPassword',
        {required: 'Password confirmation is required', validate: value => value === getValues('password') || 'The passwords do not match'})}
        className='mt-8 bg-whitep-2 rounded-md h-8 p-2 border border-slate-200 text-gray-700' />
        {errors.confirmPassword && <span className='text-red-500 text-sm'>{errors.confirmPassword.message?.toString()}</span>}
        <button type="button"
        onClick={() => router.push('/auth/login')}
        className='text-blue-500 rounded-md  mt-4' >
          Iniciar Sesión
        </button>
        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4' >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage
