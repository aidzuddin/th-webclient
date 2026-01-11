"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ApplicationsJourneyStepper from "@/components/ApplicationsJourneyStepper";
import ApplicationsProductSummary from "@/components/ApplicationsProductSummary";
import { useApplication } from "@/hooks/useApplication";
import { usePersonalInfo } from "@/hooks/usePersonalInfo";
import type { ITempInfo } from "@/utils/type";

export default function PersonalInfoPage() {
    const searchParams = useSearchParams();

    const tempId = searchParams.get("temporary_id") ?? "";
    const hash = searchParams.get("hash") ?? "";

    const { data: tempInfo, status } = useApplication({
        tempId,
        hash,
    });

    const {
        isLoading,
        onNricChange,
        onSmsRequest,
        onEmailRequest,
        onValidateCode,
        onSubmit,
        smsRequestCounter,
        emailRequestCounter,
        isVerificationValid,
        verificationMethod,
        onEmailChange,
        errors,
        form,
    } = usePersonalInfo({
        tempId,
        hash,
        tempInfo: tempInfo as ITempInfo,
    });

    return (
        <div className="flex flex-col lg:flex-row gap-4 w-full my-16">
            {/* Loading */}
            {status === "pending" && (
                <div className="flex w-full justify-center">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>
            )}

            {/* Success */}
            {status === "success" && (
                <>
                    <div className="flex-2">
                        <ApplicationsJourneyStepper step={1} />
                    </div>

                    <div className="flex-1 flex flex-col xl:flex-row gap-4 items-end xl:items-start">
                        <div className="flex-1">
                            <h1 className="text-xl font-bold text-gray-700">
                                Personal Information
                            </h1>

                            <form onSubmit={onSubmit}>
                                {/* NAME */}
                                <InputField
                                    label="Name as per NRIC"
                                    name="name"
                                    placeholder="Ahmad Bin Ali"
                                    required
                                />

                                {/* NRIC */}
                                <InputField
                                    label="NRIC"
                                    name="nric"
                                    placeholder="Enter your NRIC without dash (-)"
                                    minLength={12}
                                    maxLength={12}
                                    onChange={onNricChange}
                                    error={errors.nric}
                                />

                                {/* MOBILE + SMS */}
                                <div className="flex flex-col lg:flex-row gap-4">
                                    <div className="lg:w-4/6">
                                        <InputField
                                            label="Mobile"
                                            name="mobile"
                                            placeholder="0112134567"
                                        />

                                        {verificationMethod === "sms" && (
                                            <>
                                                <button
                                                    type="button"
                                                    disabled={smsRequestCounter > 0}
                                                    onClick={onSmsRequest}
                                                    className="btn-secondary"
                                                >
                                                    {smsRequestCounter > 0 ? "Wait" : "Request"}
                                                </button>

                                                {smsRequestCounter > 0 && (
                                                    <p className="text-sm text-destructive">
                                                        Retry after {smsRequestCounter}s
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    {/* EMAIL */}
                                    <div className="lg:w-4/6">
                                        <InputField
                                            label="Email"
                                            name="email"
                                            placeholder="you@example.com"
                                            onChange={onEmailChange}
                                            error={errors.email}
                                        />

                                        {verificationMethod === "email" && (
                                            <button
                                                type="button"
                                                disabled={emailRequestCounter > 0}
                                                onClick={onEmailRequest}
                                                className="btn-secondary"
                                            >
                                                {emailRequestCounter > 0 ? "Wait" : "Request"}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* OTP */}
                                <InputField
                                    label={`${verificationMethod === "sms" ? "SMS" : "Email"} confirmation code`}
                                    name="confirmationCode"
                                    disabled={isVerificationValid}
                                    onChange={onValidateCode}
                                    error={errors.confirmationCode}
                                />

                                {isVerificationValid && (
                                    <p className="text-primary text-xs">
                                        {verificationMethod.toUpperCase()} confirmed
                                    </p>
                                )}

                                {/* EMERGENCY CONTACT */}
                                <h1 className="text-xl font-bold text-gray-700 mt-10">
                                    Emergency Contact Information
                                </h1>

                                <InputField
                                    label="Emergency Contact Name"
                                    name="emergencyContactName"
                                />

                                <InputField
                                    label="Emergency Contact Number"
                                    name="emergencyContactMobile"
                                    error={errors.emergencyContactMobile}
                                />

                                {/* REFERRAL */}
                                {(tempInfo?.program_type === "OFFLINE" ||
                                    tempInfo?.program_code === "DLCCA2") && (
                                        <InputField
                                            label="Referral Code"
                                            name="referer_code"
                                            placeholder="For internal company use only"
                                        />
                                    )}

                                {/* SUBMIT */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-4 flex gap-4 items-center"
                                >
                                    Next
                                    {!isLoading ? (
                                        <ArrowRight className="w-4" />
                                    ) : (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                </button>
                            </form>
                        </div>

                        {tempInfo && (
                            <div className="flex-2">
                                <ApplicationsProductSummary device={tempInfo.device} />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
