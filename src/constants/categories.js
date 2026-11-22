export const TRANSACTION_CATEGORIES = [
  'Simpanan',
  'Tabungan Darurat',
  'Jajan',
  'Investasi',
  'Gaji',
  'Belanja',
  'Transportasi',
  'Lainnya',
  'Pendidikan',
  'Tagihan & Internet',
  'Kesehatan',
  'Kebutuhan Rumah',
];

export const getCategoryIconInfo = (category) => {
  switch ((category || '').toLowerCase()) {
    case 'simpanan':
      return { name: 'chart-donut', family: 'material' };
    case 'tabungan darurat':
      return { name: 'safe', family: 'material' };
    case 'jajan':
      return { name: 'coffee', family: 'feather' };
    case 'investasi':
      return { name: 'rocket-launch-outline', family: 'material' };
    case 'gaji':
      return { name: 'wallet-outline', family: 'material' };
    case 'belanja':
      return { name: 'shopping-bag', family: 'feather' };
    case 'transportasi':
      return { name: 'car', family: 'feather' };
    case 'pendidikan':
      return { name: 'school', family: 'material' };
    case 'tagihan & internet':
      return { name: 'wifi', family: 'feather' };
    case 'kesehatan':
      return { name: 'heart-pulse', family: 'material' };
    case 'kebutuhan rumah':
      return { name: 'home', family: 'feather' };
    default:
      return { name: 'grid', family: 'feather' };
  }
};

export default TRANSACTION_CATEGORIES;