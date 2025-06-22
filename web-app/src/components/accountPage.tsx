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

    return (
        <div className='space-y-4'>
            <h2 className='text-2xl font-semibold'>Welcome, {session.user.name}</h2>
            <p className='text-muted-foreground'>Email: {session.user.email}</p>
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