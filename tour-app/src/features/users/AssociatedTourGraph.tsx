import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/component/Chart"

const data = [
  { name: "Easy", value: 2 },
  { name: "Difficult", value: 1 },
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

export default function AssociatedTourGraph() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Ben Hadley's Tour Difficulties</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            easy: {
              label: "Easy",
              color: "hsl(var(--chart-1))",
            },
            difficult: {
              label: "Difficult",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

