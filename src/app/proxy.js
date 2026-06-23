import { NextResponse } from "next/server";
import { getAllData } from "@/lib/data";
import {auth} from '@/lib/auth';
import { headers } from "next/headers";

export async function middleware(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userEmail = session?.user?.email;
    const { pathname } = request.nextUrl;

    if (userEmail) {
        const { users } = await getAllData();
        const currentUser = users?.find(u => u.email === userEmail);
        console.log(userEmail, pathname, currentUser?.isBlocked);
        if (currentUser?.isBlocked && pathname !== "/blocked") {
            return NextResponse.redirect(new URL("/blocked", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/post-task", "/payment/:path*", "/browse-tasks", "/freelancers"],
};