import AboutMe from './_components/AboutMe';
import Banner from './_components/Banner';
import Certifications from './_components/Certifications';
import Education from './_components/Education';
import MyProjects from './_components/MyProjects';
import Skills from './_components/Skills';

export default function Home() {
    return (
        <div className="page-">
            <Banner />
            <AboutMe />
            <Skills />
            <Education />
            <Certifications />
            <MyProjects />
        </div>
    );
}
