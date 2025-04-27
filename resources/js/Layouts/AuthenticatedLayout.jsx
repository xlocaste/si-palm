import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link } from '@inertiajs/react';
import { Menu } from '@headlessui/react';
import {
    HomeIcon,
    DocumentTextIcon,
    ShoppingCartIcon,
    ReceiptRefundIcon,
    TruckIcon,
    ClockIcon,
    CalendarIcon,
    ChevronDownIcon,
} from '@heroicons/react/24/outline';

export default function Authenticated({ user, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className={`bg-white w-64 text-gray-800 p-4 flex flex-col space-y-6 
                ${showingSidebar ? 'block' : 'hidden'} sm:block`}>

                <div className="flex items-center justify-between sm:justify-center">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto fill-current text-green-600" />
                    </Link>
                    <button className="sm:hidden text-gray-600" onClick={() => setShowingSidebar(false)}>
                        ✖
                    </button>
                </div>

                {/* User Info at Top */}
                <div className="font-bold text-sm border-b border-gray-200 pb-2">
                    {user.name}
                </div>

                {/* Navigation */}
                <nav className="flex flex-col space-y-6 pb-8 text-sm font-semibold text-gray-700">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <HomeIcon className="h-5 w-5" />
                        Dashboard
                    </NavLink>

                    <Menu as="div" className="relative w-full">
                        <Menu.Button className="flex items-center gap-2 border-b pb-1 hover:text-green-700 transition w-full">
                            <DocumentTextIcon className="h-5 w-5" />
                            Kontrak
                            <ChevronDownIcon className="ml-auto h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className="mt-1 flex flex-col space-y-1 pl-6 text-sm font-normal text-gray-600">
                            <Menu.Item>
                                {() => (
                                    <NavLink href={route('kontrak.index')} active={route().current('kontrak.index')}>
                                        List Kontrak
                                    </NavLink>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {() => (
                                    <NavLink href={route('kontrak.create')} active={route().current('kontrak.create')}>
                                        Tambah Kontrak
                                    </NavLink>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>

                    <NavLink href={route('invoice.index')} active={route().current('invoice.index')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <ReceiptRefundIcon className="h-5 w-5" />
                        Invoice
                    </NavLink>

                    <NavLink href={route('sales-order.index')} active={route().current('sales-order.index')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <ShoppingCartIcon className="h-5 w-5" />
                        Sales Order
                    </NavLink>

                    <NavLink href={route('realisasi-penyerahan.index')} active={route().current('realisasi-penyerahan.index')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <TruckIcon className="h-5 w-5" />
                        Realisasi Penyerahan
                    </NavLink>

                    <NavLink href={route('tempo-penyerahan.index')} active={route().current('tempo-penyerahan.index')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <ClockIcon className="h-5 w-5" />
                        Tempo Penyerahan
                    </NavLink>

                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <CalendarIcon className="h-5 w-5" />
                        Jatuh Tempo
                    </NavLink>

                    <NavLink href={route('dashboard')} active={route().current('dashboard')} className="flex items-center gap-2 hover:text-green-700 transition">
                        <CalendarIcon className="h-5 w-5" />
                        Laporan
                    </NavLink>
                </nav>

                {/* Dropdown Akun di Bawah */}
                <div className="mt-auto border-t pt-4 border-gray-200">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="text-sm text-gray-600 hover:text-green-700 transition">Akun ▼</button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link method="post" href={route('logout')} as="button">
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <div className="sm:hidden bg-white border-b px-4 py-2 flex justify-between items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-8 w-auto fill-current text-gray-800" />
                    </Link>
                    <button onClick={() => setShowingSidebar(!showingSidebar)} className="text-gray-500">
                        ☰
                    </button>
                </div>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
