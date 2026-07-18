import {
  SlidersHorizontal, ShieldCheck, Truck, RotateCcw,
} from "lucide-react";

import CAT_IMG_MEN_EYE from "./assets/cat-men-eyeglasses.webp";
import CAT_IMG_WOMEN_EYE from "./assets/cat-women-eyeglasses.webp";
import CAT_IMG_KIDS from "./assets/cat-kids-eyewear.webp";
import CAT_IMG_MEN_SUN from "./assets/cat-men-sunglasses.webp";
import CAT_IMG_WOMEN_SUN from "./assets/cat-women-sunglasses.webp";
import CAT_IMG_COMPUTER from "./assets/cat-computer-glasses.webp";

/* ============================================================
   Product catalog, content, and reference data for the iZEN
   storefront demo. Everything here is placeholder data generated
   deterministically (see the seed() helper) so the catalog looks
   populated and internally consistent without a real backend.
   ============================================================ */

const CATEGORIES = [
  { key: "Men's Eyeglasses", label: "Men's Eyeglasses", note: "Everyday clarity", image: CAT_IMG_MEN_EYE },
  { key: "Women's Eyeglasses", label: "Women's Eyeglasses", note: "Elegant everyday frames", image: CAT_IMG_WOMEN_EYE },
  { key: "Kids Eyewear", label: "Kids Eyewear", note: "Ages 5–14", image: CAT_IMG_KIDS },
  { key: "Men's Sunglasses", label: "Men's Sunglasses", note: "UV400 protection", image: CAT_IMG_MEN_SUN },
  { key: "Women's Sunglasses", label: "Women's Sunglasses", note: "UV400, on-trend", image: CAT_IMG_WOMEN_SUN },
  { key: "Computer Glasses", label: "Computer Glasses", note: "Screen-ready lenses", image: CAT_IMG_COMPUTER },
  { key: "Blue Light Glasses", label: "Blue Light Glasses", note: "Filtered comfort", image: null },
  { key: "Reading Glasses", label: "Reading Glasses", note: "+1.0 to +3.5", image: null },
];

const BASE_NAMES = ["Horizon","Nova","Apex","Aura","Elite","Titanium","Flex","Urban","Vision","Infinity","Meridian","Solstice","Drift","Halo","Crest","Lumen","Atlas","Echo","Zenith","Pulse"];
const FRAME_SHAPES = ["Round","Square","Cat-Eye","Aviator","Rectangle","Wayfarer"];
const FRAME_SIZES = ["Narrow", "Regular", "Wide"];
const MATERIALS = ["Acetate", "TR90 Lightweight Polymer", "Titanium Alloy", "Stainless Steel"];
const COLORWAYS = [
  { name: "Midnight Navy", hex: "#16324A" },
  { name: "Tortoise", hex: "#8A5A32" },
  { name: "Sandstone", hex: "#C9AE8C" },
  { name: "Onyx Black", hex: "#1C1C1C" },
  { name: "Champagne Gold", hex: "#B99358" },
  { name: "Sage", hex: "#7C8C74" },
  { name: "Rose Quartz", hex: "#C98F87" },
  { name: "Slate Grey", hex: "#6E7784" },
];
const CARD_GRADIENTS = [
  ["#16324A", "#2C4A66"],
  ["#E4672A", "#F0A374"],
  ["#2C4A66", "#6E7784"],
  ["#242220", "#4A453D"],
  ["#8A5A32", "#C9AE8C"],
  ["#16324A", "#7C8C74"],
];

const seed = (i, mod, off = 0) => ((i * 37 + off * 13 + 11) % mod);

const PRODUCTS = Array.from({ length: 60 }).map((_, i) => {
  const base = BASE_NAMES[i % BASE_NAMES.length];
  const cycle = Math.floor(i / BASE_NAMES.length);
  const shape = FRAME_SHAPES[seed(i, FRAME_SHAPES.length)];
  const category = CATEGORIES[i % CATEGORIES.length].key;
  const isSunglasses = category.includes("Sunglasses");
  const isReading = category === "Reading Glasses";
  const price = 1499 + seed(i, 12) * 350 + cycle * 250;
  const onSale = seed(i, 3) === 0;
  const salePrice = onSale ? Math.round((price * 0.78) / 10) * 10 : null;
  const rating = Number((3.6 + seed(i, 14) / 10).toFixed(1));
  const reviewCount = 8 + seed(i, 240);
  const inStock = seed(i, 9) !== 0;
  const colorIdx = [seed(i, 8), seed(i + 1, 8, 3), seed(i + 2, 8, 5)];
  const colors = [...new Set(colorIdx)].map((k) => COLORWAYS[k]);
  const gradient = CARD_GRADIENTS[seed(i, CARD_GRADIENTS.length, 2)];
  const suffix = cycle === 0 ? "" : cycle === 1 ? " Matte" : " Studio";
  const sizePick = seed(i, 3);
  const sizes = sizePick === 0 ? ["Regular"] : sizePick === 1 ? ["Regular", "Wide"] : ["Narrow", "Regular", "Wide"];
  const material = MATERIALS[seed(i, MATERIALS.length, 7)];
  return {
    id: `iz-${i + 1}`,
    name: `iZEN ${base}${suffix}`,
    sku: `IZ-${1000 + i}`,
    category,
    shape,
    price,
    salePrice,
    rating,
    reviewCount,
    inStock,
    isNew: i >= 52,
    colors: colors.length ? colors : [COLORWAYS[0]],
    gradient,
    sizes,
    width: 128 + seed(i, 20),
    bridge: 16 + seed(i, 6),
    templeLength: 138 + seed(i, 10),
    material,
    weight: 14 + seed(i, 12),
    uvProtection: isSunglasses,
    warranty: "12 Months",
    description: `The ${base}${suffix} pairs a ${shape.toLowerCase()} silhouette with a lightweight build, made for full days of wear without weight on the nose or ears.`,
    lensOptions: isReading
      ? [
          { name: "Power +1.0", delta: 0 },
          { name: "Power +1.5", delta: 0 },
          { name: "Power +2.0", delta: 0 },
          { name: "Power +2.5", delta: 100 },
          { name: "Power +3.0", delta: 100 },
          { name: "Power +3.5", delta: 100 },
        ]
      : [
          { name: "Single Vision", delta: 0 },
          { name: "Blue Light Filter", delta: 400 },
          { name: "Photochromic", delta: 900 },
          { name: "Anti-Glare Coating", delta: 300 },
        ],
  };
});

const TESTIMONIALS = [
  { name: "Ananya R.", city: "Hyderabad", text: "The frame stayed light all day at my desk and the blue-light lenses actually helped with my evening headaches.", rating: 5 },
  { name: "Vikram S.", city: "Bengaluru", text: "Ordered the Titanium Elite for daily wear — fit was near-perfect on the first try, no salon adjustment needed.", rating: 5 },
  { name: "Meera K.", city: "Chennai", text: "Loved that the size guide actually matched my old pair's measurements. Saved me a return.", rating: 4 },
  { name: "Rohit D.", city: "Pune", text: "Sunglasses hold up well against scratches. The case that came with it is genuinely nice too.", rating: 5 },
  { name: "Sana P.", city: "Mumbai", text: "Customer support helped me pick a shape for my face without any pressure to upsell. Refreshing.", rating: 4 },
  { name: "Arjun T.", city: "Delhi", text: "My kid's pair survived a school year. That alone earns the five stars.", rating: 5 },
];

const FAQS = [
  { q: "How do I find my correct frame size?", a: "Use the size guide on any product page — measure an existing pair's lens width, bridge, and temple length in millimetres, or use our printable sizing card." },
  { q: "Can I use my existing prescription?", a: "Yes. Add your prescription details at checkout, or upload a photo of your prescription and our optometry team will verify it before dispatch." },
  { q: "What's your return and exchange policy?", a: "14-day free returns on unworn frames, and a one-time free exchange if the fit isn't right — even with prescription lenses fitted." },
  { q: "How long does delivery take?", a: "Ready-lens frames ship in 1–2 days. Prescription lenses typically take 4–6 business days depending on lens complexity." },
  { q: "Do frames come with a warranty?", a: "Every iZEN frame carries a 12-month warranty against manufacturing defects, covering hinges, coating, and frame integrity." },
  { q: "Can I try before I buy?", a: "Yes — our virtual try-on is coming soon. In the meantime, home try-on kits (5 frames, 5 days) are available in select cities." },
];

const BLOG_POSTS = [
  { id: "b1", title: "How to Choose Frames for Your Face Shape", excerpt: "A practical, no-nonsense walkthrough of matching silhouettes to face shapes — round, square, oval, and heart.", tag: "Guides", readTime: "6 min" },
  { id: "b2", title: "Blue Light Lenses: What Actually Helps", excerpt: "We separate the marketing claims from what blue-light filtering lenses can realistically do for screen fatigue.", tag: "Eye Health", readTime: "5 min" },
  { id: "b3", title: "Titanium vs Acetate: Picking Your Frame Material", excerpt: "Weight, flexibility, allergy-friendliness, and price — a side-by-side look at the two most common frame materials.", tag: "Materials", readTime: "4 min" },
  { id: "b4", title: "Caring for Your Frames in Humid Climates", excerpt: "Simple habits that keep hinges, coatings, and nose pads in shape through monsoon season.", tag: "Care", readTime: "3 min" },
  { id: "b5", title: "Reading Glasses: Understanding Your Power", excerpt: "What +1.0 through +3.5 actually means, and how to figure out your starting point at home.", tag: "Guides", readTime: "5 min" },
  { id: "b6", title: "Inside the iZEN Lens Lab", excerpt: "A look at how we test anti-glare and photochromic coatings before they reach a frame.", tag: "Behind the Brand", readTime: "7 min" },
];

const WHY_ITEMS = [
  { title: "Precision-fit sizing", text: "Every listing carries real frame measurements, not marketing ranges.", icon: SlidersHorizontal },
  { title: "12-month warranty", text: "Hinges, coatings, and frame integrity — covered, no fine print.", icon: ShieldCheck },
  { title: "4–6 day lens turnaround", text: "In-house lab cuts and fits prescription lenses without third-party delay.", icon: Truck },
  { title: "14-day easy returns", text: "Unworn frames go back free, exchanges included even with lenses fitted.", icon: RotateCcw },
];

const COUPONS = {
  IZEN10: { label: "10% off", type: "percent", value: 10 },
  WELCOME200: { label: "₹200 off", type: "flat", value: 200 },
};

const POLICIES = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "iZEN Opticals collects only the information needed to process orders, fit prescriptions correctly, and improve the shopping experience — name, contact details, shipping address, and prescription data where provided.",
      "We never sell customer data to third parties. Payment details are handled directly by our payment gateway (Razorpay) and are not stored on iZEN servers.",
      "Prescription information is used solely to fulfil your order and is retained only as long as needed for reordering convenience, unless you request deletion.",
      "You can request a copy of your data, or ask us to delete it, at any time by contacting support.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "By placing an order on iZEN, you confirm the shipping and prescription details provided are accurate to the best of your knowledge.",
      "Prices are listed in INR and include applicable taxes unless stated otherwise. iZEN reserves the right to correct pricing errors before an order ships.",
      "Frames remain the property of iZEN Opticals until full payment is received and confirmed.",
      "Continued use of this site constitutes acceptance of these terms, which may be updated periodically.",
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      "Ready-lens frames ship within 1–2 business days. Prescription lenses are cut in-house and typically add 3–5 business days depending on lens complexity.",
      "All orders are fulfilled via our Shiprocket logistics integration, covering serviceable pin codes across India.",
      "Free shipping applies on orders above ₹2,499; a flat ₹99 fee applies below that threshold.",
      "Tracking details are shared by email and SMS once your order is dispatched.",
    ],
  },
  returns: {
    title: "Return & Refund Policy",
    body: [
      "Unworn frames in original condition can be returned free of charge within 14 days of delivery.",
      "One free exchange is included per order, even on frames fitted with prescription lenses, if the fit isn't right.",
      "Refunds are processed to the original payment method within 5–7 business days of the returned item passing quality check.",
      "Custom prescription lenses outside the standard range may be subject to a restocking fee — details are shown at checkout for such orders.",
    ],
  },
};

const SAMPLE_ORDERS = [
  { id: "IZ48213", customer: "Ananya Rao", total: 3298, status: "Delivered", date: "12 Jul 2026" },
  { id: "IZ48214", customer: "Vikram Shah", total: 2499, status: "Shipped", date: "13 Jul 2026" },
  { id: "IZ48215", customer: "Meera Krishnan", total: 4150, status: "Processing", date: "14 Jul 2026" },
  { id: "IZ48216", customer: "Rohit Deshmukh", total: 1899, status: "Delivered", date: "10 Jul 2026" },
];

const SAMPLE_CUSTOMERS = [
  { name: "Ananya Rao", email: "ananya.r@example.com", orders: 3, city: "Hyderabad" },
  { name: "Vikram Shah", email: "vikram.s@example.com", orders: 1, city: "Bengaluru" },
  { name: "Meera Krishnan", email: "meera.k@example.com", orders: 5, city: "Chennai" },
  { name: "Sana Pathan", email: "sana.p@example.com", orders: 2, city: "Mumbai" },
];

const ORDER_STATUS_COLOR = { Delivered: "#5C7A5A", Shipped: "var(--signal)", Processing: "var(--ink-2)" };

export {
  CATEGORIES, PRODUCTS, TESTIMONIALS, FAQS, BLOG_POSTS, WHY_ITEMS,
  FRAME_SHAPES, FRAME_SIZES, MATERIALS, COLORWAYS, CARD_GRADIENTS,
  COUPONS, POLICIES, SAMPLE_ORDERS, SAMPLE_CUSTOMERS, ORDER_STATUS_COLOR,
};
