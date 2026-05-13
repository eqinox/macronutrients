export const EssentialAminoAcids = {
  Leucine: 'Левцин',
  Isoleucine: 'Изолевцин',
  Valine: 'Валин',
  Lysine: 'Лизин',
  Methionine: 'Метионин',
  Phenylalanine: 'Фенилаланин',
  Threonine: 'Треонин',
  Tryptophan: 'Триптофан',
  Histidine: 'Хистидин',
} as const;

export const NonEssentialAminoAcids = {
  Alanine: 'Аланин',
  Arginine: 'Аргинин',
  Asparagine: 'Аспарагин',
  AsparticAcid: 'Аспарагинова киселина',
  Cysteine: 'Цистеин',
  GlutamicAcid: 'Глутаминова киселина',
  Glutamine: 'Глутамин',
  Glycine: 'Глицин',
  Proline: 'Пролин',
  Serine: 'Серин',
  Tyrosine: 'Тирозин',
} as const;

export type EssentialAminoAcidKey = keyof typeof EssentialAminoAcids;
export type NonEssentialAminoAcidKey = keyof typeof NonEssentialAminoAcids;
