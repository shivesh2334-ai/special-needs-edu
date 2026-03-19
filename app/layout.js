import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "IncluLearn – Special Needs Education Support for CBSE",
  description:
    "A resource repository for parents of children with special needs (dyslexia, dyscalculia, ADHD, autism) studying under the CBSE board. Browse curated resources and get AI-powered personalised suggestions.",
  keywords: "special needs, CBSE, dyslexia, dyscalculia, ADHD, autism, education, India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
