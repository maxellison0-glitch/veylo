export type Finish = {
  name: string;
  hex: string;
};

export type Variant = {
  label: string;
  note: string;
  price: number;
};

export type ProductCollection = "Face" | "Body" | "Scalp & Hair" | "Bundles";

export type ProductFaq = {
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  strapline: string;
  description: string;
  longDescription: string;
  howTo: string;
  specs: string;
  price: number;
  previousPrice?: number;
  badge?: string;
  concern: "Fine lines" | "Puffiness" | "Dullness" | "Tension" | "Eye comfort" | "Complete ritual" | "Pain relief" | "Recovery" | "Hair removal" | "Blemishes" | "Scalp care";
  ptype: "Device" | "Accessory" | "Set";
  finishes: Finish[];
  variants: Variant[];
  features: string[];
  leadTime: string;
  /** Absolute URL to the hero product image (used for OG and JSON-LD). */
  image?: string;
  technology?: string[];
  useCases?: string[];
  faqs?: ProductFaq[];
};

const pearl: Finish = { name: "Pearl", hex: "#f0eae2" };
const blush: Finish = { name: "Blush", hex: "#e6c3b8" };
const frost: Finish = { name: "Frost", hex: "#dbe4e4" };
const stone: Finish = { name: "Stone", hex: "#cfc8bf" };

const standardLeadTime = "Tracked UK delivery, 4–7 working days";

const existingProducts: Product[] = [
  {
    slug: "veylo-wand",
    name: "The Veylo Wand",
    tagline: "4-in-1 red light therapy",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png",
    strapline: "Red light, microcurrent, gentle warmth and massage — one five-minute ritual.",
    description:
      "Four technologies in one hand-held device: 660nm red light, gentle EMS microcurrent, 42°C warmth and sonic massage. A five-minute evening ritual for skin that looks brighter and feels smoother.",
    longDescription:
      "The Veylo Wand brings the core of a salon facial into one quiet, rechargeable tool. Red light at 660nm works alongside a gentle EMS microcurrent, steady 42°C warmth and sonic massage, so one slow pass covers four separate steps. Used for five minutes a day, it helps the look of fine lines and leaves skin looking rested. The sculpted head is shaped to follow cheekbones, brow and jaw. It charges over USB-C and holds around two weeks of daily use per charge.",
    howTo:
      "Start with clean, dry skin. Switch the wand on and glide it slowly upwards and outwards across each cheek, the brow and the jawline, spending about a minute on each area. Keep the head flat against the skin and let the warmth build. After five minutes, switch off and follow with your usual serum or moisturiser. Use daily. Avoid the eyelids and broken skin.",
    specs: "16.5cm × 4.1cm, 128g. USB-C. IPX4 splash resistant.",
    price: 49.99,
    badge: "Signature",
    concern: "Complete ritual",
    ptype: "Device",
    finishes: [pearl, blush],
    variants: [{ label: "Veylo Wand", note: "USB-C rechargeable", price: 49.99 }],
    features: [
      "660nm red light",
      "EMS microcurrent",
      "42°C gentle warmth",
      "Sonic facial massage",
      "USB-C charging — 2-week battery",
      "5-minute daily ritual guide",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "lumen-mask",
    name: "LuminaPro LED Face Mask",
    tagline: "7-colour LED light therapy",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_a02b71d8-5e87-4474-89d9-edc7872668f7.png",
    strapline: "Seven LED colours, including red, blue and near-infrared, in a flexible hands-free silicone mask.",
    description:
      "A rechargeable flexible-silicone mask with 150+ LEDs and seven treatment colours for brightness, blemish-prone skin and a more even-looking complexion.",
    longDescription:
      "LuminaPro is the anchor of the Veylo face range. Its flexible silicone shell keeps more than 150 LEDs close to the skin while seven colour modes let you tailor the session. Red and near-infrared support an age-defying routine, blue is intended for blemish-prone skin, and the remaining modes make it easy to build a consistent full-face ritual. It is wireless, rechargeable and hands free.",
    howTo:
      "Cleanse and dry your face, then fasten the mask so it rests lightly without pressing. Select the colour recommended for your goal and use for 15–20 minutes. Follow with your usual serum or moisturiser. Begin with three sessions a week and follow the supplied colour and frequency guide. Use the eye inserts and do not stare directly at the LEDs.",
    specs: "Flexible silicone mask with 150+ LEDs. Seven colour modes including red, blue and near-infrared. Rechargeable controller. 15–20 minute sessions. Adjustable strap and eye inserts.",
    price: 129.99,
    badge: "Signature",
    concern: "Dullness",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "LuminaPro LED Face Mask", note: "7 colours · 150+ LEDs", price: 129.99 }],
    features: [
      "Seven LED colour modes",
      "Red, blue and near-infrared light",
      "150+ LEDs in flexible silicone",
      "Wireless rechargeable controller",
      "15–20 minute hands-free sessions",
      "Adjustable strap and eye inserts",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "cool-roller",
    name: "CryoGlow Ice Roller",
    tagline: "De-puff and calm",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_96a00a93-6b86-4953-8017-ebca810f5c8a.png",
    strapline: "A stainless-steel roller, kept in the fridge, for mornings that start puffy.",
    description:
      "A weighted stainless-steel roller that stays cold from the fridge. Two minutes over cheeks, brow and jaw and skin looks calmer and less puffy.",
    longDescription:
      "CryoGlow is a simple tool done properly. The stainless-steel head holds its chill far longer than jade or glass, and the weighted handle lets the roller do the work. Kept in the fridge and used for a couple of minutes each morning, it helps the look of puffiness around the eyes and cheeks. It suits every skin type, needs no charging and takes up almost no space.",
    howTo:
      "Keep the roller in the fridge. In the morning, roll gently from the centre of the face outwards: across each cheek, along the jaw, over the brow and lightly under the eyes. Use light pressure for one to two minutes. Wipe the head clean after use and return it to the fridge.",
    specs: "Stainless-steel head with weighted aluminium handle. 14.5cm long, 120g. Wipe clean; fridge safe.",
    price: 14.99,
    concern: "Puffiness",
    ptype: "Accessory",
    finishes: [frost],
    variants: [{ label: "CryoGlow Ice Roller", note: "Fridge-cold stainless steel", price: 14.99 }],
    features: [
      "Stainless-steel head holds the cold",
      "Weighted handle for light pressure",
      "Fridge safe",
      "Suits all skin types",
      "No charging required",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "sculpt-set",
    name: "Jade Ritual Gua Sha Set",
    tagline: "Jade massage ritual",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_ca4479d6-71b1-4f82-9562-c92e6186d9a3.png",
    strapline: "A smooth jade gua sha and matching facial roller, boxed with a simple stroke guide.",
    description:
      "A matched natural-jade gua sha and facial roller for slow massage, de-puffing and a calmer evening ritual.",
    longDescription:
      "Jade Ritual pairs two classic massage tools in one presentation box. The gua sha's curved edges are shaped for the jaw, cheekbones and brow, while the roller covers larger areas quickly. A short printed guide shows the six strokes worth learning. Used with facial oil in the evening, the ritual helps the face look less puffy and feel more relaxed.",
    howTo:
      "Apply a few drops of facial oil to clean skin. Sweep the gua sha slowly from the centre of the face outwards, keeping it almost flat against the skin: jawline, cheekbone, then brow, three to five strokes each. Finish with the roller over cheeks and forehead. Two to three evenings a week is plenty. Wipe both tools clean after use.",
    specs: "Natural-jade gua sha and matching facial roller. Includes printed stroke guide and storage pouch or presentation box. Wipe clean.",
    price: 19.99,
    concern: "Tension",
    ptype: "Accessory",
    finishes: [stone],
    variants: [{ label: "Jade Ritual Set", note: "Gua sha, roller and guide", price: 19.99 }],
    features: [
      "Curved gua sha for jaw, cheek and brow",
      "Dual-ended facial roller",
      "Printed six-stroke guide",
      "Storage pouch or presentation box included",
      "Use with any facial oil",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "glow-ritual",
    name: "The Glow Ritual",
    tagline: "Wand + CryoGlow",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260823_175045_1485ed57-f4b8-4a93-a36e-91e2960359d3.png",
    strapline: "The Veylo Wand and CryoGlow Ice Roller, boxed together as one ritual.",
    description:
      "The complete Veylo ritual in one box: CryoGlow for calmer-looking mornings and the Veylo Wand for five focused minutes at night. Bought together, the set saves £5 on the separate prices.",
    longDescription:
      "The Glow Ritual pairs our two most-used tools into a single daily routine. Mornings start with the fridge-cold roller to help the look of puffiness; evenings end with the wand's red light, microcurrent, warmth and massage. Together they take under ten minutes a day. Both arrive in one box with the five-minute ritual guide, priced £5 below buying each piece separately.",
    howTo:
      "Morning: two minutes with CryoGlow, straight from the fridge, rolling from the centre of the face outwards. Evening: five minutes with the Veylo Wand on clean, dry skin, gliding upwards and outwards, then follow with serum. That is the whole ritual.",
    specs: "Includes the Veylo Wand (16.5cm × 4.1cm, 128g, USB-C, IPX4 splash resistant) and CryoGlow Ice Roller (14.5cm, 120g, stainless steel). Boxed together with the ritual guide.",
    price: 59.99,
    previousPrice: 64.98,
    badge: "Save £5",
    concern: "Complete ritual",
    ptype: "Set",
    finishes: [pearl],
    variants: [{ label: "Glow Ritual", note: "Wand and CryoGlow together", price: 59.99 }],
    features: [
      "The Veylo Wand — 4-in-1 red light device",
      "CryoGlow Ice Roller — fridge-cold stainless steel",
      "5-minute daily ritual guide",
      "One box, one delivery",
      "£5 saving on the separate prices",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "relief-belt",
    name: "The Relief Belt",
    tagline: "Infrared body therapy",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png",
    strapline: "120 LEDs of red and near-infrared light, wrapped around wherever it hurts.",
    description:
      "A flexible therapy belt with 120 LEDs delivering 660nm red light and 850nm near-infrared. Wrap it around your back, knee, shoulder or hips for a twenty-minute session that leaves muscles feeling looser and joints less stiff.",
    longDescription:
      "The Relief Belt brings clinical-grade wavelengths into a wearable pad you can use on the sofa. One hundred and twenty LEDs alternate between 660nm red light and 850nm near-infrared, targeting both surface tissue and deeper muscle. The flexible pad wraps around the lower back, knee, shoulder or hip with a secure velcro strap, so you can move gently while it works. Twenty minutes a day is all it takes. The belt plugs in via a UK three-pin plug — no batteries to charge — and weighs just 500g.",
    howTo:
      "Place the belt against the area you want to treat — lower back, knee, shoulder or hip. Secure the velcro strap so the LEDs sit flat against the skin or thin clothing. Plug in and switch on. Relax for twenty minutes; the belt switches itself off. Use daily or as needed.",
    specs: "120 LEDs (660nm + 850nm). 28 × 19 × 6cm. 500g. UK three-pin plug. Velcro strap, one size. 20-minute auto timer.",
    price: 69.99,
    concern: "Pain relief",
    ptype: "Device",
    finishes: [{ name: "Charcoal", hex: "#2d2d2d" }],
    variants: [{ label: "Relief Belt", note: "UK plug, 20-min auto timer", price: 69.99 }],
    features: [
      "120 LEDs — 660nm red + 850nm near-infrared",
      "Flexible wrap for back, knee, shoulder, hip",
      "20-minute auto-off timer",
      "UK three-pin plug — no charging",
      "Lightweight at 500g",
      "Velcro strap, one size fits all",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "relief-ritual",
    name: "The Relief Ritual",
    tagline: "Wand + Belt",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png",
    strapline: "The Veylo Wand for your face and the Relief Belt for your body — one morning-and-evening ritual.",
    description:
      "Face and body in one box: the Veylo Wand for a five-minute facial and the Relief Belt for twenty minutes of infrared therapy on sore muscles and joints. Together, the set saves £15 on the separate prices.",
    longDescription:
      "The Relief Ritual pairs our two infrared devices into a complete head-to-body routine. Evenings start with the Veylo Wand — red light, microcurrent, warmth and massage across the face. Then wrap the Relief Belt around your back or knees while you wind down. It is a full-body ritual in under thirty minutes. Both arrive in one box, priced £15 below buying each piece separately.",
    howTo:
      "Evening: five minutes with the Veylo Wand on clean, dry skin, gliding upwards and outwards, then follow with serum. While the serum settles, wrap the Relief Belt around your back, knee or shoulder and relax for twenty minutes. That is the whole ritual.",
    specs: "Includes the Veylo Wand (16.5cm × 4.1cm, 128g, USB-C, IPX4) and the Relief Belt (28 × 19 × 6cm, 500g, UK plug, 120 LEDs). Boxed together.",
    price: 104.99,
    previousPrice: 119.98,
    badge: "Save £15",
    concern: "Recovery",
    ptype: "Set",
    finishes: [pearl],
    variants: [{ label: "Relief Ritual", note: "Wand and Belt together", price: 104.99 }],
    features: [
      "The Veylo Wand — 4-in-1 facial red light device",
      "The Relief Belt — 120 LED body therapy wrap",
      "Face-and-body ritual in under 30 minutes",
      "One box, one delivery",
      "£15 saving on the separate prices",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "relief-duo",
    name: "The Relief Duo",
    tagline: "Two belts, one ritual",
    image: "https://d8j0ntlcm91z4.cloudfront.net/user_3DZsX8XjGmMqL9IN6t2ItqOSeH9/hf_20260824_144031_6bcddcea-237c-4692-ba62-e30c22c1fc68.png",
    strapline: "Two Relief Belts — one for you, one for them. Recovery is better together.",
    description:
      "Two Relief Belts at one price. The same 120-LED infrared therapy, now for both of you. Settle onto the sofa, press start, and spend twenty minutes recovering together. Save £19.99 against buying separately.",
    longDescription:
      "The Relief Duo is for the couple who both come home tired. Two full-sized Relief Belts, each with 120 LEDs delivering 660nm red light and 850nm near-infrared. Wrap one around your lower back, hand the other to your partner for their knees. Twenty minutes on the sofa and you are both done. No booking, no waiting room and no taking turns.",
    howTo:
      "Each person wraps a belt around the area that needs it most — lower back, knee, shoulder or hip. Secure the velcro straps, plug in, and switch on. Relax together for twenty minutes; both belts switch themselves off. Use daily or as needed.",
    specs: "Two Relief Belts included. Each: 120 LEDs (660nm + 850nm), 28 × 19 × 6cm, 500g, UK three-pin plug, velcro strap, 20-minute auto timer.",
    price: 119.99,
    previousPrice: 139.98,
    badge: "Save £19.99",
    concern: "Recovery",
    ptype: "Set",
    finishes: [{ name: "Charcoal", hex: "#2d2d2d" }],
    variants: [{ label: "Relief Duo", note: "Two belts, two plugs", price: 119.99 }],
    features: [
      "Two full-sized Relief Belts",
      "120 LEDs each — 660nm red + 850nm near-infrared",
      "Flexible wrap for back, knee, shoulder, hip",
      "20-minute auto-off timer on each",
      "UK three-pin plugs — no charging",
      "Save £19.99 against buying separately",
    ],
    leadTime: standardLeadTime,
  },
];

// Historical catalogue concepts retained only as research notes. They are not exported,
// purchasable or shown anywhere in the storefront without an exact supplier match.
const rejectedSupplierlessDrafts: Product[] = [
  {
    slug: "ipl-hair-removal",
    name: "IPL Hair Removal Handset",
    image: "https://www.veyloskin.com/products/ipl-hair-removal.png",
    tagline: "At-home hair reduction",
    strapline: "Five intensity levels, a skin-tone sensor and ice-cooling contact for a more comfortable face-and-body routine.",
    description: "A 999,000-flash IPL handset for gradual hair reduction on suitable face and body areas, with five intensity levels and a built-in skin-tone sensor.",
    longDescription: "The IPL Hair Removal Handset brings a consistent light-based hair-reduction routine home. Five intensity levels let you start gently, while the skin-tone sensor and cooling contact head make each measured flash easier to position. Use it across suitable areas of the legs, arms, underarms, bikini line and below the cheek line, following the supplied schedule.",
    howTo: "Shave the area, then make sure skin is clean and completely dry. Patch test 24 hours before the first full session. Begin at the lowest comfortable level, hold the window flat against the skin and work in an orderly grid without repeatedly flashing the same point. Follow the supplied weekly schedule. Do not use over tattoos, dark marks, broken skin or unsuitable skin and hair colours.",
    specs: "999,000+ flashes. Five intensity levels. Skin-tone sensor. Ice-cooling contact head. Face and body modes. Mains-powered handset with UK plug.",
    price: 89.99,
    badge: "New",
    concern: "Hair removal",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "IPL Hair Removal Handset", note: "UK plug · 999,000+ flashes", price: 89.99 }],
    features: ["999,000+ flashes", "Five adjustable intensity levels", "Built-in skin-tone sensor", "Ice-cooling contact head", "Face and body treatment modes"],
    leadTime: standardLeadTime,
    technology: ["Intense pulsed light (IPL) targets pigment in the hair follicle.", "A consistent schedule matters more than a single session."],
    useCases: ["Legs and arms", "Underarms", "Suitable facial areas after checking the final guide"],
  },
  {
    slug: "thermalift-rf-wand",
    name: "ThermaLift RF Skin Wand",
    image: "https://www.veyloskin.com/products/thermalift-rf-wand.png",
    tagline: "Radiofrequency facial care",
    strapline: "Controlled radiofrequency warmth, EMS and massage for a firmer-looking facial routine.",
    description: "A rechargeable radiofrequency and EMS facial wand with adjustable output, live temperature display and automatic shut-off.",
    longDescription: "ThermaLift pairs controlled radiofrequency warmth with EMS and massage in one focused facial tool. The treatment head is shaped for slow upward passes along the cheeks, jaw and forehead, while the temperature display keeps the session easy to monitor. It is a dedicated step for the look of firmness, texture and facial definition.",
    howTo: "Apply a generous, even layer of water-based conductive gel to clean skin. Start on the lowest setting and keep the treatment head moving in slow upward passes across the cheeks, jaw and forehead. Do not hold it in one place. Avoid the eyelids, front of the neck and broken skin, then clean the head after use. Follow the supplied session and frequency guide.",
    specs: "Radiofrequency warmth with EMS mode. Adjustable intensity. Live temperature display. Automatic shut-off. USB rechargeable.",
    price: 79.99,
    badge: "New",
    concern: "Fine lines",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "ThermaLift RF Skin Wand", note: "RF + EMS · USB rechargeable", price: 79.99 }],
    features: ["Controlled radiofrequency warmth", "EMS facial massage mode", "Live temperature display", "Automatic shut-off", "USB rechargeable"],
    leadTime: standardLeadTime,
    technology: ["Radiofrequency creates controlled warmth in the skin.", "EMS adds a low-level electrical massage step through the conductive gel."],
    useCases: ["Jaw and cheek ritual", "The look of facial firmness", "Texture-focused routines"],
  },
  {
    slug: "glowpulse-microcurrent",
    name: "GlowPulse Microcurrent",
    image: "https://www.veyloskin.com/products/glowpulse-microcurrent.png",
    tagline: "Targeted facial toning",
    strapline: "Adjustable microcurrent and twin contact spheres for a short, guided facial toning ritual.",
    description: "A dedicated USB-C microcurrent tool for the look of a lifted, toned face, with adjustable intensity and a simple treatment map.",
    longDescription: "GlowPulse is built for customers who want a focused microcurrent step. Twin contact spheres follow the cheeks, jaw and brow area while adjustable intensity keeps the sensation comfortable. Used with a water-based conductive gel, the slow guided movements turn facial toning into a repeatable routine rather than another complicated device.",
    howTo: "Cleanse, then apply water-based conductive gel generously across the treatment area. Begin at the lowest intensity and move the spheres slowly along the supplied treatment map, maintaining full contact with the skin. Add more gel if the device drags or tingles sharply. Avoid the eyelids, front of the neck and broken skin.",
    specs: "Adjustable microcurrent intensity. Twin contact spheres. USB-C rechargeable. Includes charging cable and facial treatment map. Use with water-based conductive gel.",
    price: 69.99,
    badge: "New",
    concern: "Fine lines",
    ptype: "Device",
    finishes: [blush],
    variants: [{ label: "GlowPulse Microcurrent", note: "Adjustable · USB-C rechargeable", price: 69.99 }],
    features: ["Adjustable microcurrent intensity", "Twin-sphere contact head", "Guided facial treatment map", "USB-C rechargeable", "Use with conductive gel"],
    leadTime: standardLeadTime,
    technology: ["Low-level electrical current is used with a conductive medium.", "Consistent contact and correct technique are central to the ritual."],
    useCases: ["Cheek and jaw massage", "Brow-area ritual", "A dedicated toning step"],
  },
  {
    slug: "dermapen-pro",
    name: "DermaPen Pro",
    image: "https://www.veyloskin.com/products/dermapen-pro.png",
    tagline: "Precision skin-needling system",
    strapline: "Six speeds, adjustable depth and individually sealed cartridges for a controlled skin-texture routine.",
    description: "A wireless electric microneedling pen with six speed settings, adjustable 0.25–2.0mm depth and a starter pack of single-use cartridges.",
    longDescription: "DermaPen Pro gives experienced users precise control over speed and needle depth in a cordless format. Individually sealed cartridges keep every session single-use, while the dial and six speed settings make the device easy to configure. Microneedling breaks the skin barrier, so careful hygiene, contraindication checks and aftercare are essential parts of the product rather than optional extras.",
    howTo: "Read the full supplied guide and contraindications before use. Clean hands and the treatment area thoroughly, then fit a new sealed cartridge for every session. Begin at the shallowest setting and never share or reuse a cartridge. Do not use over active acne, infection, eczema, raised scars or broken skin. Deeper settings should only be used by an appropriately trained professional.",
    specs: "Adjustable 0.25–2.0mm depth. Six speed settings. Wireless rechargeable pen. Includes individually sealed replacement cartridges and charging cable.",
    price: 59.99,
    badge: "New",
    concern: "Blemishes",
    ptype: "Device",
    finishes: [stone],
    variants: [{ label: "DermaPen Pro", note: "Six speeds · cartridge starter pack", price: 59.99 }],
    features: ["Adjustable 0.25–2.0mm depth", "Six speed settings", "Wireless rechargeable design", "Individually sealed cartridges", "Hygiene and aftercare guide"],
    leadTime: standardLeadTime,
    technology: ["Microneedling creates controlled microchannels in the skin.", "Single-use cartridges, depth control and aftercare are essential."],
    useCases: ["Texture-focused routines", "The look of post-blemish marks", "Professional guidance may be appropriate"],
  },
  {
    slug: "skinwave-ems-wand",
    name: "SkinWave 6-in-1 Wand",
    image: "https://www.veyloskin.com/products/skinwave-ems-wand.png",
    tagline: "Multi-mode facial technology",
    strapline: "EMS, LED, microcurrent, RF, electroporation and vibration massage in one rechargeable wand.",
    description: "A six-function facial wand combining complementary modes for lifting, massage and skincare application in one entry-level device.",
    longDescription: "SkinWave brings six popular facial-care modes into one compact tool: EMS, LED, microcurrent, radiofrequency warmth, electroporation and vibration massage. It is designed as an accessible first device for customers who want to explore different rituals before moving to a dedicated treatment tool.",
    howTo: "Use on clean skin with the medium recommended for the selected mode. Begin on the lowest intensity and keep the head moving slowly upwards and outwards across the cheeks, jaw and forehead. Avoid the eyelids, front of the neck and broken skin. Clean the head after every use and follow the mode-by-mode guide supplied.",
    specs: "Six functions: EMS, LED, microcurrent, RF warmth, electroporation and vibration massage. Multiple light and intensity modes. USB rechargeable.",
    price: 39.99,
    badge: "New",
    concern: "Complete ritual",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "SkinWave 6-in-1 Wand", note: "Six functions · USB rechargeable", price: 39.99 }],
    features: ["EMS facial massage", "LED light modes", "Microcurrent", "RF warmth", "Electroporation", "Vibration massage"],
    leadTime: standardLeadTime,
    technology: ["Six selectable modes combine light, warmth, electrical stimulation and mechanical massage in one device."],
    useCases: ["A compact daily ritual", "Multiple skin concerns", "First beauty-tech device"],
  },
  {
    slug: "ultraclear-skin-scrubber",
    name: "UltraClear Skin Scrubber",
    image: "https://www.veyloskin.com/products/ultraclear-skin-scrubber.jpg",
    tagline: "Ultrasonic cleansing tool",
    strapline: "24,000+ ultrasonic vibrations a second and four modes for a more deliberate pore-care step.",
    description: "A rechargeable ultrasonic skin spatula with four modes for surface cleansing, exfoliation and skincare application.",
    longDescription: "UltraClear uses high-frequency movement through a slim stainless-steel spatula to support a thorough wet-skin cleansing step without manual squeezing. Four modes cover cleansing, moisture, lifting and nutrition, giving one compact device a useful role across the weekly routine.",
    howTo: "Cleanse and keep the skin visibly wet throughout use. Hold the spatula at a shallow angle and glide it slowly across congested areas without pressing or scraping. Re-wet the skin whenever needed. Rinse and wipe the stainless-steel head after use; do not use on broken or irritated skin.",
    specs: "24,000+ Hz ultrasonic vibration. Four modes: Clean, Moisture, Lift and Nutrition. Stainless-steel spatula. USB rechargeable.",
    price: 34.99,
    badge: "New",
    concern: "Blemishes",
    ptype: "Device",
    finishes: [frost],
    variants: [{ label: "UltraClear Skin Scrubber", note: "Four modes · USB rechargeable", price: 34.99 }],
    features: ["24,000+ Hz ultrasonic vibration", "Four treatment modes", "Stainless-steel spatula", "Wet-skin cleansing routine", "USB rechargeable"],
    leadTime: standardLeadTime,
    technology: ["Ultrasonic vibration works across damp skin to support surface cleansing."],
    useCases: ["Weekly pore-care ritual", "Oily areas", "Surface cleansing"],
  },
  {
    slug: "scalprevive-massager",
    name: "ScalpRevive Massager",
    image: "https://www.veyloskin.com/products/scalprevive-massager.jpg",
    tagline: "Electric scalp ritual",
    strapline: "Waterproof rotating silicone tips for a slower scalp and wash-day massage.",
    description: "An IPX7 waterproof electric scalp massager with soft removable silicone tips and multiple speeds for wet or dry use.",
    longDescription: "ScalpRevive brings a hands-free rhythm to scalp massage. Rotating silicone tips move across the scalp without catching the hair, while multiple speeds let the ritual stay gentle or feel more focused. Its waterproof body works just as well on dry hair as it does during wash day.",
    howTo: "Choose a comfortable speed and place the silicone tips flat against dry or shampooed hair. Move slowly across the scalp without pressing hard or staying in one place for too long. Rinse the removable tips after wet use and allow them to dry fully before refitting.",
    specs: "IPX7 waterproof body. Multiple speed settings. Removable washable silicone massage heads. Rechargeable battery with charging base or cable.",
    price: 29.99,
    badge: "New",
    concern: "Scalp care",
    ptype: "Device",
    finishes: [stone],
    variants: [{ label: "ScalpRevive Massager", note: "IPX7 · rechargeable", price: 29.99 }],
    features: ["IPX7 waterproof", "Multiple massage speeds", "Soft rotating silicone tips", "Removable washable heads", "Rechargeable"],
    leadTime: standardLeadTime,
    technology: ["Moving silicone tips provide mechanical scalp massage without relying on unproven growth claims."],
    useCases: ["Dry scalp massage", "Wash-day ritual", "Scalp tension"],
  },
  {
    slug: "complete-glow-kit",
    name: "Complete Glow Kit",
    tagline: "Mask + microcurrent + cooling",
    strapline: "Three complementary steps: LED, microcurrent and a cooling finish.",
    description: "Three complementary face tools in one set: the LuminaPro LED Face Mask, GlowPulse Microcurrent and CryoGlow Ice Roller. Save £14.98 against buying separately.",
    longDescription: "The Complete Glow Kit moves from light to tone to cooling in one considered routine. Begin with hands-free LuminaPro LED, follow with GlowPulse and conductive gel, then finish with the fridge-cold CryoGlow Roller whenever skin needs a calmer-looking finish.",
    howTo: "Use LuminaPro on clean, dry skin according to its light-session guide. Apply conductive gel and follow with GlowPulse, maintaining full contact as you work across the face. Wipe away the gel and finish with CryoGlow using light outward strokes. Each tool can also be used independently.",
    specs: "Includes LuminaPro LED Face Mask, GlowPulse Microcurrent Facial Toner and CryoGlow Ice Roller, with individual accessories and guides.",
    price: 199.99,
    badge: "Save £14.98",
    concern: "Complete ritual",
    ptype: "Set",
    finishes: [pearl],
    variants: [{ label: "Complete Glow Kit", note: "Three-piece face ritual", price: 199.99 }],
    features: ["LuminaPro LED Face Mask", "GlowPulse Microcurrent Facial Toner", "CryoGlow Ice Roller", "Three individual ritual guides", "Save £14.98"],
    leadTime: standardLeadTime,
  },
  {
    slug: "daily-ritual-set",
    name: "Daily Ritual Set",
    tagline: "Sculpt + cool + cleanse",
    strapline: "Three uncomplicated tools for massage, cooling and a weekly cleansing step.",
    description: "The Jade Ritual Gua Sha Set, CryoGlow Ice Roller and UltraClear Skin Scrubber together. Save £9.98 against buying separately.",
    longDescription: "The Daily Ritual Set combines three uncomplicated steps: UltraClear for a weekly wet-skin cleanse, Jade Ritual for slow massage with facial oil, and CryoGlow for a cooling morning or post-ritual finish. Use the tools together or reach for the one that suits the day.",
    howTo: "Use UltraClear only on wet skin, gliding rather than scraping. On separate days or after cleansing, apply facial oil and keep the gua sha almost flat as you sweep outwards. Use CryoGlow from the fridge with light outward strokes whenever a cooling finish is wanted.",
    specs: "Includes Jade Ritual Gua Sha Set with pouch, CryoGlow stainless-steel Ice Roller and UltraClear four-mode Skin Scrubber.",
    price: 59.99,
    badge: "Save £9.98",
    concern: "Complete ritual",
    ptype: "Set",
    finishes: [stone],
    variants: [{ label: "Daily Ritual Set", note: "Three-piece daily ritual", price: 59.99 }],
    features: ["Jade Ritual Gua Sha Set", "CryoGlow Ice Roller", "UltraClear Skin Scrubber", "Individual ritual guides", "Save £9.98"],
    leadTime: standardLeadTime,
  },
];

const verifiedLaunchProducts: Product[] = [
  {
    slug: "ipl-hair-removal",
    name: "IceGlide IPL Handset",
    image: "https://www.veyloskin.com/products/ipl-ice-pro.png",
    tagline: "At-home ice-cooled IPL",
    strapline: "A 16J IPL handset with an ice-cooling contact head, selected in the ICE PRO WHITE UK-plug variant.",
    description: "An ice-cooled IPL handset for gradual hair reduction on suitable face and body areas, supplied in the exact ICE PRO WHITE variant with a UK plug.",
    longDescription: "IceGlide pairs 16J IPL output with a cooling contact surface for a more comfortable, repeatable at-home routine. The compact white handset is suited to eligible areas of the legs, arms, underarms, bikini line and below the cheek line. IPL works gradually, so suitability checks, patch testing and a consistent treatment schedule matter more than a single session.",
    howTo: "Shave the area, then make sure skin is clean and completely dry. Patch test 24 hours before the first full session. Begin at the lowest comfortable level, hold the window flat against the skin and work in an orderly grid without repeatedly flashing the same point. Follow the supplied weekly schedule. Do not use over tattoos, dark marks, broken skin or unsuitable skin and hair colours.",
    specs: "16J IPL output. Ice-cooling contact head. White handset with champagne trim. Mains-powered with a UK three-pin plug.",
    price: 89.99,
    badge: "New",
    concern: "Hair removal",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "ICE PRO WHITE", note: "Ice cooling · UK plug", price: 89.99 }],
    features: ["16J IPL output", "Ice-cooling contact surface", "Compact face-and-body handset", "ICE PRO WHITE finish", "UK three-pin plug"],
    leadTime: "Tracked UK delivery, typically 7–12 working days",
    technology: ["Intense pulsed light targets pigment in eligible hair follicles.", "A consistent schedule matters more than a single session."],
    useCases: ["Legs and arms", "Underarms", "Suitable facial areas after checking the supplied guide"],
  },
  {
    slug: "scalprevive-massager",
    name: "ScalpRevive Four-Head Massager",
    image: "https://www.veyloskin.com/products/scalp-massager.png",
    tagline: "Four-head scalp ritual",
    strapline: "Four rotating silicone heads in a rechargeable handheld massager for a slower dry-scalp ritual.",
    description: "A rechargeable electric scalp massager with four rotating silicone massage heads and a simple one-button control.",
    longDescription: "ScalpRevive turns a manual scalp massage into a repeatable routine. Four motorised heads move together while flexible silicone nubs work across the scalp, neck or shoulders. The rounded white body sits securely in the hand and charges through its side port, making it an easy five-minute addition to an evening wind-down.",
    howTo: "Place all four silicone heads against dry hair or the neck and switch on at the gentlest setting. Move slowly without pressing hard or allowing the heads to catch in one area. Switch off before cleaning, wipe the heads with a damp cloth and let them dry fully. Do not submerge the device.",
    specs: "Four rotating silicone massage heads. Rechargeable battery. One-button top control. White casing with silver top cap and side charging port.",
    price: 39.99,
    badge: "New",
    concern: "Scalp care",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "White", note: "Four heads · rechargeable", price: 39.99 }],
    features: ["Four rotating massage heads", "Flexible silicone massage nubs", "One-button control", "Rechargeable cordless body", "Suitable for scalp, neck and shoulders"],
    leadTime: "Tracked UK delivery, typically 7–12 working days",
    technology: ["Four motorised heads provide mechanical massage without relying on unproven hair-growth claims."],
    useCases: ["Dry scalp massage", "Neck and shoulder massage", "Evening wind-down"],
  },
  {
    slug: "eye-rest-massager",
    name: "EyeRest Air Massager",
    image: "https://www.veyloskin.com/products/eye-massager.png",
    tagline: "Warm air-compression ritual",
    strapline: "Air pressure, gentle heat, vibration and Bluetooth audio in one foldable rechargeable eye mask.",
    description: "A foldable white eye massager combining airbag compression, warmth, vibration and Bluetooth audio for an at-home wind-down ritual.",
    longDescription: "EyeRest is designed for the part of the day when screens are finally put away. Its padded foldable shell uses airbag compression, gentle warmth and vibration around the eye area, while Bluetooth audio lets the session pair with a playlist or podcast. The adjustable grey strap and rechargeable cordless design make it easy to use at home or while travelling.",
    howTo: "Remove contact lenses and place the mask over clean, dry skin with your eyes closed. Adjust the strap so it feels secure without pressing, begin on the gentlest mode and use for 10–15 minutes. Stop if it feels uncomfortable. Do not use after recent eye surgery or with an active eye condition unless a clinician says it is suitable.",
    specs: "Foldable white shell with grey padded lining and adjustable strap. Airbag compression, gentle heat, vibration and Bluetooth audio. Rechargeable battery included.",
    price: 49.99,
    badge: "New",
    concern: "Eye comfort",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "White", note: "Rechargeable · Bluetooth", price: 49.99 }],
    features: ["Airbag compression", "Gentle warming mode", "Vibration massage", "Bluetooth audio", "Foldable rechargeable design"],
    leadTime: "Tracked UK delivery, typically 7–12 working days",
    technology: ["Air pressure, warmth and vibration provide a non-medical relaxation massage around the eye area."],
    useCases: ["Screen-time wind-down", "Evening relaxation", "Travel ritual"],
  },
];

export const products: Product[] = [...existingProducts, ...verifiedLaunchProducts];

const collectionProducts: Record<ProductCollection, string[]> = {
  Face: [
    "veylo-wand", "lumen-mask", "cool-roller", "sculpt-set", "glow-ritual",
    "eye-rest-massager",
  ],
  Body: ["relief-belt", "relief-ritual", "relief-duo", "ipl-hair-removal", "cool-roller"],
  "Scalp & Hair": ["scalprevive-massager"],
  Bundles: ["glow-ritual", "relief-ritual", "relief-duo"],
};

export const collections = [
  { slug: "face", name: "Face" as const, eyebrow: "Face technology", description: "LED, microcurrent, cleansing, cooling and massage tools for intentional face-care rituals." },
  { slug: "body", name: "Body" as const, eyebrow: "Body technology", description: "Light therapy, recovery and hair-removal tools designed around realistic at-home routines." },
  { slug: "scalp-hair", name: "Scalp & Hair" as const, eyebrow: "Scalp care", description: "Thoughtful tools that bring massage and consistency into the wash-day routine." },
  { slug: "bundles", name: "Bundles" as const, eyebrow: "Complete rituals", description: "Complementary Veylo tools grouped into simple routines, with a saving where possible." },
];

export function getProductCollections(product: Product): ProductCollection[] {
  return (Object.entries(collectionProducts) as [ProductCollection, string[]][])
    .filter(([, slugs]) => slugs.includes(product.slug))
    .map(([collection]) => collection);
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getCollectionProducts(collection: ProductCollection) {
  const slugs = collectionProducts[collection];
  return products.filter((product) => slugs.includes(product.slug));
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}
