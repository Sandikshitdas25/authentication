import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import bcrypt from "bcryptjs"
import User from "@/model/user"

export async function POST(request) {
    try {
        await dbConnect()
        const { name, email, password } = await request.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ name, email, password: hashedPassword })
        console.log("name: ", name)
        console.log("email: ", email)
        console.log("password: ", password)
        return NextResponse.json({ message: "user created successfully" }, { status: 200 })

    } catch (error) {
        console.log("error registering user")
        return NextResponse.json({ message: "error creating the user" }, { status: 500 })
    }
}