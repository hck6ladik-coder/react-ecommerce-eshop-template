import { Product, ShippingOption, PaymentOption } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'Všechny produkty', count: 26 },
  { id: 'mobily', name: 'Mobily', count: 6 },
  { id: 'notebooky', name: 'Notebooky', count: 6 },
  { id: 'tv-audio', name: 'TV & Audio', count: 6 },
  { id: 'tablety', name: 'Tablety', count: 4 },
  { id: 'prislusenstvi', name: 'Příslušenství & Gaming', count: 4 },
] as const;

export const BRANDS = [
  'Samsung',
  'Apple',
  'Xiaomi',
  'HP',
  'Lenovo',
  'Asus',
  'Dell',
  'Sony',
  'LG',
  'JBL',
  'Sonos',
  'SoundFlow',
  'Logitech',
  'Anker',
  'Raptor Gaming',
];

export const PRODUCTS: Product[] = [
  // --- MOBILY ---
  {
    id: 'smartphone-nova-x10',
    name: 'Smartphone Nova X10',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Xiaomi',
    subtitle: '128GB, Black',
    description: 'Stylový chytrý telefon s 6,67" AMOLED 120Hz displejem, výkonným osmijádrovým procesorem Snapdragon a trojitým 64Mpx fotoaparátem s optickou stabilizací. Baterie 5000 mAh s 67W turbo nabíjením vám zajistí energii na celý den za pouhých 25 minut.',
    price: 7990,
    originalPrice: 8990,
    rating: 4.7,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 14,
    isFeatured: true,
    isSale: true,
    badge: 'Akce',
    specs: {
      'Displej': '6.67" AMOLED, 2400 x 1080 px, 120Hz',
      'Procesor': 'Qualcomm Snapdragon 7s Gen 2 (8 jader)',
      'Operační paměť': '8 GB RAM',
      'Úložiště': '128 GB interní paměť',
      'Fotoaparát': '64 Mpx + 8 Mpx širokoúhlý + 2 Mpx makro',
      'Přední kamera': '16 Mpx',
      'Baterie': '5 000 mAh (67W rychlonabíjení)',
      'Operační systém': 'Android 14 s nadstavbou HyperOS',
      'Konektivita': '5G, Wi-Fi 6, Bluetooth 5.3, NFC, USB-C',
    },
    reviews: [
      {
        id: 'r1',
        author: 'Tomáš K.',
        rating: 5,
        date: '12. 08. 2026',
        comment: 'Skvělý poměr cena/výkon. Displej je naprosto parádní a nabíjení je bleskové!',
        verified: true
      },
      {
        id: 'r2',
        author: 'Martina V.',
        rating: 4,
        date: '05. 08. 2026',
        comment: 'Pěkný design a fotky za denního světla jsou perfektní. Baterie vydrží bez problému 2 dny.',
        verified: true
      }
    ]
  },
  {
    id: 'apple-iphone-15-pro',
    name: 'Apple iPhone 15 Pro',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Apple',
    subtitle: '128GB, Přírodní titan',
    description: 'Revoluční konstrukce z leteckého titanu, dosud nejvýkonnější čip A17 Pro s podporou Ray Tracingu a špičkový 48Mpx hlavní fotoaparát se 7 ohniskovými vzdálenostmi. Tlačítko Akce a univerzální USB-C konektor.',
    price: 26990,
    originalPrice: 29990,
    rating: 4.9,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 8,
    isFeatured: true,
    isSale: true,
    badge: 'Novinka',
    specs: {
      'Displej': '6.1" Super Retina XDR OLED, ProMotion 120Hz, Always-On',
      'Procesor': 'Apple A17 Pro (6 jader, 3nm)',
      'Operační paměť': '8 GB RAM',
      'Úložiště': '128 GB',
      'Fotoaparát': '48 Mpx hlavní (f/1.78) + 12 Mpx teleobjektiv 3x + 12 Mpx ultraširoký',
      'Konstrukce': 'Titanový rám, Ceramic Shield sklo, IP68 voděodolnost',
      'Konektivita': 'USB-C (USB 3 až 10 Gb/s), 5G, Wi-Fi 6E, MagSafe',
    },
    reviews: [
      {
        id: 'r-ap1',
        author: 'Jakub M.',
        rating: 5,
        date: '14. 08. 2026',
        comment: 'Titan je neskutečně lehký a příjemný do ruky. Fotoaparát dělá profi fotky.',
        verified: true
      }
    ]
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra 5G',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Samsung',
    subtitle: '512GB, Titanium Gray + S-Pen',
    description: 'Vlajková loď nové éry s integrovanou Galaxy AI. 200Mpx fotoaparát s revolučním nočním viděním a 5x optickým teleobjektivem. Odolný titanový rám, rovný Dynamic AMOLED 2X displej s antireflexní vrstvou a vestavěné pero S-Pen.',
    price: 33490,
    originalPrice: 38490,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 5,
    isFeatured: true,
    isSale: false,
    badge: 'Bestseller',
    specs: {
      'Displej': '6.8" Dynamic AMOLED 2X, 3120 x 1440 px, 120Hz, 2600 nitů',
      'Procesor': 'Snapdragon 8 Gen 3 for Galaxy (8 jader, 3.39 GHz)',
      'Operační paměť': '12 GB RAM',
      'Úložiště': '512 GB UFS 4.0',
      'Fotoaparát': '200 Mpx (OIS) + 50 Mpx (5x zoom) + 10 Mpx (3x zoom) + 12 Mpx',
      'Baterie': '5000 mAh, 45W rychlé nabíjení, 15W bezdrátové',
      'Speciální funkce': 'Pero S-Pen, Galaxy AI, podpora Ray Tracingu',
    },
    reviews: [
      {
        id: 'r-s24',
        author: 'Ondřej K.',
        rating: 5,
        date: '10. 08. 2026',
        comment: 'Absolutní technologický vrchol. Pero S-Pen používám denně na poznámky i retuš.',
        verified: true
      }
    ]
  },
  {
    id: 'samsung-galaxy-a55',
    name: 'Samsung Galaxy A55 5G',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Samsung',
    subtitle: '128GB, Awesome Navy',
    description: 'Oblíbený telefon střední třídy s kovovým rámečkem, prémiovým skleněným zadním krytem a 50Mpx fotoaparátem s optickou stabilizací. Vynikající výdrž 5000 mAh baterie a certifikace IP67 proti vodě a prachu.',
    price: 9490,
    originalPrice: 10990,
    rating: 4.6,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 19,
    isFeatured: false,
    isSale: true,
    badge: 'Akce',
    specs: {
      'Displej': '6.6" Super AMOLED, 2340 x 1080 px, 120Hz',
      'Procesor': 'Exynos 1480 (8 jader)',
      'Operační paměť': '8 GB RAM',
      'Úložiště': '128 GB + microSD až 1 TB',
      'Fotoaparát': '50 Mpx OIS + 12 Mpx širokoúhlý + 5 Mpx makro',
      'Baterie': '5 000 mAh, 25W nabíjení',
      'Odolnost': 'Kovový rám, Gorilla Glass Victus+, IP67',
    },
    reviews: [
      {
        id: 'r-a55',
        author: 'Tereza P.',
        rating: 5,
        date: '03. 08. 2026',
        comment: 'Skvělý telefon za super peníze, displej je nádherný a fotky také.',
        verified: true
      }
    ]
  },
  {
    id: 'xiaomi-redmi-note-13-pro-plus',
    name: 'Xiaomi Redmi Note 13 Pro+ 5G',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Xiaomi',
    subtitle: '256GB / 12GB RAM, Midnight Black',
    description: 'Špičkový smartphone se zakřiveným 1.5K AMOLED 120Hz displejem, gigantickým 200Mpx fotoaparátem s OIS a extrémním 120W HyperCharge nabíjením (100 % za 19 minut).',
    price: 10490,
    originalPrice: 11990,
    rating: 4.7,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 11,
    isFeatured: false,
    isSale: true,
    badge: '120W Nabíjení',
    specs: {
      'Displej': '6.67" Zakřivený AMOLED 1.5K (2712 x 1220 px), 120Hz, 1800 nitů',
      'Procesor': 'MediaTek Dimensity 7200-Ultra (4nm)',
      'Operační paměť': '12 GB LPDDR5',
      'Úložiště': '256 GB UFS 3.1',
      'Fotoaparát': '200 Mpx (Samsung ISOCELL HP3, f/1.65, OIS)',
      'Baterie': '5 000 mAh (120W HyperCharge, 100 % za 19 min)',
      'Odolnost': 'IP68 voděodolnost a prachotěsnost',
    },
    reviews: [
      {
        id: 'r-rn13',
        author: 'Michal V.',
        rating: 5,
        date: '28. 07. 2026',
        comment: '120W nabíjení je návykové! Telefon je nabitý než si uvařím kávu.',
        verified: true
      }
    ]
  },
  {
    id: 'apple-iphone-13',
    name: 'Apple iPhone 13',
    category: 'mobily',
    categoryName: 'Mobily',
    brand: 'Apple',
    subtitle: '128GB, Midnight',
    description: 'Osvědčený a spolehlivý iPhone s čipem A15 Bionic, duálním 12Mpx fotosystémem s filmovým režimem a skvělou celodenní výdrží baterie. Odolné tělo s Ceramic Shield.',
    price: 13990,
    originalPrice: 15490,
    rating: 4.8,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 16,
    isFeatured: false,
    isSale: true,
    badge: 'Super Cena',
    specs: {
      'Displej': '6.1" Super Retina XDR OLED',
      'Procesor': 'Apple A15 Bionic (6 jader)',
      'Operační paměť': '4 GB RAM',
      'Úložiště': '128 GB',
      'Fotoaparát': 'Duální 12 Mpx (hlavní + ultraširoký), senzorový posun OIS',
      'Video': 'Filmařský režim 1080p, 4K HDR Dolby Vision',
      'Konektivita': '5G, Wi-Fi 6, MagSafe, Lightning',
    },
    reviews: [
      {
        id: 'r-ip13',
        author: 'Klára N.',
        rating: 5,
        date: '19. 07. 2026',
        comment: 'Pro mě naprosto dostačující iPhone. Kompaktní, rychlý a fotí úžasně.',
        verified: true
      }
    ]
  },

  // --- NOTEBOOKY ---
  {
    id: 'notebook-probook-14',
    name: 'Notebook ProBook 14',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'HP',
    subtitle: 'i5/16GB',
    description: 'Kompaktní a odolný pracovní notebook s hliníkovým šasi. Poháněn procesorem Intel Core i5 13. generace, 16 GB rychlé paměti DDR5 a 512 GB PCIe NVMe SSD. Matný 14" IPS Full HD displej šetří vaše oči při celodenní práci.',
    price: 18490,
    originalPrice: 20990,
    rating: 4.8,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 9,
    isFeatured: true,
    isSale: true,
    badge: 'Doporučujeme',
    specs: {
      'Displej': '14" IPS Full HD (1920x1080), matný, 300 nitů',
      'Procesor': 'Intel Core i5-1335U (10 jader, až 4.6 GHz)',
      'Operační paměť': '16 GB DDR5 4800 MHz',
      'Úložiště': '512 GB M.2 NVMe SSD',
      'Grafická karta': 'Intel Iris Xe Graphics',
      'Výdrž baterie': 'Až 10 hodin (51 Wh)',
      'Hmotnost': '1.38 kg',
      'Operační systém': 'Windows 11 Pro',
      'Konektory': '2x USB-C (Thunderbolt 4), 2x USB 3.2, HDMI 2.1, Jack 3.5mm',
    },
    reviews: [
      {
        id: 'r3',
        author: 'Petr B.',
        rating: 5,
        date: '01. 08. 2026',
        comment: 'Tichý, lehký a velmi rychlý. Na kancelářskou práci a programování ideální stroj.',
        verified: true
      }
    ]
  },
  {
    id: 'macbook-air-m3-13',
    name: 'Apple MacBook Air 13" M3',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'Apple',
    subtitle: 'M3 8-core, 16GB, 512GB SSD Space Gray',
    description: 'Neuvěřitelně tenký notebook s převratným čipem Apple M3, Liquid Retina displejem s 500 nity a tichým bezvětrákovým chlazením. Výdrž na baterii dosahuje až 18 hodin nepřetržité práce.',
    price: 36990,
    originalPrice: 39990,
    rating: 5.0,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 7,
    isFeatured: true,
    isSale: false,
    badge: 'Novinka',
    specs: {
      'Displej': '13.6" Liquid Retina (2560 x 1664 px), True Tone, 500 nitů',
      'Procesor': 'Apple M3 (8jádrové CPU + 10jádrové GPU, 16jádrový Neural Engine)',
      'Operační paměť': '16 GB sdílená unifikovaná paměť',
      'Úložiště': '512 GB rychlé SSD',
      'Výdrž baterie': 'Až 18 hodin přehrávání videa',
      'Hmotnost': '1.24 kg',
      'Konektivita': 'MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm jack, Wi-Fi 6E',
    },
    reviews: [
      {
        id: 'r-m3',
        author: 'Daniel R.',
        rating: 5,
        date: '08. 08. 2026',
        comment: 'M3 v kombinaci s 16GB RAM zvládá střih 4K videa i náročné vývojářské prostředí bez jediného zaváhání.',
        verified: true
      }
    ]
  },
  {
    id: 'asus-rog-strix-g16',
    name: 'ASUS ROG Strix G16 Gaming',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'Asus',
    subtitle: 'i7-14650HX / RTX 4070 / 32GB / 1TB',
    description: 'Extrémní herní mašina pro náročné hráče a tvůrce obsahu. 16" ROG Nebula displej s rozlišením QHD+ 240Hz, grafická karta NVIDIA GeForce RTX 4070 a pokročilé chlazení s tekutým kovem Conductonaut Extreme.',
    price: 44990,
    originalPrice: 48990,
    rating: 4.9,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 4,
    isFeatured: true,
    isSale: true,
    badge: 'Herní Dělo',
    specs: {
      'Displej': '16" IPS ROG Nebula QHD+ (2560 x 1600 px), 240Hz, 3ms, G-Sync',
      'Procesor': 'Intel Core i7-14650HX (16 jader, až 5.2 GHz)',
      'Grafická karta': 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)',
      'Operační paměť': '32 GB DDR5 5600 MHz',
      'Úložiště': '1 TB PCIe 4.0 NVMe M.2 SSD',
      'Klávesnice': 'RGB podsvícená klávesnice s Aura Sync (per-key)',
      'Operační systém': 'Windows 11 Home',
    },
    reviews: [
      {
        id: 'r-rog',
        author: 'Karel H.',
        rating: 5,
        date: '02. 08. 2026',
        comment: 'Cyberpunk 2077 na ultra detaily s Ray Tracingem běží naprosto hladce. Displej je fantastický.',
        verified: true
      }
    ]
  },
  {
    id: 'lenovo-thinkpad-e14',
    name: 'Lenovo ThinkPad E14 Gen 5',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'Lenovo',
    subtitle: 'Ryzen 7 / 16GB / 512GB / IPS',
    description: 'Legendární spolehlivost řady ThinkPad. Robustní tělo testované dle armádních standardů MIL-STD-810H, ergonomická klávesnice s TrackPointem a procesor AMD Ryzen 7 pro plynulý multitasking.',
    price: 21490,
    originalPrice: 23990,
    rating: 4.8,
    reviewCount: 33,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 12,
    isFeatured: false,
    isSale: true,
    badge: 'Pro Firmy',
    specs: {
      'Displej': '14" IPS WUXGA (1920 x 1200 px), matný, poměr 16:10',
      'Procesor': 'AMD Ryzen 7 7730U (8 jader, 16 vláken, až 4.5 GHz)',
      'Operační paměť': '16 GB DDR4 3200 MHz',
      'Úložiště': '512 GB SSD M.2 PCIe NVMe',
      'Grafická karta': 'AMD Radeon Graphics',
      'Zabezpečení': 'Čtečka otisků prstů, TPM 2.0 čip, krytka webkamery',
      'Operační systém': 'Windows 11 Pro',
    },
    reviews: [
      {
        id: 'r-tp',
        author: 'Radek Š.',
        rating: 5,
        date: '25. 07. 2026',
        comment: 'ThinkPad klávesnice nemá konkurenci. Pro každodenní práci perfektní volba.',
        verified: true
      }
    ]
  },
  {
    id: 'dell-inspiron-15-touch',
    name: 'Dell Inspiron 15 (3530)',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'Dell',
    subtitle: 'Intel Core i5 / 16GB / 512GB SSD',
    description: 'Všestranný rodinný i studentský notebook s 15,6" Full HD 120Hz displejem, rychlým procesorem Intel Core i5 a praktickým numerickým blokem. Podpora rychlého nabíjení ExpressCharge.',
    price: 15990,
    originalPrice: 17990,
    rating: 4.6,
    reviewCount: 21,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 15,
    isFeatured: false,
    isSale: true,
    badge: 'Akce',
    specs: {
      'Displej': '15.6" Full HD (1920x1080) WVA, 120Hz, antireflexní',
      'Procesor': 'Intel Core i5-1334U (10 jader, až 4.6 GHz)',
      'Operační paměť': '16 GB DDR4',
      'Úložiště': '512 GB M.2 NVMe SSD',
      'Grafická karta': 'Intel Iris Xe',
      'Výbava': 'Podsvícená klávesnice s numpadem, HD webkamera',
      'Operační systém': 'Windows 11 Home',
    },
    reviews: [
      {
        id: 'r-dell',
        author: 'Zuzana F.',
        rating: 5,
        date: '18. 07. 2026',
        comment: 'Koupeno pro dceru na vysokou školu, funguje spolehlivě a je tichý.',
        verified: true
      }
    ]
  },
  {
    id: 'asus-zenbook-14-oled',
    name: 'ASUS Zenbook 14 OLED',
    category: 'notebooky',
    categoryName: 'Notebooky',
    brand: 'Asus',
    subtitle: 'Intel Core Ultra 7 / 32GB / 1TB / 3K OLED 120Hz',
    description: 'Prémiový ultrabook s dechberoucím 3K OLED 120Hz displejem s certifikací PANTONE Validated. Procesor Intel Core Ultra s integrovanou AI jednotkou NPU a tělo vážící pouhých 1.2 kg.',
    price: 32990,
    originalPrice: 35990,
    rating: 4.9,
    reviewCount: 16,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 6,
    isFeatured: false,
    isSale: false,
    badge: 'OLED 3K',
    specs: {
      'Displej': '14" Lumina OLED 3K (2880 x 1800 px), 120Hz, 0.2ms, HDR 600 nitů',
      'Procesor': 'Intel Core Ultra 7 155H (16 jader, AI NPU)',
      'Operační paměť': '32 GB LPDDR5X',
      'Úložiště': '1 TB M.2 NVMe PCIe 4.0 SSD',
      'Zvuk': 'Harman Kardon reproduktory s Dolby Atmos',
      'Hmotnost': '1.2 kg (tloušťka 14.9 mm)',
      'Baterie': '75 Wh (výdrž až 15 hodin)',
    },
    reviews: [
      {
        id: 'r-zen',
        author: 'Marek T.',
        rating: 5,
        date: '04. 08. 2026',
        comment: 'OLED displej je naprostá pastva pro oči. Černá je opravdu černá.',
        verified: true
      }
    ]
  },

  // --- TV & AUDIO ---
  {
    id: 'smart-tv-ultrahd-55',
    name: 'Smart TV UltraHD 55"',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'Sony',
    subtitle: '4K HDR SmartOS',
    description: 'Špičková 55" televize s 4K Ultra HD rozlišením a technologií Triluminos Pro pro miliardu živých barev. Podpora formátů Dolby Vision a Dolby Atmos pro autentický kinematografický zážitek u vás v obýváku.',
    price: 16990,
    originalPrice: 19990,
    rating: 4.7,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 6,
    isFeatured: true,
    isSale: true,
    badge: 'Akce',
    specs: {
      'Úhlopříčka': '55" (139 cm), 4K Ultra HD (3840x2160)',
      'Typ panelu': 'Direct LED s Triluminos Pro',
      'Obnovovací frekvence': '60 Hz s technologií Motionflow XR',
      'HDR formáty': 'Dolby Vision, HDR10, HLG',
      'Zvuk': '20W (Dolby Atmos, DTS Digital Surround, Acoustic Auto Calibration)',
      'Operační systém': 'Google TV (Netflix, YouTube, Voyo, Disney+, HBO Max)',
      'Konektivita': '4x HDMI 2.1 (eARC), 2x USB, Wi-Fi, Bluetooth 5.0, LAN, Optický výstup',
    },
    reviews: [
      {
        id: 'r4',
        author: 'Michal D.',
        rating: 5,
        date: '29. 07. 2026',
        comment: 'Nádherný obraz i za denního světla. Google TV systém je bleskově rychlý.',
        verified: true
      }
    ]
  },
  {
    id: 'lg-oled-evo-65-c3',
    name: 'LG OLED evo 65" 4K TV (C3)',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'LG',
    subtitle: '4K OLED evo / 120Hz / Dolby Vision / webOS',
    description: 'Královna mezi televizemi. Samosvítící OLED pixely s dokonalou černou a nekonečným kontrastem. Procesor α9 4K Gen6 AI s hlubokým učením, 4x HDMI 2.1 s plnou podporou 4K 120Hz pro PlayStation 5 a Xbox Series X.',
    price: 38990,
    originalPrice: 45990,
    rating: 5.0,
    reviewCount: 58,
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 4,
    isFeatured: true,
    isSale: true,
    badge: 'OLED Vlajka',
    specs: {
      'Úhlopříčka': '65" (164 cm), 4K Ultra HD (3840 x 2160 px)',
      'Technologie': 'OLED evo Brightness Booster (dokonalá černá)',
      'Obnovovací frekvence': '120 Hz nativně, 0.1ms odezva, G-Sync, FreeSync',
      'HDR': 'Dolby Vision IQ, HDR10 Pro, HLG, Filmmaker Mode',
      'Procesor': 'α9 4K Gen6 AI Processor',
      'Zvuk': '40W 2.2 kanálový sound s Dolby Atmos',
      'Konektory': '4x HDMI 2.1 (4K @ 120Hz, eARC, VRR, ALLM)',
    },
    reviews: [
      {
        id: 'r-lg',
        author: 'Jiří S.',
        rating: 5,
        date: '11. 08. 2026',
        comment: 'OLED je jiný svět. Filmy v HDR a hraní na PS5 jsou neskutečný zážitek.',
        verified: true
      }
    ]
  },
  {
    id: 'bluetooth-sluchatka-soundflow',
    name: 'Bluetooth Sluchátka SoundFlow',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'SoundFlow',
    subtitle: 'ANC, 45h výdrž',
    description: 'Prémiová bezdrátová sluchátka přes uši s aktivním potlačením hluku (Hybrid ANC). 40mm dynamické měniče přinášejí hluboké basy a křišťálově čisté výšky. Výdrž až 45 hodin na jedno nabití s funkcí rychlého nabíjení.',
    price: 2890,
    originalPrice: 3490,
    rating: 4.9,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 22,
    isFeatured: true,
    isSale: false,
    badge: 'Bestseller',
    specs: {
      'Typ': 'Uzavřená circumaurální (přes uši)',
      'Měniče': '40mm neodymové měniče',
      'Potlačení hluku': 'Hybridní ANC (až -35 dB) + Transparency mód',
      'Výdrž baterie': '45 hodin (ANC vypnuto), 32 hodin (ANC zapnuto)',
      'Konektivita': 'Bluetooth 5.3, Multipoint připojení (2 zařízení současně), 3.5mm jack',
      'Mikrofony': '4 mikrofony s potlačením okolního šumu ENC',
    },
    reviews: [
      {
        id: 'r5',
        author: 'David L.',
        rating: 5,
        date: '20. 07. 2026',
        comment: 'Za tuto cenu absolutní špička. ANC v hromadné dopravě funguje skvěle a výdrž baterie je neskutečná.',
        verified: true
      }
    ]
  },
  {
    id: 'apple-airpods-pro-2-usbc',
    name: 'Apple AirPods Pro 2 (USB-C)',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'Apple',
    subtitle: 'Aktivní potlačení hluku / MagSafe Case',
    description: 'Sluchátka s revolučním čipem H2, až 2x účinnějším aktivním potlačením hluku, adaptivním zvukem a prostorovým zvukem s dynamickým snímáním polohy hlavy. Pouzdro s reproduktorem a konektorem USB-C.',
    price: 5990,
    originalPrice: 6790,
    rating: 4.9,
    reviewCount: 91,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 18,
    isFeatured: true,
    isSale: true,
    badge: 'TOP Volba',
    specs: {
      'Čip': 'Apple H2 ve sluchátkách, U1 v nabíjecím pouzdře',
      'Funkce': 'Aktivní potlačení hluku (ANC), Adaptivní režim propustnosti, Detekce konverzací',
      'Zvuk': 'Adaptivní ekvalizace, Personalizovaný prostorový zvuk',
      'Výdrž': 'Až 6 hodin na jedno nabití (až 30 hodin s pouzdrem)',
      'Odolnost': 'IP54 odolnost proti prachu, potu a vodě',
    },
    reviews: [
      {
        id: 'r-airpods',
        author: 'Eliška K.',
        rating: 5,
        date: '13. 08. 2026',
        comment: 'Adaptivní režim funguje kouzelně. Sluchátka sama ztlumí hudbu, když začnu mluvit.',
        verified: true
      }
    ]
  },
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Black',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'Sony',
    subtitle: 'Prémiové ANC / Hi-Res Audio / 30h',
    description: 'Nová definice dokonalého ticha s procesorem V1 a HD Noise Cancelling procesorem QN1. 8 mikrofonů, měkčená kůže a bezztrátový kodek LDAC pro audiofily.',
    price: 8490,
    originalPrice: 9990,
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 8,
    isFeatured: false,
    isSale: true,
    badge: 'Hi-Res Audio',
    specs: {
      'Procesory': 'HD Noise Cancelling QN1 + integrovaný procesor V1',
      'Měniče': '30mm měniče z uhlíkových vláken',
      'Kodeky': 'LDAC, AAC, SBC, podpora DSEE Extreme',
      'Výdrž': '30 hodin se zapnutým ANC (rychlé nabití: 3 min = 3 hodiny)',
      'Hmotnost': '250 g',
    },
    reviews: [
      {
        id: 'r-sony',
        author: 'Filip B.',
        rating: 5,
        date: '06. 08. 2026',
        comment: 'V letadle a v openspace kanceláři naprostá spása. Zvuk je detailní a vyvážený.',
        verified: true
      }
    ]
  },
  {
    id: 'jbl-charge-5',
    name: 'JBL Charge 5 Bluetooth Reproduktor',
    category: 'tv-audio',
    categoryName: 'TV & Audio',
    brand: 'JBL',
    subtitle: 'Vodotěsný IP67 / 20h výdrž / Powerbanka',
    description: 'Přenosný bezdrátový reproduktor s masivním zvukem JBL Original Pro Sound, optimalizovaným měničem a duálními basovými zářiči. Integrovaná powerbanka dobije váš telefon přímo na cestách.',
    price: 3690,
    originalPrice: 4290,
    rating: 4.8,
    reviewCount: 44,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 17,
    isFeatured: false,
    isSale: true,
    badge: 'IP67 Vodotěsný',
    specs: {
      'Výkon': '30 W RMS basový měnič + 10 W RMS výškový měnič',
      'Výdrž baterie': 'Až 20 hodin přehrávání (7 500 mAh)',
      'Odolnost': 'IP67 voděodolný a prachotěsný',
      'Funkce PartyBoost': 'Propojení více kompatibilních JBL reproduktorů',
      'Konektivita': 'Bluetooth 5.1, USB-A powerbank výstup, USB-C nabíjení',
    },
    reviews: [
      {
        id: 'r-jbl',
        author: 'Matěj K.',
        rating: 5,
        date: '17. 07. 2026',
        comment: 'Basy jsou na tak malý reproduktor neuvěřitelné. K vodě i na zahradu ideální.',
        verified: true
      }
    ]
  },

  // --- TABLETY ---
  {
    id: 'tablet-tabair-10',
    name: 'Tablet TabAir 10',
    category: 'tablety',
    categoryName: 'Tablety',
    brand: 'Samsung',
    subtitle: '64GB, WiFi Silver',
    description: 'Lehký a tenký hliníkový tablet s 10,5" WUXGA displejem a čtyřmi reproduktory s technologií Dolby Atmos. Perfektní pro sledování filmů, studium i práci na cestách s podporou dětského režimu Samsung Kids.',
    price: 5490,
    originalPrice: 6290,
    rating: 4.6,
    reviewCount: 27,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 17,
    isFeatured: true,
    isSale: false,
    badge: 'Oblíbené',
    specs: {
      'Displej': '10.5" TFT WUXGA (1920x1200 px), poměr 16:10',
      'Procesor': 'Unisoc T618 (8 jader, 2.0 GHz)',
      'Operační paměť': '4 GB RAM',
      'Úložiště': '64 GB + podpora MicroSD karet až 1 TB',
      'Zvuk': '4 stereo reproduktory s Dolby Atmos',
      'Baterie': '7 040 mAh (15W rychlonabíjení)',
      'Konektivita': 'Wi-Fi 5 (ac), Bluetooth 5.0, USB-C, 3.5mm jack',
    },
    reviews: [
      {
        id: 'r6',
        author: 'Lucie S.',
        rating: 5,
        date: '15. 07. 2026',
        comment: 'Skvělý rodinný tablet. Děti na něm hrají hry a já sleduji seriály. Zvuk ze 4 reproduktorů je překvapivě hlasitý.',
        verified: true
      }
    ]
  },
  {
    id: 'apple-ipad-air-m2-11',
    name: 'Apple iPad Air 11" M2 (2024)',
    category: 'tablety',
    categoryName: 'Tablety',
    brand: 'Apple',
    subtitle: '128GB Wi-Fi Space Gray',
    description: 'Zcela nový iPad Air poháněný bleskurychlým čipem Apple M2. Úchvatný 11" Liquid Retina displej, podpora revolučního pera Apple Pencil Pro a klávesnice Magic Keyboard.',
    price: 17490,
    originalPrice: 18990,
    rating: 4.9,
    reviewCount: 39,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 10,
    isFeatured: true,
    isSale: true,
    badge: 'Čip M2',
    specs: {
      'Displej': '11" Liquid Retina (2360 x 1640 px), P3 barvy, True Tone, 500 nitů',
      'Procesor': 'Apple M2 (8jádrové CPU, 10jádrové GPU, 16jádrový Neural Engine)',
      'Operační paměť': '8 GB RAM',
      'Úložiště': '128 GB',
      'Fotoaparáty': 'Přední 12Mpx na šířku s centrováním záběru + zadní 12Mpx 4K',
      'Příslušenství': 'Podpora Apple Pencil Pro a Magic Keyboard',
      'Konektivita': 'Wi-Fi 6E, Bluetooth 5.3, USB-C',
    },
    reviews: [
      {
        id: 'r-ipad',
        author: 'Vojtěch H.',
        rating: 5,
        date: '09. 08. 2026',
        comment: 'M2 je v tabletu raketa. Pro grafické kreslení v Procreate a střih videa naprosto bezchybný.',
        verified: true
      }
    ]
  },
  {
    id: 'lenovo-tab-p12-pro',
    name: 'Lenovo Tab P12 s perem Tab Pen Plus',
    category: 'tablety',
    categoryName: 'Tablety',
    brand: 'Lenovo',
    subtitle: '12.7" 3K Displej / 128GB / Pero v balení',
    description: 'Velký 12,7" tablet s jemným 3K rozlišením, 4 JBL reproduktory a dotykovým perem Lenovo Tab Pen Plus přímo v balení. Ideální pro studenty na psaní poznámek a multitasking.',
    price: 8990,
    originalPrice: 9990,
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 9,
    isFeatured: false,
    isSale: true,
    badge: 'Pero v Balení',
    specs: {
      'Displej': '12.7" LTPS 3K (2944 x 1840 px), 60Hz, 400 nitů',
      'Procesor': 'MediaTek Dimensity 7050 (8 jader, až 2.6 GHz)',
      'Operační paměť': '8 GB LPDDR4x',
      'Úložiště': '128 GB UFS 2.2 + MicroSD slot až 1 TB',
      'Zvuk': '4x JBL reproduktory optimalizované s Dolby Atmos',
      'Baterie': '10 200 mAh (30W rychlonabíjení)',
      'Pero': 'Lenovo Tab Pen Plus (4096 úrovní přítlaku) součástí balení',
    },
    reviews: [
      {
        id: 'r-p12',
        author: 'Simona M.',
        rating: 5,
        date: '22. 07. 2026',
        comment: 'Obrovská obrazovka a pero v ceně. Na přednášky a psaní poznámek do PDF je to nejlepší kup.',
        verified: true
      }
    ]
  },
  {
    id: 'xiaomi-pad-6-128gb',
    name: 'Xiaomi Pad 6 Gravity Gray',
    category: 'tablety',
    categoryName: 'Tablety',
    brand: 'Xiaomi',
    subtitle: '11" 144Hz WQHD+ / Snapdragon 870 / 128GB',
    description: 'Plynulý 144Hz displej s vysokým rozlišením WQHD+ a celokovové tělo o tloušťce pouhých 6,51 mm. Výkonný procesor Snapdragon 870 zvládne bez problémů i náročné hry a split-screen práci.',
    price: 7490,
    originalPrice: 8490,
    rating: 4.8,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1527690718307-268e5470b1ec?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527690718307-268e5470b1ec?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 13,
    isFeatured: false,
    isSale: true,
    badge: '144Hz Displej',
    specs: {
      'Displej': '11" IPS WQHD+ (2880 x 1800 px), 144Hz, Dolby Vision, HDR10',
      'Procesor': 'Qualcomm Snapdragon 870 (8 jader, až 3.2 GHz)',
      'Operační paměť': '6 GB LPDDR5',
      'Úložiště': '128 GB UFS 3.1',
      'Zvuk': '4 reproduktory s podporou Dolby Atmos',
      'Baterie': '8 840 mAh (33W rychlonabíjení)',
    },
    reviews: [
      {
        id: 'r-pad6',
        author: 'Jan T.',
        rating: 5,
        date: '30. 07. 2026',
        comment: '144Hz obnovovací frekvence je pecka. Hry a listování webem jsou neskutečně plynulé.',
        verified: true
      }
    ]
  },

  // --- PŘÍSLUŠENSTVÍ & GAMING ---
  {
    id: 'herni-mys-raptor-rgb',
    name: 'Herní Myš Raptor RGB',
    category: 'prislusenstvi',
    categoryName: 'Příslušenství',
    brand: 'Raptor Gaming',
    subtitle: '12000 DPI, RGB',
    description: 'Ergonomická herní myš s přesným optickým snímačem PixArt s rozlišením až 12 000 DPI. 7 programovatelných tlačítek, mechanické spínače Omron s životností 50 milionů kliknutí a dynamické RGB Chroma podsvícení.',
    price: 990,
    originalPrice: 1290,
    rating: 4.8,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 31,
    isFeatured: true,
    isSale: true,
    badge: 'Akce',
    specs: {
      'Snímač': 'Optický PixArt PMW3327 (200 - 12 000 DPI)',
      'Spínače': 'Mechanické Omron (životnost 50 mil. kliknutí)',
      'Počet tlačítek': '7 programovatelných tlačítek + scrollovací kolečko',
      'Odezva': '1 000 Hz / 1 ms (ultrapolling)',
      'Podsvícení': '16.8 milionu barev RGB (11 světelných efektů)',
      'Hmotnost': '78 g (ultralehká konstrukce)',
      'Kabel': '1.8m opletený paracord kabel',
    },
    reviews: [
      {
        id: 'r7',
        author: 'Patrik V.',
        rating: 5,
        date: '10. 08. 2026',
        comment: 'Sedí skvěle v ruce a senzor je naprosto přesný. Na hraní CS2 a Valorantu super myš.',
        verified: true
      }
    ]
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S Bezdrátová Myš',
    category: 'prislusenstvi',
    categoryName: 'Příslušenství',
    brand: 'Logitech',
    subtitle: '8000 DPI / Tiché kliknutí / MagSpeed kolečko',
    description: 'Ikonická myš pro profesionály a produktivitu. Elektromagnetické kolečko MagSpeed schopné protočit 1000 řádků za sekundu, senzor Darkfield fungující i na skle a tichá tlačítka Quiet Clicks.',
    price: 2490,
    originalPrice: 2890,
    rating: 5.0,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 20,
    isFeatured: true,
    isSale: false,
    badge: 'TOP Produkt',
    specs: {
      'Senzor': 'Darkfield High Precision (200 až 8000 DPI, funguje i na skle)',
      'Kolečko': 'MagSpeed elektromagnetické s funkcí SmartShift',
      'Tlačítka': '7 tlačítek včetně bočního palcového kolečka pro vodorovný posuv',
      'Výdrž baterie': 'Až 70 dní na jedno nabití (1 min rychlonabíjení = 3 hodiny)',
      'Konektivita': 'Bluetooth Low Energy + USB přijímač Logi Bolt (propojení až 3 PC)',
    },
    reviews: [
      {
        id: 'r-mx',
        author: 'Pavel K.',
        rating: 5,
        date: '12. 08. 2026',
        comment: 'Nejlepší myš na světě pro kancelářskou práci a programování. Ergonomie je dokonalá.',
        verified: true
      }
    ]
  },
  {
    id: 'anker-prime-20000mah-200w',
    name: 'Anker Prime 20 000mAh Powerbanka (200W)',
    category: 'prislusenstvi',
    categoryName: 'Příslušenství',
    brand: 'Anker',
    subtitle: '200W celkový výkon / Smart digitální displej / 2x USB-C',
    description: 'Extrémně výkonná powerbanka schopná nabíjet dva notebooky současně plnou rychlostí 100W. Inteligentní barevný displej zobrazuje stav baterie, reálný příkon a čas do vybití.',
    price: 2990,
    originalPrice: 3490,
    rating: 4.9,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 14,
    isFeatured: false,
    isSale: true,
    badge: '200W Power',
    specs: {
      'Kapacita': '20 000 mAh (72 Wh - povoleno do letadla)',
      'Výkon': 'Až 200W celkový výstup (100W + 100W z portů USB-C)',
      'Displej': 'Inteligentní digitální LCD displej se zobrazením wattů a zdraví baterie',
      'Porty': '2x USB-C (Power Delivery 3.0), 1x USB-A (65W)',
      'Vlastní dobití': 'Plné dobití powerbanky za pouhých 75 minut při 100W vstupu',
    },
    reviews: [
      {
        id: 'r-anker',
        author: 'Tomáš L.',
        rating: 5,
        date: '07. 08. 2026',
        comment: 'Nabije mi MacBook Pro i iPhone na cestách několikrát. Displej s watty je skvělý bonus.',
        verified: true
      }
    ]
  },
  {
    id: 'samsung-portable-ssd-t7-1tb',
    name: 'Samsung Externí SSD T7 1TB Titan Gray',
    category: 'prislusenstvi',
    categoryName: 'Příslušenství',
    brand: 'Samsung',
    subtitle: '1050 MB/s / USB 3.2 Gen2 / Odolné hliníkové tělo',
    description: 'Rychlé a vysoce odolné externí SSD úložiště kapesní velikosti. Rychlost čtení až 1050 MB/s zrychlí přenos 4K videí a velkých souborů téměř 9,5x oproti běžným externím pevným diskům.',
    price: 2390,
    originalPrice: 2790,
    rating: 4.9,
    reviewCount: 71,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 25,
    isFeatured: false,
    isSale: true,
    badge: 'Rychlé SSD',
    specs: {
      'Kapacita': '1 TB (1 000 GB)',
      'Rychlost čtení': 'Až 1 050 MB/s',
      'Rychlost zápisu': 'Až 1 000 MB/s',
      'Rozhraní': 'USB 3.2 Gen 2 (10 Gbps), zpětně kompatibilní',
      'Odolnost': 'Pád z výšky až 2 metrů, hliníkový unibody kryt',
      'Šifrování': 'Hardwarové 256bitové AES šifrování heslem',
    },
    reviews: [
      {
        id: 'r-ssd',
        author: 'Miroslav B.',
        rating: 5,
        date: '26. 07. 2026',
        comment: 'Miniaturní rozměry, nepřehřívá se a přenos 50GB souborů trvá pár vteřin.',
        verified: true
      }
    ]
  }
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'zasilkovna',
    name: 'Zásilkovna – Výdejní místo a Z-BOX',
    price: 69,
    deliveryEstimate: 'Doručení zítra',
    icon: 'Package',
    description: 'Přes 9 000 výdejních míst a samoobslužných boxů po celé ČR'
  },
  {
    id: 'ppl',
    name: 'PPL – Doručení na adresu kurýrem',
    price: 99,
    deliveryEstimate: 'Doručení zítra do ruky',
    icon: 'Truck',
    description: 'Přesný čas doručení SMS avízem a možnost změny termínu'
  },
  {
    id: 'balikovna',
    name: 'Balíkovna – Pošta a boxy',
    price: 59,
    deliveryEstimate: '1–2 pracovní dny',
    icon: 'Mailbox',
    description: 'Vyzvednutí na kód bez čekání na pobočkách České pošty'
  },
  {
    id: 'osobni',
    name: 'Osobní odběr na prodejně (Praha & Brno)',
    price: 0,
    deliveryEstimate: 'K vyzvednutí do 30 minut',
    icon: 'Store',
    description: 'Vyzkoušení na prodejně s odborným poradenstvím zdarma'
  }
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'karta',
    name: 'Platba kartou online (3D Secure)',
    price: 0,
    icon: 'CreditCard',
    description: 'Okamžitá bezpečná platba kartami Visa, Mastercard, Maestro'
  },
  {
    id: 'applepay',
    name: 'Apple Pay / Google Pay',
    price: 0,
    icon: 'Smartphone',
    description: 'Platba jedním dotykem bez zadávání údajů z karty'
  },
  {
    id: 'prevod',
    name: 'Rychlý bankovní převod s QR kódem',
    price: 0,
    icon: 'Building2',
    description: 'Okamžité načtení QR kódu ve vašem mobilním bankovnictví'
  },
  {
    id: 'dobirka',
    name: 'Dobírka při převzetí',
    price: 39,
    icon: 'Banknote',
    description: 'Platba v hotovosti nebo kartou kurýrovi při doručení zásilky'
  }
];

export const PROMO_CODES: Record<string, number> = {
  'ELEKTRO10': 0.10,
  'LETO2026': 0.15,
  'VIP20': 0.20,
  'KLIENT5': 0.05,
  'SLEVA500': 500,
};

