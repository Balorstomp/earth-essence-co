# 🌿 Earth & Essence Co.

Organic handmade skincare — Next.js 14 storefront with Razorpay payments (UPI + Cards).

---

## ✨ Features

- **Warm earthy design** — terracotta, ochre, and linen colour palette
- **Botanical illustrations** — hand-drawn SVG leaf, herb, and flower ornaments
- **Razorpay payments** — UPI, Google Pay, PhonePe, Paytm, Cards, Net Banking
- **Auto currency detection** — INR for Indian visitors, USD for international
- **Fully responsive** — mobile-first Tailwind CSS layout
- **Next.js 14 App Router** — ready for Vercel deployment

---

## 🚀 Deploy to Vercel (3 steps)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/earth-essence-co.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework will be detected as **Next.js** automatically
4. Click **Deploy** (first deploy will fail until you add env vars — that's fine)

### 3. Add environment variables in Vercel

Go to your project → **Settings → Environment Variables** and add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_URL` | `https://your-app.vercel.app` |
| `RAZORPAY_KEY_ID` | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | `your_secret` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `rzp_live_...` |

Then **Redeploy** from the Vercel dashboard — your site will be live!

---

## 💻 Local development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in env variables
cp .env.local.example .env.local
# → Open .env.local and add your Razorpay test keys

# 3. Start dev server
npm run dev
# → Open http://localhost:3000
```

---

## 💳 Setting up Razorpay

1. Create account at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. **Settings → API Keys → Generate Test Key** — copy both keys to `.env.local`
3. For international payments: **Settings → International Payments → Enable**
4. When going live, replace test keys with live keys (`rzp_live_...`)

**What customers will see:**
- 🇮🇳 Indian visitors (INR) → UPI, Google Pay, PhonePe, Paytm, Cards, Net Banking
- 🌍 International visitors (USD) → Visa, Mastercard, Amex

---

## 📸 Adding your product photos

Drop `.jpg` files into `/public/images/` with these exact filenames:

```
public/images/
  hero.jpg                          ← Hero section (portrait, 4:5)
  founder.jpg                       ← About / brand story (square)
  rosemary-amla-hair-soap.jpg
  hibiscus-fenugreek-hair-soap.jpg
  bhringraj-coconut-hair-soap.jpg
  turmeric-neem-skin-soap.jpg
  rose-shea-skin-soap.jpg
  charcoal-tea-tree-skin-soap.jpg
  saffron-vitamin-c-face-cream.jpg
  aloe-sandalwood-face-cream.jpg
  logo.png                          ← Shown in Razorpay checkout modal
```

The site gracefully shows beautiful botanical illustrations as placeholders until photos are added.

---

## 🗂 Project structure

```
app/
  page.js              ← Home page
  shop/page.js         ← All products
  product/[slug]/      ← Product detail
  cart/page.js         ← Cart + Razorpay checkout
  about/page.js        ← Brand story
  thank-you/page.js    ← Order confirmation
  api/
    razorpay/          ← POST: create Razorpay order
    verify-payment/    ← POST: verify payment signature
    checkout/          ← POST: Stripe (legacy/fallback)
    order/             ← GET: fetch order details

components/
  Navbar.js
  Footer.js
  ProductCard.js

context/
  CartContext.js       ← Cart state (localStorage)

data/
  products.js          ← Product catalogue — edit this to change products
```

---

## ✏️ Customising products

Edit `data/products.js` to update names, prices, descriptions, or add new products. All prices are in USD; the site auto-converts to INR at checkout.

---

## 📦 Tech stack

- [Next.js 14](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Razorpay Node SDK](https://github.com/razorpay/razorpay-node)
- [Vercel](https://vercel.com) (deployment)
