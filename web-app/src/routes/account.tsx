import { SignIn } from '@/components/auth/sign-in'
import { createFileRoute } from '@tanstack/react-router'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QUERIES, MUTATIONS } from "@/lib/tanstack"

export const Route = createFileRoute('/account')({
    component: Account,
})

function Account() {
    const { toast } = useToast()
    const navigate = useNavigate()
    const { data: session, isLoading: isSessionLoading } = QUERIES.AUTH.useSession()

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

    if (isSessionLoading) {
        return (
            <div className='container mx-auto p-6 max-w-md'>
                <div>Loading...</div>
            </div>
        )
    }

    return (
        <div className='container mx-auto p-6 max-w-md'>
            <div className='max-w-md w-full px-4'>
                {session ? (
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
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    )
} 