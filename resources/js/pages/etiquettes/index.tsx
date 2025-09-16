import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus } from 'lucide-react';
import { type EventColor } from '@/components/event-calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etiquettes',
        href: '/etiquettes',
    },
];

interface Etiquette {
    id: string;
    name: string;
    color: EventColor;
    is_active: boolean;
    sort_order: number;
}

interface EtiquettesPageProps {
    etiquettes: Etiquette[];
}

const colorOptions: { value: EventColor; label: string }[] = [
    { value: 'blue', label: 'Blue' },
    { value: 'orange', label: 'Orange' },
    { value: 'violet', label: 'Violet' },
    { value: 'rose', label: 'Rose' },
    { value: 'emerald', label: 'Emerald' },
];

export default function Etiquettes({ etiquettes = [] }: EtiquettesPageProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        color: 'blue' as EventColor,
        is_active: true,
        sort_order: 0,
    });

    const handleCreate = () => {
        router.post('/etiquettes', formData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setFormData({ name: '', color: 'blue', is_active: true, sort_order: 0 });
            },
        });
    };

    const handleUpdate = (id: string) => {
        router.put(`/etiquettes/${id}`, formData, {
            onSuccess: () => {
                setEditingId(null);
                setFormData({ name: '', color: 'blue', is_active: true, sort_order: 0 });
            },
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this etiquette?')) {
            router.delete(`/etiquettes/${id}`);
        }
    };

    const handleToggleActive = (etiquette: Etiquette) => {
        router.patch(`/etiquettes/${etiquette.id}/toggle-active`);
    };

    const startEdit = (etiquette: Etiquette) => {
        setEditingId(etiquette.id);
        setFormData({
            name: etiquette.name,
            color: etiquette.color,
            is_active: etiquette.is_active,
            sort_order: etiquette.sort_order,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setShowCreateForm(false);
        setFormData({ name: '', color: 'blue', is_active: true, sort_order: 0 });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Etiquettes" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Etiquettes Management</h1>
                    <Button onClick={() => setShowCreateForm(true)} disabled={showCreateForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Etiquette
                    </Button>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Etiquette</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Etiquette name"
                                />
                            </div>
                            <div>
                                <Label htmlFor="color">Color</Label>
                                <Select
                                    value={formData.color}
                                    onValueChange={(value: EventColor) => setFormData({ ...formData, color: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {colorOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-3 h-3 rounded-full bg-${option.value}-400`}></div>
                                                    {option.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_active"
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>
                            <div>
                                <Label htmlFor="sort_order">Sort Order</Label>
                                <Input
                                    id="sort_order"
                                    type="number"
                                    value={formData.sort_order}
                                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleCreate}>Create</Button>
                                <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Etiquettes List */}
                <div className="space-y-4">
                    {etiquettes.map((etiquette) => (
                        <Card key={etiquette.id}>
                            <CardContent className="p-4">
                                {editingId === etiquette.id ? (
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor={`name-${etiquette.id}`}>Name</Label>
                                            <Input
                                                id={`name-${etiquette.id}`}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`color-${etiquette.id}`}>Color</Label>
                                            <Select
                                                value={formData.color}
                                                onValueChange={(value: EventColor) => setFormData({ ...formData, color: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {colorOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-3 h-3 rounded-full bg-${option.value}-400`}></div>
                                                                {option.label}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id={`is_active-${etiquette.id}`}
                                                checked={formData.is_active}
                                                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                                            />
                                            <Label htmlFor={`is_active-${etiquette.id}`}>Active</Label>
                                        </div>
                                        <div>
                                            <Label htmlFor={`sort_order-${etiquette.id}`}>Sort Order</Label>
                                            <Input
                                                id={`sort_order-${etiquette.id}`}
                                                type="number"
                                                value={formData.sort_order}
                                                onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={() => handleUpdate(etiquette.id)}>Save</Button>
                                            <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-4 h-4 rounded-full bg-${etiquette.color}-400`}></div>
                                            <span className="font-medium">{etiquette.name}</span>
                                            <Badge variant={etiquette.is_active ? 'default' : 'secondary'}>
                                                {etiquette.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">Order: {etiquette.sort_order}</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleToggleActive(etiquette)}
                                            >
                                                {etiquette.is_active ? 'Deactivate' : 'Activate'}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => startEdit(etiquette)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(etiquette.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
