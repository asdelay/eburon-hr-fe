import { toast } from "sonner"

export const login = async (email: string) => {
    toast.success(`Confirmation link is sent to ${email} if this email is registered`)
    try {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email}),
        })
    } catch {
        toast.error('Something went wrong')
    }
}

export const register = async (email: string) => {
    try {
        toast.success(`Confirmation link is sent to ${email}`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        })
        if (!response.ok) {
            const data: {message: string, statusCode: number, error: string} = await response.json();
            throw new Error(data.message)
        }
    } catch (error){
        toast.error(error+'')
    }
}