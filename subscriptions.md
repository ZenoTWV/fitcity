# FitCity Subscriptions - Analysis & Reorganization

## Current Structure (Length-Based)

The subscriptions are currently organized by **contract length**:

### 1. Jaarcontract (Annual - 12 months)
- Smart Deal: ƒ,ª24.50/month - onbeperkt fitness [MOST POPULAR]
- Duo Deal: ƒ,ª29.50/month - samen sporten (2 passen)
- Ladies Only Jaarcontract: ƒ,ª20.50/month - ladies only zone [MOST POPULAR]
- Ultimate Fit Deal: Vraag naar tarief - fitness + kickboxing

### 2. (Kick)Boksen (Kickboxing)
- Kickboksen 1x p/w: ƒ,ª19.95/month - 1x per week training, 12 months
- Kickboksen Onbeperkt: ƒ,ª26.95/month - onbeperkt kickboxing, 12 months [MOST POPULAR]
- Ultimate Fit Deal: Vraag naar tarief - fitness + kickboxing (duplicate)

### 3. Halfjaar (Half-Year - 6 months)
- Fit Deal (6 mnd): ƒ,ª29.50/month - onbeperkt fitness
- Ladies Halfjaar: ƒ,ª25.50/month - ladies only zone

### 4. Flex & Kort (Flexible & Short-term)
- Maand Flex: ƒ,ª37/month - maandelijks opzegbaar fitness
- Ladies Flex: ƒ,ª32/month - maandelijks opzegbaar ladies only
- Quick Deal (3 mnd): ƒ,ª99 one-time - 3 months fitness
- Dagpas: ƒ,ª7/day - day pass

### Additional Services
- Personal Training: ƒ,ª25 per les

### One-Time Fees
- Inschrijfkosten: ƒ,ª17 (bij ophalen gym membership pasje)

---

## Issues with Current Organization

1. **Not user-focused**: Organized by commitment length rather than what users want to do
2. **Overlap confusion**: Ultimate Fit appears in both Annual and Kickboxing categories
3. **Hidden options**: Ladies options scattered across multiple length-based categories
4. **Unclear value**: Users interested in kickboxing must check multiple tabs
5. **Poor discoverability**: Flexible options mixed with short-term in one category

---

## Proposed Structure (Category-Based)

Reorganize by **activity type** to better match user intent:

### 1. Fitness (General fitness memberships)
Focus: Traditional gym access, strength training, cardio
- Smart Deal: ƒ,ª24.50/month, 12 months [POPULAR]
- Ultimate Fit Deal: Vraag naar tarief, 12 months (all-inclusive)
- Duo Deal: ƒ,ª29.50/month, 12 months (samen sporten)
- Fit Deal (6 mnd): ƒ,ª29.50/month, 6 months
- Maand Flex: ƒ,ª37/month, monthly (flexible)
- Quick Deal (3 mnd): ƒ,ª99 one-time, 3 months
- Dagpas: ƒ,ª7/day

**Sorting**: Popular ƒ+' All-inclusive ƒ+' Long-term ƒ+' Flexible

### 2. Alleen Voor Vrouwen (Ladies Only)
Focus: Exclusive access to ladies-only zone
- Ladies Only Jaarcontract: ƒ,ª20.50/month, 12 months [POPULAR]
- Ladies Halfjaar: ƒ,ª25.50/month, 6 months
- Ladies Flex: ƒ,ª32/month, monthly (appears in both this and Flexibel)

**Sorting**: By commitment length (12mo ƒ+' 6mo ƒ+' 1mo)

### 3. Kickboksen (Kickboxing)
Focus: Boxing training, technique, sparring
- Kickboksen Onbeperkt: ƒ,ª26.95/month, 12 months [POPULAR]
- Ultimate Fit Deal: Vraag naar tarief, 12 months (appears in both this and Fitness)
- Kickboksen 1x p/w: ƒ,ª19.95/month, 12 months

**Sorting**: Popular ƒ+' All-inclusive ƒ+' Entry-level

### 4. Flexibel (Flexible Options)
Focus: No long-term commitment, try before you buy
- Ladies Flex: ƒ,ª32/month, monthly (best value)
- Maand Flex: ƒ,ª37/month, monthly
- Quick Deal (3 mnd): ƒ,ª99 one-time, 3 months
- Dagpas: ƒ,ª7/day

**Sorting**: By value/commitment (monthly ƒ+' 3mo ƒ+' day)

---

## Plan Distribution

| Plan | Current Category | New Categories | Rationale |
|------|-----------------|----------------|-----------|
| Smart Deal | Jaarcontract | Fitness | Core fitness offering |
| Duo Deal | Jaarcontract | Fitness | Fitness for two |
| Ladies Jaar | Jaarcontract | Alleen Voor Vrouwen | Ladies exclusive |
| Ultimate Fit | Jaarcontract + Kickboksen | Fitness + Kickboksen | All-inclusive (intentional duplicate) |
| Kickboxing 1x/w | Kickboksen | Kickboksen | Entry kickboxing |
| Kickboxing Unlimited | Kickboksen | Kickboksen | Premium kickboxing |
| Fit Deal 6mnd | Halfjaar | Fitness | Mid-term fitness |
| Ladies Halfjaar | Halfjaar | Alleen Voor Vrouwen | Mid-term ladies |
| Maand Flex | Flex & Kort | Fitness + Flexibel | Flexible fitness (duplicate) |
| Ladies Flex | Flex & Kort | Alleen Voor Vrouwen + Flexibel | Flexible ladies (duplicate) |
| Quick Deal | Flex & Kort | Fitness + Flexibel | Trial option (duplicate) |
| Dagpas | Flex & Kort | Fitness + Flexibel | Day trial (duplicate) |

---

## Benefits of New Structure

### User Experience
- **Intent-based browsing**: Users click "Kickboksen" to see ALL kickboxing options
- **Complete category view**: "Alleen Voor Vrouwen" shows all ladies options (annual, half-year, flex)
- **Flexibility clarity**: "Flexibel" clearly shows no-commitment options
- **Reduced cognitive load**: Users don't need to remember contract lengths to find what they want

### Business Benefits
- **Better cross-selling**: Ultimate Fit visible in both Fitness and Kickboxing increases awareness
- **Highlight value**: Popular plans prominent in each category
- **Flexibility showcase**: Dedicated Flexibel category reduces barrier to entry
- **Ladies visibility**: Dedicated category increases awareness of ladies-only offering

### Technical Benefits
- **Same data structure**: No changes to individual plan objects
- **Backward compatible**: Only planGroups array changes
- **Easy to maintain**: Category-based is more intuitive for future updates
- **Validation supported**: Existing validation script handles duplicates

---

## Implementation Notes

### Duplicate Plans (Appear in Multiple Categories)
- **Ultimate Fit**: Fitness + Kickboksen (all-inclusive offering)
- **Ladies Flex**: Alleen Voor Vrouwen + Flexibel (flexible ladies option)
- **Maand Flex**: Fitness + Flexibel (flexible fitness option)
- **Quick Deal**: Fitness + Flexibel (short-term trial)
- **Dagpas**: Fitness + Flexibel (day pass trial)

These duplicates are **intentional** to improve discoverability.

### Hash Navigation Changes
- Old: `/abonnementen#annual`, `#half-year`, `#flex`
- New: `/abonnementen#fitness`, `#ladies-only`, `#flexibel`
- Unchanged: `/abonnementen#kickboxing` (same key)
- Graceful fallback: Defaults to first category if hash invalid

### Files Modified
- `src/data/memberships.js` - Update planGroups array (lines 144-169)
- `scripts/validate-memberships.js` - Add duplicate plan logging (optional)

### Files Unchanged (Automatically Compatible)
- `src/pages/Pricing.jsx` - Tab navigation works dynamically
- `src/pages/Home.jsx` - Featured plans unchanged
- `src/pages/LadiesOnly.jsx` - Ladies plans list unchanged
