import React from 'react';
import styles from '../styles/FooterComponent.module.css';

const FooterComponent = () => {
    return (
        <footer className={styles.footer}>
            <p>Connect with me on:</p>
            <a
                href="https://github.com/pulkitshringi"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                GitHub
            </a>
            <a
                href="https://www.linkedin.com/in/pulkitshringi/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
            >
                LinkedIn
            </a>
        </footer>
    );
};

export default FooterComponent;