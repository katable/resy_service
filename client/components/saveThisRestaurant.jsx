import React from 'react';
import styles from '../styles/styles.css';
import svg from '../styles/svg';

const SaveThisRestaurant = () => (
  <div id={styles.saveRestaurantOuterContainer}>
    <button id={styles.saveRestaurantButton}>
      <div id={styles.saveRestaurantInnerContainer}>
        {svg.bookmark}
        <div className={styles.saveRestaurantText}>Save this restaurant</div>
      </div>
    </button>
  </div>
);

export default SaveThisRestaurant;
