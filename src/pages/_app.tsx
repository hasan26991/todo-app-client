import "@/styles/globals.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Layout from "@/components/layout";
import Error from "next/error";
import { Provider } from "react-redux";
import { store } from "../services/store";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context);

  return { ...ctx };
};
