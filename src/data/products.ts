export interface Product {
  id: string;
  name: string;
  code: string;
  price: string;
  moq: string;
  season: string;
  type: string;
  sizes: string;
  availability: "متوفر" | "غير متوفر";
  images: string[];
  colors: {
    name: string;
    value: string;
    images: string[];
  }[];
  description: string;
  dateAdded: string;
  isNew?: boolean;
}

// Utility function to validate color values
const isValidColor = (color: string): boolean => {
  return /^#[0-9A-F]{6}$/i.test(color) || 
         /^rgba?\(/.test(color) || 
         color === 'black' || 
         color === 'white' ||
         color === 'transparent';
};

const today = new Date();
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
};

export const products: Product[] = [
  {
    id: "1",
    name: "بيجاما راقية",
    code: "PJ-001",
    price: "120 درهم",
    moq: "50 قطعة",
    season: "صيف",
    type: "بيجاما",
    sizes: "S - XXL",
    availability: "متوفر",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"],
    colors: [
      {
        name: "Pink", 
        value: "#3B82F6", 
        images: ["/modl1/img1.jpg"] 
      },
      {
        name: "Blue", 
        value: "#00cb84ff", 
        images: ["/modl1/img2.jpg"] 
      },
      {
        name: "White", 
        value: "#EC4899", 
        images: ["/modl1/img3.jpg"] 
      },
      {
        name: "White", 
        value: "#ec7948ff", 
        images: ["/modl1/img4.jpg"] 
      },
     
    ],
    description: "بيجاما قطنية فاخرة، مريحة للنوم والاسترخاء.",
    dateAdded: daysAgo(5),
    isNew: true,
  },
  {
    id: "2",
    name: "روب نوم",
    code: "PJ-002",
    price: "85 درهم",
    moq: "30 قطعة",
    season: "شتاء",
    type: "روب",
    sizes: "M - XL",
    availability: "متوفر",
    images: ["/modl2/imag3.jpg"],
    colors: [
      { name: "White", value: "#062e92ff", images: ["/modl2/imag3.jpg"] },
    { name: "White", value: "#00cb84ff", images: ["/modl2/imag4.jpg"] },
      { name: "Pink", value: "#EC4899", images: ["/modl2/imag1.jpg"] },
      { name: "Blue", value: "#b08431ff", images: ["/modl2/imag2.jpg"] },
    ],
    description: "روب نوم دافئ وجذاب، مثالي للأمسيات الباردة.",
    dateAdded: daysAgo(15),
  },
  {
    id: "3",
    name: "شورت نوم رجالي",
    code: "PJ-003",
    price: "45 درهم",
    moq: "100 قطعة",
    season: "صيف",
    type: "شورت",
    sizes: "M - XXL",
    availability: "متوفر",
    images: ["/modl4/img6.png"],
    colors: [
       { name: "Brown", value: "#704900b1", images: ["/modl4/img1.png"] },
      { name: "Pink", value: "#EC4899", images: ["/modl4/img2.png"] },
      { name: "Gold", value: "#c08922b1", images: ["/modl4/img3.png"] },
      { name: "Purple", value: "#934dccb1", images: ["/modl4/img4.png"] },
      { name: "Sky", value: "#70a7e2ff", images: ["/modl4/img5.png"] },
      { name: "Red", value: "#ff0404c0", images: ["/modl4/img6.png"] },
      { name: "Sage", value: "rgba(117, 155, 150, 1)", images: ["/modl4/img7.png"] },
      { name: "Cream", value: "rgba(222, 223, 154, 0.86)", images: ["/modl4/img8.png"] },
    ],
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
  },

  
];

export const getFilteredProducts = (
  filters: {
    season?: string;
    type?: string;
    availability?: string;
    dateRange?: string;
  }
) => {
  return products.filter((p) => {
    if (filters.season && p.season !== filters.season) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.availability && p.availability !== filters.availability) return false;
    if (filters.dateRange) {
      const added = new Date(p.dateAdded);
      const now = new Date();
      if (filters.dateRange === "newest") {
        // sort handled externally
      } else if (filters.dateRange === "7days") {
        const diff = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
        if (diff > 7) return false;
      } else if (filters.dateRange === "30days") {
        const diff = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
        if (diff > 30) return false;
      } else if (filters.dateRange === "thisMonth") {
        if (added.getMonth() !== now.getMonth() || added.getFullYear() !== now.getFullYear()) return false;
      }
    }
    return true;
  });
};
