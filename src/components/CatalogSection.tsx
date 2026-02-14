import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import { products, getFilteredProducts } from "@/data/products";

const dateOptions = [
{ label: "الكل", value: "" },
{ label: "الأحدث", value: "newest" },
{ label: "آخر 7 أيام", value: "7days" },
{ label: "آخر 30 يوم", value: "30days" },
{ label: "هذا الشهر", value: "thisMonth" }];


const FilterChip = ({
  label,
  active,
  onClick




}: {label: string;active: boolean;onClick: () => void;}) =>
<button
  onClick={onClick}
  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
  active ?
  "bg-secondary text-secondary-foreground border-secondary" :
  "bg-transparent text-foreground border-muted-foreground/30 hover:border-secondary"}`
  }>

    {label}
  </button>;


const CatalogSection = () => {
  const [season, setSeason] = useState("الكل");
  const [type, setType] = useState("الكل");
  const [availability, setAvailability] = useState("الكل");
  const [dateRange, setDateRange] = useState("");

  const filtered = useMemo(() => {
    let result = getFilteredProducts({
      season: season === "الكل" ? undefined : season,
      type: type === "الكل" ? undefined : type,
      availability: availability === "الكل" ? undefined : availability,
      dateRange: dateRange || undefined
    });
    if (dateRange === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      );
    }
    return result;
  }, [season, type, availability, dateRange]);

  return (
    <section id="catalog" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-10">
          كتالوج المنتجات
        </h2>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          <div>
            
            




          </div>
          <div>
            
            




          </div>
          <div>
            
            




          </div>
          <div>
            <span className="text-sm font-semibold text-foreground mb-2 block">التاريخ:</span>
            <div className="flex flex-wrap gap-2">
              {dateOptions.map((d) =>
              <FilterChip
                key={d.value}
                label={d.label}
                active={dateRange === d.value}
                onClick={() => setDateRange(d.value)} />

              )}
            </div>
          </div>
        </div>

        {/* Products grid */}
        {filtered.length > 0 ?
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p) =>
          <ProductCard key={p.id} product={p} />
          )}
          </div> :

        <p className="text-center text-muted-foreground text-lg py-12">
            لا توجد منتجات مطابقة للفلاتر المحددة.
          </p>
        }
      </div>
    </section>);

};

export default CatalogSection;