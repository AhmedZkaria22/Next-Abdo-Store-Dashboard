import localFont from "next/font/local";
import DashNavbar from "@/components/navbar/page";
import Sidebar from "@/components/sidebar/page";
import { Col, Container, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../app/globals.css";
import "../../app/general.css";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "Next | Abdo Store Dashboard",  
//     openGraph: {
//       title: "Next | Abdo Store Dashboard",
//       description: "Abdo store dashboard related to abdo store ecommerce website, to handle website statistics , products and customers",
//       keywords: "Abdo store dashboard, Abdo store ecommerce, Abdo store website, Dashboard, Website, Ecommerce, Abdo store, Nextjs, Reactjs, Tailwind, Tailwindcss, React-bootstrap",
//       type: 'website',
//       image: images.dashboard,
//     }
  
// };

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>        
        <DashNavbar />
        <Container className="p-0 m-0 !w-full !max-w-full">
          <Row>
            <Col sm={0} md={3} lg={'auto'} className="layoutSidebarCol hidden md:!flex">
            <Sidebar />
            </Col>
            <Col xs={12} md={9} lg={'auto'} className="layoutContentCol">
            {children}
            </Col>
          </Row>
        </Container>
      </body>
    </html>
  );
}
