import * as zod from 'zod';
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTenantValidationMessages } from '../Tenant.ValidationMessages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCreateTenantMutation, useDeleteTenantMutation } from '../api/tenants.mutations';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { FormErrorMessage } from '@/components/form-input-error';
import type { EditTenantProps } from '@/features/layouts/components/tenant-card-selection';
import { useState } from 'react';

const CreateTenantSchema = zod.object({
  name: zod.string().min(1, createTenantValidationMessages.name.required),
});


type CreateTenantFormData = zod.infer<typeof CreateTenantSchema>;


interface CreateTenantDialogContentProps {
    closeDialogCallback?: () => void;
    tenant: EditTenantProps | null
}

export function CreateTenantDialogContent({ closeDialogCallback, tenant }: CreateTenantDialogContentProps) {

    const [mode, setMode] = useState<"deleteMode" | null>(null)

    const deleteTenantMutation = useDeleteTenantMutation({ onSuccessCallback: closeDialogCallback })


    const createTenantMutation = useCreateTenantMutation({ onSuccessCallback: closeDialogCallback })


    const {
            formState: { errors },
            register,
            handleSubmit,
            } = useForm<CreateTenantFormData>({
                resolver: zodResolver(CreateTenantSchema),
                values: {
                    name: tenant?.name || '',
                },
            });
    
    
        async function onSubmit(data: CreateTenantFormData) {
            console.log(data)
            if (tenant) {
                return await deleteTenantMutation.mutateAsync(tenant.id)
            }
            await createTenantMutation.mutateAsync(data.name)
        }
    

    return (
        <DialogContent>
            <div className="space-x-2">
                <span>
                    {tenant ? mode !== "deleteMode" ? 'Edit Tenant' : 'Delete Tenant' : 'Create Tenant'}.
                </span>

                {
                    tenant && mode !== "deleteMode" && <Button variant="destructive" className="p-1" onClick={() => setMode("deleteMode")} ><Trash2 /></Button>
                }

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                
                {
                    mode !== "deleteMode" ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" {...register("name")} />
                                {errors.name && <FormErrorMessage error={errors.name} />}
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full"
                                disabled={createTenantMutation.isPending}
                                >
                                    Save
                                    {createTenantMutation.isPending && <Loader2 className='animate-spin ml-2' />}
                            </Button>
                        </>
                    ) : (
                        <>
                            <p className='text-sm text-muted-foreground'>Are you sure you want to delete this tenant? This action cannot be undone.</p>
                            
                            <div className="">
                                <Button variant="outline" className="w-full mb-2" onClick={() => setMode(null)} disabled={deleteTenantMutation.isPending}>
                                    Cancel
                                </Button>

                                <Button 
                                    variant="destructive"
                                    className="w-full"
                                    disabled={deleteTenantMutation.isPending}
                                    >
                                        Delete
                                        {deleteTenantMutation.isPending && <Loader2 className='animate-spin ml-2' />}
                                </Button>
                            </div>
                        
                        
                        </>
                    )
                }
                
            </form>
        </DialogContent>
    )
}