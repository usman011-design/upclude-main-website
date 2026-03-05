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
  { name: 'Afghanistan',    code: '+93',   flag: '🇦🇫', minLen: 9,  maxLen: 9  },
  { name: 'Albania',        code: '+355',  flag: '🇦🇱', minLen: 9,  maxLen: 9  },
  { name: 'Algeria',        code: '+213',  flag: '🇩🇿', minLen: 9,  maxLen: 9  },
  { name: 'American Samoa', code: '+1684', flag: '🇦🇸', minLen: 7,  maxLen: 7  },
  { name: 'Andorra',        code: '+376',  flag: '🇦🇩', minLen: 6,  maxLen: 9  },
  { name: 'Angola',         code: '+244',  flag: '🇦🇴', minLen: 9,  maxLen: 9  },
  { name: 'Anguilla',       code: '+1264', flag: '🇦🇮', minLen: 7,  maxLen: 7  },
  { name: 'Antarctica',     code: '+672',  flag: '🇦🇶', minLen: 6,  maxLen: 6  },
  { name: 'Argentina',      code: '+54',   flag: '🇦🇷', minLen: 10, maxLen: 11 },
  { name: 'Australia',      code: '+61',   flag: '🇦🇺', minLen: 9,  maxLen: 9  },
  { name: 'Austria',        code: '+43',   flag: '🇦🇹', minLen: 7,  maxLen: 13 },
  { name: 'Bangladesh',     code: '+880',  flag: '🇧🇩', minLen: 10, maxLen: 10 },
  { name: 'Belgium',        code: '+32',   flag: '🇧🇪', minLen: 9,  maxLen: 9  },
  { name: 'Brazil',         code: '+55',   flag: '🇧🇷', minLen: 10, maxLen: 11 },
  { name: 'Canada',         code: '+1',    flag: '🇨🇦', minLen: 10, maxLen: 10 },
  { name: 'China',          code: '+86',   flag: '🇨🇳', minLen: 11, maxLen: 11 },
  { name: 'Denmark',        code: '+45',   flag: '🇩🇰', minLen: 8,  maxLen: 8  },
  { name: 'Egypt',          code: '+20',   flag: '🇪🇬', minLen: 10, maxLen: 10 },
  { name: 'Finland',        code: '+358',  flag: '🇫🇮', minLen: 9,  maxLen: 11 },
  { name: 'France',         code: '+33',   flag: '🇫🇷', minLen: 9,  maxLen: 9  },
  { name: 'Germany',        code: '+49',   flag: '🇩🇪', minLen: 10, maxLen: 11 },
  { name: 'Ghana',          code: '+233',  flag: '🇬🇭', minLen: 9,  maxLen: 9  },
  { name: 'Greece',         code: '+30',   flag: '🇬🇷', minLen: 10, maxLen: 10 },
  { name: 'India',          code: '+91',   flag: '🇮🇳', minLen: 10, maxLen: 10 },
  { name: 'Indonesia',      code: '+62',   flag: '🇮🇩', minLen: 9,  maxLen: 12 },
  { name: 'Iran',           code: '+98',   flag: '🇮🇷', minLen: 10, maxLen: 10 },
  { name: 'Iraq',           code: '+964',  flag: '🇮🇶', minLen: 10, maxLen: 10 },
  { name: 'Ireland',        code: '+353',  flag: '🇮🇪', minLen: 9,  maxLen: 9  },
  { name: 'Italy',          code: '+39',   flag: '🇮🇹', minLen: 9,  maxLen: 11 },
  { name: 'Japan',          code: '+81',   flag: '🇯🇵', minLen: 10, maxLen: 11 },
  { name: 'Jordan',         code: '+962',  flag: '🇯🇴', minLen: 9,  maxLen: 9  },
  { name: 'Kenya',          code: '+254',  flag: '🇰🇪', minLen: 9,  maxLen: 9  },
  { name: 'Kuwait',         code: '+965',  flag: '🇰🇼', minLen: 8,  maxLen: 8  },
  { name: 'Malaysia',       code: '+60',   flag: '🇲🇾', minLen: 9,  maxLen: 10 },
  { name: 'Mexico',         code: '+52',   flag: '🇲🇽', minLen: 10, maxLen: 10 },
  { name: 'Netherlands',    code: '+31',   flag: '🇳🇱', minLen: 9,  maxLen: 9  },
  { name: 'New Zealand',    code: '+64',   flag: '🇳🇿', minLen: 8,  maxLen: 10 },
  { name: 'Nigeria',        code: '+234',  flag: '🇳🇬', minLen: 10, maxLen: 10 },
  { name: 'Norway',         code: '+47',   flag: '🇳🇴', minLen: 8,  maxLen: 8  },
  { name: 'Oman',           code: '+968',  flag: '🇴🇲', minLen: 8,  maxLen: 8  },
  { name: 'Pakistan',       code: '+92',   flag: '🇵🇰', minLen: 10, maxLen: 10 },
  { name: 'Philippines',    code: '+63',   flag: '🇵🇭', minLen: 10, maxLen: 10 },
  { name: 'Poland',         code: '+48',   flag: '🇵🇱', minLen: 9,  maxLen: 9  },
  { name: 'Portugal',       code: '+351',  flag: '🇵🇹', minLen: 9,  maxLen: 9  },
  { name: 'Qatar',          code: '+974',  flag: '🇶🇦', minLen: 8,  maxLen: 8  },
  { name: 'Romania',        code: '+40',   flag: '🇷🇴', minLen: 9,  maxLen: 9  },
  { name: 'Russia',         code: '+7',    flag: '🇷🇺', minLen: 10, maxLen: 10 },
  { name: 'Saudi Arabia',   code: '+966',  flag: '🇸🇦', minLen: 9,  maxLen: 9  },
  { name: 'Singapore',      code: '+65',   flag: '🇸🇬', minLen: 8,  maxLen: 8  },
  { name: 'South Africa',   code: '+27',   flag: '🇿🇦', minLen: 9,  maxLen: 9  },
  { name: 'South Korea',    code: '+82',   flag: '🇰🇷', minLen: 9,  maxLen: 11 },
  { name: 'Spain',          code: '+34',   flag: '🇪🇸', minLen: 9,  maxLen: 9  },
  { name: 'Sri Lanka',      code: '+94',   flag: '🇱🇰', minLen: 9,  maxLen: 9  },
  { name: 'Sweden',         code: '+46',   flag: '🇸🇪', minLen: 9,  maxLen: 9  },
  { name: 'Switzerland',    code: '+41',   flag: '🇨🇭', minLen: 9,  maxLen: 9  },
  { name: 'Thailand',       code: '+66',   flag: '🇹🇭', minLen: 9,  maxLen: 9  },
  { name: 'Turkey',         code: '+90',   flag: '🇹🇷', minLen: 10, maxLen: 10 },
  { name: 'UAE',            code: '+971',  flag: '🇦🇪', minLen: 9,  maxLen: 9  },
  { name: 'Ukraine',        code: '+380',  flag: '🇺🇦', minLen: 9,  maxLen: 9  },
  { name: 'United Kingdom', code: '+44',   flag: '🇬🇧', minLen: 10, maxLen: 10 },
  { name: 'United States',  code: '+1',    flag: '🇺🇸', minLen: 10, maxLen: 10 },
  { name: 'Vietnam',        code: '+84',   flag: '🇻🇳', minLen: 9,  maxLen: 10 },
];

type Country = typeof COUNTRIES[0];

// ─── Validation rules ─────────────────────────────────────────────────────────
const validators = {
  name: (v: string) => {
    if (!v.trim()) return 'Name is required';
    if (v.trim().length < 2) return 'Name must be at least 2 characters';
    if (v.trim().length > 60) return 'Name must be under 60 characters';
    if (!/^[a-zA-Z\s'\-\.]+$/.test(v.trim())) return 'Name can only contain letters, spaces, hyphens or apostrophes';
    return '';
  },
  email: (v: string) => {
    if (!v.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'Enter a valid email address';
    return '';
  },
  phone: (v: string, country: Country) => {
    const digits = v.replace(/\D/g, '');
    if (!digits) return 'Phone number is required';
    if (!/^\d+$/.test(digits)) return 'Phone number must contain only digits';
    if (digits.length < country.minLen) return `Phone number must be at least ${country.minLen} digits for ${country.name}`;
    if (digits.length > country.maxLen) return `Phone number must be at most ${country.maxLen} digits for ${country.name}`;
    return '';
  },
  service: (v: string) => (!v ? 'Please select a service' : ''),
  budget:  (v: string) => (!v ? 'Please select a budget range' : ''),
  message: (v: string) => {
    if (!v.trim()) return 'Please describe your project';
    if (v.trim().length < 20) return 'Description must be at least 20 characters';
    if (v.trim().length > 2000) return 'Description must be under 2000 characters';
    return '';
  },
};

// ─── Field error display ──────────────────────────────────────────────────────
function FieldError({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p style={{
      color: '#ff6b6b', fontSize: 11, marginTop: 5,
      display: 'flex', alignItems: 'center', gap: 4,
      fontFamily: 'system-ui, sans-serif',
      animation: 'errFadeIn 0.2s ease',
    }}>
      <span style={{ fontSize: 10 }}>⚠</span> {msg}
      <style>{`@keyframes errFadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </p>
  );
}

const inputBase =
  'w-full bg-transparent border-0 border-b pb-3 pt-1 text-white placeholder-white/40 text-sm focus:outline-none transition-colors';

function inputBorderClass(touched: boolean, error: string) {
  if (!touched) return 'border-white/30 focus:border-white/60';
  if (error)    return 'border-red-400/70 focus:border-red-400';
  return 'border-green-400/50 focus:border-green-400/70';
}

/* ── Custom Dropdown ── */
function CustomDropdown({
  placeholder, options, value, onChange, disabled, touched, error,
}: {
  placeholder: string; options: string[]; value: string;
  onChange: (v: string) => void; disabled?: boolean;
  touched?: boolean; error?: string;
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

  const borderColor = !touched ? 'rgba(255,255,255,0.3)'
    : error ? 'rgba(248,113,113,0.7)' : 'rgba(74,222,128,0.5)';

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen(v => !v)}
        disabled={disabled}
        className="w-full flex items-center justify-between pb-3 pt-1 text-sm focus:outline-none transition-colors disabled:opacity-50"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <span className={value ? 'text-white' : 'text-white/40'}>{value || placeholder}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {touched && !error && <span style={{ color: '#4ade80', fontSize: 11 }}>✓</span>}
          {touched && error  && <span style={{ color: '#f87171', fontSize: 11 }}>⚠</span>}
          <span className="text-white/40 text-xs">&#8964;</span>
        </span>
      </button>
      {error && touched && <FieldError msg={error} />}
      {open && (
        <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1a0545] border border-white/20 rounded-xl shadow-2xl"
          style={{ maxHeight: '280px', overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(123,0,255,0.5) transparent', zIndex: 9999, position: 'absolute' }}>
          {options.map(opt => (
            <button
              key={opt} type="button"
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
}: { selected: Country; onChange: (c: Country) => void; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false); setSearch('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

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
        <div className="absolute bottom-full left-0 mb-2 bg-[#1a0545] border border-white/20 rounded-xl w-64 shadow-2xl overflow-hidden"
        style={{ zIndex: 9999, position: 'absolute' }}>
          <div className="px-3 pt-3 pb-2">
            <input
              type="text" placeholder="Search Country" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/40 text-sm px-3 py-2 rounded-lg focus:outline-none focus:bg-white/15"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto"
                style={{ maxHeight: '240px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(123,0,255,0.5) transparent' }}>
            {filtered.map(c => (
              <button
                key={c.name + c.code} type="button"
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
type TouchedFields = Record<string, boolean>;
type ErrorFields   = Record<string, string>;

export const ContactForm: React.FC = () => {
  const [country, setCountry] = useState<Country>(COUNTRIES.find(c => c.name === 'Pakistan')!);
  const [service, setService] = useState('');
  const [budget,  setBudget]  = useState('');
  const [status,  setStatus]  = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [message, setMessage] = useState('');

  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors,  setErrors]  = useState<ErrorFields>({});

  const isLoading = status === 'loading';

  // ─── Compute all errors from current state ───────────────────────────────
  const computeErrors = (): ErrorFields => ({
    name:    validators.name(name),
    email:   validators.email(email),
    phone:   validators.phone(phone, country),
    service: validators.service(service),
    budget:  validators.budget(budget),
    message: validators.message(message),
  });

  // ─── Live validation on blur / change ────────────────────────────────────
  const touch = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
  };

  const handleChange = (field: string, value: string) => {
    // Update value
    switch (field) {
      case 'name':    setName(value);    break;
      case 'email':   setEmail(value);   break;
      case 'phone':   setPhone(value.replace(/[^\d\s\-\(\)\+]/, '')); break;
      case 'message': setMessage(value); break;
    }
    // Live error update if already touched
    if (touched[field]) {
      const errs = computeErrors();
      // recompute with new value inline
      let fieldErr = '';
      if (field === 'name')    fieldErr = validators.name(value);
      if (field === 'email')   fieldErr = validators.email(value);
      if (field === 'phone')   fieldErr = validators.phone(value, country);
      if (field === 'message') fieldErr = validators.message(value);
      setErrors(e => ({ ...e, [field]: fieldErr }));
    }
  };

  const handleBlur = (field: string) => {
    touch(field);
    const errs = computeErrors();
    setErrors(e => ({ ...e, [field]: errs[field] }));
  };

  // When country changes, re-validate phone if touched
  useEffect(() => {
    if (touched.phone) {
      setErrors(e => ({ ...e, phone: validators.phone(phone, country) }));
    }
  }, [country]);

  // ─── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields
    const allTouched: TouchedFields = { name: true, email: true, phone: true, service: true, budget: true, message: true };
    setTouched(allTouched);

    const errs = computeErrors();
    setErrors(errs);

    const hasErrors = Object.values(errs).some(v => v !== '');
    if (hasErrors) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email,
          phone: `${country.code}${phone.replace(/\D/g, '')}`,
          countryCode: country.code,
          service, budget, message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setName(''); setEmail(''); setPhone(''); setMessage('');
      setService(''); setBudget('');
      setCountry(COUNTRIES.find(c => c.name === 'Pakistan')!);
      setTouched({}); setErrors({});
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  // ─── Helpers for input styling ────────────────────────────────────────────
  const borderStyle = (field: string) => {
    if (!touched[field]) return { borderBottom: '1px solid rgba(255,255,255,0.3)' };
    if (errors[field])   return { borderBottom: '1px solid rgba(248,113,113,0.7)' };
    return                      { borderBottom: '1px solid rgba(74,222,128,0.5)'  };
  };

  const inputIcon = (field: string) => {
    if (!touched[field]) return null;
    if (errors[field])   return <span style={{ position:'absolute', right:0, bottom:14, fontSize:11, color:'#f87171' }}>⚠</span>;
    return                      <span style={{ position:'absolute', right:0, bottom:14, fontSize:11, color:'#4ade80' }}>✓</span>;
  };

  return (
    <div className="relative">

      {/* ── Success Popup ── */}
      {status === 'success' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl"
          style={{ backdropFilter: 'blur(6px)', background: 'rgba(10,0,30,0.75)' }}>
          <div className="flex flex-col items-center text-center px-8 py-10 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg,#1a0040,#0d0028)',
              border: '1px solid rgba(168,85,247,0.25)',
              boxShadow: '0 32px 80px rgba(123,0,255,0.35)',
              minWidth: 300, maxWidth: 380,
            }}>
            <div className="flex items-center justify-center mb-6"
              style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#7B00FF,#a855f7)', boxShadow:'0 0 32px rgba(123,0,255,0.5)' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 16.5l5.5 5.5 10.5-11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{ margin:'0 0 8px', color:'#ffffff', fontSize:22, fontWeight:700, letterSpacing:'-0.3px' }}>Message Sent!</h3>
            <p style={{ margin:'0 0 28px', color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.6 }}>
              Thank you! We've received your enquiry and will get back to you as soon as possible.
            </p>
            <button onClick={() => setStatus('idle')} className="w-full font-semibold text-white transition-all"
              style={{ background:'linear-gradient(135deg,#7B00FF,#a855f7)', border:'none', borderRadius:100, padding:'13px 0', fontSize:15, cursor:'pointer', boxShadow:'0 8px 24px rgba(123,0,255,0.4)' }}>
              OK
            </button>
          </div>
        </div>
      )}

      <form className="flex flex-col gap-10" onSubmit={handleSubmit} noValidate style={{ overflow: "visible" }}>

        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Name */}
          <div>
            <div className="relative">
              <input
                className={`${inputBase} pr-5`}
                style={borderStyle('name')}
                type="text" placeholder="Your name *"
                disabled={isLoading} value={name}
                onChange={e => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
              />
              {inputIcon('name')}
            </div>
            <FieldError msg={touched.name ? errors.name || '' : ''} />
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <input
                className={`${inputBase} pr-5`}
                style={borderStyle('email')}
                type="email" placeholder="Your email *"
                disabled={isLoading} value={email}
                onChange={e => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
              />
              {inputIcon('email')}
            </div>
            <FieldError msg={touched.email ? errors.email || '' : ''} />
          </div>
        </div>

        {/* Row 2: Service */}
        <CustomDropdown
          placeholder="Select the service you need *"
          options={SERVICES} value={service}
          onChange={v => { setService(v); touch('service'); setErrors(e => ({ ...e, service: validators.service(v) })); }}
          disabled={isLoading} touched={touched.service} error={errors.service}
        />

        {/* Row 3: Phone */}
        <div>
          <div className="flex items-end gap-4">
            <CountryPicker selected={country} onChange={setCountry} disabled={isLoading} />
            <div className="relative flex-1">
              <input
                className={`${inputBase} pr-5`}
                style={borderStyle('phone')}
                type="tel"
                placeholder={`${'x'.repeat(country.minLen)} *`}
                disabled={isLoading} value={phone}
                onChange={e => handleChange('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                maxLength={country.maxLen + 3} // allow spaces/dashes
              />
              {inputIcon('phone')}
            </div>
          </div>
          <FieldError msg={touched.phone ? errors.phone || '' : ''} />
          {/* Hint */}
          {!errors.phone && (
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:4, fontFamily:'system-ui,sans-serif' }}>
              {country.name}: {country.minLen === country.maxLen ? `${country.minLen}` : `${country.minLen}–${country.maxLen}`} digits required
            </p>
          )}
        </div>

        {/* Row 4: Message */}
        <div>
          <div className="relative">
            <textarea
              className={`${inputBase} resize-none min-h-[80px] pr-5`}
              style={borderStyle('message')}
              placeholder="Please describe your project. *"
              disabled={isLoading} value={message}
              onChange={e => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
            />
            {inputIcon('message')}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <FieldError msg={touched.message ? errors.message || '' : ''} />
            <span style={{ color: message.length > 1800 ? '#f87171' : 'rgba(255,255,255,0.25)', fontSize:11, fontFamily:'system-ui,sans-serif', marginLeft:'auto' }}>
              {message.length}/2000
            </span>
          </div>
        </div>

        {/* Row 5: Budget */}
        <CustomDropdown
          placeholder="What is your budget? *"
          options={BUDGETS} value={budget}
          onChange={v => { setBudget(v); touch('budget'); setErrors(e => ({ ...e, budget: validators.budget(v) })); }}
          disabled={isLoading} touched={touched.budget} error={errors.budget}
        />

        {/* API Error */}
        {status === 'error' && (
          <p className="text-red-400 text-sm -mt-4">⚠ {errorMsg}</p>
        )}

        {/* Submit */}
        <div>
          <button
            type="submit" disabled={isLoading}
            className="inline-flex items-center gap-3 bg-[#7B00FF] hover:bg-[#6500d4] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-white font-semibold text-base px-8 py-4 rounded-full"
          >
            {isLoading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
            ) : (
              <>Submit <span className="text-lg">→</span></>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};