// import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
// import { login } from '@/routes';
// import { Form, Head } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';

// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// export default function Register() {
//     return (
//         <AuthLayout
//             title="Create an account"
//             description="Enter your details below to create your account"
//         >
//             <Head title="Register" />
//             <Form
//                 {...RegisteredUserController.store.form()}
//                 resetOnSuccess={['password', 'password_confirmation']}
//                 disableWhileProcessing
//                 className="flex flex-col gap-6"
//             >
//                 {({ processing, errors }) => (
//                     <>
//                         <div className="grid gap-6">
//                             <div className="grid gap-2">
//                                 <Label htmlFor="name">Name</Label>
//                                 <Input
//                                     id="name"
//                                     type="text"
//                                     required
//                                     autoFocus
//                                     tabIndex={1}
//                                     autoComplete="name"
//                                     name="name"
//                                     placeholder="Full name"
//                                 />
//                                 <InputError
//                                     message={errors.name}
//                                     className="mt-2"
//                                 />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label htmlFor="email">Email address</Label>
//                                 <Input
//                                     id="email"
//                                     type="email"
//                                     required
//                                     tabIndex={2}
//                                     autoComplete="email"
//                                     name="email"
//                                     placeholder="email@example.com"
//                                 />
//                                 <InputError message={errors.email} />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label htmlFor="password">Password</Label>
//                                 <Input
//                                     id="password"
//                                     type="password"
//                                     required
//                                     tabIndex={3}
//                                     autoComplete="new-password"
//                                     name="password"
//                                     placeholder="Password"
//                                 />
//                                 <InputError message={errors.password} />
//                             </div>

//                             <div className="grid gap-2">
//                                 <Label htmlFor="password_confirmation">
//                                     Confirm password
//                                 </Label>
//                                 <Input
//                                     id="password_confirmation"
//                                     type="password"
//                                     required
//                                     tabIndex={4}
//                                     autoComplete="new-password"
//                                     name="password_confirmation"
//                                     placeholder="Confirm password"
//                                 />
//                                 <InputError
//                                     message={errors.password_confirmation}
//                                 />
//                             </div>

//                             <Button
//                                 type="submit"
//                                 className="mt-2 w-full"
//                                 tabIndex={5}
//                                 data-test="register-user-button"
//                             >
//                                 {processing && (
//                                     <LoaderCircle className="h-4 w-4 animate-spin" />
//                                 )}
//                                 Create account
//                             </Button>
//                         </div>

//                         <div className="text-center text-sm text-muted-foreground">
//                             Already have an account?{' '}
//                             <TextLink href={login()} tabIndex={6}>
//                                 Log in
//                             </TextLink>
//                         </div>
//                     </>
//                 )}
//             </Form>
//         </AuthLayout>
//     );
// }

import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    return (
        <>
            <Head title="Register" />

            <div
                className="absolute inset-0 h-[120%]"
                style={{
                    backgroundImage: "url('/register.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            <div className="flex min-h-screen items-center justify-center p-4">
                {/* form container with larger background image */}
                <div className="relative w-full max-w-xl overflow-hidden">
                    {/* background image taller */}

                    {/* fully transparent form */}
                    <div className="relative z-10 mx-auto my-10 flex w-80 flex-col gap-3 rounded-xl bg-transparent p-5">
                        <h2 className="mb-1 text-2xl font-bold text-gray-900">
                            Create an account
                        </h2>
                        <p className="mb-3 text-sm text-gray-700">
                            Enter your details below to create your account
                        </p>

                        <Form
                            {...RegisteredUserController.store.form()}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                            disableWhileProcessing
                            className="flex flex-col gap-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <div className="grid gap-1">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Full name"
                                                className="bg-white/30 text-sm"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-1 text-xs"
                                            />
                                        </div>

                                        <div className="grid gap-1">
                                            <Label htmlFor="email">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="email@example.com"
                                                className="bg-white/30 text-sm"
                                            />
                                            <InputError
                                                message={errors.email}
                                                className="text-xs"
                                            />
                                        </div>

                                        <div className="grid gap-1">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Password"
                                                className="bg-white/30 text-sm"
                                            />
                                            <InputError
                                                message={errors.password}
                                                className="text-xs"
                                            />
                                        </div>

                                        <div className="grid gap-1">
                                            <Label htmlFor="password_confirmation">
                                                Confirm password
                                            </Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                required
                                                tabIndex={4}
                                                autoComplete="new-password"
                                                name="password_confirmation"
                                                placeholder="Confirm password"
                                                className="bg-white/30 text-sm"
                                            />
                                            <InputError
                                                message={
                                                    errors.password_confirmation
                                                }
                                                className="text-xs"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-2 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-sm text-white transition-all hover:from-purple-600 hover:to-indigo-600"
                                            tabIndex={5}
                                            data-test="register-user-button"
                                        >
                                            {processing && (
                                                <LoaderCircle className="mr-2 inline-block h-4 w-4 animate-spin" />
                                            )}
                                            Create account
                                        </Button>
                                    </div>

                                    <div className="mt-2 text-center text-xs text-gray-700">
                                        Already have an account?{' '}
                                        <TextLink href={login()} tabIndex={6}>
                                            Log in
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
