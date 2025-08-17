import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Link } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    role?: {
        name: string;
    };
    type?: {
        name: string;
    };
    created_at: string;
}

interface Stats {
    users: number;
    active_users: number;
    roles: number;
    types: number;
    menus: number;
    submenus: number;
    permissions: number;
}

interface Props {
    stats: Stats;
    recent_users: User[];
    [key: string]: unknown;
}

export default function SystemManagement({ stats, recent_users }: Props) {
    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                            <Icon name="settings" className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">🔧 System Management</h1>
                            <p className="text-muted-foreground">Complete role-based access control system</p>
                        </div>
                    </div>
                </div>

                {/* Management Modules Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                    <Icon name="users" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">User Management</CardTitle>
                                </div>
                            </div>
                            <CardDescription>Manage users, roles, and permissions</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.users} users
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    {stats.active_users} active
                                </Badge>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/users">Manage Users</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                    <Icon name="shield" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">Role Management</CardTitle>
                                </div>
                            </div>
                            <CardDescription>Configure user roles and access levels</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.roles} roles
                                </Badge>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/user-roles">Manage Roles</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                    <Icon name="tag" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">Type Management</CardTitle>
                                </div>
                            </div>
                            <CardDescription>Manage user types and categories</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.types} types
                                </Badge>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/user-types">Manage Types</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                    <Icon name="menu" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">Menu Management</CardTitle>
                                </div>
                            </div>
                            <CardDescription>Configure application menus and navigation</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.menus} menus
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                    {stats.submenus} submenus
                                </Badge>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/application-menus">Manage Menus</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                    <Icon name="key" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">Access Permissions</CardTitle>
                                </div>
                            </div>
                            <CardDescription>Control menu access and permissions</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="secondary" className="text-xs">
                                    {stats.permissions} permissions
                                </Badge>
                            </div>
                            <Button asChild className="w-full">
                                <Link href="/menu-access-permissions">Manage Permissions</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Users */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Icon name="users" className="w-5 h-5" />
                            Recent Users
                        </CardTitle>
                        <CardDescription>
                            Latest registered users in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recent_users.map((user) => (
                                <div key={user.id} className="flex items-center gap-4 p-4 rounded-lg border">
                                    <Avatar>
                                        <AvatarFallback>
                                            <AvatarInitials name={user.name} />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{user.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {user.role && (
                                                <Badge variant="outline" className="text-xs">
                                                    {user.role.name}
                                                </Badge>
                                            )}
                                            {user.type && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {user.type.name}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge 
                                            variant={user.is_active ? "default" : "destructive"}
                                            className="text-xs"
                                        >
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/users/${user.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/users">
                                    View All Users
                                    <Icon name="arrow-right" className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}