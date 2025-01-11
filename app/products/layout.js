import { images } from "../images/images";
import MainLayout from "@/components/mainLayout/page";

export const metadata = {
  title: "Next | Abdo Store Dashboard - Products",
  openGraph: {
    title: "Next | Abdo Store Dashboard - Products",
    description: "Abdo store dashboard products page to handle website products with full crud operations",
    keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Products, Crud, Create, Read, Update, Delete, Shirts, Pants, Shoes, Women, Men, Twinz, Filter, Sort, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
    type: "website",
    image: images.products,
  }
};

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
