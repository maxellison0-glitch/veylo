"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { ProductCard } from "./product-card";

type Filters = {
  concern: string[];
  ptype: string[];
};

const emptyFilters: Filters = { concern: [], ptype: [] };

const concernValues: Product["concern"][] = ["Fine lines", "Puffiness", "Dullness", "Blemishes", "Tension", "Hair removal", "Pain relief", "Recovery", "Scalp care", "Complete ritual"];
const typeValues: Product["ptype"][] = ["Device", "Accessory", "Set"];

function ToggleGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {values.map((value) => (
        <label key={value}>
          <input type="checkbox" checked={selected.includes(value)} onChange={() => onToggle(value)} />
          <span className="custom-check" />
          {value}
        </label>
      ))}
    </fieldset>
  );
}

export function ShopCatalog({ initialQuery = "", initialConcern = "" }: { initialQuery?: string; initialConcern?: string }) {
  const [filters, setFilters] = useState<Filters>(() => ({
    concern: concernValues.includes(initialConcern as Product["concern"]) ? [initialConcern] : [],
    ptype: [],
  }));
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function toggle(key: "concern" | "ptype", value: string) {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value) ? current[key].filter((entry) => entry !== value) : [...current[key], value],
    }));
  }

  const result = useMemo(() => {
    const query = initialQuery.toLowerCase().trim();
    const matching = products.filter((product) => {
      const queryMatch = !query || `${product.name} ${product.tagline} ${product.description}`.toLowerCase().includes(query);
      const concernMatch = !filters.concern.length || filters.concern.includes(product.concern);
      const typeMatch = !filters.ptype.length || filters.ptype.includes(product.ptype);
      return queryMatch && concernMatch && typeMatch;
    });

    return [...matching].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return Number(Boolean(b.badge)) - Number(Boolean(a.badge));
    });
  }, [filters, sort, initialQuery]);

  const singles = result.filter((p) => p.ptype !== "Set");
  const combos = result.filter((p) => p.ptype === "Set");
  const activeCount = filters.concern.length + filters.ptype.length;

  const filterContent = (
    <>
      <div className="filter-title"><h2>Filter the range</h2>{activeCount > 0 && <button onClick={() => setFilters(emptyFilters)}>Clear all</button>}</div>
      <ToggleGroup title="Concern" values={concernValues} selected={filters.concern} onToggle={(value) => toggle("concern", value)} />
      <ToggleGroup title="Type" values={typeValues} selected={filters.ptype} onToggle={(value) => toggle("ptype", value)} />
    </>
  );

  return (
    <div className="shop-layout">
      <aside className="desktop-filters">{filterContent}</aside>
      <div className="shop-results">
        <div className="shop-toolbar">
          <button className="mobile-filter-trigger" onClick={() => setMobileFiltersOpen(true)}><SlidersHorizontal size={17} /> Filters {activeCount > 0 && <span>{activeCount}</span>}</button>
          <span>{result.length} {result.length === 1 ? "product" : "products"}</span>
          <label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name</option></select></label>
        </div>
        {initialQuery && <div className="search-result-note">Showing results for &ldquo;{initialQuery}&rdquo;</div>}
        {result.length ? (
          <>
            {singles.length > 0 && (
              <div className="product-grid shop-product-grid">{singles.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
            )}
            {combos.length > 0 && (
              <div className="combo-section">
                <div className="combo-heading"><span className="eyebrow">Save more</span><h2>Combos</h2></div>
                <div className="product-grid shop-product-grid">{combos.map((product, index) => <ProductCard product={product} index={index} key={product.slug} />)}</div>
              </div>
            )}
          </>
        ) : (
          <div className="empty-results"><span>Nothing matches those filters</span><h2>Try opening up your filters.</h2><button className="button button-primary" onClick={() => setFilters(emptyFilters)}>Reset filters</button></div>
        )}
      </div>
      <div className={`mobile-filter-panel ${mobileFiltersOpen ? "is-open" : ""}`} aria-hidden={!mobileFiltersOpen}>
        <div className="mobile-filter-header"><span>Filters</span><button className="icon-button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters"><X size={22} /></button></div>
        <div className="mobile-filter-scroll">{filterContent}</div>
        <button className="button button-primary button-wide" onClick={() => setMobileFiltersOpen(false)}>Show {result.length} {result.length === 1 ? "product" : "products"}</button>
      </div>
    </div>
  );
}
