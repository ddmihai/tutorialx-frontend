import { useState } from 'react';
import signup from '/signup.jpg';
import { axiosInstance } from '../../axiosInstance/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import Loading from '../../components/Loading/Loading';


const Signup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // handle change for email, name, password
    // Add validation to be more than 10 characters at password
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);



    // Signup functionality
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);

            // make request to backend
            const response = await axiosInstance.post('/users/create', { email, password, name });
            if (response.status === 201) {
                // redirect to login page
                alert('User created successfully. Please use these credentials to login in your account!');
                navigate('/login');
                setEmail('');
                setName('');
                setPassword('');
                setLoading(false);
                return;
            }
        }
        catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data.message);
                setEmail('');
                setName('');
                setPassword('');
                setLoading(false);
                return;
            }
            else {
                console.log(error);
                return;
            }
        }
    }



    if (loading) {
        return <Loading title='Signin in process' subtitle='Please wait while we create your account!' />;
    }


    // render 
    return (
        <main className="mt-20 lg:flex py-24 max-w-[1380px] mx-auto">
            <article className=" flex-1">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Signup for free</h2>

                    <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 p-4 md:p-8">
                            <div>
                                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                                <input name="email" minLength={8} type='email'
                                    onChange={handleChangeEmail}
                                    className="
                                    w-full
                                    rounded
                                    border
                                    bg-gray-50
                                    px-3
                                    py-2
                                    text-gray-800
                                    outline-none
                                    ring-indigo-300
                                    transition
                                    duration-100
                                    focus:ring
                                    "  required />
                            </div>

                            <div>
                                <label htmlFor="name" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Full name</label>
                                <input name="name" minLength={6} type='text'
                                    onChange={handleChangeName}
                                    className="
                                    w-full
                                    rounded
                                    border
                                    bg-gray-50
                                    px-3
                                    py-2
                                    text-gray-800
                                    outline-none
                                    ring-indigo-300
                                    transition
                                    duration-100
                                    focus:ring 
                                    " required />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
                                <input name="password" minLength={10} type='password'
                                    onChange={handleChangePassword}
                                    className="
                                    w-full
                                    rounded
                                    border
                                    bg-gray-50
                                    px-3
                                    py-2
                                    text-gray-800
                                    outline-none
                                    ring-indigo-300
                                    transition
                                    duration-100
                                    focus:ring
                                    " required />
                            </div>

                            <button className="
                                block
                                rounded-lg
                                bg-gray-800
                                px-8
                                py-3
                                text-center text-sm
                                font-semibold
                                text-white
                                outline-none
                                ring-gray-300
                                transition
                                duration-100
                                hover:bg-gray-700
                                focus-visible:ring
                                active:bg-gray-600
                                md:text-base
                            ">
                                Signup
                            </button>

                            <div className="relative flex items-center justify-center">
                                <span className="absolute inset-x-0 h-px bg-gray-300"></span>
                                <span className="relative bg-white px-4 text-sm text-gray-400">Coming soon log in with social</span></div>

                            <button disabled className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border border-gray-300
                                bg-white
                                px-8
                                py-3
                                text-center text-sm
                                font-semibold
                                text-gray-800
                                outline-none
                                ring-gray-300
                                transition
                                duration-100
                                hover:bg-gray-100
                                focus-visible:ring
                                active:bg-gray-200
                                md:text-base
                            ">
                                <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4"></path>
                                    <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853"></path>
                                    <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05"></path>
                                    <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335"></path>
                                </svg>

                                Continue with Google
                            </button>
                        </div>

                        <div className="flex items-center justify-center bg-gray-100 p-4">
                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?
                                <a href="#" className="
                                text-indigo-500
                                transition
                                duration-100
                                hover:text-indigo-600
                                active:text-indigo-700
                                ">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </article>


            <article className="flex-1 object-contain object-left py-16">
                <img src={signup} alt="Ilustration of signing up on mobile app" className='mx-auto' />
            </article>
        </main>
    )
}

export default Signup
