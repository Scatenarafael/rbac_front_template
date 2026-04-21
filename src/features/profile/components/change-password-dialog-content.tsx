import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputPassword } from "@/components/input-password";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { authValidationMessages } from '@/features/auth/Auth.ValidationMessages';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '../api/auth.mutations';
import { Loader2 } from 'lucide-react';


const ChangePasswordSchema = zod.object({
    new_password: zod.string().min(1, authValidationMessages.password.required),
    re_new_password: zod.string().min(1, 'Confirm your password.'),
}).superRefine(({ new_password, re_new_password }, ctx) => {
    if (new_password !== re_new_password) {
        ctx.addIssue({
            code: "custom",
            message: 'Passwords do not match.',
            path: ["re_new_password"]
        });
    }
});

type ChangePasswordFormData = zod.infer<typeof ChangePasswordSchema>;

interface IChangePasswordDialogContentProps {
    user_id: string
}


export function ChangePasswordDialogContent({ user_id }: IChangePasswordDialogContentProps) {
    const changePasswordMutation = useChangePasswordMutation()

    const {
            formState: { errors },
            register,
            handleSubmit,
            } = useForm<ChangePasswordFormData>({
                resolver: zodResolver(ChangePasswordSchema),
                defaultValues: {
                    new_password: '',
                    re_new_password: '',
                },
            });
    
        async function onSubmit(data: ChangePasswordFormData) {
            console.log(data)
            await changePasswordMutation.mutateAsync({ user_id, ...data })
        }



    return (
        <DialogContent className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Change Password</h1>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                    <Label>Password:</Label>
                    <InputPassword {...register("new_password")} />
                    {errors.new_password && <p className="text-destructive">{errors.new_password.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Confirm Password:</Label>
                    <InputPassword {...register("re_new_password")} />
                    {errors.re_new_password && <p className="text-destructive">{errors.re_new_password.message}</p>}
                </div>

                <Button disabled={changePasswordMutation.isPending} className="w-full">Save {changePasswordMutation.isPending && <Loader2 className='animate-spin' /> }</Button>
            </form>
        </DialogContent>
    )
}
