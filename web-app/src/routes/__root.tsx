import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '@/components/ui/toaster'
import { Nav } from '@/components/nav'

export const Route = createRootRoute({
    component: () => (
        // needs to be min-h-dvh to allow for resizing if the content is too long and scrollable
        // tho at the expense of not having a "defined" height, so cant do center vertically with h-full flex items-center in children
        <div className="min-h-dvh pb-[4.5rem] md:pb-0 md:pl-[3.5rem] xl:pl-52">
            <Nav />
            <Outlet />
            <Toaster />
            {/* {import.meta.env.DEV && <TanStackRouterDevtools />} */}
        </div>
    ),
})