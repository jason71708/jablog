import React from 'react';
import BlogPostPaginator from '@theme-original/BlogPostPaginator';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function BlogPostPaginatorWrapper(props) {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <BlogPostPaginator {...props} />
      <br />
      <Giscus
        {...siteConfig.customFields.giscus}
      />
    </>
  );
}
