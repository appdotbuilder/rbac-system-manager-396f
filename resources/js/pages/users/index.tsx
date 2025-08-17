import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarInitials } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Link, router } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    created_at: string;
    role?: {
        id: number;
        name: string;
    };
    type?: {
        id: number;
        name: string;
    };
}

interface Role {
    id: number;
    name: string;
}

interface Type {
    id: number;
    name: string;
}

interface PaginationLink {
    url?: string;
    label: string;
    active: boolean;
}

interface Pagination {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Filters {
    search?: string;
    role?: string;
    type?: string;
    status?: string;
}

interface Props {
    users: Pagination;
    roles: Role[];
    types: Type[];
    filters: Filters;
    [key: string]: unknown;
}

export default function UsersIndex({ users, roles, types, filters }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [selectedRole, setSelectedRole] = React.useState(filters.role || '');
    const [selectedType, setSelectedType] = React.useState(filters.type || '');
    const [selectedStatus, setSelectedStatus] = React.useState(filters.status || '');

    const handleSearch = React.useCallback((term: string) => {
        const params = new URLSearchParams();
        if (term) params.set('search', term);
        if (selectedRole) params.set('role', selectedRole);
        if (selectedType) params.set('type', selectedType);
        if (selectedStatus) params.set('status', selectedStatus);
        
        router.visit(`/users?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [selectedRole, selectedType, selectedStatus]);

    const handleFilterChange = React.useCallback((key: string, value: string) => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (key === 'role') {
            if (value) params.set('role', value);
            if (selectedType) params.set('type', selectedType);
        } else if (key === 'type') {
            if (selectedRole) params.set('role', selectedRole);
            if (value) params.set('type', value);
        } else if (key === 'status') {
            if (selectedRole) params.set('role', selectedRole);
            if (selectedType) params.set('type', selectedType);
            if (value) params.set('status', value);
        }
        if (selectedStatus && key !== 'status') params.set('status', selectedStatus);
        
        router.visit(`/users?${params.toString()}`, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [searchTerm, selectedRole, selectedType, selectedStatus]);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== filters.search) {
                handleSearch(searchTerm);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, filters.search, handleSearch]);

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/users/${userId}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">👥 User Management</h1>
                        <p className="text-muted-foreground">
                            Manage users, roles, and permissions ({users.total} total users)
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/users/create">
                            <Icon name="plus" className="w-4 h-4 mr-2" />
                            Add User
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-lg">Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <Input
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <Select value={selectedRole} onValueChange={(value) => {
                                    setSelectedRole(value);
                                    handleFilterChange('role', value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Roles</SelectItem>
                                        {roles.map((role) => (
                                            <SelectItem key={role.id} value={role.id.toString()}>
                                                {role.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select value={selectedType} onValueChange={(value) => {
                                    setSelectedType(value);
                                    handleFilterChange('type', value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Types</SelectItem>
                                        {types.map((type) => (
                                            <SelectItem key={type.id} value={type.id.toString()}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Select value={selectedStatus} onValueChange={(value) => {
                                    setSelectedStatus(value);
                                    handleFilterChange('status', value);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b bg-muted/50">
                                    <tr>
                                        <th className="text-left p-4 font-semibold">User</th>
                                        <th className="text-left p-4 font-semibold">Role</th>
                                        <th className="text-left p-4 font-semibold">Type</th>
                                        <th className="text-left p-4 font-semibold">Status</th>
                                        <th className="text-left p-4 font-semibold">Created</th>
                                        <th className="text-right p-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="border-b hover:bg-muted/50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar>
                                                        <AvatarFallback>
                                                            <AvatarInitials name={user.name} />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                {user.role ? (
                                                    <Badge variant="outline">{user.role.name}</Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">No role</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {user.type ? (
                                                    <Badge variant="secondary">{user.type.name}</Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">No type</span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={user.is_active ? "default" : "destructive"}>
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/users/${user.id}`}>
                                                            <Icon name="eye" className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="sm" asChild>
                                                        <Link href={`/users/${user.id}/edit`}>
                                                            <Icon name="edit" className="w-4 h-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm"
                                                        onClick={() => handleDelete(user.id)}
                                                        className="text-destructive hover:text-destructive"
                                                    >
                                                        <Icon name="trash" className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="flex items-center justify-between px-4 py-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Showing {((users.current_page - 1) * users.per_page) + 1} to {Math.min(users.current_page * users.per_page, users.total)} of {users.total} results
                                </div>
                                <div className="flex items-center gap-2">
                                    {users.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "ghost"}
                                            size="sm"
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}