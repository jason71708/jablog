import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Giscus from '@giscus/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FooterWrapper(props) {
  const {siteConfig} = useDocusaurusContext();

  return (
    <>
      <Footer {...props} />
      <Giscus
        {...siteConfig.customFields.giscus}
      />
    </>
  );
}
