import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Wrench,
  Droplets,
  ShieldCheck,
  MapPin,
  Star,
  Clock3,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Mail,
  Home,
  Flame,
  Hammer,
  Menu,
  X,
} from "lucide-react";
import fixItNowLogo from "./assets/fixitnow-logo.svg";

type PageKey =
  | "home"
  | "about"
  | "services"
  | "gallery"
  | "blocked-drains"
  | "hot-water"
  | "emergency"
  | "taps-toilets"
  | "burst-pipes"
  | "gas-fitting"
  | "kitchen-plumbing"
  | "bathroom-plumbing"
  | "laundry-plumbing"
  | "guarantee"
  | "contact"
  | "terms";

const heroImage =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80";
const aboutImage =
  "https://mrflowplumbing.com.au/wp-content/uploads/2024/07/male-plumber-working-fix-problems-client-s-house_23-2150990735.jpg";
const enquiryEmail = "paul@fixitnowplumbing.com.au";

const reviews = [
  {
    quote: "Called at 7am about a burst pipe and they had it sorted before lunch. Clean, professional and stress-free.",
    name: "Matt H.",
  },
  {
    quote: "Clear pricing, great communication and quality workmanship. Exactly what you want from a plumber.",
    name: "Sarah T.",
  },
  {
    quote: "They diagnosed our blocked drain fast, explained the fix, and gave practical advice to prevent it happening again.",
    name: "James R.",
  },
] as const;

const serviceRows = [
  {
    key: "blocked-drains" as const,
    title: "Blocked Drains",
    desc: "Kitchen, bathroom and stormwater drainage issues diagnosed and cleared with practical long-term solutions.",
    image:
      "https://www.obrien.com.au/wp-content/uploads/2025/03/A-Plumber-Cleaning-A-Blocked-Drain.jpg",
    icon: Droplets,
  },
  {
    key: "hot-water" as const,
    title: "Hot Water Repairs",
    desc: "Repairs, replacements and new installs to get hot water systems working properly again.",
    image:
      "https://sydneyhotwatersystems.com.au/wp-content/uploads/2026/04/Is-It-Time-to-Replace-Your-Hot-Water-Unit-Signs-Repair-Wont-Cut-It.jpg",
    icon: Flame,
  },
  {
    key: "emergency" as const,
    title: "Emergency Plumbing",
    desc: "Urgent leaks, burst pipes and fast-response plumbing help across Sydney's Northern Beaches.",
    image:
      "https://elmershomeservices.com/wp-content/uploads/2025/03/emergency-plumber-1024x682-1.jpeg",
    icon: Wrench,
  },
  {
    key: "taps-toilets" as const,
    title: "Taps & Toilets",
    desc: "Leaking taps, running toilets and faulty fixtures repaired fast with quality parts and tidy workmanship.",
    image:
      "https://reedplumbingsolutions.com.au/wp-content/uploads/2021/03/What-is-preventative-maintenance-1024x683.webp",
    icon: Droplets,
  },
  {
    key: "burst-pipes" as const,
    title: "Burst Pipes",
    desc: "Rapid burst and leaking pipe repairs to protect your property and restore safe water flow.",
    image: "https://northeastplumbing.com.au/wp-content/uploads/2024/09/Burst-pipe-causes.jpg",
    icon: Wrench,
  },
  {
    key: "gas-fitting" as const,
    title: "Gas Fitting",
    desc: "Licensed gas fitting and gas installations completed safely, compliantly and with upfront advice.",
    image:
      "https://trueflowplumbing.net.au/wp-content/uploads/2024/09/Install-gas-line.jpg",
    icon: Flame,
  },
  {
    key: "kitchen-plumbing" as const,
    title: "Kitchen Plumbing",
    desc: "Kitchen plumbing repairs and installations for sinks, mixers, dishwashers and water filters.",
    image:
      "https://goldcoastplumbingexperts.com.au/wp-content/uploads/2023/10/plumber-under-new-sink-optimized.jpg",
    icon: Hammer,
  },
  {
    key: "bathroom-plumbing" as const,
    title: "Bathroom Plumbing",
    desc: "Bathroom plumbing for leaks, fixtures, drains and upgrades carried out by licensed plumbers.",
    image:
      "https://www.empiretiles.com.au/wp-content/uploads/2025/06/Why-Sydney-Homeowners-Move-Bathroom-Plumbing-1024x683.jpg",
    icon: Home,
  },
  {
    key: "laundry-plumbing" as const,
    title: "Laundry Plumbing",
    desc: "Laundry plumbing services for tubs, washing machine connections, taps and drain improvements.",
    image: "https://i.redd.it/f3t4nefn1ea61.jpg",
    icon: Droplets,
  },
] as const;

const serviceList = [
  "Emergency plumbing",
  "Blocked drains",
  "Hot water repairs",
  "Leak detection",
  "Burst pipe repairs",
  "Gas fitting services",
  "Drainage solutions",
] as const;

const galleryImages = [
  {
    title: "Blocked drain clearing",
    image:
      "https://www.obrien.com.au/wp-content/uploads/2025/03/A-Plumber-Cleaning-A-Blocked-Drain.jpg",
  },
  {
    title: "Hot water system work",
    image:
      "https://sydneyhotwatersystems.com.au/wp-content/uploads/2026/04/Is-It-Time-to-Replace-Your-Hot-Water-Unit-Signs-Repair-Wont-Cut-It.jpg",
  },
  {
    title: "On-site plumbing repairs",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Plumbing tools and fittings",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Maintenance plumbing job",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Emergency plumbing response",
    image:
      "https://elmershomeservices.com/wp-content/uploads/2025/03/emergency-plumber-1024x682-1.jpeg",
  },
] as const;

const mobileNavItems: Array<{ key: PageKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "emergency", label: "Emergency Plumber" },
  { key: "gallery", label: "Gallery" },
  { key: "blocked-drains", label: "Blocked Drains" },
  { key: "hot-water", label: "Hot Water" },
  { key: "taps-toilets", label: "Taps & Toilets" },
  { key: "burst-pipes", label: "Burst Pipes" },
  { key: "gas-fitting", label: "Gas Fitting" },
  { key: "kitchen-plumbing", label: "Kitchen Plumbing" },
  { key: "bathroom-plumbing", label: "Bathroom Plumbing" },
  { key: "laundry-plumbing", label: "Laundry Plumbing" },
  { key: "guarantee", label: "Guarantee" },
  { key: "contact", label: "Contact Us" },
];

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">{title}</h2>
      {text ? <p className="mt-4 text-lg text-slate-600">{text}</p> : null}
    </div>
  );
}

function handleEnquirySubmit(event: React.FormEvent<HTMLFormElement>, subject: string) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const lines = Array.from(formData.entries())
    .filter(([, value]) => String(value).trim().length > 0)
    .map(([key, value]) => `${key}: ${String(value).trim()}`);

  const body = lines.length > 0 ? lines.join("\n") : "New website enquiry.";
  const mailtoUrl = `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

function ReviewCards() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <div key={i} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-5 text-lg leading-relaxed text-slate-700">“{review.quote}”</p>
          <div className="mt-6 text-sm font-medium text-slate-500">{review.name}</div>
        </div>
      ))}
    </div>
  );
}

function ContactPanel() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] bg-sky-800 p-8 text-white shadow-xl md:p-10">
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">
            Contact
          </div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Need plumbing help in Sydney?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-sky-50/90">
            Call now for urgent plumbing help or send through an enquiry and we’ll get back to you as soon as possible.
          </p>
          <div className="mt-8 space-y-4 text-sky-50">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <a href="tel:0414248131" className="hover:underline">
                0414 248 131
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <a href="mailto:paul@fixitnowplumbing.com.au" className="hover:underline">
                paul@fixitnowplumbing.com.au
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <a
                href="https://www.google.com/maps/place/Plumber+Northern+Beaches+@+Fix+It+Now+Plumbing/@-33.6720467,151.2620779,12z/data=!3m1!4b1!4m6!3m5!1s0x6b12a542a9d25031:0xdebe3731c81deb0b!8m2!3d-33.6720468!4d151.2620779!16s%2Fg%2F11xl8trtt?entry=ttu&g_ep=EgoyMDI2MDQxNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Sydney Wide Plumbing Service Area
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="text-2xl font-bold text-slate-900">Send an enquiry</div>
          <form onSubmit={(event) => handleEnquirySubmit(event, "Website enquiry")} className="mt-6 space-y-4">
            <input
              name="Name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
              placeholder="Name"
            />
            <input
              name="Phone"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
              placeholder="Phone"
            />
            <input
              name="Email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
              placeholder="Email"
            />
            <input
              name="Address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
              placeholder="Address"
            />
            <textarea
              name="Message"
              className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
              placeholder="Message"
            />
            <button type="submit" className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function HomePage({ goTo }: { goTo: (page: PageKey) => void }) {
  const guaranteeItems = [
    "You will always speak to a plumber — no inexperienced call centre staff",
    "Upfront prices with no surprises",
    "100% materials and workmanship guarantee",
    "Qualified, experienced, fully licensed and insured plumbers",
    "A call 30 minutes prior to arrival so you are not waiting unnecessarily",
    "Honest advice and up-to-date information from polite, friendly tradesmen",
    "Your property left cleaner than before the job",
    "Easy payment options with credit card, EFTPOS, direct deposit and cash",
    "Reliability — we mean what we say",
  ];

  const pricingSteps = [
    "An assessment fee is payable for attending your property and reviewing your situation",
    "You receive an obligation-free fixed price before work begins",
    "With your approval, we fix it now",
  ];

  const homeServices = [
    "Emergency plumbing 24 hours, 7 days",
    "Blocked drains and CCTV diagnostics",
    "Leaking taps and toilets",
    "Burst pipe and leak repairs",
    "Hot water repairs and replacements",
    "Gasfitting and gas installations",
    "Dishwasher and water filter installs",
    "Noisy or hammering pipes",
    "Bathroom, kitchen and laundry plumbing",
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Plumber working on site" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/45" />
        </div>

        <div className="absolute left-6 top-6 z-10 rounded-2xl border border-white/40 bg-slate-900/70 px-4 py-3 text-white shadow-lg backdrop-blur">
          <div className="flex gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <div className="mt-2 text-sm font-semibold">20+ years in business</div>
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              Licensed local plumbers serving Sydney's Northern Beaches
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
              Fast, reliable plumbing done right the first time.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100">
              From emergency leaks and blocked drains to hot water repairs and ongoing maintenance, Fix It Now Plumbing delivers prompt service, upfront communication, and workmanship you can trust.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => goTo("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-4 font-semibold text-white hover:bg-sky-700"
              >
                Request a Quote
                <ChevronRight className="h-4 w-4" />
              </button>
              <a
                href="tel:0414248131"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-sky-800"
              >
                <Phone className="h-4 w-4" />
                Call 0414 248 131
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">5.0</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2 text-slate-900 shadow">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  className="h-4"
                />
                <span className="text-sm font-medium">Trusted Sydney's Northern Beaches plumbing service</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-7">
            <div className="text-2xl font-bold text-slate-900">Request a plumbing quote</div>
            <p className="mt-2 text-slate-600">Tell us what you need and we’ll get back to you quickly with clear next steps.</p>
            <form onSubmit={(event) => handleEnquirySubmit(event, "Request a plumbing quote")} className="mt-6 space-y-4">
              <input
                name="Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
                placeholder="Name"
              />
              <input
                name="Phone"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
                placeholder="Phone"
              />
              <input
                name="Email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
                placeholder="Email"
              />
              <textarea
                name="Message"
                className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600"
                placeholder="Tell us what plumbing help you need"
              />
              <button type="submit" className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
          {[
            "Upfront, honest advice and pricing",
            "Rapid response for urgent callouts",
            "Residential, strata & small business",
            "Quality workmanship, every job",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-sky-700" />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Fix It Now Plumbing"
          title="Family owned, fully licensed, and available for urgent plumbing work"
          text="Fix It Now Plumbing is built on repeat customers and referrals, with genuine 24/7 emergency plumbing support and clear communication from start to finish."
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {homeServices.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                <span className="font-medium text-slate-800">{item}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <h3 className="text-3xl font-bold tracking-tight text-slate-900">Our service guarantee</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {guaranteeItems.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">Our pricing guarantee</h3>
            <p className="mt-4 text-slate-600">
              We keep pricing simple and transparent so you can approve work with confidence before we begin.
            </p>
            <div className="mt-6 space-y-3">
              {pricingSteps.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-4">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-sky-200 bg-sky-50 p-8 shadow-sm">
            <h3 className="text-3xl font-bold tracking-tight text-slate-900">Need a plumber now?</h3>
            <p className="mt-4 text-slate-700">
              For emergency plumbing, blocked drains, burst pipes or urgent hot water problems, call now and speak directly with a licensed plumber.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:0414248131"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800"
              >
                <Phone className="h-4 w-4" />
                Call 0414 248 131
              </a>
              <button
                onClick={() => goTo("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Request a quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  const features = [
    { label: "Licensed plumbing support", icon: ShieldCheck },
    { label: "Prompt local response", icon: Clock3 },
    { label: "Drainage and leak expertise", icon: Droplets },
    { label: "Friendly family-run service", icon: Home },
  ];

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <SectionHeading eyebrow="About us" title="You can rely on us for plumbing emergencies and everyday repairs" />
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
          <p>
            Fix It Now Plumbing is a family owned and 20+ year operated business built on referrals from our always impressed repeat customers. We’re here to help you with any plumbing services you may require including fixing a blocked drain; repairing leaking taps & toilets; a burst pipe, hot water problems, gasfitting and gas installations, dishwasher or waterfilter installations, noisy or hammering pipes, bathroom plumbing, kitchen plumbing, laundry plumbing and many more including emergency plumbing 24 hours a day, 7 days a week!
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={feature.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <FeatureIcon className="h-5 w-5 text-sky-700" />
                <span className="font-medium text-slate-800">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <img src={aboutImage} alt="Plumbing tools and fittings" className="h-[520px] w-full rounded-[2rem] object-cover shadow-xl" />
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/92 p-5 shadow-lg backdrop-blur">
          <div className="text-lg font-bold text-slate-900">Local, established and easy to contact</div>
          <p className="mt-2 text-slate-600">
            You can rely on us for plumbing emergencies and everyday repairs.
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ goTo }: { goTo: (page: PageKey) => void }) {
  return (
    <>
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Services"
            title="Professional plumbing services across Sydney"
            text="We provide a complete range of plumbing services, with clear pricing, fast response times and dependable workmanship you can trust."
          />

          <div className="mt-12 space-y-8">
            {serviceRows.map((service) => {
              const ServiceIcon = service.icon;
              return (
                <div key={service.title} className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                  <div>
                    <img src={service.image} alt={service.title} className="h-[320px] w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="inline-flex items-center gap-2 font-semibold text-sky-700">
                      <ServiceIcon className="h-5 w-5" />
                      Fix It Now Plumbing
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight">{service.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{service.desc}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => goTo(service.key)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
                      >
                        View page
                      </button>
                      <a
                        href="tel:0414248131"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800"
                      >
                        <Phone className="h-4 w-4" />
                        Call now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="More services"
              title="Choose a trusted local plumber"
              text="We cover all aspects of plumbing, so you only need one reliable team for every job around your home or business."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceList.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <CheckCircle2 className="h-4 w-4 text-sky-700" />
                <span className="font-medium text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceDetailPage({
  title,
  image,
  intro,
  points,
}: {
  title: string;
  image: string;
  intro: string;
  points: string[];
}) {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading eyebrow="Service page" title={title} text={intro} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                  <CheckCircle2 className="h-4 w-4 text-sky-700" />
                  <span className="font-medium text-slate-800">{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="tel:0414248131" className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">
                <Phone className="h-4 w-4" />
                Call 0414 248 131
              </a>
              <a href="mailto:paul@fixitnowplumbing.com.au" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-800">
                <Mail className="h-4 w-4" />
                Email Paul
              </a>
            </div>
          </div>
          <img src={image} alt={title} className="h-[480px] w-full rounded-[2rem] object-cover shadow-xl" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Why choose us" title={`Why customers choose us for ${title.toLowerCase()}`} />
        <ReviewCards />
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Gallery"
            title="Recent plumbing work and job gallery"
            text="Thank you for visiting the Fix It Now Plumbing Gallery Page. Here are some pictures of the jobs completed regularly!"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
                <div className="p-5">
                  <div className="text-lg font-semibold text-slate-900">{item.title}</div>
                  <div className="mt-2 text-sm text-slate-500">Fix It Now Plumbing</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Why it matters"
          title="Real plumbing work, completed by our team"
          text="This gallery shows the type of practical, day-to-day plumbing work we complete for local homes and businesses — helping customers see the quality and range of our services before they call."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            "Builds trust before the phone rings",
            "Shows real job variety and experience",
            "Makes the website feel more established",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-700">
              <div className="flex items-center gap-3 font-medium">
                <CheckCircle2 className="h-4 w-4 text-sky-700" />
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function EmergencyPage() {
  const emergencySupportPoints = [
    "Genuine 24/7 emergency plumbing, 365 days a year",
    "Emergency plumber on standby for urgent call-outs",
    "Experienced, qualified, licensed and insured plumbers",
    "Fully stocked vehicles ready to respond",
    "Direct access to a licensed plumber when you call",
    "Sydney metro coverage across key service areas",
  ];

  const emergencyJobs = [
    "Blocked drains",
    "Burst pipes",
    "No hot water",
    "Burst hot water units",
    "Taps that cannot be turned off",
    "Gas leak emergencies",
  ];

  const emergencyPromise = [
    "You always speak to a plumber — no inexperienced call centre staff",
    "Upfront prices with no surprises",
    "100% materials and workmanship guarantee",
    "Same day service whenever possible",
    "A call 30 minutes before arrival so you are not waiting around",
    "Honest advice from polite, friendly tradesmen",
    "Your property left cleaner than before the job",
    "Easy payment options: credit card, EFTPOS, direct deposit and cash",
  ];

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Emergency"
            title="24/7 Emergency Plumber Northern Beaches"
            text="Need an emergency plumber right now? We provide a genuine 24-hour emergency plumbing service with licensed plumbers on standby."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {emergencySupportPoints.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
                <CheckCircle2 className="h-4 w-4 text-sky-700" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-sky-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">Emergency plumbing service 24 hours</h3>
            <p className="mt-4 leading-relaxed text-slate-700">
              We know plumbing emergencies do not always happen during normal business hours. If you are dealing with an urgent
              issue, call us and speak directly with a licensed plumber who can help you take the right next step.
            </p>
            <p className="mt-4 leading-relaxed text-slate-700">
              In some situations we can talk you through immediate actions over the phone and schedule the best follow-up time,
              helping you avoid unnecessary after-hours costs where possible.
            </p>
          </div>

          <div className="mt-10 flex gap-4">
            <a
              href="tel:0414248131"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800"
            >
              <Phone className="h-4 w-4" />
              Call 0414 248 131
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Common urgent jobs"
          title="Emergency plumbing issues we handle"
          text="If your situation is urgent and causing damage, risk, or loss of service, we can help quickly."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {emergencyJobs.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                <span className="font-medium text-slate-800">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Why call us now"
            title="Whatever your emergency plumbing needs"
            text="You get fast support, clear communication and a reliable process from first call to completed repair."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {emergencyPromise.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Reviews" title="Reliable emergency plumbing when it matters most" />
        <ReviewCards />
      </section>
    </>
  );
}

function GuaranteePage() {
  const guaranteePoints = [
    "You will always speak to a plumber — no inexperienced call centre staff",
    "Upfront prices with no surprises",
    "100% materials and workmanship guarantee",
    "Qualified, experienced, fully licensed and insured plumbers",
    "Same day service",
    "A call 30 minutes prior to arrival so you are not waiting unnecessarily",
    "Honest advice and up-to-date information from polite, friendly tradesmen",
    "Your property left cleaner than before the job",
    "Easy payment options with credit card, EFTPOS, direct deposit and cash",
  ];

  const pricingPoints = [
    "An assessment fee is payable for attending your property and reviewing your situation",
    "You receive an obligation-free fixed price before work begins",
    "With your approval, we fix it now",
  ];

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Guarantee"
            title="Plumbing Guarantee"
            text="For your peace of mind, Fix It Now Plumbing offers both a service guarantee and a pricing guarantee so you know exactly what to expect."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guaranteePoints.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Pricing Guarantee"
          title="Clear pricing before any work starts"
          text="To keep things easy and upfront, we provide a fixed-price approach after assessment so you can approve the work with confidence."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricingPoints.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                <span className="font-medium text-slate-800">{item}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:0414248131"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800"
          >
            <Phone className="h-4 w-4" />
            Call 0414 248 131
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-800"
          >
            Back to top
          </button>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return <ContactPanel />;
}

function TermsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Legal"
        title="Terms & Conditions"
        text="These terms and conditions apply to plumbing services provided by Fix It Now Plumbing."
      />

      <div className="mt-10 space-y-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">General</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            By booking or using our services, you agree to these terms and conditions. Fix It Now Plumbing provides plumbing, drainage, maintenance and related services across Sydney and surrounding areas.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Quotes and pricing</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Any quote provided is based on the information available at the time. If additional faults, hidden defects or extra labour and materials are required once work begins, pricing may change. Any variation will be explained where reasonably possible before extra work proceeds.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Payment terms</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Payment is due on completion unless otherwise agreed in writing. We may request deposits for larger jobs, special-order materials or scheduled installation work. Late payments may incur reasonable recovery costs or fees where permitted.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Access and site conditions</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Customers must provide safe and reasonable access to the work area. We are not responsible for delays or additional costs caused by restricted access, unsafe conditions, concealed pipework, asbestos, structural issues or other site conditions outside our control.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Cancellations and call-outs</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            Reasonable notice is required for cancellations or rescheduling. Missed appointments, late cancellations or emergency call-outs that cannot proceed on arrival may incur a call-out fee or time charge.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Warranty</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            We stand by our workmanship and will address issues directly related to our labour within a reasonable period, subject to Australian Consumer Law. This does not cover misuse, lack of maintenance, fair wear and tear, third-party work, manufacturer faults or pre-existing issues beyond our control.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Liability</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            To the extent permitted by law, our liability is limited to the cost of re-supplying the services or repairing defects in our workmanship. We are not liable for indirect or consequential loss, or for problems caused by pre-existing defects, ageing infrastructure, hidden failures or customer-supplied materials.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">Contact</h3>
          <p className="mt-3 leading-relaxed text-slate-600">
            For any questions about these terms and conditions, please contact Fix It Now Plumbing by phone on 0414 248 131 or email at paul@fixitnowplumbing.com.au.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function NorthernBeachesPlumberDemo() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!servicesMenuRef.current) return;
      if (!servicesMenuRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const changePage = (page: PageKey) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setServicesOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-sky-700 text-sm text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Sydney Wide Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              <span>Emergency plumbing available</span>
            </div>
          </div>
          <a href="tel:0414248131" className="font-semibold hover:underline">
            Call: 0414 248 131
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <button onClick={() => changePage("home")} className="text-left" aria-label="Fix It Now Plumbing home">
            <img src={fixItNowLogo} alt="Fix It Now Plumbing logo" className="h-14 w-auto md:h-16" />
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <button onClick={() => changePage("home")} className="hover:text-sky-700">
              Home
            </button>
            <button onClick={() => changePage("about")} className="hover:text-sky-700">
              About
            </button>

            <div className="relative" ref={servicesMenuRef}>
              <button
                onClick={() => setServicesOpen((value) => !value)}
                className="inline-flex items-center gap-1 hover:text-sky-700"
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : "rotate-0"}`}
                />
              </button>
              {servicesOpen ? (
                <div
                  className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg"
                  role="menu"
                >
                  <button
                    onClick={() => changePage("services")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    All Services
                  </button>
                  <button
                    onClick={() => changePage("emergency")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Emergency Plumber
                  </button>
                  <button
                    onClick={() => changePage("blocked-drains")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Blocked Drains
                  </button>
                  <button
                    onClick={() => changePage("hot-water")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Hot Water
                  </button>
                  <button
                    onClick={() => changePage("taps-toilets")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Taps & Toilets
                  </button>
                  <button
                    onClick={() => changePage("burst-pipes")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Burst Pipes
                  </button>
                  <button
                    onClick={() => changePage("gas-fitting")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Gas Fitting
                  </button>
                  <button
                    onClick={() => changePage("kitchen-plumbing")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Kitchen Plumbing
                  </button>
                  <button
                    onClick={() => changePage("bathroom-plumbing")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Bathroom Plumbing
                  </button>
                  <button
                    onClick={() => changePage("laundry-plumbing")}
                    className="block w-full px-4 py-3 text-left hover:bg-slate-50"
                    role="menuitem"
                  >
                    Laundry Plumbing
                  </button>
                </div>
              ) : null}
            </div>
            <button onClick={() => changePage("guarantee")} className="hover:text-sky-700">
              Guarantee
            </button>

            <button onClick={() => changePage("gallery")} className="hover:text-sky-700">
              Gallery
            </button>
            <button onClick={() => changePage("contact")} className="hover:text-sky-700">
              Contact Us
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:0414248131"
              className="hidden items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-800 md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              0414 248 131
            </a>
            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex rounded-xl border border-slate-300 p-3 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {mobileNavItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => changePage(item.key)}
                  className={`rounded-xl px-3 py-2 text-left font-medium ${
                    currentPage === item.key ? "bg-sky-50 text-sky-700" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      {currentPage === "home" ? <HomePage goTo={changePage} /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "services" ? <ServicesPage goTo={changePage} /> : null}
      {currentPage === "gallery" ? <GalleryPage /> : null}
      {currentPage === "blocked-drains" ? (
        <>
          <ServiceDetailPage
            title="Blocked Drains"
            image="https://www.obrien.com.au/wp-content/uploads/2025/03/A-Plumber-Cleaning-A-Blocked-Drain.jpg"
            intro="Blocked drains can quickly turn into a messy, disruptive problem. We diagnose the cause properly using modern equipment and clear drains fast so your plumbing is back to normal as soon as possible."
            points={[
              "Kitchen, bathroom & stormwater blockages",
              "CCTV drain camera inspections",
              "Pipe locating & accurate fault finding",
              "High pressure drain cleaning",
              "Tree root & severe blockage removal",
              "Long-term solutions to prevent reoccurrence",
            ]}
          />

          <section className="mx-auto max-w-7xl px-6 py-20">
            <SectionHeading
              eyebrow="Why choose us"
              title="Northern Beaches blocked drain specialists"
              text="We combine experience, proper equipment and honest service to fix blocked drains properly the first time."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                "Speak directly to a qualified plumber",
                "Upfront pricing with no surprises",
                "Fully licensed & insured professionals",
                "24/7 emergency plumbing available",
                "We call before arrival so you're not waiting",
                "We leave your property clean",
                "Friendly, honest advice every time",
                "Multiple payment options available",
                "Reliable service you can trust",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-sky-700" />
                    <span className="font-medium">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-20">
            <SectionHeading eyebrow="How we fix it" title="Our blocked drain process" />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "1. Inspection",
                  text: "We use CCTV drain cameras to inspect inside your pipes and find the exact cause of the blockage.",
                },
                {
                  title: "2. Locate",
                  text: "Pipe locating equipment pinpoints the exact location and depth of the issue.",
                },
                {
                  title: "3. Clear",
                  text: "High pressure jetting or specialised tools are used to completely remove the blockage.",
                },
                {
                  title: "4. Confirm",
                  text: "We re-check the drain with cameras to make sure the problem is fully resolved.",
                },
                {
                  title: "5. Prevent",
                  text: "We give honest advice and solutions to stop the issue from happening again.",
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="font-bold text-slate-900">{step.title}</div>
                  <p className="mt-2 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : null}
      {currentPage === "hot-water" ? (
        <ServiceDetailPage
          title="Hot Water Repairs"
          image="https://sydneyhotwatersystems.com.au/wp-content/uploads/2026/04/Is-It-Time-to-Replace-Your-Hot-Water-Unit-Signs-Repair-Wont-Cut-It.jpg"
          intro="No hot water is never convenient. We repair, replace and install hot water systems with a focus on fast service and dependable workmanship."
          points={[
            "Hot water fault finding",
            "System replacements and installs",
            "Gas and electric hot water support",
            "Fast response across Sydney",
          ]}
        />
      ) : null}
      {currentPage === "taps-toilets" ? (
        <ServiceDetailPage
          title="Taps & Toilets"
          image="https://reedplumbingsolutions.com.au/wp-content/uploads/2021/03/What-is-preventative-maintenance-1024x683.webp"
          intro="Leaking taps and toilet problems waste water and quickly become frustrating. We repair and replace taps, cisterns, valves and toilet components to get everything running properly again."
          points={[
            "Leaking tap and mixer repairs",
            "Running, noisy or overflowing toilet fixes",
            "Tap washers, cartridges and valve replacements",
            "Toilet pan and cistern fault diagnosis",
            "Upfront fixed-price options before work starts",
            "Licensed, insured plumbers and tidy workmanship",
          ]}
        />
      ) : null}
      {currentPage === "burst-pipes" ? (
        <ServiceDetailPage
          title="Burst Pipes"
          image="https://northeastplumbing.com.au/wp-content/uploads/2024/09/Burst-pipe-causes.jpg"
          intro="A burst or leaking pipe can cause serious water damage fast. Our team provides urgent isolation, fault finding and durable repairs to protect your property and restore your plumbing."
          points={[
            "Rapid response for burst and leaking pipes",
            "Pipe isolation and damage control",
            "Accurate leak location and repair",
            "Replacement of damaged pipe sections",
            "Emergency support available 24/7",
            "Honest advice to reduce repeat failures",
          ]}
        />
      ) : null}
      {currentPage === "gas-fitting" ? (
        <ServiceDetailPage
          title="Gas Fitting"
          image="https://trueflowplumbing.net.au/wp-content/uploads/2024/09/Install-gas-line.jpg"
          intro="Fix It Now Plumbing provides licensed gas fitting and gas installation services for homes and small businesses, with safety, compliance and clear communication at every step."
          points={[
            "Licensed gas fitting and compliance-focused work",
            "Gas appliance and line installations",
            "Gas leak investigation and rectification",
            "Safe connection, testing and commissioning",
            "Upfront pricing with no surprises",
            "Qualified, experienced and insured plumbers",
          ]}
        />
      ) : null}
      {currentPage === "kitchen-plumbing" ? (
        <ServiceDetailPage
          title="Kitchen Plumbing"
          image="https://goldcoastplumbingexperts.com.au/wp-content/uploads/2023/10/plumber-under-new-sink-optimized.jpg"
          intro="From leaking sinks to dishwasher and water filter installations, we handle kitchen plumbing jobs quickly and properly so your kitchen stays practical and reliable."
          points={[
            "Sink, mixer and trap repairs",
            "Dishwasher and water filter installations",
            "Leaking pipe and fixture repairs",
            "Blocked kitchen waste line assistance",
            "Clear recommendations and practical solutions",
            "Property left clean at completion",
          ]}
        />
      ) : null}
      {currentPage === "bathroom-plumbing" ? (
        <ServiceDetailPage
          title="Bathroom Plumbing"
          image="https://www.empiretiles.com.au/wp-content/uploads/2025/06/Why-Sydney-Homeowners-Move-Bathroom-Plumbing-1024x683.jpg"
          intro="We provide dependable bathroom plumbing for leaks, fixture replacements and upgrades, delivered by licensed plumbers who respect your home and keep you informed."
          points={[
            "Shower, basin and toilet plumbing repairs",
            "Fixture replacement and upgrade support",
            "Drainage and leak fault finding",
            "Tapware and valve replacements",
            "Same-day service where available",
            "Friendly, polite and professional tradesmen",
          ]}
        />
      ) : null}
      {currentPage === "laundry-plumbing" ? (
        <ServiceDetailPage
          title="Laundry Plumbing"
          image="https://i.redd.it/f3t4nefn1ea61.jpg"
          intro="Need help with laundry plumbing? We repair and install taps, tubs, washing machine connections and drainage components to keep your laundry functioning properly."
          points={[
            "Laundry tub and tap repairs",
            "Washing machine hose and valve connections",
            "Laundry drain troubleshooting",
            "Pipework repairs and replacements",
            "Call 30 minutes prior to arrival",
            "Easy payment options available",
          ]}
        />
      ) : null}
      {currentPage === "guarantee" ? <GuaranteePage /> : null}
      {currentPage === "emergency" ? <EmergencyPage /> : null}
      {currentPage === "contact" ? <ContactPage /> : null}
      {currentPage === "terms" ? <TermsPage /> : null}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <img src={fixItNowLogo} alt="Fix It Now Plumbing logo" className="h-12 w-auto" />
            <div className="mt-1 text-sm text-slate-500">Sydney-wide plumbing service</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <a href="tel:0414248131" className="hover:text-sky-700">
              0414 248 131
            </a>
            <a href="mailto:paul@fixitnowplumbing.com.au" className="hover:text-sky-700">
              paul@fixitnowplumbing.com.au
            </a>
            <button onClick={() => changePage("terms")} className="hover:text-sky-700">
              Terms & Conditions
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
