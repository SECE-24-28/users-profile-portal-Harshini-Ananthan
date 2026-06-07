'use server'

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

async function handleSignup(formData: FormData){
    const name = String(formData.get("name")) ?? "";
    const email = String(formData.get("email")) ?? "";
    const password = String(formData.get("password")) ?? "";

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);


    await prisma.user.create({
        data : {
            name, email, password: hashedPassword
        }
    })

    redirect("/login");
}

export default handleSignup;