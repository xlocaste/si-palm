import React, { useState, useEffect } from "react";

export default function AlertMessage({
    title,
    message,
    variant = "error", // 'error', 'success', 'warning', 'info'
    dismissible = true,
    timeout = 5000, // waktu tampil dalam milidetik, nilai 0 berarti tidak otomatis hilang
    className = "",
    ...props
}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (timeout > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout]);

    const handleDismiss = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const variantClasses = {
        error: "bg-red-100 border-red-400 text-red-700",
        success: "bg-green-100 border-green-400 text-green-700",
        warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
        info: "bg-blue-100 border-blue-400 text-blue-700",
    };

    const variantIcons = {
        error: (
            <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
        success: (
            <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
        warning: (
            <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
        info: (
            <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                    clipRule="evenodd"
                ></path>
            </svg>
        ),
    };

    return (
        <div
            {...props}
            className={`border px-4 py-3 rounded relative flex items-center ${variantClasses[variant]} ${className}`}
            role="alert"
        >
            <div className="flex items-center">
                {variantIcons[variant]}
                {title && <span className="font-bold mr-2">{title}</span>}
                <span>{message}</span>
            </div>

            {dismissible && (
                <button
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    onClick={handleDismiss}
                >
                    <svg
                        className="fill-current h-6 w-6"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Tutup</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </button>
            )}
        </div>
    );
}

// Komponen khusus untuk menampilkan error validasi dari Inertia
export function ValidationErrors({ errors, className = "" }) {
    if (Object.keys(errors).length === 0) return null;

    return (
        <AlertMessage
            title="Validasi Gagal"
            message={
                <ul className="list-disc ml-5">
                    {Object.entries(errors).map(([field, messages]) => (
                        <li key={field}>{messages}</li>
                    ))}
                </ul>
            }
            variant="error"
            className={className}
        />
    );
}
