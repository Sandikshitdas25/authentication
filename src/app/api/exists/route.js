import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/model/user";

export async function POST(request) {
    try {
        await dbConnect()
        const { email } = await request.json()
        const user = await User.findOne({ email }).select("_id")
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error)
    }
}