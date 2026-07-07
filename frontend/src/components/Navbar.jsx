import { BsCart3 } from "react-icons/bs";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <BsCart3 size={24} />
        <span>ShopAssist AI</span>
      </div>

      <div className="nav-right">
        <span>Powered by Gemini + RAG</span>
      </div>
    </nav>
  );
}

export default Navbar;