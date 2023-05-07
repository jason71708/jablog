import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import ArticleIcon from '../../assets/icon/article.svg';

export type LatestPostItemProps = {
  title: string;
  permalink: string;
};

const LatestPostItem = ({ title, permalink }: LatestPostItemProps) => {
  return (
    <div className={styles['latest-post-item-wrapper']}>
      <Link className={styles['latest-post-item']} to={permalink}>
        <i className={styles['latest-post-icon']}>
          <ArticleIcon />
        </i>
        <h3 className={styles['latest-post-title']}>
          {title}
        </h3>
      </Link>
    </div>
  );
};

export default LatestPostItem;