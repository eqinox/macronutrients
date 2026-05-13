import { FoodData } from "@/lib/types";

export const proteinFoods: FoodData[] = [
    {
        name: 'Пилешко филе на тиган',
        protein: 31,
        fats: 3.5,
        carbs: 0,
        calories: 170,
        aminoAcids: {
            essential: {
                Leucine: 2.17,
                Isoleucine: 1.53,
                Valine: 1.44,
                Lysine: 2.46,
                Methionine: 0.80,
                Phenylalanine: 1.15,
                Threonine: 1.22,
                Tryptophan: 0.34,
                Histidine: 0.90
            },
            nonEssential: {
                GlutamicAcid: 4.33,
                AsparticAcid: 2.58,
                Alanine: 1.58,
                Arginine: 1.75,
                Glycine: 1.42,
                Proline: 1.19,
                Serine: 1.00,
                Tyrosine: 0.98,
                Cysteine: 0.37
            }
        },
        vitamins: {
            'B3 (ниацин)': '14.8 mg',
            'B6 (пиридоксин)': '0.6 mg',
            'B5 (пантотенова киселина)': '1.0 mg',
            'B2 (рибофлавин)': '0.1 mg',
            'B1 (тиамин)': '0.07 mg',
            'B12': '0.3 µg',
            'Холин (B4)': '65 mg',
            'A': '13 IU',
            'E': '0.3 mg',
            'K': '0.3 µg'
        },
        minerals: {
            'Фосфор': '200 mg',
            'Калий': '250 mg',
            'Магнезий': '25 mg',
            'Цинк': '1 mg',
            'Селен': '25 μg',
            'Желязо': '1 mg'
        }
    },
];