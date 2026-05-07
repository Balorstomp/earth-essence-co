import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '@/components/ProductCard'
import { getFeaturedProducts } from '@/data/products'

// â”€â”€ Botanical SVG decorations â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LeafDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 170 C60 170 10 120 10 70 C10 30 35 5 60 5 C85 5 110 30 110 70 C110 120 60 170 60 170Z" fill="currentColor" />
      <path d="M60 170 L60 5" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      <path d="M60 80 C40 65 25 50 15 35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 80 C80 65 95 50 105 35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 110 C35 95 20 80 12 60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <path d="M60 110 C85 95 100 80 108 60" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  )
}

function BranchDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 180 C20 180 60 140 80 100 C100 60 90 20 90 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M80 100 C80 100 110 85 130 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M65 130 C65 130 95 115 115 105" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 155 C50 155 80 140 95 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <ellipse cx="135" cy="65" rx="14" ry="9" transform="rotate(-30 135 65)" fill="currentColor" opacity="0.6"/>
      <ellipse cx="120" cy="100" rx="12" ry="8" transform="rotate(-10 120 100)" fill="currentColor" opacity="0.6"/>
      <ellipse cx="100" cy="125" rx="12" ry="8" transform="rotate(10 100 125)" fill="currentColor" opacity="0.6"/>
    </svg>
  )
}

function CircleDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6"/>
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5"/>
    </svg>
  )
}

// NEW: Hibiscus / flower ornament
function FlowerDeco({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={i}
          cx="80" cy="46" rx="13" ry="30"
          fill="currentColor" opacity="0.55"
          transform={`rotate(${angle} 80 80)`}
        />
      ))}
      <circle cx="80" cy="80" r="16" fill="currentColor" opacity="0.9"/>
      <circle cx="80" cy="80" r="8"  fill="currentColor" opacity="0.3"/>
    </svg>
  )
}

// NEW: Herb sprig (rosemary-style)
function HerbSprig({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 190 C40 190 40 20 40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {[30,55,80,105,130,155].map((y, i) => (
        <g key={i}>
          <path d={`M40 ${y} C${i%2===0 ? 15 : 65} ${y-10} ${i%2===0 ? 10 : 70} ${y-5} ${i%2===0 ? 8 : 72} ${y}`}
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <ellipse cx={i%2===0 ? 12 : 68} cy={y} rx="7" ry="4"
            transform={`rotate(${i%2===0 ? -20 : 20} ${i%2===0 ? 12 : 68} ${y})`}
            fill="currentColor" opacity="0.5"/>
        </g>
      ))}
    </svg>
  )
}

// NEW: Seed pod / botanical ornament
function SeedPod({ className = '', style = {} }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 150 L50 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 80 C50 80 20 55 20 35 C20 15 35 5 50 5 C65 5 80 15 80 35 C80 55 50 80 50 80Z"
        fill="currentColor" opacity="0.7"/>
      <path d="M50 80 L50 5" stroke="currentColor" strokeWidth="0.8" opacity="0.4"/>
      <path d="M50 45 C35 40 25 30 22 18" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      <path d="M50 45 C65 40 75 30 78 18" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
    </svg>
  )
}

export default function HomePage() {
  const featured = getFeaturedProducts()

  return (
    <>
      {/* â”€â”€ HERO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="min-h-screen bg-cream flex items-center pt-20 overflow-hidden relative texture">
        {/* Botanical BG decorations */}
        <LeafDeco  className="absolute right-0 top-20 text-terra w-48 h-72 opacity-5 pointer-events-none" />
        <BranchDeco className="absolute left-0 bottom-20 text-olive w-48 h-48 opacity-5 pointer-events-none" />
        <HerbSprig className="absolute right-16 bottom-0 text-terra w-10 h-32 opacity-8 pointer-events-none sway" style={{ opacity: 0.08 }} />
        <FlowerDeco className="absolute left-8 top-32 text-sage w-20 h-20 opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center py-16">

          {/* Text */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: '#F0DDD0' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-terra" />
              <span className="text-[10px] tracking-widest uppercase font-semibold text-forest">Organic Â· Handcrafted Â· Pure</span>
            </div>
            <h1 className="font-display font-bold text-forest leading-none mb-6" style={{ fontSize: 'clamp(3rem, 7vw , 5.5rem)' }}>
              Skincare<br />
              <span className="italic font-normal text-terra">rooted in</span><br /Ï‚ˆ˜]\™K‚ˆÚO‚ˆÛ\ÜÓ˜[YOH^Z[šË[YÚ^X˜\ÙHY^[ÈXY[™Ë\™[^YX^]Ë[YX‹LL‚ˆ]™\žH˜\ˆ[™˜\ˆ[™XYH[ˆÛX[˜]Ú\È8 %›ÈÝ[]\Ë›È\˜X™[œË›ÈÛÛ\›ÛZ\Ù\Ëˆ\Ý[È]ÛÜšË‚ˆÜ‚ˆ]ˆÛ\ÜÓ˜[YOH™›^›^]Ü˜\Ø\M‚ˆ[šÈ™YH‹ÜÚÜˆÛ\ÜÓ˜[YOH˜‹\š[X\žH”ÚÜ›ÝÏÓ[šÏ‚ˆ[šÈ™YH‹ØX›Ý]ˆÛ\ÜÓ˜[YOH˜‹[Ý][™H“Ý\ˆÝÜžOÓ[šÏ‚ˆÙ]‚‚ˆËÊˆ™]šY]ÜÈÛØÚX[›ÛÙˆ
‹ßBˆ]ˆÛ\ÜÓ˜[YOH™›^][\ËXÙ[\ˆØ\LÈ]LLN›Ü™\‹]›Ü™\‹\Ø[™‚ˆ]ˆÛ\ÜÓ˜[YOH™›^\ÜXÙK^Lˆ‚ˆÖÉÈÑŒ	Ë	ÈÑŽM‰Ë	ÈÐÌŽ	Ë	ÈÎQMLŽ	×K›X\

™ËJHOˆ
ˆ]ˆÙ^O^Ú_HÛ\ÜÓ˜[YOHËNN›Ý[™YY[›Ü™\‹Lˆ›Ü™\‹XÜ™X[K[YÚˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ÛÛÜŽˆ™È_HÏ‚ˆ
J_BˆÙ]‚ˆ]‚ˆ]ˆÛ\ÜÓ˜[YOHœÝ\œÈ^^È¸¦!x¦!x¦!x¦!x¦!OÙ]‚ˆÛ\ÜÓ˜[YOH^^È^\Û]H]LHŽH0­ÈŒ
È\HÝ\ÝÛY\œÏÜ‚ˆÙ]‚ˆÙ]‚ˆÙ]‚‚ˆËÊˆ\›È[XYÙH
È›Ø][™ÈØ\™È
‹ßBˆ]ˆÛ\ÜÓ˜[YOHœ™[]]™H˜YK]\ˆÝ[O^ÞÈ[š[X][Û‘[^Nˆ	ÌŒM\ÉÈ_O‚ˆËÊˆXZ[ˆ[XYÙH
‹ßBˆ]ˆÛ\ÜÓ˜[YOHœ™[]]™H\ÜXÝVÍÍWHÝ™\™›ÝËZY[ˆ›Ý[™Y\ÛHˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ÛÛÜŽˆ	ÈÑŽM‰È_O‚ˆ[XYÙBˆÜ˜ÏH‹Ú[XYÙ\ËÚ\›ËšœÈ‚ˆ[H‘X\	ˆ\ÜÙ[˜ÙHÛËˆ˜]\˜[ÚÚ[˜Ø\™H‚ˆš[ˆÛ\ÜÓ˜[YOH›Øš™XÝXÛÝ™\ˆ‚ˆš[Üš]BˆÏ‚ˆËÊˆ˜[˜XÚÈXÙZÛ\ˆ
‹ßBˆ]ˆÛ\ÜÓ˜[YOH˜XœÛÛ]H[œÙ]L›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ˆ	Û[™X\‹YÜ˜YY[
LÍYYËÑŽMˆ	KÑQ‘MQHŒ	KÐÌŽL	JIÈ_O‚ˆ]ˆÛ\ÜÓ˜[YOH^XÙ[\ˆ‚ˆ›ÝÙ\‘XÛÈÛ\ÜÓ˜[YOHËLL^X]]È^Y›Ü™\ÝÜXÚ]KLŒˆÏ‚ˆÛ\ÜÓ˜[YOH™›ÛY\Ü^H›ÛX›Û^M^Y›Ü™\ÝÌŒ]Lˆ‘I˜[\ÑOÜ‚ˆÛ\ÜÓ˜[YOH^VÎ\H˜XÚÚ[™Ë]ÚY\Ý\\˜Ø\ÙH^Y›Ü™\ÝÌŒ]LHYÜX›XËÚ[XYÙ\ËÚ\›ËšœÏÜ‚ˆÙ]‚ˆÙ]‚ˆËÊˆXØÙ[˜\ˆ
‹ßBˆ]ˆÛ\ÜÓ˜[YOH˜XœÛÛ]HÜLYLšYÚLLKH™Ë]\œ˜HˆÏ‚‚ˆËÊˆ›Ý™[ˆY™™XÝ]™[™\ÜÈØ\™
‹ßBˆ]ˆÛ\ÜÓ˜[YOH™›Ø][™ËXØ\™XœÛÛ]H›ÝÛKMˆYM‚ˆ]ˆÛ\ÜÓ˜[YOHËNN›Ý[™YY[›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›^\Úš[šËLˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ˆ	ÈÑŒ	È_O‚ˆÝ™ÈÚYHŒMˆZYÚHŒMˆšY]Ð›ÞHŒˆš[H››Û™HˆÝ›ÚÙOHˆÎQMLŽˆÝ›ÚÙUÚYHŒˆ‚ˆÛ[[™HÚ[ÏHŒŒˆHMÈLˆ‹Ï‚ˆÜÝ™Ï‚ˆÙ]‚ˆ]‚ˆÛ\ÜÓ˜[YOH^^È›Û\Ù[ZX›Û^Y›Ü™\Ý”›Ý™[ˆ[HÛ\ÜÓ˜[YOH™›Û[›Ü›X[‘Y™™XÝ]™[™\ÜÏÙ[OÜ‚ˆÛ\ÜÓ˜[YOH^VÎ\H^\Û]HXY[™Ë]YÚ]LHX^]ËVÌMH‘]™\žH›ÙXÝÜ˜YYÈHYÚ\Ý]X[]HÝ[™\™ËÜ‚ˆÙ]‚ˆÙ]‚ˆÙ]‚‚ˆËÊˆXÛËYœšY[™H›Ø][™ÈØ\™
‹ßBˆ]ˆÛ\ÜÓ˜[YOH™›Ø][™ËXØ\™XœÛÛ]H\šYÚMÜLLˆX^]ËVÌMŒH‚ˆ]‚ˆ\˜”ÜšYÈÛ\ÜÓ˜[YOHËMMˆ^[Û]™HX‹LHˆÏ‚ˆÛ\ÜÓ˜[YOH^^È›Û\Ù[ZX›Û^Y›Ü™\Ý‘XÛËQœšY[™OÜ‚ˆÛ\ÜÓ˜[YOH^VÎ\H^]\œ˜H][XÈ”XÚØYÚ[™ÏÜ‚ˆÛ\ÜÓ˜[YOH^VÎ\H^\Û]H]LHXY[™Ë]YÚ‘XÛËYœšY[™HX]\šX[È\ÚYÛ™YÈØ\™H›ÜˆH[™]Ü‚ˆÙ]‚ˆÙ]‚‚ˆËÊˆL	H˜]\˜[›Ø][™ÈØ\™
‹ßBˆ]ˆÛ\ÜÓ˜[YOH˜XœÛÛ]H[YMÜLKÌÈ^XÜ™X[K[YÚMKLÈ›Ý[™Y\ÛHX^]ËVÌMÌHÚYÝË[ÈˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ˆ	ÈÌÐŒQŒ‰È_O‚ˆ]ˆÛ\ÜÓ˜[YOH™›^][\Ë\Ý\Ø\LˆX‹Lˆ‚ˆ]ˆÛ\ÜÓ˜[YOHËLLLL›Ý[™YY[›^][\ËXÙ[\ˆ\ÝYžKXÙ[\ˆ›^\Úš[šËLˆÝ[O^ÞÈ˜XÚÙÜ›Ý[™ˆ	Ü™Ø˜JMŒ‹KŒÊIÈ_O‚ˆXY‘XÛÈÛ\ÜÓ˜[YOHËMHMH^\ØYÙHˆÏ‚ˆÙ]‚ˆ]‚ˆÛ\ÜÓ˜[YOH^^È›ÛX›ÛŒL	H˜]\˜[Ü‚ˆÛ\ÜÓ˜[YOH^VÌLH^\ØYÙH][XÈŒL	H[ÝOÜ‚ˆÙ]‚ˆÙ]‚ˆÖÉÓ›È\œÚÚ[ZXØ[ÉË	Ô[P˜\ÙYÛÛÙ™\ÜÉË	Ñ]XØ[HÛÝ\˜ÙY	×K›X\
Oˆ
ˆ]ˆÙ^O^ÝHÛ\ÜÓ˜[YOH™›^][\ËXÙ[\ˆØ\LKHX‹LH‚ˆÝ™ÈÚYHŽHˆZYÚHŽHˆšY]Ð›ÞHŒˆš[H››Û™HˆÝ›ÚÙOHˆÐÌŽˆÝ›ÚÙUÚYHŒ‹H‚ˆÛ[[™HÚ[ÏHŒŒˆHMÈLˆ‹Ï‚ˆÜÝ™Ï‚ˆÜ[ˆÛ\ÜÓ˜[YOH^VÎ\H^\Ø[™ÎžÝOÜÜ[‚ˆÙ]‚ˆ
J_BˆÙ]‚ˆÙ]‚ˆÙ]‚ˆÜÙXÝ[Û‚‚ˆËÊˆ8¥ 8¥ Ô‘ÐS’PÈU’QTˆ8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 
‹ßBˆ]ˆÛ\ÜÓ˜[YOHœ™[]]™HLMˆÝ™\™›ÝËZY[ˆ™ËXÜ™X[H‚ˆÝ™ÈšY]Ð›ÞHŒMˆ™\Ù\™P\ÜXÝ˜][ÏH››Û™HˆÛ\ÜÓ˜[YOH˜XœÛÛ]H›ÝÛKLËY[Y[ˆ[œÏHš‹ËÝÝÝËÌË›Ü™ËÌŒÜÝ™È‚ˆ]H“LÌˆÌNÍŒMÌˆÍÌŒLLÌˆÌLŒLÎMˆMÌˆMˆ‚ˆš[HˆÑŽQŒ‘MÈ‹Ï‚ˆÜÝ™Ï‚ˆÙ]‚‚ˆËÊˆ8¥ 8¥ ÐUQÓÔ–HS‘È8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 8¥ 
‹ßBˆÙXÝ[ÛˆÛ\ÜÓ˜[YOH˜™ËXÜ™X[K[YÚKLMˆMˆYœLLˆ™[]]™HÝ™\™›ÝËZY[ˆ‚ˆÙYYÙÛ\ÜÓ˜[YOH˜XœÛÛ]HšYÚNÜN^[Û]™HËNLMˆÜXÚ]KLLÚ[\‹Y]™[Ë[›Û™HˆÏ‚ˆ›ÝÙ\‘XÛÈÛ\ÜÓ˜[YOH˜XœÛÛ]HYM›ÝÛKM^]\œ˜HËLMˆLMˆÜXÚ]KNÚ[\‹Y]™[Ë[›Û™HˆÝ[O^ÞÈÜXÚ]NˆŒ_HÏ‚ˆ]ˆÛ\ÜÓ˜[YOH›X^]ËMÞ^X]]ÈÜšYÜšYXÛÛËLHY™ÜšYXÛÛËLÈØ\M‚ˆÖÂˆÈØ]ˆ	ÚZ\‹\ÛØ\	ËXØÙ[ˆ	ÈÎQMLŽ	Ë™Îˆ	ÈÑQQMÉËX™[ˆ	ÒZ\ˆÛØ\ÉË\ØÎˆ	Ð^]\™YXÈ\˜œÈ›ÜˆÝ›Û™ËX[HZ\‰ËÛÝ[ˆÈKˆÈØ]ˆ	ÜÚÚ[‹\ÛØ\	ËXØÙ[ˆ	ÈÎÍŒŒÎIË™Îˆ	ÈÑQPQLÂÆ&VÃ¢u6¶–â6ö2rÂFW63¢tæGW&UÂw2Ö÷7BVffV7F—fR6ÆVç6W'2rÂ6÷VçC¢2ÒÀ¢²6C¢vf6RÖ7&VÒrÂ66VçC¢r3tC3rÂ&s¢r4cDS„SrÂÆ&VÃ¢tf6R7&V×2rÂFW63¢uF&vWFVB6&Rf÷"&F–çBÂvÆ÷v–ær6¶–ârÂ6÷VçC¢"ÒÀ¢ÒæÖ‚‡²6BÂ66VçBÂ&rÂÆ&VÂÂFW62Â6÷VçBÒ’Óâ€¢ÄÆ–æ²¶W“×¶6GÒ‡&Vc×¶÷6†÷ö6CÒG¶6GÖÐ¢6Æ74æÖSÒ&w&÷W&VÆF—fR÷fW&fÆ÷rÖ†–FFVâÓ‚fÆW‚fÆW‚Ö6öÂ§W7F–g’Ö&WGvVVâÖ–âÖ‚Õ³#…Ò&÷VæFVB×6ÒG&ç6—F–öâÖÆÂGW&F–öâÓ3†÷fW#§6†F÷rÖÖBFW‡GW&R ¢7G–ÆS×·²&6¶w&÷VæD6öÆ÷#¢&rÂ&÷&FW%F÷¢G‚6öÆ–BG¶66VçGÖ×Óà¢ÆF—cà¢Ç6Æ74æÖSÒ'FW‡BÕ³—…ÒG&6¶–ær×v–FW7BWW&66RföçB×6VÖ–&öÆBÖ"Ó""7G–ÆS×·²6öÆ÷#¢66VçB×Óç¶6÷VçGÒ&öGV7G3Â÷à¢Æƒ"6Æ74æÖSÒ&föçBÖF—7Æ’föçBÖ&öÆBFW‡BÖf÷&W7BFW‡BÓ'†ÂÖ"Ó"#ç¶Æ&VÇÓÂöƒ#à¢Ç6Æ74æÖSÒ'FW‡B×6ÆFRFW‡B×6ÒÆVF–ær×&VÆ†VB#ç¶FW67ÓÂ÷à¢ÂöF—cà¢Ç6Æ74æÖSÒ'FW‡BÕ³…ÒG&6¶–ær×v–FW7BWW&66RföçB×6VÖ–&öÆB×BÓBw&÷WÖ†÷fW#§G&ç6ÆFR×‚ÓG&ç6—F–öâ×G&ç6f÷&ÒGW&F–öâÓ#"7G–ÆS×·²6öÆ÷#¢66VçB×Óà¢W‡Æ÷&R(i ¢Â÷à¢²ò¢FV6÷&F—fRÆVb¢÷Ð¢ÄÆVdFV6ò6Æ74æÖSÒ&'6öÇWFR&–v‡BÓB&÷GFöÒÓBrÓb‚Ó#B÷6—G’Ó"7G–ÆS×·²6öÆ÷#¢66VçB×Òóà¢ÂôÆ–æ³à¢’—Ð¢ÂöF—cà¢Â÷6V7F–öãà ¢²ò¢)H)HdTEU$TB$ôET5E2)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H¢÷Ð¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ&rÖ7&VÒ&VÆF—fR÷fW&fÆ÷rÖ†–FFVâ#à¢Ä†W&%7&–r6Æ74æÖSÒ&'6öÇWFRÆVgBÓbF÷ÓbFW‡B×FW'&rÓb‚Ó#÷6—G’Ó‚ö–çFW"ÖWfVçG2ÖæöæR"7G–ÆS×·²÷6—G“¢ã‚×Òóà¢Å6VVEöB6Æ74æÖSÒ&'6öÇWFR&–v‡BÓ"&÷GFöÒÓbFW‡BÖöÆ—fRrÓr‚ÓB÷6—G’Óö–çFW"ÖWfVçG2ÖæöæR"óà¢ÆF—b6Æ74æÖSÒ&Ö‚×rÓw†Â×‚ÖWFò#à¢ÆF—b6Æ74æÖSÒ&fÆW‚—FV×2ÖVæB§W7F–g’Ö&WGvVVâÖ"Ó"#à¢ÆF—cà¢Ç6Æ74æÖSÒ'FW‡BÕ³…ÒG&6¶–ær×v–FW7BWW&66RFW‡B×6ÆFRÖ"Ó"föçB×6VÖ–&öÆB#ä&W7G6VÆÆW'3Â÷à¢Æƒ"6Æ74æÖSÒ&föçBÖF—7Æ’föçBÖ&öÆBFW‡BÖf÷&W7BFW‡BÓG†ÂÖC§FW‡BÓW†Â#ä÷W"ff÷W&—FW3Âöƒ#à¢ÂöF—cà¢ÄÆ–æ²‡&VcÒ"÷6†÷"6Æ74æÖSÒ&†–FFVâÖC¦&Æö6²FW‡BÕ³…ÒG&6¶–ær×v–FW7BWW&66RföçB×6VÖ–&öÆBFW‡BÖf÷&W7B†÷fW#§FW‡BÖöÆ—fRG&ç6—F–öâÖ6öÆ÷'2GW&F–öâÓ#&÷&FW"Ö"&÷&FW"Öf÷&W7B"ÓãR#à¢f–WrÆÂ(i ¢ÂôÆ–æ³à¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–Bw&–BÖ6öÇ2Ó6Ó¦w&–BÖ6öÇ2Ó"Æs¦w&–BÖ6öÇ2ÓBvÓB#à¢¶fVGW&VBæÖ‡&öGV7BÓâ€¢Å&öGV7D6&B¶W“×·&öGV7Bæ–GÒ&öGV7C×·&öGV7GÒóà¢’—Ð¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà ¢²ò¢)H)Ht…’„äDÔDR)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H¢÷Ð¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ&rÖ7&VÒÖÆ–v‡B&VÆF—fR÷fW&fÆ÷rÖ†–FFVâFW‡GW&R#à¢Ä'&æ6„FV6ò6Æ74æÖSÒ&'6öÇWFR&–v‡BÓF÷ÓFW‡BÖöÆ—fRrÓcB‚ÓcB÷6—G’ÓRö–çFW"ÖWfVçG2ÖæöæR"óà¢ÄfÆ÷vW$FV6ò6Æ74æÖSÒ&'6öÇWFRÆVgBÓ&÷GFöÒÓ‚FW‡B×FW'&rÓ#B‚Ó#B÷6—G’ÓRö–çFW"ÖWfVçG2ÖæöæR"óà¢ÆF—b6Æ74æÖSÒ&Ö‚×rÓw†Â×‚ÖWFò&VÆF—fR#à¢ÆF—b6Æ74æÖSÒ'FW‡BÖ6VçFW"Ö"ÓB#à¢Ç6Æ74æÖSÒ'FW‡BÕ³…ÒG&6¶–ær×v–FW7BWW&66RFW‡B×6ÆFRÖ"Ó2föçB×6VÖ–&öÆB#åv‡’—BÖGFW'3Â÷à¢Æƒ"6Æ74æÖSÒ&föçBÖF—7Æ’föçBÖ&öÆBFW‡BÖf÷&W7BFW‡BÓG†Â#åF†R†æFÖFRF–ffW&Væ6SÂöƒ#à¢ÂöF—cà¢ÆF—b6Æ74æÖSÒ&w&–Bw&–BÖ6öÇ2ÓÖC¦w&–BÖ6öÇ2Ó2vÓ#à¢µ°¢²66VçC¢r3”SD#‚rÂF—FÆS¢u6ÖÆÂ&F6‚–çFVw&—G’rÂ–6öã¢Å6VVEöB6Æ74æÖSÒ'rÓ‚‚Ó"FW‡B×FW'&÷6—G’Óc"óâÂ&öG“¢uvRÖ¶R–â&F6†W2öbVæFW"SVæ—G2âæò6†÷'F7WG2Âæò'VÆ²ÖçVf7GW&–ærâ–÷RvWB&öGV7BÖFRv—F‚gVÆÂGFVçF–öâârÒÀ¢²66VçC¢r3„3c#3’rÂF—FÆS¢t–æw&VF–VçG2–÷R6â&VBrÂ–6öã¢ÄÆVdFV6ò6Æ74æÖSÒ'rÓ‚‚Ó"FW‡BÖöÆ—fR÷6—G’Óc"óâÂ&öG“¢tæòf–ÆÆW'2Âæò7–çF†WF–2g&w&æ6RÂæò×—7FW'’6†VÖ–6Ç2âWfW'’–æw&VF–VçBV&ç2—G2Æ6RæB—2Æ—7FVB6ÆV&Ç’ârÒÀ¢²66VçC¢r3tC3rÂF—FÆS¢u6¶–âF†B&W7öæG2rÂ–6öã¢Ä†W&%7&–r6Æ74æÖSÒ'rÓb‚Ó"FW‡B×FVÂ÷6—G’Óc"óâÂ&öG“¢uv—F†÷WB7G&—–ær7VÇ†FW2æB'F–f–6–ÂFF—F—fW2Â–÷W"6¶–â†276RFò'&VF†RÂ&Ææ6RÂæBvVçV–æVÇ’†VÂârÒÀ¢ÒæÖ‚‡²66VçBÂF—FÆRÂ–6öâÂ&öG’Ò’Óâ€¢ÆF—b¶W“×·F—FÆWÒ6Æ74æÖSÒ&fÆW‚fÆW‚Ö6öÂvÓB#à¢ÆF—b6Æ74æÖSÒ&Ö"Ó"#ç¶–6öçÓÂöF—cà¢ÆF—b6Æ74æÖSÒ'rÓ‚Ó&÷VæFVBÖgVÆÂ"7G–ÆS×·²&6¶w&÷VæD6öÆ÷#¢66VçB×Òóà¢Æƒ26Æ74æÖSÒ&föçBÖF—7Æ’föçBÖ&öÆBFW‡BÖf÷&W7BFW‡B×†Â#ç·F—FÆWÓÂöƒ3à¢Ç6Æ74æÖSÒ'FW‡BÖ–æ²ÖÆ–v‡BFW‡B×6ÒÆVF–ær×&VÆ†VB#ç¶&öG—ÓÂ÷à¢ÂöF—cà¢’—Ð¢ÂöF—cà¢ÂöF—cà¢Â÷6V7F–öãà ¢²ò¢)H)Hõ$tä”2tdRD•d”DU")H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H¢÷Ð¢ÆF—b6Æ74æÖSÒ'&VÆF—fR‚Ó"÷fW&fÆ÷rÖ†–FFVâ&rÖ7&VÒÖÆ–v‡B#à¢Ç7frf–Wt&÷ƒÒ#CCC‚"&W6W'fT7V7E&F–óÒ&æöæR"6Æ74æÖSÒ&'6öÇWFR&÷GFöÒÓrÖgVÆÂ‚ÖgVÆÂ"†ÖÆç3Ò&‡GG¢ò÷wwrçs2æ÷&ró#÷7fr#à¢ÇF‚CÒ$ÓÃ#B3#CÃC‚CƒÃs#Ã#B3“cÃC‚#ÃCCÃ#BÃCCÃC‚ÃÃC‚¢ ¢f–ÆÃÒ"4TdSTCR"óà¢Â÷7fsà¢ÂöF—cà ¢²ò¢)H)H$Ud”UrDU5D”Ôôä”Â)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H)H¢÷Ð¢Ç6V7F–öâ6Æ74æÖSÒ'6V7F–öâ&rÖ7&VÒFW‡BÖ6VçFW"&VÆF—fR÷fW&fÆ÷rÖ†–FFVâ#à¢Ä6—&6ÆTFV6ò6Æ74æÖSÒ&'6öÇWFRÆVgBÓó"F÷Óó"×G&ç6ÆFR×‚Óó"×G&ç6ÆFR×’Óó"rÓs"‚Ós"FW‡B×FW'&÷6—G’ÓRö–çFW"ÖWfVçG2ÖæöæR"óà¢ÄfÆ÷vW$FV6ò6Æ74æÖSÒ&'6öÇWFR&–v‡BÓbF÷ÓbFW‡B×6vRrÓb‚Ób÷6—G’ÓRö–çFW"ÖWfVçG2ÖæöæR"óà¢Ä†W&%7&–r6Æ74æÖSÒ&'6öÇWFRÆVgBÓ"&÷GFöÒÓ"FW‡BÖöÆ—fRrÓ‚‚Ó#÷6—G’Ó‚ö–çFW"ÖWfVçG2ÖæöæR"7G–ÆS×·²÷6—G“¢ã‚×Òóà¢ÆF—b6Æ74æÖSÒ&Ö‚×rÓ'†Â×‚ÖWFò&VÆF—fR#à¢²ò¢&öGV7B–6öç2¢÷Ð¢ÆF—b6Æ74æÖSÒ&fÆW‚§W7F–g’Ö6VçFW"vÓ"Ö"Ó‚#à¢µ²r4cDDCrÂr4CD#ƒ“buÒæÖ‚†&rÂ’’ÓâŒdiv key={i} className={`w-12 h-14 rounded-sm shadow-md flex items-end justify-center pb-1 ${i === 1 ? 'mb-3' : ''}`} style={{ backgroundColor: bg }}>
                <div className="w-1 h-8 rounded-full" style={{ background: '#9E4A28', opacity: 0.3 }} />
              </div>
            ))}
          </div>
          <blockquote className="font-display text-2xl md:text-3xl text-forest leading-relaxed mb-6">
            "It feels <em className="text-terra">healthier, smoother &</em><br />
            <em className="text-olive">more radiant</em> than ever. I love knowing I'm<br />
            using something natural and effective!"
          </blockquote>
          <div className="stars text-sm mb-1">â˜…â˜…â˜…â˜…â˜…</div>
          <p className="font-semibold text-forest text-sm">Priya S.</p>
          <p className="text-slate text-xs mt-0.5">Verified Buyer</p>
        </div>
      </section>

      {/* â”€â”€ BRAND STORY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-20 px-6 md:px-12 relative overflow-hidden texture" style={{ background: '#3B1F0F' }}>
        <LeafDeco className="absolute right-12 top-12 text-olive w-32 h-48 opacity-10 pointer-events-none" />
        <BranchDeco className="absolute left-0 bottom-0 text-sage w-48 h-48 opacity-10 pointer-events-none" />
        <SeedPod className="absolute right-1/3 bottom-8 text-terra w-6 h-12 opacity-15 pointer-events-none" style={{ opacity: 0.15 }} />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <p className="text-[10px] tracking-widest uppercase font-semibold mb-4" style={{ color: '#C08B68' }}>Meet the maker</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-6 text-cream-light">
              Made by hand.<br />
              <span className="italic font-normal text-sand">With love.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: 'rgba(212,184,150,0.75)' }}>
              Earth & Essence Co. started in a home kitchen with one question: why is it so hard to find skincare that's both honest and effective? Every product you see here is still made by hand, in small batches, with ingredients that earn their place.
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-cream-light border-b pb-0.5 hover:border-cream-light transition-colors duration-200" style={{ borderColor: 'rgba(239,229,213,0.4)' }}>
              Read Our Story â†’
            </Link>
          </div>
          <div className="relative aspect-square rounded-sm overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
            <Image src="/images/founder.jpg" alt="Earth & Essence Co. founder" fill className="object-cover" />
            {/* Fallback placeholder */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(160,82,45,0.2) 0%, rgba(59,31,15,0.4) 100%)' }}>
              <div className="text-center">
                <FlowerDeco className="w-20 h-20 mx-auto text-cream-light opacity-10" />
                <p className="font-display font-bold text-6xl text-cream-light/10 mt-2">E&amp;E</p>
                <p className="text-[9px] tracking-widest uppercase text-cream-light/20 mt-2">Add /public/images/founder.jpg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ PAYMENT TRUST BAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-cream-light py-6 px-6 md:px-12 border-y border-sand">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <p className="text-[10px] tracking-widest uppercase text-slate font-semibold">Secure checkout via</p>
          {[
            { label: 'UPI',                 icon: 'ðŸ“±', note: 'Google Pay Â· PhonePe Â· Paytm' },
            { label: 'Indian Cards',        icon: 'ðŸ’³', note: 'Visa Â· Mastercard Â· RuPay' },
            { label: 'International Cards', icon: 'ðŸŒ', note: 'Visa Â· Mastercard Â· Amex' },
            { label: 'Net Banking',         icon: 'ðŸ¦', note: 'All major banks' },
          ].map(({ label, icon, note }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-lg">{icon}</span>
              <span className="text-[9px] font-semibold text-forest tracking-wide">{label}</span>
              <span className="text-[8px] text-slate">{note}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[9px] text-slate">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Powered by Razorpay
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="section text-center relative overflow-hidden" style={{ background: '#F0DDD0' }}>
        <CircleDeco className="absolute right-12 top-1/2 -translate-y-1/2 w-48 h-48 text-terra opacity-10 pointer-events-none" />
        <FlowerDeco className="absolute left-8 top-8 text-olive w-16 h-16 opacity-8 pointer-events-none" style={{ opacity: 0.08 }} />
        <HerbSprig className="absolute right-8 bottom-4 text-terra w-8 h-20 opacity-10 pointer-events-none sway" />
        <p className="text-[10px] tracking-widest uppercase text-terra font-semibold mb-4">Free shipping on orders over â‚¹999 / $40</p>
        <h2 className="font-display font-bold text-forest text-4xl md:text-5xl mb-6 relative">
          Ready to switch to clean?
        </h2>
        <Link href="/shop" className="btn-primary">Explore All Products</Link>
      </section>
    </>
  )
}
