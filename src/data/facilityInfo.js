const openingHours = [
  { day: 'Ma - Vr', time: '08:30 - 22:00' },
  { day: 'Za', time: '09:00 - 16:00' },
  { day: 'Zo', time: '09:30 - 16:00' },
];

const openingHoursInline = openingHours.map(({ day, time }) => `${day} ${time}`).join(' | ');

const holidayHours = [
  { day: '24 dec', status: '08:30 - 17:00' },
  { day: '25 dec', status: '09:00 - 14:00' },
  { day: '26 dec', status: '09:00 - 14:00' },
  { day: '31 dec', status: '09:00 - 15:00' },
  { day: '1 jan', status: '10:00 - 14:00' },
];

const heroStats = [
  { value: '4.6/5', label: 'Rating' },
  { value: 'Gratis', label: 'Parkeren' },
  { value: 'Ladies', label: 'Only zone' },
];

const heroMedia = {
  background: {
    webp: '',
    jpg: '/upscalemedia-transformed(3).jpeg',
    alt: '',
  },
  video: {
    src: '/Fitcity%20Culemborg.mp4',
  },
};

export {
  openingHours,
  openingHoursInline,
  holidayHours,
  heroStats,
  heroMedia,
};
