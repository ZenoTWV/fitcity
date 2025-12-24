const plans = [
  {
    id: 'smart-deal',
    name: 'Smart Deal',
    price: 24.5,
    period: 'maand',
    description: '12 maanden onbeperkt fitness.',
    features: ['12 maanden onbeperkt fitness'],
    contractMonths: 12,
    includesKickboxing: false,
    isLadiesOnly: false,
    mostPopular: true,
  },
  {
    id: 'duo-deal',
    name: 'Duo Deal',
    price: 39.5,
    period: 'maand',
    description: 'Samen sporten met partner of familielid.',
    features: ['12 maanden onbeperkt fitness', '2 passen voor duo'],
    contractMonths: 12,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'ladies-jaar-deal',
    name: 'Ladies Only Jaar',
    price: 20.5,
    period: 'maand',
    description: 'Exclusieve toegang tot de ladies only zone.',
    features: ['12 maanden onbeperkt sporten', 'Ladies only + fitness'],
    contractMonths: 12,
    includesKickboxing: false,
    isLadiesOnly: true,
    mostPopular: true,
  },
  {
    id: 'ultimate-fit',
    name: 'Ultimate Fit Deal',
    priceText: 'Vraag naar tarief',
    period: 'maand',
    periodPrefix: 'per',
    description: 'Onbeperkt fitness en kickboksen in een membership.',
    features: ['12 maanden toegang', 'Onbeperkt fitness', 'Onbeperkt (kick)boksen'],
    contractMonths: 12,
    includesKickboxing: true,
    isLadiesOnly: false,
  },
  {
    id: 'kickboxing-weekly',
    name: 'Kickboksen 1x p/w',
    price: 19.95,
    period: 'maand',
    description: '1x per week training, 12 maanden.',
    features: ['12 maanden toegang', '1 training per week', 'Toegang tot bokszalen'],
    contractMonths: 12,
    includesKickboxing: true,
    isLadiesOnly: false,
  },
  {
    id: 'kickboxing-unlimited',
    name: 'Kickboksen Onbeperkt',
    price: 26.95,
    period: 'maand',
    description: 'Onbeperkt kickbokslessen, 12 maanden.',
    features: ['12 maanden toegang', 'Onbeperkt trainingen'],
    contractMonths: 12,
    includesKickboxing: true,
    isLadiesOnly: false,
  },
  {
    id: 'fit-deal-halfjaar',
    name: 'Fit Deal (6 mnd)',
    price: 29.5,
    period: 'maand',
    description: '6 maanden onbeperkt fitness.',
    features: ['6 maanden onbeperkt fitness'],
    contractMonths: 6,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'ladies-halfjaar',
    name: 'Ladies Halfjaar',
    price: 25.5,
    period: 'maand',
    description: '6 maanden ladies only + fitness.',
    features: ['6 maanden onbeperkt sporten', 'Ladies only + fitness'],
    contractMonths: 6,
    includesKickboxing: false,
    isLadiesOnly: true,
  },
  {
    id: 'quick-deal-3mnd',
    name: 'Quick Deal (3 mnd)',
    price: 99,
    period: '3 maanden (eenmalig)',
    description: 'Eenmalige betaling voor 3 maanden onbeperkt fitness.',
    features: ['Eenmalig bedrag', '3 maanden onbeperkt fitness'],
    contractMonths: 3,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'maand-flex',
    name: 'Maand Flex',
    price: 37,
    period: 'maand',
    description: 'Maandelijks opzegbaar onbeperkt fitness.',
    features: ['Maandelijks opzegbaar', 'Onbeperkt fitness'],
    contractMonths: 1,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'ladies-flex',
    name: 'Ladies Flex',
    price: 32,
    period: 'maand',
    description: 'Maandelijks opzegbaar inclusief ladies only.',
    features: ['Maandelijks opzegbaar', 'Ladies only + fitness'],
    contractMonths: 1,
    includesKickboxing: false,
    isLadiesOnly: true,
  },
  {
    id: 'dagpas',
    name: 'Dagpas',
    price: 7,
    period: 'dag',
    description: 'Probeer Fitcity een hele dag uit.',
    features: ['Alle faciliteiten op 1 dag', 'Geen verplichtingen'],
    includesKickboxing: false,
    isLadiesOnly: false,
  },
];

const planLookup = plans.reduce((acc, plan) => {
  acc[plan.id] = plan;
  return acc;
}, {});

const planGroups = [
  {
    key: 'fitness',
    label: 'Fitness',
    description: 'Alle fitness memberships: voordeel, duo, flexibel en proef.',
    plans: [
      'smart-deal',
      'fit-deal-halfjaar',
      'duo-deal',
      'ultimate-fit',
      'maand-flex',
      'quick-deal-3mnd',
    ].map(
      (id) => planLookup[id]
    ),
  },
  {
    key: 'ladies-only',
    label: 'Ladies Only',
    description: 'Exclusieve memberships voor de ladies only zone.',
    plans: ['ladies-jaar-deal', 'ladies-halfjaar', 'ladies-flex'].map((id) => planLookup[id]),
  },
  {
    key: 'kickboxing',
    label: 'Kickboksen',
    description: 'Kickboks memberships inclusief onbeperkt en 1x per week.',
    plans: ['ultimate-fit', 'kickboxing-unlimited', 'kickboxing-weekly'].map((id) => {
      const plan = planLookup[id];
      if (!plan) return plan;
      return { ...plan, mostPopular: id === 'ultimate-fit' };
    }),
  },
  {
    key: 'flexibel',
    label: 'Flexibel',
    description: 'Geen lange looptijd: maand, 3 maanden, dagpas.',
    plans: ['quick-deal-3mnd', 'ladies-flex', 'maand-flex', 'dagpas'].map((id) => planLookup[id]),
  },
];

const homeMembershipTeasers = ['smart-deal', 'ladies-jaar-deal', 'ultimate-fit'].map((id) => planLookup[id]);

const ladiesOnlyPlans = ['ladies-jaar-deal', 'ladies-halfjaar', 'ladies-flex'].map((id) => planLookup[id]);

const additionalServices = [{ name: 'Personal Training', price: 25, description: 'Per les, 1-op-1 coaching.' }];

const oneTimeFees = [{ name: 'Inschrijfkosten', price: 17, description: 'Eenmalig bij start nieuw lidmaatschap.' }];

export {
  plans,
  planGroups,
  homeMembershipTeasers,
  ladiesOnlyPlans,
  additionalServices,
  oneTimeFees,
};
