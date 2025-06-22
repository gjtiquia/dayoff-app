import { Home, Search, Plus, User, Bell } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/add', icon: Plus, label: 'Add' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/account', icon: User, label: 'Account' },
] as const

export function Nav() {
    const router = useRouterState()
    const currentRoute = navItems.find(item => item.to === router.location.pathname)

    return (
        <>
            {/* Desktop Side Navigation */}
            <nav className="hidden md:block fixed left-0 top-0 h-screen z-10 bg-background/80 backdrop-blur-sm border-r">
                <div className="h-full flex flex-col justify-between p-3">
                    <div className="flex flex-col gap-6">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'flex items-center gap-2.5 px-4 py-2 rounded-md transition-all duration-200',
                                    'hover:bg-accent/80 hover:scale-105',
                                    '[&.active]:font-medium [&.active]:bg-accent [&.active]:scale-105 [&.active]:shadow-sm',
                                    'xl:w-48 md:w-14'
                                )}
                            >
                                <Icon className="h-[18px] w-[18px]" />
                                <span className="hidden xl:inline">{label}</span>
                            </Link>
                        ))}
                    </div>
                    <ThemeToggle />
                </div>
            </nav>

            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-10 transition-colors duration-300">
                <div className="bg-gradient-to-b from-background/95 to-background/60 backdrop-blur-md border-b shadow-sm">
                    <div className="flex justify-between items-center max-w-md mx-auto px-4 py-3">
                        <h1 className="text-lg font-medium">
                            {currentRoute?.label || 'Supermarket App'}
                        </h1>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 transition-colors duration-300">
                <div className="bg-gradient-to-t from-background/95 to-background/60 backdrop-blur-md border-t shadow-lg">
                    <div className="grid grid-cols-5 items-center max-w-md mx-auto">
                        {navItems.map(({ to, icon: Icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={cn(
                                    'flex flex-col items-center gap-1 px-4 py-2.5 relative transition-all duration-200',
                                    'hover:text-primary active:scale-95',
                                    '[&.active]:text-primary [&.active]:font-medium [&.active]:scale-105',
                                    '[&.active]:before:absolute [&.active]:before:h-1 [&.active]:before:w-6',
                                    '[&.active]:before:bg-primary [&.active]:before:top-0 [&.active]:before:rounded-full',
                                    '[&.active]:before:animate-fade-in',
                                    // Special styling for the Add button (center item)
                                    to === '/add' && 'justify-self-center'
                                )}
                            >
                                <Icon className={cn("h-5 w-5", to === '/add' && "scale-125")} />
                                <span className="text-[11px] font-medium opacity-85">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    )
} 