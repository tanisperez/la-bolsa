export default function handler(req, res) {
    res.setHeader('WWW-authenticate', 'Basic realm="Zona de administración"');
    res.statusCode = 401;
    res.end('Autenticación necesaria');
}