import { SignIn } from '@/components/auth/sign-in'
import { AccountPage } from '@/components/accountPage'
import { createFileRoute } from '@tanstack/react-router'
import { QUERIES } from "@/lib/tanstack"

export const Route = createFileRoute('/account')({
    component: Account,
})

function Account() {
    const { data: session, isLoading: isSessionLoading } = QUERIES.AUTH.useSession()

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
                    <AccountPage session={session} />
                ) : (
                    <SignIn />
                )}
            </div>
        </div>
    )
} 