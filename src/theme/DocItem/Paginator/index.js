import React from 'react';
import Paginator from '@theme-original/DocItem/Paginator';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function PaginatorWrapper(props) {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <Paginator {...props} />
      <br />
      <Giscus
        {...siteConfig.customFields.giscus}
      />
    </>
  );
}
