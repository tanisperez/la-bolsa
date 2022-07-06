import Container from 'react-bootstrap/Container';

import Market from '@components/market/Market';

const LaBolsa = () => {
    return (
        <Container>            
            <img src="la-bolsa.png" alt="La Bolsa logo" width="600" height="300"/>
            <Market/>
        </Container>
    );
}

export default LaBolsa