import { jwtVerify } from "jose"
import { NextResponse } from "next/server"

export async function middleware(request){
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5la29tYXRhQGdtYWlsLmNvbSIsImV4cCI6MTc0NDc4MzYyOX0.ngcJdvYe7L9AhLRkwd7iXNMSvjbSWOhsO4FTzfVi66E"
    console.log(token)
    if(!token){
        return NextResponse.json({message: "トークンがありません"})
    }

    try{
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token,secretKey)
        return NextResponse.next()
    }catch{
        return NextResponse.json({message:"トークンが正しくないので、ログインしてください"})
    }
}

export const config = {
    matcher: ["/api/item/create","/api/item/update/:path*","/api/item/delete/:path*"],
}