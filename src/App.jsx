import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";

function App() {
  const [showFunFact, setShowFunFact] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [funFactIndex, setFunFactIndex] = useState(0);
  const canvasRef = useRef(null);

  // Modern typing effect state for hero heading
  const fullNameText = "Hi, I'm Sumit 👋";
  const [typedName, setTypedName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);

  const roles = [
    "Backend Developer",
    "Java & Spring Boot Developer",
    "API & System Design"
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  const funFacts = [
    {
      icon: "🏏",
      text: "Cricket taught me my first lessons in focus. As a wicketkeeper-batsman in school, I stayed involved in every moment of the game — the same way I stay engaged while building and improving software."
    },
    {
      icon: "🚜",
      text: "I grew up around farming. Discipline, patience, and early mornings shaped my mindset long before engineering did."
    },
    {
      icon: "📱",
      text: "Losing my phone once helped me break a gaming addiction — that moment pushed me to focus on learning and personal growth."
    },
    {
      icon: "🧠",
      text: "I enjoy building systems that think long‑term, inspired by the values and mindset I grew up with."
    }
  ];

  useEffect(() => {
    if (!showFunFact) return;

    const interval = setInterval(() => {
      setFunFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showFunFact]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Typing animation effect for hero heading
  useEffect(() => {
    if (nameIndex < fullNameText.length) {
      const timeout = setTimeout(() => {
        setTypedName((prev) => prev + fullNameText[nameIndex]);
        setNameIndex((prev) => prev + 1);
      }, 90);
      return () => clearTimeout(timeout);
    }
  }, [nameIndex, fullNameText, nameIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 10;
        const rotateY = (x - rect.width / 2) / 10;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
      });
    });

    const magneticButtons = document.querySelectorAll(".magnetic-btn");

    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0)";
      });
    });

  }, []);

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
    <div style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy", margin: 0, color: "#000" }}>
      <Navbar />

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

        .gradient-text {
          background: linear-gradient(90deg, #00adb5, #00c6ff, #7f5af0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-title {
          font-size: 32px;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }

        .section-title::after {
          content: "";
          display: block;
          width: 60%;
          height: 3px;
          margin: 8px auto 0;
          background: linear-gradient(90deg, #00adb5, #7f5af0);
          border-radius: 5px;
        }

        .about-box {
          max-width: 900px;
          margin: 40px auto;
          padding: 50px;
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65));
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .about-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg,#00adb5,#7f5af0);
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .about-box:hover::before {
          opacity: 0.06;
        }

        .about-box:hover {
          transform: translateY(-8px) scale(1.01);
        }

        .about-box p {
          font-size: 17px;
          line-height: 1.7;
          letter-spacing: 0.6px;
          color: #2c3e50;
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }

        .about-highlights {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 25px;
          position: relative;
          z-index: 1;
        }

        .highlight-item {
          padding: 10px 18px;
          border-radius: 20px;
          background: linear-gradient(90deg,#00adb5,#7f5af0);
          color: white;
          font-size: 14px;
          letter-spacing: 0.5px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
        }

        .primary-btn {
          padding: 10px 20px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background-color: #00adb5;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .magnetic-btn {
          transition: transform 0.2s ease;
        }

        .primary-btn:hover {
          box-shadow: 0 0 15px #00adb5;
          transform: translateY(-3px);
        }

        .hero-container {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-subtitle {
          font-size: 15px;
          letter-spacing: 3px;
          opacity: 0.8;
          margin-bottom: 10px;
        }

        .hero-description {
          max-width: 620px;
          line-height: 1.7;
          margin: 10px auto 30px;
          font-size: 16px;
          opacity: 0.9;
        }

        .hero-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
        }

        .animated-bg {
          background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
          border: 4px solid transparent;
          background: linear-gradient(#fff,#fff) padding-box,
                      linear-gradient(120deg,#00adb5,#7f5af0) border-box;
          box-shadow: 0 0 25px rgba(0,173,181,0.6);
          animation: float 4s ease-in-out infinite;
        }

        .typing-text {
          margin-top: 5px;
          font-size: 18px;
          opacity: 0.9;
          border-right: 2px solid white;
          padding-right: 6px;
          white-space: nowrap;
          overflow: hidden;
          width: fit-content;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,100% { border-color: white; }
          50% { border-color: transparent; }
        }

        .floating-icons {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .floating-icons img {
          position: absolute;
          width: 40px;
          opacity: 0.8;
          animation: floatIcon 6s ease-in-out infinite;
        }

        .icon-java { top: 15%; left: 10%; }
        .icon-react { top: 30%; right: 12%; }
        .icon-spring { bottom: 20%; left: 15%; }
        .icon-js { bottom: 25%; right: 18%; }

        @keyframes floatIcon {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .hero-image {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .secondary-btn {
          padding: 10px 20px;
          border-radius: 6px;
          border: 1px solid white;
          color: white;
          text-decoration: none;
        }

        .skills-container {
          display: flex;
          justify-content: center;
          gap: 60px;
          flex-wrap: wrap;
          margin-top: 40px;
        }

        /* AI Skill Network */

        .skill-network {
          position: relative;
          width: 500px;
          height: 500px;
          margin: 60px auto;
        }

        .skill-node {
          position: absolute;
          padding: 12px 18px;
          background: white;
          border-radius: 20px;
          border: 2px solid #00adb5;
          font-size: 14px;
          font-weight: bold;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .skill-node:hover {
          transform: scale(1.15);
          box-shadow: 0 0 18px #00adb5;
        }

        .center-node {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(90deg,#00adb5,#7f5af0);
          color: white;
        }

        .node-java { top: 10%; left: 50%; transform: translateX(-50%); }
        .node-spring { top: 35%; right: 5%; }
        .node-mysql { bottom: 10%; left: 50%; transform: translateX(-50%); }
        .node-react { top: 35%; left: 5%; }
        .node-js { bottom: 35%; left: 10%; }
        .node-git { bottom: 35%; right: 10%; }

        .tech-stack {
          margin-top: 60px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 35px;
        }

        .tech-icon {
          width: 55px;
          height: 55px;
          transition: transform 0.35s ease, filter 0.35s ease;
          animation: techFloat 5s ease-in-out infinite;
        }

        .tech-icon:hover {
          transform: scale(1.25);
          filter: drop-shadow(0 0 10px #00adb5);
        }

        @keyframes techFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .skill-column {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.07);
          transition: all 0.3s ease;
          min-width: 220px;
        }

        .skill-column:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
        }

        .skill-column h3 {
          margin-bottom: 15px;
          color: #00adb5;
        }

        .skill-column ul {
          list-style: none;
          padding: 0;
          line-height: 1.8;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 6px 0;
        }

        .skill-item img {
          width: 22px;
          height: 22px;
        }

        .projects-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 40px;
          margin-top: 40px;
        }

        .project-card {
          width: 300px;
          background: #f9f9f9;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: all 0.35s ease;
          text-align: left;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, #00adb5, #7f5af0);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }

        .project-card:hover::before {
          opacity: 0.08;
        }

        .project-card:hover {
          transform: perspective(800px) translateY(-12px) scale(1.02);
          box-shadow: 0 20px 45px rgba(0,0,0,0.2);
        }

        .project-card * {
          position: relative;
          z-index: 1;
        }

        .project-card h3 {
          margin-bottom: 10px;
          color: #00adb5;
          font-family: 'Copperplate', 'Copperplate Gothic Light', fantasy;
          font-size: 20px;
        }

        .project-card p {
          font-size: 15px;
          line-height: 1.6;
          color: #2c3e50;
          font-family: 'Copperplate', 'Copperplate Gothic Light', fantasy;
          margin-bottom: 20px;
        }

        .project-card ul {
          padding-left: 18px;
          font-family: 'Copperplate', 'Copperplate Gothic Light', fantasy;
          font-size: 14px;
          color: #2c3e50;
          line-height: 1.6;
        }

        footer {
          background: linear-gradient(to right, #141e30, #243b55);
          color: white;
          padding: 50px 20px;
          text-align: center;
        }

        footer p {
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        footer a {
          color: #00adb5;
          text-decoration: none;
          margin: 0 12px;
          transition: all 0.3s ease;
        }

        footer a:hover {
          color: white;
          text-shadow: 0 0 10px #00adb5;
        }

        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        /* Medium Devices */
        @media (max-width: 992px) {
          #home {
            padding: 120px 20px;
          }

          #home h1 {
            font-size: 42px;
          }

          .hero-image {
            width: 120px;
            height: 120px;
          }

          .floating-icons img {
            width: 35px;
          }

          .hero-buttons {
            gap: 15px;
          }

          .skills-container {
            gap: 30px;
          }
        }

        /* Small Devices */
        @media (max-width: 768px) {
          #home {
            padding: 100px 15px;
            text-align: center;
          }

          #home h1 {
            font-size: 36px;
          }

          .hero-subtitle {
            font-size: 13px;
            letter-spacing: 2px;
          }

          .hero-description {
            font-size: 14px;
          }

          .hero-image {
            width: 100px;
            height: 100px;
          }

          .floating-icons img {
            width: 30px;
          }

          .hero-buttons {
            flex-direction: column;
            gap: 10px;
            align-items: center;
            margin-top: 20px;
          }

          .primary-btn,
          .secondary-btn {
            width: 80%;
            text-align: center;
          }

          .about-box {
            padding: 25px;
          }

          .skills-container {
            flex-direction: column;
            align-items: center;
          }

          .skill-column {
            width: 90%;
            max-width: 400px;
          }

          .featured-project {
            padding: 25px;
          }
        }

        /* Extra Small Devices */
        @media (max-width: 480px) {
          #home h1 {
            font-size: 30px;
          }

          .hero-image {
            width: 90px;
            height: 90px;
          }

          .floating-icons img {
            width: 25px;
          }

          .hero-description {
            font-size: 13px;
          }

          footer {
            padding: 40px 15px;
          }

          footer a {
            display: block;
            margin: 8px 0;
          }
        }

        .funfact-btn {
          margin-top: 25px;
          padding: 10px 22px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: linear-gradient(90deg, #00adb5, #7f5af0);
          color: white;
          transition: all 0.3s ease;
        }

        .funfact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }

        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 16px;
          max-width: 500px;
          width: 90%;
          text-align: left;
          animation: fadeIn 0.3s ease-in-out;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          overflow-wrap: break-word;
        }

        .modal-content h3 {
          margin-bottom: 20px;
          color: #00adb5;
        }

        .project-preview-title {
          color: #00adb5;
          margin-bottom: 10px;
        }

        .project-preview-tech {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }

        .preview-btn {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: #243b55;
          color: white;
        }

        .preview-btn:hover {
          box-shadow: 0 0 10px #00adb5;
        }

        .close-btn {
          margin-top: 20px;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: #243b55;
          color: white;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .funfact-card {
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          background: linear-gradient(135deg,#f8f9fa,#eef2f3);
          margin-top: 15px;
          animation: fadeIn 0.4s ease;
        }

        .funfact-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .funfact-controls button {
          background: #243b55;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .funfact-controls button:hover {
          box-shadow: 0 0 10px #00adb5;
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 25px;
            font-size: 14px;
          }

          .funfact-controls {
            flex-direction: column;
            gap: 10px;
          }

          .funfact-controls button {
            width: 100%;
            text-align: center;
          }

          .funfact-card {
            padding: 15px;
          }
        }
        /* Modern typing cursor for hero heading */
        .typing-cursor {
          margin-left: 4px;
          animation: cursorBlink 1s infinite;
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .funfact-icon {
          font-size: 40px;
          margin-bottom: 10px;
        }

        .funfact-text {
          font-size: 15px;
          line-height: 1.6;
          color: #333;
        }

        .funfact-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .funfact-controls button {
          background: #243b55;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
        }

        .funfact-controls button:hover {
          box-shadow: 0 0 10px #00adb5;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 26px;
          opacity: 0.8;
          animation: bounce 1.6s infinite;
        }

        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>

      {/* HERO */}
      <section
        id="home"
        className="fade-section animated-bg"
        style={{
          padding: "140px 20px",
          position: "relative",
          color: "white",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.4
          }}
        />
        <div className="floating-icons">
          <img className="icon-java" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
          <img className="icon-react" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <img className="icon-spring" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />
          <img className="icon-js" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
        </div>
        <div className="hero-container hero-card">
          <p className="hero-subtitle">
            WELCOME TO MY PORTFOLIO
          </p>
          {/* Modern typing animation for hero heading */}
          <h1
            className="gradient-text"
            style={{
              fontSize: "52px",
              margin: "10px 0",
              fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy"
            }}
          >
            {typedName}
            <span className="typing-cursor">|</span>
          </h1>
          <div className="typing-text">
            {roles[roleIndex]}
          </div>

          <p className="hero-description" style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy" }}>
            Backend-focused Computer Science student passionate about building scalable backend systems and clean, maintainable architectures using Java and Spring Boot. I enjoy solving complex problems, optimizing application performance, and continuously learning new technologies to develop reliable and efficient software solutions.
          </p>

          <img src="/profile.jpg" alt="Sumit" className="hero-image" />

          <div className="hero-buttons">
            <a
              href="#projects"
              className="primary-btn magnetic-btn"
              onClick={() =>
                document.getElementById("projects").scrollIntoView()
              }
            >
              View Projects
            </a>
            <a href="/SUMITRESUME.pdf" className="secondary-btn magnetic-btn" target="_blank" rel="noopener noreferrer">
              Download Resume
            </a>
          </div>
        </div>
        <div className="scroll-indicator">⬇</div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="fade-section"
        style={{ padding: "100px 20px", textAlign: "center" }}
      >
        <h2
          className="section-title"
          style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy" }}
        >
          About Me
        </h2>
        <div className="about-box">
          <p style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy" }}>
            I am a Computer Science and Engineering student focused on backend
            development and system design. My primary interest is building
            scalable systems and well‑structured APIs using Java and Spring Boot.
          </p>

          <p style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy" }}>
            I continuously strengthen my foundation in Data Structures,
            Databases, and core Computer Science concepts while building
            practical projects that reflect real‑world backend architecture.
          </p>

          <p style={{ fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy" }}>
            I value discipline, consistency, and long‑term thinking — qualities
            that guide both my personal growth and my approach to engineering.
          </p>

          <div className="about-highlights">
            <span className="highlight-item">Backend Development</span>
            <span className="highlight-item">Java & Spring Boot</span>
            <span className="highlight-item">DSA & Problem Solving</span>
            <span className="highlight-item">System Design Learner</span>
          </div>
          <button
            className="funfact-btn"
            onClick={() => setShowFunFact(true)}
          >
            🎭 Reveal Fun Facts
          </button>
        </div>
      </section>

      {showFunFact && (
        <div className="modal-overlay" onClick={() => setShowFunFact(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🧩 Fun Facts About Me</h3>

            <div className="funfact-card">
              <div className="funfact-icon">{funFacts[funFactIndex].icon}</div>
              <p className="funfact-text">{funFacts[funFactIndex].text}</p>
            </div>

            <div className="funfact-controls">
              <button
                onClick={() =>
                  setFunFactIndex((funFactIndex - 1 + funFacts.length) % funFacts.length)
                }
              >
                ◀ Prev
              </button>

              <button
                onClick={() =>
                  setFunFactIndex((funFactIndex + 1) % funFacts.length)
                }
              >
                Next ▶
              </button>
            </div>

            <button className="close-btn" onClick={() => setShowFunFact(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* SKILLS */}
      <section
        id="skills"
        className="fade-section"
        style={{
          padding: "100px 20px",
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          backgroundSize: "400% 400%",
          animation: "gradientMove 15s ease infinite"
        }}
      >
        {/* AI Skills Modern Title */}
        <h2
          className="section-title gradient-text"
          style={{
            fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy",
            textAlign: 'center'
          }}
        >
          Skills
        </h2>
        <div className="skill-network">

          <div className="skill-node center-node">
            Backend Developer
          </div>

          <div className="skill-node node-java">Java</div>
          <div className="skill-node node-spring">Spring Boot</div>
          <div className="skill-node node-mysql">MySQL</div>
          <div className="skill-node node-react">React</div>
          <div className="skill-node node-js">JavaScript</div>
          <div className="skill-node node-git">Git</div>

        </div>
        <div className="tech-stack">
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
          <img className="tech-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
        </div>
      </section>


      {/* PROJECTS */}
      <section
        id="projects"
        className="fade-section"
        style={{ padding: "100px 20px", textAlign: "center" }}
      >
        <h2
          className="section-title gradient-text"
          style={{
            fontFamily: "'Copperplate', 'Copperplate Gothic Light', fantasy",
            textAlign: 'center'
          }}
        >
          Projects
        </h2>

        <div className="projects-grid">

          <div className="project-card">
            <h3>MyCartX</h3>
            <p>
              Full-stack E-commerce application built using Spring Boot
              following clean architecture principles.
            </p>

            <p><strong>Key Features:</strong></p>
            <ul>
              <li>User authentication & role-based authorization</li>
              <li>Product & category management APIs</li>
              <li>Secure REST APIs with layered architecture</li>
              <li>MySQL database integration</li>
            </ul>

            <p><strong>Tech Stack:</strong> Java, Spring Boot, MySQL, REST APIs</p>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="preview-btn"
                onClick={() => setPreviewProject("mycartx")}
              >
                Preview
              </button>
              <a
                href="https://github.com/sumit-2218/MyCartX__"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
              >
                View Code
              </a>
            </div>
          </div>

          {/* taskmanager */}

          <div className="project-card">
            <h3>Task Manager</h3>
            <p>
              A full-stack task management application that allows users to register,
              log in, and manage tasks through a secure and responsive interface.
            </p>

            <p><strong>Key Features:</strong></p>
            <ul>
              <li>User registration and login with secure authentication</li>
              <li>Role selection (User/Admin) during registration</li>
              <li>Create, update, and manage tasks</li>
              <li>RESTful API integration between React frontend and Spring Boot backend</li>
              <li>Clean dashboard UI for task management</li>
            </ul>

            <p><strong>Tech Stack:</strong> Java, Spring Boot, MySQL, React.js, Axios, JWT, BCrypt</p>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="preview-btn"
                onClick={() => setPreviewProject("task")}
              >
                Preview
              </button>
              <a
                href="https://github.com/sumit-2218/TaskManager"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
              >
                View Code
              </a>
            </div>
          </div>


          <div className="project-card">
            <h3>Portfolio Website</h3>
            <p>
              Modern responsive portfolio built using React with smooth
              scrolling, animations, and interactive UI elements.
            </p>

            <p><strong>Key Features:</strong></p>
            <ul>
              <li>Smooth scrolling navigation</li>
              <li>Fade-in animations on scroll</li>
              <li>Interactive Fun Fact modal</li>
              <li>Fully mobile responsive design</li>
            </ul>

            <p><strong>Tech Stack:</strong> React, JavaScript, CSS</p>

            <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                className="preview-btn"
                onClick={() => setPreviewProject("portfolio")}
              >
                Preview
              </button>
              <a
                href="https://github.com/sumit-2218/my-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="primary-btn"
              >
                View Code
              </a>
            </div>
          </div>

        </div>
      </section>

      {previewProject && (
        <div className="modal-overlay" onClick={() => setPreviewProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {previewProject === "mycartx" && (
              <>
                <h3 className="project-preview-title">MyCartX</h3>
                <p>
                  Backend e-commerce system built with Spring Boot focusing on
                  scalable architecture and secure REST APIs.
                </p>
                <p className="project-preview-tech">
                  Tech: Java, Spring Boot, MySQL
                </p>
              </>
            )}

            {previewProject === "task" && (
              <>
                <h3 className="project-preview-title">Task Manager</h3>
                <p>
                  Full-stack task manager with authentication, role-based access,
                  and dashboard UI connecting React with Spring Boot APIs.
                </p>
                <p className="project-preview-tech">
                  Tech: Java, Spring Boot, React, MySQL
                </p>
              </>
            )}

            {previewProject === "portfolio" && (
              <>
                <h3 className="project-preview-title">Portfolio Website</h3>
                <p>
                  Personal developer portfolio with animations, interactive
                  sections, and modern responsive UI built using React.
                </p>
                <p className="project-preview-tech">
                  Tech: React, JavaScript, CSS
                </p>
              </>
            )}

            <button className="close-btn" onClick={() => setPreviewProject(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{position: 'relative', padding: '60px 20px', background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', color: 'white', textAlign: 'center', overflow: 'hidden'}}>
        <div style={{marginBottom: '20px'}}>
          <a href="https://github.com/sumit-2218" target="_blank" rel="noopener noreferrer" style={{color:'#00adb5', margin:'0 12px', transition:'all 0.3s ease'}}>GitHub</a>
          <a href="https://www.linkedin.com/in/sumit-kumar-44558a290/" target="_blank" rel="noopener noreferrer" style={{color:'#00adb5', margin:'0 12px', transition:'all 0.3s ease'}}>LinkedIn</a>
          <a href="mailto:sumitsharmajnvs2218@gmail.com" style={{color:'#00adb5', margin:'0 12px', transition:'all 0.3s ease'}}>Email</a>
        </div>
        <p style={{marginBottom:'10px', fontSize:'14px', opacity:0.8}}>SUMIT SHARMA © 2026</p>
        {/* Animated background circles */}
        <div style={{position:'absolute', width:'100%', height:'100%', top:0, left:0, pointerEvents:'none'}}>
          {[...Array(6)].map((_, i) => (
            <span key={i} style={{
              position:'absolute',
              width:`${50 + i*20}px`,
              height:`${50 + i*20}px`,
              borderRadius:'50%',
              background:'rgba(0,173,181,0.2)',
              top:`${Math.random()*80}%`,
              left:`${Math.random()*80}%`,
              animation:`floatCircle ${10 + i*2}s ease-in-out infinite alternate`
            }}></span>
          ))}
        </div>
        <style>{`
          @keyframes floatCircle {
            0% { transform: translateY(0); }
            100% { transform: translateY(-20px); }
          }
          footer a:hover {
            color: white;
            text-shadow: 0 0 12px #00adb5;
          }
        `}</style>
      </footer>
    </div>
  );
}

export default App;