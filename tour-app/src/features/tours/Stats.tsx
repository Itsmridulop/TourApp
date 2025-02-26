import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/Card"
import { useStats } from "./useStats"

import Spinner from "@/component/Spinner"

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid gap-2">
                    <div className="font-bold">{data.name}</div>
                    <div className="grid grid-cols-2 gap-1">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Number of Tours</span>
                        <span>{data.value}</span>
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Average Rating</span>
                        <span>{data.avgRating.toFixed(2)}</span>
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Average Price</span>
                        <span>${data.avgPrice}</span>
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Number of Ratings</span>
                        <span>{data.numRatings}</span>
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Price Range</span>
                        <span>${data.minPrice} - ${data.maxPrice}</span>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

export default function Stats() {
    const { stats, isLoading } = useStats()

    const processedData = stats?.data.map(item => ({
        name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
        value: item.numTours,
        avgRating: item.avgRating,
        avgPrice: Math.round(item.avgPrice),
        numRatings: item.numRatings,
        minPrice: item.minPrice,
        maxPrice: item.maxPrice
    }))

    if(isLoading) return <Spinner/>
    
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Tour Difficulty Distribution</CardTitle>
                <CardDescription>Number of tours by difficulty level</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={processedData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {processedData?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}