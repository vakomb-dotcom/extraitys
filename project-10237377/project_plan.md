# EXTRAITY — Premium European Niche Fragrance Brand

## 1. Project Description
EXTRAITY is a premium European niche fragrance e-commerce brand. The brand sells exclusively 30% extrait de parfum concentration, inspired by iconic luxury fragrances. Every bottle is crafted for lasting performance, exceptional quality, and refined elegance.

### Brand Identity
- **Colors**: Deep black (#080808), warm ivory (#FCFAF7), champagne gold (#C4A44A), muted burgundy (#8C1C28)
- **Typography**: Cormorant Garamond (serif headlines), Inter (sans-serif body)
- **Style**: Minimal yet luxurious. Spacious layout, editorial feel, premium product photography, subtle animations.

## 2. Page Structure
- `/` - Home (luxury hero, best sellers, fragrance families, about, signature scents, testimonials, newsletter)
- `/shop` - Shop (filterable product catalog by Men/Women/Unisex and fragrance families)
- `/shop/:slug` - Product Detail (scent profile, notes pyramid, comparison section, premium packaging)
- `/men` - Men's Collection
- `/women` - Women's Collection
- `/about` - About Us / Story
- `/login` - Login
- `/register` - Register
- `/cart` - Cart

## 3. Core Features
- [x] Luxury brand identity with premium color palette
- [x] Product catalog with 122 fragrances (batch8-11, all from 33ml.pl)
- [x] Fragrance family filtering (Fresh, Floral, Woody, Oriental, Gourmand, Leather, Amber, Smoky)
- [x] Scent profile with top/heart/base notes pyramid
- [x] Compare with Original section on product pages
- [x] Premium packaging & quality notes
- [x] Newsletter subscription (10% off)
- [x] Best sellers curated selection
- [x] Men's & Women's collection pages
- [x] Customer testimonials carousel
- [x] Shopping cart with drawer
- [x] Search with family-aware filtering

## 4. Data Model Design
- Product type with extended fields: fragranceFamily, concentration, longevity, projection, scentNotes (top/heart/base), moodLabels, occasion, season, scentDescription, packagingDescription, compareSection, inspiredBy
- Currently using mock data (no Supabase connection)
- Data source: products from 33ml.pl (real catalog)

## 5. Backend / Third-party Integration Plan
- Supabase: Not connected
- Shopify: Not connected
- Stripe: Not connected

## 6. Development Phase Plan

### Phase 1: Brand Identity & Foundation ✅
- New color palette (deep black, ivory, champagne, burgundy)
- Updated typography and SEO
- Premium cursor styling
- Navbar with Men/Women/Unisex sections

### Phase 2: Product Data Model ✅
- Extended Product type with premium fields
- FragranceFamily, ScentNotes, CompareSection types
- Legacy compatibility layer for existing data

### Phase 3: Homepage Redesign ✅
- Luxury hero with trust elements
- Best Sellers curated selection
- Fragrance Families discover section
- Signature Scents scrollable catalog
- Premium testimonials and newsletter CTA

### Phase 4: Product Cards ✅
- Clean, elegant, premium design
- Fragrance family tags, mood labels
- Concentration and longevity badges
- Inspiration source with retail price comparison

### Phase 5: Product Detail Page ✅
- Complete scent profile with notes pyramid
- Projection, longevity, concentration stats
- Premium packaging section
- Compare with Original section
- Trust badges and quality notes

### Phase 6: Shop & Collection Pages ✅
- Category filtering (Men/Women/Unisex)
- Fragrance family filtering
- Clean grid layout with pagination
- Refined hero sections

### Phase 7: Future
- Connect Supabase for auth
- Connect Shopify for product sync
- Add Stripe for payments
- Rich product descriptions for all 122 products