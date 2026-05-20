import CarbohydratesSection from "@/components/carbohydrates/carbohydrates-section"
import FatsSection from "@/components/fats/fats-section"
import ProteinsSection from "@/components/proteins/proteins-section"

export const metadata = {
  title: "Макронутриенти",
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Макронутриенти</h1>

      <ProteinsSection />
      <CarbohydratesSection />

      {/* <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            Въглехидрати
          </CardTitle>
        </CardHeader>
      </Card> */}

      <FatsSection />
    </div>
  )
}
