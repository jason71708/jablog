import React from 'react';
import Lottie from "lottie-react";
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export type DocTopicItemProps = {
  title: string;
  description: string;
  lottieAnimation: any;
  to: string;
};

const DocTopicItem = ({ title, description, lottieAnimation, to }: DocTopicItemProps) => {
  return (
    <div className={styles['doc-topic-item']}>
      <div className={styles['doc-topic-item-img']}>
        <Lottie animationData={lottieAnimation} loop={true} />
      </div>
      <Link to={to}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default DocTopicItem;