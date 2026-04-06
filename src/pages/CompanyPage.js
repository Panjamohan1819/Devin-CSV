import { useState, useEffect } from 'react'
import { C, Ic } from '../components/ui'

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
  { name:'James Whitfield', role:'CEO & Founder',             loc:'London, UK',    exp:'20 yrs', cert:'MBA · MC-900',        initials:'JW', color:C.blue,
    about:'James founded DevinStratus in 2009 with a mission to make enterprise software deliver real business value. He leads strategy, partnerships, and client relationships at the executive level.',
    linkedin:'https://linkedin.com' },
  { name:'Priya Sharma',    role:'CTO & Technical Director',  loc:'New Delhi, IN', exp:'16 yrs', cert:'Azure Architect',       initials:'PS', color:C.purple,
    about:'Priya oversees all technical delivery and architecture decisions. She leads our Azure & AI practice and ensures every solution is built to scale, integrate, and perform.',
    linkedin:'https://linkedin.com' },
  { name:'Marcus Chen',     role:'Head of Delivery, Americas',loc:'New York, USA', exp:'14 yrs', cert:'MB-300 · PMP',          initials:'MC', color:C.teal,
    about:'Marcus manages all North American client engagements and delivery operations. With 14 years in D365 implementations, he ensures projects land on time and on budget.',
    linkedin:'https://linkedin.com' },
  { name:'Sarah O\'Brien',  role:'Head of Customer Success',  loc:'London, UK',    exp:'12 yrs', cert:'MB-240 · PRINCE2',     initials:'SO', color:C.orange,
    about:'Sarah leads our post-go-live success programmes, ensuring clients realise the full ROI of their Dynamics 365 investment through adoption, training, and continuous improvement.',
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
    <section style={{ background:'linear-gradient(135deg,#060d24 0%,#0d1a40 55%,#140828 100%)', paddingTop:68, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:cfg.color+'18', animation:'heroFloat 8s ease-in-out infinite', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:-60, left:-40, width:220, height:220, borderRadius:'50%', background:'rgba(108,60,225,.12)', animation:'heroFloat 6s ease-in-out infinite reverse', pointerEvents:'none' }} />
      <div style={{ position:'absolute', top:'30%', left:'40%', width:180, height:180, borderRadius:'50%', background:`${cfg.color}0a`, animation:'heroFloat 11s ease-in-out infinite 2s', pointerEvents:'none' }} />
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'64px 24px 56px', position:'relative', zIndex:1 }}>
        <button onClick={() => navigate('/company/about')} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.14)', borderRadius:50, padding:'6px 14px', fontSize:12, fontWeight:600, color:'rgba(255,255,255,.6)', cursor:'pointer', marginBottom:28 }}>
          <Ic n="ChevD" s={12} style={{ transform:'rotate(90deg)', color:'rgba(255,255,255,.5)' }} /> Company
        </button>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:`${cfg.color}22`, border:`1px solid ${cfg.color}44`, borderRadius:50, padding:'6px 14px', fontSize:12, fontWeight:700, color:cfg.color, marginBottom:20 }}>
          <Ic n="Award" s={12} style={{ color:cfg.color }} /> Microsoft Gold Partner · Est. 2009
        </div>
        <h1 style={{ fontSize:'clamp(32px,5vw,52px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:16, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
          {cfg.title.split(' ').slice(0,-1).join(' ')}{' '}
          <span className="grad-text" style={{ background:`linear-gradient(135deg,${cfg.color},${cfg.color}99)`, display:'inline-block' }}>
            {cfg.title.split(' ').slice(-1)[0]}
          </span>
        </h1>
        <p style={{ fontSize:17, color:'rgba(255,255,255,.72)', maxWidth:540, lineHeight:1.8 }}>{cfg.sub}</p>
        {/* Quick stats bar */}
        <div style={{ display:'flex', gap:24, marginTop:36, flexWrap:'wrap' }}>
          {[['500+','Deployments'],['16','Years'],['4','Continents'],['120+','Consultants']].map(([v,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:24, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{v}</div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,.5)', marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── About Section ───────────────────────────────────────────────────────────────
function AboutSection({ navigate, openConsult }) {
  useReveal()
  return (
    <div>
      <section style={{ padding:'72px 24px', background:'#fff' }}>
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
            <button onClick={openConsult} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 28px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, border:'none', color:'#fff', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
              Talk to Our Team <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
            </button>
          </div>
          <div className="rv">
            <div style={{ marginBottom:24 }}>
              <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:16 }}>Our Mission</h3>
              <div style={{ background:`linear-gradient(135deg,${C.blue},${C.purple})`, borderRadius:18, padding:28, color:'#fff' }}>
                <Ic n="Target" s={28} style={{ color:'rgba(255,255,255,.5)', marginBottom:12 }} />
                <p style={{ fontSize:16, lineHeight:1.8, fontWeight:500 }}>
                  "To make Dynamics 365 the competitive advantage of every business we work with — not just a system they have to use, but one they genuinely love."
                </p>
              </div>
            </div>
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:14 }}>Our Values</h3>
            <div className="company-values-g" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {VALUES.map(v => (
                <div key={v.title} style={{ padding:'16px', borderRadius:14, border:`1.5px solid ${C.border}`, background:'#fff', transition:'all .22s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=v.color+'55'; e.currentTarget.style.boxShadow=`0 8px 24px ${v.color}12`; e.currentTarget.style.transform='translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:v.color+'15', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8 }}>
                    <Ic n={v.icon} s={16} style={{ color:v.color }} />
                  </div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:4 }}>{v.title}</div>
                  <div style={{ fontSize:11.5, color:C.textM, lineHeight:1.6 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding:'72px 24px', background:C.bgSoft }}>
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

// ── Team Section ─────────────────────────────────────────────────────────────────
function TeamSection() {
  const [flipped, setFlipped] = useState(null)
  useReveal()
  return (
    <section style={{ padding:'72px 24px', background:'#fff' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        {/* Section header */}
        <div className="rv" style={{ marginBottom:52 }}>
          <div style={{ width:4, height:40, borderRadius:4, background:`linear-gradient(180deg,${C.purple},${C.blue})`, marginBottom:16 }} />
          <h2 style={{ fontSize:32, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:8 }}>Leadership Team</h2>
          <p style={{ color:C.textM, fontSize:16, maxWidth:560 }}>Our leadership brings together deep Dynamics 365 expertise, global consulting experience, and a passion for client outcomes.</p>
        </div>

        {/* Card grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:24 }}>
          {TEAM.map((m, i) => (
            <div key={m.name} className="rv"
              style={{ borderRadius:22, border:`1.5px solid ${C.border}`, background:'#fff', overflow:'hidden', transition:'all .28s cubic-bezier(.4,0,.2,1)', animation:`fadeUp .4s ease both ${i*55}ms`, cursor:'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 20px 52px ${m.color}22`; e.currentTarget.style.borderColor=m.color+'55'; e.currentTarget.style.transform='translateY(-5px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform='none' }}>

              {/* Coloured top strip + avatar */}
              <div style={{ position:'relative', padding:'28px 24px 0', background:`linear-gradient(160deg,${m.color}18 0%,transparent 70%)` }}>
                {/* Decorative corner shape */}
                <div style={{ position:'absolute', top:0, right:0, width:80, height:80, background:`linear-gradient(225deg,${m.color}20,transparent)`, borderRadius:'0 22px 0 80px' }} />

                {/* Avatar circle */}
                <div style={{ width:76, height:76, borderRadius:'50%', background:`linear-gradient(135deg,${m.color},${m.color}99)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16, boxShadow:`0 6px 24px ${m.color}44`, border:'3px solid #fff', position:'relative' }}>
                  <span style={{ fontSize:26, fontWeight:800, color:'#fff', fontFamily:"'Plus Jakarta Sans',sans-serif" }}>{m.initials}</span>
                  {/* Online indicator */}
                  <div style={{ position:'absolute', bottom:3, right:3, width:14, height:14, borderRadius:'50%', background:'#4ade80', border:'2px solid #fff', boxShadow:'0 0 6px #4ade8066' }} />
                </div>

                {/* Name & role */}
                <h3 style={{ fontSize:17, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:3 }}>{m.name}</h3>
                <div style={{ fontSize:13, fontWeight:600, color:m.color, marginBottom:12 }}>{m.role}</div>
              </div>

              {/* Body */}
              <div style={{ padding:'0 24px 24px' }}>
                {/* Meta row */}
                <div style={{ display:'flex', gap:12, marginBottom:14, flexWrap:'wrap' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:11.5, color:C.textM }}>
                    <Ic n="Pin" s={11} style={{ color:C.textL }} />{m.loc}
                  </span>
                  <span style={{ fontSize:11.5, color:C.textL }}>·</span>
                  <span style={{ fontSize:11.5, color:C.textM }}>{m.exp} exp</span>
                </div>

                {/* About text */}
                <p style={{ fontSize:13, color:C.textM, lineHeight:1.68, marginBottom:16 }}>{m.about}</p>

                {/* Cert badge */}
                <div style={{ marginBottom:18, padding:'6px 12px', borderRadius:8, background:m.color+'10', display:'inline-flex', alignItems:'center', gap:6 }}>
                  <Ic n="Award" s={11} style={{ color:m.color }} />
                  <span style={{ fontSize:11, fontWeight:700, color:m.color }}>{m.cert}</span>
                </div>

                {/* Action buttons */}
                <div style={{ display:'flex', gap:8 }}>
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                    style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 14px', borderRadius:50, background:`linear-gradient(135deg,${m.color},${m.color}99)`, color:'#fff', fontSize:12.5, fontWeight:700, textDecoration:'none', transition:'opacity .18s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity='.88'}
                    onMouseLeave={e => e.currentTarget.style.opacity='1'}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <button
                    style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'9px 14px', borderRadius:50, background:'#fff', border:`1.5px solid ${m.color}44`, color:m.color, fontSize:12.5, fontWeight:700, cursor:'pointer', transition:'all .18s' }}
                    onMouseEnter={e => { e.currentTarget.style.background=m.color+'12' }}
                    onMouseLeave={e => { e.currentTarget.style.background='#fff' }}>
                    <Ic n="Mail" s={12} style={{ color:m.color }} /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rv" style={{ marginTop:48, padding:'36px 40px', borderRadius:24, background:`linear-gradient(135deg,${C.bgSoft},#fff)`, border:`1.5px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:20 }}>
          <div>
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:6 }}>Plus 100+ More Certified Consultants</h3>
            <p style={{ color:C.textM, fontSize:14, marginBottom:16 }}>Our full team includes specialists in D365 Finance, SCM, CRM, Power Platform, Azure, and AI — all Microsoft certified.</p>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {['MB-300','MB-310','MB-320','MB-330','MB-800','MB-910','PL-400','AI-102'].map(cert => (
                <span key={cert} style={{ padding:'5px 12px', borderRadius:50, background:C.blueL, color:C.blue, fontSize:11, fontWeight:700 }}>{cert}</span>
              ))}
            </div>
          </div>
          <a href="mailto:careers@devinstratus.com"
            style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 26px', borderRadius:50, background:`linear-gradient(135deg,${C.blue},${C.purple})`, color:'#fff', fontSize:14, fontWeight:700, textDecoration:'none', whiteSpace:'nowrap', boxShadow:`0 6px 20px ${C.blue}33` }}>
            Join Our Team <Ic n="Arrow" s={14} style={{ color:'#fff' }} />
          </a>
        </div>
      </div>
    </section>
  )
}


function GlobalSection({ navigate }) {
  useReveal()
  return (
    <section style={{ padding:'72px 24px', background:'#fff' }}>
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
    <section style={{ padding:'72px 24px', background:'#fff' }}>
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
      <section style={{ padding:'72px 24px', background:'#fff' }}>
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
    <section style={{ padding:'72px 24px', background:'#fff' }}>
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
    <div className="page-fade" style={{ paddingTop:68 }}>
      <CompanyHero section={section} navigate={navigate} />

      {/* Sub-nav */}
      <div style={{ background:'#fff', borderBottom:`1px solid ${C.border}`, position:'sticky', top:68, zIndex:100 }}>
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
