import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MUTATIONS, QUERIES } from "@/lib/tanstack"

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
    const { data: scheduleData, isLoading: scheduleLoading, error: scheduleError } = QUERIES.SCHEDULE.useSchedule()

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

    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    // TODO : this should probably split into components, dun hv a fallback if nothing from backend
    const weeklySchedule = scheduleData?.schedule || []

    // Calculate total hours
    const calculateTotalHours = () => {
        return weeklySchedule.reduce((total: number, schedule) => {
            const dayTotal = schedule.hourBlocks.reduce((daySum: number, block) => {
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

    // Helper function to calculate hours for a single day
    const calculateDayHours = (day: string) => {
        const daySchedule = weeklySchedule.find(s => s.day === day)
        if (!daySchedule) return 0

        return daySchedule.hourBlocks.reduce((daySum: number, block) => {
            const startTotalMinutes = block.start.hr * 60 + block.start.min
            const endTotalMinutes = block.end.hr * 60 + block.end.min
            const durationMinutes = endTotalMinutes - startTotalMinutes

            return daySum + (durationMinutes / 60)
        }, 0)
    }

    // Helper function to get schedule for a day
    const getScheduleForDay = (day: string) => {
        const daySchedule = weeklySchedule.find(s => s.day === day)
        if (!daySchedule) return '(Day Off)'

        return daySchedule.hourBlocks
            .map(block => `${formatTime(block.start)}-${formatTime(block.end)}`)
            .join(', ')
    }

    if (scheduleError) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load schedule. Please refresh the page.",
        })
    }

    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Welcome, {session.user.name}</h2>
                <p className='text-muted-foreground'>Email: {session.user.email}</p>
            </div>

            <div className='space-y-3'>
                <h3 className='text-lg font-medium'>Weekly Schedule</h3>
                {scheduleLoading ? (
                    <div className='flex items-center justify-center py-4'>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        <span>Loading schedule...</span>
                    </div>
                ) : (
                    <div className='space-y-2'>
                        {allDays.map((day) => {
                            const hours = getScheduleForDay(day)
                            const dayHours = calculateDayHours(day)
                            return (
                                <div key={day} className='flex justify-between items-center py-1'>
                                    <div className='flex justify-between items-center w-full'>
                                        <span className='font-medium'>{day}:</span>
                                        <span className={`flex-1 text-center ${hours === '(Day Off)' ? 'text-muted-foreground italic' : 'text-foreground'}`}>
                                            {hours}
                                        </span>
                                        <span className='text-right min-w-[60px]'>
                                            {dayHours > 0 ? `${dayHours}h` : '-'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            <div className='space-y-2'>
                <h3 className='text-lg font-medium'>Total Hours</h3>
                <div className='flex justify-between items-center py-2 border-t border-border'>
                    <span className='font-medium'>Weekly Total:</span>
                    <span className='text-lg font-semibold'>
                        {scheduleLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            `${totalHours} hours`
                        )}
                    </span>
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