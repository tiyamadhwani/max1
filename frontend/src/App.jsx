import { useState, useEffect, useRef } from "react";

// ── API base URL ──────────────────────────────────────────────────────────────
// In Vercel: set VITE_API_URL = https://your-render-backend.onrender.com
// Locally:   falls back to empty string (uses Vite proxy to localhost:5000)
const API_URL = import.meta.env.VITE_API_URL || "";

const BRAND_COLOR = "#D4820A";
const BRAND_DARK = "#7B3F00";
const BRAND_RED = "#C0392B";
const BRAND_GREEN = "#27AE60";
const BRAND_CREAM = "#FFF8E7";

const menuCategories = [
  {
    category: "🆕 Newly Launched",
    emoji: "✨",
    color: "#E91E8C",
    isNew: true,
    items: [
      { label: "Korean Cheese Burger", price: "₹50", desc: "Bold Korean-style veg burger loaded with melted cheese", highlight: true, newItem: true },
      { label: "Spring Roll (2 pcs)", price: "₹65", desc: "Crispy golden spring rolls served with tangy dipping sauce", newItem: true },
      { label: "Cheese Momos — Steam (6 pcs)", price: "₹75", desc: "Soft steamed momos stuffed with gooey melted cheese", newItem: true },
      { label: "Cheese Momos — Fried (6 pcs)", price: "₹85", desc: "Crispy fried cheese-filled momos with chutney", newItem: true },
      { label: "Paneer Momos — Steam (6 pcs)", price: "₹75", desc: "Soft steamed momos packed with spiced cottage cheese", newItem: true },
      { label: "Paneer Momos — Fried (6 pcs)", price: "₹85", desc: "Crispy fried paneer momos, golden and delicious", newItem: true },
    ]
  },
  {
    category: "Burgers",
    emoji: "🍔",
    color: "#D4820A",
    items: [
      { label: "Veg Burger", price: "₹25", desc: "Classic veg patty with fresh veggies & secret sauce" },
      { label: "Tandoori Burger", price: "₹30", desc: "Smoky tandoori flavoured veg patty" },
      { label: "Shezwan Burger", price: "₹30", desc: "Spicy schezwan sauce with crispy patty" },
      { label: "Peri Peri Burger", price: "₹30", desc: "Fiery peri peri seasoned veg burger" },
      { label: "Max Special Burger", price: "₹50", desc: "Our signature loaded special — the crowd favourite!", highlight: true },
      { label: "Add On Cheese", price: "₹10", desc: "Extra melted cheese slice on any burger", addon: true },
    ]
  },
  {
    category: "Sandwiches",
    emoji: "🥪",
    color: "#E67E22",
    items: [
      { label: "Veg Grill Sandwich", price: "₹60", desc: "Fresh veggies grilled golden to perfection" },
      { label: "Grill Cheese Sandwich", price: "₹70", desc: "Loaded with cheese, grilled crisp and hot" },
    ]
  },
  {
    category: "Fries",
    emoji: "🍟",
    color: "#F39C12",
    items: [
      { label: "French Fries", price: "₹30", desc: "Crispy golden fries, lightly salted" },
      { label: "Peri Peri Fries", price: "₹40", desc: "Fries tossed in spicy peri peri masala" },
    ]
  },
  {
    category: "Momos",
    emoji: "🥟",
    color: "#C0392B",
    items: [
      { label: "Steam Momos (6 pcs)", price: "₹35", desc: "Soft steamed veg momos with dipping sauce" },
      { label: "Fried Momos (6 pcs)", price: "₹45", desc: "Crispy fried momos with spicy chutney" },
      { label: "Cheese Steam Momos (6 pcs)", price: "₹75", desc: "Gooey cheese-stuffed steamed momos", newItem: true },
      { label: "Cheese Fried Momos (6 pcs)", price: "₹85", desc: "Crispy fried cheese momos", newItem: true },
      { label: "Paneer Steam Momos (6 pcs)", price: "₹75", desc: "Spiced paneer stuffed steamed momos", newItem: true },
      { label: "Paneer Fried Momos (6 pcs)", price: "₹85", desc: "Crispy fried paneer momos", newItem: true },
    ]
  },
  {
    category: "Coffee",
    emoji: "☕",
    color: "#7B3F00",
    items: [
      { label: "Cold Coffee", price: "₹25", desc: "Chilled creamy cold coffee" },
      { label: "Cold Coffee with Ice Cream", price: "₹35", desc: "Cold coffee topped with a scoop of ice cream" },
    ]
  },
];

const locations = [
  { city: "Udaipur", state: "Rajasthan", address: "Azad Chowk, 3, Plot No, 100 Feet Rd, opposite Ganpati Cars, Mali Colony, Gayariawas, Central Area, Udaipur, Rajasthan 313002", lat: 24.5854, lng: 73.7125 },
];

const whyUs = [
  { icon: "🏆", title: "Proven Brand", desc: "Strong regional presence with loyal customer base across Rajasthan & North India" },
  { icon: "🎓", title: "Full Training", desc: "Complete kitchen training, staff management, and operations support from day one" },
  { icon: "📈", title: "High ROI", desc: "Average monthly revenue of ₹2–5 lakhs with quick 9-month payback period" },
  { icon: "🎨", title: "Brand Support", desc: "Full branding kit, marketing materials, social media templates provided" },
  { icon: "🤝", title: "Dedicated Support", desc: "Dedicated franchise manager for ongoing guidance and business growth" },
  { icon: "💰", title: "Low Investment", desc: "Start as low as ₹10 Lakhs — Kiosk, Takeaway & Dine-In models available" },
];

function Navbar({ activeSection, scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["home","about","why-us","menu","locations","contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(20,10,0,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease", borderBottom: scrolled ? `1px solid ${BRAND_COLOR}33` : "none", padding: "0 5%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <img src="/logo.jpg" alt="Max Burger" style={{ height: 50, width: 50, borderRadius: "50%", objectFit: "cover", border: `2px solid ${BRAND_COLOR}` }} />
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: BRAND_COLOR, lineHeight: 1 }}>MAX BURGER</div>
            <div style={{ fontSize: 10, color: "#ccc", letterSpacing: 2 }}>& MORE</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === l ? BRAND_COLOR : "#ddd", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s", borderBottom: activeSection === l ? `2px solid ${BRAND_COLOR}` : "2px solid transparent", paddingBottom: 2 }}>{l.replace("-", " ")}</button>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ background: BRAND_COLOR, color: "#fff", border: "none", borderRadius: 25, padding: "10px 24px", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 1 }}>Get Franchise</button>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: BRAND_COLOR, fontSize: 28, cursor: "pointer" }} className="hamburger">☰</button>
      </div>
      {menuOpen && (
        <div style={{ background: "rgba(20,10,0,0.98)", padding: "20px 0", display: "flex", flexDirection: "column" }}>
          {links.map(l => (
            <button key={l} onClick={() => { scrollTo(l); setMenuOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#ddd", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15, textTransform: "uppercase", padding: "14px 5%", textAlign: "left", borderBottom: "1px solid #ffffff11" }}>{l.replace("-", " ")}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ scrollTo }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(135deg, #0d0600 0%, #1a0900 40%, #2d1200 70%, #1a0600 100%)`, position: "relative", overflow: "hidden", padding: "120px 5% 80px" }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position: "absolute", width: [400,300,200,500,250][i], height: [400,300,200,500,250][i], borderRadius: "50%", border: `1px solid ${BRAND_COLOR}${["11","22","15","08","1a"][i]}`, top: ["10%","60%","20%","40%","80%"][i], left: ["-5%","70%","60%","-10%","40%"][i], animation: `pulse ${[8,6,10,7,9][i]}s ease-in-out infinite` }} />
      ))}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 40 }}>
        {/* Left Content */}
        <div style={{ flex: 1, minWidth: 280, maxWidth: 600, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease" }}>
          <div style={{ display: "inline-block", background: `${BRAND_COLOR}22`, color: BRAND_COLOR, padding: "6px 18px", borderRadius: 20, fontSize: 12, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, border: `1px solid ${BRAND_COLOR}44`, fontFamily: "'Nunito', sans-serif" }}>🍔 Franchise Opportunity</div>
          <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(40px, 7vw, 80px)", color: "#fff", lineHeight: 1.05, margin: "0 0 20px" }}>
            Own A <span style={{ color: BRAND_COLOR }}>MAX</span><br />Burger & More!<br /><span style={{ color: BRAND_RED }}>Franchise</span>
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#ccaa88", lineHeight: 1.7, marginBottom: 35, maxWidth: 500 }}>
            Join India's fastest-growing 100% veg burger franchise. Low investment, high returns, full support.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("contact")} style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`, color: "#fff", border: "none", borderRadius: 50, padding: "16px 40px", fontFamily: "'Fredoka One', cursive", fontSize: 18, cursor: "pointer", boxShadow: `0 8px 30px ${BRAND_COLOR}55`, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 14px 40px ${BRAND_COLOR}77`; }}
              onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 8px 30px ${BRAND_COLOR}55`; }}>Apply for Franchise 🚀</button>
            <button onClick={() => scrollTo("about")} style={{ background: "transparent", color: BRAND_COLOR, border: `2px solid ${BRAND_COLOR}`, borderRadius: 50, padding: "16px 32px", fontFamily: "'Fredoka One', cursive", fontSize: 18, cursor: "pointer", transition: "all 0.2s" }}
              onMouseOver={e => { e.target.style.background = `${BRAND_COLOR}22`; }}
              onMouseOut={e => { e.target.style.background = "transparent"; }}>Learn More</button>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 50, flexWrap: "wrap" }}>
            {[["₹7L","Min. Investment"],["9mo","ROI Period"],["100%","Pure Veg"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: BRAND_COLOR }}>{num}</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#999", letterSpacing: 1 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content — Enquiry Banner + Burger Image */}
        <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 80, opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.7)", transition: "all 1s ease 0.3s" }}>

          {/* Franchise Enquiry Banner */}
          <a
            href="tel:+919029020888"
            style={{
              textDecoration: "none",
              display: "block",
              background: "linear-gradient(135deg, #C0392B, #e74c3c)",
              border: "3px solid #ff8a80",
              borderRadius: 14,
              padding: "16px 35px",
              textAlign: "center",
              boxShadow: "0 8px 36px rgba(192,57,43,0.55)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              minWidth: 260,
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(192,57,43,0.75)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(192,57,43,0.55)"; }}
          >
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(20px, 3vw, 28px)", color: "#FFD700", letterSpacing: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ fontSize: "clamp(18px, 2.5vw, 24px)" }}>📞</span>
              +91 90290 20888
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: "clamp(10px, 1.5vw, 13px)", color: "#fff", letterSpacing: 3, textTransform: "uppercase", marginTop: 6 }}>
              For Franchise Enquiry Only
            </div>
          </a>

          {/* Burger Image */}
          <div style={{ width: "clamp(260px,35vw,420px)", height: "clamp(260px,35vw,420px)", borderRadius: "50%", background: `radial-gradient(circle, ${BRAND_COLOR}33 0%, transparent 70%)`, display: "flex", alignItems: "center", justifyContent: "center", animation: "float 4s ease-in-out infinite" }}>
            <img src="/bg.png" alt="Max Burger" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(212,130,10,0.4))" }} />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.05);opacity:1} }
        @media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:block!important}}
      `}</style>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "100px 5%", background: BRAND_CREAM }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle title="About Max Burger" sub="Our Story" dark />
        <div style={{ display: "flex", gap: 60, flexWrap: "wrap", alignItems: "center", marginTop: 50 }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}22, ${BRAND_RED}11)`, borderRadius: 20, padding: 40, border: `2px solid ${BRAND_COLOR}33` }}>
              <img src="/logo.jpg" alt="Max Burger" style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto", borderRadius: 16 }} />
            </div>
          </div>
          <div style={{ flex: 1.5, minWidth: 280 }}>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, color: "#444", lineHeight: 1.9, marginBottom: 20 }}>
              <strong style={{ color: BRAND_DARK }}>Max Burger & More</strong> was born from a simple dream — to bring bold, flavourful <strong>pure veg burgers</strong> at honest, affordable prices to every Indian city. What started as a single outlet in <strong>Udaipur</strong> is the beginning of a journey to create a brand that celebrates great taste with a comforting touch.
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.9, marginBottom: 20 }}>
              We focus on <strong>100% vegetarian recipes</strong>, <strong>fresh ingredients</strong>, and <strong>unique flavours</strong> — all at <strong>pocket-friendly prices</strong> so everyone can enjoy their favourite burgers without compromise.
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#555", lineHeight: 1.9, marginBottom: 30 }}>
              More than just burgers — we aim to create a warm, welcoming experience for friends and families. The true <strong>#GharWaliFeeling</strong>.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["🗓️","Founded 2025"],["🌍","1 City & Growing"],["🌿","100% Pure Veg"],["⭐","4.8★ Rating"]].map(([icon, text]) => (
                <div key={text} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.06)", fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: BRAND_DARK }}>
                  <span style={{ fontSize: 24 }}>{icon}</span>{text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="why-us" style={{ padding: "100px 5%", background: `linear-gradient(180deg, #0d0600 0%, #1a0900 100%)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle title="Why Choose Max?" sub="Franchise Benefits" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 50 }}>
          {whyUs.map((item, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BRAND_COLOR}33`, borderRadius: 16, padding: 30, transition: "all 0.3s", cursor: "default" }}
              onMouseOver={e => { e.currentTarget.style.background = `${BRAND_COLOR}11`; e.currentTarget.style.borderColor = BRAND_COLOR; e.currentTarget.style.transform = "translateY(-6px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = `${BRAND_COLOR}33`; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: BRAND_COLOR, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "#aaa", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 70 }}>
          <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: "#fff", textAlign: "center", marginBottom: 30 }}>Franchise <span style={{ color: BRAND_COLOR }}>Models</span></h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[{ type: "Kiosk", invest: "₹7-9 Lakhs", area: "150–250 sq ft", tag: "Best for Malls" }, { type: "Takeaway", invest: "₹9-10 Lakhs", area: "250–400 sq ft", tag: "Most Popular" }, { type: "Dine-In", invest: "₹10-15 Lakhs", area: "500–800 sq ft", tag: "Premium" }].map(m => (
              <div key={m.type} style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}22, ${BRAND_DARK}33)`, border: `2px solid ${BRAND_COLOR}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
                <div style={{ background: BRAND_COLOR, color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: 11, fontWeight: 800, letterSpacing: 1, display: "inline-block", marginBottom: 12, fontFamily: "'Nunito', sans-serif" }}>{m.tag}</div>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: "#fff", marginBottom: 8 }}>{m.type}</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, color: BRAND_COLOR, fontWeight: 800 }}>{m.invest}</div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#999", marginTop: 6 }}>{m.area}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState("list");

  return (
    <section id="menu" style={{ padding: "100px 5%", background: "#fff8f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle title="Our Menu" sub="Fan Favourites" dark />
        <p style={{ fontFamily: "'Nunito', sans-serif", textAlign: "center", fontSize: 17, color: "#777", maxWidth: 600, margin: "0 auto 16px" }}>
          🌿 100% Pure Veg · Fresh Ingredients · Pocket-Friendly Prices
        </p>

        {/* Newly Launched Banner */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
          background: "linear-gradient(135deg, #E91E8C22, #ff6b3511)",
          border: "2px solid #E91E8C66", borderRadius: 16, padding: "14px 28px",
          margin: "0 auto 30px", maxWidth: 520,
        }}>
          <span style={{ fontSize: 28, animation: "pulse 2s infinite" }}>🎉</span>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#E91E8C" }}>Newly Launched Items!</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#c05090" }}>Korean Cheese Burger · Spring Roll · Cheese & Paneer Momos</div>
          </div>
          <span style={{ fontSize: 28, animation: "pulse 2s infinite" }}>🎉</span>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36 }}>
          {[["list","📋 Menu List"],["board","🖼️ Menu Boards"]].map(([mode, label]) => (
            <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: "10px 28px", borderRadius: 30, fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.2s", background: viewMode === mode ? BRAND_COLOR : "transparent", color: viewMode === mode ? "#fff" : BRAND_COLOR, border: `2px solid ${BRAND_COLOR}`, boxShadow: viewMode === mode ? `0 4px 16px ${BRAND_COLOR}44` : "none" }}>{label}</button>
          ))}
        </div>

        {viewMode === "board" ? (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 24 }}>
              {["/menu1.webp", "/menu2.webp"].map((src, i) => (
                <div key={i} style={{ borderRadius: 24, overflow: "hidden", boxShadow: `0 16px 50px ${BRAND_COLOR}44`, border: `3px solid ${BRAND_COLOR}55`, transition: "transform 0.3s" }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                  <img src={src} alt={`Max Burger Menu ${i + 1}`} style={{ width: "100%", display: "block" }} />
                </div>
              ))}
            </div>
            <div style={{ position: "relative", maxWidth: 460, margin: "0 auto" }}>
              <div style={{
                position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #E91E8C, #ff4560)",
                color: "#fff", padding: "6px 24px", borderRadius: 20, zIndex: 1,
                fontFamily: "'Fredoka One', cursive", fontSize: 16,
                boxShadow: "0 4px 16px #E91E8C66", whiteSpace: "nowrap",
              }}>🎉 Newly Launched!</div>
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: `0 16px 60px #E91E8C44`, border: `3px solid #E91E8C88`, transition: "transform 0.3s", marginTop: 10 }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}>
                <img src="/menu3.jpg" alt="Max Burger Newly Launched Menu" style={{ width: "100%", display: "block" }} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
              {menuCategories.map((cat, i) => (
                <button key={i} onClick={() => setActiveTab(i)} style={{
                  padding: "10px 22px", borderRadius: 30, fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800, fontSize: 14, cursor: "pointer", transition: "all 0.25s",
                  background: activeTab === i ? cat.color : "#fff",
                  color: activeTab === i ? "#fff" : cat.color,
                  border: `2px solid ${cat.color}`,
                  boxShadow: activeTab === i ? `0 4px 16px ${cat.color}44` : "none",
                  transform: activeTab === i ? "translateY(-2px)" : "none",
                  position: "relative",
                }}>
                  {cat.emoji} {cat.category}
                  {cat.isNew && <span style={{ position: "absolute", top: -8, right: -8, background: "#E91E8C", color: "#fff", fontSize: 8, fontWeight: 900, padding: "2px 6px", borderRadius: 10, letterSpacing: 0.5 }}>NEW</span>}
                </button>
              ))}
            </div>

            {/* Items Grid */}
            {menuCategories.map((cat, ci) => (
              activeTab === ci && (
                <div key={ci}>
                  {cat.isNew && (
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                      <div style={{ display: "inline-block", background: "linear-gradient(135deg, #E91E8C, #ff4560)", color: "#fff", padding: "8px 24px", borderRadius: 20, fontFamily: "'Fredoka One', cursive", fontSize: 18, boxShadow: "0 4px 20px #E91E8C44" }}>
                        🎉 Freshly Added to Our Menu!
                      </div>
                    </div>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
                    {cat.items.map((item, ii) => (
                      <div key={ii} style={{
                        background: item.newItem
                          ? "linear-gradient(135deg, #fef0f8, #fff5fb)"
                          : item.highlight ? `linear-gradient(135deg, ${BRAND_COLOR}18, ${BRAND_RED}0a)` : "#fff",
                        borderRadius: 18, overflow: "hidden",
                        boxShadow: item.newItem ? "0 8px 30px #E91E8C22" : item.highlight ? `0 8px 30px ${BRAND_COLOR}33` : "0 4px 20px rgba(0,0,0,0.08)",
                        border: item.newItem ? "2px solid #E91E8C66" : item.highlight ? `2px solid ${BRAND_COLOR}` : item.addon ? `1px dashed ${cat.color}88` : `1px solid #f0e0c8`,
                        transition: "all 0.3s",
                      }}
                        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 14px 36px ${item.newItem ? "#E91E8C33" : cat.color + "33"}`; }}
                        onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = item.newItem ? "0 8px 30px #E91E8C22" : item.highlight ? `0 8px 30px ${BRAND_COLOR}33` : "0 4px 20px rgba(0,0,0,0.08)"; }}>
                        <div style={{ height: 5, background: item.newItem ? "linear-gradient(90deg, #E91E8C, #ff4560)" : `linear-gradient(90deg, ${cat.color}, ${BRAND_RED})` }} />
                        <div style={{ padding: "20px 22px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                            <div style={{ flex: 1 }}>
                              {item.newItem && <div style={{ display: "inline-block", background: "linear-gradient(135deg, #E91E8C, #ff4560)", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 10, fontFamily: "'Nunito', sans-serif", letterSpacing: 1, marginBottom: 6 }}>✨ NEW</div>}
                              {item.highlight && !item.newItem && <div style={{ display: "inline-block", background: BRAND_COLOR, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 10, fontFamily: "'Nunito', sans-serif", letterSpacing: 1, marginBottom: 6 }}>⭐ SIGNATURE</div>}
                              {item.addon && <div style={{ display: "inline-block", background: "#f5f5f5", color: "#999", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 10, fontFamily: "'Nunito', sans-serif", letterSpacing: 1, marginBottom: 6 }}>ADD-ON</div>}
                              <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: item.newItem ? "#b0105a" : item.highlight ? BRAND_DARK : "#2d1200", margin: 0 }}>{item.label}</h3>
                            </div>
                            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: item.newItem ? "#E91E8C" : cat.color, background: item.newItem ? "#E91E8C15" : `${cat.color}15`, padding: "4px 14px", borderRadius: 20, whiteSpace: "nowrap", marginLeft: 10 }}>{item.price}</div>
                          </div>
                          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </>
        )}
        <p style={{ textAlign: "center", marginTop: 40, fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#bbb" }}>
          🌿 100% Pure Vegetarian · Prices may vary slightly by location
        </p>
      </div>
    </section>
  );
}

function LocationsSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="locations" style={{ padding: "100px 5%", background: `linear-gradient(180deg, #0d0600 0%, #1a0900 100%)` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle title="Our Locations" sub="Find Us Near You" />
        <p style={{ textAlign: "center", fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#aaa", marginBottom: 50 }}>Max Burger & More is expanding rapidly. Find us near you!</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {locations.map((loc, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{ background: selected === i ? `${BRAND_COLOR}22` : "rgba(255,255,255,0.04)", border: `2px solid ${selected === i ? BRAND_COLOR : BRAND_COLOR + "33"}`, borderRadius: 16, padding: 24, cursor: "pointer", transition: "all 0.3s" }}
              onMouseOver={e => { if (selected !== i) e.currentTarget.style.borderColor = `${BRAND_COLOR}88`; }}
              onMouseOut={e => { if (selected !== i) e.currentTarget.style.borderColor = `${BRAND_COLOR}33`; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>📍</span>
                <div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: BRAND_COLOR }}>{loc.city}</div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#999" }}>{loc.state}</div>
                </div>
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#ccc" }}>{loc.address}</div>
              {selected === i && <a href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 14, background: BRAND_COLOR, color: "#fff", padding: "8px 20px", borderRadius: 20, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, textDecoration: "none" }} onClick={e => e.stopPropagation()}>Open in Maps 🗺️</a>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, background: `${BRAND_COLOR}15`, border: `2px dashed ${BRAND_COLOR}66`, borderRadius: 20, padding: 40, textAlign: "center" }}>
          <div style={{ fontSize: 50, marginBottom: 16 }}>🚀</div>
          <h3 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: BRAND_COLOR, marginBottom: 10 }}>Don't See Your City?</h3>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 16, color: "#bbb" }}>We're actively expanding! Apply for a franchise and be the first Max Burger in your city.</p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", state: "", budget: "", experience: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) { setStatus({ type: "error", msg: "Please fill in Name, Email and Phone." }); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/franchise-inquiry`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { setStatus({ type: "success", msg: "🎉 Thank you! We'll contact you within 24 hours." }); setForm({ name: "", email: "", phone: "", city: "", state: "", budget: "", experience: "", message: "" }); }
    } catch { setStatus({ type: "error", msg: "Something went wrong. Please try again." }); }
    setLoading(false);
  };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.07)", border: `1px solid ${BRAND_COLOR}44`, borderRadius: 10, padding: "14px 18px", color: "#fff", outline: "none", fontFamily: "'Nunito', sans-serif", fontSize: 15, boxSizing: "border-box", transition: "border-color 0.2s" };
  return (
    <section id="contact" style={{ padding: "100px 5%", background: BRAND_CREAM }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle title="Apply for Franchise" sub="Get in Touch" dark />
        <p style={{ textAlign: "center", fontFamily: "'Nunito', sans-serif", fontSize: 17, color: "#666", marginBottom: 50 }}>Fill the form and our franchise team will reach out within 24 hours.</p>
        <div style={{ background: `linear-gradient(135deg, #1a0900, #2d1200)`, borderRadius: 24, padding: "50px 5%", boxShadow: `0 20px 80px ${BRAND_COLOR}22`, border: `1px solid ${BRAND_COLOR}33` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[{ key:"name",label:"Full Name *",type:"text",placeholder:"Your full name"},{key:"email",label:"Email Address *",type:"email",placeholder:"your@email.com"},{key:"phone",label:"Phone Number *",type:"tel",placeholder:"+91 XXXXX XXXXX"},{key:"city",label:"City",type:"text",placeholder:"Your city"},{key:"state",label:"State",type:"text",placeholder:"Your state"}].map(f => (
              <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: BRAND_COLOR, fontWeight: 700 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({...form,[f.key]:e.target.value})} style={inputStyle} onFocus={e => e.target.style.borderColor=BRAND_COLOR} onBlur={e => e.target.style.borderColor=`${BRAND_COLOR}44`} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: BRAND_COLOR, fontWeight: 700 }}>Investment Budget</label>
              <select value={form.budget} onChange={e => setForm({...form,budget:e.target.value})} style={inputStyle}>
                <option value="" style={{background:"#1a0900"}}>Select budget range</option>
                <option value="7-9L" style={{background:"#1a0900"}}>₹7-9 Lakhs</option>
                <option value="9-10L" style={{background:"#1a0900"}}>₹9-10 Lakhs</option>
                <option value="10-15L" style={{background:"#1a0900"}}>₹10-15 Lakhs</option>
                <option value="25L+" style={{background:"#1a0900"}}>₹25 Lakhs+</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 20 }}>
            <label style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: BRAND_COLOR, fontWeight: 700 }}>Business Experience</label>
            <select value={form.experience} onChange={e => setForm({...form,experience:e.target.value})} style={inputStyle}>
              <option value="" style={{background:"#1a0900"}}>Select your experience</option>
              <option value="none" style={{background:"#1a0900"}}>No prior experience</option>
              <option value="1-2y" style={{background:"#1a0900"}}>1–2 years</option>
              <option value="3-5y" style={{background:"#1a0900"}}>3–5 years</option>
              <option value="5y+" style={{background:"#1a0900"}}>5+ years</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 20 }}>
            <label style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: BRAND_COLOR, fontWeight: 700 }}>Message</label>
            <textarea placeholder="Tell us about yourself and why you want to open a Max Burger franchise..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} rows={4} style={{...inputStyle,resize:"vertical"}} onFocus={e => e.target.style.borderColor=BRAND_COLOR} onBlur={e => e.target.style.borderColor=`${BRAND_COLOR}44`} />
          </div>
          {status && <div style={{ marginTop: 20, padding: "14px 20px", borderRadius: 10, background: status.type==="success"?"#27ae6022":"#c0392b22", border: `1px solid ${status.type==="success"?"#27ae60":"#c0392b"}`, fontFamily: "'Nunito', sans-serif", fontSize: 15, color: status.type==="success"?"#27ae60":"#e74c3c" }}>{status.msg}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ width:"100%",marginTop:24,background:loading?"#555":`linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK})`,color:"#fff",border:"none",borderRadius:12,padding:"18px",fontFamily:"'Fredoka One',cursive",fontSize:20,cursor:loading?"not-allowed":"pointer",boxShadow:`0 8px 30px ${BRAND_COLOR}44`,transition:"all 0.2s" }}>{loading?"Submitting...":"Submit Franchise Application 🚀"}</button>
        </div>
      </div>
    </section>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "👋 Hi! I'm Max, your franchise guide! Ask me anything about owning a Max Burger & More franchise. 🍔" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();
  useEffect(() => { if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages); setInput(""); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: input, history: messages.slice(-8) }) });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.response }]);
    } catch { setMessages([...newMessages, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please call +91 90290 20888 🍔" }]); }
    setLoading(false);
  };
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 2000, width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`, border: "none", cursor: "pointer", fontSize: 26, boxShadow: `0 6px 30px ${BRAND_COLOR}66`, transition: "transform 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
        onMouseOver={e => e.currentTarget.style.transform="scale(1.1)"} onMouseOut={e => e.currentTarget.style.transform="scale(1)"}>{open ? "✕" : "🍔"}</button>
      {open && (
        <div style={{ position: "fixed", bottom: 100, right: 28, zIndex: 1999, width: 360, maxWidth: "calc(100vw - 56px)", background: "#1a0900", borderRadius: 20, border: `2px solid ${BRAND_COLOR}55`, boxShadow: `0 20px 80px rgba(0,0,0,0.6)`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${BRAND_COLOR}, ${BRAND_DARK})`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍔</div>
            <div><div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#fff" }}>Max Assistant</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", fontFamily: "'Nunito', sans-serif" }}>● Online — Franchise Expert</div></div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, maxHeight: 350, minHeight: 200 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
                <div style={{ maxWidth: "82%", background: m.role==="user"?`linear-gradient(135deg,${BRAND_COLOR},${BRAND_DARK})`:"rgba(255,255,255,0.08)", color: "#fff", borderRadius: m.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px", padding: "10px 15px", fontSize: 14, fontFamily: "'Nunito', sans-serif", lineHeight: 1.5 }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 6, padding: "10px 15px" }}>{[0,0.2,0.4].map((d,i) => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND_COLOR, animation: `bounce 1s ${d}s infinite` }} />)}</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${BRAND_COLOR}33`, display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==="Enter"&&send()} placeholder="Ask about franchise..." style={{ flex: 1, background: "rgba(255,255,255,0.07)", border: `1px solid ${BRAND_COLOR}44`, borderRadius: 10, padding: "10px 14px", color: "#fff", outline: "none", fontFamily: "'Nunito', sans-serif", fontSize: 14 }} />
            <button onClick={send} disabled={loading} style={{ background: BRAND_COLOR, border: "none", borderRadius: 10, width: 40, cursor: "pointer", fontSize: 18, opacity: loading?0.5:1 }}>➤</button>
          </div>
        </div>
      )}
      <style>{`@keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}`}</style>
    </>
  );
}

function SectionTitle({ title, sub, dark }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 10 }}>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: BRAND_COLOR, fontWeight: 800, marginBottom: 10 }}>{sub}</div>
      <h2 style={{ fontFamily: "'Fredoka One', cursive", fontSize: "clamp(32px, 5vw, 52px)", color: dark ? BRAND_DARK : "#fff", margin: 0 }}>{title}</h2>
      <div style={{ width: 60, height: 4, background: `linear-gradient(90deg, ${BRAND_COLOR}, ${BRAND_RED})`, borderRadius: 2, margin: "16px auto 0" }} />
    </div>
  );
}

function Footer({ scrollTo }) {
  return (
    <footer style={{ background: "#080300", color: "#888", padding: "60px 5% 30px", borderTop: `1px solid ${BRAND_COLOR}22` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "space-between", marginBottom: 40 }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="Max Burger" style={{ height: 50, width: 50, borderRadius: "50%", objectFit: "cover" }} />
              <div><div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: BRAND_COLOR }}>MAX BURGER</div><div style={{ fontSize: 10, color: "#666", letterSpacing: 2 }}>& MORE</div></div>
            </div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, lineHeight: 1.7, maxWidth: 260 }}>India's boldest 100% veg burger franchise. The #GharWaliFeeling in every bite.</p>
          </div>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#fff", marginBottom: 16 }}>Quick Links</div>
            {["home","about","why-us","menu","locations","contact"].map(l => (
              <div key={l} style={{ marginBottom: 8 }}>
                <button onClick={() => scrollTo(l)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "'Nunito', sans-serif", fontSize: 14, padding: 0, textTransform: "capitalize" }}>{l.replace("-"," ")}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#fff", marginBottom: 16 }}>Contact Us</div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, lineHeight: 2 }}>
              📞 <a href="tel:+919029020888" style={{ color: BRAND_COLOR, textDecoration: "none" }}>+91 90290 20888</a><br />
              📧 maxburgerandmore@gmail.com<br />
              📍 Udaipur, Rajasthan, India<br />
              📱 <a href="https://instagram.com/maxburgerandmore" target="_blank" rel="noreferrer" style={{ color: BRAND_COLOR }}>@maxburgerandmore</a>
            </p>
          </div>
        </div>
        <div style={{ borderTop: `1px solid #ffffff11`, paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontFamily: "'Nunito', sans-serif", fontSize: 13 }}>
          <span>© 2025 Max Burger & More. All rights reserved.</span>
          <span>Made with 🍔 for franchise partners across India</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveSection(id); };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); }, { threshold: 0.4 });
    ["home","about","why-us","menu","locations","contact"].forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <Navbar activeSection={activeSection} scrollTo={scrollTo} />
      <HeroSection scrollTo={scrollTo} />
      <AboutSection />
      <WhyUsSection />
      <MenuSection />
      <LocationsSection />
      <ContactSection />
      <Footer scrollTo={scrollTo} />
      <Chatbot />
    </div>
  );
}
