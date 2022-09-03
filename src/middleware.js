import { NextResponse } from 'next/server';

const REQUIRED_AUTH_PATHS = [
    '/admin',
    '/api/drinks'
];

export function middleware(request) {
    const url = request.nextUrl;

    if (isAuthRequired(url.pathname)) {
        const basicAuth = request.headers.get('authorization');
        if (basicAuth) {
            const [user, password] = getAuthentication(basicAuth);
            if (user === 'admin' && password === 'admin') {
                return NextResponse.next();
            }
        }
        url.pathname = '/api/auth';
        return NextResponse.rewrite(url);
    }
    return NextResponse.next();
}

function getAuthentication(basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    return atob(authValue).split(':');
}

function isAuthRequired(path) {
    const lowerCasePath = path.toLowerCase();
    for (let requiredAuth of REQUIRED_AUTH_PATHS) {
        if (lowerCasePath.startsWith(requiredAuth)) {
            return true;
        }
    }
    return false;
}