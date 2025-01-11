import MainLayout from "@/components/mainLayout/page";
import { images } from "./images/images";


export const metadata = {
  title: "Next | Abdo Store Dashboard",  
    openGraph: {
      title: "Next | Abdo Store Dashboard",
      description: "Abdo store dashboard related to abdo store ecommerce website, to handle website statistics , products and customers",
      keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
      type: 'website',
      // image: './images/dashboard.png',      
      // twitterImage: './images/dashboard.png',      
      images: '@/app/images/dashboard.png',      
      twitterImages: '@/app/images/dashboard.png',      
      // images: images.dashboard,      
      // twitterImages: images.dashboard,      
      // image: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',      
      // twitterImage: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D',      
    }
  
};

export default function RootLayout({ children }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>  
  );
}
