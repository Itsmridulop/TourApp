import { useState, useMemo, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Button } from "@/component/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/component/Table"
import { BookingDataType } from '@/types/bookingType'
import { useBookingOfUser } from '../bookings/useBookingOfUser'
import { useUpdateBooking } from '../bookings/useUpdateBooking'
import { useReviewOfUser } from '../reviews/useReviewOfUser'

import Spinner from '@/component/Spinner'
import NamedDisplay from '@/component/NamedDisplay'


const pieChartColors = ['#2ecc71', '#27ae60', '#229954', '#1e8449', '#196f3d']

export default function UserActivityPage({ id }: { id: string }) {
  const { reviewData, isLoading: isReviewLoading } = useReviewOfUser(id)
  const { bookingData, isLoading } = useBookingOfUser(id)
  const { updateBooking } = useUpdateBooking()
  const [bookings, setBookings] = useState<BookingDataType[]>(bookingData?.data ?? [])

  useEffect(() => {
    setBookings(bookingData?.data ?? [])
  }, [bookingData])


  const bookingStats = useMemo(() => {
    const stats = bookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {} as Record<BookingDataType['status'], number>)
    return Object.entries(stats ?? {}).map(([name, value]) => ({ name, value }))
  }, [bookings])

  const handleStatusChange = (bookingId: string, newStatus: BookingDataType['status']) => {
    const updatedBookings = bookings.map(booking =>
      booking._id === bookingId ? { ...booking, status: newStatus } : booking
    )

    updateBooking({
      bookingData: {
        status: newStatus
      }, id: bookingId
    }, {
      onSuccess: () => setBookings(updatedBookings)
    })
  }

  const handleCancelBooking = (bookingId: string) => {
    const updatedBookings = bookings.map(booking =>
      booking._id === `${bookingId}` ? { ...booking, status: 'canceled', canceledAt: new Date(Date.now()) } : booking
    )
    updateBooking({
      bookingData: {
        status: 'canceled'
      }, id: bookingId
    }, {
      onSuccess: () => setBookings(updatedBookings)
    })
  }

  if (isLoading || isReviewLoading) return <Spinner />
console.log(reviewData)
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">User Account Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <NamedDisplay title='Booking Summary' data={bookingStats}/>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Booking Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={bookingStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {bookingStats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieChartColors[index % pieChartColors.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Section */}
      <Card>
        <CardHeader>
          <CardTitle>User Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid At / Payment Method</TableHead>
                <TableHead>Tour Start Date</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{typeof booking.tour === 'object' && booking.tour.name}</TableCell>
                  <TableCell>{new Date(booking.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-primary-foreground`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {booking.status === 'paid' || booking.status === 'completed' ? (
                      `${new Date(booking.paidAt!).toLocaleDateString()} / ${booking.paymentMethod}`
                    ) : booking.status === 'canceled' ? (
                      `Canceled on ${new Date(booking.canceledAt!).toLocaleDateString()}`
                    ) : (
                      `Yet to pay / ${booking.paymentMethod}`
                    )}
                  </TableCell>
                  <TableCell>{new Date(typeof booking.tour === 'object' ? booking.tour.startDates[0] : Date.now()).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.members}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {['booked', 'confirmed', 'paid'].includes(booking.status) && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </Button>
                      )}
                      {['booked', 'confirmed', 'paid'].includes(booking.status) && (
                        <Select
                          value={booking.status}
                          onValueChange={(newStatus) => handleStatusChange(booking._id, newStatus as BookingDataType['status'])}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booked">Booked</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewData?.data.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <h3 className="font-semibold">{typeof review.tour === 'object' && review.tour.name}</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  <span className="text-muted-foreground">{'★'.repeat(5 - review.rating)}</span>
                </div>
                <p className="text-muted-foreground mt-1">{review.review}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}