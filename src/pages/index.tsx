import React from 'react'
import {Redirect} from '@docusaurus/router'
import Layout from '@theme/Layout';

export default () => {
  // return (
  //   <Layout>
  //     <div>
  //       <h1>Hi</h1>
  //     </div>
  //   </Layout>
  // )
  return <Redirect to="/docs/react-native/setup" />
}
