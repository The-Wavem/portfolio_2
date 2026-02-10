import { Box } from '@mui/material';

// Importando as seções (Note o caminho ../../section/landing)
import Hero from '../../section/landing/Hero';
// import StackTicker from '../../section/landing/StackTicker';
// import Services from '../../section/landing/Services';
// import Process from '../../section/landing/Process';
// import Portfolio from '../../section/landing/Portfolio';
// import Contact from '../../section/landing/Contact';

export default function Home() {
    return (
        <Box component="main">
            {/* 1. Dobra Principal */}
            <Hero />

            {/* <StackTicker />

            <Services />

            <Process />

            <Portfolio />

            <Contact /> */}
        </Box>
    );
}