const { useState, useEffect, useMemo } = React;
const LOGO_URL = "https://storage.googleapis.com/files_webpage/Price%20model/narrow.png";
const COUNTRIES = [{ name: 'Norway', code: 'no' }, { name: 'Denmark', code: 'dk' }, { name: 'Sweden', code: 'se' }, { name: 'UK', code: 'gb' }];
const translations = {
    countrySelectionTitle: { no: "Velg ditt land", en: "Select country" },
    mainTitle: { no: "Bygg din AlphaPWR-pakke", en: "Build your AlphaPWR package" },
    financialOverview: { no: "Økonomisk Oversikt", en: "Financial Overview" },
    therapists: { no: "Antall terapeuter", en: "Number of therapists" },
    testsPerWeek: { no: "Tester per uke (per terapeut)", en: "Tests per week (per therapist)" },
    pricePerReport: { no: "Pris per rapport", en: "Price per report" },
    annualCost: { no: "Kostnad (Investering år 1)", en: "Cost (Year 1 Investment)" },
    annualIncome: { no: "Est. Årlig Inntekt", en: "Est. Annual Income" },
    balance: { no: "Balanse (Profitt år 1)", en: "Balance (Year 1 Profit)" },
    breakEven: { no: "Break-even (antall rapporter)", en: "Break-even (number of reports)" },
    // ... (reusing existing translation logic for other parts)
    step1Title: { no: "Velg størrelse", en: "Choose size" },
    step2Title: { no: "Tilleggsutstyr", en: "Add-ons" },
    step3Title: { no: "Prismodell", en: "Pricing Model" },
    step4Title: { no: "Inkludert", en: "Included" },
    summaryTitle: { no: "Oppsummering", en: "Summary" },
    payToday: { no: "Betales i dag", en: "Pay today" },
    sendRequest: { no: "Send forespørsel", en: "Send inquiry" },
    agreementModel: { no: "Abonnementsavtale", en: "Subscription Agreement" },
    purchaseModel: { no: "Kjøpsmodell", en: "Purchase Model" },
    setup: { no: "Oppsett", en: "Setup" },
    monthlySubscription: { no: "Månedlig abonnement", en: "Monthly subscription" },
    yearlySubscription: { no: "Årlig abonnement", en: "Yearly subscription" },
    returnService: { no: "Avslutningsservice", en: "Return service" },
    optional: { no: "valgfritt", en: "optional" },
    hardwareAndAddons: { no: "AlphaPWR system + tilbehør", en: "AlphaPWR system + accessories" },
    softwareLicenseMonthly: { no: "Programvarelisens (mnd)", en: "Software license (monthly)" },
    softwareLicenseYearly: { no: "Programvarelisens (år)", en: "Software license (yearly)" },
    equivalentTo: { no: "tilsvarer", en: "equals" },
    yearlyHint: { no: "Årlig betaling gir 2 mnd gratis.", en: "Yearly payment gives 2 months free." },
    returnServiceHint: { no: "Kan returneres når som helst mot en avgift.", en: "Can be returned anytime for a fee." },
    yearlySoftwareHint: { no: "Årlig betaling gir 2 mnd gratis.", en: "Yearly payment gives 2 months free." },
    leasingViaDLL: { no: "Leasing via De Lage Landen (DLL)", en: "Leasing via De Lage Landen (DLL)" },
    leasingHint: { no: "Få et uforpliktende leasingtilbud.", en: "Get a non-binding leasing offer." },
    includedSoftware: { no: "Alltid inkludert programvare", en: "Always included software" },
    billing: { no: "Fakturering", en: "Billing" },
    monthly: { no: "Månedlig", en: "Monthly" },
    yearly: { no: "Årlig", en: "Yearly" },
    yearlyDiscount: { no: "Årlig", en: "Yearly" },
    youSave: { no: "Du sparer", en: "You save" },
    yearlySaveNote: { no: "ved å velge årlig.", en: "by choosing yearly." },
    baseSystem: { no: "AlphaPWR System", en: "AlphaPWR System" },
    setupFee: { no: "Oppstartsavgift", en: "Setup Fee" },
    firstYearSubscription: { no: "Abonnement (første år)", en: "Subscription (first year)" },
    firstYearLicense: { no: "Programvarelisens (første år)", en: "Software License (first year)" },
    ongoingCosts: { no: "Løpende kostnader", en: "Ongoing costs" },
    ongoingSubscription: { no: "Løpende abonnement", en: "Ongoing subscription" },
    renewsAt: { no: "Fornyes med", en: "Renews at" },
    fromYear2: { no: "Fra og med år 2", en: "From year 2 onwards" },
    ongoingLicense: { no: "Løpende lisens", en: "Ongoing license" },
    readyForNextStep: { no: "Klar for neste steg?", en: "Ready for the next step?" },
    allPricesExclVAT: { no: "Alle priser er eks. MVA", en: "All prices are excl. VAT" },
    whatsIncluded: { no: "Dette er inkludert i prisen over", en: "What's included in the price above" }
};

const SIZES = [
    { id: "small", name: { no: "AlphaPWR Small", en: "AlphaPWR Small" }, image: "https://storage.googleapis.com/files_webpage/Price%20model/Small%20Transparent.png", included: { no: ['50" Samsung skjerm', "AlphaPWR sensor", "Platform: 110cm x 180cm"], en: ['50" Samsung screen', "AlphaPWR sensor", "Platform: 110cm x 180cm"] } },
    { id: "medium", name: { no: "AlphaPWR Medium", en: "AlphaPWR Medium" }, image: "https://storage.googleapis.com/files_webpage/Price%20model/Medium%20Transparent.png", included: { no: ['50" Samsung skjerm', "AlphaPWR sensor", "Platform: 310cm x 213cm"], en: ['50" Samsung screen', "AlphaPWR sensor", "Platform: 310cm x 213cm"] } },
    { id: "double", name: { no: "AlphaPWR Double", en: "AlphaPWR Double" }, image: "https://storage.googleapis.com/files_webpage/Price%20model/Large%20Transparent.png", included: { no: ['50" Samsung skjerm', "AlphaPWR sensor", "Platform: 610cm x 213cm"], en: ['50" Samsung screen', "AlphaPWR sensor", "Platform: 610cm x 213cm"] } }
];
const ADDONS = [
    { id: "nordic", name: { no: "Nordic Hamstring", en: "Nordic Hamstring" }, image: "https://storage.googleapis.com/files_webpage/Price%20model/Nordic%20Hamstring.png", hardware: 20000, softwareMonthly: 250 },
    { id: "pull", name: { no: "Pull håndtak", en: "Pull handles" }, image: "https://storage.googleapis.com/files_webpage/Price%20model/Pull.png", hardware: 2450 }
];
const SOFTWARE_MODULES = ["Squat", "Squat Analytics", "Pull", "Jump", "Balance", "Monitor"];

const AGREEMENT_PRICING = { small: { setup: 18250, monthly: 3200, yearly: 32000, returnService: 18250 }, medium: { setup: 22500, monthly: 3890, yearly: 38900, returnService: 22500 }, double: { setup: 42500, monthly: 7000, yearly: 70000, returnService: 42500 } };
const PURCHASE_PRICING = { small: { hardware: 140000, softwareMonthly: 950, yearly: 9500 }, medium: { hardware: 170000, softwareMonthly: 950, yearly: 9500 }, double: { hardware: 320000, softwareMonthly: 950, yearly: 9500 } };

const CONVERSION_RATES = { dk: 0.64, se: 0.98 };
function convertPrice(nok, country) { return CONVERSION_RATES[country] ? nok * CONVERSION_RATES[country] : nok; }
function formatCurrency(n, country) {
    const currency = { no: 'NOK', dk: 'DKK', se: 'SEK', en: 'NOK' }[country] || 'NOK';
    return new Intl.NumberFormat('no-NO', { maximumFractionDigits: 0 }).format(n) + ' ' + currency;
}
function applyMarketingRounding(amount) { return amount > 0 ? Math.ceil(amount / 10) * 10 : Math.round(amount); }

function FinancialOverview({ annualCost, language, currency }) {
    const [therapists, setTherapists] = useState(3);
    const [testsPerWeek, setTestsPerWeek] = useState(5);
    const [pricePerReport, setPricePerReport] = useState(500);

    const annualIncome = therapists * testsPerWeek * 52 * pricePerReport;
    const balance = annualIncome - annualCost;
    const breakEven = annualCost > 0 ? Math.ceil(annualCost / pricePerReport) : 0;

    const t = (k) => translations[k][language] || translations[k]['en'];
    const fmt = (n) => new Intl.NumberFormat('no-NO').format(n) + ' ' + currency;

    return (
        <div className="mt-12 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50">
            <h3 className="text-xl font-bold mb-6 text-white">{t('financialOverview')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <label className="block text-sm text-neutral-400 mb-2">{t('therapists')}</label>
                    <input type="range" min="1" max="20" value={therapists} onChange={e => setTherapists(Number(e.target.value))} className="w-full accent-emerald-500 mb-2" />
                    <div className="text-2xl font-bold text-white">{therapists}</div>
                </div>
                <div>
                    <label className="block text-sm text-neutral-400 mb-2">{t('testsPerWeek')}</label>
                    <input type="range" min="1" max="50" value={testsPerWeek} onChange={e => setTestsPerWeek(Number(e.target.value))} className="w-full accent-emerald-500 mb-2" />
                    <div className="text-2xl font-bold text-white">{testsPerWeek}</div>
                </div>
                <div>
                    <label className="block text-sm text-neutral-400 mb-2">{t('pricePerReport')}</label>
                    <div className="flex items-center">
                        <input type="number" value={pricePerReport} onChange={e => setPricePerReport(Number(e.target.value))} className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white w-full" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-red-900/20 border border-red-900/50">
                    <div className="text-sm text-red-200 uppercase">{t('annualCost')}</div>
                    <div className="text-2xl font-bold text-red-400">{fmt(annualCost)}</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-900/20 border border-emerald-900/50">
                    <div className="text-sm text-emerald-200 uppercase">{t('annualIncome')}</div>
                    <div className="text-2xl font-bold text-emerald-400">{fmt(annualIncome)}</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/50">
                    <div className="text-sm text-blue-200 uppercase">{t('balance')}</div>
                    <div className="text-3xl font-bold text-blue-400">{fmt(balance)}</div>
                </div>
            </div>
            <div className="mt-6 text-center text-sm text-neutral-400">
                {t('breakEven')}: <span className="text-white font-bold">{breakEven}</span> total reports/year
            </div>
        </div>
    );
}

// UI Components
function Section({ title, children, step, subtitle }) {
    return (
        <section className="mb-20">
            <div className="mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">
                    <span className="text-emerald-500">{step}.</span> {title}
                </h2>
                {subtitle && <p className="mt-1 text-neutral-400">{subtitle}</p>}
            </div>
            {children}
        </section>
    );
}
function CheckIcon(props) { return <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 6 9 17l-5-5" /></svg>; }
function TableBox({ children }) { return <div className="rounded-xl border border-neutral-800 divide-y divide-neutral-800 bg-neutral-900/30 flex flex-col h-full">{children}</div>; }
function TableRow({ label, value, hint, subvalue }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between px-4 py-3">
            <div><div className="text-neutral-300">{label}</div>{hint && <div className="text-xs text-neutral-400 mt-1 max-w-xs">{hint}</div>}</div>
            <div className="text-left sm:text-right mt-1 sm:mt-0"><div className="font-medium">{value}</div>{subvalue && <div className="text-xs text-neutral-400">{subvalue}</div>}</div>
        </div>
    );
}
function PriceBreakdownRow({ label, value }) {
    if (value == null) return null;
    return <div className="flex justify-between items-center text-sm py-1.5"><span className="text-neutral-300">{label}</span><span className="font-medium text-white">{value}</span></div>;
}

function SummaryCard({ mailHref, pricingModel, agreement, purchase, size, addons, billingCycle, payToday, leasingInterest, setLeasingInterest, language, country, finalPrices, fc }) {
    const t = (key) => translations[key][language] || translations[key]['en'];
    if (!size) return <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-center"><h3 className="text-lg font-semibold">{t('summaryTitle')}</h3><p className="mt-2 text-neutral-400">Start by choosing a size.</p></div>;

    return (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5">
            <h3 className="text-lg font-semibold mb-4">{t('summaryTitle')}</h3>
            <div className="p-4 rounded-xl bg-neutral-800/50 border border-neutral-700/50 text-center">
                <div className="text-sm uppercase tracking-wider text-neutral-400">{t('payToday')}</div>
                <div className="mt-1 text-3xl font-bold text-white">{fc(payToday)}</div>
            </div>

            <div className="mt-5 pt-5 border-t border-neutral-700/70">
                <h4 className="text-sm font-medium text-neutral-300 mb-3">{t('whatsIncluded')}</h4>
                <div className="space-y-2">
                    <PriceBreakdownRow label={`${t('baseSystem')} (${size.name[language]})`} value={pricingModel === 'agreement' ? t('agreementModel') : fc(finalPrices.purchase.baseHardware)} />
                    {finalPrices.addons.map((a) => <PriceBreakdownRow key={a.id} label={a.name[language]} value={fc(a.finalHardware)} />)}
                    {pricingModel === 'agreement' && <PriceBreakdownRow label={t('setupFee')} value={fc(finalPrices.agreement.setup)} />}
                    {pricingModel === 'agreement' && billingCycle === 'yearly' && <PriceBreakdownRow label={t('firstYearSubscription')} value={fc(finalPrices.agreement.yearly)} />}
                    {pricingModel === 'purchase' && billingCycle === 'yearly' && <PriceBreakdownRow label={t('firstYearLicense')} value={fc(finalPrices.purchase.yearly)} />}
                </div>
            </div>

            <div className="mt-5 pt-5 border-t border-neutral-700/70">
                <h4 className="text-sm font-medium text-neutral-300 mb-3">{t('ongoingCosts')}</h4>
                <div className="space-y-2">
                    {pricingModel === "agreement" && (billingCycle === "monthly"
                        ? <PriceBreakdownRow label={t('ongoingSubscription')} value={`${fc(finalPrices.agreement.monthly)}/mnd`} />
                        : <PriceBreakdownRow label={`${t('renewsAt')} (${t('fromYear2')})`} value={`${fc(finalPrices.agreement.yearly)}/år`} />)}
                    {pricingModel === "purchase" && (billingCycle === "monthly"
                        ? <PriceBreakdownRow label={t('ongoingLicense')} value={`${fc(finalPrices.purchase.softwareMonthly)}/mnd`} />
                        : <PriceBreakdownRow label={`${t('renewsAt')} (${t('fromYear2')})`} value={`${fc(finalPrices.purchase.yearly)}/år`} />)}
                </div>
            </div>

            <div className="mt-6">
                <h4 className="text-base text-center font-semibold text-white mb-2">{t('readyForNextStep')}</h4>
                <a href={mailHref} className="w-full block text-center rounded-xl border-2 border-emerald-600 bg-emerald-700 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-600 transition shadow-lg">{t('sendRequest')}</a>
                <p className="text-xs text-center text-neutral-500 mt-4">{t('allPricesExclVAT')}</p>
            </div>
        </div>
    );
}

function App() {
    const [sizeId, setSizeId] = useState(SIZES[1].id); // DEFAULT TO MEDIUM
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [pricingModel, setPricingModel] = useState("agreement");
    const [billingCycle, setBillingCycle] = useState("yearly");
    const [leasingInterest, setLeasingInterest] = useState(false);
    const [lang, setLang] = useState("no");
    const selectedCountry = "no"; // Default fixed for simplicity in this view

    const t = (key) => translations[key][lang] || translations[key]['en'];
    const fc = (n) => formatCurrency(n, selectedCountry);

    const currentSize = SIZES.find(s => s.id === sizeId);
    const addons = useMemo(() => ADDONS.filter(a => selectedAddons.includes(a.id)), [selectedAddons]);

    // Calculate logic copied from robust configurator
    const rawPrices = useMemo(() => {
        if (!sizeId) return null;
        // Agreement
        const agBase = AGREEMENT_PRICING[sizeId];
        const agAddons = ADDONS.filter(a => selectedAddons.includes(a.id));
        const agSetup = agBase.setup + agAddons.reduce((s, a) => s + (a.hardware || 0), 0);
        const agMonthly = agBase.monthly + agAddons.reduce((s, a) => s + (a.softwareMonthly || 0), 0);
        const agYearly = agBase.yearly + agAddons.reduce((s, a) => s + (a.softwareMonthly || 0) * 12, 0);

        // Purchase
        const purBase = PURCHASE_PRICING[sizeId];
        const purAddons = ADDONS.filter(a => selectedAddons.includes(a.id));
        const purHardware = purBase.hardware + purAddons.reduce((s, a) => s + (a.hardware || 0), 0);
        const purMonthly = purBase.softwareMonthly + purAddons.reduce((s, a) => s + (a.softwareMonthly || 0), 0);
        const purYearly = purBase.yearly + purAddons.reduce((s, a) => s + (a.softwareMonthly || 0) * 12, 0); // simplified yearly logic

        return {
            agreement: { setup: agSetup, monthly: agMonthly, yearly: agYearly, returnService: agBase.returnService },
            purchase: { baseHardware: purHardware, softwareMonthly: purMonthly, yearly: purYearly },
            addons: agAddons
        };
    }, [sizeId, selectedAddons]);

    const finalPrices = useMemo(() => {
        if (!rawPrices) return null;
        // Apply marketing rounding and currency conversion (simple 1:1 for NOK here)
        const p = rawPrices;
        return {
            agreement: {
                setup: applyMarketingRounding(p.agreement.setup),
                monthly: applyMarketingRounding(p.agreement.monthly),
                yearly: applyMarketingRounding(p.agreement.yearly),
                returnService: applyMarketingRounding(p.agreement.returnService)
            },
            purchase: {
                baseHardware: applyMarketingRounding(p.purchase.baseHardware),
                softwareMonthly: applyMarketingRounding(p.purchase.softwareMonthly),
                yearly: applyMarketingRounding(p.purchase.yearly)
            },
            addons: p.addons.map(a => ({ ...a, finalHardware: applyMarketingRounding(a.hardware) }))
        };
    }, [rawPrices]);

    const payToday = useMemo(() => {
        if (!finalPrices) return 0;
        if (pricingModel === "agreement") {
            return billingCycle === "monthly" ? finalPrices.agreement.setup : finalPrices.agreement.setup + finalPrices.agreement.yearly;
        }
        // Purchase
        return billingCycle === "yearly"
            ? finalPrices.purchase.baseHardware + finalPrices.purchase.yearly
            : finalPrices.purchase.baseHardware;
    }, [pricingModel, billingCycle, finalPrices]);

    // Calculate total annual cost for Financial Overview
    // Agreement Year 1: Setup + Yearly Subscription
    // Purchase Year 1: Hardware + Yearly License
    const annualCost = useMemo(() => {
        if (!finalPrices) return 0;
        if (pricingModel === 'agreement') {
            // If monthly billing, annualize it. If yearly, use yearly price.
            const sub = billingCycle === 'yearly' ? finalPrices.agreement.yearly : finalPrices.agreement.monthly * 12;
            return finalPrices.agreement.setup + sub;
        } else {
            const lic = billingCycle === 'yearly' ? finalPrices.purchase.yearly : finalPrices.purchase.softwareMonthly * 12;
            return finalPrices.purchase.baseHardware + lic;
        }
    }, [finalPrices, pricingModel, billingCycle]);

    const mailHref = `mailto:contact@alphatek.ai?subject=Inquiry`;

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_440px] gap-12">
                <div>
                    <div className="mb-10">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{t('mainTitle')}</h1>
                        <p className="mt-3 text-lg text-neutral-400">Skreddersy din pakke.</p>
                    </div>

                    <Section title={t('step1Title')} step={1}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {SIZES.map(s => (
                                <div key={s.id} onClick={() => setSizeId(s.id)}
                                    className={`cursor-pointer p-4 rounded-2xl border-2 transition group ${sizeId === s.id ? 'border-emerald-500 bg-neutral-900 shadow-lg' : 'border-neutral-800 hover:bg-neutral-900'}`}>
                                    <img src={s.image} className="w-full h-40 object-contain mb-2 group-hover:scale-105 transition-transform" />
                                    <div className="font-bold text-white">{s.name[lang]}</div>
                                    <ul className="mt-2 text-sm text-neutral-400 list-disc list-inside">
                                        {s.included[lang].map((i, idx) => <li key={idx}>{i}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <div className={`transition-opacity duration-500 ${!sizeId ? "opacity-40 pointer-events-none" : ""}`}>
                        <Section title={t('step2Title')} step={2}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {ADDONS.map(a => (
                                    <div key={a.id} onClick={() => setSelectedAddons(prev => prev.includes(a.id) ? prev.filter(x => x !== a.id) : [...prev, a.id])}
                                        className={`cursor-pointer p-4 rounded-2xl border-2 transition group ${selectedAddons.includes(a.id) ? 'border-sky-500 bg-neutral-900' : 'border-neutral-800 hover:bg-neutral-900'}`}>
                                        <img src={a.image} className="w-full h-32 object-contain mb-2 group-hover:scale-105 transition-transform" />
                                        <div className="font-bold text-white">{a.name[lang]}</div>
                                        <div className="text-xs text-neutral-400 mt-1">
                                            Engangskost: {fc(a.hardware)}
                                            {a.softwareMonthly ? ` + ${fc(a.softwareMonthly)}/mnd` : ''}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title={t('step3Title')} step={3}>
                            <div className="border-b border-neutral-800 flex mb-6">
                                <button onClick={() => setPricingModel('agreement')} className={`px-4 py-3 font-semibold transition ${pricingModel === 'agreement' ? 'text-white border-b-2 border-emerald-500' : 'text-neutral-400 hover:text-white'}`}>{t('agreementModel')}</button>
                                <button onClick={() => setPricingModel('purchase')} className={`px-4 py-3 font-semibold transition ${pricingModel === 'purchase' ? 'text-white border-b-2 border-emerald-500' : 'text-neutral-400 hover:text-white'}`}>{t('purchaseModel')}</button>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm text-neutral-300">{t('billing')}:</span>
                                <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900 p-1 text-sm">
                                    <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-1.5 rounded-full transition ${billingCycle === 'monthly' ? 'bg-neutral-700 text-white' : 'text-neutral-400'}`}>{t('monthly')}</button>
                                    <button onClick={() => setBillingCycle('yearly')} className={`px-4 py-1.5 rounded-full transition ${billingCycle === 'yearly' ? 'bg-emerald-700 text-white' : 'text-neutral-400'}`}>{t('yearly')}</button>
                                </div>
                            </div>
                            {finalPrices && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pricingModel === 'agreement' && (
                                        <TableBox>
                                            <TableRow label={t('setup')} value={fc(finalPrices.agreement.setup)} />
                                            <TableRow label={billingCycle === 'monthly' ? t('monthlySubscription') : t('yearlySubscription')}
                                                value={billingCycle === 'monthly' ? fc(finalPrices.agreement.monthly) : fc(finalPrices.agreement.yearly)}
                                                hint={billingCycle === 'yearly' ? t('yearlyHint') : ''} />
                                        </TableBox>
                                    )}
                                    {pricingModel === 'purchase' && (
                                        <TableBox>
                                            <TableRow label={t('hardwareAndAddons')} value={fc(finalPrices.purchase.baseHardware + finalPrices.addons.reduce((s, a) => s + a.finalHardware, 0))} />
                                            <TableRow label={billingCycle === 'monthly' ? t('softwareLicenseMonthly') : t('softwareLicenseYearly')}
                                                value={billingCycle === 'monthly' ? `${fc(finalPrices.purchase.softwareMonthly)}/mnd` : fc(finalPrices.purchase.yearly)}
                                                hint={billingCycle === 'yearly' ? t('yearlySoftwareHint') : ''} />
                                            <div className="p-4">
                                                <label className="flex gap-2 text-sm cursor-pointer">
                                                    <input type="checkbox" checked={leasingInterest} onChange={e => setLeasingInterest(e.target.checked)} className="mt-1 accent-emerald-500" />
                                                    <div>
                                                        <div className="font-medium text-white">{t('leasingViaDLL')}</div>
                                                        <div className="text-neutral-400">{t('leasingHint')}</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </TableBox>
                                    )}
                                </div>
                            )}
                        </Section>

                        <Section title={t('step4Title')} step={4}>
                            <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4">
                                <h4 className="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-3">{t('includedSoftware')}</h4>
                                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-neutral-200">
                                    {SOFTWARE_MODULES.map(m => <li key={m} className="flex items-center gap-2"><CheckIcon className="text-emerald-500" /> {m}</li>)}
                                </ul>
                            </div>
                        </Section>

                        {/* FINANCIAL OVERVIEW AT BOTTOM OF CONFIGURATOR */}
                        <FinancialOverview annualCost={annualCost} language={lang} currency="NOK" />
                    </div>
                </div>

                <aside className="xl:sticky xl:top-24 h-max hidden xl:block">
                    <SummaryCard
                        mailHref={mailHref} pricingModel={pricingModel}
                        size={currentSize} addons={addons} billingCycle={billingCycle}
                        payToday={payToday} leasingInterest={leasingInterest}
                        language={lang} country={selectedCountry} finalPrices={finalPrices} fc={fc}
                        agreement={pricingModel === 'agreement'} purchase={pricingModel === 'purchase'}
                    />
                </aside>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('product-configurator-root'));
root.render(<App />);
