import { useForm, Controller } from "react-hook-form"
import { Star } from "lucide-react"
import { Button } from "@/component/Button"
import { Textarea } from "@/component/Textarea"
import { Label } from "@/component/Label"
import { useParams } from "react-router-dom"
import { ReviewType } from "@/types/ReviewType"

type FormValues = {
    rating: number
    review: string
}

export default function AddReviewForm({ onReviewChange }: { onReviewChange: (reviewData: ReviewType) => void }) {
    const { id } = useParams()
    const { handleSubmit, control, reset, setError, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            rating: 0,
            review: ""
        }
    })

    const onSubmit = (data: FormValues) => {
        if (data.rating === 0) {
            setError("rating", { type: "manual", message: "Please select a rating" })
            return
        }

        onReviewChange({ rating: data.rating, review: data.review, tour: id })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-background rounded-lg shadow p-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow space-y-2">
                    <Label htmlFor="review" className="sr-only">Your Review</Label>
                    <Controller
                        name="review"
                        control={control}
                        rules={{ required: "Review is required", minLength: { value: 10, message: "Review must be at least 10 characters long" } }}
                        render={({ field }) => (
                            <Textarea
                                id="review"
                                {...field}
                                placeholder="Write your review here..."
                                className="w-full h-full min-h-[100px]"
                            />
                        )}
                    />
                    {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}
                </div>

                <div className="flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                        <Label className="block text-sm font-medium">Rating</Label>
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Controller
                                    key={star}
                                    name="rating"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="cursor-pointer">
                                            <input
                                                type="radio"
                                                {...field}
                                                value={star}
                                                checked={field.value === star}
                                                className="sr-only"
                                                onClick={() => field.onChange(star)}
                                            />
                                            <Star
                                                className={`w-8 h-8 ${field.value >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                    }`}
                                            />
                                        </label>
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Submit Review
                    </Button>
                </div>
            </div>

            {errors.rating && <p className="text-red-500 text-sm mt-2">{errors.rating.message}</p>}
        </form>
    )
}
