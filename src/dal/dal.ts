import 'server-only'
import { cookies } from 'next/headers';
import { cache } from 'react'
import { redirect } from 'next/navigation';
import { Candidate } from '@/types/candidate';

const shouldLogPerf = process.env.NODE_ENV !== 'production';

const logPerf = (label: string, start: number) => {
    if (!shouldLogPerf) return;
    const elapsedMs = Math.round(performance.now() - start);
    console.log(`[perf] ${label}: ${elapsedMs}ms`);
};

const parseToken = (setCookieHeader: string | null, name: string): string | null => {
    if (!setCookieHeader) return null;
    const match = setCookieHeader.match(new RegExp(`${name}=([^;]+)`));
    return match?.[1] ?? null;
};

const refreshSession = async (cookieHeader: string) => {
    const refreshStartedAt = performance.now();
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });
    logPerf('auth.refresh', refreshStartedAt);

    if (!refreshResponse.ok) return null;

    const setCookieHeader = refreshResponse.headers.get("set-cookie");
    const accessToken = parseToken(setCookieHeader, "access_token");
    const refreshToken = parseToken(setCookieHeader, "refresh_token");

    if (!accessToken || !refreshToken) return null;

    return `access_token=${accessToken}; refresh_token=${refreshToken}`;
};

const resolveVerifiedUser = cache(async () => {
    const verifyStartedAt = performance.now();
    const cookieStore = await cookies();
    let cookieHeader = cookieStore.toString();

    const authMeStartedAt = performance.now();
    let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
    });
    logPerf('auth.me.initial', authMeStartedAt);

    if (res.status === 401) {
        const refreshedCookieHeader = await refreshSession(cookieHeader);
        if (!refreshedCookieHeader) {
            logPerf('auth.verify.total', verifyStartedAt);
            redirect('/candidate/auth/login');
        }

        cookieHeader = refreshedCookieHeader;
        const authMeRetryStartedAt = performance.now();
        res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
            headers: { Cookie: cookieHeader },
            cache: "no-store",
        });
        logPerf('auth.me.retry', authMeRetryStartedAt);
    }

    if (!res.ok) {
        logPerf('auth.verify.total', verifyStartedAt);
        redirect('/candidate/auth/login');
    }

    const userData = await res.json();
    logPerf('auth.verify.total', verifyStartedAt);
    return {userData, cookieHeader};
});

export const verifyUser = async () => resolveVerifiedUser();

export const getCandidate = cache(async() => {
    const candidateDalStartedAt = performance.now();
    const {userData, cookieHeader} = await verifyUser();

    try {
        const candidateFetchStartedAt = performance.now();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/candidates/${userData.userId}`, {
            headers: {
                Cookie: cookieHeader,
            },
            next: {
                revalidate: 60,
                tags: [`candidate:${userData.userId}`, 'candidate-profile'],
            },
        });
        logPerf('candidate.fetch', candidateFetchStartedAt);

        if(!res.ok) redirect('/')

        const userProfile: Candidate = await res.json()
        logPerf('candidate.dal.total', candidateDalStartedAt);
        return userProfile;  
    } catch (error) {
        console.log(error)
        logPerf('candidate.dal.total', candidateDalStartedAt);
        return null
    }
})