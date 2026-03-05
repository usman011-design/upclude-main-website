'use client'

import React, { useState, useRef, useEffect } from 'react';

const SERVICES = [
  'Android App Development',
  'iOS App Development',
  'Web App Development',
  'Mobile App Development',
  'UX, Product and Design',
  'Backend Development Services',
  'Frontend Development Services',
  'Custom Software Development',
  'QA and Software Testing',
  'SAAS Development Services',
  'MVP for Startups',
  'Prototype to MVP',
  'Enterprise Software Development',
  'Web Scraping Services',
  'DevOps Solutions',
];

const BUDGETS = [
  'Less than USD 50,000',
  'USD 50,000 - USD 100,000',
  'USD 100,000 - USD 200,000',
  'USD 200,000 - USD 500,000',
  'Above USD 500,000',
];

const COUNTRIES = [
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫' },
  { name: 'Albania', code: '+355', flag: '🇦🇱' },
  { name: 'Algeria', code: '+213', flag: '🇩🇿' },
  { name: 'American Samoa', code: '+1684', flag: '🇦🇸' },
  { name: 'Andorra', code: '+376', flag: '🇦🇩' },
  { name: 'Angola', code: '+244', flag: '🇦🇴' },
  { name: 'Anguilla', code: '+1264', flag: '🇦🇮' },
  { name: 'Antarctica', code: '+672', flag: '🇦🇶' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Austria', code: '+43', flag: '🇦🇹' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'China', code: '+86', flag: '🇨🇳' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰' },
  { name: 'Egypt', code: '+20', flag: '🇪🇬' },
  { name: 'Finland', code: '+358', flag: '🇫🇮' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' },
  { name: 'Greece', code: '+30', flag: '🇬🇷' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
  { name: 'Iran', code: '+98', flag: '🇮🇷' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪' },
  { name: 'Italy', code: '+39', flag: '🇮🇹' },
  { name: 'Japan', code: '+81', flag: '🇯🇵' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Norway', code: '+47', flag: '🇳🇴' },
  { name: 'Oman', code: '+968', flag: '🇴🇲' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭' },
  { name: 'Poland', code: '+48', flag: '🇵🇱' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦' },
  { name: 'Romania', code: '+40', flag: '🇷🇴' },
  { name: 'Russia', code: '+7', flag: '🇷🇺' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷' },
  { name: 'Spain', code: '+34', flag: '🇪🇸' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷' },
  { name: 'UAE', code: '+971', flag: '🇦🇪' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
];

const inputBase =
  'w-full bg-transparent border-0 border-b border-white/30 pb-3 pt-1 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors';

/* ── Custom Dropdown ── */
function CustomDropdown({
  placeholder, options, value, onChange, disabled,
}: {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(v => !v)}
        disabled={disabled}
        className="w-full flex items-center justify-between border-b border-white/30 pb-3 pt-1 text-sm focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
      >
        <span className={value ? 'text-white' : 'text-white/40'}>{value || placeholder}</span>
        <span className="text-white/40 text-xs">&#8964;</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full mt-1 bg-[#1a0545] border border-white/20 rounded-xl z-50 max-h-60 overflow-y-auto shadow-2xl">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-0 flex items-center justify-between"
            >
              {opt}
              {value === opt && <span className="text-white/70 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Country Picker ── */
function CountryPicker({
  selected, onChange, disabled,
}: {
  selected: typeof COUNTRIES[0];
  onChange: (c: typeof COUNTRIES[0]) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(v => !v)}
        disabled={disabled}
        className="flex items-center gap-1 pb-3 border-b border-white/30 text-white text-sm whitespace-nowrap focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
      >
        <span>{selected.flag}</span>
        <span>{selected.code}</span>
        <span className="text-white/40 text-xs ml-1">&#8964;</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1a0545] border border-white/20 rounded-xl z-50 w-64 shadow-2xl overflow-hidden">
          <div className="px-3 pt-3 pb-2">
            <input
              type="text"
              placeholder="Search Country"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/40 text-sm px-3 py-2 rounded-lg focus:outline-none focus:bg-white/15"
              autoFocus
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.name + c.code}
                type="button"
                onClick={() => { onChange(c); setOpen(false); setSearch(''); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
              >
                <span className="text-base">{c.flag}</span>
                <span>{c.name} {c.code}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-white/40 text-sm text-center py-4">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Form ── */
type Status = 'idle' | 'loading' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const [country, setCountry] = useState(COUNTRIES.find(c => c.name === 'Pakistan')!);
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Controlled inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const isLoading = status === 'loading';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          countryCode: country.code,
          service,
          budget,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      // Reset form
      setName(''); setEmail(''); setPhone(''); setMessage('');
      setService(''); setBudget('');
      setCountry(COUNTRIES.find(c => c.name === 'Pakistan')!);
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  return (
    <div className="relative">

      {/* ── Success Popup Overlay ── */}
      {status === 'success' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl"
          style={{ backdropFilter: 'blur(6px)', background: 'rgba(10,0,30,0.75)' }}>
          <div
            className="flex flex-col items-center text-center px-8 py-10 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg,#1a0040,#0d0028)',
              border: '1px solid rgba(168,85,247,0.25)',
              boxShadow: '0 32px 80px rgba(123,0,255,0.35)',
              minWidth: 300,
              maxWidth: 380,
            }}
          >
            {/* Animated checkmark circle */}
            <div
              className="flex items-center justify-center mb-6"
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg,#7B00FF,#a855f7)',
                boxShadow: '0 0 32px rgba(123,0,255,0.5)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16.5l5.5 5.5 10.5-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h3 style={{ margin: '0 0 8px', color: '#ffffff', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px' }}>
              Message Sent!
            </h3>
            <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.6 }}>
              Thank you! We've received your enquiry and will get back to you as soon as possible.
            </p>

            <button
              onClick={() => setStatus('idle')}
              className="w-full font-semibold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg,#7B00FF,#a855f7)',
                border: 'none',
                borderRadius: 100,
                padding: '13px 0',
                fontSize: 15,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(123,0,255,0.4)',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <input
            className={inputBase}
            type="text"
            placeholder="Your name *"
            required
            disabled={isLoading}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className={inputBase}
            type="email"
            placeholder="Your email *"
            required
            disabled={isLoading}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Row 2: Service */}
        <CustomDropdown
          placeholder="Select the service you need *"
          options={SERVICES}
          value={service}
          onChange={setService}
          disabled={isLoading}
        />

        {/* Row 3: Phone */}
        <div className="flex items-end gap-4">
          <CountryPicker selected={country} onChange={setCountry} disabled={isLoading} />
          <input
            className={`${inputBase} flex-1`}
            type="tel"
            placeholder="xxxxxxxxxx *"
            required
            disabled={isLoading}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        {/* Row 4: Message */}
        <textarea
          className={`${inputBase} resize-none min-h-[80px]`}
          placeholder="Please describe your project. *"
          required
          disabled={isLoading}
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        {/* Row 5: Budget */}
        <CustomDropdown
          placeholder="What is your budget? *"
          options={BUDGETS}
          value={budget}
          onChange={setBudget}
          disabled={isLoading}
        />

        {/* Error message */}
        {status === 'error' && (
          <p className="text-red-400 text-sm -mt-4">{errorMsg}</p>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-3 bg-[#7B00FF] hover:bg-[#6500d4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-semibold text-base px-8 py-4 rounded-full"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending…
              </>
            ) : (
              <>Submit <span className="text-lg">→</span></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};