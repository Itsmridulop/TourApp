import { useForm, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/Select";
import { Input } from "@/component/Input";
import { Button } from "@/component/Button";
import { QueryType } from '@/features/tours/Tour';
import { useAlert } from './Alert';

type FilterFormValues = {
    selectedFilter: string;
    filterValue: string;
};

export default function Filter({ onFilterChange, queryObj }: { onFilterChange: (query: QueryType) => void; queryObj: QueryType }) {
    const { handleSubmit, control, watch, setValue } = useForm<FilterFormValues>({
        defaultValues: {
            selectedFilter: '',
            filterValue: '',
        },
    });

    const { showAlert } = useAlert()
    const selectedFilter = watch("selectedFilter");

    const onSubmit = (data: FilterFormValues) => {
        if (parseInt(data.filterValue) > 5 && selectedFilter === 'ratingsAverage') {
            showAlert('Rating must not be greater then 5')
            return
        }
        const newQueryObj = {
            ...queryObj,
            filterValue: data.filterValue,
            filterField: selectedFilter,
        }
        onFilterChange(newQueryObj);
    };

    const renderValueInput = () => {
        if (selectedFilter === 'difficulty') {
            return (
                <Controller
                    name="filterValue"
                    control={control}
                    render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                            <div className='text-gray-400'>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                            </div>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="difficult">Difficult</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
            );
        } else {
            return (
                <Controller
                    name="filterValue"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            min={0}
                            type="number"
                            placeholder={`Enter ${selectedFilter}`}
                            className="w-full"
                        />
                    )}
                />
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4">
            <div className="flex flex-wrap items-end gap-4">
                <div className="w-full sm:w-64">
                    <Controller
                        name="selectedFilter"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(value);
                                    setValue("filterValue", ""); // Reset filterValue when selectedFilter changes
                                }}
                            >
                                <div className='text-gray-600'>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a filter" />
                                    </SelectTrigger>
                                </div>
                                <SelectContent>
                                    <SelectItem value="maxGroupSize">Max Group Size</SelectItem>
                                    <SelectItem value="ratingsAverage">Max Ratings Average</SelectItem>
                                    <SelectItem value="price">Max Price</SelectItem>
                                    <SelectItem value="difficulty">Difficulty</SelectItem>
                                    <SelectItem value="duration">Max Duration</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="w-full sm:w-64">
                    {renderValueInput()}
                </div>

                <Button type="submit" className="w-full bg-zinc-700 sm:w-auto">Apply Filter</Button>
            </div>
        </form>
    );
}
