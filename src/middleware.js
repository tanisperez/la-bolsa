import { NextResponse } from 'next/server';

export const config = {
    matcher: [
        '/admin',
        '/api/admin/:path*'
    ]
};

export async function middleware(request) {
    const basicAuth = request.headers.get('authorization');
    if (basicAuth) {
        const [user, password] = getAuthentication(basicAuth);
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.error(error.message);
            throw error;
        })
        if (response.ok) {
            return NextResponse.next();
        }
    }
    
    const url = request.nextUrl;
    url.pathname = '/api/auth';
    return NextResponse.rewrite(url);
}

function getAuthentication(basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    return atob(authValue).split(':');
}