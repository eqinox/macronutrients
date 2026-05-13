import ProteinsSection from "@/components/proteins-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Макронутриенти",
}

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Макронутриенти</h1>

      <ProteinsSection />

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            Въглехидрати
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            Мазнини
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
