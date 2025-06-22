import { AddItemForm } from '@/components/addItemForm'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { QUERIES } from '@/lib/tanstack'

export const Route = createFileRoute('/add')({
    component: Add,
})

function Add() {
    const { data: session, isLoading } = QUERIES.AUTH.useSession()

    if (isLoading) {
        return (
            <div className='h-full flex items-center justify-center'>
                <div>Loading...</div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className='p-6 max-w-2xl mx-auto'>
                <Card>
                    <CardHeader>
                        <CardTitle>Sign in required</CardTitle>
                        <CardDescription>
                            Please <Link to="/account" className="text-primary hover:underline">sign in</Link> to add items
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return (
        <div className='p-6 flex justify-center '>
            <AddItemForm />
        </div>
    )
}
