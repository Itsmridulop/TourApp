'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/component/Card'
import { Input } from '@/component/Input'
import { Label } from '@/component/Label'
import { RadioGroup, RadioGroupItem } from '@/component/RadioGroup'
import { Button } from '@/component/Button'
import { CreditCard, Wallet, DollarSign } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useCreateBooking } from './useCreateBooking'
import { useQueryClient } from '@tanstack/react-query'
import { TourResponseType } from '@/types/tourTypes'
import { useAlert } from '@/component/Alert'

type FormInputs = {
  members: number
  paymentMethod: 'credit-card' | 'UPI' | 'cash'
}

export default function CreateBookingForm({ onClose, onBooked }: { onBooked: (book:boolean) =>  void ,onClose?: () => void }) {
  const queryClient = useQueryClient()
  const tour: TourResponseType | undefined = queryClient.getQueryData(['tour'])

  const { showAlert } = useAlert()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInputs>()
  const { createBooking, isPending } = useCreateBooking()
  const { id } = useParams()

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (tour) {
      if (data.members > tour?.data?.maxGroupSize) showAlert('Members should be lesser then group size.')
      createBooking({ members: data.members,paymentMethod: data.paymentMethod, tourId: id }, {
        onSuccess: () => {
          onClose?.()
          onBooked(true)
        },
        onSettled: () => reset()
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-background">
      <CardHeader>
        <CardTitle>New Booking</CardTitle>
        <CardDescription>Enter booking details and select a payment method.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="members">Number of Members</Label>
              <Input
                id="members"
                type="number"
                placeholder="Enter number of members"
                {...register('members', { required: 'Number of members is required', min: { value: 1, message: 'Minimum 1 member required' } })}
              />
              {errors.members && <span className="text-sm text-red-500">{errors.members.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Payment Method</Label>
              <RadioGroup defaultValue="credit-card">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" {...register('paymentMethod', { required: 'Payment method is required' })} />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UPI" id="UPI" {...register('paymentMethod', { required: 'Payment method is required' })} />
                  <Label htmlFor="paypal" className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    UPI
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" {...register('paymentMethod', { required: 'Payment method is required' })} />
                  <Label htmlFor="cash" className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Cash
                  </Label>
                </div>
              </RadioGroup>
              {errors.paymentMethod && <span className="text-sm text-red-500">{errors.paymentMethod.message}</span>}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">{isPending ? 'Creating...' : 'Create Booking'}</Button>
        </form>
      </CardContent>
    </div>
  )
}