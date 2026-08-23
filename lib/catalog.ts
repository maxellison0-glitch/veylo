export type Finish = {
  name: string;
  hex: string;
};

export type Variant = {
  label: string;
  note: string;
  price: number;
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
  concern: "Fine lines" | "Puffiness" | "Dullness" | "Tension" | "Complete ritual";
  ptype: "Device" | "Accessory" | "Set";
  finishes: Finish[];
  variants: Variant[];
  features: string[];
  leadTime: string;
};

const pearl: Finish = { name: "Pearl", hex: "#f0eae2" };
const blush: Finish = { name: "Blush", hex: "#e6c3b8" };
const frost: Finish = { name: "Frost", hex: "#dbe4e4" };
const stone: Finish = { name: "Stone", hex: "#cfc8bf" };

const standardLeadTime = "Tracked UK delivery, 4–7 working days";

export const products: Product[] = [
  {
    slug: "veylo-wand",
    name: "The Veylo Wand",
    tagline: "4-in-1 red light therapy",
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
    name: "The Lumen Mask",
    tagline: "LED light therapy mask",
    strapline: "A flexible silicone mask with red and near-infrared light — ten minutes, hands free.",
    description:
      "A wireless silicone LED mask with red and near-infrared modes. It rests lightly on the face, so ten minutes can pass while the kettle boils. For skin that looks brighter and more even.",
    longDescription:
      "The Lumen Mask is made from soft, flexible silicone that sits close to the skin without pressure. Inside, 96 LEDs deliver red and near-infrared light across the whole face in a single hands-free session. There are two modes and one button; nothing to programme. It is wireless and rechargeable, so the ritual can happen on the sofa rather than at a mirror. With regular use, skin looks brighter and tone appears more even.",
    howTo:
      "Cleanse and dry your face. Place the mask over clean skin and fasten the strap so it rests lightly. Press the button once for red light or twice for near-infrared, then relax for ten minutes; the mask switches itself off. Follow with serum or moisturiser. Use three to five times a week.",
    specs: "Flexible silicone, 96 LEDs. Red 630nm and near-infrared 850nm modes. USB-C rechargeable with 10-minute auto timer. One size with adjustable strap.",
    price: 79.99,
    concern: "Dullness",
    ptype: "Device",
    finishes: [pearl],
    variants: [{ label: "Lumen Mask", note: "Wireless, USB-C rechargeable", price: 79.99 }],
    features: [
      "Red 630nm and near-infrared 850nm modes",
      "96 LEDs in flexible silicone",
      "Wireless — no cables during use",
      "10-minute auto-off timer",
      "USB-C charging",
      "Adjustable strap, one size",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "cool-roller",
    name: "The Cool Roller",
    tagline: "De-puff and calm",
    strapline: "A stainless-steel roller, kept in the fridge, for mornings that start puffy.",
    description:
      "A weighted stainless-steel roller that stays cold from the fridge. Two minutes over cheeks, brow and jaw and skin looks calmer and less puffy.",
    longDescription:
      "The Cool Roller is a simple tool done properly. The stainless-steel head holds its chill far longer than jade or glass, and the weighted handle lets the roller do the work. Kept in the fridge and used for a couple of minutes each morning, it helps the look of puffiness around the eyes and cheeks. It suits every skin type, needs no charging and takes up almost no space.",
    howTo:
      "Keep the roller in the fridge. In the morning, roll gently from the centre of the face outwards: across each cheek, along the jaw, over the brow and lightly under the eyes. Use light pressure for one to two minutes. Wipe the head clean after use and return it to the fridge.",
    specs: "Stainless-steel head with weighted aluminium handle. 14.5cm long, 120g. Wipe clean; fridge safe.",
    price: 14.99,
    concern: "Puffiness",
    ptype: "Accessory",
    finishes: [frost],
    variants: [{ label: "Cool Roller", note: "Fridge-cold stainless steel", price: 14.99 }],
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
    name: "The Sculpt Set",
    tagline: "Gua sha and roller",
    strapline: "A gua sha stone and facial roller, with a guide that keeps it simple.",
    description:
      "A matched gua sha stone and facial roller in a cool composite-stone finish. Used slowly in the evening, they help the look of a tense, tired face. A printed guide covers the strokes.",
    longDescription:
      "The Sculpt Set pairs the two classic massage tools in one calm, stone finish. The gua sha's curved edges are shaped for the jaw, cheekbones and brow, while the roller covers larger areas quickly. A short printed guide shows the six strokes worth learning, so the ritual takes minutes rather than study. Used with a facial oil in the evening, skin looks smoother and the face appears more rested. Both tools wipe clean and live happily in a bathroom drawer.",
    howTo:
      "Apply a few drops of facial oil to clean skin. Sweep the gua sha slowly from the centre of the face outwards, keeping it almost flat against the skin: jawline, cheekbone, then brow, three to five strokes each. Finish with the roller over cheeks and forehead. Two to three evenings a week is plenty. Wipe both tools clean after use.",
    specs: "Composite-stone gua sha and dual-ended roller. Gua sha 8cm × 6cm; roller 15cm. Includes printed stroke guide and storage pouch. Wipe clean.",
    price: 16.99,
    concern: "Tension",
    ptype: "Accessory",
    finishes: [stone],
    variants: [{ label: "Sculpt Set", note: "Gua sha, roller and guide", price: 16.99 }],
    features: [
      "Curved gua sha for jaw, cheek and brow",
      "Dual-ended facial roller",
      "Printed six-stroke guide",
      "Storage pouch included",
      "Use with any facial oil",
    ],
    leadTime: standardLeadTime,
  },
  {
    slug: "glow-ritual",
    name: "The Glow Ritual",
    tagline: "Wand + Cool Roller",
    strapline: "The Veylo Wand and the Cool Roller, boxed together as one ritual.",
    description:
      "The complete Veylo ritual in one box: the Cool Roller for calmer-looking mornings and the Veylo Wand for five focused minutes at night. Bought together, the set saves £5 on the separate prices.",
    longDescription:
      "The Glow Ritual pairs our two most-used tools into a single daily routine. Mornings start with the fridge-cold roller to help the look of puffiness; evenings end with the wand's red light, microcurrent, warmth and massage. Together they take under ten minutes a day. Both arrive in one box with the five-minute ritual guide, priced £5 below buying each piece separately.",
    howTo:
      "Morning: two minutes with the Cool Roller, straight from the fridge, rolling from the centre of the face outwards. Evening: five minutes with the Veylo Wand on clean, dry skin, gliding upwards and outwards, then follow with serum. That is the whole ritual.",
    specs: "Includes the Veylo Wand (16.5cm × 4.1cm, 128g, USB-C, IPX4 splash resistant) and the Cool Roller (14.5cm, 120g, stainless steel). Boxed together with the ritual guide.",
    price: 59.99,
    previousPrice: 64.98,
    badge: "Save £5",
    concern: "Complete ritual",
    ptype: "Set",
    finishes: [pearl],
    variants: [{ label: "Glow Ritual", note: "Wand and Cool Roller together", price: 59.99 }],
    features: [
      "The Veylo Wand — 4-in-1 red light device",
      "The Cool Roller — fridge-cold stainless steel",
      "5-minute daily ritual guide",
      "One box, one delivery",
      "£5 saving on the separate prices",
    ],
    leadTime: standardLeadTime,
  },
];

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
