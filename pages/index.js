import { Footer, Navbar } from "../components";
import Chatbox from "../components/Chatbox";
import { TimeLine } from "../components/TimeLine";
import { About, Explore, Feedback, GetStarted, Hero, World } from "../sections";

const Home = () => (
  <div className="bg-color overflow-hidden">
    <Chatbox />
    <Navbar />
    <Hero />
    <div className="relative">
      <About />
      <div className="gradient-03 z-0" />
      <Explore />
    </div>
    <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
    </div>
    <World />
    <TimeLine />
    <div className="relative">
      <Feedback />
    </div>
    <Footer />
  </div>
);

export default Home;
