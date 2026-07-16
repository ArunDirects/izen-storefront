import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ChevronRight,
  ChevronLeft, Star, Truck, ShieldCheck, RotateCcw, Play, Plus, Minus,
  Trash2, Check, MessageCircle, Instagram, ArrowRight, SlidersHorizontal,
  GitCompare, MapPin, Mail, Phone, ArrowUpRight, Sparkles, Share2, Tag,
  LogIn, UserPlus, LayoutDashboard, Package, PackagePlus, Pencil, Ban
} from "lucide-react";

import LOGO_COLOR from "./assets/logo-color.webp";
import LOGO_WHITE from "./assets/logo-white.webp";
import CAT_IMG_MEN_SUN from "./assets/cat-men-sunglasses.webp";
import CAT_IMG_WOMEN_SUN from "./assets/cat-women-sunglasses.webp";
import CAT_IMG_COMPUTER from "./assets/cat-computer-glasses.webp";
import HERO_IMG_WOMAN from "./assets/hero-woman.webp";
import {
  CATEGORIES, PRODUCTS, TESTIMONIALS, FAQS, BLOG_POSTS, WHY_ITEMS,
  FRAME_SHAPES, COLORWAYS, CARD_GRADIENTS,
  COUPONS, POLICIES, SAMPLE_ORDERS, SAMPLE_CUSTOMERS, ORDER_STATUS_COLOR,
} from "./data.js";

/* ============================================================
   DESIGN SYSTEM
   ============================================================ */


const GlassesMark = ({ className = "", stroke = "currentColor", sw = 2.5 }) => (
  <svg viewBox="0 0 64 32" className={className} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="14" cy="16" r="11" />
    <circle cx="50" cy="16" r="11" />
    <path d="M25 14c2-3 6-3 8 0" />
    <path d="M3 16c-1 0-2 1-2 3" />
    <path d="M61 16c1 0 2 1 2 3" />
  </svg>
);

const RING_COLORS = { signal: "var(--signal)", ink: "var(--ink)", light: "var(--signal-2)" };

const RingDot = ({ tone = "signal" }) => (
  <span
    className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
    style={{ border: `1.5px solid ${RING_COLORS[tone] || RING_COLORS.signal}` }}
  />
);

const EYEBROW_COLORS = { signal: "var(--signal)", ink: "var(--ink-2)", light: "var(--signal-2)" };

function Eyebrow({ children, tone = "signal", className = "" }) {
  return (
    <div className={`flex items-center f-mono fs-11 ls-eyebrow uppercase ${className}`} style={{ color: EYEBROW_COLORS[tone] || EYEBROW_COLORS.signal }}>
      <RingDot tone={tone} />
      {children}
    </div>
  );
}

function Stars({ rating, size = 13 }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={1.5}
          style={{ color: "var(--signal)", fill: i < full ? "var(--signal)" : "transparent" }} />
      ))}
    </span>
  );
}

function Price({ price, salePrice, size = "text-base" }) {
  return (
    <span className={`f-mono ${size} flex items-baseline gap-2`}>
      <span style={{ color: "var(--ink)" }} className="font-medium">
        ₹{(salePrice || price).toLocaleString("en-IN")}
      </span>
      {salePrice && (
        <span className="text-xs line-through" style={{ color: "var(--ink-2)", opacity: 0.55 }}>
          ₹{price.toLocaleString("en-IN")}
        </span>
      )}
    </span>
  );
}

function ProductImage({ product, iconSize = "w-14 h-14", className = "" }) {
  const [c1, c2] = product.gradient;
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <GlassesMark className={iconSize} stroke="rgba(255,255,255,0.88)" sw={2.2} />
      </div>
      {!product.inStock && (
        <div className="absolute top-3 left-3 f-mono fs-10 tracking-wider uppercase px-2 py-1"
          style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}>
          Out of stock
        </div>
      )}
      {product.salePrice && (
        <div className="absolute top-3 right-3 f-mono fs-10 tracking-wider uppercase px-2 py-1"
          style={{ background: "var(--signal)", color: "#fff" }}>
          Sale
        </div>
      )}
      <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-white transition-all duration-300 -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-transparent group-hover:border-white transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-transparent group-hover:border-white transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
      <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-white transition-all duration-300 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
    </div>
  );
}

/* ============================================================
   DATA
   ============================================================ */

/* ============================================================
   SMALL SHARED COMPONENTS
   ============================================================ */

/* Scroll-triggered reveal: wraps content, fades/slides in once when it enters the viewport. */
function useOnScreen(ref, rootMargin = "0px 0px -10% 0px") {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { rootMargin, threshold: 0.12 });
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return visible;
}

function Reveal({ children, className = "", delay = 0, tag: Tag = "div", style = {} }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <Tag ref={ref} className={`reveal-fade ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

/* Bump feedback: returns true briefly whenever `value` changes, for badge/heart pop animations. */
function useBump(value) {
  const [bump, setBump] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setBump(true);
      const t = setTimeout(() => setBump(false), 420);
      return () => clearTimeout(t);
    }
  }, [value]);
  return bump;
}

function SectionHeading({ eyebrow, title, sub, tone = "signal", align = "left", className = "", noMargin = false }) {
  const isLight = tone === "light";
  return (
    <div className={`${align === "center" ? "text-center flex flex-col items-center" : ""} ${className}`} style={{ marginBottom: noMargin ? 0 : "2rem" }}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="f-display mt-3 text-3xl md:text-4xl" style={{ color: isLight ? "#fff" : "var(--ink)" }}>{title}</h2>
      {sub && <p className="mt-3 max-w-xl fs-15" style={{ color: isLight ? "#B9B6AC" : "var(--ink-2)" }}>{sub}</p>}
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "", type = "button", disabled }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide uppercase f-mono disabled:opacity-40 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
}

function OutlineButton({ children, onClick, className = "", inverted = false, type = "button", disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${inverted ? "btn-outline-light" : "btn-outline"} inline-flex items-center justify-center gap-2 px-6 py-3 text-sm tracking-wide uppercase f-mono disabled:opacity-40 disabled:cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
}

function IconTextButton({ icon: Icon, children, onClick, active }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-xs f-mono uppercase tracking-wide transition-colors"
      style={{ color: active ? "var(--signal)" : "var(--ink-2)" }}>
      <Icon size={15} strokeWidth={1.75} /> {children}
    </button>
  );
}

function ProductCard({ product, onOpen, onAdd, onWishlist, onCompare, isWished, isCompared }) {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <button onClick={() => onOpen(product.id)} className="block w-full text-left">
          <ProductImage product={product} className="w-full ar-45 cursor-pointer" />
        </button>
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <button onClick={() => onWishlist(product.id)}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.92)", color: isWished ? "var(--signal)" : "var(--ink)" }}
            aria-label="Save to wishlist">
            <Heart size={15} strokeWidth={1.75} fill={isWished ? "var(--signal)" : "none"} />
          </button>
          <button onClick={() => onCompare(product.id)}
            className="w-8 h-8 flex items-center justify-center transition-colors"
            style={{ background: "rgba(255,255,255,0.92)", color: isCompared ? "var(--signal)" : "var(--ink)" }}
            aria-label="Add to compare">
            <GitCompare size={15} strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <button onClick={() => onOpen(product.id)} className="text-left mt-3">
        <div className="f-mono fs-10 tracking-wider uppercase" style={{ color: "var(--ink-2)", opacity: 0.7 }}>{product.category}</div>
        <div className="f-display text-lg mt-0.5" style={{ color: "var(--ink)" }}>{product.name}</div>
      </button>
      <div className="flex items-center gap-2 mt-1">
        <Stars rating={product.rating} size={12} />
        <span className="text-xs f-mono" style={{ color: "var(--ink-2)", opacity: 0.7 }}>({product.reviewCount})</span>
      </div>
      <div className="flex items-center justify-between mt-2">
        <Price price={product.price} salePrice={product.salePrice} />
        <button onClick={() => onAdd(product)} disabled={!product.inStock}
          className="f-mono fs-11 uppercase tracking-wide px-3 py-2 transition-colors disabled:opacity-30"
          style={{ border: "1px solid var(--ink)", color: "var(--ink)" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}>
          {product.inStock ? "Add" : "Sold out"}
        </button>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--line)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="f-display text-lg" style={{ color: "var(--ink)" }}>{q}</span>
        <ChevronDown size={18} className="transition-transform flex-shrink-0 ml-4" style={{ color: "var(--signal)", transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      {open && <p className="faq-answer pb-5 text-sm max-w-2xl" style={{ color: "var(--ink-2)" }}>{a}</p>}
    </div>
  );
}

/* ============================================================
   NAV / FOOTER / WHATSAPP
   ============================================================ */

function NavBar({ view, setView, goShop, cartCount, wishCount, compareCount, search, setSearch, openMobile, setOpenMobile }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartBump = useBump(cartCount);
  const wishBump = useBump(wishCount);
  const compareBump = useBump(compareCount);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 ${scrolled ? "is-scrolled" : ""}`} style={{ background: "var(--paper)", borderBottom: "1px solid var(--line)" }}>
      <div className="f-mono fs-11 tracking-wide text-center py-2" style={{ background: "var(--ink)", color: "#fff" }}>
        Free prescription lenses on frames above ₹2,499 · 14-day easy returns
      </div>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between gap-6">
        <button className="md:hidden" onClick={() => setOpenMobile(!openMobile)} aria-label="Menu">
          <Menu size={22} style={{ color: "var(--ink)" }} />
        </button>
        <button onClick={() => setView("home")} className="flex items-center gap-2 flex-shrink-0 logo-pop">
          <img src={LOGO_COLOR} alt="iZEN" className="h-8 w-auto select-none" draggable="false" />
        </button>

        <nav className="hidden md:flex items-center gap-8 f-mono fs-12 uppercase tracking-wide relative">
          <div onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)} className="relative">
            <button onClick={() => goShop()} className="flex items-center gap-1 py-8" style={{ color: view === "shop" ? "var(--signal)" : "var(--ink)" }}>
              Shop <ChevronDown size={13} />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full w-megamenu p-6 shadow-xl transition-all duration-300 ${megaOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              style={{ background: "#fff", border: "1px solid var(--line)" }}>
              <div className="grid grid-cols-2 gap-1">
              {CATEGORIES.map((c, i) => (
                <button key={c.key} onClick={() => { goShop(c.key); setMegaOpen(false); }}
                  className="text-left px-3 py-3 transition-all duration-200 normal-case hover:translate-x-1"
                  style={{ background: "transparent", transitionDelay: megaOpen ? `${i * 25}ms` : "0ms" }}>
                  <div className="f-display text-base" style={{ color: "var(--ink)" }}>{c.label}</div>
                  <div className="fs-11 mt-0.5" style={{ color: "var(--ink-2)", opacity: 0.75 }}>{c.note}</div>
                </button>
              ))}
              </div>
              <div className="flex gap-2 mt-2 pt-4 normal-case" style={{ borderTop: "1px solid var(--line)" }}>
                <button onClick={() => { goShop("All", "featured", true); setMegaOpen(false); }}
                  className="flex-1 text-left px-3 py-2.5 f-mono fs-11 uppercase tracking-wide" style={{ color: "var(--signal)", border: "1px solid var(--line)" }}>New Arrivals</button>
                <button onClick={() => { goShop("All", "rating", false); setMegaOpen(false); }}
                  className="flex-1 text-left px-3 py-2.5 f-mono fs-11 uppercase tracking-wide" style={{ color: "var(--signal)", border: "1px solid var(--line)" }}>Best Sellers</button>
              </div>
            </div>
          </div>
          <button onClick={() => setView("about")} style={{ color: view === "about" ? "var(--signal)" : "var(--ink)" }}>About</button>
          <button onClick={() => setView("blog")} style={{ color: view === "blog" ? "var(--signal)" : "var(--ink)" }}>Journal</button>
          <button onClick={() => setView("contact")} style={{ color: view === "contact" ? "var(--signal)" : "var(--ink)" }}>Contact</button>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-2" style={{ border: "1px solid var(--line)" }}>
            <Search size={15} style={{ color: "var(--ink-2)" }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setView("shop")}
              placeholder="Search frames…" className="f-mono text-xs bg-transparent outline-none w-36" style={{ color: "var(--ink)" }} />
          </div>
          <button onClick={() => setView("compare")} className="relative hidden sm:block transition-transform active:scale-90" aria-label="Compare">
            <GitCompare size={19} style={{ color: "var(--ink)" }} />
            {compareCount > 0 && <Badge count={compareCount} bump={compareBump} />}
          </button>
          <button onClick={() => setView("wishlist")} className="relative transition-transform active:scale-90" aria-label="Wishlist">
            <Heart size={19} style={{ color: "var(--ink)" }} />
            {wishCount > 0 && <Badge count={wishCount} bump={wishBump} />}
          </button>
          <button onClick={() => setView("account")} className="hidden sm:block transition-transform active:scale-90" aria-label="Account">
            <User size={19} style={{ color: "var(--ink)" }} />
          </button>
          <button onClick={() => setView("cart")} className="relative transition-transform active:scale-90" aria-label="Cart">
            <ShoppingBag size={19} style={{ color: "var(--ink)" }} />
            {cartCount > 0 && <Badge count={cartCount} bump={cartBump} />}
          </button>
        </div>
      </div>

      {openMobile && (
        <div className="md:hidden mobile-menu-enter px-5 pb-5 flex flex-col gap-1 f-mono text-sm uppercase tracking-wide" style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}>
          {[["shop","Shop"],["about","About"],["blog","Journal"],["contact","Contact"],["account","Account"],["compare","Compare"]].map(([k,l]) => (
            <button key={k} className="text-left py-3 border-b" style={{ borderColor: "var(--line)", color: "var(--ink)" }}
              onClick={() => { setView(k); setOpenMobile(false); }}>{l}</button>
          ))}
        </div>
      )}
    </header>
  );
}

function Badge({ count, bump }) {
  return (
    <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center fs-9 f-mono text-white ${bump ? "bump" : ""}`}
      style={{ background: "var(--signal)" }}>{count}</span>
  );
}

function Footer({ setView, openPolicy }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <footer style={{ background: "var(--ink)", color: "#EDEBE4" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={LOGO_WHITE} alt="iZEN" className="h-7 w-auto select-none" draggable="false" />
          </div>
          <p className="text-sm mt-4 max-w-xs" style={{ color: "#B9B6AC" }}>
            Frames built around how eyes actually work all day — light on the face, honest on measurements, backed for a year.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[Instagram, MessageCircle, Mail].map((Icon, i) => (
              <span key={i} className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid #3E5771" }}>
                <Icon size={15} />
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="f-mono fs-11 uppercase tracking-widest mb-4" style={{ color: "var(--signal-2)" }}>Shop</div>
          <div className="flex flex-col gap-2.5 text-sm">
            {CATEGORIES.slice(0, 5).map((c) => (
              <button key={c.key} onClick={() => setView("shop")} className="text-left" style={{ color: "#B9B6AC" }}>{c.label}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="f-mono fs-11 uppercase tracking-widest mb-4" style={{ color: "var(--signal-2)" }}>Company</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <button onClick={() => setView("home")} className="text-left" style={{ color: "#B9B6AC" }}>Home</button>
            <button onClick={() => setView("about")} className="text-left" style={{ color: "#B9B6AC" }}>About iZEN</button>
            <button onClick={() => setView("blog")} className="text-left" style={{ color: "#B9B6AC" }}>Journal</button>
            <button onClick={() => setView("contact")} className="text-left" style={{ color: "#B9B6AC" }}>Contact Us</button>
            <button onClick={() => setView("account")} className="text-left" style={{ color: "#B9B6AC" }}>My Account</button>
          </div>
        </div>
        <div>
          <div className="f-mono fs-11 uppercase tracking-widest mb-4" style={{ color: "var(--signal-2)" }}>Stay in focus</div>
          <p className="text-sm mb-3" style={{ color: "#B9B6AC" }}>New arrivals and lens tips, twice a month.</p>
          {sent ? (
            <div className="text-sm flex items-center gap-2" style={{ color: "var(--signal-2)" }}><Check size={15}/> You're on the list</div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} className="flex">
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                className="f-mono text-xs bg-transparent outline-none px-3 py-2.5 flex-1" style={{ border: "1px solid #3E5771", color: "#fff" }} />
              <button type="submit" className="px-3" style={{ background: "var(--signal)" }}><ArrowRight size={15} /></button>
            </form>
          )}
        </div>
      </div>
      <div className="border-t py-6 px-5 md:px-8" style={{ borderColor: "#2C4A66" }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 f-mono fs-11" style={{ color: "#8B9AAA" }}>
            <button onClick={() => openPolicy("privacy")} className="hover:underline">Privacy Policy</button>
            <button onClick={() => openPolicy("terms")} className="hover:underline">Terms &amp; Conditions</button>
            <button onClick={() => openPolicy("shipping")} className="hover:underline">Shipping Policy</button>
            <button onClick={() => openPolicy("returns")} className="hover:underline">Return &amp; Refund Policy</button>
            <button onClick={() => setView("admin")} className="hover:underline">Admin Panel</button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 f-mono fs-11" style={{ color: "#8B9AAA" }}>
            <span>© 2026 iZEN Eyewear. All rights reserved.</span>
            <span>Made for clearer days.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a href="#" onClick={(e) => e.preventDefault()} aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
      style={{ background: "#25D366" }}>
      <MessageCircle size={24} color="#fff" fill="#fff" />
    </a>
  );
}

/* ============================================================
   HOME
   ============================================================ */

function Home({ setView, openProduct, goShop, addToCart, toggleWishlist, toggleCompare, wishlist, compareList }) {
  const bestSellers = useMemo(() => [...PRODUCTS].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4), []);
  const newArrivals = useMemo(() => PRODUCTS.filter((p) => p.isNew).slice(0, 4), []);
  const [testiIdx, setTestiIdx] = useState(0);
  const visibleTesti = [TESTIMONIALS[testiIdx % 6], TESTIMONIALS[(testiIdx + 1) % 6], TESTIMONIALS[(testiIdx + 2) % 6]];

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--ink)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow tone="light">Autumn/Winter 2026 Collection</Eyebrow>
            <h1 className="f-display text-5xl md:text-6xl lh-tight2 mt-5" style={{ color: "#fff" }}>
              See everything.<br />Feel nothing.
            </h1>
            <p className="mt-6 text-base max-w-md" style={{ color: "#B9B6AC" }}>
              Frames engineered around real face measurements and real daily wear — not just how they photograph.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-9">
              <PrimaryButton onClick={() => goShop()}>Shop the collection <ArrowRight size={15} /></PrimaryButton>
              <OutlineButton onClick={() => setView("about")} inverted>Our story</OutlineButton>
            </div>
          </div>
          <Reveal delay={150} className="relative max-w-sm md:max-w-none mx-auto">
            <div className="group relative ar-45 overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.18)" }}>
              <img src={HERO_IMG_WOMAN} alt="iZEN eyeglasses, worn" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-transparent group-hover:border-white transition-colors duration-300" />
              <span className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-transparent group-hover:border-white transition-colors duration-300" />
              <span className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-transparent group-hover:border-white transition-colors duration-300" />
              <span className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-transparent group-hover:border-white transition-colors duration-300" />
            </div>
            <div className="absolute -bottom-6 -left-4 md:-left-7 px-5 py-3.5" style={{ background: "#fff" }}>
              <Stars rating={4.8} size={12} />
              <div className="f-mono fs-10 mt-1 whitespace-nowrap" style={{ color: "var(--ink)" }}>12,000+ happy customers</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <SectionHeading eyebrow="Featured collections" title="Built around how you actually use your eyes" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { cat: "Computer Glasses", label: "Computer Glasses", desc: "For 8-hour screen days", img: CAT_IMG_COMPUTER },
            { cat: "Women's Sunglasses", label: "Women's Sunglasses", desc: "UV400, on-trend", img: CAT_IMG_WOMEN_SUN },
            { cat: "Men's Sunglasses", label: "Men's Sunglasses", desc: "UV400 protection", img: CAT_IMG_MEN_SUN },
          ].map((c, i) => (
            <Reveal key={c.cat} delay={i * 60}>
            <button onClick={() => goShop(c.cat)} className="group relative h-72 w-full overflow-hidden text-left">
              <img src={c.img} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(21,43,64,0.75), rgba(21,43,64,0.05) 55%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="f-display text-xl text-white">{c.label}</div>
                <div className="text-xs mt-1" style={{ color: "#E8E1D3" }}>{c.desc}</div>
              </div>
              <span className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                <ArrowUpRight size={15} color="#fff" />
              </span>
            </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-20" style={{ background: "var(--paper-2)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <SectionHeading noMargin eyebrow="Most reordered" title="Best sellers" sub="Ranked by verified repeat purchases, not promotion." />
            <button onClick={() => goShop("All", "rating")} className="f-mono fs-11 uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--signal)" }}>View all <ArrowRight size={13} /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {bestSellers.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}>
                <ProductCard product={p} onOpen={openProduct} onAdd={addToCart}
                  onWishlist={toggleWishlist} onCompare={toggleCompare}
                  isWished={wishlist.includes(p.id)} isCompared={compareList.includes(p.id)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <SectionHeading noMargin eyebrow="Just landed" title="New arrivals" />
          <button onClick={() => goShop("All", "featured", true)} className="f-mono fs-11 uppercase tracking-wide flex items-center gap-1.5" style={{ color: "var(--signal)" }}>View all <ArrowRight size={13} /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <ProductCard product={p} onOpen={openProduct} onAdd={addToCart}
                onWishlist={toggleWishlist} onCompare={toggleCompare}
                isWished={wishlist.includes(p.id)} isCompared={compareList.includes(p.id)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20" style={{ background: "var(--paper-2)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Shop by category" title="Find your shape"
            sub="Ten ways into the collection — start wherever fits your day." />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.key} delay={i * 25}>
                <button onClick={() => goShop(c.key)} className="group block w-full text-left" style={{ background: "#fff", border: "1px solid var(--line)" }}>
                  <div className="relative ar-45 overflow-hidden">
                    {c.image ? (
                      <img src={c.image} alt={c.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CARD_GRADIENTS[i % CARD_GRADIENTS.length][0]}, ${CARD_GRADIENTS[i % CARD_GRADIENTS.length][1]})` }}>
                        <GlassesMark className="w-16 h-8" stroke="rgba(255,255,255,0.55)" />
                      </div>
                    )}
                  </div>
                  <div className="p-3.5">
                    <GlassesMark className="w-6 h-3 mb-2" stroke="var(--ink)" sw={3} />
                    <div className="f-display text-sm leading-tight" style={{ color: "var(--ink)" }}>{c.label}</div>
                    <span className="inline-block w-5 h-px my-1.5" style={{ background: "var(--signal)" }} />
                    <div className="f-mono fs-9 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--signal)" }}>Shop now <ArrowRight size={10} /></div>
                  </div>
                </button>
              </Reveal>
            ))}
            <Reveal delay={8 * 25}>
              <button onClick={() => goShop("All", "featured", true)} className="group block w-full text-left" style={{ background: "#fff", border: "1px solid var(--line)" }}>
                <div className="relative ar-45 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CARD_GRADIENTS[0][0]}, ${CARD_GRADIENTS[0][1]})` }}>
                    <GlassesMark className="w-16 h-8" stroke="rgba(255,255,255,0.55)" />
                  </div>
                  <span className="absolute top-2 left-2 f-mono fs-9 uppercase tracking-wide px-2 py-1 text-white" style={{ background: "var(--signal)" }}>New</span>
                </div>
                <div className="p-3.5">
                  <GlassesMark className="w-6 h-3 mb-2" stroke="var(--ink)" sw={3} />
                  <div className="f-display text-sm leading-tight" style={{ color: "var(--ink)" }}>New Arrivals</div>
                  <span className="inline-block w-5 h-px my-1.5" style={{ background: "var(--signal)" }} />
                  <div className="f-mono fs-9 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--signal)" }}>Shop now <ArrowRight size={10} /></div>
                </div>
              </button>
            </Reveal>
            <Reveal delay={9 * 25}>
              <button onClick={() => goShop("All", "rating")} className="group block w-full text-left" style={{ background: "#fff", border: "1px solid var(--line)" }}>
                <div className="relative ar-45 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${CARD_GRADIENTS[1][0]}, ${CARD_GRADIENTS[1][1]})` }}>
                    <GlassesMark className="w-16 h-8" stroke="rgba(255,255,255,0.55)" />
                  </div>
                  <span className="absolute top-2 left-2 f-mono fs-9 uppercase tracking-wide px-2 py-1 text-white" style={{ background: "var(--ink)" }}>Best</span>
                </div>
                <div className="p-3.5">
                  <GlassesMark className="w-6 h-3 mb-2" stroke="var(--ink)" sw={3} />
                  <div className="f-display text-sm leading-tight" style={{ color: "var(--ink)" }}>Best Sellers</div>
                  <span className="inline-block w-5 h-px my-1.5" style={{ background: "var(--signal)" }} />
                  <div className="f-mono fs-9 uppercase tracking-wide flex items-center gap-1" style={{ color: "var(--signal)" }}>Shop now <ArrowRight size={10} /></div>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="relative ar-45" style={{ background: "linear-gradient(135deg, #16324A, #6E7784)" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <GlassesMark className="w-32 h-16" stroke="rgba(255,255,255,0.6)" />
          </div>
        </div>
        <div>
          <Eyebrow>Since 2019</Eyebrow>
          <h2 className="f-display text-3xl md:text-4xl mt-4" style={{ color: "var(--ink)" }}>
            We started because our own frames kept letting us down.
          </h2>
          <p className="mt-5 fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>
            iZEN began in a two-optometrist studio frustrated with frames that photographed well and fit badly.
            Every silhouette we sell is measured against real faces before it's measured against trends — bridge width,
            temple length, and pantoscopic tilt come before finish and color.
          </p>
          <p className="mt-4 fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>
            Today the same team still signs off on every new shape before it ships.
          </p>
          <OutlineButton onClick={() => setView("about")} className="mt-7">Read our full story</OutlineButton>
        </div>
      </section>

      {/* WHY CHOOSE IZEN */}
      <section className="py-20" style={{ background: "var(--paper-2)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading eyebrow="Why iZEN" title="What you're actually paying for" align="center" />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {WHY_ITEMS.map((w, i) => (
              <Reveal key={w.title} delay={i * 55} className="text-center flex flex-col items-center">
                <span className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: "var(--ink)" }}>
                  <w.icon size={19} color="var(--signal-2)" strokeWidth={1.6} />
                </span>
                <div className="f-display text-lg" style={{ color: "var(--ink)" }}>{w.title}</div>
                <div className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>{w.text}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <SectionHeading eyebrow="From the reviews" title="What customers notice first" />
          <div className="flex gap-2 mb-10">
            <button onClick={() => setTestiIdx((i) => (i + 5) % 6)} className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid var(--line)" }}>
              <ChevronLeft size={16} style={{ color: "var(--ink)" }} />
            </button>
            <button onClick={() => setTestiIdx((i) => (i + 1) % 6)} className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid var(--line)" }}>
              <ChevronRight size={16} style={{ color: "var(--ink)" }} />
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {visibleTesti.map((t, i) => (
            <Reveal key={`${testiIdx}-${i}`} delay={i * 60} className="p-7" style={{ border: "1px solid var(--line)" }}>
              <Stars rating={t.rating} />
              <p className="f-display text-lg mt-4 leading-snug" style={{ color: "var(--ink)" }}>"{t.text}"</p>
              <div className="f-mono text-xs mt-5" style={{ color: "var(--ink-2)" }}>{t.name} · {t.city}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-16" style={{ background: "var(--paper-2)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <Eyebrow>@izen.eyewear</Eyebrow>
            <span className="f-mono text-xs" style={{ color: "var(--ink-2)" }}>Tag us to be featured</span>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CARD_GRADIENTS.concat(CARD_GRADIENTS.slice(0,2)).map((g, i) => (
              <Reveal key={i} delay={i * 25} className="aspect-square relative overflow-hidden group cursor-pointer" style={{ background: `linear-gradient(135deg, ${g[0]}, ${g[1]})` }}>
                <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:scale-110 transition-transform duration-500">
                  <Instagram size={20} color="#fff" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterBand />

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20">
        <SectionHeading eyebrow="Questions" title="Frequently asked" align="center" />
        <div>{FAQS.map((f, i) => <Reveal key={f.q} delay={i * 35}><FAQItem {...f} /></Reveal>)}</div>
      </section>
    </div>
  );
}

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section className="py-20" style={{ background: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto px-5 text-center flex flex-col items-center">
        <Sparkles size={22} color="var(--signal-2)" />
        <h2 className="f-display text-3xl mt-4" style={{ color: "#fff" }}>Get first look at new shapes</h2>
        <p className="text-sm mt-3" style={{ color: "#B9B6AC" }}>Occasional emails. Unsubscribe whenever.</p>
        {sent ? (
          <div className="mt-6 flex items-center gap-2 f-mono text-sm" style={{ color: "var(--signal-2)" }}><Check size={16}/> Thanks — check your inbox soon.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} className="flex w-full max-w-sm mt-7">
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
              className="f-mono text-sm bg-transparent outline-none px-4 py-3 flex-1" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }} />
            <PrimaryButton type="submit">Join</PrimaryButton>
          </form>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   SHOP
   ============================================================ */

function Shop({ search, initCategory = "All", initSort = "featured", initOnlyNew = false, openProduct, addToCart, toggleWishlist, toggleCompare, wishlist, compareList }) {
  const [category, setCategory] = useState(initCategory);
  const [sort, setSort] = useState(initSort);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [shape, setShape] = useState("All");
  const [onlyNew, setOnlyNew] = useState(initOnlyNew);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (shape !== "All" && p.shape !== shape) return false;
      if (onlyNew && !p.isNew) return false;
      if ((p.salePrice || p.price) > maxPrice) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    if (sort === "price-desc") list = [...list].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, sort, maxPrice, shape, onlyNew, search]);

  const heading = category !== "All" ? category : onlyNew ? "New Arrivals" : sort === "rating" ? "Best Sellers" : "Shop all frames";

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <Eyebrow>{filtered.length} frames{search ? ` matching "${search}"` : ""}</Eyebrow>
      <h1 className="f-display text-4xl mt-3" style={{ color: "var(--ink)" }}>{heading}</h1>

      <div className="flex gap-10 mt-10">
        <aside className={`w-64 flex-shrink-0 ${showFilters ? "block" : "hidden"} md:block`}>
          <div className="mb-8">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Category</div>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => { setCategory("All"); setOnlyNew(false); }} className="text-left" style={{ color: category === "All" && !onlyNew ? "var(--signal)" : "var(--ink)" }}>All frames</button>
              {CATEGORIES.map((c) => (
                <button key={c.key} onClick={() => { setCategory(c.key); setOnlyNew(false); }} className="text-left" style={{ color: category === c.key ? "var(--signal)" : "var(--ink)" }}>{c.label}</button>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Collections</div>
            <div className="flex flex-col gap-2 text-sm">
              <button onClick={() => { setOnlyNew(true); setCategory("All"); }} className="text-left" style={{ color: onlyNew ? "var(--signal)" : "var(--ink)" }}>New Arrivals</button>
              <button onClick={() => { setSort("rating"); setCategory("All"); setOnlyNew(false); }} className="text-left" style={{ color: sort === "rating" ? "var(--signal)" : "var(--ink)" }}>Best Sellers</button>
            </div>
          </div>
          <div className="mb-8">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Shape</div>
            <div className="flex flex-wrap gap-2">
              {["All", ...FRAME_SHAPES].map((s) => (
                <button key={s} onClick={() => setShape(s)} className="f-mono fs-11 px-2.5 py-1.5"
                  style={{ border: `1px solid ${shape === s ? "var(--signal)" : "var(--line)"}`, color: shape === s ? "var(--signal)" : "var(--ink-2)" }}>{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Max price: ₹{maxPrice.toLocaleString("en-IN")}</div>
            <input type="range" min="1500" max="6000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-signal" />
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden f-mono text-xs uppercase flex items-center gap-1.5" style={{ color: "var(--ink)" }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
            <div className="ml-auto flex items-center gap-2">
              <span className="f-mono text-xs" style={{ color: "var(--ink-2)" }}>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="f-mono text-xs px-2 py-1.5 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)", background: "var(--paper)" }}>
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="f-display text-xl" style={{ color: "var(--ink)" }}>No frames match those filters.</p>
              <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>Try widening the price range or clearing the shape filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 9) * 35}>
                  <ProductCard product={p} onOpen={openProduct} onAdd={addToCart}
                    onWishlist={toggleWishlist} onCompare={toggleCompare}
                    isWished={wishlist.includes(p.id)} isCompared={compareList.includes(p.id)} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT DETAIL
   ============================================================ */

function ProductDetail({ productId, setView, openProduct, addToCart, buyNow, toggleWishlist, toggleCompare, wishlist, compareList }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const isReading = product.category === "Reading Glasses";
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [lens, setLens] = useState(product.lensOptions[0]);
  const [tab, setTab] = useState("desc");
  const [rotated, setRotated] = useState(false);
  const [pincode, setPincode] = useState("");
  const [eta, setEta] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => { setColor(product.colors[0]); setSize(product.sizes[0]); setLens(product.lensOptions[0]); setTab("desc"); window.scrollTo(0, 0); }, [productId]);

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const fbt = [product, ...PRODUCTS.filter((p) => p.category !== product.category && p.id !== product.id).sort((a, b) => b.rating - a.rating).slice(0, 2)];
  const finalPrice = (product.salePrice || product.price) + lens.delta;

  const handleShare = async () => {
    const text = `${product.name} — ₹${(product.salePrice || product.price).toLocaleString("en-IN")} on iZEN Opticals`;
    try {
      if (navigator.share) { await navigator.share({ title: product.name, text }); }
      else if (navigator.clipboard) { await navigator.clipboard.writeText(text); setShared(true); setTimeout(() => setShared(false), 1800); }
    } catch (e) { /* share cancelled */ }
  };

  const reviews = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({
    name: ["Priya M.", "Karan V.", "Divya S."][i],
    rating: 4 + (i % 2),
    text: [
      "Fit was true to the size guide — no surprises when it arrived.",
      "Lightweight even after wearing it a full workday.",
      "Color in person is slightly deeper than the card, in a good way.",
    ][i],
  })), [productId]);

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <div className="f-mono text-xs flex items-center gap-2 mb-8" style={{ color: "var(--ink-2)" }}>
        <button onClick={() => setView("shop")}>Shop</button> <ChevronRight size={12} /> <span>{product.category}</span> <ChevronRight size={12} /> <span style={{ color: "var(--ink)" }}>{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* GALLERY */}
        <div>
          <div className="relative">
            <ProductImage product={product} className="w-full aspect-square" iconSize="w-24 h-24" />
            <button onClick={() => setRotated(!rotated)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 f-mono fs-10 uppercase tracking-wide px-3 py-2 flex items-center gap-1.5"
              style={{ background: "rgba(255,255,255,0.92)", color: "var(--ink)" }}>
              <RotateCcw size={12} className="transition-transform duration-700" style={{ transform: rotated ? "rotate(180deg)" : "none" }} />
              {rotated ? "Back to front view" : "Drag for 360° view"}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            <ProductImage product={product} className="aspect-square" iconSize="w-8 h-8" />
            <ProductImage product={product} className="aspect-square" iconSize="w-8 h-8" />
            <ProductImage product={product} className="aspect-square" iconSize="w-8 h-8" />
            <button className="relative aspect-square flex items-center justify-center" style={{ background: "var(--ink)" }}>
              <Play size={20} color="#fff" fill="#fff" />
              <span className="absolute bottom-1 f-mono fs-8 text-white">Video</span>
            </button>
          </div>
        </div>

        {/* INFO */}
        <div>
          <div className="f-mono fs-11 uppercase tracking-wide" style={{ color: "var(--ink-2)" }}>{product.category} · SKU {product.sku}</div>
          <h1 className="f-display text-3xl md:text-4xl mt-2" style={{ color: "var(--ink)" }}>{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Stars rating={product.rating} />
            <span className="text-sm f-mono" style={{ color: "var(--ink-2)" }}>{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          <div className="mt-5"><Price price={product.price + lens.delta} salePrice={product.salePrice ? product.salePrice + lens.delta : null} size="text-2xl" /></div>
          <p className="text-sm mt-2" style={{ color: product.inStock ? "#5C7A5A" : "var(--signal)" }}>
            {product.inStock ? "In stock — ships in 1–2 days" : "Currently out of stock"}
          </p>

          <p className="mt-6 fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>{product.description}</p>

          {/* COLOR */}
          <div className="mt-7">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Color — {color.name}</div>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c)} className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ border: `2px solid ${color.name === c.name ? "var(--signal)" : "transparent"}` }}>
                  <span className="w-7 h-7 rounded-full" style={{ background: c.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mt-7">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Available size — {size}</div>
            <div className="flex gap-2.5">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className="f-mono text-xs px-4 py-2.5"
                  style={{ border: `1px solid ${size === s ? "var(--signal)" : "var(--line)"}`, color: size === s ? "var(--signal)" : "var(--ink)" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* LENS SELECTOR */}
          <div className="mt-7">
            <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>{isReading ? "Lens power" : "Lens type"}</div>
            <div className="grid grid-cols-2 gap-2.5">
              {product.lensOptions.map((l) => (
                <button key={l.name} onClick={() => setLens(l)} className="text-left px-3.5 py-3"
                  style={{ border: `1px solid ${lens.name === l.name ? "var(--signal)" : "var(--line)"}` }}>
                  <div className="text-sm" style={{ color: "var(--ink)" }}>{l.name}</div>
                  <div className="f-mono fs-11 mt-0.5" style={{ color: "var(--ink-2)" }}>{l.delta === 0 ? "Included" : `+₹${l.delta}`}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <PrimaryButton disabled={!product.inStock} onClick={() => { addToCart(product, color, lens, 1); setAdded(true); setTimeout(() => setAdded(false), 1800); }} className="flex-1">
              {added ? <><Check size={15}/> Added</> : <>Add to cart · ₹{finalPrice.toLocaleString("en-IN")}</>}
            </PrimaryButton>
            <button onClick={() => toggleWishlist(product.id)} className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid var(--line)" }}>
              <Heart size={17} style={{ color: wishlist.includes(product.id) ? "var(--signal)" : "var(--ink)" }} fill={wishlist.includes(product.id) ? "var(--signal)" : "none"} />
            </button>
            <button onClick={() => toggleCompare(product.id)} className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid var(--line)" }}>
              <GitCompare size={17} style={{ color: compareList.includes(product.id) ? "var(--signal)" : "var(--ink)" }} />
            </button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <OutlineButton disabled={!product.inStock} onClick={() => buyNow(product, color, lens, 1)} className="flex-1">Buy now</OutlineButton>
            <button onClick={handleShare} className="w-12 h-12 flex items-center justify-center flex-shrink-0 relative" style={{ border: "1px solid var(--line)" }} aria-label="Share product">
              <Share2 size={16} style={{ color: "var(--ink)" }} />
              {shared && <span className="absolute -top-9 right-0 f-mono fs-9 uppercase tracking-wide px-2 py-1 whitespace-nowrap toast-in" style={{ background: "var(--ink)", color: "#fff" }}>Link copied</span>}
            </button>
          </div>

          {/* SIZE GUIDE + DELIVERY */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button onClick={() => setSizeGuideOpen(!sizeGuideOpen)} className="flex-1 text-sm flex items-center justify-between px-4 py-3" style={{ border: "1px solid var(--line)" }}>
              <span style={{ color: "var(--ink)" }}>Frame size guide</span>
              <ChevronDown size={15} style={{ transform: sizeGuideOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
          </div>
          {sizeGuideOpen && (
            <div className="mt-3 p-4 grid grid-cols-3 gap-4 f-mono text-xs" style={{ border: "1px solid var(--line)" }}>
              <div><div style={{ color: "var(--ink-2)" }}>Lens width</div><div className="mt-1" style={{ color: "var(--ink)" }}>{product.width}mm</div></div>
              <div><div style={{ color: "var(--ink-2)" }}>Bridge</div><div className="mt-1" style={{ color: "var(--ink)" }}>{product.bridge}mm</div></div>
              <div><div style={{ color: "var(--ink-2)" }}>Temple length</div><div className="mt-1" style={{ color: "var(--ink)" }}>{product.templeLength}mm</div></div>
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} maxLength={6} placeholder="Enter pincode"
              className="flex-1 f-mono text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
            <OutlineButton onClick={() => { if (pincode.length === 6) setEta(3 + (Number(pincode[0]) % 4)); }}>Check</OutlineButton>
          </div>
          {eta && (
            <div className="mt-2 f-mono text-xs flex items-center gap-1.5" style={{ color: "#5C7A5A" }}>
              <Truck size={13} /> Estimated delivery in {eta} days to {pincode}
            </div>
          )}

          {/* TABS */}
          <div className="mt-10 border-t" style={{ borderColor: "var(--line)" }}>
            <div className="flex gap-6 mt-1">
              {[["desc","Description"],["specs","Specifications"],["reviews",`Reviews (${product.reviewCount})`],["shipping","Shipping & returns"]].map(([k,l]) => (
                <button key={k} onClick={() => setTab(k)} className="f-mono fs-11 uppercase tracking-wide py-4"
                  style={{ color: tab === k ? "var(--signal)" : "var(--ink-2)", borderBottom: tab === k ? "2px solid var(--signal)" : "2px solid transparent" }}>{l}</button>
              ))}
            </div>
            <div className="py-5 text-sm leading-relaxed" style={{ color: "var(--ink-2)" }}>
              {tab === "desc" && <p>{product.description} Available in {product.colors.length} colorways with {product.lensOptions.length} lens finishes, each fitted in-house.</p>}
              {tab === "specs" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                  {[
                    ["Frame material", product.material],
                    ["Weight", `${product.weight}g`],
                    ["Frame shape", product.shape],
                    ["Lens width", `${product.width}mm`],
                    ["Bridge width", `${product.bridge}mm`],
                    ["Temple length", `${product.templeLength}mm`],
                    ["Available sizes", product.sizes.join(", ")],
                    ["UV protection", product.uvProtection ? "Yes, UV400" : "Not applicable"],
                    ["Warranty", product.warranty],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="f-mono fs-10 uppercase tracking-wide" style={{ color: "var(--ink-2)", opacity: 0.7 }}>{k}</div>
                      <div className="text-sm mt-1" style={{ color: "var(--ink)" }}>{v}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "reviews" && (
                <div className="flex flex-col gap-5">
                  {reviews.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2"><Stars rating={r.rating} size={12} /><span className="f-mono text-xs" style={{ color: "var(--ink)" }}>{r.name}</span></div>
                      <p className="mt-1.5">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "shipping" && <p>Ships in 1–2 days for ready lenses, 4–6 days for prescription orders, via Shiprocket (integration pending in this demo). Free returns within 14 days on unworn frames; one free exchange included.</p>}
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER */}
      <section className="mt-20">
        <SectionHeading eyebrow="Complete the order" title="Frequently bought together" />
        <div className="flex flex-wrap gap-6 items-center">
          {fbt.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              {i > 0 && <Plus size={16} style={{ color: "var(--ink-2)" }} />}
              <button onClick={() => openProduct(p.id)} className="w-28">
                <ProductImage product={p} className="aspect-square" iconSize="w-8 h-8" />
                <div className="f-mono fs-10 mt-2 truncate" style={{ color: "var(--ink)" }}>{p.name}</div>
              </button>
            </div>
          ))}
          <PrimaryButton onClick={() => fbt.forEach((p) => addToCart(p, p.colors[0], p.lensOptions[0], 1))} className="ml-auto">Add all to cart</PrimaryButton>
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-20">
        <SectionHeading eyebrow="You might also like" title={`More in ${product.category}`} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={openProduct} onAdd={addToCart}
              onWishlist={toggleWishlist} onCompare={toggleCompare}
              isWished={wishlist.includes(p.id)} isCompared={compareList.includes(p.id)} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   CART / WISHLIST / COMPARE
   ============================================================ */

function CartPage({ cart, updateQty, removeFromCart, coupon, setCoupon, setView, openProduct }) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const total = cart.reduce((s, l) => s + ((l.product.salePrice || l.product.price) + l.lens.delta) * l.qty, 0);
  const cartProductIds = cart.map((l) => l.product.id);
  const recommended = [...PRODUCTS].filter((p) => !cartProductIds.includes(p.id) && p.inStock).sort((a, b) => b.rating - a.rating).slice(0, 3);
  const discount = coupon ? (coupon.type === "percent" ? Math.round((total * coupon.value) / 100) : coupon.value) : 0;
  const shipping = total > 2499 ? 0 : 99;
  const grandTotal = Math.max(0, total - discount) + shipping;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) { setCoupon({ code, ...COUPONS[code] }); setCouponError(""); }
    else { setCouponError("That code isn't valid."); setCoupon(null); }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <ShoppingBag size={32} style={{ color: "var(--ink-2)" }} className="mx-auto" />
        <h1 className="f-display text-3xl mt-5" style={{ color: "var(--ink)" }}>Your cart is empty</h1>
        <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>Frames you add will show up here.</p>
        <PrimaryButton onClick={() => setView("shop")} className="mt-7">Browse frames</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-12">
      <div className="md:col-span-2">
        <h1 className="f-display text-3xl mb-8" style={{ color: "var(--ink)" }}>Your cart ({cart.length})</h1>
        <div className="flex flex-col gap-6">
          {cart.map((line) => (
            <div key={line.lineId} className="flex gap-4 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
              <button onClick={() => openProduct(line.product.id)} className="w-24 flex-shrink-0">
                <ProductImage product={line.product} className="aspect-square" iconSize="w-8 h-8" />
              </button>
              <div className="flex-1">
                <div className="flex justify-between">
                  <button onClick={() => openProduct(line.product.id)} className="f-display text-lg" style={{ color: "var(--ink)" }}>{line.product.name}</button>
                  <button onClick={() => removeFromCart(line.lineId)}><Trash2 size={16} style={{ color: "var(--ink-2)" }} /></button>
                </div>
                <div className="f-mono text-xs mt-1" style={{ color: "var(--ink-2)" }}>{line.color.name} · {line.lens.name}</div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3" style={{ border: "1px solid var(--line)" }}>
                    <button onClick={() => updateQty(line.lineId, -1)} className="px-3 py-1.5"><Minus size={12} /></button>
                    <span className="f-mono text-sm">{line.qty}</span>
                    <button onClick={() => updateQty(line.lineId, 1)} className="px-3 py-1.5"><Plus size={12} /></button>
                  </div>
                  <Price price={(line.product.price + line.lens.delta) * line.qty} salePrice={line.product.salePrice ? (line.product.salePrice + line.lens.delta) * line.qty : null} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <OutlineButton onClick={() => setView("shop")} className="mt-8">Continue shopping</OutlineButton>
        <div className="mt-10">
          <div className="f-mono fs-11 uppercase tracking-wide mb-4" style={{ color: "var(--ink-2)" }}>You may also like</div>
          <div className="grid grid-cols-3 gap-4">
            {recommended.map((p) => (
              <button key={p.id} onClick={() => openProduct(p.id)}>
                <ProductImage product={p} className="aspect-square" iconSize="w-6 h-6" />
                <div className="f-mono fs-10 mt-1.5 truncate" style={{ color: "var(--ink)" }}>{p.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="h-fit p-6" style={{ border: "1px solid var(--line)" }}>
        <div className="f-display text-xl mb-5" style={{ color: "var(--ink)" }}>Order summary</div>

        <div className="mb-5">
          <div className="f-mono fs-11 uppercase tracking-wide mb-2" style={{ color: "var(--ink-2)" }}>Coupon code</div>
          {coupon ? (
            <div className="flex items-center justify-between px-3 py-2.5" style={{ border: "1px solid var(--signal)" }}>
              <span className="f-mono text-xs flex items-center gap-1.5" style={{ color: "var(--signal)" }}><Tag size={13} /> {coupon.code} — {coupon.label}</span>
              <button onClick={() => { setCoupon(null); setCouponInput(""); }}><X size={14} style={{ color: "var(--ink-2)" }} /></button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="e.g. IZEN10"
                className="flex-1 f-mono text-xs px-3 py-2.5 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
              <OutlineButton onClick={applyCoupon}>Apply</OutlineButton>
            </div>
          )}
          {couponError && <p className="text-xs mt-1.5" style={{ color: "var(--signal)" }}>{couponError}</p>}
        </div>

        <div className="flex justify-between text-sm mb-2" style={{ color: "var(--ink-2)" }}><span>Subtotal</span><span className="f-mono">₹{total.toLocaleString("en-IN")}</span></div>
        {discount > 0 && <div className="flex justify-between text-sm mb-2" style={{ color: "var(--signal)" }}><span>Discount</span><span className="f-mono">−₹{discount.toLocaleString("en-IN")}</span></div>}
        <div className="flex justify-between text-sm mb-2" style={{ color: "var(--ink-2)" }}><span>Shipping</span><span className="f-mono">{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
        <div className="flex justify-between text-lg mt-4 pt-4 border-t" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
          <span className="f-display">Total</span><span className="f-mono">₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
        <PrimaryButton onClick={() => setView("checkout")} className="w-full mt-6">Proceed to checkout <ArrowRight size={15} /></PrimaryButton>
      </div>
    </div>
  );
}

function WishlistPage({ wishlist, setView, openProduct, addToCart, toggleWishlist, toggleCompare, compareList }) {
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <Heart size={32} style={{ color: "var(--ink-2)" }} className="mx-auto" />
        <h1 className="f-display text-3xl mt-5" style={{ color: "var(--ink)" }}>Nothing saved yet</h1>
        <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>Tap the heart on any frame to save it here.</p>
        <PrimaryButton onClick={() => setView("shop")} className="mt-7">Browse frames</PrimaryButton>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <h1 className="f-display text-3xl mb-8" style={{ color: "var(--ink)" }}>Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={i * 40}>
            <ProductCard product={p} onOpen={openProduct} onAdd={addToCart}
              onWishlist={toggleWishlist} onCompare={toggleCompare} isWished isCompared={compareList.includes(p.id)} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function ComparePage({ compareList, toggleCompare, setView, openProduct }) {
  const items = PRODUCTS.filter((p) => compareList.includes(p.id));
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <GitCompare size={32} style={{ color: "var(--ink-2)" }} className="mx-auto" />
        <h1 className="f-display text-3xl mt-5" style={{ color: "var(--ink)" }}>Nothing to compare yet</h1>
        <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>Add up to 4 frames from the shop to compare specs side by side.</p>
        <PrimaryButton onClick={() => setView("shop")} className="mt-7">Browse frames</PrimaryButton>
      </div>
    );
  }
  const rows = [
    ["Price", (p) => `₹${(p.salePrice || p.price).toLocaleString("en-IN")}`],
    ["Rating", (p) => `${p.rating} ★ (${p.reviewCount})`],
    ["Shape", (p) => p.shape],
    ["Lens width", (p) => `${p.width}mm`],
    ["Bridge", (p) => `${p.bridge}mm`],
    ["Temple length", (p) => `${p.templeLength}mm`],
    ["Colors", (p) => p.colors.length],
    ["Stock", (p) => (p.inStock ? "In stock" : "Out of stock")],
  ];
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 overflow-x-auto">
      <h1 className="f-display text-3xl mb-8" style={{ color: "var(--ink)" }}>Compare ({items.length}/4)</h1>
      <table className="w-full minw-comparetable border-collapse">
        <thead>
          <tr>
            <td className="w-36"></td>
            {items.map((p) => (
              <td key={p.id} className="align-top px-3 pb-4">
                <div className="relative">
                  <button onClick={() => toggleCompare(p.id)} className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.9)" }}>
                    <X size={13} />
                  </button>
                  <button onClick={() => openProduct(p.id)} className="w-full"><ProductImage product={p} className="aspect-square" iconSize="w-8 h-8" /></button>
                </div>
                <button onClick={() => openProduct(p.id)} className="f-display text-sm mt-2 block text-left" style={{ color: "var(--ink)" }}>{p.name}</button>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, fn]) => (
            <tr key={label} className="border-t" style={{ borderColor: "var(--line)" }}>
              <td className="f-mono fs-11 uppercase py-3 pr-3" style={{ color: "var(--ink-2)" }}>{label}</td>
              {items.map((p) => <td key={p.id} className="text-sm py-3 px-3" style={{ color: "var(--ink)" }}>{fn(p)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
   CHECKOUT / ACCOUNT
   ============================================================ */

function CheckoutPage({ cart, coupon, setView, clearCart }) {
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "", payment: "card" });
  const total = cart.reduce((s, l) => s + ((l.product.salePrice || l.product.price) + l.lens.delta) * l.qty, 0);
  const discount = coupon ? (coupon.type === "percent" ? Math.round((total * coupon.value) / 100) : coupon.value) : 0;
  const shipping = total > 2499 ? 0 : 99;
  const grandTotal = Math.max(0, total - discount) + shipping;

  if (cart.length === 0 && step !== "done") {
    return (
      <div className="max-w-2xl mx-auto px-5 py-28 text-center">
        <h1 className="f-display text-3xl" style={{ color: "var(--ink)" }}>Your cart is empty</h1>
        <PrimaryButton onClick={() => setView("shop")} className="mt-6">Browse frames</PrimaryButton>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="max-w-lg mx-auto px-5 py-28 text-center">
        <span className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ background: "var(--ink)" }}>
          <Check size={22} color="var(--signal-2)" />
        </span>
        <h1 className="f-display text-3xl mt-6" style={{ color: "var(--ink)" }}>Order placed</h1>
        <p className="text-sm mt-3" style={{ color: "var(--ink-2)" }}>
          Order #IZ{Math.floor(10000 + Math.random() * 89999)} is confirmed. In production, this triggers an order-confirmation email
          {form.email ? ` to ${form.email}` : ""}, followed by shipped/delivered updates via the email automation and Shiprocket integration points.
        </p>
        <PrimaryButton onClick={() => { clearCart(); setView("home"); }} className="mt-8">Continue shopping</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-3 gap-12">
      <form className="md:col-span-2" onSubmit={(e) => { e.preventDefault(); setStep("done"); }}>
        <h1 className="f-display text-3xl mb-8" style={{ color: "var(--ink)" }}>Checkout</h1>
        <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Customer details</div>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
          <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
          <input required type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="sm:col-span-2 text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
          <input required placeholder="Shipping address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="sm:col-span-2 text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
          <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
          <input required placeholder="Pincode" maxLength={6} value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} />
        </div>
        <div className="f-mono fs-11 uppercase tracking-wide mb-3" style={{ color: "var(--ink-2)" }}>Payment method</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[["card","Credit/Debit Card"],["upi","UPI"],["netbanking","Net Banking"],["cod","Cash on delivery"]].map(([k,l]) => (
            <button type="button" key={k} onClick={() => setForm({ ...form, payment: k })} className="text-sm py-3 px-2"
              style={{ border: `1px solid ${form.payment === k ? "var(--signal)" : "var(--line)"}`, color: form.payment === k ? "var(--signal)" : "var(--ink)" }}>{l}</button>
          ))}
        </div>
        <p className="text-xs mb-6" style={{ color: "var(--ink-2)" }}>Payment gateway integration (Razorpay — cards, UPI, net banking) connects here; this is a front-end demo flow.</p>
        <PrimaryButton type="submit" className="w-full">Place order · ₹{grandTotal.toLocaleString("en-IN")}</PrimaryButton>
      </form>
      <div className="h-fit p-6" style={{ border: "1px solid var(--line)" }}>
        <div className="f-display text-xl mb-5" style={{ color: "var(--ink)" }}>Order summary</div>
        <div className="flex flex-col gap-3 mb-4">
          {cart.map((l) => (
            <div key={l.lineId} className="flex justify-between text-sm">
              <span style={{ color: "var(--ink-2)" }}>{l.product.name} × {l.qty}</span>
              <span className="f-mono" style={{ color: "var(--ink)" }}>₹{((l.product.salePrice || l.product.price) + l.lens.delta) * l.qty}</span>
            </div>
          ))}
        </div>
        {coupon && (
          <div className="flex justify-between text-sm pt-4 border-t" style={{ borderColor: "var(--line)", color: "var(--signal)" }}>
            <span className="flex items-center gap-1.5"><Tag size={12} /> {coupon.code}</span><span className="f-mono">−₹{discount.toLocaleString("en-IN")}</span>
          </div>
        )}
        <div className="flex justify-between text-sm pt-4 border-t" style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
        <div className="flex justify-between text-lg mt-3 pt-3 border-t" style={{ borderColor: "var(--line)", color: "var(--ink)" }}>
          <span className="f-display">Total</span><span className="f-mono">₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}

function AccountPage({ setView, user, setUser, wishCount }) {
  const [tab, setTab] = useState("profile");
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-5 py-16">
        <div className="flex mb-8" style={{ border: "1px solid var(--line)" }}>
          <button onClick={() => setAuthMode("login")} className="flex-1 f-mono fs-11 uppercase tracking-wide py-3 flex items-center justify-center gap-1.5"
            style={{ background: authMode === "login" ? "var(--ink)" : "transparent", color: authMode === "login" ? "#fff" : "var(--ink)" }}>
            <LogIn size={13} /> Login
          </button>
          <button onClick={() => setAuthMode("register")} className="flex-1 f-mono fs-11 uppercase tracking-wide py-3 flex items-center justify-center gap-1.5"
            style={{ background: authMode === "register" ? "var(--ink)" : "transparent", color: authMode === "register" ? "#fff" : "var(--ink)" }}>
            <UserPlus size={13} /> Register
          </button>
        </div>
        <h1 className="f-display text-3xl" style={{ color: "var(--ink)" }}>{authMode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p className="text-sm mt-2 mb-7" style={{ color: "var(--ink-2)" }}>
          {authMode === "login" ? "Sign in to see your orders, wishlist, and saved addresses." : "Save your details for faster checkout next time."}
        </p>
        <form onSubmit={(e) => { e.preventDefault(); setUser({ name: authForm.name || "Guest User", email: authForm.email }); }} className="flex flex-col gap-4">
          {authMode === "register" && (
            <input required placeholder="Full name" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
              className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)" }} />
          )}
          <input required type="email" placeholder="Email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)" }} />
          <input required type="password" placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
            className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)" }} />
          <PrimaryButton type="submit" className="mt-2">{authMode === "login" ? "Log in" : "Create account"}</PrimaryButton>
        </form>
        <p className="fs-11 mt-4" style={{ color: "var(--ink-2)" }}>Demo auth — no password is checked or stored.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
        <div>
          <h1 className="f-display text-3xl" style={{ color: "var(--ink)" }}>My account</h1>
          <p className="text-sm mt-1" style={{ color: "var(--ink-2)" }}>Signed in as {user.email || user.name}</p>
        </div>
        <OutlineButton onClick={() => setUser(null)}>Log out</OutlineButton>
      </div>
      <div className="grid md:grid-cols-4 gap-10">
        <div className="flex md:flex-col gap-1 overflow-x-auto">
          {[["profile","Profile"],["orders","Orders"],["wishlist",`Wishlist${wishCount ? ` (${wishCount})` : ""}`],["addresses","Addresses"],["prescriptions","Prescriptions"]].map(([k,l]) => (
            <button key={k} onClick={() => (k === "wishlist" ? setView("wishlist") : setTab(k))} className="text-left px-4 py-3 f-mono text-xs uppercase tracking-wide whitespace-nowrap"
              style={{ background: tab === k ? "var(--ink)" : "transparent", color: tab === k ? "#fff" : "var(--ink-2)" }}>{l}</button>
          ))}
        </div>
        <div className="md:col-span-3">
          {tab === "profile" && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-md">
              <input placeholder="Full name" defaultValue={user.name} className="text-sm px-4 py-3" style={{ border: "1px solid var(--line)" }} />
              <input placeholder="Email" defaultValue={user.email} className="text-sm px-4 py-3" style={{ border: "1px solid var(--line)" }} />
              <input placeholder="Phone" className="sm:col-span-2 text-sm px-4 py-3" style={{ border: "1px solid var(--line)" }} />
              <OutlineButton className="sm:col-span-2 w-fit">Save changes</OutlineButton>
            </div>
          )}
          {tab === "orders" && (
            <div className="py-16 text-center" style={{ border: "1px dashed var(--line)" }}>
              <p className="f-display text-lg" style={{ color: "var(--ink)" }}>No orders yet</p>
              <p className="text-sm mt-1" style={{ color: "var(--ink-2)" }}>Orders placed will appear here.</p>
              <OutlineButton onClick={() => setView("shop")} className="mt-5">Start shopping</OutlineButton>
            </div>
          )}
          {tab === "addresses" && (
            <div className="py-16 text-center" style={{ border: "1px dashed var(--line)" }}>
              <MapPin size={20} className="mx-auto" style={{ color: "var(--ink-2)" }} />
              <p className="f-display text-lg mt-3" style={{ color: "var(--ink)" }}>No saved addresses</p>
              <OutlineButton className="mt-5">Add an address</OutlineButton>
            </div>
          )}
          {tab === "prescriptions" && (
            <div className="py-16 text-center" style={{ border: "1px dashed var(--line)" }}>
              <p className="f-display text-lg" style={{ color: "var(--ink)" }}>No prescriptions on file</p>
              <p className="text-sm mt-1" style={{ color: "var(--ink-2)" }}>Upload one at checkout or here for faster reordering.</p>
              <OutlineButton className="mt-5">Upload prescription</OutlineButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   BLOG / ABOUT / CONTACT
   ============================================================ */

function BlogPage({ setView, openPost }) {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
      <Eyebrow>The Journal</Eyebrow>
      <h1 className="f-display text-4xl mt-3 mb-10" style={{ color: "var(--ink)" }}>Notes on frames, lenses, and eye care</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, i) => (
          <Reveal key={post.id} delay={i * 55}>
          <button onClick={() => openPost(post.id)} className="text-left group w-full">
            <div className="ar-43 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${CARD_GRADIENTS[i % CARD_GRADIENTS.length][0]}, ${CARD_GRADIENTS[i % CARD_GRADIENTS.length][1]})` }}>
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <GlassesMark className="w-14 h-7" stroke="rgba(255,255,255,0.7)" />
              </div>
            </div>
            <div className="f-mono fs-10 uppercase tracking-wide mt-4" style={{ color: "var(--signal)" }}>{post.tag} · {post.readTime}</div>
            <div className="f-display text-xl mt-2" style={{ color: "var(--ink)" }}>{post.title}</div>
            <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>{post.excerpt}</p>
          </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage({ postId, setView, openPost }) {
  const post = BLOG_POSTS.find((p) => p.id === postId) || BLOG_POSTS[0];
  const more = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-12">
      <button onClick={() => setView("blog")} className="f-mono text-xs flex items-center gap-1.5 mb-8" style={{ color: "var(--ink-2)" }}>
        <ChevronLeft size={13} /> Back to journal
      </button>
      <div className="f-mono fs-11 uppercase tracking-wide" style={{ color: "var(--signal)" }}>{post.tag} · {post.readTime} read</div>
      <h1 className="f-display text-4xl mt-3" style={{ color: "var(--ink)" }}>{post.title}</h1>
      <div className="ar-169 my-8" style={{ background: "linear-gradient(135deg, #16324A, #6E7784)" }}>
        <div className="w-full h-full flex items-center justify-center"><GlassesMark className="w-20 h-10" stroke="rgba(255,255,255,0.6)" /></div>
      </div>
      <p className="fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>{post.excerpt}</p>
      <p className="fs-15 leading-relaxed mt-4" style={{ color: "var(--ink-2)" }}>
        This is placeholder editorial copy standing in for the full article — ready to be replaced with real reporting,
        optometrist input, and product photography once content production begins.
      </p>
      <div className="mt-16">
        <div className="f-mono fs-11 uppercase tracking-wide mb-4" style={{ color: "var(--ink-2)" }}>Keep reading</div>
        <div className="grid sm:grid-cols-3 gap-6">
          {more.map((p) => (
            <button key={p.id} onClick={() => openPost(p.id)} className="text-left">
              <div className="f-display text-base" style={{ color: "var(--ink)" }}>{p.title}</div>
              <div className="f-mono fs-10 mt-1" style={{ color: "var(--ink-2)" }}>{p.readTime}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPage({ setView }) {
  return (
    <div>
      <section className="py-24" style={{ background: "var(--ink)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Eyebrow tone="light" className="justify-center">Our story</Eyebrow>
          <h1 className="f-display text-4xl md:text-5xl mt-5" style={{ color: "#fff" }}>Clarity, measured before it's styled.</h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20">
        <p className="f-display text-2xl leading-snug" style={{ color: "var(--ink)" }}>
          iZEN was founded in 2019 by two optometrists tired of prescribing lenses for frames that never fit right.
        </p>
        <p className="mt-6 fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>
          Most eyewear brands design for the photograph first. We design for the ninth hour of wear — the point where
          a frame either disappears on your face or starts to remind you it's there. Every shape in the collection is
          measured against a range of real bridge widths and temple lengths before it's finished in a single color.
        </p>
        <p className="mt-4 fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>
          Our in-house lab cuts prescription lenses for every order, which is why turnaround stays inside a week even
          for progressive and photochromic lenses. Nothing ships until someone on the original founding team has
          checked the fit specs against the batch.
        </p>
        <div className="grid sm:grid-cols-3 gap-8 mt-14">
          {[["2019","Founded in a two-chair optometry studio"],["60+","Frame shapes in active rotation"],["12mo","Warranty on every frame, no fine print"]].map(([n, l], i) => (
            <Reveal key={n} delay={i * 70}>
              <div className="f-display text-4xl" style={{ color: "var(--signal)" }}>{n}</div>
              <div className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>{l}</div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="py-20" style={{ background: "var(--paper-2)" }}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="f-display text-3xl" style={{ color: "var(--ink)" }}>Want to see the current collection?</h2>
          <PrimaryButton onClick={() => setView("shop")} className="mt-7">Shop all frames</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-2 gap-14">
      <div>
        <Eyebrow>Get in touch</Eyebrow>
        <h1 className="f-display text-4xl mt-3" style={{ color: "var(--ink)" }}>We reply within a day</h1>
        <p className="text-sm mt-4 max-w-sm" style={{ color: "var(--ink-2)" }}>
          Fit questions, prescription help, or order support — reach the team directly.
        </p>
        <div className="flex flex-col gap-4 mt-8">
          {[[Mail,"support@izen.example"],[Phone,"+91 90000 00000"],[MapPin,"Banjara Hills, Hyderabad"]].map(([Icon, l], i) => (
            <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "var(--ink)" }}>
              <span className="w-9 h-9 flex items-center justify-center" style={{ border: "1px solid var(--line)" }}><Icon size={14} /></span>{l}
            </div>
          ))}
        </div>
      </div>
      <div>
        {sent ? (
          <div className="p-8 text-center" style={{ border: "1px solid var(--line)" }}>
            <Check size={22} style={{ color: "var(--signal)" }} className="mx-auto" />
            <p className="f-display text-xl mt-4" style={{ color: "var(--ink)" }}>Message sent</p>
            <p className="text-sm mt-2" style={{ color: "var(--ink-2)" }}>We'll follow up at {form.email}.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-4">
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)" }} />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="text-sm px-4 py-3 outline-none" style={{ border: "1px solid var(--line)" }} />
            <textarea required rows={5} placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="text-sm px-4 py-3 outline-none resize-none" style={{ border: "1px solid var(--line)" }} />
            <PrimaryButton type="submit" className="w-fit">Send message</PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   POLICY PAGES
   ============================================================ */

function PolicyPage({ policyKey, openPolicy }) {
  const policy = POLICIES[policyKey] || POLICIES.privacy;
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-16">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="f-display text-4xl mt-3 mb-8" style={{ color: "var(--ink)" }}>{policy.title}</h1>
      <div className="flex flex-col gap-4">
        {policy.body.map((p, i) => (
          <p key={i} className="fs-15 leading-relaxed" style={{ color: "var(--ink-2)" }}>{p}</p>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t" style={{ borderColor: "var(--line)" }}>
        {Object.entries(POLICIES).map(([key, p]) => (
          <button key={key} onClick={() => openPolicy(key)} className="f-mono fs-11 uppercase tracking-wide px-3 py-2"
            style={{ border: `1px solid ${key === policyKey ? "var(--signal)" : "var(--line)"}`, color: key === policyKey ? "var(--signal)" : "var(--ink-2)" }}>
            {p.title}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   ADMIN PANEL
   ============================================================ */

function AdminPage() {
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState(() => PRODUCTS.slice(0, 16).map((p) => ({ ...p })));
  const [coupons, setCoupons] = useState(() => Object.entries(COUPONS).map(([code, c]) => ({ code, ...c })));
  const [newCoupon, setNewCoupon] = useState({ code: "", value: "" });
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: CATEGORIES[0].key, price: "" });

  const toggleStock = (id) => setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p)));
  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    setProducts((prev) => [{
      id: `admin-${Date.now()}`, name: newProduct.name, category: newProduct.category, price: Number(newProduct.price),
      salePrice: null, rating: 0, reviewCount: 0, inStock: true, sizes: ["Regular"], colors: [COLORWAYS[0]],
      gradient: CARD_GRADIENTS[0], sku: `IZ-ADM${Math.floor(Math.random() * 900 + 100)}`,
    }, ...prev]);
    setNewProduct({ name: "", category: CATEGORIES[0].key, price: "" });
    setShowAddProduct(false);
  };
  const addCoupon = () => {
    if (!newCoupon.code || !newCoupon.value) return;
    setCoupons((prev) => [...prev, { code: newCoupon.code.toUpperCase(), label: `${newCoupon.value}% off`, type: "percent", value: Number(newCoupon.value) }]);
    setNewCoupon({ code: "", value: "" });
  };
  const removeCoupon = (code) => setCoupons((prev) => prev.filter((c) => c.code !== code));

  const TABS = [["products","Products",Package],["orders","Orders",ShoppingBag],["inventory","Inventory",LayoutDashboard],["coupons","Coupons",Tag],["customers","Customers",User]];

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-12">
      <Eyebrow>Internal tool — demo only</Eyebrow>
      <h1 className="f-display text-4xl mt-3 mb-8" style={{ color: "var(--ink)" }}>Admin panel</h1>
      <div className="flex gap-2 flex-wrap mb-8" style={{ borderBottom: "1px solid var(--line)" }}>
        {TABS.map(([k, l, Icon]) => (
          <button key={k} onClick={() => setTab(k)} className="flex items-center gap-1.5 f-mono fs-11 uppercase tracking-wide px-4 py-3"
            style={{ color: tab === k ? "var(--signal)" : "var(--ink-2)", borderBottom: tab === k ? "2px solid var(--signal)" : "2px solid transparent" }}>
            <Icon size={13} /> {l}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <p className="text-sm" style={{ color: "var(--ink-2)" }}>{products.length} products</p>
            <OutlineButton onClick={() => setShowAddProduct(!showAddProduct)}><PackagePlus size={14} /> Add product</OutlineButton>
          </div>
          {showAddProduct && (
            <form onSubmit={addProduct} className="grid sm:grid-cols-4 gap-3 mb-6 p-4" style={{ border: "1px solid var(--line)" }}>
              <input required placeholder="Product name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="text-sm px-3 py-2.5 outline-none" style={{ border: "1px solid var(--line)" }} />
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="text-sm px-3 py-2.5 outline-none" style={{ border: "1px solid var(--line)" }}>
                {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
              <input required type="number" placeholder="Price (₹)" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="text-sm px-3 py-2.5 outline-none" style={{ border: "1px solid var(--line)" }} />
              <PrimaryButton type="submit">Save</PrimaryButton>
            </form>
          )}
          <div className="overflow-x-auto">
            <table className="w-full minw-comparetable">
              <thead>
                <tr className="f-mono fs-10 uppercase tracking-wide text-left" style={{ color: "var(--ink-2)" }}>
                  <th className="pb-3">Product</th><th className="pb-3">Category</th><th className="pb-3">Price</th><th className="pb-3">Stock</th><th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t text-sm" style={{ borderColor: "var(--line)" }}>
                    <td className="py-3 pr-3" style={{ color: "var(--ink)" }}>{p.name}</td>
                    <td className="py-3 pr-3" style={{ color: "var(--ink-2)" }}>{p.category}</td>
                    <td className="py-3 pr-3 f-mono" style={{ color: "var(--ink)" }}>₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="py-3 pr-3">
                      <button onClick={() => toggleStock(p.id)} className="f-mono fs-10 uppercase px-2 py-1" style={{ background: p.inStock ? "#EAF1E9" : "#FBEAE3", color: p.inStock ? "#5C7A5A" : "var(--signal)" }}>
                        {p.inStock ? "In stock" : "Out of stock"}
                      </button>
                    </td>
                    <td className="py-3 text-right">
                      <button onClick={() => deleteProduct(p.id)}><Trash2 size={14} style={{ color: "var(--ink-2)" }} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="overflow-x-auto">
          <table className="w-full minw-comparetable">
            <thead>
              <tr className="f-mono fs-10 uppercase tracking-wide text-left" style={{ color: "var(--ink-2)" }}>
                <th className="pb-3">Order</th><th className="pb-3">Customer</th><th className="pb-3">Date</th><th className="pb-3">Total</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ORDERS.map((o) => (
                <tr key={o.id} className="border-t text-sm" style={{ borderColor: "var(--line)" }}>
                  <td className="py-3 pr-3 f-mono" style={{ color: "var(--ink)" }}>#{o.id}</td>
                  <td className="py-3 pr-3" style={{ color: "var(--ink)" }}>{o.customer}</td>
                  <td className="py-3 pr-3" style={{ color: "var(--ink-2)" }}>{o.date}</td>
                  <td className="py-3 pr-3 f-mono" style={{ color: "var(--ink)" }}>₹{o.total.toLocaleString("en-IN")}</td>
                  <td className="py-3"><span className="f-mono fs-10 uppercase" style={{ color: ORDER_STATUS_COLOR[o.status] }}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "inventory" && (
        <div className="overflow-x-auto">
          <p className="text-sm mb-4" style={{ color: "var(--ink-2)" }}>Toggle stock status per SKU — reflected instantly across the storefront in a full deployment.</p>
          <table className="w-full minw-comparetable">
            <thead>
              <tr className="f-mono fs-10 uppercase tracking-wide text-left" style={{ color: "var(--ink-2)" }}>
                <th className="pb-3">SKU</th><th className="pb-3">Product</th><th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t text-sm" style={{ borderColor: "var(--line)" }}>
                  <td className="py-3 pr-3 f-mono" style={{ color: "var(--ink-2)" }}>{p.sku}</td>
                  <td className="py-3 pr-3" style={{ color: "var(--ink)" }}>{p.name}</td>
                  <td className="py-3">
                    <button onClick={() => toggleStock(p.id)} className="flex items-center gap-1.5 f-mono fs-10 uppercase" style={{ color: p.inStock ? "#5C7A5A" : "var(--signal)" }}>
                      {p.inStock ? <Check size={12} /> : <Ban size={12} />} {p.inStock ? "In stock" : "Out of stock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "coupons" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input placeholder="Code (e.g. SAVE20)" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
              className="text-sm px-3 py-2.5 outline-none" style={{ border: "1px solid var(--line)" }} />
            <input type="number" placeholder="% off" value={newCoupon.value} onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
              className="text-sm px-3 py-2.5 outline-none w-32" style={{ border: "1px solid var(--line)" }} />
            <PrimaryButton onClick={addCoupon}><PackagePlus size={14} /> Add coupon</PrimaryButton>
          </div>
          <div className="flex flex-col gap-2">
            {coupons.map((c) => (
              <div key={c.code} className="flex items-center justify-between px-4 py-3" style={{ border: "1px solid var(--line)" }}>
                <span className="f-mono text-sm flex items-center gap-2" style={{ color: "var(--ink)" }}><Tag size={13} style={{ color: "var(--signal)" }} /> {c.code} — {c.label}</span>
                <button onClick={() => removeCoupon(c.code)}><Trash2 size={14} style={{ color: "var(--ink-2)" }} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "customers" && (
        <div className="overflow-x-auto">
          <table className="w-full minw-comparetable">
            <thead>
              <tr className="f-mono fs-10 uppercase tracking-wide text-left" style={{ color: "var(--ink-2)" }}>
                <th className="pb-3">Name</th><th className="pb-3">Email</th><th className="pb-3">City</th><th className="pb-3">Orders</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_CUSTOMERS.map((c) => (
                <tr key={c.email} className="border-t text-sm" style={{ borderColor: "var(--line)" }}>
                  <td className="py-3 pr-3" style={{ color: "var(--ink)" }}>{c.name}</td>
                  <td className="py-3 pr-3" style={{ color: "var(--ink-2)" }}>{c.email}</td>
                  <td className="py-3 pr-3" style={{ color: "var(--ink-2)" }}>{c.city}</td>
                  <td className="py-3 f-mono" style={{ color: "var(--ink)" }}>{c.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   APP SHELL
   ============================================================ */

export default function App() {
  const [view, _setView] = useState("home");
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [postId, setPostId] = useState(BLOG_POSTS[0].id);
  const [policyKey, setPolicyKey] = useState("privacy");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [search, setSearch] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [compareNotice, setCompareNotice] = useState("");
  const [shopInit, setShopInit] = useState({ category: "All", sort: "featured", onlyNew: false });
  const [coupon, setCoupon] = useState(null);
  const [user, setUser] = useState(null);

  const setView = (v) => { _setView(v); setOpenMobile(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openProduct = (id) => { setProductId(id); setView("product"); };
  const openPost = (id) => { setPostId(id); setView("blogpost"); };
  const openPolicy = (key) => { setPolicyKey(key); setView("policy"); };
  const goShop = (category = "All", sort = "featured", onlyNew = false) => {
    setShopInit({ category, sort, onlyNew });
    setView("shop");
  };

  const addToCart = (product, color = product.colors[0], lens = product.lensOptions[0], qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id && l.color.name === color.name && l.lens.name === lens.name);
      if (existing) return prev.map((l) => (l === existing ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { lineId: `${product.id}-${color.name}-${lens.name}-${Date.now()}`, product, color, lens, qty }];
    });
  };
  const buyNow = (product, color = product.colors[0], lens = product.lensOptions[0], qty = 1) => {
    addToCart(product, color, lens, qty);
    setView("checkout");
  };
  const updateQty = (lineId, delta) => {
    setCart((prev) => prev.map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(1, l.qty + delta) } : l)).filter((l) => l.qty > 0));
  };
  const removeFromCart = (lineId) => setCart((prev) => prev.filter((l) => l.lineId !== lineId));
  const clearCart = () => { setCart([]); setCoupon(null); };

  const toggleWishlist = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const toggleCompare = (id) => setCompareList((prev) => {
    if (prev.includes(id)) return prev.filter((x) => x !== id);
    if (prev.length >= 4) { setCompareNotice("Compare is limited to 4 frames at a time."); setTimeout(() => setCompareNotice(""), 2500); return prev; }
    return [...prev, id];
  });

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);

  const pageProps = { setView, openProduct, openPost, openPolicy, goShop, addToCart, buyNow, toggleWishlist, toggleCompare, wishlist, compareList };

  return (
    <div className="izen min-h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      <NavBar view={view} setView={setView} goShop={goShop} cartCount={cartCount} wishCount={wishlist.length} compareCount={compareList.length}
        search={search} setSearch={setSearch} openMobile={openMobile} setOpenMobile={setOpenMobile} />

      {compareNotice && (
        <div className="toast-in fixed top-24 left-1/2 z-50 f-mono text-xs px-4 py-2.5 shadow-lg" style={{ background: "var(--ink)", color: "#fff" }}>
          {compareNotice}
        </div>
      )}

      <main className="flex-1">
        <div key={view} className="page-fade">
          {view === "home" && <Home {...pageProps} />}
          {view === "shop" && <Shop search={search} initCategory={shopInit.category} initSort={shopInit.sort} initOnlyNew={shopInit.onlyNew} {...pageProps} />}
          {view === "product" && <ProductDetail productId={productId} {...pageProps} />}
          {view === "cart" && <CartPage cart={cart} updateQty={updateQty} removeFromCart={removeFromCart} coupon={coupon} setCoupon={setCoupon} setView={setView} openProduct={openProduct} />}
          {view === "wishlist" && <WishlistPage wishlist={wishlist} {...pageProps} />}
          {view === "compare" && <ComparePage compareList={compareList} toggleCompare={toggleCompare} setView={setView} openProduct={openProduct} />}
          {view === "checkout" && <CheckoutPage cart={cart} coupon={coupon} setView={setView} clearCart={clearCart} />}
          {view === "account" && <AccountPage setView={setView} user={user} setUser={setUser} wishCount={wishlist.length} />}
          {view === "blog" && <BlogPage setView={setView} openPost={openPost} />}
          {view === "blogpost" && <BlogPostPage postId={postId} setView={setView} openPost={openPost} />}
          {view === "about" && <AboutPage setView={setView} />}
          {view === "contact" && <ContactPage />}
          {view === "policy" && <PolicyPage policyKey={policyKey} openPolicy={openPolicy} />}
          {view === "admin" && <AdminPage />}
        </div>
      </main>

      <Footer setView={setView} openPolicy={openPolicy} />
      <WhatsAppButton />
    </div>
  );
}
