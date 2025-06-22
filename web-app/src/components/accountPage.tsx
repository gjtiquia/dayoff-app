import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MUTATIONS } from "@/lib/tanstack"

interface AccountPageProps {
    session: {
        user: {
            name: string
            email: string
        }
    }
}

export function AccountPage({ session }: AccountPageProps) {
    const { toast } = useToast()
    const navigate = useNavigate()
    const signOutMutation = MUTATIONS.AUTH.useSignOut()

    const handleSignOut = () => {
        signOutMutation.mutate(undefined, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Signed out successfully",
                    variant: "default"
                })
                navigate({ to: "/account" })
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to sign out. Please try again.",
                })
            }
        })
    }

    // Weekly schedule data
    const weeklySchedule = [
        { day: 'Mon', hours: '11:00-18:00' },
        { day: 'Tue', hours: '(off)' },
        { day: 'Wed', hours: '10:00-18:00' },
        { day: 'Thu', hours: '10:00-18:00' },
        { day: 'Fri', hours: '09:00-18:00' },
        { day: 'Sat', hours: '09:00-16:30' },
        { day: 'Sun', hours: '(off)' }
    ]

    // Calculate total hours
    const calculateTotalHours = () => {
        return weeklySchedule.reduce((total, schedule) => {
            if (schedule.hours === '(off)') return total

            // Parse 24-hour format like "09:00-18:00" or "09:00-16:30"
            const [startTime, endTime] = schedule.hours.split('-')
            const [startHour, startMin] = startTime.split(':').map(Number)
            const [endHour, endMin] = endTime.split(':').map(Number)

            const startTotalMinutes = startHour * 60 + startMin
            const endTotalMinutes = endHour * 60 + endMin
            const durationMinutes = endTotalMinutes - startTotalMinutes

            return total + (durationMinutes / 60)
        }, 0)
    }

    const totalHours = calculateTotalHours()

    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Welcome, {session.user.name}</h2>
                <p className='text-muted-foreground'>Email: {session.user.email}</p>
            </div>

            <div className='space-y-3'>
                <h3 className='text-lg font-medium'>Weekly Schedule</h3>
                <div className='space-y-2'>
                    {weeklySchedule.map((schedule) => (
                        <div key={schedule.day} className='flex justify-between items-center py-1'>
                            <span className='font-medium'>{schedule.day}:</span>
                            <span className={`${schedule.hours === '(off)' ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                                {schedule.hours}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='space-y-2'>
                <h3 className='text-lg font-medium'>Total Hours</h3>
                <div className='flex justify-between items-center py-2 border-t border-border'>
                    <span className='font-medium'>Weekly Total:</span>
                    <span className='text-lg font-semibold'>{totalHours} hours</span>
                </div>
            </div>

            <Button
                onClick={handleSignOut}
                variant="destructive"
                className='w-full'
                disabled={signOutMutation.isPending}
            >
                {signOutMutation.isPending ? (
                    <Loader2 size={16} className="animate-spin mr-2" />
                ) : null}
                Sign Out
            </Button>
        </div>
    )
} 