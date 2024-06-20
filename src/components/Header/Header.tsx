import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axiosInstance/axiosInstance'






export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [userId, setUserId] = useState<string | null>(null);



    const publicNavigation = [
        { name: 'Home', to: '/' },
        { name: 'Login', to: '/login' },
        { name: 'Signup', to: '/signup' },
        { name: 'About', to: '/about' },
    ];


    const privateNavigation = [
        { name: 'Home', to: '/' },
        { name: 'Dashboard', to: '/dashboard' },
        { name: 'About', to: '/about' }
        // You can add a Logout link or other authenticated links here
    ];


    const navigate = useNavigate();

    const handleLogout = async () => {
        // Implement logout functionality here
        let response = await axiosInstance.post('/users/logout');
        if (response.status === 200) {
            setUserId(null);
            sessionStorage.removeItem('userId');
            navigate('/');
            alert('Logged out successfully.');
        }
    };


    const location = useLocation();

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, [location.pathname]);

    return (
        <div className="bg-slate-50/95 fixed z-20 left-0 right-0 top-0">
            <header className="max-w-[1380px] mx-auto">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">TutorialX</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="hidden lg:flex lg:gap-x-12">
                        {userId ? (
                            privateNavigation.map((item) => (
                                <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
                                    {item.name}
                                </Link>
                            ))
                        ) : (
                            publicNavigation.map((item) => (
                                <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
                                    {item.name}
                                </Link>
                            ))
                        )}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button
                            onClick={() => {
                                if (userId) {
                                    handleLogout();
                                } else {
                                    navigate('/login');
                                }
                            }}
                            className="text-sm font-semibold leading-6 text-gray-900">
                            {userId ? 'Logout' : 'Login'}
                            <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </nav>
                <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">TutorialX</span>
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt=""
                                />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {userId ? (
                                        privateNavigation.map((item) => (
                                            <Link key={item.name} to={item.to} className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-green-500">
                                                {item.name}
                                            </Link>
                                        ))
                                    ) : (
                                        publicNavigation.map((item) => (
                                            <Link key={item.name} to={item.to} className="cursor-pointer -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-green-500">
                                                {item.name}
                                            </Link>
                                        ))
                                    )}
                                </div>
                                <div className="py-6">
                                    <button
                                        onClick={() => {
                                            if (userId) {
                                                handleLogout();
                                            } else {
                                                navigate('/login');
                                            }
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {userId ? 'Logout' : 'Login'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>


        </div>
    )
}
