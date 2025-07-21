import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth }) {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        router.post(route("pembayaran.store"), formData, {
            forceFormData: true,
            onSuccess: () => {
                console.log("File berhasil diunggah");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Upload File Pembayaran</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1 font-semibold">Upload File</label>
                            <input
                                type="file"
                                name="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="flex justify-end">
                            <PrimaryButton type="submit">Simpan</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
