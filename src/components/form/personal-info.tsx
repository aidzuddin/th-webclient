import ProductSummary from '../ui/application/ProductSummary';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';



export default function PersonalInfoForm() {
    const [form, setForm] = useState({
        fullName: '',
        nric: '',
        email: '',
        otp: ''
    });


    const mutation = useMutation({
        mutationFn: async (data: typeof form) => {
            // Dummy URL
            const res = await fetch('https://dummy-backend.com/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Failed to submit');
            return res.json();
        }
    });

    // NRIC validation mutation
    const nricValidation = useMutation({
        mutationFn: async (nric: string) => {
            // Dummy NRIC validation endpoint
            const res = await fetch('https://dummy-backend.com/api/validate-nric', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nric })
            });
            if (!res.ok) throw new Error('NRIC not valid');
            return res.json();
        }
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNricBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const nric = e.target.value.trim();
        if (nric) {
            nricValidation.mutate(nric);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-6xl grid grid-cols-12 gap-8 items-start">
                <div className="col-span-1" />
                <div className="col-span-5 flex justify-center">
                    <form className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg grid grid-cols-2 gap-6 border border-gray-200" onSubmit={handleSubmit} autoComplete="off">
                        <div className="col-span-2 mb-2">
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">Personal Information</h2>
                            <p className="text-gray-500 text-sm">Please fill in your details below.</p>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <Input type="text" id="full-name" name="fullName" placeholder="e.g. John Doe" className="mt-1 block w-full" value={form.fullName} onChange={handleChange} required />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="nric" className="block text-sm font-medium text-gray-700 mb-1">NRIC</label>
                            <Input
                                type="text"
                                id="nric"
                                name="nric"
                                placeholder="e.g. 900101-01-1234"
                                className="mt-1 block w-full"
                                value={form.nric}
                                onChange={handleChange}
                                onBlur={handleNricBlur}
                                required
                            />
                            <span className="text-xs text-gray-400">Without dashes or spaces</span>
                            {nricValidation.isLoading && (
                                <span className="block text-xs text-blue-500 mt-1">Validating NRIC...</span>
                            )}
                            {nricValidation.isError && (
                                <span className="block text-xs text-red-500 mt-1">{(nricValidation.error as Error).message}</span>
                            )}
                            {nricValidation.isSuccess && (
                                <span className="block text-xs text-green-600 mt-1">NRIC is valid!</span>
                            )}
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <Input type="email" id="email" name="email" placeholder="e.g. john@email.com" className="mt-1 block w-full" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                            <Input type="text" id="otp" name="otp" placeholder="Enter OTP" className="mt-1 block w-full tracking-widest text-lg" value={form.otp} onChange={handleChange} required />
                            <span className="text-xs text-gray-400">Check your email for the OTP code</span>
                        </div>
                        <div className="col-span-2 flex justify-end mt-2">
                            <Button type="submit" variant="default" className="px-8 py-2 text-base font-semibold" disabled={mutation.isLoading}>
                                {mutation.isLoading ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                        {mutation.isError && (
                            <div className="col-span-2 text-red-500 text-sm text-center mt-2">{(mutation.error as Error).message}</div>
                        )}
                        {mutation.isSuccess && (
                            <div className="col-span-2 text-green-600 text-sm text-center mt-2">Submitted successfully!</div>
                        )}
                    </form>
                </div>
                <div className="col-span-5 flex justify-center">
                    <ProductSummary />
                </div>
                <div className="col-span-1" />
            </div>
        </div>
    )
}