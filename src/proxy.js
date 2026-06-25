import { NextResponse } from "next/server";
import { getAllData } from "@/lib/data";
import {auth} from '@/lib/auth';
import { headers } from "next/headers";

export default async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userEmail = session?.user?.email;
    const { pathname } = request.nextUrl;
    const { users } = await getAllData()
    const currentUser = users?.find(u => u.email === session.user.email);
    const role = session.user.role;

    if (!session?.user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (userEmail) {
        if (currentUser?.isBlocked === true && pathname !== "/blocked") {
            return NextResponse.redirect(new URL("/blocked", request.url));
        }
    }

    if (session?.user) {

if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/illegalAccessPage", request.url));
}

if (pathname.startsWith("/dashboard/client")) {
    if (role === "admin") {
        return NextResponse.redirect(new URL("/adminAlert", request.url));
    }
    if (role !== "client" && role !== "") {
        return NextResponse.redirect(new URL("/illegalAccessPage", request.url));
    }
}

if (pathname.startsWith("/dashboard/freelancer")) {
    if (role === "admin") {
        return NextResponse.redirect(new URL("/adminAlert", request.url));
    }
    if (role !== "freelancer") {
        return NextResponse.redirect(new URL("/illegalAccessPage", request.url));
    }
}
    }

    // Payment route - Only Client allowed
    if (pathname.startsWith("/payment") && role !== "client") {
        return NextResponse.redirect(new URL("/illegalAccessPage", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/payment/:path*"],
};