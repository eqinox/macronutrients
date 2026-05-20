import CarbohydratesSection from "@/components/carbohydrates/carbohydrates-section"
import FatsSection from "@/components/fats/fats-section"
import MicronutrientsSection from "@/components/micronutrients/micronutrients-section"
import ProteinsSection from "@/components/proteins/proteins-section"

export const metadata = {
  title: "Макро- и микронутриенти",
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6 overflow-x-hidden p-4 sm:p-6">
      <h1 className="text-2xl font-bold">Хранене и нутриенти</h1>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 xl:items-start">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Макронутриенти</h2>
          <p className="text-sm text-muted-foreground">
            Големите групи хранителни вещества, които дават енергия и градивен
            материал.
          </p>
          <div className="flex flex-col gap-4">
            <ProteinsSection />
            <CarbohydratesSection />
            <FatsSection />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Микронутриенти</h2>
          <p className="text-sm text-muted-foreground">
            Витамини и минерали – малки по количество, но решаващи за
            здравето.
          </p>
          <MicronutrientsSection />
        </section>
      </div>
    </div>
  )
}
