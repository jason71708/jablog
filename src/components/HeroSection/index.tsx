import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { throttle } from '@site/src/utils';

const HeroSection = () => {
  const { siteConfig } = useDocusaurusContext();
  const windowWidth = React.useRef(0);
  const sectionEl = React.useRef<HTMLDivElement>(null);
  const [[offsetFast, offsetSlow], setOffsetFastAndSlow] = React.useState([0, 0]);
  const heroTexts = siteConfig.themeConfig.heroTexts as string[];

  React.useEffect(() => {
    windowWidth.current = window.innerWidth;

    const handleMouseMove = throttle((e: MouseEvent) => {
      let normalizedPosition = e.pageX / (windowWidth.current / 2) - 1;
      let offsetFast = 100 * normalizedPosition;
      let offsetSlow = 200 * normalizedPosition;
      setOffsetFastAndSlow([offsetSlow, offsetFast]);
    }, 100);
    const handleWindowResize = () => {
      windowWidth.current = window.innerWidth;
    };
    sectionEl.current?.addEventListener('mousemove', handleMouseMove);
    sectionEl.current?.addEventListener('resize', handleWindowResize);

    return () => {
      sectionEl.current?.removeEventListener('mousemove', handleMouseMove);
      sectionEl.current?.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (<section ref={sectionEl} className={styles['hero-section']}>
    <div className={styles.wrap}>
      {heroTexts.map(t => (
        <div key={t} className={styles.line}>
          <div className={styles.left}>
            <div className={styles.content}>
              <span className={styles.text} style={{ transform: `translate(${t.length > 3 ? offsetSlow : offsetFast}px)` }}>{t}</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.content}>
              <span className={styles.text} style={{ transform: `translate(${t.length > 3 ? offsetSlow : offsetFast}px)` }}>{t}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>);
};

export default HeroSection;