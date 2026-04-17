   "Compliance-focused workmanship",
1	import { useMemo, useState } from "react";
     2	import {
     3	  Phone,
     4	  Wrench,
     5	  Droplets,
     6	  ShieldCheck,
     7	  MapPin,
     8	  Star,
     9	  Clock3,
    10	  ChevronRight,
    11	  ChevronDown,
    12	  CheckCircle2,
    13	  Mail,
    14	  Home,
    15	  Flame,
    16	  Hammer,
    17	  Menu,
    18	  X,
    19	} from "lucide-react";
    20	
    21	type PageKey =
    22	  | "home"
    23	  | "about"
    24	  | "services"
    25	  | "gallery"
    26	  | "blocked-drains"
    27	  | "hot-water"
    28	  | "emergency-plumbing"
    29	  | "maintenance-plumbing"
    30	  | "leak-detection"
    31	  | "gas-fitting"
    32	  | "contact"
    33	  | "terms";
    34	
    35	const heroImage =
    36	  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80";
    37	const aboutImage =
    38	  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80";
    39	
    40	const reviews = [
    41	  {
    42	    quote: "Quick response, turned up on time and fixed the leak the same morning.",
    43	    name: "Matt H.",
    44	  },
    45	  {
    46	    quote: "Easy to deal with, clear quote, great work. Would use again.",
    47	    name: "Sarah T.",
    48	  },
    49	  {
    50	    quote: "Solved our blocked drain issue fast and explained everything clearly.",
    51	    name: "James R.",
    52	  },
    53	] as const;
    54	
    55	const serviceRows = [
    56	  {
    57	    key: "blocked-drains" as const,
    58	    title: "Blocked Drains",
    59	    desc: "Kitchen, bathroom and stormwater drainage issues diagnosed and cleared with practical long-term solutions.",
    60	    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    61	    icon: Droplets,
    62	  },
    63	  {
    64	    key: "hot-water" as const,
    65	    title: "Hot Water Repairs",
    66	    desc: "Repairs, replacements and new installs to get hot water systems working properly again.",
    67	    image:
    68	      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
    69	    icon: Flame,
    70	  },
    71	  {
    72	    key: "emergency-plumbing" as const,
    73	    title: "Emergency Plumbing",
    74	    desc: "Urgent leaks, burst pipes and fast-response plumbing help across Sydney.",
    75	    image:
    76	      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
    77	    icon: Wrench,
    78	  },
    79	  {
    80	    key: "maintenance-plumbing" as const,
    81	    title: "Maintenance Plumbing",
    82	    desc: "Reliable maintenance plumbing for homes, strata and small business properties throughout the area.",
    83	    image:
    84	      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    85	    icon: Hammer,
    86	  },
    87	] as const;
    88	
    89	const getServiceTargetPage = (serviceKey: (typeof serviceRows)[number]["key"]): PageKey => {
    90	  if (serviceKey === "blocked-drains") return "blocked-drains";
    91	  if (serviceKey === "hot-water") return "hot-water";
    92	  if (serviceKey === "emergency-plumbing") return "emergency-plumbing";
    93	  if (serviceKey === "maintenance-plumbing") return "maintenance-plumbing";
    94	  return "services";
    95	};
    96	
    97	const serviceList = [
    98	  "Emergency plumbing",
    99	  "Blocked drains",
   100	  "Hot water repairs",
   101	  "Leak detection",
   102	  "Burst pipe repairs",
   103	  "Gas fitting services",
   104	  "Maintenance plumbing",
   105	  "Drainage solutions",
   106	] as const;
   107	
   108	const galleryImages = [
   109	  {
   110	    title: "Blocked drain clearing",
   111	    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80",
   112	  },
   113	  {
   114	    title: "Hot water system work",
   115	    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
   116	  },
   117	  {
   118	    title: "On-site plumbing repairs",
   119	    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
   120	  },
   121	  {
   122	    title: "Plumbing tools and fittings",
   123	    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
   124	  },
   125	  {
   126	    title: "Maintenance plumbing job",
   127	    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
   128	  },
   129	  {
   130	    title: "Emergency plumbing response",
   131	    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
   132	  },
   133	] as const;
   134	
   135	const navItems: Array<{ key: PageKey; label: string }> = [
   136	  { key: "home", label: "Home" },
   137	  { key: "about", label: "About" },
   138	  { key: "gallery", label: "Gallery" },
   139	  { key: "contact", label: "Contact" },
   140	];
   141	
   142	const serviceMenuItems: Array<{ key: PageKey; label: string }> = [
   143	  { key: "services", label: "All Services" },
   144	  { key: "blocked-drains", label: "Blocked Drains" },
   145	  { key: "hot-water", label: "Hot Water Repairs" },
   146	  { key: "emergency-plumbing", label: "Emergency Plumbing" },
   147	  { key: "maintenance-plumbing", label: "Maintenance Plumbing" },
   148	  { key: "leak-detection", label: "Leak Detection" },
   149	  { key: "gas-fitting", label: "Gas Fitting" },
   150	];
   151	
   152	function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
   153	  return (
   154	    <div className="max-w-3xl">
   155	      <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">{eyebrow}</div>
   156	      <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
   157	      {text ? <p className="mt-4 text-lg text-slate-600">{text}</p> : null}
   158	    </div>
   159	  );
   160	}
   161	
   162	function ReviewCards() {
   163	  return (
   164	    <div className="mt-10 grid gap-6 lg:grid-cols-3">
   165	      {reviews.map((review, i) => (
   166	        <div key={i} className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
   167	          <div className="flex gap-1 text-yellow-400">
   168	            {Array.from({ length: 5 }).map((_, idx) => (
   169	              <Star key={idx} className="h-4 w-4 fill-current" />
   170	            ))}
   171	          </div>
   172	          <p className="mt-5 text-lg leading-relaxed text-slate-700">“{review.quote}”</p>
   173	          <div className="mt-6 text-sm font-medium text-slate-500">{review.name}</div>
   174	        </div>
   175	      ))}
   176	    </div>
   177	  );
   178	}
   179	
   180	function ContactPanel() {
   181	  return (
   182	    <section className="mx-auto max-w-7xl px-6 py-20">
   183	      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
   184	        <div className="rounded-[2rem] bg-sky-800 p-8 text-white shadow-xl md:p-10">
   185	          <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-100">Contact</div>
   186	          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">Need plumbing help in Sydney?</h2>
   187	          <p className="mt-4 max-w-2xl text-lg text-sky-50/90">
   188	            Call now for urgent plumbing help or send through an enquiry and we’ll get back to you as soon as possible.
   189	          </p>
   190	          <div className="mt-8 space-y-4 text-sky-50">
   191	            <div className="flex items-center gap-3">
   192	              <Phone className="h-5 w-5" />
   193	              <span>0414 248 131</span>
   194	            </div>
   195	            <div className="flex items-center gap-3">
   196	              <Mail className="h-5 w-5" />
   197	              <span>paul@fixitnowplumbing.com.au</span>
   198	            </div>
   199	            <div className="flex items-center gap-3">
   200	              <MapPin className="h-5 w-5" />
   201	              <span>Sydney Wide Plumbing Service Area</span>
   202	            </div>
   203	          </div>
   204	        </div>
   205	
   206	        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
   207	          <div className="text-2xl font-bold text-slate-900">Send an enquiry</div>
   208	          <div className="mt-6 space-y-4">
   209	            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Name" />
   210	            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Phone" />
   211	            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Email" />
   212	            <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Address" />
   213	            <textarea className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Message" />
   214	            <button className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">Send message</button>
   215	          </div>
   216	        </div>
   217	      </div>
   218	    </section>
   219	  );
   220	}
   280	            <div className="mt-6 space-y-4">
   281	              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Name" />
   282	              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Phone" />
   283	              <input className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Email" />
   284	              <textarea className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-sky-600" placeholder="Tell us what plumbing help you need" />
   285	              <button className="w-full rounded-xl bg-sky-700 px-6 py-4 font-semibold text-white hover:bg-sky-800">Send message</button>
   286	            </div>
   287	          </div>
   288	        </div>
   289	      </section>
   290	
   291	      <section className="border-b border-slate-200 bg-white">
   292	        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-6 md:grid-cols-4">
   293	          {[
   294	            "Trusted Sydney-wide plumbing service",
   295	            "Emergency callouts available",
   296	            "Residential & commercial plumbing",
   297	            "Fast local response",
   298	          ].map((item) => (
   299	            <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
   300	              <CheckCircle2 className="h-4 w-4 text-sky-700" />
   301	              <span className="font-medium">{item}</span>
   302	            </div>
   303	          ))}
   304	        </div>
   305	      </section>
   306	
   307	      <section className="mx-auto max-w-7xl px-6 py-20">
   308	        <SectionHeading
   309	          eyebrow="Featured services"
   310	          title="Popular plumbing services"
   311	          text="Browse the most requested plumbing services and jump into a dedicated page for each one."
   312	        />
   313	        <div className="mt-12 grid gap-6 md:grid-cols-2">
   314	          {serviceRows.map((service, index) => {
   315	            const Icon = service.icon;
   316	            const targetPage = getServiceTargetPage(service.key);
   317	            return (
   318	              <div key={`${service.title}-${index}`} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
   319	                <img src={service.image} alt={service.title} className="h-64 w-full object-cover" />
   320	                <div className="p-7">
   321	                  <div className="inline-flex items-center gap-2 font-semibold text-sky-700">
   322	                    <Icon className="h-5 w-5" />
   323	                    Fix It Now Plumbing
   324	                  </div>
   325	                  <h3 className="mt-4 text-2xl font-bold tracking-tight">{service.title}</h3>
   326	                  <p className="mt-3 text-slate-600">{service.desc}</p>
   327	                  <button
   328	                    onClick={() => goTo(targetPage)}
   329	                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
   330	                  >
   331	                    View service page
   332	                    <ChevronRight className="h-4 w-4" />
   333	                  </button>
   334	                </div>
   335	              </div>
   336	            );
   337	          })}
   338	        </div>
   339	      </section>
   340	    </>
   341	  );
   342	}
   343	
   344	function AboutPage() {
   345	  const features = [
   346	    { label: "Licensed plumbing support", icon: ShieldCheck },
   347	    { label: "Prompt local response", icon: Clock3 },
   348	    { label: "Drainage and leak expertise", icon: Droplets },
   349	    { label: "Friendly family-run service", icon: Home },
   350	  ];
   351	
   352	  return (
   353	    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] items-center">
   354	      <div>
   355	        <SectionHeading eyebrow="About us" title="You can rely on us for plumbing emergencies and everyday repairs" />
   356	        <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
   357	          <p>
   358	            When plumbing issues happen, you need a team that responds quickly and gets the job done properly the first time. We focus on fast response times, honest advice and reliable workmanship on every job.
   359	          </p>
   360	          <p>
   361	            From blocked drains and hot water repairs to leaks and general maintenance, Fix It Now Plumbing is a dependable local option for homes and small businesses across Sydney and surrounding suburbs.
   362	          </p>
   363	        </div>
   364	        <div className="mt-8 grid gap-4 sm:grid-cols-2">
   365	          {features.map((feature) => {
   366	            const FeatureIcon = feature.icon;
   367	            return (
   368	              <div
   369	                key={feature.label}
   370	                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
   371	              >
   372	                <FeatureIcon className="h-5 w-5 text-sky-700" />
   373	                <span className="font-medium text-slate-800">{feature.label}</span>
   374	              </div>
   375	            );
   376	          })}
   377	        </div>
   378	      </div>
   379	
   380	      <div className="relative">
   381	        <img
   382	          src={aboutImage}
   383	          alt="Plumbing tools and fittings"
   384	          className="h-[520px] w-full rounded-[2rem] object-cover shadow-xl"
   385	        />
   386	        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-slate-200 bg-white/92 p-5 shadow-lg backdrop-blur">
   387	          <div className="text-lg font-bold text-slate-900">Local, established and easy to contact</div>
   388	          <p className="mt-2 text-slate-600">
   389	            A proper website gives customers a fast way to call, enquire and trust the business without relying only on Facebook.
   390	          </p>
   391	        </div>
   392	      </div>
   393	    </section>
   394	  );
   395	}
   396	
   397	function ServicesPage({ goTo }: { goTo: (page: PageKey) => void }) {
   398	  return (
   399	    <>
   400	      <section className="border-y border-slate-200 bg-slate-50">
   401	        <div className="mx-auto max-w-7xl px-6 py-20">
   402	          <SectionHeading
   403	            eyebrow="Services"
   404	            title="Professional plumbing services across Sydney"
   405	            text="We provide a complete range of plumbing services, with clear pricing, fast response times and dependable workmanship you can trust."
   406	          />
   407	
   408	          <div className="mt-12 space-y-8">
   409	            {serviceRows.map((service, index) => {
   410	              const ServiceIcon = service.icon;
   411	              const targetPage = getServiceTargetPage(service.key);
   412	              return (
   413	                <div key={`${service.title}-${index}`} className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
   414	                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
   415	                    <img src={service.image} alt={service.title} className="h-full min-h-[320px] w-full object-cover" />
   416	                  </div>
   417	                  <div className="flex flex-col justify-center p-8 md:p-10">
   418	                    <div className="inline-flex items-center gap-2 font-semibold text-sky-700">
   419	                      <ServiceIcon className="h-5 w-5" />
   420	                      Fix It Now Plumbing
   421	                    </div>
   422	                    <h3 className="mt-4 text-3xl font-bold tracking-tight">{service.title}</h3>
   423	                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{service.desc}</p>
   424	                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
   425	                      <button
   426	                        onClick={() => goTo(targetPage)}
   427	                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
   428	                      >
   429	                        View page
   430	                      </button>
   431	                      <a href="tel:0414248131" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-800">
   432	                        <Phone className="h-4 w-4" />
   433	                        Call now
   434	                      </a>
   435	                    </div>
   436	                  </div>
   437	                </div>
   438	              );
   439	            })}
   440	          </div>
   441	        </div>
   442	      </section>
   443	
   444	      <section className="mx-auto max-w-7xl px-6 py-20">
   445	        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
   446	          <div>
   447	            <SectionHeading eyebrow="More services" title="Choose a trusted local plumber" text="We cover all aspects of plumbing, so you only need one reliable team for every job around your home or business." />
   448	          </div>
   449	          <div className="grid gap-4 sm:grid-cols-2">
   450	            {serviceList.map((item) => (
   451	              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
   452	                <CheckCircle2 className="h-4 w-4 text-sky-700" />
   453	                <span className="font-medium text-slate-800">{item}</span>
   454	              </div>
   455	            ))}
   456	          </div>
   457	        </div>
   458	      </section>
   459	    </>
   460	  );
   461	}
   462	
   463	function ServiceDetailPage({
   464	  title,
   465	  image,
   466	  intro,
   467	  points,
   468	}: {
   469	  title: string;
   470	  image: string;
   620	          </p>
   621	        </div>
   622	
   623	        <div>
   624	          <h3 className="text-2xl font-bold text-slate-900">Contact</h3>
   625	          <p className="mt-3 text-slate-600 leading-relaxed">
   626	            For any questions about these terms and conditions, please contact Fix It Now Plumbing by phone on 0414 248 131 or email at paul@fixitnowplumbing.com.au.
   627	          </p>
   628	        </div>
   629	      </div>
   630	    </section>
   631	  );
   632	}
   633	
   634	export default function NorthernBeachesPlumberDemo() {
   635	  const [currentPage, setCurrentPage] = useState<PageKey>("home");
   636	  const [mobileOpen, setMobileOpen] = useState(false);
   637	  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
   638	  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
   639	
   640	  const changePage = (page: PageKey) => {
   641	    setCurrentPage(page);
   642	    setMobileOpen(false);
   643	    setServiceMenuOpen(false);
   644	    setMobileServicesOpen(false);
   645	    if (typeof window !== "undefined") {
   646	      window.scrollTo({ top: 0, behavior: "smooth" });
   647	    }
   648	  };
   649	
   650	  const currentTitle = useMemo(() => {
   651	    switch (currentPage) {
   652	      case "about":
   653	        return "About";
   654	      case "services":
   655	        return "Services";
   656	      case "gallery":
   657	        return "Gallery";
   658	      case "blocked-drains":
   659	        return "Blocked Drains";
   660	      case "hot-water":
   661	        return "Hot Water Repairs";
   662	      case "emergency-plumbing":
   663	        return "Emergency Plumbing";
   664	      case "maintenance-plumbing":
   665	        return "Maintenance Plumbing";
   666	      case "leak-detection":
   667	        return "Leak Detection";
   668	      case "gas-fitting":
   669	        return "Gas Fitting";
   670	      case "contact":
   671	        return "Contact";
   672	      case "terms":
   673	        return "Terms & Conditions";
   674	      default:
   675	        return "Home";
   676	    }
   677	  }, [currentPage]);
   678	
   679	  return (
   680	    <div className="min-h-screen bg-white text-slate-900">
   681	      <div className="bg-sky-700 text-sm text-white">
   682	        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
   683	          <div className="flex flex-wrap items-center gap-4">
   684	            <div className="flex items-center gap-2">
   685	              <MapPin className="h-4 w-4" />
   686	              <span>Sydney Wide Service</span>
   687	            </div>
   688	            <div className="flex items-center gap-2">
   689	              <Clock3 className="h-4 w-4" />
   690	              <span>Emergency plumbing available</span>
   691	            </div>
   692	          </div>
   693	          <a href="tel:0414248131" className="font-semibold hover:underline">
   694	            Call: 0414 248 131
   695	          </a>
   696	        </div>
   697	      </div>
   698	
   699	      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
   700	        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
   701	          <button onClick={() => changePage("home")} className="text-left">
   702	            <div className="text-2xl font-bold tracking-tight text-sky-800">Fix It Now Plumbing</div>
   703	            <div className="text-sm text-slate-500">Fast, reliable plumbing across Sydney</div>
   704	          </button>
   705	
   706	          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
   707	            {navItems.map((item) => (
   708	              <button
   709	                key={item.key}
   710	                onClick={() => changePage(item.key)}
   711	                className={`hover:text-sky-700 ${currentPage === item.key ? "text-sky-700" : ""}`}
   712	              >
   713	                {item.label}
   714	              </button>
   715	            ))}
   716	            <div
   717	              className="relative"
   718	              onMouseEnter={() => setServiceMenuOpen(true)}
   719	              onMouseLeave={() => setServiceMenuOpen(false)}
   720	            >
   721	              <button
   722	                onClick={() => changePage("services")}
   723	                className={`inline-flex items-center gap-1 hover:text-sky-700 ${serviceMenuItems.some((item) => item.key === currentPage) ? "text-sky-700" : ""}`}
   724	              >
   725	                Services
   726	                <ChevronDown className={`h-4 w-4 transition-transform ${serviceMenuOpen ? "rotate-180" : ""}`} />
   727	              </button>
   728	              {serviceMenuOpen ? (
   729	                <div className="absolute left-0 top-full z-40 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
   730	                  {serviceMenuItems.map((item) => (
   731	                    <button
   732	                      key={item.key}
   733	                      onClick={() => changePage(item.key)}
   734	                      className={`block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-sky-50 hover:text-sky-700 ${currentPage === item.key ? "bg-sky-50 text-sky-700" : "text-slate-700"}`}
   735	                    >
   736	                      {item.label}
   737	                    </button>
   738	                  ))}
   739	                </div>
   740	              ) : null}
   741	            </div>
   742	          </nav>
   743	
   744	          <div className="flex items-center gap-3">
   745	            <a href="tel:0414248131" className="hidden items-center gap-2 rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-sky-800 md:inline-flex">
   746	              <Phone className="h-4 w-4" />
   747	              0414 248 131
   748	            </a>
   749	            <button
   750	              onClick={() => setMobileOpen((v) => !v)}
   751	              className="inline-flex rounded-xl border border-slate-300 p-3 md:hidden"
   752	              aria-label="Toggle menu"
   753	            >
   754	              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
   755	            </button>
   756	          </div>
   757	        </div>
   758	        {mobileOpen ? (
   759	          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
   760	            <div className="flex flex-col gap-3">
   761	              {navItems.map((item) => (
   762	                <button
   763	                  key={item.key}
   764	                  onClick={() => changePage(item.key)}
   765	                  className={`rounded-xl px-3 py-2 text-left font-medium ${currentPage === item.key ? "bg-sky-50 text-sky-700" : "text-slate-700"}`}
   766	                >
   767	                  {item.label}
   768	                </button>
   769	              ))}
   770	              <button
   771	                onClick={() => setMobileServicesOpen((v) => !v)}
   772	                className={`flex items-center justify-between rounded-xl px-3 py-2 text-left font-medium ${serviceMenuItems.some((item) => item.key === currentPage) ? "bg-sky-50 text-sky-700" : "text-slate-700"}`}
   773	              >
   774	                Services
   775	                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
   776	              </button>
   777	              {mobileServicesOpen ? (
   778	                <div className="ml-4 flex flex-col gap-2 border-l border-slate-200 pl-3">
   779	                  {serviceMenuItems.map((item) => (
   780	                    <button
   781	                      key={item.key}
   782	                      onClick={() => changePage(item.key)}
   783	                      className={`rounded-xl px-3 py-2 text-left text-sm ${currentPage === item.key ? "bg-sky-50 text-sky-700" : "text-slate-700"}`}
   784	                    >
   785	                      {item.label}
   786	                    </button>
   787	                  ))}
   788	                </div>
   789	              ) : null}
   790	            </div>
   791	          </div>
   792	        ) : null}
   793	      </header>
   794	
   795	      <div className="border-b border-slate-200 bg-slate-50">
   796	        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
   797	          <div>
   798	            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-700">Current page</div>
   799	            <div className="mt-1 text-2xl font-bold text-slate-900">{currentTitle}</div>
   800	          </div>
   801	          <button onClick={() => changePage("contact")} className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800">
   802	            Request Quote
   803	          </button>
   804	        </div>
   805	      </div>
   806	
   807	      {currentPage === "home" ? <HomePage goTo={changePage} /> : null}
   808	      {currentPage === "about" ? <AboutPage /> : null}
   809	      {currentPage === "services" ? <ServicesPage goTo={changePage} /> : null}
   810	      {currentPage === "gallery" ? <GalleryPage /> : null}
   811	      {currentPage === "blocked-drains" ? (
   812	        <ServiceDetailPage
   813	          title="Blocked Drains"
   814	          image="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80"
   815	          intro="Blocked drains can quickly turn into a messy, disruptive problem. We diagnose the cause properly and work to clear drains fast so your plumbing is back to normal as soon as possible."
   816	          points={[
   817	            "Kitchen and bathroom drain blockages",
   818	            "Stormwater drainage issues",
   819	            "Fast fault diagnosis",
   820	            "Practical long-term solutions",
   821	          ]}
   822	        />
   823	      ) : null}
   824	      {currentPage === "hot-water" ? (
   825	        <ServiceDetailPage
   826	          title="Hot Water Repairs"
   827	          image="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80"
   828	          intro="No hot water is never convenient. We repair, replace and install hot water systems with a focus on fast service and dependable workmanship."
   829	          points={[
   830	            "Hot water fault finding",
   831	            "System replacements and installs",
   832	            "Gas and electric hot water support",
   833	            "Fast response across Sydney",
   834	          ]}
   835	        />
   836	      ) : null}
   837	      {currentPage === "emergency-plumbing" ? (
   838	        <ServiceDetailPage
   839	          title="Emergency Plumbing"
   840	          image="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80"
   841	          intro="Plumbing emergencies need immediate action to prevent property damage and downtime. We respond quickly for urgent leaks, burst pipes and unexpected plumbing failures."
   842	          points={[
   843	            "Burst pipe and major leak response",
   844	            "Overflowing fixtures and urgent repairs",
   845	            "After-hours emergency callouts",
   846	            "Fast temporary and permanent fixes",
   847	          ]}
   848	        />
   849	      ) : null}
   850	      {currentPage === "maintenance-plumbing" ? (
   851	        <ServiceDetailPage
   852	          title="Maintenance Plumbing"
   853	          image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
   854	          intro="Routine plumbing maintenance helps prevent costly breakdowns and keeps your systems running efficiently. We provide reliable scheduled plumbing support for homes and businesses."
   855	          points={[
   856	            "Tap, toilet and fixture maintenance",
   857	            "Preventative plumbing inspections",
   858	            "Strata and rental property support",
   859	            "General plumbing upkeep",
   860	          ]}
   861	        />
   862	      ) : null}
   863	      {currentPage === "leak-detection" ? (
   864	        <ServiceDetailPage
   865	          title="Leak Detection"
   866	          image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80"
   867	          intro="Hidden leaks can waste water and damage your property over time. We locate leak sources quickly and carry out targeted repairs to minimise disruption."
   868	          points={[
   869	            "Internal and external leak tracing",
   870	            "Water meter and pressure checks",
   871	            "Fast repair recommendations",
   872	            "Damage prevention support",
   873	          ]}
   874	        />
   875	      ) : null}
   876	      {currentPage === "gas-fitting" ? (
   877	        <ServiceDetailPage
   878	          title="Gas Fitting"
   879	          image="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80"
   880	          intro="Safe, compliant gas work is essential for your property and household. We provide dependable gas fitting services, repairs and appliance connections."
   881	          points={[
   882	            "Gas line checks and repairs",
   883	            "Appliance connection and replacement",
   884	            "Gas leak investigation support",
   885	            "Compliance-focused workmanship",
   886	          ]}
   887	        />
   888	      ) : null}
   889	      {currentPage === "contact" ? <ContactPage /> : null}
   890	      {currentPage === "terms" ? <TermsPage /> : null}
   891	
   892	      <footer className="border-t border-slate-200 bg-white">
   893	        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
   894	          <div>
   895	            <div className="text-xl font-bold text-sky-800">Fix It Now Plumbing</div>
   896	            <div className="mt-1 text-sm text-slate-500">Sydney-wide plumbing service</div>
   897	          </div>
   898	          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
   899	            <a href="tel:0414248131" className="hover:text-sky-700">0414 248 131</a>
   900	            <a href="mailto:paul@fixitnowplumbing.com.au" className="hover:text-sky-700">paul@fixitnowplumbing.com.au</a>
   901	            <button onClick={() => changePage("terms")} className="hover:text-sky-700">Terms & Conditions</button>
   902	          </div>
   903	        </div>
   904	      </footer>
   905	    </div>
   906	  );
   907	}