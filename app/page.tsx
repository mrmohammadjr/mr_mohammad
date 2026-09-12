import About from "./components/sections/About";
import ServicesTwo from "./components/sections/ServicesTwo";
import Projects from "./components/sections/Projects";
import Blog from "./components/sections/Blog";
import Contact from "./components/sections/Contact";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { getBlogs } from "@/lib/blog/getBlogs";

export default async function Home() {
    const data = await getBlogs()
    console.log(data)
    return (
    <div>
      <Header />
      <main>
        <About />
        <ServicesTwo />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
