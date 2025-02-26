import React, { Dispatch, SetStateAction } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from "../../component/Label";
import { Input } from "../../component/Input";
import { Button } from "../../component/Button";
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { CreateTourType } from '@/types/tourTypes';

interface TourStartDatesUploadProps {
    control: Control<CreateTourType>;
    startDatesArr?: string[];
    setStartDatesArr: Dispatch<SetStateAction<string[] | undefined>>;
}

const TourStartDatesUpload: React.FC<TourStartDatesUploadProps> = ({ control, startDatesArr, setStartDatesArr }) => {

    const handleDateChange = (index: number, date: string) => {
        const updatedDates = [...(startDatesArr || [])];
        updatedDates[index] = date;
        setStartDatesArr(updatedDates);
    };

    const handleDeleteDate = (index: number) => {
        const updatedDates = startDatesArr?.filter((_, i) => i !== index);
        setStartDatesArr(updatedDates);
    };

    const handleAddDate = () => {
        setStartDatesArr([...(startDatesArr || []), new Date(Date.now()).toISOString().split('T')[0]]);
    };

    return (
        <div className="space-y-4">
            <Label>Tour Start Dates</Label>
            {startDatesArr?.map((date, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Controller
                        name={`startDates.${index}`}
                        control={control}
                        render={() => (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="date"
                                        defaultValue={date ? new Date(date).toISOString().split('T')[0] : new Date(Date.now()).toISOString().split('T')[0]}
                                        onChange={(e) => handleDateChange(index, e.target.value)}
                                        className="border rounded-md p-2"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDeleteDate(index)}
                                >
                                    <MinusCircledIcon className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    />
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddDate}
                className="flex items-center space-x-2"
            >
                <PlusCircledIcon className="h-4 w-4" />
                <span>Add Date</span>
            </Button>
        </div>
    );
};

export default TourStartDatesUpload;
