import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/app/lib/jwt";
import StudentsClient from "./components/StudentsClient";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  try {
    verifyToken(token as string);
  } catch (e) {
    redirect("/login");
  }

  return <StudentsClient />;
}
