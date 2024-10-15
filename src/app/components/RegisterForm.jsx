"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            setError("All fields are mandatory")
        }

        try {

            const resUserExists = await fetch("api/exists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();
            if(user){
                setError("user already exists")
                return
            }


            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            })

            if (res.ok) {
                const form = e.target;
                form.reset();
                router.refresh()
                router.push("/");

            } else {
                console.log("User registration failed.");
            }
        } catch (error) {
            console.log("error registering user")
        }
    }
    return (
        <div>
            <div className='grid place-items-center h-screen '>
                <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                    <div className='mb-3 font-medium'>Register  </div>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <div><input type='text' placeholder='Enter username' className='border-[2px] border-gray-600 p-2 rounded-lg' onChange={(e) => setName(e.target.value)} /></div>
                        <div><input type='text' placeholder='Enter email' className='border-[2px] border-gray-600 p-2 rounded-lg' onChange={(e) => setEmail(e.target.value)} /></div>
                        <div><input type='text' placeholder='Enter password' className='border-[2px] border-gray-600 p-2 rounded-lg ' onChange={(e) => setPassword(e.target.value)} /></div>
                        {error && <div className='bg-red-600 text-white rounded-md px-2 py-1 max-w-fit text-xs'>{error}</div>}
                        <div className='bg-green-500 px-5 py-2 rounded-lg font-semibold text-center'><button type='submit'>Register</button></div>
                    </form>

                    <Link href={"/"}><div className='text-sm mt-2 cursor-pointer'>Already have an account?<span className='underline'>Login</span></div></Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm
