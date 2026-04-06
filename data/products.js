// ─── Earth & Essence Co. — Product Catalogue ────────────────────────────────
// Drop product photos in /public/images/ using the filenames in the `image`
// field below. The site will auto-display them once the file is present.
//
// Accent colours:
//   Hair Soap  → terra   #7E3717
//   Skin Soap  → olive   #4D6535
//   Face Cream → teal    #2A5C4E

export const products = [
  // ── Hair Soaps ──────────────────────────────────────────────────────────────
  {
    id:                   'hs-001',
    slug:                 'rosemary-amla-hair-soap',
    name:                 'Rosemary & Amla Hair Soap',
    category:             'hair-soap',
    categoryLabel:        'Hair Soap',
    price:                14.00,
    priceINR:             1200,
    weight:               '100g',
    accentColor:          '#7E3717',
    imagePlaceholderBg:   '#D9C5A8',
    image:                '/images/rosemary-amla-hair-soap.jpg',
    keyIngredient:        'Rosemary + Amla',
    shortDescription:     'Stimulates the scalp and strengthens roots with cold-pressed amla and wild rosemary.',
    description:          'A deeply nourishing hair bar packed with antioxidant-rich amla and circulation-boosting rosemary. Lathers gently, rinses clean, and leaves hair soft, shiny, and manageable. Free from sulphates, parabens, and synthetic fragrance.',
    benefits:             ['Reduces hair fall', 'Stimulates growth', 'Adds natural shine', 'Sulphate-free lather'],
    featured:             true,
  },
  {
    id:                   'hs-002',
    slug:                 'hibiscus-fenugreek-hair-soap',
    name:                 'Hibiscus & Fenugreek Hair Soap',
    category:             'hair-soap',
    categoryLabel:        'Hair Soap',
    price:                13.00,
    priceINR:             1100,
    weight:               '100g',
    accentColor:          '#7E3717',
    imagePlaceholderBg:   '#C9B5A0',
    image:                '/images/hibiscus-fenugreek-hair-soap.jpg',
    keyIngredient:        'Hibiscus + Fenugreek',
    shortDescription:     'Conditions from root to tip while fighting dandruff naturally.',
    description:          'Hibiscus is nature\'s conditioner — it softens, detangles, and adds volume. Fenugreek seeds fight dandruff and soothe an itchy scalp. Together they create a bar that leaves every strand smooth and full of life.',
    benefits:             ['Conditions & detangles', 'Fights dandruff', 'Adds volume', 'Scalp-soothing'],
    featured:             true,
  },
  {
    id:                   'hs-003',
    slug:                 'bhringraj-coconut-hair-soap',
    name:                 'Bhringraj & Coconut Hair Soap',
    category:             'hair-soap',
    categoryLabel:        'Hair Soap',
    price:                14.00,
    priceINR:             1200,
    weight:               '100g',
    accentColor:          '#7E3717',
    imagePlaceholderBg:   '#D4BFA3',
    image:                '/images/bhringraj-coconut-hair-soap.jpg',
    keyIngredient:        'Bhringraj + Virgin Coconut',
    shortDescription:     'The Ayurvedic hair-growth herb meets virgin coconut oil for deep nourishment.',
    description:          'Bhringraj — revered in Ayurveda as the "king of herbs for hair" — is combined with moisturising virgin coconut oil to prevent breakage and promote thick, lustrous growth. Ideal for dry, brittle, or damaged hair.',
    benefits:             ['Promotes thick growth', 'Prevents breakage', 'Deep moisture', 'Ayurvedic formula'],
    featured:             false,
  },

  // ── Skin Soaps ──────────────────────────────────────────────────────────────
  {
    id:                   'ss-001',
    slug:                 'turmeric-neem-skin-soap',
    name:                 'Turmeric & Neem Skin Soap',
    category:             'skin-soap',
    categoryLabel:        'Skin Soap',
    price:                12.00,
    priceINR:             999,
    weight:               '100g',
    accentColor:          '#4D6535',
    imagePlaceholderBg:   '#D8CFA8',
    image:                '/images/turmeric-neem-skin-soap.jpg',
    keyIngredient:        'Turmeric + Neem',
    shortDescription:     'Brightens complexion and combats acne with ancient Ayurvedic ingredients.',
    description:          'Raw turmeric powder and cold-pressed neem leaf infusion combine to gently clarify skin, fade dark spots, and keep acne-causing bacteria at bay. Suitable for all skin types; especially loved by oily and combination skin.',
    benefits:             ['Brightens & evens tone', 'Fights acne & bacteria', 'Fades dark spots', 'Anti-inflammatory'],
    featured:             true,
  },
  {
    id:                   'ss-002',
    slug:                 'rose-shea-skin-soap',
    name:                 'Rose & Shea Butter Skin Soap',
    category:             'skin-soap',
    categoryLabel:        'Skin Soap',
    price:                13.00,
    priceINR:             1099,
    weight:               '100g',
    accentColor:          '#4D6535',
    imagePlaceholderBg:   '#D9BFBF',
    image:                '/images/rose-shea-skin-soap.jpg',
    keyIngredient:        'Rose Petals + Shea Butter',
    shortDescription:     'Deeply moisturising and lightly floral — a treat for dry, sensitive skin.',
    description:          'Dried rose petals and unrefined shea butter make this the most indulgent bar in the range. It cleanses without stripping, leaving skin dewy-soft and with a gentle, natural rose fragrance. Perfect for dry, sensitive, or mature skin.',
    benefits:             ['Intense moisturisation', 'Gentle for sensitive skin', 'Natural rose scent', 'Anti-aging antioxidants'],
    featured:             true,
  },
  {
    id:                   'ss-003',
    slug:                 'charcoal-tea-tree-skin-soap',
    name:                 'Charcoal & Tea Tree Skin Soap',
    category:             'skin-soap',
    categoryLabel:        'Skin Soap',
    price:                13.00,
    priceINR:             1099,
    weight:               '100g',
    accentColor:          '#4D6535',
    imagePlaceholderBg:   '#B8B8B0',
    image:                '/images/charcoal-tea-tree-skin-soap.jpg',
    keyIngredient:        'Activated Charcoal + Tea Tree',
    shortDescription:     'Draws out impurities and unclogs pores for deeply clean, clear skin.',
    description:          'Activated charcoal acts like a magnet for toxins, oil, and environmental pollutants. Tea tree oil provides natural antibacterial protection. Together they make the ultimate deep-cleansing bar for congested, oily, or blemish-prone skin.',
    benefits:             ['Deep-pore cleansing', 'Removes toxins & pollution', 'Antibacterial', 'Mattifying'],
    featured:             false,
  },

  // ── Face Creams ─────────────────────────────────────────────────────────────
  {
    id:                   'fc-001',
    slug:                 'saffron-vitamin-c-face-cream',
    name:                 'Saffron & Vitamin C Face Cream',
    category:             'face-cream',
    categoryLabel:        'Face Cream',
    price:                28.00,
    priceINR:             2299,
    weight:               '50ml',
    accentColor:          '#2A5C4E',
    imagePlaceholderBg:   '#D4C0A0',
    image:                '/images/saffron-vitamin-c-face-cream.jpg',
    keyIngredient:        'Saffron + Vitamin C',
    shortDescription:     'Brightens and protects with the power of pure saffron and stabilised Vitamin C.',
    description:          'Rare saffron threads infused in a base of rosehip and jojoba oil deliver a luminous glow, while stabilised Vitamin C works overnight to fade hyperpigmentation and even skin tone. Absorbs quickly; no greasy residue.',
    benefits:             ['Brightens & glows', 'Fades dark spots', 'Antioxidant protection', 'Fast-absorbing'],
    featured:             true,
  },
  {
    id:                   'fc-002',
    slug:                 'aloe-sandalwood-face-cream',
    name:                 'Aloe & Sandalwood Face Cream',
    category:             'face-cream',
    categoryLabel:        'Face Cream',
    price:                26.00,
    priceINR:             2099,
    weight:               '50ml',
    accentColor:          '#2A5C4E',
    imagePlaceholderBg:   '#C8D4BC',
    image:                '/images/aloe-sandalwood-face-cream.jpg',
    keyIngredient:        'Aloe Vera + Sandalwood',
    shortDescription:     'Calms redness and locks in moisture with cooling aloe and grounding sandalwood.',
    description:          'This calming face cream combines pure aloe vera gel with precious sandalwood extract to soothe inflammation, restore the skin barrier, and lock in moisture all day. Fragrant, gentle, and suitable for all skin types including sensitive.',
    benefits:             ['Soothes redness & inflammation', 'Long-lasting hydration', 'Barrier repair', 'Suitable for sensitive skin'],
    featured:             true,
  },
]

// Helper: get featured products
export const featuredProducts = products.filter(p => p.featured)

// Helper: get by category
export const getByCategory = (cat) => products.filter(p => p.category === cat)

// Helper: get by slug
export const getBySlug = (slug) => products.find(p => p.slug === slug)
