import React from 'react';
import styles from '../styles/RegisterReserved.module.css';
import FormSection from './FormSection';
import ImageSection from './ImageSection';
import { Link } from 'react-router-dom';

function RegisterReserved() {
  return (
    <div className={styles.container}>
      <ImageSection />
      <FormSection />
    </div>
  );
} 

export default RegisterReserved;

