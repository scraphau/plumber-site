import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
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

type PageKey =
  | "home"
  | "about"
  | "service-areas"
  | "services"
  | "testimonials"
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

const allPageKeys: readonly PageKey[] = [
  "home",
  "about",
  "service-areas",
  "services",
  "testimonials",
  "gallery",
  "blocked-drains",
  "hot-water",
  "emergency",
  "taps-toilets",
  "burst-pipes",
  "gas-fitting",
  "kitchen-plumbing",
  "bathroom-plumbing",
  "laundry-plumbing",
  "guarantee",
  "contact",
  "terms",
] as const;

const heroImage =
  "https://cdn.seeklearning.com.au/media/images/career-guide/module/plumber-module.jpg";
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
    title: "Broken stormwater pipe Davidson",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Broken%20stormwaer%20pipe%20Davidson%20sml.jpg",
  },
  {
    title: "Rusted flexible hose replacement",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Rusted%20flexible%20hose%20to%20be%20replaced%20before%20it%20burst.jpg",
  },
  {
    title: "Stormwater Elanora Heights",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Stormwater%20Elanora%20Heights%203.jpg",
  },
  {
    title: "Mona Vale burst pipe",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Mona%20Vale%20Burst%20Pipe.jpg",
  },
  {
    title: "Blocked drain tree roots broken pipe",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Blocked%20drain%20tree%20roots%20broken%20pipe.jpg",
  },
  {
    title: "Cromer blocked drain tree roots removed",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Cromer%20Blocked%20Drain%20Tree%20Roots%20Removed.JPG",
  },
  {
    title: "Broken stormwater pipes in Davidson",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/broken%20stormwater%20pipes%20in%20Davidson%20needing%20plumber.jpg",
  },
  {
    title: "New bathroom Chatswood",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/New%20Bathroom%20Chatswood.jpg",
  },
  {
    title: "Leaking pipe plumber",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Leaking%20pipe%20plumber.jpg",
  },
  {
    title: "Broken pipe",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Broken%20pipe.jpg",
  },
  {
    title: "Narrabeen blocked drain",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Narrabeen%20Blocked%20Drain.jpg",
  },
  {
    title: "Bilgolah Plateau kitchen renovation",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Bilgolah%20Plateau%20kitchen%20renovation.JPG",
  },
  {
    title: "Blocked drain sewer Collaroy Plateau",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Blocked%20Drain%20Sewer%20Collaroy%20Plateau%20Plumber.JPG",
  },
  {
    title: "Mona Vale kitchen renovation",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Mona%20Vale%20Kitchen%20Renovation.JPG",
  },
  {
    title: "Blocked drain Brookvale 2",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Blocked%20Drain%20Brookvale%202.jpg",
  },
  {
    title: "Cromer blocked drain tree roots 2",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Cromer%20Blocked%20Drain%20Tree%20Roots%202.jpg",
  },
  {
    title: "Warriewood new shower rail",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Warriewood%20new%20shower%20rail.JPG",
  },
  {
    title: "Belrose dripping taps",
    image: "https://www.fixitnowplumbing.com.au/wp-content/uploads/photo-gallery/thumb/Belrose%20dripping%20taps.jpg",
  },
] as const;

const northernBeachesSuburbs = [
  "Allambie Heights",
  "Avalon",
  "Balgowlah Heights",
  "Bayview",
  "Beacon Hill",
  "Bilgola",
  "Brookvale",
  "Bungan Head",
  "Careel Bay",
  "Church Point",
  "Clareville",
  "Clontarf",
  "Collaroy",
  "Collaroy Plateau",
  "Cromer",
  "Cromer Heights",
  "Curl Curl",
  "Dee Why",
  "Elanora Heights",
  "Fairlight",
  "Harbord",
  "Ingleside",
  "Manly",
  "Manly Vale",
  "Mona Vale",
  "Narrabeen",
  "Narraweena",
  "Newport",
  "North Curl Curl",
  "North Manly",
  "North Narrabeen",
  "Oxford Falls",
  "Palm Beach",
  "Queenscliff",
  "Seaforth",
  "Warriewood",
  "Whale Beach",
  "Wheeler Heights",
] as const;

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

function pageToHref(page: PageKey) {
  return page === "home" ? "/" : `/#/${page}`;
}

function isPlainLeftClick(event: ReactMouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function PageAnchor({
  page,
  className,
  children,
  onNavigate,
  role,
  ...anchorProps
}: {
  page: PageKey;
  className?: string;
  children: ReactNode;
  onNavigate: (page: PageKey) => void;
  role?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick" | "children">) {
  return (
    <a
      href={pageToHref(page)}
      className={className}
      role={role}
      {...anchorProps}
      onClick={(event) => {
        if (event.defaultPrevented || !isPlainLeftClick(event)) return;
        event.preventDefault();
        onNavigate(page);
      }}
    >
      {children}
    </a>
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
                Northen Beaches Wide Plumbing Service Area
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

  const faqs = [
    {
      question: "Why do I hear a hammering noise everytime I turn off my taps ?",
      answer:
        "This can be caused by many factors from unsecured pipework, jumping washers or high water pressure just to name a few. Its best we have a highly recognized and qualified technician come out to inspect and Identify.",
    },
    {
      question: "Why do my taps keep leaking ?",
      answer:
        "Leaking taps arn’t only annoying to hear while your trying to get some quality rest and sleep but can also put a large dent in your pocket ! that could be thousands of liters a year which can ultimately result in hundreds or thousands of dollars from your pocket each year. This issue can arise from worn out seals and washers. Give us a call to have a highly qualified technician fix your leaking taps or pipes.",
    },
    {
      question: "Why is my Water or Gas bill so high ?",
      answer:
        "Having an unusually high gas or water bill could be a result of some serious issues. These can be leaking pipes, valves and fittings. sometimes we don’t notice them because they are under ground or behind walls. contact us now to have one of our qualified technicians rectify your issue.",
    },
    {
      question: "Why are my walls mouldy and have a funky smell ?",
      answer:
        "This could be for a number of reasons. to name a few common issues relating are..\n\n• Leaking pipes.\n• leaking roof flashings.\n• failed waterproofing membrane in bathrooms.\n\nContact us now to solve these issues before they get worse.",
    },
    {
      question: "Why isnt my hot water hot enough anymore ?",
      answer:
        "Most times if your hot water isn’t as hot as it used to be then there's usually an issue causing it. This can range from a old hot water heater which needs servicing and replacing anodes, thermostats and tempering valves. also inadequate water pressure can be a major factor contributing to low water temperature as well as under sized pipework.\n\nContact us now to have a licensed and qualified technician resolve your cold shoulder.",
    },
  ] as const;

  const featuredHomeReviews = [
    {
      name: "Sarah",
      location: "Avalon, NSW",
      quote:
        "I have used Paul for plumbing services for over ten years now and he has always provided a great service ranging from tap replacement to external drainage issues earlier this year. Paul is very honest and helpful in providing advice and solutions and I would recommend his services.",
      cardClass: "bg-[#15659a] text-white",
      starClass: "text-white",
      nameClass: "text-white",
      locationClass: "text-white",
      quoteClass: "text-white",
    },
    {
      name: "Scott",
      location: "Narrabeen, NSW",
      quote:
        "Paul from Fix It Now Plumbing has completed several plumbing jobs at our home over the past 5 years including the clearing of blocked drains, new taps and hot water systems. Paul is reliable, honest and professional and has always provided high quality work and solutions for us. I would strongly recommend Paul to anyone requiring a reliable quality plumber on the Northern Beaches.",
      cardClass: "bg-slate-100 text-[#454545]",
      starClass: "text-sky-700",
      nameClass: "text-[#101218]",
      locationClass: "text-[#454545]",
      quoteClass: "text-[#454545]",
    },
    {
      name: "Lauren",
      location: "Dee Why, NSW",
      quote:
        "We can’t speak more highly of our experience with Paul. He responded to our enquiry quickly and squeezed us in the next day (lifesaver!). Paul was very clear and competitive with his quote and completed the job faster than we anticipated. We’ll definitely be in touch for upcoming renovations!",
      cardClass: "bg-[#15659a] text-white",
      starClass: "text-white",
      nameClass: "text-white",
      locationClass: "text-white",
      quoteClass: "text-white",
    },
  ] as const;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Plumber working on site" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/45" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-8 px-6 py-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <div className="inline-flex flex-col rounded-2xl border border-white/40 bg-slate-900/70 px-5 py-3 text-white shadow-lg backdrop-blur">
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="mt-2 text-sm font-semibold">20+ years in business</div>
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              Fast, reliable plumbing done right the first time.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-100">
              From emergency leaks and blocked drains to hot water repairs and ongoing maintenance, Fix It Now Plumbing delivers prompt service, upfront communication, and workmanship you can trust.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <PageAnchor
                page="contact"
                onNavigate={goTo}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-4 font-semibold text-white hover:bg-sky-700"
              >
                Request a Quote
                <ChevronRight className="h-4 w-4" />
              </PageAnchor>
              <a
                href="tel:0414248131"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-sky-800"
              >
                <Phone className="h-4 w-4" />
                Call 0414 248 131
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-white">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl md:p-6">
            <div className="text-xl font-bold text-slate-900 md:text-2xl">Request a plumbing quote</div>
            <p className="mt-2 text-slate-600">Tell us what you need and we’ll get back to you quickly with clear next steps.</p>
            <form onSubmit={(event) => handleEnquirySubmit(event, "Request a plumbing quote")} className="mt-5 space-y-3">
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
              <PageAnchor
                page="contact"
                onNavigate={goTo}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Request a quote
              </PageAnchor>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Customer Reviews</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredHomeReviews.map((review) => (
              <div
                key={`${review.name}-${review.location}`}
                className={`flex flex-col items-center rounded-2xl border border-slate-200 p-6 text-center antialiased shadow-sm md:p-8 ${review.cardClass}`}
              >
                <div className={`mx-auto flex items-center justify-center gap-1 text-2xl leading-none ${review.starClass}`}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>
                <div className={`mt-5 text-[17px] font-semibold tracking-tight font-['Archivo'] ${review.nameClass}`}>{review.name}</div>
                <div className={`mt-2 text-[17px] font-medium font-['Montserrat',sans-serif] ${review.locationClass}`}>{review.location}</div>
                <p className={`mt-6 text-center text-[17px] font-normal leading-relaxed font-['Montserrat',sans-serif] ${review.quoteClass}`}>“{review.quote}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-start gap-6 lg:grid-cols-2">
            <div className="h-[560px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <img
                src="https://www.yourhome.gov.au/sites/default/files/inline-images/E_Hot%20water_11_0.jpg"
                alt="Hot water system and plumbing pipes"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-blue-300 bg-sky-700 text-white shadow-xl">
              <div className="border-b border-white/30 px-5 py-6 md:px-6">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Frequently Asked Questions</h2>
              </div>

              <div>
                {faqs.map((faq, index) => {
                  const isOpen = openFaqIndex === index;

                  return (
                    <div key={faq.question} className="border-b border-white/30 last:border-b-0">
                      <button
                        onClick={() => setOpenFaqIndex((prev) => (prev === index ? null : index))}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
                        aria-expanded={isOpen}
                      >
                        <span className="text-lg font-bold md:text-xl">{faq.question}</span>
                        <ChevronRight className={`h-5 w-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-90" : "rotate-0"}`} />
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 md:px-6">
                            <p className="whitespace-pre-line text-sm leading-relaxed text-white/95 md:text-base">{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
                      <PageAnchor
                        page={service.key}
                        onNavigate={goTo}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
                      >
                        View page
                      </PageAnchor>
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
              <div key={item.title} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
                <img src={item.image} alt={item.title} className="h-72 w-full object-contain" />
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

function TestimonialsPage() {
  const testimonials = [
    {
      quote:
        "I have used Paul for plumbing services for over ten years now and he has always provided a great service ranging from tap replacement to external drainage issues earlier this year. Paul is very honest and helpful in providing advice and solutions and I would recommend his services.",
      name: "Sarah J",
      location: "Avalon",
    },
    {
      quote:
        "Paul from Fix It Now Plumbing has completed several plumbing jobs at our home over the past 5 years including the clearing of blocked drains, new taps and hot water systems. Paul is reliable, honest and professional and has always provided high quality work and solutions for us. I would strongly recommend Paul to anyone requiring a reliable quality plumber on the Northern Beaches.",
      name: "Scott B",
      location: "Narrabeen",
    },
    {
      quote:
        "We can’t speak more highly of our experience with Paul. He responded to our enquiry quickly and squeezed us in the next day (lifesaver!). Paul was very clear and competitive with his quote and completed the job faster than we anticipated. We’ll definitely be in touch for upcoming renovations!",
      name: "Lauren C",
      location: "Dee Why",
    },
    {
      quote:
        "Paul is a fantastic plumber and a really friendly guy who I definitely would recommend to anyone. He has reliably helped me with a number of plumbing problems and improvements with three different houses over the past 7 years. I've had consistently high-quality service the whole time. What really stands out to me is a genuine interest in doing a really good job. If I have a question, he'll take the time to answer it in as much detail as I need. I can't fault his service in any way!",
      name: "Mark A",
      location: "Manly",
    },
    {
      quote:
        "I never have any hesitation contacting Paul whenever I have plumbing or drainage problems at my home in Wheeler Heights. He is an extremely reliable and honest guy who always arrives on time and ready to work. On separate visits Paul has repaired a water pump and two submersible pumps and on each occasion he has needed to improvise solutions to suit the problem at hand. I would recommend Paul to anyone seeking his expertise and services.",
      name: "Nick W",
      location: "Palm Beach",
    },
    {
      quote:
        "Paul was reliable, on time, and his quote was competitive. We had a new instantaneous hot water heater installed and upgraded our piping for the gas. Communication was great and he even came out quickly when we hit the water while digging a trench for the pipes. Would use him again.",
      name: "Karen M",
      location: "Bayview",
    },
  ];

  return (
    <section className="border-b border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="Customer reviews and feedback"
          text="See what customers are saying about their experience with Fix It Now Plumbing."
        />
        <div className="mt-8">
          <a
            href="https://www.google.com/search?q=fix+it+now+plumbing#lrd=0x6b12a542a9d25031:0xdebe3731c81deb0b,1,,,,"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white hover:bg-sky-800"
          >
            View all Google reviews
          </a>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div key={`${item.name}-${item.quote}`} className="rounded-[1.8rem] bg-slate-100 p-12 font-['Montserrat']">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-google-icon-svg-download-png-189824.png?f=webp&w=128"
                  alt="Google"
                  className="h-7 w-7 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="mt-6 text-[16px] font-semibold leading-relaxed text-[#101218]">“{item.quote}”</p>
              <div className="mt-8 flex items-center gap-3">
                <img
                  src="https://swpb.com.au/wp-content/uploads/2024/01/placeholder-1-1-1.png"
                  alt="Reviewer profile"
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="text-[14px] font-extrabold uppercase tracking-[0.15em] text-[#101218]">{item.name}</div>
                  <div className="text-[14px] font-medium leading-tight text-[#494B51]">from {item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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

function ServiceAreasPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <SectionHeading
              eyebrow="Service Areas"
              title="Northern Beaches plumbing service areas"
              text="Fix It Now Plumbing provides local plumbing support throughout Sydney’s Northern Beaches, including emergency callouts, blocked drains, hot water repairs, and general maintenance."
            />
            <p className="mt-6 max-w-4xl text-lg text-slate-600">
              We service homes and businesses right across the region and aim to provide fast, clear communication and reliable workmanship wherever you are based on the Northern Beaches.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-sky-600 bg-white shadow-sm">
            <img
              src="https://www.google.com/maps/vt/data=AuCy0KaAvPmueshM5i1Zb3rIQGKXbix2meJcmnkkbbVeWzJ-XxQYMO-IQVNn-t0E_Rc6ieSKUdK30GKayW7eeFlqYi1Ya74Zo8336TPKl4ekNZERvcar_M2M2vi4iFuxwJbGRrPEPUmDhwD2wMe6yQWZHk3XPGRKxttrbIVxfTYGmO-uI4FwA9fVXOZBRYF3LdkvyeIbMjOjf4himUH4JjgeoeNlqYtwrrB9SRNyhSwDQ5_LnfnC20vjqAwRZ5x9mZ3qMgi7GNQM7DQ54CK1SoH1nnWLrBqgb-Gu2Od1oZZh54_7mIC9qsQ"
              alt="Northern Beaches service area map"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Suburbs we service</h2>
            <p className="mt-3 text-slate-600">
              If your suburb is listed below, our team can help with prompt plumbing service.
            </p>
            <div className="mt-8 columns-1 gap-3 lg:columns-4">
              {northernBeachesSuburbs.map((suburb) => (
                <div
                  key={suburb}
                  className="mb-3 flex break-inside-avoid items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-slate-700"
                >
                  <MapPin className="h-4 w-4 text-sky-700" />
                  <span className="text-sm font-medium">{suburb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
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
            For any questions about these terms and conditions, please contact Fix It Now Plumbing by phone on{" "}
            <a href="tel:0414248131" className="text-sky-700 underline">
              0414 248 131
            </a>{" "}
            or email at {" "}
            <a href="mailto:paul@fixitnowplumbing.com.au" className="text-sky-700 underline">
              paul@fixitnowplumbing.com.au
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function NorthernBeachesPlumberDemo() {
  const getPageFromHash = () => {
    if (typeof window === "undefined") return "home" as PageKey;
    const hashPath = window.location.hash.replace(/^#\/?/, "");
    if (!hashPath) return "home" as PageKey;
    return (allPageKeys.includes(hashPath as PageKey) ? hashPath : "home") as PageKey;
  };

  const [currentPage, setCurrentPage] = useState<PageKey>(() => getPageFromHash());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearServicesCloseTimeout = () => {
    if (!servicesCloseTimeoutRef.current) return;
    clearTimeout(servicesCloseTimeoutRef.current);
    servicesCloseTimeoutRef.current = null;
  };

  const openServicesMenu = () => {
    clearServicesCloseTimeout();
    setServicesOpen(true);
  };

  const closeServicesMenuWithDelay = () => {
    clearServicesCloseTimeout();
    servicesCloseTimeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 500);
  };

  const toggleServicesMenu = () => {
    clearServicesCloseTimeout();
    setServicesOpen((value) => !value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!servicesMenuRef.current) return;
      if (!servicesMenuRef.current.contains(event.target as Node)) {
        clearServicesCloseTimeout();
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearServicesCloseTimeout();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncPageWithHash = () => {
      const nextPage = getPageFromHash();
      setCurrentPage(nextPage);
      setMobileMenuOpen(false);
      setMobileServicesOpen(false);
      setServicesOpen(false);
    };

    window.addEventListener("hashchange", syncPageWithHash);
    return () => {
      window.removeEventListener("hashchange", syncPageWithHash);
    };
  }, []);

  const changePage = (page: PageKey, updateHash = true) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
    if (typeof window !== "undefined") {
      if (updateHash) {
        window.history.pushState(null, "", pageToHref(page));
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-0 text-slate-900 md:pt-11">
      <div className="fixed left-0 right-0 top-0 z-40 hidden h-[54px] bg-sky-700 text-sm text-white shadow md:block">
        <div className="mx-auto flex h-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-0">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:0414248131" className="hover:underline">
                0414 248 131
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:paul@fixitnowplumbing.com.au" className="hover:underline">
                paul@fixitnowplumbing.com.au
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <a
                href="https://www.google.com/maps/place/Plumber+Northern+Beaches+@+Fix+It+Now+Plumbing/@-33.6720467,151.2620779,30023m/data=!3m2!1e3!4b1!4m6!3m5!1s0x6b12a542a9d25031:0xdebe3731c81deb0b!8m2!3d-33.6720468!4d151.2620779!16s%2Fg%2F11xl8trtt?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Sydney's Northern Beaches
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            <span>Emergency plumbing available</span>
          </div>
        </div>
      </div>

      <header className="relative sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur md:top-[54px] md:h-[123px]">
        <div className="mx-auto flex h-full w-full max-w-[92rem] items-center justify-between gap-4 px-4 py-4 md:gap-10 md:px-10 md:py-0">
          <PageAnchor page="home" onNavigate={changePage} className="text-left" aria-label="Fix It Now Plumbing home">
            <img
              src="https://www.fixitnowplumbing.com.au/wp-content/themes/fixitnow/images/logo.png"
              alt="Fix It Now Plumbing logo"
              className="h-10 w-auto md:h-16"
            />
          </PageAnchor>

          <nav className="hidden items-center gap-14 text-base font-semibold text-slate-700 md:flex">
            <PageAnchor page="home" onNavigate={changePage} className="hover:text-sky-700">
              Home
            </PageAnchor>
            <div
              className="relative"
              ref={servicesMenuRef}
              onMouseEnter={openServicesMenu}
              onMouseLeave={closeServicesMenuWithDelay}
            >
              <button
                onClick={toggleServicesMenu}
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
                  className="absolute left-0 top-full mt-2 w-56 rounded-xl border-4 border-sky-600 bg-white py-2 shadow-lg"
                  role="menu"
                >
                  <PageAnchor page="services" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    All Services
                  </PageAnchor>
                  <PageAnchor page="emergency" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Emergency Plumber
                  </PageAnchor>
                  <PageAnchor page="blocked-drains" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Blocked Drains
                  </PageAnchor>
                  <PageAnchor page="hot-water" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Hot Water
                  </PageAnchor>
                  <PageAnchor page="taps-toilets" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Taps & Toilets
                  </PageAnchor>
                  <PageAnchor page="burst-pipes" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Burst Pipes
                  </PageAnchor>
                  <PageAnchor page="gas-fitting" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Gas Fitting
                  </PageAnchor>
                  <PageAnchor page="kitchen-plumbing" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Kitchen Plumbing
                  </PageAnchor>
                  <PageAnchor page="bathroom-plumbing" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Bathroom Plumbing
                  </PageAnchor>
                  <PageAnchor page="laundry-plumbing" onNavigate={changePage} className="block w-full px-4 py-3 text-left hover:bg-slate-50" role="menuitem">
                    Laundry Plumbing
                  </PageAnchor>
                </div>
              ) : null}
            </div>
            <PageAnchor page="guarantee" onNavigate={changePage} className="hover:text-sky-700">
              Guarantee
            </PageAnchor>
            <PageAnchor page="testimonials" onNavigate={changePage} className="hover:text-sky-700">
              Testimonials
            </PageAnchor>
            <PageAnchor page="gallery" onNavigate={changePage} className="hover:text-sky-700">
              Gallery
            </PageAnchor>
            <PageAnchor page="about" onNavigate={changePage} className="hover:text-sky-700">
              About
            </PageAnchor>
            <PageAnchor page="contact" onNavigate={changePage} className="hover:text-sky-700">
              Contact Us
            </PageAnchor>
            <PageAnchor page="service-areas" onNavigate={changePage} className="hover:text-sky-700">
              Service Areas
            </PageAnchor>
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:0414248131" className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 md:hidden">
              <Phone className="h-5 w-5 text-sky-600" />
              0414 248 131
            </a>
            <a
              href="tel:0414248131"
              className="hidden items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-800 md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              0414 248 131
            </a>
            <button
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex rounded-xl p-1 text-sky-700 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-9 w-9" /> : <Menu className="h-9 w-9" />}
            </button>
          </div>
        </div>

        <div
          className={`absolute left-2 right-2 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-sky-700 bg-sky-700 text-white shadow-xl transition-all duration-500 ease-in-out md:hidden ${
            mobileMenuOpen ? "max-h-[75vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="h-[75vh] overflow-y-auto px-4 py-4">
            <div className="flex flex-col items-center justify-start gap-5 text-center">
              {[
                { key: "home" as const, label: "Home" },
                { key: "services" as const, label: "Services" },
                { key: "guarantee" as const, label: "Guarantee" },
                { key: "testimonials" as const, label: "Testimonials" },
                { key: "gallery" as const, label: "Gallery" },
                { key: "about" as const, label: "About Us" },
                { key: "contact" as const, label: "Contact Us" },
                { key: "service-areas" as const, label: "Service Areas" },
              ].map((item) =>
                item.key === "services" ? (
                  <div key={item.key} className="w-full">
                    <button
                      onClick={() => setMobileServicesOpen((value) => !value)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-lg font-medium text-white"
                    >
                      Services
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="mt-2 space-y-2 rounded-xl bg-sky-800/40 p-3 text-left">
                        {[
                          { key: "services" as const, label: "All Services" },
                          { key: "emergency" as const, label: "Emergency Plumber" },
                          { key: "blocked-drains" as const, label: "Blocked Drains" },
                          { key: "hot-water" as const, label: "Hot Water" },
                          { key: "taps-toilets" as const, label: "Taps & Toilets" },
                          { key: "burst-pipes" as const, label: "Burst Pipes" },
                          { key: "gas-fitting" as const, label: "Gas Fitting" },
                          { key: "kitchen-plumbing" as const, label: "Kitchen Plumbing" },
                          { key: "bathroom-plumbing" as const, label: "Bathroom Plumbing" },
                          { key: "laundry-plumbing" as const, label: "Laundry Plumbing" },
                        ].map((serviceItem) => (
                          <PageAnchor
                            key={serviceItem.key}
                            page={serviceItem.key}
                            onNavigate={changePage}
                            className="block w-full rounded-lg px-3 py-2 text-left text-base font-medium text-white hover:bg-white/10"
                          >
                            {serviceItem.label}
                          </PageAnchor>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                <PageAnchor
                  key={item.key}
                  page={item.key}
                  onNavigate={changePage}
                  className={`w-full rounded-xl px-3 py-3 font-medium text-lg ${
                    currentPage === item.key ? "bg-white/20 text-white" : "text-white"
                  }`}
                >
                  {item.label}
                </PageAnchor>
                ),
              )}
            </div>
          </div>
        </div>
      </header>

      {currentPage === "home" ? <HomePage goTo={changePage} /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "service-areas" ? <ServiceAreasPage /> : null}
      {currentPage === "services" ? <ServicesPage goTo={changePage} /> : null}
      {currentPage === "testimonials" ? <TestimonialsPage /> : null}
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
          intro="Looking for an experienced plumber for your kitchen plumbing? Do you want your job fixed now, done properly and competitively priced? Whether you are renovating your kitchen, a blocked drain, have a leaking tap, ba dishwasher to install or smelly old unused insinkerator to be removed, Fix It Now Plumbing are here to help you."
          points={[
            "Blocked Sink",
            "Mixer Tap Installations And Repairs",
            "Dripping Tap Repairs",
            "Gas Oven And Cook Top",
            "Dishwasher Connections",
            "Water Filters",
            "Insinkerator",
            "Leaks",
            "Smelly Drain",
            "Moving Pipes",
            "Arthritis Taps",
            "Burst Pipe Repairs",
            "Noisy Or Hammering Pipes",
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

      <footer className="bg-black text-white">
        <div className="mx-auto w-full max-w-[1350px] px-8 py-16 md:px-12">
          <div className="grid items-start gap-14 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr_1fr]">
            <div>
              <PageAnchor page="home" onNavigate={changePage} className="text-left" aria-label="Fix It Now Plumbing home">
                <img
                  src="https://www.fixitnowplumbing.com.au/wp-content/themes/fixitnow/images/logo.png"
                  alt="Fix It Now Plumbing logo"
                  className="h-24 w-auto rounded-lg bg-white p-3"
                />
              </PageAnchor>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-200">
                Family owned and 20+ year operated plumbing business helping Sydney’s Northern Beaches with reliable service, clear communication and quality workmanship.
              </p>
              <a
                href="https://www.facebook.com/FixItNowPlumbing/"
                target="_blank"
                rel="noreferrer"
                aria-label="Fix It Now Plumbing on Facebook"
                className="mt-5 inline-flex text-[44px] font-bold leading-none text-white hover:text-sky-300"
              >
                f
              </a>
            </div>

            <div>
              <h3 className="text-[22px] font-bold text-white">Quick Links</h3>
              <div className="mt-4 flex flex-col gap-2 text-base text-slate-100">
                <PageAnchor page="home" onNavigate={changePage} className="text-left hover:text-sky-300">Home</PageAnchor>
                <PageAnchor page="about" onNavigate={changePage} className="text-left hover:text-sky-300">About</PageAnchor>
                <PageAnchor page="services" onNavigate={changePage} className="text-left hover:text-sky-300">Services</PageAnchor>
                <PageAnchor page="testimonials" onNavigate={changePage} className="text-left hover:text-sky-300">Testimonials</PageAnchor>
                <PageAnchor page="emergency" onNavigate={changePage} className="text-left hover:text-sky-300">Emergency Plumber</PageAnchor>
                <PageAnchor page="gallery" onNavigate={changePage} className="text-left hover:text-sky-300">Gallery</PageAnchor>
                <PageAnchor page="contact" onNavigate={changePage} className="text-left hover:text-sky-300">Contact Us</PageAnchor>
                <PageAnchor page="service-areas" onNavigate={changePage} className="text-left hover:text-sky-300">Service Areas</PageAnchor>
                <PageAnchor page="terms" onNavigate={changePage} className="text-left hover:text-sky-300">Terms & Conditions</PageAnchor>
              </div>
            </div>

            <div>
              <h3 className="text-[22px] font-bold text-white">Services</h3>
              <div className="mt-4 flex flex-col gap-2 text-base text-slate-100">
                {serviceRows.map((service) => (
                  <PageAnchor key={service.key} page={service.key} onNavigate={changePage} className="inline-flex items-center gap-2 text-left hover:text-sky-300">
                    <CheckCircle2 className="h-4 w-4 text-sky-500" />
                    <span>{service.title}</span>
                  </PageAnchor>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[22px] font-bold text-white">Get In Touch</h3>
              <div className="mt-4 space-y-3 text-base text-slate-100">
                <a href="tel:0414248131" className="flex items-center gap-2 hover:text-sky-300">
                  <Phone className="h-4 w-4 text-sky-500" />
                  0414 248 131
                </a>
                <a href="mailto:paul@fixitnowplumbing.com.au" className="flex items-center gap-2 hover:text-sky-300">
                  <Mail className="h-4 w-4 text-sky-500" />
                  paul@fixitnowplumbing.com.au
                </a>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-sky-500" />
                  <span>Hours: Mon-Sun 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-700 bg-black py-6 text-center text-base text-white">
          © {new Date().getFullYear()} Fix It Now Plumbing. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
