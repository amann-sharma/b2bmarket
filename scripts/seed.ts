import connectDB from '../lib/db';
import { Category, Listing } from '../lib/models';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    attributeSchema: new Map<string, string>([
      ['brand', 'string'],
      ['condition', 'string'],
      ['warranty', 'string'],
      ['model', 'string'],
      ['screenSize', 'string'],
      ['resolution', 'string'],
      ['processor', 'string'],
      ['ram', 'string'],
      ['storage', 'string']
    ])
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    attributeSchema: new Map<string, string>([
      ['brand', 'string'],
      ['type', 'string'],
      ['size', 'string'],
      ['color', 'string'],
      ['material', 'string'],
      ['gender', 'string'],
      ['style', 'string'],
      ['season', 'string']
    ])
  }
];

const listings = [
  // Electronics - TVs
  {
    title: 'Bulk Samsung 4K TVs',
    description: 'New Samsung 55" 4K Smart TVs, bulk order available. Perfect for hotels and offices.',
    price: 499.99,
    location: 'New York, NY',
    attributes: new Map<string, string | number>([
      ['brand', 'Samsung'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'QN55Q80B'],
      ['screenSize', '55"'],
      ['resolution', '4K UHD']
    ])
  },
  {
    title: 'LG OLED TV Bundle',
    description: 'Premium LG OLED TVs, 65" display, perfect for luxury hotels and executive offices.',
    price: 1299.99,
    location: 'Los Angeles, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'LG'],
      ['condition', 'New'],
      ['warranty', '3 years'],
      ['model', 'OLED65C1'],
      ['screenSize', '65"'],
      ['resolution', '4K OLED']
    ])
  },
  {
    title: 'Sony Bravia Professional Series',
    description: 'Commercial-grade Sony Bravia displays, ideal for digital signage and corporate lobbies.',
    price: 899.99,
    location: 'Chicago, IL',
    attributes: new Map<string, string | number>([
      ['brand', 'Sony'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'XBR-65X950H'],
      ['screenSize', '65"'],
      ['resolution', '4K HDR']
    ])
  },
  // Electronics - Computers
  {
    title: 'Apple MacBook Pro Lot',
    description: 'Refurbished MacBook Pro laptops, M1 chip, 16GB RAM. Great for corporate upgrades.',
    price: 1299.99,
    location: 'San Francisco, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'Apple'],
      ['condition', 'Refurbished'],
      ['warranty', '1 year'],
      ['model', 'M1 Pro'],
      ['processor', 'M1 Pro'],
      ['ram', '16GB'],
      ['storage', '512GB']
    ])
  },
  {
    title: 'Dell XPS Workstations',
    description: 'High-performance Dell XPS workstations, Intel i9, 32GB RAM, RTX 3080.',
    price: 2499.99,
    location: 'Austin, TX',
    attributes: new Map<string, string | number>([
      ['brand', 'Dell'],
      ['condition', 'New'],
      ['warranty', '3 years'],
      ['model', 'XPS 8950'],
      ['processor', 'Intel i9'],
      ['ram', '32GB'],
      ['storage', '1TB SSD']
    ])
  },
  {
    title: 'HP EliteBook Bundle',
    description: 'Bulk HP EliteBook laptops, perfect for enterprise deployment.',
    price: 899.99,
    location: 'Seattle, WA',
    attributes: new Map<string, string | number>([
      ['brand', 'HP'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'EliteBook 840'],
      ['processor', 'Intel i7'],
      ['ram', '16GB'],
      ['storage', '256GB SSD']
    ])
  },
  // Electronics - Monitors
  {
    title: 'Dell UltraSharp Monitors',
    description: 'Professional-grade Dell UltraSharp 4K monitors, perfect for design studios.',
    price: 599.99,
    location: 'Boston, MA',
    attributes: new Map<string, string | number>([
      ['brand', 'Dell'],
      ['condition', 'New'],
      ['warranty', '3 years'],
      ['model', 'U2720Q'],
      ['screenSize', '27"'],
      ['resolution', '4K']
    ])
  },
  {
    title: 'LG UltraWide Monitors',
    description: 'Curved LG UltraWide monitors, ideal for multi-tasking professionals.',
    price: 449.99,
    location: 'Portland, OR',
    attributes: new Map<string, string | number>([
      ['brand', 'LG'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', '34WN80C'],
      ['screenSize', '34"'],
      ['resolution', 'WQHD']
    ])
  },
  // Electronics - Networking
  {
    title: 'Cisco Network Equipment',
    description: 'Enterprise-grade Cisco switches and routers, 48-port PoE.',
    price: 899.99,
    location: 'Seattle, WA',
    attributes: new Map<string, string | number>([
      ['brand', 'Cisco'],
      ['condition', 'New'],
      ['warranty', '5 years'],
      ['model', 'Catalyst 9300']
    ])
  },
  {
    title: 'Ubiquiti Network Bundle',
    description: 'Complete Ubiquiti networking solution for small to medium businesses.',
    price: 1299.99,
    location: 'Denver, CO',
    attributes: new Map<string, string | number>([
      ['brand', 'Ubiquiti'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'UniFi Dream Machine Pro']
    ])
  },
  // Electronics - Printers
  {
    title: 'Bulk HP Printers',
    description: 'HP LaserJet Pro printers, perfect for office environments. Includes installation.',
    price: 299.99,
    location: 'Chicago, IL',
    attributes: new Map<string, string | number>([
      ['brand', 'HP'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'LaserJet Pro']
    ])
  },
  {
    title: 'Epson EcoTank Bundle',
    description: 'High-volume Epson EcoTank printers, ideal for businesses with heavy printing needs.',
    price: 399.99,
    location: 'Miami, FL',
    attributes: new Map<string, string | number>([
      ['brand', 'Epson'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'ET-4760']
    ])
  },
  // Electronics - Audio
  {
    title: 'Bose Conference Systems',
    description: 'Professional Bose conference room audio systems with noise cancellation.',
    price: 1499.99,
    location: 'San Diego, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'Bose'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'VideoBar VB1']
    ])
  },
  {
    title: 'JBL Professional Speakers',
    description: 'High-quality JBL professional speakers for events and presentations.',
    price: 799.99,
    location: 'Nashville, TN',
    attributes: new Map<string, string | number>([
      ['brand', 'JBL'],
      ['condition', 'New'],
      ['warranty', '2 years'],
      ['model', 'Professional 305P']
    ])
  },
  // Electronics - Security
  {
    title: 'Arlo Security Camera System',
    description: 'Complete Arlo security camera system with cloud storage and mobile app.',
    price: 699.99,
    location: 'Phoenix, AZ',
    attributes: new Map<string, string | number>([
      ['brand', 'Arlo'],
      ['condition', 'New'],
      ['warranty', '1 year'],
      ['model', 'Pro 4']
    ])
  },
  {
    title: 'Ring Business Security Bundle',
    description: 'Ring security system for small businesses with 24/7 monitoring.',
    price: 899.99,
    location: 'Las Vegas, NV',
    attributes: new Map<string, string | number>([
      ['brand', 'Ring'],
      ['condition', 'New'],
      ['warranty', '1 year'],
      ['model', 'Business Security']
    ])
  },
  // Fashion - Shoes
  {
    title: 'Nike Air Max Bulk Order',
    description: 'Bulk order of Nike Air Max sneakers, various sizes available.',
    price: 89.99,
    location: 'New York, NY',
    attributes: new Map<string, string | number>([
      ['brand', 'Nike'],
      ['type', 'Sneakers'],
      ['size', '7-13'],
      ['color', 'Multiple'],
      ['material', 'Mesh/Leather'],
      ['gender', 'Unisex'],
      ['style', 'Athletic'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'Adidas Ultraboost Collection',
    description: 'Premium Adidas Ultraboost running shoes, perfect for retail stores.',
    price: 129.99,
    location: 'Los Angeles, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'Adidas'],
      ['type', 'Running Shoes'],
      ['size', '6-12'],
      ['color', 'Multiple'],
      ['material', 'Primeknit'],
      ['gender', 'Unisex'],
      ['style', 'Athletic'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'New Balance 990 Series',
    description: 'Classic New Balance 990 series, made in USA, premium quality.',
    price: 159.99,
    location: 'Boston, MA',
    attributes: new Map<string, string | number>([
      ['brand', 'New Balance'],
      ['type', 'Lifestyle'],
      ['size', '7-13'],
      ['color', 'Grey'],
      ['material', 'Suede/Mesh'],
      ['gender', 'Unisex'],
      ['style', 'Classic'],
      ['season', 'All Season']
    ])
  },
  // Fashion - Business Shoes
  {
    title: 'Allen Edmonds Dress Shoes',
    description: 'Premium Allen Edmonds dress shoes, perfect for corporate wear.',
    price: 299.99,
    location: 'Chicago, IL',
    attributes: new Map<string, string | number>([
      ['brand', 'Allen Edmonds'],
      ['type', 'Dress Shoes'],
      ['size', '8-12'],
      ['color', 'Black/Brown'],
      ['material', 'Leather'],
      ['gender', 'Men'],
      ['style', 'Formal'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'Cole Haan Oxford Collection',
    description: 'Professional Cole Haan oxford shoes with modern comfort technology.',
    price: 199.99,
    location: 'San Francisco, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'Cole Haan'],
      ['type', 'Oxford'],
      ['size', '7-13'],
      ['color', 'Multiple'],
      ['material', 'Leather'],
      ['gender', 'Men'],
      ['style', 'Business'],
      ['season', 'All Season']
    ])
  },
  // Fashion - Casual Shoes
  {
    title: 'Vans Classic Collection',
    description: 'Bulk order of Vans classic sneakers, perfect for retail stores.',
    price: 59.99,
    location: 'Portland, OR',
    attributes: new Map<string, string | number>([
      ['brand', 'Vans'],
      ['type', 'Sneakers'],
      ['size', '5-12'],
      ['color', 'Multiple'],
      ['material', 'Canvas'],
      ['gender', 'Unisex'],
      ['style', 'Casual'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'Converse Chuck Taylor Bulk',
    description: 'Classic Converse Chuck Taylor sneakers, wholesale pricing available.',
    price: 49.99,
    location: 'Seattle, WA',
    attributes: new Map<string, string | number>([
      ['brand', 'Converse'],
      ['type', 'Sneakers'],
      ['size', '5-12'],
      ['color', 'Multiple'],
      ['material', 'Canvas'],
      ['gender', 'Unisex'],
      ['style', 'Classic'],
      ['season', 'All Season']
    ])
  },
  // Fashion - Boots
  {
    title: 'Timberland Pro Work Boots',
    description: 'Professional Timberland work boots, safety certified.',
    price: 179.99,
    location: 'Denver, CO',
    attributes: new Map<string, string | number>([
      ['brand', 'Timberland'],
      ['type', 'Work Boots'],
      ['size', '7-13'],
      ['color', 'Brown'],
      ['material', 'Leather'],
      ['gender', 'Men'],
      ['style', 'Work'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'Dr. Martens Collection',
    description: 'Classic Dr. Martens boots, perfect for retail stores.',
    price: 149.99,
    location: 'Austin, TX',
    attributes: new Map<string, string | number>([
      ['brand', 'Dr. Martens'],
      ['type', 'Boots'],
      ['size', '6-11'],
      ['color', 'Multiple'],
      ['material', 'Leather'],
      ['gender', 'Unisex'],
      ['style', 'Classic'],
      ['season', 'All Season']
    ])
  },
  // Fashion - Athletic Shoes
  {
    title: 'Under Armour Training Shoes',
    description: 'Professional Under Armour training shoes for athletes.',
    price: 99.99,
    location: 'Miami, FL',
    attributes: new Map<string, string | number>([
      ['brand', 'Under Armour'],
      ['type', 'Training Shoes'],
      ['size', '7-13'],
      ['color', 'Multiple'],
      ['material', 'Mesh'],
      ['gender', 'Unisex'],
      ['style', 'Athletic'],
      ['season', 'All Season']
    ])
  },
  {
    title: 'Puma Running Collection',
    description: 'High-performance Puma running shoes for professional athletes.',
    price: 89.99,
    location: 'Nashville, TN',
    attributes: new Map<string, string | number>([
      ['brand', 'Puma'],
      ['type', 'Running Shoes'],
      ['size', '6-12'],
      ['color', 'Multiple'],
      ['material', 'Mesh'],
      ['gender', 'Unisex'],
      ['style', 'Athletic'],
      ['season', 'All Season']
    ])
  },
  // Fashion - Sandals
  {
    title: 'Birkenstock Professional Collection',
    description: 'Professional Birkenstock sandals, perfect for healthcare workers.',
    price: 79.99,
    location: 'San Diego, CA',
    attributes: new Map<string, string | number>([
      ['brand', 'Birkenstock'],
      ['type', 'Sandals'],
      ['size', '5-11'],
      ['color', 'Multiple'],
      ['material', 'Cork/Leather'],
      ['gender', 'Unisex'],
      ['style', 'Professional'],
      ['season', 'Summer']
    ])
  },
  {
    title: 'Teva Outdoor Sandals',
    description: 'Durable Teva outdoor sandals, perfect for adventure tourism businesses.',
    price: 69.99,
    location: 'Phoenix, AZ',
    attributes: new Map<string, string | number>([
      ['brand', 'Teva'],
      ['type', 'Sandals'],
      ['size', '6-12'],
      ['color', 'Multiple'],
      ['material', 'Synthetic'],
      ['gender', 'Unisex'],
      ['style', 'Outdoor'],
      ['season', 'Summer']
    ])
  }
];

async function seed() {
  try {
    await connectDB();
    
    // Clear existing data
    await Category.deleteMany({});
    await Listing.deleteMany({});
    
    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    
    // Add categoryId to listings
    const electronicsId = insertedCategories[0]._id;
    const fashionId = insertedCategories[1]._id;
    
    const now = new Date();
    const listingsWithCategory = listings.map((listing, index) => ({
      ...listing,
      categoryId: index < 15 ? electronicsId : fashionId,
      createdAt: now,
      updatedAt: now
    }));
    
    // Insert listings
    await Listing.insertMany(listingsWithCategory);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 