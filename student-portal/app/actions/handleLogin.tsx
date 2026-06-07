'use server'

import createToken from "@/app/lib/jwt";

import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// type User = {
//     email: string;
//     password: string;
//     id: number;
//     name: string;
//     createdAt: Date;
// }

async function handleLogin(formData: FormData){
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "")

    const user = await prisma.user.findFirst({
        where : { email }
    })
    console.log(user);

    if(!user){
        throw new Error("User does not exist")
    }

    //create token
        const token = createToken(user);
        const isValid = await bcrypt.compare(password, user.password);

    if(isValid)
    {    const cookieStore = await cookies();
        cookieStore.set("token", token);

        redirect("/");
}
    // if(user){
    //     const cookieStore = await cookies();
    //     cookieStore.set("userId", user.id.toString());
    //     cookieStore.set("userEmail", user.email);
    //     cookieStore.set("userName", user.name);

    //     redirect("/");
    // }
} 

export default handleLogin;