import { useEffect } from "react";
import Navbar from "./Navbar";

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const sections = document.querySelectorAll(".fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: 0 }}>
      <Navbar />
      <div className="profile-container">
        <img
          src="/profile.jpg"
          alt="Sumit"
          className="profile-pic"
        />
        <span className="profile-name">Sumit</span>
      </div>

      <style>{`
        .fade-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-pic {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .profile-container {
          position: fixed;
          top: 20px;
          left: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.4);
          padding: 8px 14px;
          border-radius: 40px;
          backdrop-filter: blur(8px);
        }

        .profile-name {
          font-size: 18px;
          font-weight: 600;
          color: white;
          white-space: nowrap;
        }

        /* Projects layout */
        .projects-container {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }

        .project-card {
          background-color: #f9f9f9;
          padding: 30px;
          width: 320px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
        }

        .project-image {
          width: 100%;
          height: 160px;
          background: linear-gradient(135deg, #00adb5, #243b55);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin: 15px 0;
        }

        .tech-badge {
          background-color: #e0f7fa;
          color: #007c91;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .project-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .project-btn {
          flex: 1;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          text-decoration: none;
          text-align: center;
          background-color: #00adb5;
          color: white;
          transition: 0.3s;
        }

        .project-btn:hover {
          opacity: 0.85;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .profile-container {
            top: 15px;
            left: 15px;
            padding: 6px 12px;
          }

          .profile-name {
            font-size: 16px;
          }

          #home h1 {
            font-size: 38px;
          }

          #home p {
            font-size: 18px;
          }

          section {
            padding: 70px 20px !important;
          }

          .projects-container {
            flex-direction: column;
            align-items: center;
          }

          .project-card {
            width: 90%;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="fade-section" style={{
        textAlign: "center",
        padding: "140px 20px",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white"
      }}>
        <h1 style={{ fontSize: "64px", marginBottom: "20px", letterSpacing: "1px" }}>
          Hi, I'm Sumit 👋
        </h1>
        <p style={{ fontSize: "22px", opacity: "0.85", marginBottom: "30px" }}>
          Computer Science Student | Java | React
        </p>
        <button
          onClick={() => {
            document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#00adb5",
            color: "white",
            transition: "0.3s"
          }}
        >
          View My Work
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="fade-section" style={{
        padding: "100px 20px",
        backgroundColor: "#f4f4f4",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "40px", marginBottom: "30px" }}>About Me</h2>
        <p style={{
          maxWidth: "750px",
          margin: "0 auto",
          fontSize: "18px",
          lineHeight: "1.8",
          color: "#333"
        }}>
          I am a passionate Computer Science student focused on building real-world
          applications using Java, Spring Boot, and modern frontend technologies
          like React.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="fade-section" style={{
        padding: "100px 20px",
        textAlign: "center",
        backgroundColor: "white"
      }}>
        <h2 style={{ fontSize: "40px", marginBottom: "50px" }}>Projects</h2>

        <div className="projects-container">

          <div className="project-card">
            <div className="project-image"></div>
            <h3 style={{ marginBottom: "10px" }}>MyCartX</h3>
            <p>E-commerce backend built using Spring Boot with authentication, product management and cart system.</p>

            <div className="tech-stack">
              <span className="tech-badge">Java</span>
              <span className="tech-badge">Spring Boot</span>
              <span className="tech-badge">MySQL</span>
              <span className="tech-badge">REST API</span>
            </div>

            <div className="project-buttons">
              <a href="https://github.com/sumit-2218/MyCartX" target="_blank" rel="noopener noreferrer" className="project-btn">View Code</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="project-btn">Live Demo</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image"></div>
            <h3 style={{ marginBottom: "10px" }}>Portfolio Website</h3>
            <p>Personal responsive portfolio built using React with animations and modern UI design.</p>

            <div className="tech-stack">
              <span className="tech-badge">React</span>
              <span className="tech-badge">JavaScript</span>
              <span className="tech-badge">CSS</span>
              <span className="tech-badge">Responsive</span>
            </div>

            <div className="project-buttons">
              <a href="https://github.com/sumit-2218/portfolio" target="_blank" rel="noopener noreferrer" className="project-btn">View Code</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="project-btn">Live Demo</a>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="fade-section" style={{
        padding: "100px 20px",
        backgroundColor: "#111",
        color: "white",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "40px", marginBottom: "30px" }}>Contact</h2>
        <p>Email: sumitsharmajnvs2218@gmail.com</p>
        <p>
          <a href="https://github.com/sumit-2218" target="_blank" rel="noopener noreferrer" style={{ color: "#00adb5", textDecoration: "none" }}>
            GitHub
          </a>
          {" | "}
          <a href="https://www.linkedin.com/in/sumit-kumar-44558a290/" target="_blank" rel="noopener noreferrer" style={{ color: "#00adb5", textDecoration: "none" }}>
            LinkedIn
          </a>
        </p>
      </section>
    </div>
  );
}

export default App;