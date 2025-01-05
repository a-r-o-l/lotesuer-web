"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/server/loginAction";
import { createAccount } from "@/server/accountAction";
import { User } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "El nombre de usuario debe tener al menos 4 caracteres.",
  }),
  password: z.string().min(4, {
    message: "La contraseña debe tener al menos 4 caracteres.",
  }),
});

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await login(values.username, values.password);
    if (response.success) {
      toast.success(`Bienvenido ${values.username}`);
      router.push("/dashboard");
    } else {
      toast.error(response.message);
    }
  }

  async function onCreateAccount() {
    const formData = new FormData();
    formData.append("imageUrl", "");
    formData.append("username", "alonsoarol");
    formData.append("password", "123456");
    formData.append("role", "admin");
    const res = await createAccount(formData);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <Form {...form}>
      <div className="absolute top-0 left-0">
        <Button
          onClick={onCreateAccount}
          variant="ghost"
          className="w-1 h-1 rounded-full text-white dark:text-black"
          size="icon"
        >
          <User size={2} />
        </Button>
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 min-w-60"
      >
        <div className="flex flex-col justify-center text-center rounded-full border-4 p-3 border-red-600 mb-20">
          <p className="text-red-600 font-black text-2xl">LOTESUER.</p>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el nombre de usuario"
                  {...field}
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese la contraseña"
                  {...field}
                  autoComplete="off"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Iniciar sesion
        </Button>
      </form>
    </Form>
  );
}
