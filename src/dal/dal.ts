import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react'
import { redirect } from 'next/navigation';
import { Candidate } from '@/types/candidate';

export const verifyUser = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });

    if (res.status === 401) {
        redirect('/candidate/auth/refresh?returnTo=/candidate/profile');
    }

    const userData = await res.json();
    console.log('user data is ',userData)
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