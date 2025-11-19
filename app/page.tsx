import Header from "@/components/common/Header";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/common/Footer";
import ChatWidget from "@/components/bot/chatWidget";
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer />
      <ChatWidget/>
    </>
  );
}
