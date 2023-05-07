import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import LatestPostItem, { LatestPostItemProps } from '../LatestPostItem';

const recentPostsData = require("../../../.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json") as any;
const recentPosts = recentPostsData.items.slice(0, 5) as LatestPostItemProps[];

const LatestPostsSection = () => {
  return (
    <div className={styles['latest-posts-section']}>
      <h1 className={styles['latest-posts-title']}>Latest Posts</h1>
      {recentPosts.map(post => (
        <LatestPostItem {...post} />
      ))}
      <div className={styles['latest-posts-more-link']}>
        <Link to="/blog">{'->'} Blog</Link>
      </div>
    </div>
  );
};

export default LatestPostsSection;