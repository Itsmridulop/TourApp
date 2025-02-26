import { ArrowUpDown, Check } from 'lucide-react'
import { Button } from '@/component/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/component/Dropdown-menu'
import { useForm, Controller } from 'react-hook-form'
import { QueryType } from '@/features/tours/Tour'

type SortOption = 'ratingsAverage' | 'price' | 'maxGroupSize' | 'duration'

interface SortFormData {
    sortBy: SortOption
}

export default function Sort({ onSortChange, queryObj }: { onSortChange: (query: QueryType) => void; queryObj: QueryType }) {
    const { control, handleSubmit } = useForm<SortFormData>({
        defaultValues: { sortBy: 'ratingsAverage' },
    })

    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'ratingsAverage', label: 'Rating Average' },
        { value: 'price', label: 'Price' },
        { value: 'maxGroupSize', label: 'Max Group Size' },
        { value: 'duration', label: 'Duration' },
    ]

    const onSubmit = (data: SortFormData) => {
        const newQueryObj = {
            ...queryObj,
            sortBy: data.sortBy
        }
        onSortChange(newQueryObj)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-gray-600'>
                <Controller
                    name="sortBy"
                    control={control}
                    render={({ field }) => (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-[210px] justify-between">
                                    Sort by: {sortOptions.find(option => option.value === field.value)?.label}
                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[210px]">
                                {sortOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onSelect={() => {
                                            field.onChange(option.value)
                                            handleSubmit(onSubmit)()
                                        }}
                                        className="justify-between"
                                    >
                                        {option.label}
                                        {field.value === option.value && <Check className="h-4 w-4" />}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                />
            </div>

        </form>
    )
}
