import React from 'react';
import styles from './styles.module.css';
import DocTopicItem, { DocTopicItemProps } from '../DocTopicItem';
import algorithmAnimation from '../../assets/lottie/algorithm.json';
import dataStructureAnimation from '../../assets/lottie/data-structure.json';
import threejsAnimation from '../../assets/lottie/threejs.json';

const docTopics: DocTopicItemProps[] = [
  {
    title: 'Algorithms',
    description: 'The step-by-step process of solving a specific problem using a series of instructions or rules. It typically covers the basic concepts of algorithm design.',
    lottieAnimation: algorithmAnimation,
    to: '/docs/algorithms/bigO-notation'
  },
  {
    title: 'Data Structures',
    description: 'This topic covers the fundamental concepts and implementation of data structures, which are used to organize and store data in a computer program, and explore how they can be used to solve different problems efficiently.',
    lottieAnimation: dataStructureAnimation,
    to: '/docs/data-structures/singly-linked-list/'
  },
  {
    title: 'Three.js',
    description: 'This series of notes is a record of some key points after reading official documents. Three.js, which are used to build 3D content in webpage.',
    lottieAnimation: threejsAnimation,
    to: '/docs/threejs/begin/'
  },
];

const DocTopicSection = () => {
  return (
    <div className={styles['doc-topic-section']}>
      <h1 className={styles['doc-topic-title']}>Topics</h1>
      <div className={styles['doc-topic-list']}>
        {docTopics.map(topic => (
          <DocTopicItem {...topic} />
        ))}
      </div>
    </div>
  );
};

export default DocTopicSection;