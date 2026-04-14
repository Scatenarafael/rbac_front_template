import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authValidationMessages } from "../Auth.ValidationMessages";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../api/auth.mutations";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormErrorMessage } from '@/components/form-input-error';
import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';



const SignUpSchema = zod.object({
    first_name: zod.string().min(1, authValidationMessages.first_name.required),
    last_name: zod.string().min(1, authValidationMessages.last_name.required),
    email: zod.email(authValidationMessages.email.invalid).min(1, authValidationMessages.email.required),
    password: zod.string().min(1, authValidationMessages.password.required),
    re_password: zod.string().min(1, 'Confirme a senha.'),
    active: zod.boolean().default(true).optional()
}).superRefine(({ password, re_password }, ctx) => {
    if (password !== re_password) {
        ctx.addIssue({
            code: "custom",
            message: 'As senhas não coincidem.',
            path: ["password"]
        });
    }
});

type signUpFormData = zod.infer<typeof SignUpSchema>;


export function SignUpContentPage() {
    const signUpMutation = useSignUpMutation()

    const {
        formState: { errors },
        register,
        handleSubmit,
        } = useForm<signUpFormData>({
            resolver: zodResolver(SignUpSchema),
            defaultValues: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                active: true,
            },
        });


    function onSubmit(data: signUpFormData) {
        const newData = {
            ...data,
            active: true
        }
        signUpMutation.mutateAsync(newData)
    }

    console.log(errors)
    
    return (
        <div className="h-full flex-1 flex justify-center items-center bg-background">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border-2 shadow-lg p-10 rounded-lg">
                <h1 className="text-2xl text-center italic font-bold">TEMPLATE</h1>

                <div className="space-y-4 w-96">
                    <Label htmlFor="first_name">Nome</Label>
                    <div className="space-y-1">
                        <Input id="first_name" type="text" placeholder="Digite seu nome" {...register("first_name")} />
                        {errors.first_name && <FormErrorMessage error={errors.first_name} />}
                    </div>
                </div>

                <div className="space-y-4 w-96">
                    <Label htmlFor="last_name">Sobrenome</Label>
                    <div className="space-y-1">
                        <Input id="last_name" type="text" placeholder="Digite seu sobrenome" {...register("last_name")} />
                        {errors.last_name && <FormErrorMessage error={errors.last_name} />}
                    </div>
                </div>
                
                <div className="space-y-4 w-96">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="space-y-1">
                        <Input id="email" type="email" placeholder="Digite seu e-mail" {...register("email")} />
                        {errors.email && <FormErrorMessage error={errors.email} />}
                    </div>
                </div>
                
                <div className="space-y-4 w-96">
                    <Label htmlFor="password">Senha</Label>
                    <div className="space-y-1">
                        <InputPassword id="password" placeholder="Digite sua senha" {...register("password")} />
                        {errors.password && <FormErrorMessage error={errors.password} />}
                    </div>
                </div>
                
                <div className="space-y-4 w-96">
                    <Label htmlFor="re_password">Confirmação</Label>
                    <div className="space-y-1">
                        <InputPassword id="re_password" placeholder="Confirme sua senha" {...register("re_password")} />
                        {errors.re_password && <FormErrorMessage error={errors.re_password} />}
                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <Button disabled={signUpMutation.isPending} className="w-full">Registrar {signUpMutation.isPending && <Loader2 className="animate-spin" />}</Button>
                    <Link to="/sign-in" className="text-sm text-primary underline">
                        Já tem uma conta? Entre
                    </Link>
                </div>
            </form>
        </div>
    )
}