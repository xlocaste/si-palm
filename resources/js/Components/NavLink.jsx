import { forwardRef } from 'react';
import { Link } from '@inertiajs/react';

const NavLink = forwardRef(function NavLink({ active = false, className = '', children, ...props }, ref) {
    return (
        <Link
            ref={ref} // Penting!! Tambahkan ini
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-indigo-400 text-black focus:border-indigo-700 '
                    : 'border-transparent text-gray-500 hover:text-black hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
});

export default NavLink;
