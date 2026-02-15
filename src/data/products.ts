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
        name: "أزرق",
        value: "#3B82F6",
        images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400", "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop"]
      },
      {
        name: "وردي",
        value: "#EC4899",
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400", "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&auto=format&fit=crop"]
      },
      {
        name: "رمادي",
        value: "#6B7280",
        images: ["https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400", "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&auto=format&fit=crop"]
      }
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
    images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"],
    colors: [
      {
        name: "أبيض",
        value: "#FFFFFF",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&auto=format&fit=crop"]
      },
      {
        name: "بيج",
        value: "#D4A574",
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400", "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&auto=format&fit=crop"]
      }
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
    images: ["https://www.itysilk.com/media/catalog/p/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/w/1wtps237-red-1.jpg"],
    colors: [
      {
        name: "أحمر",
        value: "#EF4444",
        images: ["https://www.itysilk.com/media/catalog/p/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/w/1wtps237-red-1.jpg"]
      },
      {
        name: "أزرق",
        value: "#3B82F6",
        images: ["https://www.itysilk.com/media/catalog/p/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/w/1wtps237-blue-1.jpg"]
      },
      {
        name: "أسود",
        value: "#000000",
        images: ["https://www.itysilk.com/media/catalog/p/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/w/1wtps237-black-1.jpg"]
      }
    ],
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
  },
  {
    id: "4",
    name: "تيشيرت نوم",
    code: "PJ-004",
    price: "55 درهم",
    moq: "80 قطعة",
    season: "صيف",
    type: "تيشيرت",
    sizes: "S - XXL",
    availability: "متوفر",
    images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"],
    colors: [
      {
        name: "أخضر",
        value: "#10B981",
        images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"]
      },
      {
        name: "بنفسجي",
        value: "#8B5CF6",
        images: ["https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400"]
      }
    ],
    description: "تيشيرت نوم خفيف وقطني، مثالي للصيف.",
    dateAdded: daysAgo(8),
  },
  {
    id: "5",
    name: "طقم نوم نسائي",
    code: "PJ-005",
    price: "150 درهم",
    moq: "40 قطعة",
    season: "كل الفصول",
    type: "طقم",
    sizes: "S - XL",
    availability: "متوفر",
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400"],
    colors: [
      {
        name: "وردي فاتح",
        value: "#FBCFE8",
        images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400"]
      },
      {
        name: "أسود",
        value: "#000000",
        images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400"]
      },
      {
        name: "أحمر",
        value: "#EF4444",
        images: ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"]
      }
    ],
    description: "طقم نوم أنيق ومريح، مصمم للراحة القصوى.",
    dateAdded: daysAgo(3),
    isNew: true,
  }
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
