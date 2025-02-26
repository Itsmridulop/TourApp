import { useEffect, useMemo, useState } from 'react'
import { Button } from "@/component/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/component/Table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/component/Dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/component/Select"
import { Badge } from "@/component/Badge"
import { CalendarDays } from 'lucide-react'
import { TourType } from '@/types/tourTypes'
import { useAssociatedTour } from './useAssociatedTours'
import { Tour } from '@/types/userType'
import { useUpdateUser } from './useUpdateUser'
import { useUpdateTour } from '../tours/useUpdateTour'
import { FormDataController } from '@/utils/FormDataController'
import { useTours } from '../tours/useTours'

import Spinner from '@/component/Spinner'
import AssociatedTourGraph from './AssociatedTourGraph'
import NamedDisplay from '@/component/NamedDisplay'

export default function GuideActivityPage({ id, role, email }: { id: string; role: string; email: string }) {
    const { tours } = useTours("", false)
    const { associatedTours, isAssociatedToursLoading } = useAssociatedTour(id)
    const { updateUser } = useUpdateUser()
    const { updateTour } = useUpdateTour()
  
    const [associatedToursArr, setAssociatedToursArr] = useState<(Tour | TourType)[] | undefined>(associatedTours?.data.tour)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const guideTourDifficultyStats = useMemo(() => {
        const stats = associatedToursArr?.reduce((acc, associatedTour) => {
            acc[associatedTour.difficulty] = (acc[associatedTour.difficulty] || 0) + 1
            return acc
          }, {} as Record<string, number>)
          return Object.entries(stats ?? {}).map(([name, value]) => ({ name, value }))
    }, [associatedToursArr])

    const handleRemoveFromTour = (tourId: string) => {
        const updatedTourArr = associatedTours?.data.tour?.filter(tour => tour._id !== tourId).map(tour => tour._id)
        const updatedUserArr = tours?.data.filter(tour => tour._id === tourId)[0].guides?.filter(guide => `${guide._id}` !== id).map(guide => {
            return {
                email: guide.email,
            }
        })
        const newAssociatedTourArr = associatedTours?.data.tour?.filter(tour => tour._id !== tourId)
        const formData = FormDataController({ tour: updatedTourArr })
        updateUser({ formData, id }, {
            onSuccess: () => updateTour({
                tourData: {
                    guides: updatedUserArr
                }, id: tourId
            }, {
                onSuccess: () => setAssociatedToursArr(newAssociatedTourArr),
            })
        })
    }

    const handleAssignToTour = (tourId: string) => {
        const tourToAdd = tours?.data.find(tour => tour._id === tourId)
        const updatedUserArr = [
            ...tours?.data.filter(tour => tour._id === tourToAdd?._id)[0].guides?.map(guide => {
                return {
                    email: guide.email,
                }
            }) || [],
            { email }
        ]
        const updatedTourArr = [...associatedTours?.data.tour?.map(tour => tour._id) || [], tourId]
        const formData = FormDataController({ tour: updatedTourArr })
        updateTour({
            tourData: {
                guides: updatedUserArr
            }, id: tourId
        }, {
            onSuccess: () => updateUser({ formData, id }, {
                onSuccess: () => {
                    if (tourToAdd) setAssociatedToursArr([...associatedToursArr || [], tourToAdd])
                }
            })
        })
    }

    useEffect(() => {
        setAssociatedToursArr(associatedTours?.data.tour)
    }, [associatedTours])

    if (isAssociatedToursLoading) return <Spinner />

    return (
        <div className="container mx-auto p-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <AssociatedTourGraph />

                <Card className='w-full max-w-lg'><NamedDisplay data={guideTourDifficultyStats} title='Associated Tour Summary'/></Card>
            </CardHeader>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Associated Tours</CardTitle>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        {role === 'admin' &&<DialogTrigger asChild>
                            <Button>Assign to New Tour</Button>
                        </DialogTrigger>}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Assign to New Tour</DialogTitle>
                            </DialogHeader>
                            <Select onValueChange={handleAssignToTour}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a tour" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tours?.data.filter(tour =>
                                        !associatedToursArr?.some(t =>
                                            t._id === tour._id)).map((tour) => (
                                                <SelectItem key={tour._id} value={tour._id}>{tour.name}</SelectItem>
                                            ))}
                                </SelectContent>
                            </Select>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tour Name</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead>Price</TableHead>
                                {role === 'admin' && <TableHead>Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {associatedToursArr?.map((tour) => (
                                <TableRow key={tour._id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <img src={tour.imageCover} alt={tour.name} className="h-10 w-10 rounded-full object-cover" />
                                            <div>
                                                <div className="font-bold">{tour.name}</div>
                                                <div className="text-sm text-gray-500">{tour.summary}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <CalendarDays className="mr-2 inline-block h-4 w-4" />
                                        {tour.duration} days
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={tour.difficulty === "easy" ? "secondary" : tour.difficulty === "medium" ? "outline" : "destructive"}>
                                            {tour.difficulty}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${tour.price}</TableCell>
                                    {role === 'admin' && <TableCell>
                                        <Button variant="destructive" onClick={() => handleRemoveFromTour(tour._id)}>Remove</Button>
                                    </TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};