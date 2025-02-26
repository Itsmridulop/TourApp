import { CardContent, CardHeader, CardTitle } from "./Card"

function NamedDisplay({data, title}: {data: Array<{name: string, value: number}>; title: string}) {
    return (
        <>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                    {data.map(({ name, value }) => (
                        <div key={name} className="flex flex-col">
                            <dt className="text-sm font-medium text-muted-foreground capitalize">{name}</dt>
                            <dd className="text-2xl font-semibold">{value}</dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </>
    )
}

export default NamedDisplay