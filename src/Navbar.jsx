import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects"];
      const scrollPos = window.scrollY + 120;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
          }
        }
      });

      setScrolled(window.scrollY > 40);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="scroll-progress" style={{ width: scrollProgress + "%" }}></div>
      <div className="logo">Sumit</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a
          href="#home"
          className={activeSection === "home" ? "active" : ""}
          onClick={(e)=>{e.preventDefault();document.getElementById("home").scrollIntoView({behavior:"smooth"});setMenuOpen(false);}}
        >
          Home
        </a>
        <a
          href="#about"
          className={activeSection === "about" ? "active" : ""}
          onClick={(e)=>{e.preventDefault();document.getElementById("about").scrollIntoView({behavior:"smooth"});setMenuOpen(false);}}
        >
          About
        </a>
        <a
          href="#skills"
          className={activeSection === "skills" ? "active" : ""}
          onClick={(e)=>{e.preventDefault();document.getElementById("skills").scrollIntoView({behavior:"smooth"});setMenuOpen(false);}}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={activeSection === "projects" ? "active" : ""}
          onClick={(e)=>{e.preventDefault();document.getElementById("projects").scrollIntoView({behavior:"smooth"});setMenuOpen(false);}}
        >
          Projects
        </a>
      </div>

      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <style>{`
        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:16px 50px;
          background:rgba(15,23,42,0.75);
          backdrop-filter:blur(10px);
          color:white;
          position:sticky;
          top:0;
          z-index:1000;
          border-bottom:1px solid rgba(255,255,255,0.08);
          transition:all 0.35s ease;
        }
        .scroll-progress{
          position:absolute;
          bottom:0;
          left:0;
          height:3px;
          background:linear-gradient(90deg,#00adb5,#7f5af0);
          transition:width 0.15s ease;
          z-index:1001;
        }

        .navbar.scrolled{
          background:rgba(2,6,23,0.95);
          box-shadow:0 8px 25px rgba(0,0,0,0.4);
        }

        .logo{
          font-size:22px;
          font-weight:700;
          letter-spacing:1px;
          background:linear-gradient(90deg,#00adb5,#7f5af0);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }

        .nav-links a{
          margin-left:28px;
          text-decoration:none;
          color:white;
          font-size:15px;
          position:relative;
          transition:0.3s;
          padding-bottom:4px;
        }

        .nav-links a:hover{
          color:#00adb5;
        }

        .nav-links a::after{
          content:"";
          position:absolute;
          left:0;
          bottom:-6px;
          width:0%;
          height:2px;
          background:#00adb5;
          transition:0.3s;
        }

        .nav-links a:hover::after{
          width:100%;
        }

        .nav-links a.active{
          color:#00adb5;
        }

        .nav-links a.active::after{
          width:100%;
        }

        .hamburger{
          display:none;
          flex-direction:column;
          justify-content: space-between;
          width:26px;
          height:20px;
          cursor:pointer;
          z-index: 1002;
          position: relative;
        }

        .hamburger span{
          width:100%;
          height:3px;
          background:white;
          border-radius:3px;
          transition:0.35s;
        }

        .hamburger.active span:nth-child(1){
          transform:rotate(45deg) translate(5px,5px);
        }

        .hamburger.active span:nth-child(2){
          opacity:0;
        }

        .hamburger.active span:nth-child(3){
          transform:rotate(-45deg) translate(6px,-6px);
        }

        .hamburger:hover{
          transform:scale(1.1);
        }

        @media(max-width:768px){

          .hamburger{
            display:flex;
            flex-direction:column;
            justify-content: space-between;
            width:26px;
            height:20px;
            cursor:pointer;
            z-index: 1002;
            position: fixed;
            top:16px;
            right:20px;
          }

          .nav-links{
            display:none;
          }

          .nav-links.active{
            display:flex;
          }
        }

        @media(max-width:480px){
          .navbar {
            padding:12px 20px;
          }

          .logo {
            font-size:18px;
          }

          .nav-links {
            width:180px;
            top:60px;
            right:15px;
            padding:18px;
          }

          .nav-links a {
            font-size:14px;
          }

          .hamburger span {
            width:22px;
            height:2.5px;
          }
        }

        @media(max-width:360px){
          .navbar {
            padding:10px 15px;
          }

          .logo {
            font-size:16px;
          }

          .nav-links {
            width:160px;
            top:55px;
            right:10px;
            padding:15px;
          }

          .nav-links a {
            font-size:13px;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;