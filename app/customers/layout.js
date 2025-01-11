import { images } from "../images/images";
import MainLayout from "@/components/mainLayout/page";


export const metadata = {
  title: "Next | Abdo Store Dashboard - Customers",
  openGraph: {
    title: "Next | Abdo Store Dashboard - Customers",
    description: "Abdo store dashboard customers page to view all website loged customers",
    keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Customers, loged in, Authentication, Read, Shirts, Pants, Shoes, Women, Men, Twinz, Filter, Sort, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
    type: 'website',
    image: images.customers
  }
};

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>    
  );
}
