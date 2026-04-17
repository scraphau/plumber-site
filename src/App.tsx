import { useMemo, useState } from "react";
import {
  Phone,
  Wrench,
  Droplets,
  ShieldCheck,
  MapPin,
  Star,
  Clock3,
  ChevronRight,
  CheckCircle2,
  Mail,
  Home,
  Flame,
  Hammer,
  Menu,
  X,
} from "lucide-react";

type PageKey = "home" | "about" | "services" | "gallery" | "blocked-drains" | "hot-water" | "contact";

const heroImage =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80";
const aboutImage =
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80";

const reviews = [
  {
    quote: "Quick response, turned up on time and fixed the leak the same morning.",
    name: "Matt H.",
  },
  {
    quote: "Easy to deal with, clear quote, great work. Would use again.",
    name: "Sarah T.",
  },
  {
    quote: "Solved our blocked drain issue fast and explained everything clearly.",
    name: "James R.",
  },
] as const;

const serviceRows = [
  {
    key: "blocked-drains" as const,
    title: "Blocked Drains",
    desc: "Kitchen, bathroom and stormwater drainage issues diagnosed and cleared with practical long-term solutions.",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    icon: Droplets,
  },
  {
    key: "hot-water" as const,
    title: "Hot Water Repairs",
    desc: "Repairs, replacements and new installs to get hot water systems working properly again.",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
    icon: Flame,
  },
  {
    key: "services" as const,
    title: "Emergency Plumbing",
    desc: "Urgent leaks, burst pipes and fast-response plumbing help across Sydney.",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    icon: Wrench,
  },
  {
    key: "services" as const,
    title: "Maintenance Plumbing",
    desc: "Reliable maintenance plumbing for homes, strata and small business properties throughout the area.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    icon: Hammer,
  },
] as const;

const serviceList = [
  "Emergency plumbing",
  "Blocked drains",
  "Hot water repairs",
  "Leak detection",
  "Burst pipe repairs",
  "Gas fitting services",
  "Maintenance plumbing",
  "Drainage solutions",
] as const;

const galleryImages = [
  {
    title: "Blocked drain clearing",
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Hot water system work",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "On-site plumbing repairs",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Plumbing tools and fittings",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Maintenance plumbing job",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Emergency plumbing response",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

const navItems: Array<{ key: PageKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "gallery", label: "Gallery" },
  { key: "blocked-drains", label: "Blocked Drains" },
  { key: "hot-water", label: "Hot Water" },
  { key: "contact", label: "Contact" },
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">{eyebrow}</div>
      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-lg text-slate-600">{text}</p> : null}
    </div>
  );
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
          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">Contact</div>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Need plumbing help in Sydney?</h2>
          <p className="mt-4 max-w-2xl text-lg text-sky-50/90">
            Call now for urgent plumbing help or send through an enquiry and we’ll get back to you as soon as possible.
          </p>
          <div className="mt-8 space-y-4 text-sky-50">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>0414 248 131</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>paul@fixitnowplumbing.com.au</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>Sydney Wide Plumbing Service Area</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="text-2xl font-bold text-slate-900">Send an enquiry</div>
          <div className="mt-6 space-y-4">
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Name" />
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Phone" />
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Email" />
            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Address" />
            <textarea className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Message" />
            <button className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">Send message</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ goTo }: { goTo: (page: PageKey) => void }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Plumber working on site" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/45" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              Trusted local plumbers across Sydney
            </div>

            <h1 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
              Reliable, fast and professional plumbing solutions across Sydney.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100">
              Fix It Now Plumbing provides reliable plumbing services for homes and businesses across Sydney. From blocked drains and burst pipes to hot water systems and emergency callouts, we focus on fast response, quality workmanship and clear communication.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => goTo("contact")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-4 font-semibold text-white hover:bg-sky-700"
              >
                Contact Us
                <ChevronRight className="h-4 w-4" />
              </button>
              <a href="tel:0414248131" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-sky-800">
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4" />
                <span className="text-sm font-medium">Rated 5 Stars on Google</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl md:p-7">
            <div className="text-2xl font-bold text-slate-900">Request a plumbing quote</div>
            <p className="mt-2 text-slate-600">Fast local help for urgent plumbing, drainage and maintenance jobs.</p>
            <div className="mt-6 space-y-4">
              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Name" />
              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Phone" />
              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Email" />
              <textarea className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Tell us what plumbing help you need" />
              <button className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">Send message</button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
          {[
            "Trusted Sydney-wide plumbing service",
            "Emergency callouts available",
            "Residential & commercial plumbing",
            "Fast local response",
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
          eyebrow="Featured services"
          title="Popular plumbing services"
          text="Browse the most requested plumbing services and jump into a dedicated page for each one."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {serviceRows.map((service, index) => {
            const Icon = service.icon;
            const targetPage = index === 0 ? "blocked-drains" : index === 1 ? "hot-water" : "services";
            return (
              <div key={`${service.title}-${index}`} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
                <img src={service.image} alt={service.title} className="h-64 w-full object-cover" />
                <div className="p-7">
                  <div className="inline-flex items-center gap-2 font-semibold text-sky-700">
                    <Icon className="h-5 w-5" />
                    Fix It Now Plumbing 67
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-slate-600">{service.desc}</p>
                  <button
                    onClick={() => goTo(targetPage)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
                  >
                    View service page
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
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
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] items-center">
      <div>
        <SectionHeading eyebrow="About us" title="You can rely on us for plumbing emergencies and everyday repairs" />
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
          <p>
            When plumbing issues happen, you need a team that responds quickly and gets the job done properly the first time. We focus on fast response times, honest advice and reliable workmanship on every job.
          </p>
          <p>
            From blocked drains and hot water repairs to leaks and general maintenance, Fix It Now Plumbing is a dependable local option for homes and small businesses across Sydney and surrounding suburbs.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const FeatureIcon = feature.icon;
            return (
              <div
                key={feature.label}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <FeatureIcon className="h-5 w-5 text-sky-700" />
                <span className="font-medium text-slate-800">{feature.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <img
          src={aboutImage}
          alt="Plumbing tools and fittings"
          className="h-[520px] w-full rounded-[2rem] object-cover shadow-xl"
        />
        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/92 p-5 shadow-lg backdrop-blur">
          <div className="text-lg font-bold text-slate-900">Local, established and easy to contact</div>
          <p className="mt-2 text-slate-600">
            A proper website gives customers a fast way to call, enquire and trust the business without relying only on Facebook.
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
            {serviceRows.map((service, index) => {
              const ServiceIcon = service.icon;
              const targetPage = index === 0 ? "blocked-drains" : index === 1 ? "hot-water" : "contact";
              return (
                <div key={`${service.title}-${index}`} className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <img src={service.image} alt={service.title} className="h-full min-h-[320px] w-full object-cover" />
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
                        onClick={() => goTo(targetPage)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
                      >
                        {targetPage === "contact" ? "Contact us" : "View page"}
                      </button>
                      <a href="tel:0414248131" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800">
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
            <SectionHeading eyebrow="More services" title="Choose a trusted local plumber" text="We cover all aspects of plumbing, so you only need one reliable team for every job around your home or business." />
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
            text="A gallery page like this helps show the range of plumbing jobs completed and gives customers more confidence before they call."
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
          title="Show customers the kind of work you do"
          text="Before-and-after style photos, hot water replacements, blocked drain clearances and general plumbing job shots all help turn more visitors into enquiries."
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

function ContactPage() {
  return <ContactPanel />;
}

export default function NorthernBeachesPlumberDemo() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const changePage = (page: PageKey) => {
    setCurrentPage(page);
    setMobileOpen(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentTitle = useMemo(() => {
    switch (currentPage) {
      case "about":
        return "About";
      case "services":
        return "Services";
      case "gallery":
        return "Gallery";
      case "blocked-drains":
        return "Blocked Drains";
      case "hot-water":
        return "Hot Water Repairs";
      case "contact":
        return "Contact";
      default:
        return "Home";
    }
  }, [currentPage]);

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
          <button onClick={() => changePage("home")} className="text-left">
            <div className="text-2xl font-bold tracking-tight text-sky-800">Fix It Now Plumbing</div>
            <div className="text-sm text-slate-500">Fast, reliable plumbing across Sydney</div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => changePage(item.key)}
                className={`hover:text-sky-700 ${currentPage === item.key ? "text-sky-700" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:0414248131" className="hidden items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-800 md:inline-flex">
              <Phone className="h-4 w-4" />
              0414 248 131
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex rounded-xl border border-slate-300 p-3 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen ? (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => changePage(item.key)}
                  className={`rounded-xl px-3 py-2 text-left font-medium ${currentPage === item.key ? "bg-sky-50 text-sky-700" : "text-slate-700"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <div className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">Current page</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{currentTitle}</div>
          </div>
          <button onClick={() => changePage("contact")} className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800">
            Request Quote
          </button>
        </div>
      </div>

      {currentPage === "home" ? <HomePage goTo={changePage} /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "services" ? <ServicesPage goTo={changePage} /> : null}
      {currentPage === "gallery" ? <GalleryPage /> : null}
      {currentPage === "blocked-drains" ? (
        <ServiceDetailPage
          title="Blocked Drains"
          image="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80"
          intro="Blocked drains can quickly turn into a messy, disruptive problem. We diagnose the cause properly and work to clear drains fast so your plumbing is back to normal as soon as possible."
          points={[
            "Kitchen and bathroom drain blockages",
            "Stormwater drainage issues",
            "Fast fault diagnosis",
            "Practical long-term solutions",
          ]}
        />
      ) : null}
      {currentPage === "hot-water" ? (
        <ServiceDetailPage
          title="Hot Water Repairs"
          image="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80"
          intro="No hot water is never convenient. We repair, replace and install hot water systems with a focus on fast service and dependable workmanship."
          points={[
            "Hot water fault finding",
            "System replacements and installs",
            "Gas and electric hot water support",
            "Fast response across Sydney",
          ]}
        />
      ) : null}
      {currentPage === "contact" ? <ContactPage /> : null}

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xl font-bold text-sky-800">Fix It Now Plumbing</div>
            <div className="mt-1 text-sm text-slate-500">Sydney-wide plumbing service</div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <a href="tel:0414248131" className="hover:text-sky-700">0414 248 131</a>
            <a href="mailto:paul@fixitnowplumbing.com.au" className="hover:text-sky-700">paul@fixitnowplumbing.com.au</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
