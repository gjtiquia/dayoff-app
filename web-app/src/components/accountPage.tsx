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
        { day: 'Mon', hourBlocks: [{ start: { hr: 11, min: 0 }, end: { hr: 18, min: 0 } }] },
        { day: 'Wed', hourBlocks: [{ start: { hr: 10, min: 0 }, end: { hr: 18, min: 0 } }] },
        { day: 'Thu', hourBlocks: [{ start: { hr: 10, min: 0 }, end: { hr: 18, min: 0 } }] },
        { day: 'Fri', hourBlocks: [{ start: { hr: 9, min: 0 }, end: { hr: 18, min: 0 } }] },
        { day: 'Sat', hourBlocks: [{ start: { hr: 9, min: 0 }, end: { hr: 16, min: 30 } }] }
    ]

    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // Calculate total hours
    const calculateTotalHours = () => {
        return weeklySchedule.reduce((total, schedule) => {
            const dayTotal = schedule.hourBlocks.reduce((daySum, block) => {
                const startTotalMinutes = block.start.hr * 60 + block.start.min
                const endTotalMinutes = block.end.hr * 60 + block.end.min
                const durationMinutes = endTotalMinutes - startTotalMinutes

                return daySum + (durationMinutes / 60)
            }, 0)

            return total + dayTotal
        }, 0)
    }

    const totalHours = calculateTotalHours()

    // Helper function to format time
    const formatTime = (time: { hr: number, min: number }) => {
        const hours = time.hr.toString().padStart(2, '0')
        const minutes = time.min.toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    // Helper function to get schedule for a day
    const getScheduleForDay = (day: string) => {
        const daySchedule = weeklySchedule.find(s => s.day === day)
        if (!daySchedule) return '(Day Off)'

        return daySchedule.hourBlocks
            .map(block => `${formatTime(block.start)}-${formatTime(block.end)}`)
            .join(', ')
    }

    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Welcome, {session.user.name}</h2>
                <p className='text-muted-foreground'>Email: {session.user.email}</p>
            </div>

            <div className='space-y-3'>
                <h3 className='text-lg font-medium'>Weekly Schedule</h3>
                <div className='space-y-2'>
                    {allDays.map((day) => {
                        const hours = getScheduleForDay(day)
                        return (
                            <div key={day} className='flex justify-between items-center py-1'>
                                <span className='font-medium'>{day}:</span>
                                <span className={`${hours === '(Day Off)' ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                                    {hours}
                                </span>
                            </div>
                        )
                    })}
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