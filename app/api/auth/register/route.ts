import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        await connectDB();
        const {name , email, password} = await req.json();

        if(!name || !email || !password){
            return NextResponse.json(
                {message : "All fileds are required!"},
                {status: 400}
            );
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {message: "Email is allready Exist"},
                {status : 409}
            );
        }

        const user =  await User.create({
            name,
            email,
            password
        });

        return NextResponse.json(
            {message: "User Registered Successfully"},
            {status: 201}
        );

    }catch (error) {
        return NextResponse.json(
            {message : "Registration Failed"},
            {status: 500}
        );
    }
}