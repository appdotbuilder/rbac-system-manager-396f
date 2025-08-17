import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {


    const roles = [
        { name: 'Superadmin', color: 'bg-red-500', description: 'Full system access' },
        { name: 'Administrator', color: 'bg-orange-500', description: 'Administrative privileges' },
        { name: 'Operator', color: 'bg-blue-500', description: 'Operational control' },
        { name: 'User', color: 'bg-green-500', description: 'Standard user access' },
        { name: 'Auditor', color: 'bg-purple-500', description: 'Read-only access' },
    ];

    return (
        <>
            <Head title="System Management - Role-Based Access Control" />
            
            <div className="min-h-screen bg-background">
                {/* Header */}
                <header className="border-b">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                <Icon name="settings" className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold">System Management</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Button asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button variant="ghost" asChild>
                                        <Link href="/login">Login</Link>
                                    </Button>
                                    <Button asChild>
                                        <Link href="/register">Get Started</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
                                <Icon name="shield-check" className="w-8 h-8 text-primary" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                                🔧 System Management
                            </h1>
                        </div>
                        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                            Enterprise-grade role-based access control system with comprehensive user management
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Button size="lg" asChild className="text-lg px-8">
                                    <Link href="/dashboard">
                                        <Icon name="dashboard" className="w-5 h-5 mr-2" />
                                        Access System
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" asChild className="text-lg px-8">
                                        <Link href="/register">
                                            <Icon name="user-plus" className="w-5 h-5 mr-2" />
                                            Get Started Free
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild className="text-lg px-8">
                                        <Link href="/login">
                                            <Icon name="log-in" className="w-5 h-5 mr-2" />
                                            Sign In
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Role System Preview */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">🎭 Built-in Role System</h2>
                        <p className="text-xl text-muted-foreground">
                            Five predefined roles with customizable permissions
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {roles.map((role) => (
                            <div key={role.name} className="flex items-center gap-3 p-4 border rounded-lg">
                                <div className={`w-4 h-4 rounded-full ${role.color}`}></div>
                                <div>
                                    <p className="font-semibold">{role.name}</p>
                                    <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">🚀 Powerful Features</h2>
                        <p className="text-xl text-muted-foreground">
                            Everything you need for comprehensive system management
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="users" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">User Management</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            Full lifecycle management
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    Complete CRUD operations for managing users with role assignments and password management.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="shield" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Role-Based Access Control</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            5 built-in roles
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    Sophisticated role management with priority levels: Superadmin, Administrator, Operator, User, Auditor.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="tag" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">User Type System</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            Flexible categorization
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    Categorize users with flexible type management for better organization and reporting.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="menu" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Dynamic Menu System</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            Drag & drop ordering
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    Configure application menus and submenus with custom icons, routes, and sorting.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="key" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Granular Permissions</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            CRUD-level control
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    Fine-grained access control linking roles to specific menus with view, create, edit, delete permissions.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
                                        <Icon name="settings" className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">Interactive Data Tables</CardTitle>
                                        <Badge variant="secondary" className="text-xs mt-1">
                                            Real-time search
                                        </Badge>
                                    </div>
                                </div>
                                <CardDescription className="text-base leading-relaxed">
                                    All management interfaces feature searching, sorting, pagination, and advanced filtering.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                {/* Management Overview */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">📊 Complete Management Suite</h2>
                        <p className="text-xl text-muted-foreground">
                            Manage every aspect of your system with intuitive interfaces
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-blue-500/10 rounded-xl">
                                    <Icon name="users" className="w-7 h-7 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">User Management</h3>
                                    <p className="text-muted-foreground">Complete user lifecycle</p>
                                </div>
                            </div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Create, edit, and delete users
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Role and type assignment
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Password management
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Activity status control
                                </li>
                            </ul>
                        </Card>

                        <Card className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center justify-center w-14 h-14 bg-purple-500/10 rounded-xl">
                                    <Icon name="key" className="w-7 h-7 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Access Control</h3>
                                    <p className="text-muted-foreground">Granular permissions</p>
                                </div>
                            </div>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Menu-level permissions
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    CRUD operation control
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Role-based restrictions
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon name="check-circle" className="w-5 h-5 text-green-500" />
                                    Dynamic navigation
                                </li>
                            </ul>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-2xl mx-auto p-8 border rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5">
                        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Set up your system management solution in minutes with our comprehensive platform
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Button size="lg" asChild className="text-lg px-8">
                                    <Link href="/dashboard">
                                        <Icon name="dashboard" className="w-5 h-5 mr-2" />
                                        Go to Dashboard
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" asChild className="text-lg px-8">
                                        <Link href="/register">
                                            <Icon name="rocket" className="w-5 h-5 mr-2" />
                                            Start Managing
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild className="text-lg px-8">
                                        <Link href="/login">
                                            <Icon name="log-in" className="w-5 h-5 mr-2" />
                                            Sign In
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t bg-muted/30">
                    <div className="container mx-auto px-4 py-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                                    <Icon name="settings" className="w-4 h-4 text-primary" />
                                </div>
                                <span className="font-semibold">System Management</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Enterprise role-based access control system • Built with Laravel & React
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}