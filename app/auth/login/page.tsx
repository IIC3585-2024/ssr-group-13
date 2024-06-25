"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

function Login(){
  const { register, handleSubmit, formState: {errors} } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit ( async (data) => {
    const res: any = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res.ok) {
      console.log('Login success')
      router.push('/menu')
    }
    else {
      console.log(res.error)
    }
  })

  return (
    <div className='flex justify-center items-center h-screen'>
      <form action="" onSubmit={onSubmit} className='flex flex-col w-9/12  md:w-4/12 mx-auto mb-32 shadow-2xl p-4 rounded bg-white justify-evenly'>
        <h1 className='text-2xl font-bold text-sky-700'>Inicio de sesión</h1>

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
        <button type="button"
        onClick={() => router.push('/auth/register')}
        className='text-blue-500 rounded-md  mt-4' >
          Registrarse
        </button>
        <button type="submit" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-4' >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;