import { AboutDescription } from "@/components/About";
import { Skills } from "@/components/Skills";
import RecentWorks from "@/components/RecentWorks";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="about-page">
      <AboutDescription />

      {/* Skills Section */}
      <Skills />

      {/* Recent Works — last content section above Footer */}
      <RecentWorks />

      {/* Footer */}
      <Footer />
    </div>
  );
}
