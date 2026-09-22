import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedContent } from "../i18n/localize";
import type { DonationRecord } from "../types";
import {
  buildPaymentUrl,
  getConfiguredMethods,
  type PaymentMethodId,
} from "../utils/payments";

const METHOD_LABEL: Record<PaymentMethodId, string> = {
  paypal: "donate.methodPaypal",
  venmo: "donate.methodVenmo",
  cashapp: "donate.methodCashApp",
  zelle: "donate.methodZelle",
};

const Donate = () => {
  const { t, locale } = useLanguage();
  const { donationSettings, saveDonation } = useLocalizedContent();
  const amounts = donationSettings.amounts?.length
    ? donationSettings.amounts
    : [10, 25, 50, 100];
  const methods = useMemo(
    () => getConfiguredMethods(donationSettings),
    [donationSettings]
  );
  const [selected, setSelected] = useState(amounts[1] || amounts[0]);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<PaymentMethodId | "recorded">("recorded");
  const [error, setError] = useState<"amount" | "method" | "">("");
  const [receipt, setReceipt] = useState<DonationRecord | null>(null);

  useEffect(() => {
    setMethod(methods[0] || "recorded");
  }, [methods]);

  const formatMoney = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
    }).format(value);

  const amount = useMemo(() => {
    if (custom !== "") {
      const value = Number(custom);
      return Number.isFinite(value) ? value : 0;
    }
    return Number(selected) || 0;
  }, [custom, selected]);

  const handleDonate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(amount > 0)) {
      setError("amount");
      return;
    }
    if (methods.length > 0 && method === "recorded") {
      setError("method");
      return;
    }
    setError("");
    const payUrl =
      method === "recorded" ? "" : buildPaymentUrl(method, donationSettings, amount);
    const record = saveDonation({
      amount,
      name,
      email,
      message,
      method,
    });
    if (payUrl) {
      window.open(payUrl, "_blank", "noopener,noreferrer");
    }
    if (method === "zelle" && donationSettings.zelleHandle && navigator.clipboard) {
      navigator.clipboard.writeText(donationSettings.zelleHandle).catch(() => undefined);
    }
    setReceipt(record);
  };

  if (receipt) {
    const displayName =
      receipt.name === "Anonymous" ? t("donate.anonymous") : receipt.name;
    const thanksNote =
      receipt.method === "zelle"
        ? t("donate.thanksZelle", { handle: donationSettings.zelleHandle })
        : receipt.method === "recorded"
          ? t("donate.thanksRecorded")
          : t("donate.thanksPaypal");
    return (
      <div className="page narrow">
        <header className="page-hero">
          <p className="kicker">{t("donate.thanksKicker")}</p>
          <h1>{t("donate.thanksTitle")}</h1>
          <p className="lede">
            {formatMoney(receipt.amount)}
            {thanksNote}
          </p>
        </header>
        <div className="panel">
          <p>
            <strong>{displayName}</strong>
            {receipt.message ? ` · ${receipt.message}` : ""}
          </p>
          <div className="form-actions">
            <Link className="btn" to="/">
              {t("donate.returnHome")}
            </Link>
            <button type="button" className="btn ghost" onClick={() => setReceipt(null)}>
              {t("donate.giveAgain")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page narrow">
      <header className="page-hero">
        <p className="kicker">{t("donate.kicker")}</p>
        <h1>{donationSettings.headline}</h1>
        <p className="lede">{donationSettings.blurb}</p>
      </header>
      <form className="panel form donate-form" onSubmit={handleDonate}>
        <fieldset className="amount-set">
          <legend>{t("donate.chooseAmount")}</legend>
          <div className="amount-grid">
            {amounts.map((value) => (
              <button
                key={value}
                type="button"
                className={custom === "" && selected === value ? "amount active" : "amount"}
                onClick={() => {
                  setSelected(value);
                  setCustom("");
                }}
              >
                {formatMoney(value)}
              </button>
            ))}
          </div>
          <label>
            {t("donate.otherAmount")}
            <input
              type="number"
              min={1}
              step={1}
              inputMode="decimal"
              placeholder="USD"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
          </label>
        </fieldset>
        {methods.length > 0 && (
          <fieldset className="amount-set">
            <legend>{t("donate.chooseMethod")}</legend>
            <div className="amount-grid method-grid">
              {methods.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={method === id ? "amount active" : "amount"}
                  onClick={() => setMethod(id)}
                >
                  {t(METHOD_LABEL[id])}
                </button>
              ))}
            </div>
            {method === "zelle" && donationSettings.zelleHandle && (
              <p className="hint">
                {t("donate.hintZelle", { handle: donationSettings.zelleHandle })}
              </p>
            )}
          </fieldset>
        )}
        <label>
          {t("donate.name")} <span className="optional">{t("donate.optional")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </label>
        <label>
          {t("donate.email")} <span className="optional">{t("donate.optional")}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          {t("donate.note")} <span className="optional">{t("donate.optional")}</span>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("donate.notePlaceholder")}
          />
        </label>
        {error === "amount" && <p className="form-error">{t("donate.errorAmount")}</p>}
        {error === "method" && <p className="form-error">{t("donate.errorMethod")}</p>}
        <button className="btn donate-btn" type="submit">
          {amount > 0
            ? t("donate.submitAmount", { amount: formatMoney(amount) })
            : t("donate.submit")}
        </button>
        <p className="hint">
          {methods.length > 0 ? t("donate.hintPaypal") : t("donate.hintRecorded")}
        </p>
      </form>
    </div>
  );
};

export default Donate;
