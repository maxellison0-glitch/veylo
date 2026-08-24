import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns, Cancellations and Refunds",
  description: "Veylo returns policy: a 30-day money-back guarantee, plus your rights under the Consumer Contracts Regulations 2013.",
};

export default function ReturnsPage() {
  return (
    <main className="legal-page">
      <div className="site-container legal-container">
        <span className="eyebrow">Policy</span>
        <h1>Returns, Cancellations &amp; Refunds</h1>
        <p className="legal-updated">Last updated: August 2026</p>

        <section>
          <h2>1. 30-day money-back guarantee</h2>
          <p>Every Veylo order carries a 30-day money-back guarantee. If you change your mind within 30 days of delivery, you can return your order for a full refund of the product price.</p>
          <p>Items must be unused, in a hygienic condition and in their original packaging. Because our products are used on the face, we cannot resell devices or tools that show signs of use, so returns that arrive used or incomplete may be refused or refunded at a reduced amount.</p>
        </section>

        <section>
          <h2>2. Your statutory right to cancel</h2>
          <p>Separately from our guarantee, under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013 you have the right to cancel your order within 14 days of receiving your goods, without giving a reason. For hygiene-sealed products, this right is lost if the seal is broken. Your statutory rights are not affected by anything in this policy.</p>
        </section>

        <section>
          <h2>3. How to start a return</h2>
          <ol>
            <li>Email <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a> with your order number and the item you would like to return</li>
            <li>We will confirm eligibility and send you the return address</li>
            <li>Pack the item securely, unused and in its original packaging, and post it back to us</li>
          </ol>
          <p>Return postage is at your expense unless the item is faulty or incorrect. We recommend using a tracked service, as the items remain your responsibility until they reach us.</p>
        </section>

        <section>
          <h2>4. Refunds</h2>
          <p>Once we receive and inspect your return, we will process a refund to your original payment method within 14 days. The refund will include the original delivery charge if the return is due to our error or a faulty product.</p>
        </section>

        <section>
          <h2>5. Faulty or incorrect items</h2>
          <p>If you receive an item that is faulty, damaged in transit or not what you ordered, contact us within 48 hours of delivery at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a> with your order number and photographs. We will arrange a replacement or a full refund, including any return postage. Your rights under the Consumer Rights Act 2015 are not affected.</p>
        </section>

        <section>
          <h2>6. Late or missing refunds</h2>
          <p>Refunds typically appear within 5&ndash;10 working days depending on your payment provider. If you have not received your refund after this period, check with your bank or card issuer first, then contact us at <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a>.</p>
        </section>

        <section>
          <h2>7. Contact</h2>
          <p>For any returns or refund queries, email <a href="mailto:hello@veyloskin.com">hello@veyloskin.com</a> or write to Veylo, The Fairmont, Kitty Lane, FY4 5EG.</p>
        </section>
      </div>
    </main>
  );
}
