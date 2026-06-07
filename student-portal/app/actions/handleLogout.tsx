'use server'

import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default async function handleLogout(){
    const cookieStore = await cookies();
    // const token = await cookieStore.get("token");
    cookieStore.delete("token");

    redirect("/login");
}