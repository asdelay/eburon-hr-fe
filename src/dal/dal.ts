import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react'
import { redirect } from 'next/navigation';
import { Candidate } from '@/types/candidate';

const parseToken = (setCookieHeader: string | null, name: string): string | null => {
    if (!setCookieHeader) return null;
    const match = setCookieHeader.match(new RegExp(`${name}=([^;]+)`));
    return match?.[1] ?? null;
};

const refreshSession = async (cookieHeader: string) => {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });

    if (!refreshResponse.ok) return null;

    const setCookieHeader = refreshResponse.headers.get("set-cookie");
    const accessToken = parseToken(setCookieHeader, "access_token");
    const refreshToken = parseToken(setCookieHeader, "refresh_token");

    if (!accessToken || !refreshToken) return null;

    const cookieStore = await cookies();
    cookieStore.set("access_token", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
    });
    cookieStore.set("refresh_token", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
    });

    return `access_token=${accessToken}; refresh_token=${refreshToken}`;
};

export const verifyUser = async () => {
    const cookieStore = await cookies();
    let cookieHeader = cookieStore.toString();

    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });

    if (res.status === 401) {
        const refreshedCookieHeader = await refreshSession(cookieHeader);
        if (!refreshedCookieHeader) {
            redirect('/candidate/auth/login');
        }

        cookieHeader = refreshedCookieHeader;
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
            headers: { Cookie: cookieHeader },
            cache: "no-store",
        });
    }

    if (!res.ok) {
        redirect('/candidate/auth/login');
    }

    const userData = await res.json();
    return {userData, cookieHeader};
}

export const getCandidate = cache(async() => {
    const {userData, cookieHeader} = await verifyUser();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${userData.userId}`, {
            headers: {
                Cookie: cookieHeader,
            },
            cache: "no-store",
        });

        if(!res.ok) redirect('/')

        const userProfile: Candidate = await res.json()
        return userProfile;  
    } catch (error) {
        console.log(error)
        return null
    }
})