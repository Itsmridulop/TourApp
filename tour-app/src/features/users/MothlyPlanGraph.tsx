import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/Card"
import { ChartContainer, ChartTooltip } from "@/component/Chart"
import { useMonthlyPlan } from "../tours/useMonthlyPlan"

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function MonthlyPlanGraph() {
    const { monthlyPlan } = useMonthlyPlan()

    const processedData = monthNames.map((name, index) => {
        const monthData = monthlyPlan?.data.find((item) => item.month === index + 1) || { numTour: 0, tours: [] }
        return {
            month: name,
            numTour: monthData.numTour,
            tours: monthData.tours.join(", "),
        }
    })

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
                {" "}
                {/* Minimum width container */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Monthly Tours Overview</CardTitle>
                        <CardDescription>Number of tours available each month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={{
                                numTour: {
                                    label: "Number of Tours",
                                    color: "hsl(var(--chart-1))",
                                },
                            }}
                            className="h-[400px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={processedData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                                    <ChartTooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                                                                <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[0.70rem] uppercase text-muted-foreground">Tours</span>
                                                                <span className="font-bold">{payload[0].value}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-2 text-xs text-muted-foreground">
                                                            {payload[0].payload.tours || "No tours"}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="numTour" fill="var(--color-numTour)" radius={[4, 4, 0, 0]} maxBarSize={50} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

