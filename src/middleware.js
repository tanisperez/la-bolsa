import { NextResponse } from 'next/server';

export const config = {
    matcher: [
        '/admin',
        '/api/drinks',
        '/api/drinks/:path*'
    ]
};

export function middleware(request) {
    const basicAuth = request.headers.get('authorization');
    if (basicAuth) {
        const [user, password] = getAuthentication(basicAuth);
        if (user === 'admin' && password === 'admin') {
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