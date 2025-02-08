import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const formSchema = z.object({
  name: z
    .string({ message: "Name must be a string" })
    .min(5, { message: "Min length 5 chars" })
    .max(100, { message: "Max length 100 chars" }),
  email: z
    .string({ message: "Email must be a string" })
    .min(5, { message: "Min length 5 chars" })
    .max(100, { message: "Max length 100 chars" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password must be a string" })
    .min(8, { message: "Min length 8 chars" })
    .max(100, { message: "Max length 100 chars" }),
});

export function Signup() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({ title: "Signup successful" });
  };

  return (
    <div className="min-h-dvh">
      <Card className="mx-auto mt-10 max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Enter your name, email and password to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full cursor-pointer">
                SIGNUP
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-sm">
          <p className="text-muted-foreground">Already have an account?</p>
          <Link to="/login" className="mt-3 hover:underline">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
