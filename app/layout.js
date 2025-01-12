import MainLayout from "@/components/mainLayout/page";
import { images } from "./images/images";


export const metadata = {
  title: "Next | Abdo Store Dashboard",  
    openGraph: {
      title: "Next | Abdo Store Dashboard",
      description: "Abdo store dashboard related to abdo store ecommerce website, to handle website statistics , products and customers",
      keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
      type: 'website',
      images: 'https://drive.google.com/file/d/10HSU0m0iOkZM0e39GaI0NzbAn_qr2ZHQ/view?usp=sharing',
      twitterImages: 'https://drive.google.com/file/d/10HSU0m0iOkZM0e39GaI0NzbAn_qr2ZHQ/view?usp=sharing',
    }
  
};

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>  
  );
}
