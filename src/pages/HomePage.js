// HomePage — Creative Premium Redesign v4
import { useState, useEffect, useRef, useCallback } from 'react'
import { C, Ic } from '../components/ui'
import { SOLUTIONS, SERVICES } from '../data/content'

/* ─── Hooks ───────────────────────────────────────────────────────────────── */
function useInView(threshold=0.15) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect() } }, { threshold })
    ob.observe(ref.current)
    return () => ob.disconnect()
  }, [threshold])
  return { ref, vis }
}

function useCounter(target, start=false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let s = null
    const step = ts => {
      if (!s) s = ts
      const p = Math.min((ts-s)/1800, 1)
      setVal(Math.round(p*target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, start])
  return val
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */
function Hero({ openConsult, openDemo }) {
  const canvasRef = useRef(null)
  const [tick,    setTick]    = useState(0)
  const [phraseI, setPhraseI] = useState(0)
  const [typed,   setTyped]   = useState('')
  const [del,     setDel]     = useState(false)
  const [barsOn,  setBarsOn]  = useState(false)

  const phrases = ['AI-Enabled Solutions','CRM & Sales AI','Power Platform','Dynamics 365']
  const bars    = [42,58,47,72,61,78,55,88,66,94,76,90]

  // Typewriter
  useEffect(() => {
    const word = phrases[phraseI]
    if (!del) {
      if (typed.length < word.length) {
        const t = setTimeout(() => setTyped(word.slice(0,typed.length+1)), 68)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setDel(true), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0,-1)), 36)
        return () => clearTimeout(t)
      } else {
        setDel(false)
        setPhraseI(i => (i+1)%phrases.length)
      }
    }
  }, [typed, del, phraseI])

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setTick(n => n+1), 520)
    return () => clearInterval(t)
  }, [])

  // Bar animate
  useEffect(() => { setTimeout(() => setBarsOn(true), 600) }, [])

  // Particle canvas
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return
    const ctx = cv.getContext('2d')
    let aid
    const resize = () => { cv.width=cv.offsetWidth; cv.height=cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const N=50, pts=Array.from({length:N},()=>({
      x:Math.random()*cv.width,y:Math.random()*cv.height,
      vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.4+.4
    }))
    const draw=()=>{
      ctx.clearRect(0,0,cv.width,cv.height)
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>cv.width)p.vx*=-1;if(p.y<0||p.y>cv.height)p.vy*=-1})
      for(let i=0;i<N;i++)for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<130){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(100,160,255,${(1-d/130)*.13})`;ctx.lineWidth=.65;ctx.stroke()}
      }
      pts.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(120,170,255,.4)';ctx.fill()})
      aid=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{cancelAnimationFrame(aid);window.removeEventListener('resize',resize)}
  }, [])

  return (
    <section id="hero" style={{
      position:'relative', overflow:'hidden', minHeight:'100vh',
      display:'flex', alignItems:'center', paddingTop:68,
      background:'linear-gradient(145deg,#04091a 0%,#080f28 45%,#0e0520 100%)'
    }}>
      <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0,pointerEvents:'none'}}/>
      {/* Glowing orbs */}
      <div style={{position:'absolute',top:'-5%',left:'-5%',width:500,height:500,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,87,184,.32) 0%,transparent 65%)',filter:'blur(60px)',zIndex:0,pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'35%',right:'-8%',width:440,height:440,borderRadius:'50%',background:'radial-gradient(circle,rgba(108,60,225,.26) 0%,transparent 65%)',filter:'blur(55px)',zIndex:0,pointerEvents:'none',animation:'heroFloat 10s ease-in-out infinite 2s'}}/>
      <div style={{position:'absolute',bottom:'10%',left:'38%',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle,rgba(0,180,166,.14) 0%,transparent 65%)',filter:'blur(40px)',zIndex:0,pointerEvents:'none',animation:'heroFloat 8s ease-in-out infinite 4s'}}/>
      {/* Top edge glow */}
      <div style={{position:'absolute',top:68,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(0,100,255,.6),rgba(110,50,220,.5),transparent)',zIndex:1}}/>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 24px',position:'relative',zIndex:2,width:'100%'}}>
        <div className="hero-g" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center',padding:'64px 0 80px'}}>

          {/* Left */}
          <div style={{animation:'heroFadeUp .8s cubic-bezier(.22,1,.36,1) both'}}>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 18px',borderRadius:50,background:'rgba(0,87,184,.15)',border:'1px solid rgba(0,120,255,.3)',fontSize:12.5,fontWeight:700,color:'#7ec8ff',marginBottom:28,backdropFilter:'blur(10px)',letterSpacing:'.02em'}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:'#4ade80',display:'inline-block',boxShadow:'0 0 10px #4ade80',animation:'pulse 2s ease-in-out infinite'}}/>
              Microsoft Gold Partner · 350+ Businesses Transformed
            </div>

            <div style={{marginBottom:28}}>
              <div style={{fontSize:'clamp(2.2rem,4.5vw,3.6rem)',fontWeight:900,color:'#fff',lineHeight:1.08,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:'-.03em',marginBottom:4}}>
                Empower Your
              </div>
              <div style={{fontSize:'clamp(2.2rem,4.5vw,3.6rem)',fontWeight:900,lineHeight:1.08,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:'-.03em',marginBottom:4,minHeight:'1.15em',display:'flex',alignItems:'center',gap:2}}>
                <span className="grad-text" style={{background:'linear-gradient(135deg,#60b4ff 0%,#a78bfa 55%,#f472b6 100%)'}}>{typed||'\u00a0'}</span>
                <span style={{color:'#60b4ff',opacity:tick%2===0?1:0,fontWeight:200,transition:'opacity .08s',WebkitTextFillColor:'#60b4ff'}}>|</span>
              </div>
              <div style={{fontSize:'clamp(2.2rem,4.5vw,3.6rem)',fontWeight:900,color:'rgba(255,255,255,.75)',lineHeight:1.08,fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:'-.03em'}}>
                with Dynamics 365
              </div>
            </div>

            <p style={{fontSize:16.5,color:'rgba(255,255,255,.58)',lineHeight:1.88,marginBottom:40,maxWidth:460}}>
              Unify finance, operations, sales and service on one intelligent platform — automating decisions and giving every team real-time visibility.
            </p>

            <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:48}}>
              <button onClick={openConsult}
                style={{display:'flex',alignItems:'center',gap:10,padding:'16px 32px',borderRadius:50,border:'none',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",background:'linear-gradient(135deg,#0057b8,#6c3ce1)',boxShadow:'0 8px 32px rgba(0,87,184,.52)',transition:'all .28s',WebkitTapHighlightColor:'transparent'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 44px rgba(0,87,184,.65)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,87,184,.52)'}}>
                Free Consultation <Ic n="Arrow" s={15} style={{color:'#fff'}}/>
              </button>
              <button onClick={openDemo}
                style={{display:'flex',alignItems:'center',gap:10,padding:'16px 30px',borderRadius:50,background:'rgba(255,255,255,.06)',border:'1.5px solid rgba(255,255,255,.15)',color:'#fff',fontSize:15,fontWeight:700,cursor:'pointer',backdropFilter:'blur(10px)',transition:'all .24s',WebkitTapHighlightColor:'transparent'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.12)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.06)'}}>
                <Ic n="Play" s={14} style={{color:'#7ec8ff'}}/> Watch Demo
              </button>
            </div>

            <div className="hero-stats" style={{display:'flex',borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:28}}>
              {[{v:'350+',l:'Happy Clients',c:'#60b4ff'},{v:'500+',l:'Deployments',c:'#a78bfa'},{v:'Gold',l:'MS Partner',c:'#fb923c'},{v:'99.9%',l:'Uptime SLA',c:'#34d399'}].map((b,i)=>(
                <div key={b.l} style={{flex:1,textAlign:'center',borderRight:i<3?'1px solid rgba(255,255,255,.08)':'none',padding:'0 6px',animation:`heroFadeUp .7s ease both ${380+i*90}ms`}}>
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:22,color:b.c,marginBottom:4}}>{b.v}</div>
                  <div style={{fontSize:10.5,fontWeight:600,color:'rgba(255,255,255,.36)',whiteSpace:'nowrap'}}>{b.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Dashboard */}
          <div style={{position:'relative',animation:'heroFadeUp .8s cubic-bezier(.22,1,.36,1) .22s both'}}>
            <div style={{position:'absolute',inset:'-20px',background:'radial-gradient(ellipse at 55% 45%,rgba(0,87,184,.38) 0%,transparent 68%)',filter:'blur(32px)',zIndex:0,borderRadius:36,pointerEvents:'none'}}/>
            {/* Chips */}
            {[
              {style:{top:-28,left:-16,animation:'badgeFloat 5s ease-in-out infinite'},children:<><div style={{width:10,height:10,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 10px #4ade80'}}/><span style={{fontSize:13,fontWeight:700,color:'#0f172a'}}>✨ AI Copilot Active</span></>},
              {style:{bottom:22,right:-20,animation:'badgeFloat 5s ease-in-out infinite 2.2s'},children:<><Ic n="Shield" s={14} style={{color:'#6c3ce1'}}/><span style={{fontSize:12.5,fontWeight:700,color:'#0f172a'}}>Azure-Secured</span></>},
              {style:{top:'44%',right:-24,animation:'badgeFloat 5s ease-in-out infinite 4s'},children:<><Ic n="Zap" s={13} style={{color:'#00b4a6'}}/><span style={{fontSize:12,fontWeight:700,color:'#0f172a'}}>+23% Efficiency</span></>},
            ].map((chip,i)=>(
              <div key={i} style={{position:'absolute',zIndex:10,background:'rgba(255,255,255,.98)',borderRadius:14,padding:'10px 16px',boxShadow:`0 12px 40px rgba(0,0,0,.22)`,border:'1.5px solid #e2e8f0',display:'flex',alignItems:'center',gap:9,backdropFilter:'blur(8px)',...chip.style}}>
                {chip.children}
              </div>
            ))}
            {/* Card */}
            <div style={{position:'relative',zIndex:1,background:'#fff',borderRadius:28,overflow:'hidden',boxShadow:'0 40px 100px rgba(0,0,0,.42)'}}>
              <div style={{padding:'18px 24px',background:'linear-gradient(135deg,#0057b8,#4420c4,#6c3ce1)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:'rgba(255,255,255,.58)',letterSpacing:'.14em',marginBottom:3}}>DYNAMICS 365 · LIVE</div>
                  <div style={{fontSize:15.5,fontWeight:800,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Business Intelligence</div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(255,255,255,.16)',borderRadius:8,padding:'5px 12px',fontSize:10.5,color:'#fff',fontWeight:700}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:'#4ade80',display:'inline-block',animation:'pulse 1.8s ease-in-out infinite'}}/> LIVE
                </div>
              </div>
              <div style={{padding:'20px 24px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
                  {[{l:'Total Revenue',v:'$8.4M',d:'+23%',c:'#0057b8',bg:'#eff6ff'},{l:'Active Customers',v:'3,214',d:'+11%',c:'#6c3ce1',bg:'#f5f3ff'},{l:'Efficiency Rate',v:'97.1%',d:'+8%',c:'#00b4a6',bg:'#f0fdfa'},{l:'Cost Reduction',v:'54%',d:'+54%',c:'#f97316',bg:'#fff7ed'}].map((k,i)=>(
                    <div key={k.l} style={{background:k.bg,borderRadius:14,padding:'13px 15px',animation:`kpiIn .6s ease both ${520+i*100}ms`}}>
                      <div style={{fontSize:11,fontWeight:600,color:'#64748b',marginBottom:4}}>{k.l}</div>
                      <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:21,color:k.c,marginBottom:3}}>{k.v}</div>
                      <div style={{fontSize:10.5,fontWeight:700,color:'#22c55e'}}>▲ {k.d} vs last year</div>
                    </div>
                  ))}
                </div>
                <div style={{background:'#f8fafc',borderRadius:14,padding:'13px 15px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:9}}>
                    <span style={{fontSize:11,fontWeight:700,color:'#64748b',letterSpacing:'.08em'}}>MONTHLY PERFORMANCE</span>
                    <span style={{fontSize:10,color:'#94a3b8'}}>12 months</span>
                  </div>
                  <div style={{display:'flex',alignItems:'flex-end',gap:4,height:56}}>
                    {bars.map((h,i)=>(
                      <div key={i} style={{flex:1,borderRadius:'4px 4px 0 0',height:barsOn?`${h}%`:'4%',
                        background:i===bars.length-1?'linear-gradient(180deg,#0057b8,#6c3ce1)':i>bars.length-4?'rgba(0,87,184,.28)':'#e2e8f0',
                        transition:`height .9s cubic-bezier(.34,1.56,.64,1) ${i*46}ms`,minHeight:4}}/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll dot */}
      <div style={{position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',zIndex:4,display:'flex',flexDirection:'column',alignItems:'center',gap:5,animation:'heroFadeUp 1s ease both 1.5s'}}>
        <div style={{fontSize:9,fontWeight:700,color:'rgba(255,255,255,.28)',letterSpacing:'.14em'}}>SCROLL</div>
        <div style={{width:20,height:34,borderRadius:10,border:'1.5px solid rgba(255,255,255,.16)',display:'flex',justifyContent:'center',paddingTop:4}}>
          <div style={{width:2.5,height:6,borderRadius:2,background:'rgba(255,255,255,.4)',animation:'scrollDot 2s ease-in-out infinite'}}/>
        </div>
      </div>
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:80,background:'linear-gradient(to bottom,transparent,#04091a)',pointerEvents:'none',zIndex:3}}/>
    </section>
  )
}

/* ─── TRUST MARQUEE ───────────────────────────────────────────────────────── */
function Trust() {
  const brands = [
    {name:'HP Inc',color:'#0096D6',abbr:'HP',sub:'Technology'},
    {name:'Heineken',color:'#00843D',abbr:'HNK',sub:'Beverages'},
    {name:'BMW Group',color:'#1C69D4',abbr:'BMW',sub:'Automotive'},
    {name:'Rolls-Royce',color:'#1A1A1A',abbr:'RR',sub:'Aerospace'},
    {name:'Leatherman',color:'#C8102E',abbr:'LMN',sub:'Manufacturing'},
    {name:'Rockwell Auto.',color:'#CC0000',abbr:'ROK',sub:'Industrial'},
    {name:"G&J Pepsi",color:'#004B93',abbr:'PEP',sub:'Retail'},
    {name:"Land O'Lakes",color:'#E87722',abbr:'LOL',sub:'Agriculture'},
    {name:'Arla Foods',color:'#00539B',abbr:'ARL',sub:'Food & Dairy'},
    {name:'Wipro',color:'#341C75',abbr:'WPR',sub:'IT Services'},
    {name:'Accenture',color:'#A100FF',abbr:'ACN',sub:'Consulting'},
    {name:'Groupe SEB',color:'#E30613',abbr:'SEB',sub:'Consumer'},
  ]
  const doubled = [...brands,...brands]
  return (
    <section style={{background:'#fff',borderTop:'1.5px solid #f1f5f9',borderBottom:'1.5px solid #f1f5f9',padding:'24px 0',overflow:'hidden'}}>
      <div style={{textAlign:'center',fontSize:10,fontWeight:800,letterSpacing:'.16em',color:'#94a3b8',marginBottom:16,textTransform:'uppercase'}}>
        Trusted by global businesses across Manufacturing · Retail · Finance · Healthcare · Logistics
      </div>
      <div style={{overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,black 8%,black 92%,transparent)'}}>
        <div className="track">
          {doubled.map((b,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 20px',borderRadius:12,border:'1px solid #f1f5f9',whiteSpace:'nowrap',flexShrink:0,background:'#fff',transition:'all .22s'}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 4px 20px ${b.color}1a`;e.currentTarget.style.borderColor=b.color+'33';e.currentTarget.style.transform='translateY(-2px)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#f1f5f9';e.currentTarget.style.transform='none'}}>
              <div style={{width:32,height:32,borderRadius:8,background:b.color,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <span style={{color:'#fff',fontSize:9,fontWeight:900}}>{b.abbr}</span>
              </div>
              <div>
                <div style={{fontSize:12.5,fontWeight:700,color:'#1e293b',lineHeight:1.2}}>{b.name}</div>
                <div style={{fontSize:10,color:'#94a3b8',fontWeight:500}}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── STATS ───────────────────────────────────────────────────────────────── */
function Stats() {
  const { ref, vis } = useInView(0.2)
  const data = [
    {target:350,sfx:'+',label:'Clients Served',sub:'Across 28 countries',c:'#60b4ff'},
    {target:500,sfx:'+',label:'Deployments',sub:'Zero failed go-lives',c:'#a78bfa'},
    {target:99, sfx:'.9%',label:'Platform Uptime',sub:'Azure SLA guaranteed',c:'#34d399'},
    {target:150,sfx:'+',label:'Certified Consultants',sub:'D365, Azure & AI',c:'#fb923c'},
    {target:3,  sfx:'x',label:'Average ROI',sub:'Measured at 12 months',c:'#f472b6'},
    {target:40, sfx:'%',label:'Faster Month-End',sub:'Finance clients average',c:'#60b4ff'},
  ]
  return (
    <section ref={ref} style={{padding:'88px 24px',background:'linear-gradient(160deg,#04091a 0%,#080f28 55%,#100622 100%)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle,rgba(255,255,255,.035) 1px,transparent 1px)',backgroundSize:'34px 34px',pointerEvents:'none'}}/>
      <div style={{maxWidth:1280,margin:'0 auto',position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{display:'inline-flex',background:'rgba(0,87,184,.16)',color:'#60b4ff',borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:700,marginBottom:16,border:'1px solid rgba(0,87,184,.3)',letterSpacing:'.06em'}}>PROVEN RESULTS</div>
          <h2 style={{fontSize:'clamp(1.7rem,3.2vw,2.4rem)',fontWeight:900,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:10}}>
            Numbers that{' '}
            <span className="grad-text" style={{background:'linear-gradient(135deg,#60b4ff,#a78bfa)'}}>speak for themselves</span>
          </h2>
          <p style={{fontSize:15.5,color:'rgba(255,255,255,.48)',maxWidth:480,margin:'0 auto'}}>Real outcomes measured from real Dynamics 365 deployments.</p>
        </div>
        <div className="stats-g" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
          {data.map((s,i)=>{
            const val = useCounter(s.target, vis)
            return (
              <div key={s.label} style={{padding:'30px 24px',borderRadius:20,background:'rgba(255,255,255,.045)',border:'1px solid rgba(255,255,255,.09)',backdropFilter:'blur(8px)',textAlign:'center',transition:'all .28s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(255,255,255,.08)';e.currentTarget.style.transform='translateY(-4px)'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.045)';e.currentTarget.style.transform='none'}}>
                <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:900,fontSize:'clamp(2.2rem,3.5vw,3rem)',color:s.c,lineHeight:1,marginBottom:8,letterSpacing:'-.02em'}}>
                  {val}{s.sfx}
                </div>
                <div style={{fontSize:14.5,fontWeight:700,color:'rgba(255,255,255,.85)',marginBottom:5,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s.label}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.36)',fontWeight:500}}>{s.sub}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── SOLUTIONS ───────────────────────────────────────────────────────────── */
function SolutionsSection({ navigate }) {
  const { ref, vis } = useInView()
  return (
    <section id="solutions" ref={ref} style={{padding:'88px 24px',background:'#fff'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{display:'inline-flex',background:'#eff6ff',color:'#0057b8',borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:700,marginBottom:16,border:'1px solid #dbeafe',letterSpacing:'.06em'}}>OUR SOLUTIONS</div>
          <h2 style={{fontSize:'clamp(1.7rem,3.2vw,2.4rem)',fontWeight:900,color:'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:10}}>
            One platform.{' '}
            <span className="grad-text" style={{background:'linear-gradient(135deg,#0057b8,#6c3ce1)'}}>Every business function.</span>
          </h2>
          <p style={{fontSize:15.5,color:'#64748b',maxWidth:520,margin:'0 auto',lineHeight:1.7}}>Click any category to explore the full product range.</p>
        </div>
        <div className="sol-g" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {SOLUTIONS.filter(s=>s.slug!=='erp').map((s,i)=>(
            <button key={s.slug} onClick={()=>navigate(`/solutions/${s.slug}`)}
              style={{display:'flex',flexDirection:'column',padding:'28px',borderRadius:22,border:'1.5px solid #e2e8f0',background:'#fff',cursor:'pointer',textAlign:'left',transition:'all .26s',position:'relative',overflow:'hidden',opacity:vis?1:0,transform:vis?'none':'translateY(20px)',transitionDelay:`${i*70}ms`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+'55';e.currentTarget.style.boxShadow=`0 16px 48px ${s.color}18`;e.currentTarget.style.transform='translateY(-5px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}>
              <div style={{position:'absolute',top:0,right:0,width:80,height:80,background:s.bg,borderRadius:'0 22px 0 80px',opacity:.7}}/>
              <div style={{width:50,height:50,borderRadius:14,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,position:'relative'}}>
                <Ic n={s.icon} s={23} style={{color:s.color}}/>
              </div>
              <h3 style={{fontSize:18,fontWeight:800,color:'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:8,position:'relative'}}>{s.heading}</h3>
              <p style={{fontSize:13.5,color:'#64748b',lineHeight:1.65,marginBottom:16,flex:1,position:'relative'}}>{s.tagline}</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',position:'relative'}}>
                <span style={{padding:'3px 10px',borderRadius:50,background:s.bg,fontSize:12,fontWeight:700,color:s.color}}>{s.items.length} solutions</span>
                <Ic n="ChevR" s={16} style={{color:s.color+'88'}}/>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SERVICES ────────────────────────────────────────────────────────────── */
function ServicesSection({ navigate }) {
  const { ref, vis } = useInView()
  return (
    <section id="process" ref={ref} style={{padding:'88px 24px',background:'#f8fafc'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{display:'inline-flex',background:'#f5f3ff',color:'#6c3ce1',borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:700,marginBottom:16,border:'1px solid #ede9fe',letterSpacing:'.06em'}}>OUR SERVICES</div>
          <h2 style={{fontSize:'clamp(1.7rem,3.2vw,2.4rem)',fontWeight:900,color:'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            End-to-end{' '}
            <span className="grad-text" style={{background:'linear-gradient(135deg,#6c3ce1,#0057b8)'}}>Dynamics 365 expertise</span>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))',gap:16}}>
          {SERVICES.map((s,i)=>(
            <button key={s.slug} onClick={()=>navigate(`/service/${s.slug}`)}
              style={{display:'flex',gap:16,padding:'22px',borderRadius:18,border:'1.5px solid #e2e8f0',background:'#fff',cursor:'pointer',textAlign:'left',transition:'all .22s',opacity:vis?1:0,transform:vis?'none':'translateY(16px)',transitionDelay:`${i*50}ms`}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=s.color+'55';e.currentTarget.style.boxShadow=`0 8px 28px ${s.color}14`;e.currentTarget.style.transform='translateY(-3px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}>
              <div style={{width:46,height:46,borderRadius:13,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,${s.color},${s.color}55)`,borderRadius:'3px 0 0 3px'}}/>
                <Ic n={s.n} s={20} style={{color:s.color}}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:14.5,fontWeight:700,color:'#0f172a',marginBottom:4,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{s.t}</div>
                <div style={{fontSize:12.5,color:'#64748b',lineHeight:1.55,overflow:'hidden',textOverflow:'ellipsis',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{s.tagline.split('—')[0].trim()}</div>
              </div>
              <Ic n="ChevR" s={16} style={{color:'#cbd5e1',flexShrink:0,alignSelf:'center'}}/>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ────────────────────────────────────────────────────────── */
function Testimonials() {
  const { ref, vis } = useInView()
  const quotes = [
    {q:"DevinStratus delivered our Business Central implementation in 11 weeks — on time, on budget, zero data issues. Best ERP project we've ever run.",name:'Sarah Mitchell',role:'CFO',co:'Ashford Manufacturing',star:5,c:'#0057b8',ini:'SM'},
    {q:"The implementation was flawless. We went live on time and on budget — the first time we'd experienced that with a major ERP project.",name:'Raj Patel',role:'IT Director',co:'PrimeLine Distribution',star:5,c:'#6c3ce1',ini:'RP'},
    {q:"The Power BI dashboards changed how we make decisions. Our board now asks for data we didn't know we could surface.",name:'Charlotte Wu',role:'COO',co:'Stratford Retail Group',star:5,c:'#00b4a6',ini:'CW'},
  ]
  return (
    <section ref={ref} style={{padding:'88px 24px',background:'#fff'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div style={{display:'inline-flex',background:'#fff7ed',color:'#f97316',borderRadius:50,padding:'6px 18px',fontSize:12,fontWeight:700,marginBottom:16,border:'1px solid #fed7aa',letterSpacing:'.06em'}}>CLIENT STORIES</div>
          <h2 style={{fontSize:'clamp(1.7rem,3.2vw,2.4rem)',fontWeight:900,color:'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
            What our{' '}
            <span className="grad-text" style={{background:'linear-gradient(135deg,#f97316,#6c3ce1)'}}>clients say</span>
          </h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:22}}>
          {quotes.map((t,i)=>(
            <div key={i} style={{padding:'30px',borderRadius:22,border:'1.5px solid #f1f5f9',background:'#fff',transition:'all .26s',position:'relative',opacity:vis?1:0,transform:vis?'none':'translateY(16px)',transitionDelay:`${i*90}ms`}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow=`0 16px 48px ${t.c}14`;e.currentTarget.style.borderColor=t.c+'33';e.currentTarget.style.transform='translateY(-4px)'}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#f1f5f9';e.currentTarget.style.transform='none'}}>
              <div style={{position:'absolute',top:20,right:24,fontSize:52,color:t.c,opacity:.1,fontFamily:'Georgia,serif',lineHeight:1}}>"</div>
              <div style={{display:'flex',gap:2,marginBottom:16}}>
                {Array(t.star).fill(0).map((_,j)=><span key={j} style={{color:'#fbbf24',fontSize:16}}>★</span>)}
              </div>
              <p style={{fontSize:14.5,color:'#334155',lineHeight:1.78,marginBottom:22,fontStyle:'italic',position:'relative',zIndex:1}}>"{t.q}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:42,height:42,borderRadius:'50%',background:`linear-gradient(135deg,${t.c},${t.c}88)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <span style={{color:'#fff',fontWeight:800,fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.ini}</span>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'#0f172a',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{t.name}</div>
                  <div style={{fontSize:12,color:'#64748b'}}>{t.role} · {t.co}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
function CTA({ openConsult }) {
  return (
    <section style={{padding:'0 24px 88px',background:'#f8fafc'}}>
      <div style={{maxWidth:1280,margin:'0 auto'}}>
        <div style={{borderRadius:28,background:'linear-gradient(135deg,#0057b8 0%,#4420c4 50%,#6c3ce1 100%)',padding:'64px 48px',textAlign:'center',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-50,left:-50,width:240,height:240,borderRadius:'50%',background:'rgba(255,255,255,.05)',pointerEvents:'none'}}/>
          <div style={{position:'absolute',bottom:-40,right:-40,width:200,height:200,borderRadius:'50%',background:'rgba(255,255,255,.05)',pointerEvents:'none'}}/>
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontSize:'clamp(1.5rem,2.8vw,2.2rem)',fontWeight:900,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif",marginBottom:12,lineHeight:1.2}}>
              Ready to transform your business?
            </div>
            <p style={{fontSize:15.5,color:'rgba(255,255,255,.76)',maxWidth:480,margin:'0 auto 32px',lineHeight:1.75}}>
              Join 350+ businesses on Dynamics 365. Free consultation. See your ROI in 60 minutes.
            </p>
            <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={openConsult} style={{padding:'15px 34px',borderRadius:50,background:'#fff',color:'#0057b8',border:'none',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:'0 8px 28px rgba(0,0,0,.22)',transition:'all .22s',WebkitTapHighlightColor:'transparent'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,.3)'}}
                onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 28px rgba(0,0,0,.22)'}}>
                Book Free Consultation →
              </button>
              <button style={{padding:'15px 34px',borderRadius:50,background:'rgba(255,255,255,.1)',color:'#fff',border:'1.5px solid rgba(255,255,255,.28)',fontSize:15,fontWeight:700,cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif",backdropFilter:'blur(10px)',transition:'all .22s',WebkitTapHighlightColor:'transparent'}}
                onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,.2)'}
                onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.1)'}>
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomePage({ navigate, openConsult, openDemo }) {
  return (
    <div className="page-fade">
      <Hero openConsult={openConsult} openDemo={openDemo} navigate={navigate}/>
      <Trust/>
      <Stats/>
      <SolutionsSection navigate={navigate}/>
      <ServicesSection navigate={navigate}/>
      <Testimonials/>
      <CTA openConsult={openConsult}/>
    </div>
  )
}
