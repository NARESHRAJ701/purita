export interface Product {
  id: string;
  name: string;
  variant: string;
  subtitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  weight: string;
  rating: number;
  reviewCount: number;
  theme: {
    bg: string;
    border: string;
    badge: string;
    text: string;
    accent: string;
  };
  image: string;
  keyBotanicals: {
    name: string;
    benefit: string;
  }[];
  specifications: {
    tfm: string;
    grade: string;
    shelfLife: string;
    origin: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: 'sandal',
    name: 'Sandal',
    variant: 'Pure Mysore Sandalwood',
    subtitle: 'Calming. Refreshing. Timeless.',
    tagline: 'With pure sandalwood oil | Rejuvenates Skin | Anti-aging',
    description: 'Warm, grounding. Softens skin and locks moisture through the day.',
    longDescription: 'Formulated with pure Mysore sandalwood essential oil and rich botanical butters. Sandalwood has been celebrated for centuries in Indian wellness for its natural cooling and skin-rejuvenating qualities.',
    price: 185,
    weight: '125g',
    rating: 4.9,
    reviewCount: 342,
    theme: {
      bg: '#F5EBE1',
      border: 'rgba(168, 121, 69, 0.22)',
      badge: 'bg-[#F2E4D5] text-[#8C5E2D]',
      text: '#764F25',
      accent: '#A87945',
    },
    image: '/images/product_sandal.png',
    keyBotanicals: [
      { name: 'Mysore Sandalwood Oil', benefit: 'Deep calming aroma & natural skin elasticity' },
      { name: 'Virgin Coconut Oil', benefit: 'Rich non-drying lather & barrier protection' },
      { name: 'Almond Kernel Extract', benefit: 'High in Vitamin E to smooth micro-dryness' },
    ],
    specifications: {
      tfm: 'Grade 1 (76% Min)',
      grade: '100% Vegetarian  Soap',
      shelfLife: '36 Months from packaging',
      origin: 'Karnataka & Kerala, India',
    },
  },
  {
    id: 'turmeric-saffron',
    name: 'Turmeric & Saffron',
    variant: 'Wild Curcuma & Kashmiri Kesar',
    subtitle: 'Brighter. Clearer. Naturally.',
    tagline: 'Gives Clear Glowing Skin | Anti-Inflammatory | Antiseptic & Healing Properties',
    description: 'Brightens and clarifies tone while healing delicate tissue.',
    longDescription: 'A time-honored Ayurvedic symphony of hand-harvested Kashmiri saffron and wild golden curcuma. Gently purifies pores, reduces the appearance of sun blemishes, and imparts an unmistakable morning radiance.',
    price: 195,
    weight: '125g',
    rating: 5.0,
    reviewCount: 428,
    theme: {
      bg: '#FBF0D3',
      border: 'rgba(216, 169, 31, 0.24)',
      badge: 'bg-[#F8E8BE] text-[#9A7411]',
      text: '#8E670B',
      accent: '#D8A91F',
    },
    image: '/images/product_turmeric.png',
    keyBotanicals: [
      { name: 'Kashmiri Saffron Stigma', benefit: 'Potent carotenoids for healthy golden glow' },
      { name: 'Wild Kasturi Manjal', benefit: 'Natural antimicrobial & skin tone clarification' },
      { name: 'Golden Jojoba Seed Oil', benefit: 'Mimics skin lipids for balanced sebum' },
    ],
    specifications: {
      tfm: 'Grade 1 (76% Min)',
      grade: '100% Vegetarian  Soap',
      shelfLife: '36 Months from packaging',
      origin: 'Kashmir & Nilgiris, India',
    },
  },
  {
    id: 'aloe-lime',
    name: 'Aloe Vera & Lime',
    variant: 'Organic Aloe & Cold-Pressed Lime',
    subtitle: 'Fresh. Hydrated. Revitalized.',
    tagline: 'Natural Skin Moisturizer | Anti-Bacterial | Brings Natural Glow',
    description: 'Crisp, cooling hydration that washes away daily fatigue.',
    longDescription: 'An energizing wave of freshly filleted organic aloe barbadensis leaves and steam-distilled lime rind. Drenches the skin in calming hydration while citrus oils gently awaken the senses with every shower.',
    price: 175,
    weight: '125g',
    rating: 4.8,
    reviewCount: 289,
    theme: {
      bg: '#E9F1E2',
      border: 'rgba(90, 128, 67, 0.22)',
      badge: 'bg-[#DEEACF] text-[#41622F]',
      text: '#43632F',
      accent: '#5A8043',
    },
    image: '/images/product_aloe.png',
    keyBotanicals: [
      { name: 'Fresh Aloe Vera Leaf Gel', benefit: 'Deep cellular moisture & sunburn relief' },
      { name: 'Cold-Pressed Lime Zest', benefit: 'Natural astringent for clean, non-greasy pores' },
      { name: 'Cold-Pressed Castor Oil', benefit: 'Creates a dense, velvety conditioning lather' },
    ],
    specifications: {
      tfm: 'Grade 1 (76% Min)',
      grade: '100% Vegetarian  Soap',
      shelfLife: '36 Months from packaging',
      origin: 'Western Ghats, India',
    },
  },
  {
    id: 'coconut-milk',
    name: 'Coconut & Milk',
    variant: 'Tender Coconut & Natural Milk Cream',
    subtitle: 'Deep Cleanse. Silky Soft.',
    tagline: 'Deep Cleanses | Moisturizes Naturally | Soft & Smooth Skin',
    description: 'Rich, creamy tropical nourishment for velvety touch.',
    longDescription: 'Crafted from freshly pressed coastal coconut milk and soothing emollients, this indulgent formula cushions the skin against dryness and wraps the body in mild coconut blossom sweetness.',
    price: 180,
    weight: '125g',
    rating: 4.9,
    reviewCount: 215,
    theme: {
      bg: '#EAF3F9',
      border: 'rgba(74, 138, 185, 0.22)',
      badge: 'bg-[#DCEDF8] text-[#2C638B]',
      text: '#2C638B',
      accent: '#4A8AB9',
    },
    image: '/images/product_coconut.png',
    keyBotanicals: [
      { name: 'Cold-Pressed Coconut Milk', benefit: 'Packed with lauric acid & hydrating lipids' },
      { name: 'Natural Shea Butter', benefit: 'Locks in long-lasting suppleness' },
    ],
    specifications: {
      tfm: 'Grade 1 (76% Min)',
      grade: '100% Vegetarian  Soap',
      shelfLife: '36 Months from packaging',
      origin: 'Kerala Coast, India',
    },
  },
  {
    id: 'rose-almond',
    name: 'Rose & Almond',
    variant: 'Damask Rose & Sweet Almond',
    subtitle: 'Soft. Nourished. Gentle Care.',
    tagline: 'Soft & Nourished Skin | Natural Moisturizer | Gentle Care',
    description: 'Delicate floral essence balanced with sweet almond richness.',
    longDescription: 'Distilled from aromatic Kannauj Damask rose petals and combined with cold-pressed sweet almond oil. Leaves skin petal-soft and delicately perfumed with authentic floral dew.',
    price: 190,
    weight: '125g',
    rating: 4.9,
    reviewCount: 198,
    theme: {
      bg: '#F9ECEE',
      border: 'rgba(196, 92, 114, 0.22)',
      badge: 'bg-[#F6DEE2] text-[#97384E]',
      text: '#97384E',
      accent: '#C45C72',
    },
    image: '/images/product_rose.png',
    keyBotanicals: [
      { name: 'Kannauj Rose Distillate', benefit: 'Tones and refreshes delicate skin' },
      { name: 'Cold-Pressed Almond Oil', benefit: 'Rich in proteins and gentle fatty acids' },
    ],
    specifications: {
      tfm: 'Grade 1 (76% Min)',
      grade: '100% Vegetarian  Soap',
      shelfLife: '36 Months from packaging',
      origin: 'Uttar Pradesh & Kashmir, India',
    },
  },
];
