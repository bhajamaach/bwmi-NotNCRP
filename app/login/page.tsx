"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { useLocale } from "@/components/LocaleProvider";
import { useMockData } from "@/components/MockDataProvider";
import { FieldError, PageSection, buttonPrimaryClass } from "@/components/ui";
import { findDemoUserByMobile, isValidDemoMobile, isValidOtp } from "@/lib/mock-auth";

export default function LoginPage() {
  const router = useRouter();
  const { demoUsers, loginAs } = useMockData();
  const { t } = useLocale();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mobile && demoUsers[0]) setMobile(demoUsers[0].mobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoUsers]);

  return (
    <PageSection>
      <div className="animate-reveal mx-auto max-w-xl border-2 border-line-bold rounded-card bg-white p-6">
        <h1 className="text-3xl font-bold text-ink">{t("Login")}</h1>
        <p className="mt-2 text-ink-muted">{t("Use one of the sample numbers below and any six-digit code, such as 123456.")}</p>
        <div className="mt-5 border border-line rounded-control bg-bg-subtle p-4 text-sm text-ink-muted">
          <p className="font-semibold text-ink">{t("Sample accounts")}</p>
          {demoUsers.map((user) => (
            <button className="focus-ring mt-2 block rounded-control px-2 py-1 text-left transition-colors duration-150 hover:bg-white active:scale-[0.99]" key={user.id} onClick={() => setMobile(user.mobile)} type="button">
              {user.name}: <span className="font-mono">{user.mobile}</span>
            </button>
          ))}
        </div>
        <form
          className="mt-6 grid gap-5"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            if (step === "mobile") {
              if (!isValidDemoMobile(demoUsers, mobile)) {
                setError(t("Enter one of the sample mobile numbers above."));
                return;
              }
              setStep("otp");
              return;
            }
            if (!isValidOtp(otp)) {
              setError(t("Enter any six-digit code."));
              return;
            }
            const user = findDemoUserByMobile(demoUsers, mobile);
            if (user) loginAs(user.id);
            router.push("/track");
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-ink" htmlFor="mobile">{t("Mobile number")}</label>
            <input
              className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 font-mono"
              id="mobile"
              inputMode="numeric"
              onChange={(event) => setMobile(event.target.value)}
              value={mobile}
            />
          </div>
          {step === "otp" ? (
            <div className="animate-reveal">
              <label className="block text-sm font-semibold text-ink" htmlFor="otp">{t("OTP")}</label>
              <input
                className="focus-ring mt-2 w-full rounded-input border border-line bg-white px-3 py-3 font-mono"
                id="otp"
                inputMode="numeric"
                onChange={(event) => setOtp(event.target.value)}
                placeholder="123456"
                value={otp}
              />
            </div>
          ) : null}
          <FieldError id="login-error">{error}</FieldError>
          <button className={buttonPrimaryClass} type="submit">
            {step === "mobile" ? t("Send code") : t("Login")}
          </button>
        </form>
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-sm font-semibold text-ink">{t("Or skip the code entirely")}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {t("Aadhaar e-KYC authenticates instantly instead of waiting on an OTP. No Aadhaar data is collected or stored anywhere here.")}
          </p>
          <button
            className="focus-ring mt-3 inline-flex items-center gap-2 rounded-control border border-line px-4 py-2 font-semibold text-navy hover:bg-bg-subtle"
            onClick={() => {
              const user = findDemoUserByMobile(demoUsers, mobile) ?? demoUsers[0];
              if (user) loginAs(user.id);
              router.push("/track");
            }}
            type="button"
          >
            <Icon className="h-4 w-4" name="id" />
            {t("Continue with Aadhaar e-KYC")}
          </button>
        </div>
      </div>
    </PageSection>
  );
}
