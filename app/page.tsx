import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { getRepos } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const repos = await getRepos("mominshaikhdev");
  return (
    <>
      <Hero />
      <About repoCount={repos.length} />
      <Skills />
      <Projects repos={repos} />
      <Experience />
      <Contact />
    </>
  );
}
