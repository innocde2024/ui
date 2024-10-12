import Layout from "../components/LayoutShop";

export const metadata = {
  title: {
    template: "shopping_mart",
    default: "Shopping Mart - A place for all!",
  },
};

const RootLayout = ({ children }) => <Layout>{children}</Layout>;
export default RootLayout;
