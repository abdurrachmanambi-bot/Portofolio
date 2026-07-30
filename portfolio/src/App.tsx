import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail, Phone, ChevronDown, Briefcase, Code2, GraduationCap, User, Wrench, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const queryClient = new QueryClient();

/* ─── reusable fade-in-up on scroll ─── */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── section wrapper ─── */
function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 px-6 md:px-12 max-w-6xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-white/40" />
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-white/40">{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-black text-white mb-12 leading-tight">{children}</h2>
  );
}

/* ─── NAVBAR ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
    >
      <div
        className={`backdrop-blur-md border rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'bg-[#1c1e24]/90 border-white/15 shadow-2xl' : 'bg-white/10 border-white/20 shadow-lg'
        }`}
      >
        <div className="font-bold text-white text-base tracking-tight">Abdurrachman Amby</div>

        <nav className="hidden md:flex items-center gap-7">
          {[['#about', 'About'], ['#experience', 'Experience'], ['#projects', 'Projects'], ['#skills', 'Skills'], ['#contact', 'Contact']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              data-testid={`link-${label.toLowerCase()}`}
              className="text-sm text-white/70 hover:text-white transition-colors relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="mailto:Abdurrachmanambi@gmail.com"
          data-testid="button-inquiry"
          className="bg-white text-[#1a1a1a] px-5 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 hover:bg-white/90 transition-colors"
        >
          Hire Me
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── HERO ─── */
function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = '/portrait.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="absolute top-[8%] left-1/2 -translate-x-1/2 z-10"
        style={{
          maskImage: ['linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)', 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'].join(', '),
          WebkitMaskImage: ['linear-gradient(to bottom, transparent 0%, black 18%, black 80%, transparent 100%)', 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'].join(', '),
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <img src="/portrait.jpg" alt="Abdurrachman Amby" className="w-[340px] md:w-[420px] h-auto object-contain" onLoad={() => setImageLoaded(true)} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute top-[61%] left-[8%] md:left-[12%] z-20"
      >
        <p className="font-script text-5xl md:text-6xl text-white/90">hi, i'm</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="absolute bottom-[4%] left-0 right-0 z-0 px-2"
      >
        <h1
          className="font-black leading-none tracking-tight text-center"
          style={{
            fontSize: 'clamp(2.5rem, 9vw, 10vw)',
            background: 'linear-gradient(to bottom, #ffffff 0%, #888888 60%, #333333 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Abdurrachman Amby
        </h1>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  );
}

/* ─── ABOUT ─── */
function About() {
  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '4+', label: 'Projects Completed' },
    { value: '6+', label: 'Organizations Contributed' },
    { value: '2026', label: 'Expected Graduate' },
  ];

  return (
    <div className="border-t border-white/10">
      <Section id="about">
        <FadeUp>
          <SectionLabel icon={User} label="About Me" />
          <SectionTitle>The person behind the work</SectionTitle>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeUp delay={0.1}>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Adaptable and detail-oriented professional with hands-on experience in document administration,
              finance support, data management, and web development. Currently serving as CTO at BUAHARA
              while pursuing a Bachelor's degree in Information Systems at Universitas Bakrie, Jakarta.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Eight years of competitive basketball have instilled discipline, leadership, and the ability to
              perform reliably under pressure — qualities I carry directly into my professional work ethic.
              I thrive in fast-moving environments and love building things that make a real impact.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="mailto:Abdurrachmanambi@gmail.com" data-testid="contact-email" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4" /> Abdurrachmanambi@gmail.com
              </a>
              <span className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="w-4 h-4" /> +62 822-5817-3441
              </span>
              <span className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4" /> Jakarta Pusat, Indonesia
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }, i) => (
              <FadeUp key={label} delay={0.15 + i * 0.08}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 transition-colors">
                  <div
                    className="text-4xl font-black mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {value}
                  </div>
                  <div className="text-sm text-white/50">{label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

/* ─── EXPERIENCE ─── */
const experiences = [
  {
    role: 'CTO',
    company: 'BUAHARA',
    period: 'Apr 2026 – Present',
    type: 'Full-time',
    sector: 'Supply Management',
    points: ['Built the company structure and digital infrastructure.', 'Digitalized all company operational needs.', 'Developed the company profile and brand identity.', 'Established and maintained client relationships.'],
  },
  {
    role: 'Freelance Developer',
    company: 'PT. Prioritas Partner Nusantara',
    period: 'Jul 2026 – Present',
    type: 'Freelance',
    sector: 'Security & Risk Management',
    points: ['Built the company profile website.', 'Developed and deployed the enterprise website.'],
  },
  {
    role: 'Founder',
    company: 'Cempedak Gen Zi',
    period: 'Jun 2026 – Jul 2026',
    type: 'Entrepreneur',
    sector: 'Food & Beverage Distribution',
    points: ['Built the business concept and operational model.', 'Supervised and controlled daily workflow.', 'Directed employees and managed supply chain.', 'Led marketing initiatives for the business.'],
  },
  {
    role: 'Assistant of CEO',
    company: 'Gofa Farm',
    period: 'Apr 2026 – May 2026',
    type: 'Full-time',
    sector: "DKI Jakarta's Largest Livestock Supplier",
    points: ['Created comprehensive product catalog.', 'Assisted CEO with day-to-day responsibilities.'],
  },
  {
    role: 'Finance & Data Administration Intern',
    company: 'Gofa Farm',
    period: 'Feb 2024 – Aug 2024',
    type: 'Internship',
    sector: "DKI Jakarta's Largest Livestock Supplier",
    points: ['Managed daily petty cash and reconciled every transaction.', 'Processed customer payments and prepared daily cash-closing reports.', 'Created and issued client invoices with billing details.', 'Updated daily sales reports for real-time management data.'],
  },
  {
    role: 'Freelance Document Administrator',
    company: 'PT. Amal Bakti Mulia',
    period: 'Jan 2023 – Present',
    type: 'Freelance',
    sector: 'Food & Beverage (Cafés & Bistros)',
    points: ['Organized, stored, and maintained physical and digital documents.', 'Reviewed incoming documents for accuracy and flagged corrections.', 'Digitized physical records through scanning and structured file naming.', 'Maintained strict confidentiality for sensitive company documents.'],
  },
];

function Experience() {
  return (
    <div className="border-t border-white/10 bg-white/[0.02]">
      <Section id="experience">
        <FadeUp>
          <SectionLabel icon={Briefcase} label="Work Experience" />
          <SectionTitle>Where I've contributed</SectionTitle>
        </FadeUp>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="md:pl-10 relative">
                  {/* dot */}
                  <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 border-white/30 bg-[#1c1e24] hidden md:block" />

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                        <p className="text-white/60 text-sm">{exp.company} · <span className="text-white/40">{exp.sector}</span></p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-white/40 bg-white/8 border border-white/10 px-3 py-1 rounded-full">{exp.type}</span>
                        <span className="text-xs text-white/50">{exp.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.points.map((point, j) => (
                        <li key={j} className="text-sm text-white/60 flex gap-2">
                          <span className="text-white/30 mt-1 flex-shrink-0">›</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Other experience */}
        <FadeUp delay={0.1} className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-white font-bold">Supply Chain Broker</h3>
                <p className="text-white/60 text-sm">PT. Fidel Pratama Sukses</p>
              </div>
              <span className="text-xs text-white/50">Sep 2024 – Present</span>
            </div>
            <ul className="space-y-1.5">
              <li className="text-sm text-white/60 flex gap-2"><span className="text-white/30 mt-1">›</span>Marketing the supply chain of the enterprise.</li>
              <li className="text-sm text-white/60 flex gap-2"><span className="text-white/30 mt-1">›</span>Connecting clients and founders to build business relationships.</li>
            </ul>
          </div>
        </FadeUp>
      </Section>
    </div>
  );
}

/* ─── PROJECTS ─── */
const projects = [
  {
    title: 'Find Seat',
    subtitle: 'Cinema Ticket Booking App',
    role: 'UI & Authentication Support',
    stack: ['Flutter', 'Firebase Auth', 'Mobile UI'],
    description: 'Built login and registration screens, integrated Firebase Authentication, and managed navigation flow between screens. Conducted usability testing and proposed UX improvements.',
    color: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    title: 'Amby Shoes',
    subtitle: 'E-Commerce Website',
    role: 'UI Designer & Support Developer',
    stack: ['HTML', 'CSS', 'Django', 'UI/UX'],
    description: 'Designed page layouts for homepage, product catalog, and product detail pages. Built a clean user-friendly interface and collaborated with backend team on shopping cart and checkout.',
    color: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: 'Bakrie Laboratory Website',
    subtitle: 'Data Management & Scheduling System',
    role: 'Data Management & PM',
    stack: ['Waterfall SDLC', 'UI/UX', 'Microsoft Project', 'WBS'],
    description: 'Developed a laboratory website for integrated data management, scheduling, and reporting. Led requirements analysis and UI/UX design, built WBS, Gantt charts, and critical path schedules.',
    color: 'from-orange-500/20 to-amber-500/10',
  },
  {
    title: 'Netflix App Testing',
    subtitle: 'Quality Assurance & Analysis',
    role: 'QA & Analyst',
    stack: ['UEQ', 'Functional Testing', 'Performance Testing', 'Security Testing'],
    description: 'Conducted functional, usability, performance, and security testing using User Experience Questionnaire (UEQ). Designed surveys, analyzed results, and delivered written improvement recommendations.',
    color: 'from-red-500/20 to-rose-500/10',
  },
];

function Projects() {
  return (
    <div className="border-t border-white/10">
      <Section id="projects">
        <FadeUp>
          <SectionLabel icon={Code2} label="Projects" />
          <SectionTitle>Things I've built</SectionTitle>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${project.color} p-6 h-full hover:border-white/25 hover:scale-[1.01] transition-all duration-300 flex flex-col`}>
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="text-white font-bold text-xl">{project.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm mb-1">{project.subtitle}</p>
                  <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full">{project.role}</span>
                </div>

                <p className="text-white/65 text-sm leading-relaxed flex-1 mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-xs text-white/60 bg-white/10 border border-white/10 px-2.5 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ─── SKILLS ─── */
function Skills() {
  const technical = ['Data Analysis', 'Database Administration', 'UI/UX & Product Design', 'IT Support / Troubleshooting', 'Document Administration', 'Finance & Data Support', 'Web Development'];
  const tools = ['Figma', 'Canva', 'Power BI', 'Microsoft Office', 'Python', 'Flutter', 'Firebase', 'HTML / CSS', 'Django'];
  const soft = ['Leadership', 'Critical Thinking', 'Problem Solving', 'Communication', 'Teamwork', 'Public Speaking', 'Time Management', 'Attention to Detail'];
  const languages = [{ lang: 'Indonesian', level: 'Native', pct: 100 }, { lang: 'English', level: 'Fluent', pct: 85 }];

  return (
    <div className="border-t border-white/10 bg-white/[0.02]">
      <Section id="skills">
        <FadeUp>
          <SectionLabel icon={Wrench} label="Skills & Tools" />
          <SectionTitle>What I bring to the table</SectionTitle>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { title: 'Technical Skills', tags: technical, accent: 'bg-blue-500/20 border-blue-400/20 text-blue-300' },
            { title: 'Tools & Software', tags: tools, accent: 'bg-emerald-500/20 border-emerald-400/20 text-emerald-300' },
            { title: 'Soft Skills', tags: soft, accent: 'bg-violet-500/20 border-violet-400/20 text-violet-300' },
          ].map(({ title, tags, accent }, i) => (
            <FadeUp key={title} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
                <h3 className="text-white font-semibold mb-4">{title}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2.5 py-1 rounded-full border ${accent}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Languages */}
        <FadeUp delay={0.2}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-white font-semibold mb-5">Languages</h3>
            <div className="space-y-4">
              {languages.map(({ lang, level, pct }) => (
                <div key={lang}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80 font-medium">{lang}</span>
                    <span className="text-white/40">{level}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-white/80 to-white/40"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </Section>
    </div>
  );
}

/* ─── EDUCATION & CERTIFICATES ─── */
function Education() {
  return (
    <div className="border-t border-white/10">
      <Section id="education">
        <FadeUp>
          <SectionLabel icon={GraduationCap} label="Education & Certificates" />
          <SectionTitle>Academic background</SectionTitle>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[
            {
              degree: 'Bachelor of Information Systems',
              school: 'Universitas Bakrie',
              location: 'Jakarta Selatan',
              period: 'Sep 2022 – Present',
              note: 'Ongoing — Expected graduation 2026',
            },
            {
              degree: 'High School Diploma',
              school: 'SMAN 3 Jakarta Selatan',
              location: 'Jakarta Selatan',
              period: 'Jul 2019 – May 2022',
              note: 'Completed',
            },
          ].map((edu, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-white font-bold">{edu.degree}</h3>
                    <p className="text-white/60 text-sm">{edu.school} · {edu.location}</p>
                  </div>
                  <span className="text-xs text-white/40 flex-shrink-0">{edu.period}</span>
                </div>
                <span className="text-xs text-white/40 bg-white/8 border border-white/10 px-2.5 py-1 rounded-full">{edu.note}</span>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Certificates & Org */}
        <div className="grid md:grid-cols-2 gap-6">
          <FadeUp delay={0.15}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-white/40" />
                <h3 className="text-white font-semibold">Certificates</h3>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-medium">Leadership & Problem Solving</p>
                  <p className="text-xs text-white/40">Soft Skills Training Certificate</p>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-white/40" />
                <h3 className="text-white font-semibold">Organizational Experience</h3>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 border border-violet-400/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-violet-300" />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-medium">Organizing Committee Member</p>
                  <p className="text-xs text-white/40">BEPRO DKI Jakarta · Sep 2024 – Jun 2025</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>
    </div>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  return (
    <div className="border-t border-white/10 bg-white/[0.02]">
      <Section id="contact">
        <FadeUp>
          <SectionLabel icon={Mail} label="Contact" />
          <SectionTitle>Let's work together</SectionTitle>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeUp delay={0.1}>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              I'm open to full-time positions, freelance projects, and collaboration opportunities.
              If you're building something great and need someone who is disciplined, adaptable, and
              detail-oriented — let's talk.
            </p>
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'Abdurrachmanambi@gmail.com', href: 'mailto:Abdurrachmanambi@gmail.com' },
                { icon: Phone, label: '+62 822-5817-3441', href: 'tel:+6282258173441' },
                { icon: MapPin, label: 'Jakarta Pusat, Indonesia', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} data-testid={`contact-${label}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
                  <span className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center group-hover:bg-white/12 transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm">{label}</span>
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <div
                className="text-5xl font-black mb-2"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #666666 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Open to Work
              </div>
              <p className="text-white/50 text-sm mb-6">Available for full-time & freelance roles</p>
              <a
                href="mailto:Abdurrachmanambi@gmail.com"
                data-testid="button-hire-me"
                className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] px-7 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Send a Message
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* Footer */}
      <div className="border-t border-white/10 py-6 px-6 text-center">
        <p className="text-white/30 text-xs">© 2026 Abdurrachman Amby · Jakarta, Indonesia</p>
      </div>
    </div>
  );
}

/* ─── HOME ─── */
function Home() {
  return (
    <div
      className="w-full"
      style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 35%, #545760 0%, #3d3f47 35%, #2b2d35 65%, #1c1e24 100%)' }}
    >
      <Navbar />
      <Hero />
      <div style={{ background: '#14151a' }}>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
