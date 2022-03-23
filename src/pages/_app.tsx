import '../../styles/globals.css'
import type { AppProps } from 'next/app'
import { AmplifyProvider, View, Card } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure({...awsconfig, ssr: true});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <AmplifyProvider>
          <View as="main">
              <Card>
                <Component {...pageProps} />
              </Card>
          </View>
      </AmplifyProvider>
  );
}
export default MyApp;
