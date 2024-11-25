import EmageProLogo from '../../assets/EmageProLogo.png';
import styles from './Home.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  return (
    <div className={`${styles.container} ${isVisible ? styles.fadeIn : ''}`}>
      <div className={`${styles.tagline} ${isVisible ? styles.slideIn : ''}`}>
        <h3 className={styles.intro}>Manage your Business like</h3>
        <h1 className={styles.tag}>Never Before</h1>
        <Button
          className={styles.button}
          onClick={() => navigate(`/signup`)}
        >
          Sign Up
        </Button>
      </div>
      <img
        alt="Emage Pro Logo"
        src={EmageProLogo}
        className={`${styles.logo} ${isVisible ? styles.zoomIn : ''}`}
      />
    </div>
  );
};

export default Home;
