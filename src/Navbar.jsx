function Navbar() {
  return (
    <nav style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 50px",
  backgroundColor: "#0f172a",
  color: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000
}}>
      <h2>Sumit</h2>
      <div>
        <a href="#home" style={{ marginRight: "20px", cursor: "pointer", color: "white", textDecoration: "none" }}>Home</a>
        <a href="#about" style={{ marginRight: "20px", cursor: "pointer", color: "white", textDecoration: "none" }}>About</a>
        <a href="#projects" style={{ marginRight: "20px", cursor: "pointer", color: "white", textDecoration: "none" }}>Projects</a>
        <a href="#contact" style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;