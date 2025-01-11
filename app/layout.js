import MainLayout from "@/components/mainLayout/page";
import { images } from "./images/images";


export const metadata = {
  title: "Next | Abdo Store Dashboard",  
    openGraph: {
      title: "Next | Abdo Store Dashboard",
      description: "Abdo store dashboard related to abdo store ecommerce website, to handle website statistics , products and customers",
      keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
      type: 'website',
      image: images.dashboard,
    }
  
};

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>  
  );
}
