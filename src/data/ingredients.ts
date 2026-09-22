export interface FeaturedIngredient {
  id: string;
  name: string;
  latinName: string;
  description: string;
  benefits: string[];
  image: string;
}

export interface HorizontalIngredient {
  id: string;
  number: string;
  name: string;
  latinName: string;
  source: string;
  role: string;
  description: string;
  tags: string[];
  image: string;
}

export const FEATURED_INGREDIENTS: FeaturedIngredient[] = [
  {
    id: 'sandal',
    name: 'Sandal',
    latinName: 'Santalum album',
    description: 'Warm, grounding. Softens skin and locks moisture through the day.',
    benefits: ['Natural cooling agent', 'Calms inflammation', 'Distinctive sacred aroma'],
    image: '/images/ingredient_sandalwood.jpg',
  },
  {
    id: 'moss',
    name: 'Moss Extract',
    latinName: 'Physcomitrella patens',
    description: 'Helps soothe and protect skin. Keeps it fresh and balanced.',
    benefits: ['Skin microbiome defense', 'Enhances resilience', 'Deep cellular hydration'],
    image: '/images/ingredient_moss.jpg',
  },
  {
    id: 'jojoba',
    name: 'Cold-Pressed Jojoba',
    latinName: 'Simmondsia chinensis',
    description: 'Deeply nourishes. Supports healthy, glowing skin naturally.',
    benefits: ['Mimics natural skin lipids', 'Non-comedogenic moisture', 'Rich in Vitamin B-Complex'],
    image: '/images/ingredient_jojoba.jpg',
  },
];

export const HORIZONTAL_INGREDIENTS: HorizontalIngredient[] = [
  {
    id: 'sandal-wood',
    number: '01',
    name: 'Mysore Sandalwood',
    latinName: 'Santalum album',
    source: 'Karnataka Foothills',
    role: 'Soothes & Firms',
    description: 'Ethically harvested from aged heartwood, delivering alpha-santalol for skin rejuvenation and peaceful grounding.',
    tags: ['Aromatic', 'Cooling', 'Anti-aging'],
    image: '/images/ingredient_sandalwood.jpg',
  },
  {
    id: 'moss-extract',
    number: '02',
    name: 'Alpine Moss',
    latinName: 'Sphagnum magellanicum',
    source: 'High Altitude Valleys',
    role: 'Barrier Protection',
    description: 'Ancient botanical survivalist that adapts skin cells to environmental stress and shields natural hydration.',
    tags: ['Adaptogen', 'Microbiome', 'Soothing'],
    image: '/images/ingredient_moss.jpg',
  },
  {
    id: 'wild-turmeric',
    number: '03',
    name: 'Wild Turmeric',
    latinName: 'Curcuma aromatica',
    source: 'Wayanad, Kerala',
    role: 'Purifies & Brightens',
    description: 'Non-staining wild kasturi manjal bursting with curcuminoids to clear blemishes and awaken luminous skin tone.',
    tags: ['Brightening', 'Antiseptic', 'Antioxidant'],
    image: '/images/ingredient_turmeric_real.jpg',
  },
  {
    id: 'aloe-barbadensis',
    number: '04',
    name: 'Organic Aloe Vera',
    latinName: 'Aloe barbadensis Miller',
    source: 'Dryland Sustainable Farms',
    role: 'Quenches & Restores',
    description: 'Hand-filleted inner gel rich in acemannan polysaccharides that flood the dermis with cooling moisture.',
    tags: ['Deep Hydration', 'Enzymatic', 'Calming'],
    image: '/images/ingredient_aloe_real.jpg',
  },
  {
    id: 'kashmiri-saffron',
    number: '05',
    name: 'Kashmiri Saffron',
    latinName: 'Crocus sativus',
    source: 'Pampore Plateau',
    role: 'Golden Glow',
    description: 'Delicate crimson threads harvested at dawn, prized for crocin that boosts cellular microcirculation.',
    tags: ['Luxury Radiance', 'Free Radical Defense'],
    image: '/images/ingredient_saffron_real.jpg',
  },
  {
    id: 'virgin-coconut',
    number: '06',
    name: 'Cold-Pressed Coconut',
    latinName: 'Cocos nucifera',
    source: 'Malabar Coastline',
    role: 'Creamy Cushion Lather',
    description: 'Unrefined coconut milk and oil delivering fatty acids that cleanse thoroughly without stripping moisture.',
    tags: ['Rich Lather', 'Lauric Acid', 'Softness'],
    image: '/images/ingredient_coconut_real.jpg',
  },
];
