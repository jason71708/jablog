import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import Giscus from '@giscus/react';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <Giscus
        id="comments"
        repo="jason71708/jablog"
        repoId="R_kgDOHuA6TA"
        category="Announcements"
        categoryId="DIC_kwDOHuA6TM4CQcHo"
        mapping="title"
        // term="Welcome to @giscus/react component!"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="en"
        loading="lazy"
        crossOrigin="anonymous"
      />
    </>
  );
}
