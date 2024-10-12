/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
// pages/_app.js
import Layout from "../components/Layout";
import "../styles/globals.css";
import ReactQueryProvider from "../utils/ReactQueryProvider";
import { AuthProvider } from "../context/authContext";
import { CartProvider } from "react-use-cart";
// import { chatCompletion } from "../utils/openAi";
const MyApp = ({ Component, pageProps }) => (
  <ReactQueryProvider>
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthProvider>
  </ReactQueryProvider>
);

export default MyApp;
