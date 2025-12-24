import { plans, planGroups, homeMembershipTeasers, ladiesOnlyPlans, additionalServices, oneTimeFees } from '../src/data/memberships.js';

const errors = [];

const requiredPlanFields = ['id', 'name', 'description', 'features'];
const planIds = new Set();

plans.forEach((plan) => {
  requiredPlanFields.forEach((field) => {
    if (plan[field] === undefined || plan[field] === null || plan[field] === '') {
      errors.push(`Plan "${plan.name ?? 'unknown'}" is missing required field "${field}".`);
    }
  });

  const hasNumericPrice = typeof plan.price === 'number' && !Number.isNaN(plan.price);
  const hasTextPrice = typeof plan.priceText === 'string' && plan.priceText.trim().length > 0;
  if (!hasNumericPrice && !hasTextPrice) {
    errors.push(`Plan "${plan.name ?? plan.id}" needs a numeric price or priceText.`);
  }

  if (!Array.isArray(plan.features) || plan.features.length === 0) {
    errors.push(`Plan "${plan.name ?? plan.id}" must include at least one feature.`);
  }

  if (planIds.has(plan.id)) {
    errors.push(`Duplicate plan id "${plan.id}" found.`);
  }
  planIds.add(plan.id);
});

const referencedPlans = [
  ...planGroups.flatMap((group) => group.plans),
  ...homeMembershipTeasers,
  ...ladiesOnlyPlans,
];

referencedPlans.forEach((plan) => {
  if (!plan || !plan.id || !planIds.has(plan.id)) {
    errors.push('A referenced plan is missing from the master list.');
  }
});

const priceItems = [
  ...additionalServices.map((item) => ({ ...item, group: 'additionalServices' })),
  ...oneTimeFees.map((item) => ({ ...item, group: 'oneTimeFees' })),
];

priceItems.forEach((option) => {
  if (!option.name || typeof option.price !== 'number') {
    errors.push(`Each ${option.group} item must include a name and numeric price.`);
  }
});

if (errors.length > 0) {
  console.error('Membership data validation failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Membership data validation passed.');
