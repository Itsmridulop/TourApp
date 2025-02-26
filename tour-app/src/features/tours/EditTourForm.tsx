import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Button } from "../../component/Button"
import { Input } from "../../component/Input"
import { Textarea } from "../../component/Textarea"
import { Switch } from "../../component/Switch"
import { Label } from "../../component/Label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../component/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../component/Tabs"
import { ScrollArea } from "../../component/ScrollArea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../component/Accordion"
import { CreateTourType, TourType } from '@/types/tourTypes'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { FC, useState } from 'react'
import { fetchLocation } from '@/utils/fetchLocation'
import { useAlert } from '@/component/Alert'
import { useUpdateTour } from './useUpdateTour'
import { useCreateTour } from './useCreateTour'

import TourStartDatesUpload from './TourStartDateUpload'

interface TourEditFormProps {
    tour?: TourType;
    onClose?: () => void;
    title: string;
    isPending?: boolean
}

const TourEditForm: FC<TourEditFormProps> = ({ tour, onClose, title, isPending }) => {
    const [startDate, setStartDate] = useState<string[] | undefined>(tour?.startDates)
    const [isLoading, setIsLoading] = useState(false)
    const { updateTour } = useUpdateTour()
    const { createTour } = useCreateTour()

    const { control, watch, reset, handleSubmit, register, formState: { errors } } = useForm<CreateTourType>({
        defaultValues: tour
    })
    const { showAlert } = useAlert()

    const { fields: locationFields, append: appendLocation, remove: removeLocation } = useFieldArray({
        control,
        name: "locations"
    })

    const { fields: guidesField, append: appendGuide, remove: removeGuide } = useFieldArray({
        control,
        name: "guides"
    })

    const price = watch("price");

    const onSubmit = async (data: CreateTourType) => {
        if (data.locations?.length === 0) {
            showAlert('Tour must have some locations to vistit')
            return;
        }

        if (startDate?.length === 0) {
            showAlert('Tour must have some start date')
            return;
        }

        setIsLoading(true)
        let locationObj
        try {
            locationObj = await Promise.all((data?.locations || []).map(async location => {
                const coord = await fetchLocation(location.description);
                return {
                    ...location,
                    type: 'Point',
                    coordinates: coord
                };
            }));
        } catch {
            showAlert('Error is getting corrdinates of some locations')
            setIsLoading(false)
            return
        }
        let startLocationCoord
        try {
            startLocationCoord = await fetchLocation(data?.startLocation.address)
        } catch {
            showAlert('Error in getting coordinates of start location')
            setIsLoading(false)
            return
        }


        const startLocaationObj: {
            type?: string;
            coordinates?: [number, number];
            address?: string;
            description?: string;
        } = {
            ...data?.startLocation,
            coordinates: startLocationCoord
        }

        const tourData: CreateTourType = {
            ...data,
            discount: data.discount && data.discount * 1,
            locations: [...locationObj || []],
            startDates: [...startDate || []],
            startLocation: { ...startLocaationObj }
        };

        setIsLoading(false)
        // updationFn({ tourData, id }, {
        //     onSettled: () => reset(),
        //     onSuccess: () => onClose?.()
        // });
        if (tour?._id) {
            updateTour({ tourData, id: tour._id }, {
                onSettled: () => reset(),
                onSuccess: () => onClose?.()
            })
        } else {
            createTour({ tourData }, {
                onSettled: () => reset(),
                onSuccess: () => onClose?.()
            })
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-[49.49rem] w-[33.125rem] flex flex-col">
            <Card className="flex-grow flex flex-col border-transparent shadow-sm">
                <CardHeader>
                    <CardTitle>{title} <Controller name="name" control={control} render={({ field }) => <span>{field.value}</span>} /></CardTitle>
                    <CardDescription>Make changes to your tour information here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                    <Tabs defaultValue="basic" className="h-full flex flex-col">
                        <TabsList className="mb-4">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="dates">Dates</TabsTrigger>
                            <TabsTrigger value="locations">Locations</TabsTrigger>
                            <TabsTrigger value="guides">Guides</TabsTrigger>
                        </TabsList>
                        <ScrollArea className="flex-grow">
                            <div className="h-full flex items-center justify-center">
                                <div className="w-full h-full max-w-3xl px-4">
                                    <TabsContent value="basic" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center h-full">
                                        <div className="space-y-4 flex flex-col justify-evenly h-full w-full">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Tour Name</Label>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        defaultValue={tour?.name}
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                {...register("name", {
                                                                    required: "This field is require",
                                                                    min: {
                                                                        value: 10,
                                                                        message: "Name must be at least 10 characters long",
                                                                    },
                                                                    max: {
                                                                        value: 40,
                                                                        message: "Name must not be long from 40 characters long",
                                                                    }
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="duration">Duration (days)</Label>
                                                    <Controller
                                                        name="duration"
                                                        control={control}
                                                        defaultValue={tour?.duration}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                {...register("duration", {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'A tour must have a duration',
                                                                    },
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'Duration must be at least 1 day',
                                                                    },
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="maxGroupSize">Max Group Size</Label>
                                                    <Controller
                                                        name="maxGroupSize"
                                                        control={control}
                                                        defaultValue={tour?.maxGroupSize}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                {...register("maxGroupSize", {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'A tour must have a group size',
                                                                    },
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'Group size must be at least 1',
                                                                    },
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.maxGroupSize && <p className="text-red-500">{errors.maxGroupSize.message}</p>}
                                                </div>
                                                <div className="space-y-4 flex flex-col">
                                                    <Label htmlFor="difficulty">Difficulty</Label>
                                                    <Controller
                                                        name="difficulty"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: 'A tour must have a difficulty',
                                                            },
                                                            validate: (value) =>
                                                                ['easy', 'medium', 'difficult'].includes(value) || 'Difficulty is either easy, medium, or difficult',
                                                        }}
                                                        render={({ field }) => (
                                                            <select onChange={(e) => field.onChange(e.target.value)} value={field.value} className="border border-gray-300 rounded-md p-2 transition duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-black bg-white hover:bg-gray-100">
                                                                <option value="" selected>Select difficulty</option>
                                                                <option value="easy">Easy</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="difficult">Difficult</option>
                                                            </select>
                                                        )}
                                                    />
                                                    {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="price">Price</Label>
                                                    <Controller
                                                        name="price"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: 'A tour must have a price',
                                                            },
                                                            validate: (value) => value > 0 || 'Price must be a positive number',
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                defaultValue={field.value}
                                                                min={0}
                                                            />
                                                        )}
                                                    />
                                                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="discount">Discount</Label>
                                                    <Controller
                                                        name="discount"
                                                        control={control}
                                                        rules={{
                                                            validate: {
                                                                isLessThanPrice: value => (value && value < price) || 'Discount must be lesser than actual price.'
                                                            },
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                defaultValue={field.value ?? 0}
                                                                min={0}
                                                            />
                                                        )}
                                                    />
                                                    {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    name="secretTour"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="secretTour">Secret Tour</Label>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="details" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full">
                                            <div className="space-y-2">
                                                <Label htmlFor="summary">Summary</Label>
                                                <Controller
                                                    name="summary"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have a summary',
                                                        minLength: {
                                                            value: 10,
                                                            message: 'Summary should be 10 character long'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <Textarea
                                                            {...field}
                                                            defaultValue={field.value}
                                                            className={errors.summary ? 'border-red-500' : ''}
                                                        />
                                                    )}
                                                />
                                                {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have a description',
                                                        minLength: {
                                                            value: 20,
                                                            message: 'Description should be 20 character long'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <Textarea
                                                            {...field}
                                                            defaultValue={field.value}
                                                            className={`h-96 ${errors.description ? 'border-red-500' : ''} `}
                                                        />
                                                    )}
                                                />
                                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="images" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full">
                                            <div className="space-y-2">
                                                <Label htmlFor="imageCover">Cover Image</Label>
                                                <Controller
                                                    name="imageCover"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have an image cover',
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files) {
                                                                        field.onChange(e.target.files[0]);
                                                                    }
                                                                }}
                                                            />
                                                            {tour?.imageCover && (
                                                                <img
                                                                    src={`${tour.imageCover}`}
                                                                    alt="Current Cover"
                                                                    className="mt-2 h-32 w-32 object-cover rounded"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                {errors.imageCover && <p className="text-red-500">{errors.imageCover.message}</p>}
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="dates" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center h-full">
                                        <TourStartDatesUpload control={control} startDatesArr={startDate} setStartDatesArr={setStartDate} />
                                    </TabsContent>
                                    <TabsContent value="locations" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-6 w-full">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Start Location</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="startLocationAddress">Address</Label>
                                                        <Controller
                                                            name="startLocation.address"
                                                            control={control}
                                                            rules={{ required: 'Address is required' }}
                                                            render={({ field, fieldState }) => (
                                                                <Input
                                                                    {...field}
                                                                    defaultValue={field.value}
                                                                    className={fieldState.invalid ? 'border-red-500' : ''}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="startLocationDescription">Description</Label>
                                                        <Controller
                                                            name="startLocation.description"
                                                            control={control}
                                                            rules={{ required: 'Description is required' }}
                                                            render={({ field, fieldState }) => (
                                                                <Input
                                                                    {...field}
                                                                    defaultValue={field.value}
                                                                    className={fieldState.invalid ? 'border-red-500' : ''}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card className='overflow-scroll h-72'>
                                                <CardHeader>
                                                    <CardTitle>Tour Locations</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <Accordion type="single" collapsible className="w-full">
                                                        {locationFields.map((location, index) => (
                                                            <AccordionItem key={location.id} value={`location-${index}`}>
                                                                <AccordionTrigger>Location {index + 1}: {location.description || "No Description"}</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div className="space-y-4 pt-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`location-${index}-description`}>Description</Label>
                                                                            <Controller
                                                                                name={`locations.${index}.description`}
                                                                                control={control}
                                                                                rules={{ required: "Description is required" }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <>
                                                                                        <Input {...field} />
                                                                                        {error && <p className="text-red-500">{error.message}</p>}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`location-${index}-day`}>Day</Label>
                                                                            <Controller
                                                                                name={`locations.${index}.day`}
                                                                                control={control}
                                                                                rules={{
                                                                                    required: "Day is required",
                                                                                    min: { value: 1, message: "Day must be at least 1" }
                                                                                }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <>
                                                                                        <Input type="number" {...field} />
                                                                                        {error && <p className="text-red-500">{error.message}</p>}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="icon"
                                                                            onClick={() => removeLocation(index)}
                                                                        >
                                                                            <MinusCircledIcon className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => appendLocation({ description: "", day: 1 })}
                                                        className="mt-4 flex items-center space-x-2"
                                                    >
                                                        <PlusCircledIcon className="h-4 w-4" />
                                                        <span>Add Location</span>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="guides" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full flex flex-col">
                                            <Label>Tour Guides</Label>
                                            {guidesField.map((_, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <Controller
                                                        name={`guides.${index}.email`}
                                                        control={control}
                                                        rules={{
                                                            required: 'A tour must have a guide',
                                                            pattern: {
                                                                value: /\S+@\S+\.\S+/,
                                                                message: 'Please Enter a valid email',
                                                            },
                                                        }}
                                                        render={({ field, fieldState: { error } }) => (
                                                            <div className="space-y-2 w-full">
                                                                <Input
                                                                    placeholder={`Guide ${index + 1}`}
                                                                    className="w-full"
                                                                    type="email"
                                                                    {...field}
                                                                />
                                                                {error && <p className="text-red-500">{error.message}</p>}
                                                            </div>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removeGuide(index)}
                                                        className="self-start mt-1"
                                                    >
                                                        <MinusCircledIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                            ))}

                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => appendGuide({ email: '' })}
                                            >
                                                <PlusCircledIcon className="h-4 w-4 mr-2" />
                                                Add Guide
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </div>
                            </div>
                        </ScrollArea>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={isLoading || isPending}>{isLoading ? 'Verifing Data...' : isPending ? 'Uploading Data...' : 'Save Changes'}</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default TourEditForm