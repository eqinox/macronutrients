import Glucose from "@/components/carbohydrates/sugars/monosacharides/glucose";
import Fructose from "@/components/carbohydrates/sugars/monosacharides/fructose";
import Galactose from "@/components/carbohydrates/sugars/monosacharides/galactose";
import Sucrose from "@/components/carbohydrates/sugars/disaccharides/sucrose";
import Lactose from "@/components/carbohydrates/sugars/disaccharides/lactose";
import Maltose from "@/components/carbohydrates/sugars/disaccharides/maltose";
import StarchOverview from "@/components/carbohydrates/starches/starch-overview";
import StarchDigestion from "@/components/carbohydrates/starches/starch-digestion";
import StarchSources from "@/components/carbohydrates/starches/starch-sources";
import FiberOverview from "@/components/carbohydrates/fibers/fiber-overview";
import SolubleFiber from "@/components/carbohydrates/fibers/soluble-fiber";
import InsolubleFiber from "@/components/carbohydrates/fibers/insoluble-fiber";

export const MonosaccharideMap = {
  Glucose,
  Fructose,
  Galactose,
} as const;

export const DisaccharideMap = {
  Sucrose,
  Lactose,
  Maltose,
} as const;

export const StarchTopicMap = {
  Overview: StarchOverview,
  Digestion: StarchDigestion,
  Sources: StarchSources,
} as const;

export const FiberTopicMap = {
  Overview: FiberOverview,
  Soluble: SolubleFiber,
  Insoluble: InsolubleFiber,
} as const;
