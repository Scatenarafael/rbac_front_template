import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { authValidationMessages } from "../Auth.ValidationMessages";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../api/auth.mutations";
import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormErrorMessage } from '@/components/form-input-error';
import { InputPassword } from '@/components/input-password';
import { Button } from '@/components/ui/button';


const SignInSchema = zod.object({
  email: zod.email(authValidationMessages.email.invalid).min(1, authValidationMessages.email.required),
  password: zod.string().min(1, authValidationMessages.password.required),
});


type signInFormData = zod.infer<typeof SignInSchema>;


export function SignInContentPage() {

    const signInMutation = useSignInMutation()


    const {
        formState: { errors },
        register,
        handleSubmit,
        } = useForm<signInFormData>({
            resolver: zodResolver(SignInSchema),
            defaultValues: {
            email: '',
            password: '',
            },
        });


    function onSubmit(data: signInFormData) {
        console.log(data);
        signInMutation.mutateAsync(data)
    }

    console.log(errors)
    
    return (
        <div className="h-full flex-1 flex justify-center items-center bg-background">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 border-2 shadow-lg p-10 rounded-lg">
                <h1 className="text-2xl text-center italic font-bold">TEMPLATE</h1>

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
                <div className="flex flex-col gap-4 justify-center items-center">
                    <Button disabled={signInMutation.isPending} className="w-full">Entrar {signInMutation.isPending && <Loader2 className="animate-spin" />}</Button>
                    <Link to="/sign-up" className="text-sm text-primary underline">
                        Não tem uma conta? Registre-se
                    </Link>
                </div>
            </form>
        </div>
    )
}