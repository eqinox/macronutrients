import FatsOverview from "@/components/fats/topics/fats-overview";
import SaturatedFat from "@/components/fats/topics/saturated-fat";
import UnsaturatedFatsDescription from "@/components/fats/unsaturated/unsaturated-fats-description";
import TransFat from "@/components/fats/topics/trans-fat";
import Cholesterol from "@/components/fats/topics/cholesterol";
import MonounsaturatedFat from "@/components/fats/unsaturated/monounsaturated-fat";
import PolyunsaturatedFatsDescription from "@/components/fats/unsaturated/polyunsaturated/polyunsaturated-fats-description";
import Omega3 from "@/components/fats/unsaturated/polyunsaturated/omega-3";
import Omega6 from "@/components/fats/unsaturated/polyunsaturated/omega-6";

export const MainFatTopicMap = {
    Overview: FatsOverview,
    Saturated: SaturatedFat,
    Unsaturated: UnsaturatedFatsDescription,
    Trans: TransFat,
    Cholesterol: Cholesterol,
} as const;

export const UnsaturatedFatTopicMap = {
    Monounsaturated: MonounsaturatedFat,
    Polyunsaturated: PolyunsaturatedFatsDescription,
} as const;

export const PolyunsaturatedFatTopicMap = {
    Omega3: Omega3,
    Omega6: Omega6,
} as const;
