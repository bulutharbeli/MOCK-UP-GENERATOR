import type { ProductCategory } from './types';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'tshirt',
    name: 'T-Shirt',
    attributes: [
        { key: 'color', name: 'Color' },
        { key: 'style', name: 'Style' },
    ],
    variants: [
      {
        id: 'tshirt-white-short',
        name: 'White, Short Sleeve',
        imageUrl: 'https://picsum.photos/seed/tshirt-white-short/300/300',
        prompt: 'A high-quality studio product shot of a plain white cotton t-shirt, laid flat on a neutral background, with the provided logo prominently on the chest.',
        attributes: { color: 'white', style: 'Short Sleeve' },
      },
      {
        id: 'tshirt-black-short',
        name: 'Black, Short Sleeve',
        imageUrl: 'https://picsum.photos/seed/tshirt-black-short/300/300',
        prompt: 'A high-quality studio product shot of a plain black cotton t-shirt, worn by a mannequin, with the provided logo prominently on the chest.',
        attributes: { color: 'black', style: 'Short Sleeve' },
      },
       {
        id: 'tshirt-white-long',
        name: 'White, Long Sleeve',
        imageUrl: 'https://picsum.photos/seed/tshirt-white-long/300/300',
        prompt: 'A high-quality studio product shot of a plain white long-sleeve t-shirt, laid flat on a neutral background, with the provided logo prominently on the chest.',
        attributes: { color: 'white', style: 'Long Sleeve' },
      },
      {
        id: 'tshirt-blue-short',
        name: 'Blue, Short Sleeve',
        imageUrl: 'https://picsum.photos/seed/tshirt-blue-short/300/300',
        prompt: 'A high-quality studio product shot of a plain royal blue cotton t-shirt, on a hanger against a white wall, with the provided logo prominently on the chest.',
        attributes: { color: 'blue', style: 'Short Sleeve' },
      },
      {
        id: 'tshirt-red-vneck',
        name: 'Red, V-Neck',
        imageUrl: 'https://picsum.photos/seed/tshirt-red-vneck/300/300',
        prompt: 'A high-quality studio product shot of a plain red v-neck t-shirt, laid flat on a wooden surface, with the provided logo prominently on the chest.',
        attributes: { color: 'red', style: 'V-Neck' },
      },
    ],
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    attributes: [
        { key: 'color', name: 'Color' },
        { key: 'style', name: 'Style' },
    ],
    variants: [
         {
            id: 'hoodie-gray',
            name: 'Gray',
            imageUrl: 'https://picsum.photos/seed/hoodie-gray/300/300',
            prompt: 'A lifestyle shot of a folded gray hoodie on a clean, light surface. The provided logo is printed large on the center chest area.',
            attributes: { color: 'gray', style: 'Pullover' },
        },
        {
            id: 'hoodie-black',
            name: 'Black',
            imageUrl: 'https://picsum.photos/seed/hoodie-black/300/300',
            prompt: 'A lifestyle shot of a folded black hoodie on a dark, textured surface. The provided logo is printed large on the center chest area.',
            attributes: { color: 'black', style: 'Pullover' },
        },
        {
            id: 'hoodie-navy-zipup',
            name: 'Navy, Zip-Up',
            imageUrl: 'https://picsum.photos/seed/hoodie-navy-zipup/300/300',
            prompt: 'A studio shot of a navy blue zip-up hoodie, zipped up and worn by a mannequin, with the provided logo on the left chest.',
            attributes: { color: 'navy', style: 'Zip-Up' },
        },
    ]
  },
  {
    id: 'hat',
    name: 'Cap',
    attributes: [
        { key: 'color', name: 'Color' },
        { key: 'style', name: 'Style' },
    ],
    variants: [
        {
            id: 'hat-black',
            name: 'Black',
            imageUrl: 'https://picsum.photos/seed/hat-black/300/300',
            prompt: 'A stylish product shot of a black baseball cap facing forward, with the provided logo embroidered on the front panel.',
            attributes: { color: 'black', style: 'Baseball' },
        },
        {
            id: 'hat-white',
            name: 'White',
            imageUrl: 'https://picsum.photos/seed/hat-white/300/300',
            prompt: 'A stylish product shot of a white baseball cap facing forward on a pastel background, with the provided logo embroidered on the front panel.',
            attributes: { color: 'white', style: 'Baseball' },
        },
        {
            id: 'hat-beanie-black',
            name: 'Black Beanie',
            imageUrl: 'https://picsum.photos/seed/hat-beanie-black/300/300',
            prompt: 'A product shot of a black beanie, folded neatly on a wooden table, with the provided logo on a small patch on the cuff.',
            attributes: { color: 'black', style: 'Beanie' },
        },
    ]
  },
  {
    id: 'mug',
    name: 'Mug',
    attributes: [
        { key: 'material', name: 'Material' },
    ],
    variants: [
      {
        id: 'mug-white',
        name: 'White Ceramic',
        imageUrl: 'https://picsum.photos/seed/mug-white/300/300',
        prompt: 'A crisp, clean product shot of a white ceramic coffee mug on a wooden table, with the provided logo clearly visible on its side.',
        attributes: { material: 'Ceramic' },
      },
      {
        id: 'mug-black',
        name: 'Black Ceramic',
        imageUrl: 'https://picsum.photos/seed/mug-black/300/300',
        prompt: 'A crisp, clean product shot of a black ceramic coffee mug on a dark, moody background, with the provided logo clearly visible on its side.',
        attributes: { material: 'Ceramic' },
      },
      {
        id: 'mug-enamel',
        name: 'Enamel Camp Mug',
        imageUrl: 'https://picsum.photos/seed/mug-enamel/300/300',
        prompt: 'A rustic product shot of a white enamel camp mug with a silver rim, sitting on a rock outdoors, with the provided logo on the side.',
        attributes: { material: 'Enamel' },
      },
    ],
  },
  {
    id: 'tote-bag',
    name: 'Tote Bag',
    attributes: [
        { key: 'color', name: 'Color' },
    ],
    variants: [
      {
        id: 'tote-bag-canvas',
        name: 'Canvas',
        imageUrl: 'https://picsum.photos/seed/tote-bag/300/300',
        prompt: 'A studio photograph of a canvas tote bag hanging against a soft-colored wall. The provided logo is featured in the center of the bag.',
        attributes: { color: 'canvas' },
      },
       {
        id: 'tote-bag-black',
        name: 'Black',
        imageUrl: 'https://picsum.photos/seed/tote-bag-black/300/300',
        prompt: 'A studio photograph of a black canvas tote bag hanging against a gray concrete wall. The provided logo is featured in the center of the bag.',
        attributes: { color: 'black' },
      },
    ]
  },
   {
    id: 'phone-case',
    name: 'Phone Case',
    attributes: [
        { key: 'style', name: 'Style' },
    ],
    variants: [
      {
        id: 'phone-case-iphone-black',
        name: 'iPhone, Black',
        imageUrl: 'https://picsum.photos/seed/phone-case-black/300/300',
        prompt: 'A clean product shot of a black matte iPhone case, with the provided logo centered on the back.',
        attributes: { style: 'Matte' },
      },
       {
        id: 'phone-case-iphone-clear',
        name: 'iPhone, Clear',
        imageUrl: 'https://picsum.photos/seed/phone-case-clear/300/300',
        prompt: 'A product shot of a clear iPhone case on a minimalist background, showing the phone through it, with the provided logo printed on the case.',
        attributes: { style: 'Clear' },
      },
    ]
  },
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    attributes: [
        { key: 'material', name: 'Material' },
    ],
    variants: [
      {
        id: 'bottle-stainless',
        name: 'Stainless Steel',
        imageUrl: 'https://picsum.photos/seed/bottle-stainless/300/300',
        prompt: 'A product shot of a matte black stainless steel water bottle on a gym background, with the provided logo printed vertically on it.',
        attributes: { material: 'Stainless Steel' },
      },
       {
        id: 'bottle-plastic-clear',
        name: 'Clear Plastic',
        imageUrl: 'https://picsum.photos/seed/bottle-plastic/300/300',
        prompt: 'A product shot of a clear plastic sports water bottle with a black cap, filled with water, with the provided logo on the side.',
        attributes: { material: 'Plastic' },
      },
    ]
  },
  {
    id: 'minivan',
    name: 'Minivan',
    attributes: [
        { key: 'color', name: 'Color' },
        { key: 'angle', name: 'Angle' },
    ],
    variants: [
      {
        id: 'minivan-white-side',
        name: 'White, Side View',
        imageUrl: 'https://picsum.photos/seed/minivan-white-side/300/300',
        prompt: 'A high-quality, professional photograph of a modern white minivan, side view, parked in a clean, well-lit suburban driveway. The provided logo should be placed prominently on the front door.',
        attributes: { color: 'white', angle: 'Side View' },
      },
      {
        id: 'minivan-white-front',
        name: 'White, Front View',
        imageUrl: 'https://picsum.photos/seed/minivan-white-front/300/300',
        prompt: 'A high-quality, professional photograph of a modern white minivan from the front, parked on a clean street. The provided logo should be placed prominently on the center of the hood.',
        attributes: { color: 'white', angle: 'Front View' },
      },
       {
        id: 'minivan-black-side',
        name: 'Black, Side View',
        imageUrl: 'https://picsum.photos/seed/minivan-black-side/300/300',
        prompt: 'A high-quality, professional photograph of a modern black minivan, side view, parked in a minimalist studio setting. The provided logo should be placed prominently on the front door.',
        attributes: { color: 'black', angle: 'Side View' },
      },
      {
        id: 'minivan-black-angled',
        name: 'Black, Angled View',
        imageUrl: 'https://picsum.photos/seed/minivan-black-angled/300/300',
        prompt: 'A high-quality, professional photograph of a modern black minivan, at a three-quarter front angle, parked in an urban environment at dusk. The provided logo should be placed prominently on the side panel behind the front wheel.',
        attributes: { color: 'black', angle: 'Angled View' },
      },
      {
        id: 'minivan-silver-side',
        name: 'Silver, Side View',
        imageUrl: 'https://picsum.photos/seed/minivan-silver-side/300/300',
        prompt: 'A high-quality, professional photograph of a modern silver minivan, side view, in motion on a highway. The provided logo should be placed prominently on the sliding side door.',
        attributes: { color: 'silver', angle: 'Side View' },
      },
      {
        id: 'minivan-blue-back',
        name: 'Blue, Back View',
        imageUrl: 'https://picsum.photos/seed/minivan-blue-back/300/300',
        prompt: 'A high-quality, professional photograph of a modern dark blue minivan from the rear, parked with the trunk open. The provided logo should be placed prominently on the back window.',
        attributes: { color: 'blue', angle: 'Back View' },
      },
    ]
  },
  {
    id: 'business-card',
    name: 'Business Card',
    attributes: [
        { key: 'style', name: 'Corners' },
        { key: 'finish', name: 'Finish' },
    ],
    variants: [
      {
        id: 'card-standard-flat',
        name: 'Standard, Flat Corners',
        imageUrl: 'https://picsum.photos/seed/card-standard-flat/300/300',
        prompt: 'A professional mockup of a standard business card with sharp, flat corners, made of thick matte cardstock. The card is lying on a clean, minimalist desk. The provided logo is prominently displayed in the center.',
        attributes: { style: 'Flat', finish: 'Standard' },
      },
      {
        id: 'card-standard-rounded',
        name: 'Standard, Rounded Corners',
        imageUrl: 'https://picsum.photos/seed/card-standard-rounded/300/300',
        prompt: 'A professional mockup of a modern business card with smooth, rounded corners, made of high-quality silk-finish cardstock. The card is shown at a slight angle on a light gray background. The provided logo is featured on the top half.',
        attributes: { style: 'Rounded', finish: 'Standard' },
      },
      {
        id: 'card-goldfoil-flat',
        name: 'Gold Foil, Flat Corners',
        imageUrl: 'https://picsum.photos/seed/card-goldfoil-flat/300/300',
        prompt: 'A luxurious mockup of a business card on black cardstock with sharp, flat corners. The provided logo is rendered in reflective gold foil, catching the light. The card is placed on a dark marble surface.',
        attributes: { style: 'Flat', finish: 'Gold Foil' },
      },
      {
        id: 'card-goldfoil-rounded',
        name: 'Gold Foil, Rounded Corners',
        imageUrl: 'https://picsum.photos/seed/card-goldfoil-rounded/300/300',
        prompt: 'A luxurious mockup of a business card on black cardstock with elegant rounded corners. The provided logo is rendered in reflective gold foil, catching the light. The card is placed on a dark marble surface.',
        attributes: { style: 'Rounded', finish: 'Gold Foil' },
      },
       {
        id: 'card-silverfoil-flat',
        name: 'Silver Foil, Flat Corners',
        imageUrl: 'https://picsum.photos/seed/card-silverfoil-flat/300/300',
        prompt: 'A premium mockup of a business card on navy blue cardstock with sharp, flat corners. The provided logo is stamped in shimmering silver foil. The card is part of a stack, showing off the edge.',
        attributes: { style: 'Flat', finish: 'Silver Foil' },
      },
       {
        id: 'card-silverfoil-rounded',
        name: 'Silver Foil, Rounded Corners',
        imageUrl: 'https://picsum.photos/seed/card-silverfoil-rounded/300/300',
        prompt: 'A premium mockup of a business card on navy blue cardstock with elegant rounded corners. The provided logo is stamped in shimmering silver foil. The card is part of a stack, showing off the edge.',
        attributes: { style: 'Rounded', finish: 'Silver Foil' },
      },
      {
        id: 'card-embossed-flat',
        name: 'Embossed, Flat Corners',
        imageUrl: 'https://picsum.photos/seed/card-embossed-flat/300/300',
        prompt: 'An elegant mockup of a business card on thick, textured white cotton paper with flat corners. The provided logo is embossed, creating a raised, tactile effect. The lighting is soft, highlighting the texture and shadow of the emboss.',
        attributes: { style: 'Flat', finish: 'Embossed' },
      },
      {
        id: 'card-embossed-rounded',
        name: 'Embossed, Rounded Corners',
        imageUrl: 'https://picsum.photos/seed/card-embossed-rounded/300/300',
        prompt: 'An elegant mockup of a business card on thick, textured white cotton paper with smooth, rounded corners. The provided logo is embossed, creating a raised, tactile effect. The lighting is soft, highlighting the texture and shadow of the emboss.',
        attributes: { style: 'Rounded', finish: 'Embossed' },
      },
    ]
  },
];