import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/Card"
import { ChartContainer, ChartTooltipContent } from "@/component/Chart"

interface Booking {
  status: string
}

interface BookingStatusChartProps {
  bookings: Booking[]
}

export function BookingChart({ bookings }: BookingStatusChartProps) {
  const statusCounts = bookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }))

  const COLORS = {
    booked: "#EAB308",   
    paid: "#22C55E",     
    canceled: "#EF4444", 
    completed: "#3B82F6",
    confirmed: "#A855F7",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Status Overview</CardTitle>
        <CardDescription>Distribution of your bookings by status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            name: {
              label: "Status",
              color: "hsl(var(--chart-1))",
            },
            value: {
              label: "Count",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px] w-full"
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#777777"} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

