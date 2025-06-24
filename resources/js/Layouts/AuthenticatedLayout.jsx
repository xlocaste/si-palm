import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
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
import { FaCog } from 'react-icons/fa';

export default function Authenticated({ user, header, children }) {
    const [showingSidebar, setShowingSidebar] = useState(false);

    return (
        <div className="h-screen bg-gray-100 flex">
            <div className={`fixed h-screen bg-gradient-to-t from-green-800 via-green-200 to-white w-64 border-r p-4 flex flex-col space-y-6 ${showingSidebar ? 'block' : 'hidden'} sm:block`}>
                <div className="flex items-center justify-between sm:justify-center">
                    <Link href="/">
                        <ApplicationLogo className="h-10 w-auto text-green-600" />
                    </Link>
                    <button className="sm:hidden text-gray-600" onClick={() => setShowingSidebar(false)}>
                        ✖
                    </button>
                </div>

                <div className="font-bold text-sm border-b border-gray-200 pb-2">
                    {user.name}
                </div>

                <nav className="flex flex-col space-y-4 text-sm font-medium">
                    <Link href={route('dashboard')} className="flex items-center gap-2">
                        <HomeIcon className="h-5 w-5" /> Dashboard
                    </Link>

                    <Menu as="div" className="relative w-full">
                        <Menu.Button className="flex items-center gap-2 border-b pb-1 w-full">
                            <DocumentTextIcon className="h-5 w-5" /> Kontrak
                            <ChevronDownIcon className="ml-auto h-4 w-4" />
                        </Menu.Button>
                        <Menu.Items className="mt-1 flex flex-col pl-6 text-sm text-gray-600">
                            <Menu.Item>
                                {() => <Link href={route('kontrak.index')}>List Kontrak</Link>}
                            </Menu.Item>
                            {user?.roles?.some(role => role.name === 'admin') && (
                                <Menu.Item>
                                    {() => <Link href={route('kontrak.create')}>Tambah Kontrak</Link>}
                                </Menu.Item>
                            )}
                            <Menu.Item>
                                {() => <Link href={route('pembayaran.index')}>Pembayaran</Link>}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>

                    <Link href={route('invoice.index')} className="flex items-center gap-2">
                        <ReceiptRefundIcon className="h-5 w-5" /> Invoice
                    </Link>

                    <Link href={route('sales-order.index')} className="flex items-center gap-2">
                        <ShoppingCartIcon className="h-5 w-5" /> Sales Order
                    </Link>

                    <Link href={route('realisasi-penyerahan.index')} className="flex items-center gap-2">
                        <TruckIcon className="h-5 w-5" /> Realisasi Penyerahan
                    </Link>

                    <Link href={route('tempo-penyerahan.index')} className="flex items-center gap-2">
                        <ClockIcon className="h-5 w-5" /> Tempo Penyerahan
                    </Link>

                    <Link href={route('jatuh-tempo.index')} className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" /> Jatuh Tempo
                    </Link>

                    <Link href={route('laporan.index')} className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" /> Laporan
                    </Link>

                    <Link href={route('ttd.index')} className="flex items-center gap-2">
                        <FaCog className="h-5 w-5" /> Pengaturan TTD
                    </Link>
                </nav>

                <div className="mt-auto border-t pt-4">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="text-sm text-black">Akun ▼</button>
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

            <div className="flex-1 flex flex-col">
                <div className="sm:hidden bg-white border-b px-4 py-2 flex justify-between items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-8 w-auto text-gray-800" />
                    </Link>
                    <button onClick={() => setShowingSidebar(!showingSidebar)} className="text-gray-500">
                        ☰
                    </button>
                </div>

                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ml-60">{header}</div>
                    </header>
                )}

                <main className="ml-64">{children}</main>
            </div>
        </div>
    );
}
