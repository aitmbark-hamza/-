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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
    description: "شورت نوم قطني مريح، مناسب لفصل الصيف.",
    dateAdded: daysAgo(10),
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
