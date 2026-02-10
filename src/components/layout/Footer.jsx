import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <p>&copy; {new Date().getFullYear()} The Wavem. All rights reserved.</p>
                <nav>
                    <ul style={styles.navList}>
                        <li style={styles.navItem}><a href="/about" style={styles.link}>About</a></li>
                        <li style={styles.navItem}><a href="/contact" style={styles.link}>Contact</a></li>
                        <li style={styles.navItem}><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px 0',
        marginTop: 'auto',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        gap: '15px',
        marginTop: '10px',
    },
    navItem: {
        margin: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '0.9rem',
    }
};

export default Footer;