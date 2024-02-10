import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


import { z } from "zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"
import { userCreateUserAccountMutation, userSignInAccount } from "@/lib/react-query/queriesAndMutations"
const signupSchema = z.object({
    name: z.string({ required_error: "Name is required", }).min(2, {
        message: "Name must be at least 2 characters.",
    }),
    username: z.string({ required_error: "username is required", }).min(5, {
        message: "Email must be at least 5 characters.",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string({ required_error: "password is required", }).min(2, {
        message: "Password must be at least 2 characters.",
    }),
})
const SignupForm = () => {
    const { toast } = useToast()
    const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = userCreateUserAccountMutation();
    const { mutateAsync: signInAccount, isLoading: isSigningIn } = userSignInAccount();
    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof signupSchema>) {
        const newUser = await createUserAccount(values);
        console.log(newUser);
        if (!newUser) {
            return (toast({
                title: "Sign up failed. Please try again.",
            }))


        } const session = await signInAccount({
            email: values.email,
            password: values.password
        })
        if (!session) {
            return (toast({
                title: "Sign in failed. Please try again.",
            }))
        }

        return (
            <Form {...form}>
                <div className="flex flex-col m-auto flex-center  sm:w-420">
                    <img src="/src/assets/images/logo.svg" alt="logo" />
                    <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                        Create a new account
                    </h2>
                    <p className="text-light-3 small-medium md:base-regular mt-2">
                        To use Snapgram please enter your details
                    </p>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" className="shad-input" {...field} />
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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" className="shad-input" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="shad-button_primary" type="submit">Submit</Button>

                        <p className="text-small-regular text-light-2 text-center">
                            Already have an account?
                            <Link to={"/sign-in"} className="text-primary-500 text-small-semibold ml-1">
                                Log in
                            </Link>
                        </p>
                    </form>
                </div>

            </Form>
        )
    }

    export default SignupForm