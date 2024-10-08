import * as authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import useStore from "../store/store";

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

function SigninForm() {
  const navigate = useNavigate();
  const updateUser = useStore((state) => state.updateUser);
  const user = useStore((state) => state.user);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof signinSchema>, e: any) {
    e.preventDefault();
    try {
      const signedInUser = await authService.signin(values);
      updateUser(signedInUser);
      console.log(user);
      navigate("/dashboard");
    } catch (err: unknown) {
      console.log(err);
    }
  }

  return (
    <main className="ml-[17rem]">
      <h1>Log In</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </main>
  );
}

export default SigninForm;
