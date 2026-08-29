"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { ProductImage } from "./product-art";
import { useStore } from "./store-provider";

export function CartDrawer() {
  const { items, subtotal, drawerOpen, setDrawerOpen, addItem, updateQuantity, removeItem } = useStore();
  const crossSell = products
    .filter((product) => ["cool-roller", "sculpt-set"].includes(product.slug) && !items.some((item) => item.slug === product.slug))
    .sort((a, b) => a.price - b.price)[0];
  const bundleItem = items.length === 1 && items[0].quantity === 1 && ["veylo-wand", "relief-belt"].includes(items[0].slug) ? items[0] : null;

  return (
    <>
      <button
        className={`drawer-backdrop ${drawerOpen ? "is-open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-label="Close shopping bag"
        tabIndex={drawerOpen ? 0 : -1}
      />
      <aside className={`cart-drawer ${drawerOpen ? "is-open" : ""}`} aria-hidden={!drawerOpen} aria-label="Shopping bag">
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Your selection</span>
            <h2>Shopping bag</h2>
          </div>
          <button className="icon-button" onClick={() => setDrawerOpen(false)} aria-label="Close shopping bag">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="empty-bag">
            <span className="empty-bag-icon"><ShoppingBag size={30} strokeWidth={1.2} /></span>
            <h3>Your bag is empty</h3>
            <p>Browse face, body and scalp technology built around a clear purpose.</p>
            <Link className="button button-primary" href="/shop" onClick={() => setDrawerOpen(false)}>Shop the range</Link>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              <p className="drawer-ready">{items.length === 1 ? `Your ${items[0].name.replace(/^The /, "")} is ready to dispatch.` : "Your rituals are ready to dispatch."}</p>
              {items.map((item) => (
                <article className="drawer-item" key={item.id}>
                  <Link href={`/products/${item.slug}`} onClick={() => setDrawerOpen(false)}>
                    <ProductImage slug={item.slug} name={item.name} finish={item.finishHex} alt={`${item.name} in ${item.finish}`} sizes="112px" />
                  </Link>
                  <div className="drawer-item-details">
                    <Link href={`/products/${item.slug}`} onClick={() => setDrawerOpen(false)}><h3>{item.name}</h3></Link>
                    <p>{item.variant} · {item.finish}</p>
                    <div className="drawer-item-row">
                      <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                    <button className="remove-item" onClick={() => removeItem(item.id)}><Trash2 size={13} /> Remove</button>
                  </div>
                </article>
              ))}
              {bundleItem && <p className="drawer-bundle-hint">Add the {bundleItem.slug === "veylo-wand" ? "Relief Belt" : "Veylo Wand"} as <Link href="/products/relief-ritual" onClick={() => setDrawerOpen(false)}>The Relief Ritual</Link> and save £15.</p>}
              {crossSell && (
                <div className="drawer-cross-sell">
                  <ProductImage slug={crossSell.slug} name={crossSell.name} finish={crossSell.finishes[0].hex} alt={crossSell.name} sizes="64px" />
                  <div><span>Complete the ritual</span><strong>{crossSell.name}</strong><small>{formatPrice(crossSell.price)}</small></div>
                  <button type="button" onClick={() => addItem(crossSell)} aria-label={`Add ${crossSell.name}`}>+ Add</button>
                </div>
              )}
            </div>
            <div className="drawer-footer">
              <div className="delivery-progress">
                <p>{subtotal < 40 ? <>You&rsquo;re {formatPrice(40 - subtotal)} away from free UK delivery.</> : <>You&rsquo;ve unlocked free UK delivery.</>}</p>
                <span><i style={{ width: `${Math.min(100, (subtotal / 40) * 100)}%` }} /></span>
              </div>
              <div className="drawer-subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>UK delivery calculated at checkout. Free over £40.</p>
              <Link className="button button-primary button-wide" href="/checkout" onClick={() => setDrawerOpen(false)}>Checkout</Link>
              <Link className="text-link drawer-cart-link" href="/cart" onClick={() => setDrawerOpen(false)}>View bag</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
