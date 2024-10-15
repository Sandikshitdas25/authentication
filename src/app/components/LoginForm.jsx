"use client"
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className='grid place-items-center h-screen '>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <div className='mb-3 font-medium'>Login</div>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5'>
          <div><input type='text' placeholder='Enter email' className='border-[2px] border-gray-600 p-2 rounded-lg' onChange={(e) => setEmail(e.target.value)} /></div>
          <div><input type='text' placeholder='Enter password' className='border-[2px] border-gray-600 p-2 rounded-lg ' onChange={(e) => setPassword(e.target.value)} /></div>
          {error && <div className='bg-red-600 text-white rounded-md px-2 py-1 max-w-fit text-xs'>{error}</div>}
          <div className='bg-green-500 px-5 py-2 rounded-lg font-semibold'><button type='submit'>Login</button></div>
        </form>
        <Link href={"/register"}><div className='text-sm mt-2 cursor-pointer'>Don't have an account?<span className='underline'>Register</span></div></Link>
      </div>
    </div>
  )
}

export default LoginForm
