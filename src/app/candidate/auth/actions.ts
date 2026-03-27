"use server"
export const login = async (formData: FormData)  => {
    const email = formData.get('email');
    if(!email) return {message: 'Include Email'};

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    })

    if(!res.ok) {
        return {success: false, message: 'Authentication Error'}
    }
    return {success: true, message: 'Email was sent to your mail box'}
    } catch (error) {
        console.log(error)
        return {success:false, message: 'Something went wrong'}
    }
}