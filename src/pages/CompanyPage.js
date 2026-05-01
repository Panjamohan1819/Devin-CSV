import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { C, Ic } from '../components/ui'
import Leader_1 from '../assets/Leader_1.png'
import Leader_2 from '../assets/Leader_2.jpg'
import Leader_3 from '../assets/Leader_3.jpg'
import Leader_4 from '../assets/Leader_4.jpg'
// If file extension differs, change `.jpg` to match your local file (e.g. .png, .webp)
import Aboutus_Img from '../assets/Aboutus_Img.png'

function useReveal() {
  useEffect(() => {
    const t = setTimeout(() => {
      document.querySelectorAll('.rv').forEach(el => {
        const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('show'); ob.disconnect() } }, { threshold:.1 })
        ob.observe(el)
      })
    }, 60)
    return () => clearTimeout(t)
  })
}

// ── Content data ────────────────────────────────────────────────────────────────
const TIMELINE = [
  { year:'2009', title:'Founded in London', desc:'DevinStratus Technologies incorporated as a Microsoft Dynamics partner, starting with a team of 4 consultants in the City of London.' },
  { year:'2012', title:'Microsoft Gold Partner', desc:'Achieved Microsoft Gold Partner status after delivering 50+ successful Dynamics AX and NAV implementations across the UK.' },
  { year:'2015', title:'New York Office Opens', desc:'Expanded to North America with a Manhattan office, serving mid-market and enterprise clients across the eastern seaboard.' },
  { year:'2017', title:'Dynamics 365 Launch Partner', desc:'Selected as a Microsoft Dynamics 365 Launch Partner — one of only 12 firms globally — for the cloud ERP & CRM rollout.' },
  { year:'2019', title:'India & Canada Expansion', desc:'Opened delivery centres in New Delhi and Toronto, enabling 24/7 support coverage and significantly expanding capacity.' },
  { year:'2021', title:'Microsoft Inner Circle', desc:'Inducted into the Microsoft Business Applications Inner Circle — a recognition given to the top 1% of Microsoft partners globally.' },
  { year:'2023', title:'500+ Deployments', desc:'Surpassed 500 Dynamics 365 deployments across 28 countries, with a client retention rate of 94% over 5 years.' },
  { year:'2025', title:'AI & Copilot Practice Launched', desc:'Launched a dedicated Microsoft Copilot & AI practice, helping clients embed AI into finance, sales and operations workflows.' },
]

const VALUES = [
  { icon:'Shield',  title:'Client-First Always',     color:C.blue,   desc:'Every decision we make is evaluated against one question: does this deliver more value for our clients? Our success metrics are measured by theirs.' },
  { icon:'Star',    title:'Uncompromising Quality',   color:C.purple, desc:'We hold ourselves to the same standard on day 100 of an engagement as on day 1. Every deliverable is reviewed, tested, and signed off before it reaches you.' },
  { icon:'Users',   title:'People-Led Delivery',      color:C.teal,   desc:'Technology is only as good as the people configuring it. We invest heavily in our team\'s continuous certification, training and wellbeing.' },
  { icon:'Globe',   title:'Transparent Partnership',  color:C.orange, desc:'No surprises. We tell you what\'s working, what isn\'t, and what we\'re doing about it. Honest communication is non-negotiable.' },
  { icon:'Zap',     title:'Outcome Obsessed',         color:C.green,  desc:'We\'re not satisfied with a system that\'s technically delivered. We measure success by the business outcomes it drives — efficiency, revenue, insight.' },
  { icon:'Award',   title:'Continuous Innovation',    color:C.blue,   desc:'We track every Microsoft release, test every AI feature, and proactively bring new capabilities to clients before they even know to ask for them.' },
]

const TEAM = [
  { name:'Deepakteja', role:'Founder & CEO',                  loc:'Ontario, CA',    exp:'20 yrs', cert:'MBA · MC-900',        initials:'DT', color:C.blue,
    about:'Deepakteja founded DevinStratus in 2009 with a vision to make Dynamics 365 deliver real, measurable business outcomes. He sets company strategy, leads global client relationships, and drives the partnerships that have made DevinStratus a Microsoft Gold Partner.',
    linkedin:'https://linkedin.com' },
  { name:'Vinay Kumar',  role:'Co-Founder & COO',              loc:'Ontario, CA',    exp:'20 yrs', cert:'MBA · PMP',           initials:'VK', color:C.green,
    about:'Vinay Kumar co-founded DevinStratus in 2009 alongside Deepakteja. As Chief Operating Officer he runs day-to-day operations, delivery governance, and customer success — ensuring every engagement lands on time, on budget, and on outcome.',
    linkedin:'https://linkedin.com' },
  { name:'Manideepa',    role:'Director of Finance & HR',      loc:'Hyderabad, IN',  exp:'16 yrs', cert:'CA · MBA-HR',         initials:'MD', color:C.purple,
    about:'Manideepa leads finance, people operations, and corporate governance across DevinStratus. She manages financial planning, compliance, and the talent strategy that has scaled the firm to 120+ certified consultants across four continents.',
    linkedin:'https://linkedin.com' },
  { name:'Vineeth',      role:'Director of Sales & Marketing', loc:'London, UK',     exp:'14 yrs', cert:'MB-910 · Salesforce', initials:'VN', color:C.teal,
    about:'Vineeth heads global sales and marketing, owning revenue growth, brand positioning, and strategic account development. He has built DevinStratus\' enterprise pipeline across North America, Europe, and APAC over the past decade.',
    linkedin:'https://linkedin.com' },
  { name:'Anil Kapoor',     role:'Head of Delivery, APAC',    loc:'New Delhi, IN', exp:'13 yrs', cert:'MB-800 · AZ-900',       initials:'AK', color:C.green,
    about:'Anil heads our India delivery centre and APAC client operations, specialising in Business Central and supply chain implementations for manufacturing and logistics clients.',
    linkedin:'https://linkedin.com' },
  { name:'Natalie Girard',  role:'VP Sales & Partnerships',   loc:'Toronto, CA',   exp:'11 yrs', cert:'MB-910 · Salesforce',   initials:'NG', color:C.blue,
    about:'Natalie drives our global sales strategy and partner ecosystem. She has built long-term relationships with over 200 enterprise clients across North America and Europe.',
    linkedin:'https://linkedin.com' },
  { name:'David Park',      role:'AI & Copilot Practice Lead',loc:'New York, USA', exp:'9 yrs',  cert:'AI-102 · MB-1002',      initials:'DP', color:C.purple,
    about:'David leads our dedicated Microsoft Copilot & AI practice, helping clients embed artificial intelligence into finance, sales, and operations workflows across the Dynamics 365 platform.',
    linkedin:'https://linkedin.com' },
  { name:'Emma Rhodes',     role:'Head of Finance Practice',  loc:'London, UK',    exp:'15 yrs', cert:'ACCA · MB-310',         initials:'ER', color:C.teal,
    about:'Emma is a qualified accountant and D365 Finance specialist. She leads our finance transformation engagements, helping CFOs close faster, consolidate entities, and automate reporting.',
    linkedin:'https://linkedin.com' },
]

const OFFICES = [
  { flag:'🇬🇧', city:'London, UK', addr:'30 St Mary Axe, EC3A 8EP', phone:'+44 207 193 2502', email:'london@devinstratus.com', tz:'GMT/BST', headcount:'62 staff', founded:'2009' },
  { flag:'🇺🇸', city:'New York, USA', addr:'1700 Broadway, 28th Floor, NY 10019', phone:'+1 800 938 7929', email:'usa@devinstratus.com', tz:'EST/EDT', headcount:'31 staff', founded:'2015' },
  { flag:'🇮🇳', city:'New Delhi, India', addr:'Plot 5, Sector 44, Gurugram 122003', phone:'+91 96503 01529', email:'india@devinstratus.com', tz:'IST (+5:30)', headcount:'48 staff', founded:'2019' },
  { flag:'🇨🇦', city:'Toronto, Canada', addr:'181 Bay Street, Suite 1800, M5J 2T3', phone:'+1 778 381 5388', email:'canada@devinstratus.com', tz:'EST/EDT', headcount:'18 staff', founded:'2019' },
]

const AWARDS = [
  { year:'2025', award:'Microsoft Business Applications Inner Circle', issuer:'Microsoft Corporation',        icon:'Award',  color:C.blue   },
  { year:'2025', award:'UK Cloud ERP Partner of the Year',             issuer:'Cloud Industry Forum',         icon:'Star',   color:C.purple },
  { year:'2024', award:'Top 50 Microsoft Dynamics Partners Globally',  issuer:'Dynamics Communities',         icon:'Globe',  color:C.teal   },
  { year:'2024', award:'Best Digital Transformation Firm — Mid-Market',issuer:'ERP Today Awards',             icon:'Zap',    color:C.orange },
  { year:'2023', award:'Microsoft Gold Partner — Business Applications',issuer:'Microsoft',                   icon:'Award',  color:C.blue   },
  { year:'2023', award:'Glassdoor Top 50 UK Tech Employer',            issuer:'Glassdoor',                    icon:'Users',  color:C.green  },
  { year:'2022', award:'Best ERP Implementation of the Year',          issuer:'Computing Technology Awards',  icon:'Package',color:C.purple },
  { year:'2022', award:'Microsoft FastTrack Recognised Partner',       issuer:'Microsoft',                    icon:'Rocket', color:C.teal   },
]

const JOBS = [
  { title:'Senior Dynamics 365 Finance Consultant',   loc:'London / Remote',  type:'Full-time', dept:'Delivery',  color:C.blue   },
  { title:'Power Platform Developer',                  loc:'New Delhi / Remote',type:'Full-time', dept:'Technical', color:C.purple },
  { title:'D365 CRM Functional Consultant',            loc:'New York / Hybrid', type:'Full-time', dept:'Delivery',  color:C.teal   },
  { title:'Azure Integration Architect',               loc:'London / Remote',   type:'Full-time', dept:'Technical', color:C.orange },
  { title:'Business Development Manager',              loc:'Toronto / Hybrid',  type:'Full-time', dept:'Sales',     color:C.green  },
  { title:'Microsoft Copilot Solution Architect',      loc:'Remote (Any)',       type:'Full-time', dept:'AI Practice',color:C.blue  },
]

const PRESS = [
  { date:'Jan 2025', title:'DevinStratus Named to Microsoft\'s 2025 Business Applications Inner Circle', source:'Microsoft Partner Blog', color:C.blue },
  { date:'Nov 2024', title:'ERP Specialist DevinStratus Launches Dedicated AI & Copilot Practice', source:'Computing Magazine',         color:C.purple },
  { date:'Sep 2024', title:'How DevinStratus Cut Month-End Close by 70% for a UK Manufacturer',   source:'ERP Today',                  color:C.teal },
  { date:'Jun 2024', title:'DevinStratus Expands Toronto Office to Meet North American Demand',    source:'TechCrunch Canada',          color:C.orange },
  { date:'Mar 2024', title:'Q&A: Why AI Is the Next Frontier in ERP with DevinStratus CTO',       source:'InfoWorld',                  color:C.green },
]

// ── Shared Hero ─────────────────────────────────────────────────────────────────
function CompanyHero({ section, navigate }) {
  const cfg = {
    about:   { color:C.blue,   title:'About DevinStratus', sub:'Our story, mission & 16-year track record' },
    team:    { color:C.purple, title:'Meet Our Team', sub:'120+ certified consultants across 4 continents' },
    global:  { color:C.teal,   title:'Global Offices', sub:'London · New York · New Delhi · Toronto' },
    awards:  { color:C.orange, title:'Awards & Recognition', sub:'Recognised excellence, year after year' },
    careers: { color:C.green,  title:'Careers at DevinStratus', sub:'Build the future of enterprise ERP with us' },
    press:   { color:C.purple, title:'Press & Media', sub:'News, announcements and expert commentary' },
  }[section] || { color:C.blue, title:'Company', sub:'' }

  return (
    <section style={{
      background: `
        radial-gradient(circle at 100% 100%, rgba(6, 182, 212, 0.35), transparent 55%),
        radial-gradient(circle at 80% 70%, rgba(0, 102, 255, 0.20), transparent 60%),
        linear-gradient(135deg, #ffffff 0%, #f0f7ff 25%, #d6ebff 55%, #b8defa 80%, #9bd3f5 100%)
      `,
      paddingTop:0, position:'relative', overflow:'hidden', borderBottom:'1px solid rgba(0, 102, 255, 0.10)'
    }}>
      {/* Soft floating decorative orbs */}
      <div style={{ position:'absolute', top:'15%', right:'-5%', width:380, height:380, borderRadius:'50%', background:'radial-gradient(circle, rgba(6, 182, 212, 0.30), transparent 70%)', filter:'blur(50px)', animation:'heroFloat 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle, rgba(0, 102, 255, 0.18), transparent 70%)', filter:'blur(50px)', animation:'heroFloat 11s ease-in-out infinite reverse', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'40%', right:'25%', width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle, ${cfg.color}25, transparent 70%)`, filter:'blur(40px)', animation:'heroFloat 13s ease-in-out infinite 2s', pointerEvents:'none' }} />
      {/* Subtle grid pattern overlay */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 102, 255, 0.04) 1px, transparent 1px)', backgroundSize:'48px 48px', maskImage:'radial-gradient(ellipse at center, #000 30%, transparent 75%)', WebkitMaskImage:'radial-gradient(ellipse at center, #000 30%, transparent 75%)', pointerEvents:'none' }} />

      <div className="company-hero-grid" style={{ maxWidth:1280, margin:'0 auto', padding:'132px 24px 72px', position:'relative', zIndex:1, display:'grid', gridTemplateColumns: section==='about' ? '1.1fr 1fr' : '1fr', gap:48, alignItems:'center' }}>
        {/* LEFT — content */}
        <div>
          <button onClick={() => navigate('/company/about')}
            style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.7)', border:'1px solid rgba(0, 102, 255, 0.18)', borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:600, color:'#475569', cursor:'pointer', marginBottom:28, backdropFilter:'blur(8px)', transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.18)' }}>
            <Ic n="ChevD" s={12} style={{ transform:'rotate(90deg)', color:'#0066FF' }} /> Company
          </button>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${cfg.color}14`, border:`1px solid ${cfg.color}33`, borderRadius:50, padding:'7px 16px', fontSize:12, fontWeight:700, color:cfg.color, marginBottom:20, backdropFilter:'blur(6px)' }}>
            <Ic n="Award" s={12} style={{ color:cfg.color }} /> Microsoft Gold Partner · Est. 2009
          </div>
          <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#0a0a14', lineHeight:1.1, marginBottom:16, fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>
            {cfg.title.split(' ').slice(0,-1).join(' ')}{' '}
            <span className="grad-text" style={{ background:`linear-gradient(135deg, ${cfg.color}, ${cfg.color}aa)`, display:'inline-block' }}>
              {cfg.title.split(' ').slice(-1)[0]}
            </span>
          </h1>
          <p style={{ fontSize:17, color:'#475569', maxWidth:540, lineHeight:1.7 }}>{cfg.sub}</p>
          {/* Quick stats bar */}
          <div style={{ display:'flex', gap:32, marginTop:40, flexWrap:'wrap' }}>
            {[['500+','Deployments'],['16','Years'],['4','Continents'],['120+','Consultants']].map(([v,l]) => (
              <div key={l} style={{ textAlign:'left' }}>
                <div style={{ fontSize:28, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.02em' }}>{v}</div>
                <div style={{ fontSize:11.5, color:'#64748b', marginTop:3, fontWeight:600, letterSpacing:'.04em' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image (only on About Us page) */}
        {section==='about' && (
          <div className="company-hero-image" style={{ position:'relative' }}>
            {/* Decorative gradient frames behind image */}
            <div style={{ position:'absolute', top:-12, right:-12, width:'94%', height:'94%', borderRadius:24, background:`linear-gradient(135deg, ${C.blue}, ${C.teal})`, opacity:0.22, zIndex:0 }} />
            <div style={{ position:'absolute', bottom:-12, left:-12, width:'94%', height:'94%', borderRadius:24, background:`linear-gradient(135deg, ${C.purple}, ${C.blue})`, opacity:0.14, zIndex:0 }} />

            {/* Image */}
            <div style={{ position:'relative', borderRadius:24, overflow:'hidden', zIndex:1, boxShadow:'0 28px 64px rgba(0, 53, 128, 0.22), inset 0 1px 0 rgba(255,255,255,0.9)', border:'1px solid rgba(0, 102, 255, 0.12)' }}>
              <img src={Aboutus_Img} alt="DevinStratus team at work"
                style={{ width:'100%', height:'auto', display:'block', objectFit:'cover', aspectRatio:'4 / 5', maxHeight:520 }} />
              {/* Bottom gradient overlay */}
              <div style={{ position:'absolute', left:0, right:0, bottom:0, height:120, background:'linear-gradient(180deg, transparent, rgba(0, 18, 51, 0.40))', pointerEvents:'none' }} />
            </div>

            {/* Floating stat 1 — top-right */}
            <div className="hero-float-stat hero-float-stat-tr" style={{ position:'absolute', top:20, right:-18, padding:'12px 16px', borderRadius:14, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(12px)', border:'1px solid rgba(0, 102, 255, 0.14)', boxShadow:'0 14px 32px rgba(0, 53, 128, 0.18)', zIndex:2, display:'flex', alignItems:'center', gap:11 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg, ${C.blue}, ${C.purple})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 14px ${C.blue}44` }}>
                <Ic n="Award" s={18} style={{ color:'#fff' }} />
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, letterSpacing:'-0.01em' }}>Gold Partner</div>
                <div style={{ fontSize:10, color:'#64748b', marginTop:3, fontWeight:600, letterSpacing:'.04em' }}>Microsoft Certified</div>
              </div>
            </div>

            {/* Floating stat 2 — bottom-left */}
            <div className="hero-float-stat hero-float-stat-bl" style={{ position:'absolute', bottom:20, left:-18, padding:'12px 16px', borderRadius:14, background:'rgba(255,255,255,0.96)', backdropFilter:'blur(12px)', border:'1px solid rgba(0, 102, 255, 0.14)', boxShadow:'0 14px 32px rgba(0, 53, 128, 0.18)', zIndex:2, display:'flex', alignItems:'center', gap:11 }}>
              <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg, ${C.teal}, ${C.blue})`, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 6px 14px ${C.teal}44` }}>
                <Ic n="Users" s={18} style={{ color:'#fff' }} />
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1, letterSpacing:'-0.01em' }}>120+ Consultants</div>
                <div style={{ fontSize:10, color:'#64748b', marginTop:3, fontWeight:600, letterSpacing:'.04em' }}>Across 4 Continents</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ── Themed visual for non-photo Company sections ─────────────────────────────────
// Each section gets a unique enterprise-style card with relevant data + iconography.
function SectionVisual({ section, color }) {
  const visuals = {
    global: {
      icon: 'Globe',
      title: '4 Global Offices',
      subtitle: '120+ certified consultants',
      items: [
        { icon:'Pin',  label:'London, UK',     sub:'Headquarters · 38 staff' },
        { icon:'Pin',  label:'New York, USA',  sub:'Americas · 32 staff' },
        { icon:'Pin',  label:'New Delhi, IN',  sub:'APAC delivery · 35 staff' },
        { icon:'Pin',  label:'Toronto, CA',    sub:'North America · 15 staff' },
      ],
    },
    awards: {
      icon: 'Award',
      title: 'Recognised Excellence',
      subtitle: '12 industry awards · 2022–2025',
      items: [
        { icon:'Award',     label:'Microsoft Inner Circle', sub:'Top 1% global partners' },
        { icon:'Star',      label:'Partner of the Year',     sub:'Business Applications · 2024' },
        { icon:'Shield',    label:'ISO 27001 Certified',     sub:'Information security' },
        { icon:'Award',     label:'Gartner Recognised',      sub:'D365 Implementation Specialist' },
      ],
    },
    careers: {
      icon: 'Users',
      title: "We're Hiring",
      subtitle: '14 open positions · global remote',
      items: [
        { icon:'Cpu',    label:'D365 F&O Developer',      sub:'London · Remote · 5+ yrs' },
        { icon:'Cloud',  label:'Azure Solution Architect',sub:'New York · Remote · 7+ yrs' },
        { icon:'Brain',  label:'AI / Copilot Engineer',   sub:'Hybrid · 4+ yrs' },
        { icon:'Users',  label:'Practice Lead — Retail',  sub:'Toronto · 10+ yrs' },
      ],
    },
    press: {
      icon: 'FileText',
      title: 'Press & Media',
      subtitle: '24 features · 2023–2025',
      items: [
        { icon:'FileText', label:'Forbes',           sub:'"Reshaping mid-market ERP" · 2024' },
        { icon:'FileText', label:'TechCrunch',       sub:'"AI-first consulting" · 2024' },
        { icon:'FileText', label:'Microsoft Blog',   sub:'Featured Partner Story · 2025' },
        { icon:'FileText', label:'CIO Review',       sub:'Top 10 D365 Partners · 2024' },
      ],
    },
  }
  const v = visuals[section] || visuals.global

  return (
    <div className="company-hero-image" style={{ position:'relative', paddingRight:32 }}>
      {/* Soft glow */}
      <div style={{ position:'absolute', top:'8%', left:'8%', right:'8%', bottom:'8%', borderRadius:32, background:`radial-gradient(circle, ${color}28, transparent 70%)`, filter:'blur(40px)', zIndex:0 }} />
      {/* Subtle gradient frame */}
      <div style={{ position:'absolute', top:-10, right:-10, bottom:-10, left:-10, borderRadius:28, background:`linear-gradient(135deg, ${color}, ${C.teal})`, opacity:0.14, zIndex:0 }} />

      {/* Main themed card */}
      <div style={{ position:'relative', zIndex:1, padding:'32px 30px 28px', borderRadius:24, background:'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,249,255,0.94) 100%)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', border:`1px solid ${color}22`, boxShadow:'0 32px 80px rgba(0, 53, 128, 0.18), inset 0 1px 0 rgba(255,255,255,0.9)', overflow:'hidden' }}>

        {/* Decorative corner blob */}
        <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200, borderRadius:'50%', background:`radial-gradient(circle, ${color}1f, transparent 70%)`, pointerEvents:'none' }} />

        {/* Header — big icon + title + subtitle */}
        <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:24, position:'relative', zIndex:1 }}>
          <div style={{ width:54, height:54, borderRadius:14, background:`linear-gradient(135deg, ${color}, ${color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 10px 22px ${color}45, inset 0 1px 0 rgba(255,255,255,0.25)` }}>
            <Ic n={v.icon} s={26} style={{ color:'#fff' }} />
          </div>
          <div style={{ minWidth:0, flex:1 }}>
            <div style={{ fontSize:20, fontWeight:900, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", lineHeight:1.18, letterSpacing:'-0.02em' }}>{v.title}</div>
            <div style={{ fontSize:12.5, color:'#475569', marginTop:6, fontWeight:600, letterSpacing:'.02em' }}>{v.subtitle}</div>
          </div>
        </div>

        {/* Items list */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, position:'relative', zIndex:1 }}>
          {v.items.map((it, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:12, background:'rgba(0, 102, 255, 0.04)', border:'1px solid rgba(0, 102, 255, 0.08)', transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background=`${color}10`; e.currentTarget.style.borderColor=`${color}30`; e.currentTarget.style.transform='translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(0, 102, 255, 0.04)'; e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.08)'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:34, height:34, borderRadius:9, background:`${color}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n={it.icon} s={16} style={{ color:color }} />
              </div>
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ fontSize:13.5, fontWeight:800, color:'#0a0a14', fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:'-0.01em', lineHeight:1.3 }}>{it.label}</div>
                <div style={{ fontSize:11.5, color:'#64748b', marginTop:2, fontWeight:500 }}>{it.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── About Section ───────────────────────────────────────────────────────────────
function AboutSection({ navigate, openConsult }) {
  useReveal()
  return (
    <div>
      <section className="company-section" style={{ padding:'72px 24px', background:'#fff' }}>
        <div className="company-about-g" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, alignItems:'start' }}>
          <div className="rv">
            <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom:16 }} />
            <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16, lineHeight:1.2 }}>
              We Make Dynamics 365 <span className="grad-text" style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, display:'inline-block' }}>Actually Work</span>
            </h2>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:20 }}>
              DevinStratus Technologies was founded in 2009 with a simple belief: enterprise software should deliver measurable business results, not just go live and gather dust. Sixteen years later, that belief still drives every engagement we take on.
            </p>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:20 }}>
              We are a Microsoft Gold Partner specialising exclusively in the Dynamics 365 platform — finance, operations, CRM, supply chain, and the Power Platform ecosystem that connects them. Our focus means our consultants are deeper, faster, and more effective than generalist firms.
            </p>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:32 }}>
              With 120+ certified consultants across London, New York, New Delhi and Toronto, we serve mid-market and enterprise businesses in manufacturing, retail, financial services, healthcare, logistics and professional services.
            </p>
            <button onClick={openConsult} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif", boxShadow:`0 8px 24px ${C.blue}33`, transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 14px 32px ${C.blue}44` }}
              onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`0 8px 24px ${C.blue}33` }}>
              Talk to Our Team <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
            </button>
          </div>
          <div className="rv">
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Our Mission</h3>
              <div style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius:18, padding:28, color:'#fff', position:'relative', overflow:'hidden', boxShadow:`0 12px 32px ${C.blue}28` }}>
                <div style={{ position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)', pointerEvents:'none' }} />
                <Ic n="Target" s={28} style={{ color:'rgba(255,255,255,.6)', marginBottom:12 }} />
                <p style={{ fontSize:16, lineHeight:1.8, fontWeight:500, position:'relative', zIndex:1 }}>
                  "To make Dynamics 365 the competitive advantage of every business we work with — not just a system they have to use, but one they genuinely love."
                </p>
              </div>
            </div>
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Our Values</h3>
            <div className="company-values-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ padding:'18px', borderRadius:14, border:'1px solid rgba(0, 102, 255, 0.10)', background:'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)', boxShadow:'0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)', transition:'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=v.color+'45'; e.currentTarget.style.boxShadow=`0 10px 24px ${v.color}1a, inset 0 1px 0 rgba(255,255,255,0.9)`; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.10)'; e.currentTarget.style.boxShadow='0 1px 3px rgba(0, 53, 128, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:`linear-gradient(135deg, ${v.color}, ${v.color}cc)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10, boxShadow:`0 4px 12px ${v.color}30` }}>
                    <Ic n={v.icon} s={16} style={{ color:'#fff' }} />
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{v.title}</div>
                  <div style={{ fontSize:11.5, color:C.textM, lineHeight:1.6 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="company-section" style={{ padding:'72px 24px', background:C.bgSoft }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="rv" style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'inline-flex', background:C.blueL, color:C.blue, borderRadius:50, padding:'6px 16px', fontSize:12, fontWeight:700, marginBottom:16 }}>OUR JOURNEY</div>
            <h2 style={{ fontSize:'clamp(26px,4vw,38px)', fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>16 Years of Delivering Excellence</h2>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, background:`linear-gradient(180deg,${C.blue},${C.purple})`, transform:'translateX(-50%)', opacity:.3 }} />
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="rv" style={{ display:'flex', justifyContent: i%2===0 ? 'flex-start' : 'flex-end', marginBottom:32, position:'relative' }}>
                <div style={{ width:'44%', padding:'22px 24px', background:'#fff', borderRadius:18, border:`1.5px solid ${C.border}`, boxShadow:'0 4px 20px rgba(0,0,0,.06)', animation:`fadeUp .4s ease both ${i*60}ms` }}>
                  <div style={{ fontSize:12, fontWeight:800, color:C.blue, marginBottom:6, letterSpacing:'.08em' }}>{t.year}</div>
                  <h4 style={{ fontSize:16, fontWeight:700, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>{t.title}</h4>
                  <p style={{ fontSize:13.5, color:C.textM, lineHeight:1.65 }}>{t.desc}</p>
                </div>
                <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:14, height:14, borderRadius:'50%', background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'3px solid #fff', boxShadow:'0 2px 8px rgba(0,87,184,.3)', zIndex:1 }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Team Section — final design (Style 03 Minimal Grid + bio modal) ─────────────
function TeamSection() {
  useReveal()
  const [bioFor, setBioFor] = useState(null)  // member object when modal open, null otherwise

  // 4 leaders — already ordered in TEAM array: Deepak, Vinay, Deepa, Vineeth
  // Photo mapping: Leader_1=Deepak, Leader_4=Vinay, Leader_2=Deepa, Leader_3=Vineeth
  const LEADERS = [
    { ...TEAM[0], color:C.blue,   photo:Leader_1 },  // Deepak — Founder & CEO
    { ...TEAM[1], color:C.green,  photo:Leader_4 },  // Vinay — Co-Founder & COO
    { ...TEAM[2], color:C.purple, photo:Leader_2 },  // Deepa — Director of Finance & HR
    { ...TEAM[3], color:C.teal,   photo:Leader_3 },  // Vineeth — Director of Sales & Marketing
  ]

  // Lock body scroll when modal is open
  useEffect(() => {
    if (bioFor) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e) => { if (e.key === 'Escape') setBioFor(null) }
      window.addEventListener('keydown', onKey)
      return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
    }
  }, [bioFor])

  return (
    <section className="company-section" style={{ padding:'72px 24px', background:'linear-gradient(180deg,#f5f9ff 0%,#fff 35%)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        {/* Section header */}
        <div className="rv" style={{ marginBottom:48 }}>
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.blue},${C.purple})`, marginBottom:16 }} />
          <h2 style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:900, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:10, letterSpacing:'-0.02em' }}>Leadership Team</h2>
          <p style={{ color:C.textM, fontSize:16, maxWidth:600, lineHeight:1.65 }}>The people steering DevinStratus — deep Dynamics 365 expertise, global consulting experience, and an obsession with client outcomes.</p>
        </div>

        {/* Cards grid */}
        <div className="leaders-grid-final">
          {LEADERS.map((m, i) => (
            <div key={`lf-${m.name}`} className="rv leader-final"
              style={{
                position:'relative',
                paddingBottom:24,
                borderRadius:22,
                background:'#ffffff',
                border:'1px solid rgba(0, 102, 255, 0.10)',
                boxShadow:'0 4px 16px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
                overflow:'hidden',
                cursor:'default', transition:'all .35s cubic-bezier(.22,1,.36,1)',
                animation:`fadeUp .55s ease both ${i*70}ms`,
                textAlign:'center',
                display:'flex', flexDirection:'column'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=`${m.color}45`; e.currentTarget.style.boxShadow=`0 18px 44px ${m.color}20, inset 0 1px 0 rgba(255, 255, 255, 0.9)`; e.currentTarget.style.transform='translateY(-5px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(0, 102, 255, 0.10)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform='none' }}>

              {/* Top section with soft gradient backdrop (borrowed from Style 6) */}
              <div style={{ position:'relative', padding:'36px 22px 0', background:`linear-gradient(160deg, ${m.color}14 0%, transparent 75%)` }}>
                {/* Decorative corner shape */}
                <div style={{ position:'absolute', top:0, right:0, width:90, height:90, background:`linear-gradient(225deg, ${m.color}18, transparent)`, borderRadius:'0 22px 0 90px', pointerEvents:'none' }} />

                {/* FOUNDING TEAM badge — only for founders */}
                {m.role.toLowerCase().includes('founder') && (
                  <div style={{ position:'absolute', top:14, left:14, display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px 4px 8px', borderRadius:50, background:`linear-gradient(135deg, ${m.color}, ${m.color}cc)`, boxShadow:`0 4px 10px ${m.color}40`, zIndex:3 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6.5 7 1-5 4.5 1.5 7L12 17.5 5.5 21 7 14 2 9.5l7-1z"/></svg>
                    <span style={{ fontSize:8.5, fontWeight:800, color:'#fff', letterSpacing:'.12em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Founder</span>
                  </div>
                )}

                {/* Circular photo 160×160 with gradient ring */}
                <div style={{ position:'relative', width:160, height:160, margin:'0 auto 20px', zIndex:1 }}>
                  {/* Gradient ring */}
                  <div style={{ position:'absolute', inset:-4, borderRadius:'50%', background:`linear-gradient(135deg, ${m.color}, ${m.color}66)`, padding:4, boxShadow:`0 10px 28px ${m.color}38` }}>
                    <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', background:'#fff' }}>
                      <Portrait member={m} variant="circle" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', flex:1 }}>
                <h3 style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6, letterSpacing:'-0.01em', lineHeight:1.25 }}>{m.name}</h3>
                <div style={{ fontSize:13, fontWeight:600, color:m.color, marginBottom:16, lineHeight:1.4 }}>{m.role}</div>

                {/* Single divider */}
                <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${m.color}30, transparent)`, margin:'0 0 16px' }} />

                {/* Quick meta */}
                <div style={{ display:'flex', justifyContent:'center', gap:14, fontSize:11.5, color:C.textM, marginBottom:18, flexWrap:'wrap' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}><Ic n="Pin" s={11} style={{ color:C.textL }} />{m.loc}</span>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:4 }}><Ic n="Clock" s={11} style={{ color:C.textL }} />{m.exp}</span>
                </div>

                {/* Action buttons row */}
                <div style={{ display:'flex', gap:8, marginTop:'auto' }}>
                  <button onClick={() => setBioFor(m)}
                    style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 14px', borderRadius:50, background:`${m.color}10`, color:m.color, fontSize:12, fontWeight:700, border:`1px solid ${m.color}25`, cursor:'pointer', transition:'all .2s', fontFamily:"'Plus Jakarta Sans',sans-serif" }}
                    onMouseEnter={e => { e.currentTarget.style.background=m.color; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=m.color }}
                    onMouseLeave={e => { e.currentTarget.style.background=`${m.color}10`; e.currentTarget.style.color=m.color; e.currentTarget.style.borderColor=`${m.color}25` }}>
                    <Ic n="FileText" s={11} />
                    Read Bio
                  </button>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 16px', borderRadius:50, background:`linear-gradient(135deg, ${m.color}, ${m.color}cc)`, color:'#fff', fontSize:12, fontWeight:700, textDecoration:'none', boxShadow:`0 4px 12px ${m.color}33`, transition:'all .2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='none'}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rv" style={{ marginTop:48, padding:'36px 40px', borderRadius:24, background:'linear-gradient(135deg, #f5f9ff 0%, #ffffff 100%)', border:'1px solid rgba(0, 102, 255, 0.10)', boxShadow:'0 4px 20px rgba(0, 53, 128, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
          <div>
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6, letterSpacing:'-0.01em' }}>Plus 100+ More Certified Consultants</h3>
            <p style={{ color:C.textM, fontSize:14, marginBottom:16, maxWidth:540, lineHeight:1.6 }}>Our full team includes specialists in D365 Finance, SCM, CRM, Power Platform, Azure, and AI — all Microsoft certified.</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['MB-300','MB-310','MB-320','MB-330','MB-800','MB-910','PL-400','AI-102'].map(cert => (
                <span key={cert} style={{ padding:'5px 12px', borderRadius:50, background:'rgba(0,102,255,0.10)', color:C.blue, fontSize:11, fontWeight:700, border:'1px solid rgba(0,102,255,0.15)' }}>{cert}</span>
              ))}
            </div>
          </div>
          <a href="mailto:careers@devinstratus.com"
            style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:`linear-gradient(135deg, #003580, #0066FF)`, color:'#fff', fontSize:14, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', boxShadow:'0 8px 24px rgba(0, 53, 128, 0.30)', transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 32px rgba(0, 53, 128, 0.40)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0, 53, 128, 0.30)' }}>
            Join Our Team <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
          </a>
        </div>
      </div>

      {/* ─────────── Bio Modal — portaled to body so it escapes any transformed ancestor ─────────── */}
      {bioFor && createPortal(
        <div onClick={() => setBioFor(null)}
          style={{ position:'fixed', top:0, left:0, right:0, bottom:0, zIndex:99999, background:'rgba(10, 14, 30, 0.65)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center', padding:20, animation:'bioFadeIn .25s ease' }}>
          <div onClick={(e) => e.stopPropagation()}
            style={{ position:'relative', width:'100%', maxWidth:560, maxHeight:'88vh', overflowY:'auto', borderRadius:22, background:'linear-gradient(180deg, #ffffff 0%, #fafcff 100%)', border:`1px solid ${bioFor.color}30`, boxShadow:`0 28px 64px rgba(0, 14, 40, 0.40), 0 0 0 1px rgba(255,255,255,0.6) inset`, animation:'bioPopIn .35s cubic-bezier(.22,1,.36,1)', margin:'auto' }}>

            {/* Close button */}
            <button onClick={() => setBioFor(null)}
              aria-label="Close"
              style={{ position:'absolute', top:14, right:14, width:34, height:34, borderRadius:'50%', background:'rgba(0, 14, 40, 0.06)', border:'1px solid rgba(0, 14, 40, 0.10)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2, transition:'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(0, 14, 40, 0.12)'; e.currentTarget.style.transform='rotate(90deg)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(0, 14, 40, 0.06)'; e.currentTarget.style.transform='none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Header band — color-tinted backdrop */}
            <div style={{ padding:'40px 32px 24px', background:`linear-gradient(160deg, ${bioFor.color}14 0%, transparent 75%)`, borderRadius:'22px 22px 0 0', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-30, right:-30, width:160, height:160, borderRadius:'50%', background:`radial-gradient(circle, ${bioFor.color}1c, transparent 70%)`, pointerEvents:'none' }} />

              <div style={{ display:'flex', alignItems:'center', gap:18, position:'relative', zIndex:1 }}>
                {/* Bigger photo in modal */}
                <div style={{ position:'relative', width:96, height:96, flexShrink:0 }}>
                  <div style={{ position:'absolute', inset:-3, borderRadius:'50%', background:`linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}66)`, padding:3, boxShadow:`0 8px 22px ${bioFor.color}40` }}>
                    <div style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', background:'#fff' }}>
                      <Portrait member={bioFor} variant="circle" />
                    </div>
                  </div>
                </div>

                <div style={{ minWidth:0 }}>
                  {bioFor.role.toLowerCase().includes('founder') && (
                    <div style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 10px 3px 7px', borderRadius:50, background:`linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}cc)`, boxShadow:`0 3px 8px ${bioFor.color}40`, marginBottom:8 }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 6.5 7 1-5 4.5 1.5 7L12 17.5 5.5 21 7 14 2 9.5l7-1z"/></svg>
                      <span style={{ fontSize:8, fontWeight:800, color:'#fff', letterSpacing:'.12em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Founder</span>
                    </div>
                  )}
                  <h3 style={{ fontSize:24, fontWeight:900, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:4, letterSpacing:'-0.02em', lineHeight:1.15 }}>{bioFor.name}</h3>
                  <div style={{ fontSize:13.5, fontWeight:700, color:bioFor.color, lineHeight:1.4 }}>{bioFor.role}</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding:'8px 32px 32px' }}>
              {/* Meta pills */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:50, background:`${bioFor.color}10`, fontSize:11.5, fontWeight:700, color:bioFor.color }}>
                  <Ic n="Pin" s={11} style={{ color:bioFor.color }} />{bioFor.loc}
                </span>
                <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:50, background:'rgba(0,14,40,0.05)', fontSize:11.5, fontWeight:700, color:C.textM }}>
                  <Ic n="Clock" s={11} style={{ color:C.textL }} />{bioFor.exp} experience
                </span>
                <span style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'6px 12px', borderRadius:50, background:`${bioFor.color}10`, fontSize:11.5, fontWeight:700, color:bioFor.color }}>
                  <Ic n="Award" s={11} style={{ color:bioFor.color }} />{bioFor.cert}
                </span>
              </div>

              {/* Bio text */}
              <p style={{ fontSize:14.5, color:C.textM, lineHeight:1.8, marginBottom:24 }}>{bioFor.about}</p>

              {/* CTA row */}
              <div style={{ display:'flex', gap:10, paddingTop:16, borderTop:`1px solid ${bioFor.color}15` }}>
                <a href={bioFor.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ flex:1, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7, padding:'12px 20px', borderRadius:50, background:`linear-gradient(135deg, ${bioFor.color}, ${bioFor.color}cc)`, color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none', boxShadow:`0 6px 16px ${bioFor.color}38`, transition:'all .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Connect on LinkedIn
                </a>
                <button onClick={() => setBioFor(null)}
                  style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'12px 22px', borderRadius:50, background:'transparent', border:`1.5px solid ${bioFor.color}40`, color:bioFor.color, fontSize:13, fontWeight:700, cursor:'pointer', transition:'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background=`${bioFor.color}10`; e.currentTarget.style.borderColor=bioFor.color }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor=`${bioFor.color}40` }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ─────────── Inline styles ─────────── */}
      <style>{`
        @keyframes bioFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes bioPopIn  { from { opacity:0; transform: translateY(20px) scale(.96) } to { opacity:1; transform: none } }

        .leaders-grid-final { display:grid; grid-template-columns:repeat(4, 1fr); gap:20px; }

        @media(max-width:1024px) {
          .leaders-grid-final { grid-template-columns:repeat(2, 1fr); gap:16px; }
        }
        @media(max-width:680px) {
          .leaders-grid-final { grid-template-columns:1fr; gap:14px; }
        }
      `}</style>
    </section>
  )
}

// ── Helper: portrait that shows photo if available, otherwise initials placeholder ──
function Portrait({ member, variant }) {
  if (member.photo) {
    return (
      <img
        src={member.photo}
        alt={member.name}
        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }}
      />
    )
  }
  // Placeholder: gradient bg + initials
  return (
    <div style={{
      width:'100%', height:'100%',
      background:`linear-gradient(135deg, ${member.color}, ${member.color}aa)`,
      display:'flex', alignItems:'center', justifyContent:'center',
      position:'relative', overflow:'hidden'
    }}>
      {/* Subtle decorative pattern */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize:'18px 18px', opacity:0.6 }} />
      <span style={{
        fontSize: variant === 'circle' ? 38 : 56,
        fontWeight:800, color:'#fff',
        fontFamily:"'Plus Jakarta Sans',sans-serif",
        textShadow:'0 2px 8px rgba(0,0,0,0.15)',
        letterSpacing:'-0.02em',
        position:'relative', zIndex:1
      }}>{member.initials}</span>
      {/* "Photo pending" tiny badge */}
      <span style={{ position:'absolute', bottom:8, left:'50%', transform:'translateX(-50%)', fontSize:9, fontWeight:700, color:'rgba(255,255,255,0.65)', letterSpacing:'.14em', textTransform:'uppercase', whiteSpace:'nowrap' }}>Photo Pending</span>
    </div>
  )
}


function GlobalSection({ navigate }) {
  useReveal()
  return (
    <section className="company-section" style={{ padding:'72px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div className="rv" style={{ marginBottom:48 }}>
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.teal},${C.blue})`, marginBottom:16 }} />
          <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>We're Global — and Local</h2>
          <p style={{ color:C.textM, fontSize:16, maxWidth:560 }}>Four offices, 24/7 support coverage, and consultants who understand your local market, timezone, and business culture.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:24 }}>
          {OFFICES.map((o, i) => (
            <div key={o.city} className="rv" style={{ borderRadius:22, overflow:'hidden', border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', animation:`fadeUp .4s ease both ${i*70}ms` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 16px 48px rgba(0,87,184,.1)`; e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=C.blue+'44' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none'; e.currentTarget.style.borderColor=C.border }}>
              <div style={{ padding:'24px 24px 0', background:`linear-gradient(135deg,${C.bgSoft},#fff)` }}>
                <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
                  <div style={{ fontSize:36, lineHeight:1 }}>{o.flag}</div>
                  <div>
                    <h3 style={{ fontSize:19, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:2 }}>{o.city}</h3>
                    <div style={{ fontSize:12, color:C.textM }}>Est. {o.founded} · {o.headcount}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'0 24px 24px' }}>
                {[
                  [Ic,'Pin',o.addr],
                  [Ic,'Phone',o.phone],
                  [Ic,'Mail',o.email],
                  [Ic,'Clock',`Timezone: ${o.tz}`],
                ].map(([Icon, icon, val]) => (
                  <div key={val} style={{ display:'flex', gap:10, alignItems:'flex-start', marginBottom:10 }}>
                    <Icon n={icon} s={13} style={{ color:C.textL, flexShrink:0, marginTop:2 }} />
                    <span style={{ fontSize:13, color:C.textM }}>{val}</span>
                  </div>
                ))}
                <button onClick={() => navigate('/contact')} style={{ marginTop:14, display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:C.blue, background:C.blueL, border:'none', borderRadius:50, padding:'8px 18px', cursor:'pointer' }}>
                  Get in touch <Ic n="Arrow" s={12} style={{ color:C.blue }} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="rv" style={{ marginTop:48, padding:'32px', borderRadius:22, background:`linear-gradient(135deg,${C.blue},${C.purple})`, color:'#fff', display:'flex', gap:40, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ fontSize:22, fontWeight:800, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Follow-the-Sun Support</h3>
            <p style={{ opacity:.85, fontSize:15 }}>With offices across 4 time zones, we offer 24/5 coverage for Managed Support clients — your named consultant is always within 4 hours of waking up.</p>
          </div>
          <div style={{ display:'flex', gap:16, flexShrink:0 }}>
            {['🇬🇧 GMT','🇺🇸 EST','🇮🇳 IST','🇨🇦 EST'].map(tz => (
              <div key={tz} style={{ textAlign:'center' }}>
                <div style={{ fontSize:18, marginBottom:4 }}>{tz.split(' ')[0]}</div>
                <div style={{ fontSize:12, opacity:.75 }}>{tz.split(' ')[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Awards Section ────────────────────────────────────────────────────────────────
function AwardsSection() {
  useReveal()
  return (
    <section className="company-section" style={{ padding:'72px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div className="rv" style={{ marginBottom:48 }}>
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.orange},${C.purple})`, marginBottom:16 }} />
          <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Awards & Recognition</h2>
          <p style={{ color:C.textM, fontSize:16, maxWidth:560 }}>Independent recognition from Microsoft and the wider technology industry for the quality of our work and our culture.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:16 }}>
          {AWARDS.map((a, i) => (
            <div key={a.award} className="rv" style={{ display:'flex', gap:16, padding:'22px', borderRadius:18, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', animation:`fadeUp .4s ease both ${i*50}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=a.color+'55'; e.currentTarget.style.boxShadow=`0 8px 28px ${a.color}12`; e.currentTarget.style.transform='translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:48, height:48, borderRadius:14, background:a.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Ic n={a.icon} s={22} style={{ color:a.color }} />
              </div>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:a.color, marginBottom:4, letterSpacing:'.08em' }}>{a.year} · {a.issuer}</div>
                <div style={{ fontSize:14.5, fontWeight:700, color:C.text, lineHeight:1.45 }}>{a.award}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="rv" style={{ marginTop:40, display:'flex', gap:16, flexWrap:'wrap' }}>
          {[['Microsoft Gold Partner','#0078d4'],['Azure Expert MSP','#0078d4'],['FastTrack Recognised','#0078d4'],['Inner Circle 2025','#6c3ce1'],['ISO 9001 Certified','#00a99d']].map(([b,c]) => (
            <div key={b} style={{ padding:'10px 20px', borderRadius:50, background:C.bgSoft, border:`2px solid ${c}44`, display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:c }} />
              <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Careers Section ────────────────────────────────────────────────────────────────
function CareersSection({ navigate }) {
  useReveal()
  return (
    <div>
      <section className="company-section" style={{ padding:'72px 24px', background:'#fff' }}>
        <div className="svc-body-g" style={{ maxWidth:1280, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }}>
          <div className="rv">
            <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.green},${C.teal})`, marginBottom:16 }} />
            <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Join a Team That Actually Gives a Damn</h2>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:20 }}>
              We're a fast-growing Microsoft Dynamics partner with 159 people across four countries. We hire for talent and character first, credentials second — though a few certifications don't hurt.
            </p>
            <p style={{ fontSize:15.5, color:C.textM, lineHeight:1.85, marginBottom:28 }}>
              We work on genuinely interesting problems, with clients who trust us, and managers who want you to grow. Remote and hybrid options available for most roles.
            </p>
            <div className="company-values-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:28 }}>
              {[
                { icon:'Star',  text:'Glassdoor 4.7/5 employer rating' },
                { icon:'Globe', text:'100% remote-eligible roles available' },
                { icon:'Award', text:'Microsoft cert fees fully covered' },
                { icon:'Users', text:'Mentorship from Day 1' },
                { icon:'Zap',   text:'Fast promotion track — avg 18 months' },
                { icon:'Brief', text:'Pension, health & wellness package' },
              ].map(b => (
                <div key={b.text} style={{ display:'flex', gap:9, alignItems:'flex-start', fontSize:13, color:C.text }}>
                  <Ic n={b.icon} s={14} style={{ color:C.green, flexShrink:0, marginTop:2 }} />
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/contact')} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:50, background:`linear-gradient(135deg,${C.green},${C.teal})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Explore Open Roles <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
            </button>
          </div>
          <div className="rv">
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:20 }}>Current Openings</h3>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {JOBS.map((j, i) => (
                <div key={j.title} style={{ display:'flex', alignItems:'center', gap:14, padding:'18px 20px', borderRadius:16, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .22s', cursor:'pointer', animation:`fadeUp .4s ease both ${i*60}ms` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=j.color+'55'; e.currentTarget.style.boxShadow=`0 8px 24px ${j.color}12`; e.currentTarget.style.transform='translateX(4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:j.color+'15', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Ic n="Brief" s={18} style={{ color:j.color }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:3 }}>{j.title}</div>
                    <div style={{ display:'flex', gap:10, fontSize:12, color:C.textM }}>
                      <span>{j.loc}</span><span>·</span><span>{j.type}</span><span>·</span>
                      <span style={{ color:j.color, fontWeight:600 }}>{j.dept}</span>
                    </div>
                  </div>
                  <Ic n="ChevR" s={14} style={{ color:C.textL }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Press Section ────────────────────────────────────────────────────────────────
function PressSection() {
  useReveal()
  return (
    <section className="company-section" style={{ padding:'72px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div className="rv" style={{ marginBottom:48 }}>
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.purple},${C.blue})`, marginBottom:16 }} />
          <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Press & Media</h2>
          <p style={{ color:C.textM, fontSize:16, maxWidth:560 }}>News, announcements and expert commentary from the DevinStratus team.</p>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {PRESS.map((p, i) => (
            <div key={p.title} className="rv" style={{ display:'flex', gap:20, alignItems:'center', padding:'24px', borderRadius:18, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .25s', animation:`fadeUp .4s ease both ${i*60}ms` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor=p.color+'55'; e.currentTarget.style.boxShadow=`0 8px 28px ${p.color}10`; e.currentTarget.style.transform='translateX(6px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:p.color, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:11, fontWeight:700, color:p.color, marginBottom:4 }}>{p.date} · {p.source}</div>
                <div style={{ fontSize:16, fontWeight:700, color:C.text }}>{p.title}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:p.color, flexShrink:0 }}>
                Read more <Ic n="ExternalLink" s={13} style={{ color:p.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rv" style={{ marginTop:40, padding:'28px', borderRadius:20, background:C.bgSoft, border:`1px solid ${C.border}` }}>
          <h3 style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Media Enquiries</h3>
          <p style={{ color:C.textM, fontSize:14, marginBottom:12 }}>For press enquiries, interview requests, or to receive our media kit, contact our communications team.</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="mailto:press@devinstratus.com" style={{ display:'flex', alignItems:'center', gap:7, padding:'10px 20px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, color:'#fff', fontSize:13, fontWeight:700, textDecoration:'none' }}>
              <Ic n="Mail" s={14} style={{ color:'#fff' }} /> press@devinstratus.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Main Export ────────────────────────────────────────────────────────────────────
export default function CompanyPage({ navigate, slug, openConsult }) {
  useReveal()
  useEffect(() => { window.scrollTo(0,0) }, [slug])

  const section = slug || 'about'

  const SECTIONS_INDEX = [
    { slug:'about',   title:'About Us',           icon:'Award',     color:C.blue,   desc:'Our story, mission and 16-year track record' },
    { slug:'team',    title:'Our Team',            icon:'Users',     color:C.purple, desc:'120+ certified consultants worldwide' },
    { slug:'global',  title:'Global Offices',      icon:'Globe',     color:C.teal,   desc:'4 offices across 4 time zones' },
    // { slug:'awards',  title:'Awards',      icon:'Star',      color:C.orange, desc:'Recognised by Microsoft & industry' }, // HIDDEN — uncomment to show
    { slug:'careers', title:'Careers',             icon:'Brief',     color:C.green,  desc:'Join a team that grows with you' },
    // { slug:'press',   title:'Press & Media', icon:'Megaphone', color:C.purple, desc:'News, announcements & expert commentary' }, // HIDDEN — uncomment to show
  ]

  return (
    <div className="page-fade">
      <CompanyHero section={section} navigate={navigate} />

      {/* Sub-nav */}
      <div style={{ background:'linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)', borderBottom:'1px solid rgba(0, 102, 255, 0.08)', position:'sticky', top:68, zIndex:100, backdropFilter:'blur(12px)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', gap:4, overflowX:'auto' }}>
          {SECTIONS_INDEX.map(s => (
            <button key={s.slug} onClick={() => navigate(`/company/${s.slug}`)}
              style={{ display:'flex', alignItems:'center', gap:7, padding:'14px 16px', borderBottom:`2.5px solid ${section===s.slug ? s.color : 'transparent'}`, background:'none', border:'none', borderBottom:`2.5px solid ${section===s.slug ? s.color : 'transparent'}`, cursor:'pointer', fontSize:13.5, fontWeight: section===s.slug ? 700 : 500, color: section===s.slug ? s.color : C.textM, whiteSpace:'nowrap', transition:'all .18s', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              <Ic n={s.icon} s={14} style={{ color: section===s.slug ? s.color : C.textL }} />
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {section === 'about'   && <AboutSection   navigate={navigate} openConsult={openConsult} />}
      {section === 'team'    && <TeamSection    />}
      {section === 'global'  && <GlobalSection  navigate={navigate} />}
      {/* section === 'awards'  && <AwardsSection  /> */}{/* HIDDEN */}
      {section === 'careers' && <CareersSection navigate={navigate} />}
      {/* section === 'press'   && <PressSection   /> */}{/* HIDDEN */}
    </div>
  )
}