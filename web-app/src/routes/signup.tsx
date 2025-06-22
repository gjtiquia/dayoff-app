import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@/components/auth/sign-up'

export const Route = createFileRoute('/signup')({
    component: SignUpPage,
})

function SignUpPage() {
    return (
        <div className="container mx-auto p-6 max-w-md">
            <SignUp />
        </div>
    )
} 