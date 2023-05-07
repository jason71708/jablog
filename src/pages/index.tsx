import React from 'react';
import Layout from '@theme/Layout';
import HeroSection from '../components/HeroSection';
import LatestPostsSection from '../components/LatestPostsSection';
import DocTopicSection from '../components/DocTopicSection';

export default () => {

  return (
    <Layout>
      <HeroSection />
      <LatestPostsSection />
      <DocTopicSection />
    </Layout>
  );
};
