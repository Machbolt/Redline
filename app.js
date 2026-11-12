const cars=[
 {brand:'JAS MOTORSPORT',name:'Tensei',class:'Supercar',date:'OCT 12, 2026',desc:'A Pininfarina-designed, carbon-bodied reinterpretation of the first-generation Honda NSX. JAS and Judd Power pair a naturally aspirated V6 with a six-speed manual; top speed has not been announced.',power:'420 bhp',speed:'Undisclosed',engine:'3.5L naturally aspirated V6',drive:'RWD · 6-speed manual',url:'https://jas-tensei.it/',image:'assets/cars/jas-tensei.png',color:'#536b69'},
 {brand:'KOENIGSEGG',name:'CCGT1',class:'Hypercar',date:'AUG 13, 2026',desc:'A 70-car road-and-track tribute to Koenigsegg’s GT1 racing project, built around a carbon monocoque and high-downforce aero.',power:'1,280 hp¹',speed:'Undisclosed',engine:'5.0L twin-turbo V8',drive:'9-speed LST · sequential',url:'https://www.koenigsegg.com/technical-specifications-ccgt1',image:'assets/cars/koenigsegg-ccgt1.jpg',color:'#566b70'},
 {brand:'SPYKER',name:'C8 Preliator XXV Coupé',class:'Supercar',date:'AUG 14, 2026',desc:'A hand-built anniversary flagship pairs Spyker’s aircraft-inspired detailing with a twin-turbo V8 and a rare manual gearbox.',power:'800 hp',speed:'Undisclosed',engine:'Twin-turbo V8',drive:'Manual · details undisclosed',url:'https://www.prnewswire.com/news-releases/spyker-c8-preliator-xxv-coupe-146-years-in-the-making-a-new-era-begins-302851324.html',image:'assets/cars/spyker-preliator.webp',color:'#796b55'},
 {brand:'PORSCHE',name:'Mission S Vision Model',class:'Sports car',date:'OCT 15, 2026',desc:'A mid-engine vision model previews Porsche’s planned super-sports-car platform above the 911. Performance figures have not been announced.',power:'Undisclosed',speed:'Undisclosed',engine:'Mid-engine · undisclosed',drive:'Undisclosed',url:'https://pnr-prd2-pub2.newsroom.porsche.com/en_US/2026/products/porsche-mission-s-vision-model-43535.html',image:'assets/cars/porsche-mission-s.jpg',color:'#75584a'},
 {brand:'TESLA',name:'Roadster (Next Gen)',class:'Sports car',date:'OCT 15, 2026',desc:'Tesla revealed its long-promised electric sports car with a dramatic technology showcase. Production timing and performance claims remain to be confirmed.',power:'Undisclosed',speed:'Undisclosed',engine:'Electric · details undisclosed',drive:'Undisclosed',url:'https://www.tesla.com/roadster',image:'assets/cars/tesla-roadster.png',color:'#744a47'},
 {brand:'ASTON MARTIN',name:'Valhalla Spider',class:'Supercar',date:'OCT 28, 2026',desc:'The open-cockpit Valhalla pairs the coupe’s plug-in hybrid powertrain with revised active aero and a removable hard top.',power:'1,079 PS',speedKmh:350,engine:'4.0L twin-turbo V8 · PHEV',drive:'AWD · 8-speed DCT',url:'https://media.astonmartin.com/aston-martin-valhalla-spider-the-ultimate-open-top-supercar/?lang=eng',image:'assets/cars/aston-martin-valhalla-spider.webp',color:'#546858'},
 {brand:'BUGATTI',name:'Destrier',class:'Hypercar',date:'AUG 06, 2026',desc:'A one-off Programme Solitaire creation that reimagines Bugatti’s track-focused Bolide foundation as a bespoke sculpture of speed.',power:'1,600 PS',speed:'Undisclosed',engine:'8.0L W16 · quad turbo',drive:'Track-derived · details undisclosed',url:'https://newsroom.bugatti.com/en/press-releases/the-bugatti-destrier-a-sculpture-of-speed',image:'assets/cars/bugatti-destrier.jpg',color:'#6b7051'},
 {brand:'ASTON MARTIN',name:'Valen',class:'Supercar',date:'AUG 14, 2026',desc:'A 150-unit, front-engined V12 special based on the Vanquish, developed by Aston Martin’s bespoke Q division.',power:'850 PS',speedKmh:345,engine:'5.2L twin-turbo V12',drive:'RWD · 8-speed automatic',url:'https://www.astonmartin.com/en/our-world/news/2026/8/14/aston-martin-valen-the-most-powerful-front-engined-supercar',image:'assets/cars/aston-martin-valen.jpg',color:'#49655b'},
 {brand:'McLAREN',name:'McL 6GT',class:'Supercar',date:'AUG 14, 2026',desc:'A concept previewing a production supercar planned for 2028: carbon-fibre construction, a V8 and a manual gearbox, inspired by Bruce McLaren’s M6GT vision.',power:'Undisclosed',speed:'Undisclosed',engine:'V8 · specifications undisclosed',drive:'RWD · manual',url:'https://www.mclaren.com/cars/gl_en/mcl-6gt?pubDate=20260814',image:'assets/cars/mclaren-mcl-6gt.png',color:'#8d572f'},
 {brand:'PORSCHE',name:'Flachbau RS',class:'Supercar',date:'AUG 14, 2026',desc:'A one-off Sonderwunsch 911 GT2 RS reimagined with a slant-nose body inspired by the 935 “Moby Dick.” Based on the 991.2 GT2 RS.',power:'700 hp',speed:'Undisclosed',engine:'3.8L twin-turbo flat-six',drive:'RWD · 7-speed PDK',url:'https://newsroom.porsche.com/en_US/2026/products/in-the-slipstream-of-moby-dick-an-extraordinary-one-off-flachbau-model.html',image:'assets/cars/porsche-flachbau-rs.jpg',color:'#5d655e'},
 {brand:'HENNESSEY',name:'Blackbird',class:'Hypercar',date:'AUG 03, 2026',desc:'A 71-car American touring hypercar with a naturally aspirated V8 and gated manual, built around driver involvement. This is my feed cutoff car.',power:'800–850 hp',speedKmh:354,engine:'6.2L naturally aspirated V8',drive:'RWD · 6-speed manual',url:'https://www.globenewswire.com/news-release/2026/08/03/3337537/0/en/all-new-hennessey-blackbird-hypercar-revealed.html',image:'assets/cars/hennessey-blackbird.jpg',color:'#62635e'},
 {brand:'GORDON MURRAY SPECIAL VEHICLES',name:'S1',class:'Supercar',date:'AUG 14, 2026',desc:'A road-going, lightweight V12 manual supercar from Gordon Murray Special Vehicles, revealed at The Quail. Several performance figures remain undisclosed.',power:'Up to 690 PS',speed:'Undisclosed',engine:'4.2L naturally aspirated Cosworth V12',drive:'RWD · 6-speed manual',url:'https://www.gordonmurray.com/press/gordon-murray-reveals-s1',image:'assets/cars/gordon-murray-s1.jpg',color:'#5d6660'},
 {brand:'LAMBORGHINI',name:'Revuelto SV',class:'Supercar',date:'AUG 14, 2026',desc:'A sharper Super Veloce evolution of Lamborghini’s V12 plug-in hybrid flagship, announced at Monterey Car Week.',power:'1,065 CV',speed:'Undisclosed',engine:'6.5L V12 · plug-in hybrid',drive:'AWD · 8-speed DCT',url:'https://www.roadandtrack.com/news/a73423950/2026-monterey-car-week-reveal-roundup/',image:'assets/cars/lamborghini-revuelto-sv.jpg',color:'#766440'},
 {brand:'ECCENTRICA',name:'V12 Roadster',class:'Sports car',date:'AUG 14, 2026',desc:'A limited-run open-top reinterpretation of the Lamborghini Diablo, combining a naturally aspirated V12 with a manual gearbox.',power:'550 hp',speed:'Undisclosed',engine:'5.7L naturally aspirated V12',drive:'RWD · 6-speed manual',url:'https://www.providenceauto.co.uk/latest-news/monterey-car-week-2026-new-car-debuts',image:'assets/cars/eccentrica-v12-roadster.jpg',color:'#776249'},
 {brand:'MARC PHILIPP GEMBALLA',name:'Marsien GT',class:'Sports car',date:'AUG 14, 2026',desc:'A bespoke road-going performance car derived from the latest Porsche 911 Turbo S, revealed during Monterey Car Week.',power:'830 hp',speed:'Undisclosed',engine:'Twin-turbo flat-six · hybrid details undisclosed',drive:'AWD · details undisclosed',url:'https://www.roadandtrack.com/news/a73423950/2026-monterey-car-week-reveal-roundup/',image:'assets/cars/marc-philipp-gemballa-marsien-gt.jpg',color:'#6c6251'},
 {brand:'BRABUS',name:'Bodo Cabriolet',class:'Supercar',date:'AUG 14, 2026',desc:'An open-top, extensively reworked Aston Martin Vanquish-based special with Brabus performance upgrades.',power:'1,000 hp',speed:'Undisclosed',engine:'Twin-turbo V12',drive:'RWD · automatic',url:'https://www.roadandtrack.com/news/a73423950/2026-monterey-car-week-reveal-roundup/',image:'assets/cars/brabus-bodo-cabriolet.jpg',color:'#55585a'},
 {brand:'FERRARI',name:'CZ26',class:'Supercar',date:'AUG 13, 2026',desc:'A one-off Special Projects berlinetta developed with a US client and designed by Ferrari’s Flavio Manzoni-led studio. It keeps the SF90 Stradale’s plug-in hybrid powertrain beneath bespoke bodywork.',power:'1,000 CV',speedKmh:328,engine:'4.0L twin-turbo V8 · plug-in hybrid',drive:'AWD · 8-speed dual-clutch',url:'https://pressvp.com/ferrari-presents-the-new-cz26-model/',image:'assets/cars/ferrari-cz26.jpg',color:'#78504a'}
];
const grid=document.querySelector('#release-grid');const brands=document.querySelector('#brand-grid');
let speedUnit='mph';
function formatTopSpeed(car){if(!Number.isFinite(car.speedKmh))return car.speed||'Undisclosed';const value=speedUnit==='mph'?Math.round(car.speedKmh/1.609344):car.speedKmh;return `${value} ${speedUnit==='mph'?'mph':'km/h'}`;}
function render(filter='All'){
 const shown=cars.filter(c=>filter==='All'||c.class===filter).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
 grid.innerHTML=shown.map((c,i)=>`<article class="car-card">
  <div class="car-image ${c.image?'has-photo':''}" style="--car:${c.color}">${c.image?`<img class="car-photo" src="${c.image}" alt="${c.brand} ${c.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove();this.closest('.car-image').classList.remove('has-photo');this.closest('.car-card').querySelector('.car-card-open')?.remove()">`:''}<span class="class-tag">${c.class.toUpperCase()}</span><span class="car-num">${String(i+1).padStart(2,'0')}</span></div>
  ${c.image?`<button type="button" class="car-card-open" aria-label="View larger photo of ${c.brand} ${c.name}" data-car-index="${cars.indexOf(c)}"></button>`:''}
  <div class="car-info"><div class="car-brand">${c.brand}</div><h3 class="car-name">${c.name}</h3><div class="car-date">REVEALED · ${c.date}</div><p class="car-desc">${c.desc}</p><div class="specs"><div class="spec"><b>${c.power}</b><small>POWER</small></div><div class="spec"><b>${formatTopSpeed(c)}</b><small>TOP SPEED · ${speedUnit.toUpperCase()}</small></div><div class="spec"><b>${c.engine}</b><small>POWERTRAIN</small></div><div class="spec"><b>${c.drive}</b><small>DRIVETRAIN</small></div></div><a class="source" href="${c.url}" target="_blank" rel="noopener noreferrer">↗ SOURCE / SPECS</a></div>
 </article>`).join('');
 document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));
}
function renderBrands(){const groups=[...new Set(cars.map(c=>c.brand))];brands.innerHTML=groups.map(b=>`<div class="brand"><b>${b}</b><span>${cars.filter(c=>c.brand===b).length.toString().padStart(2,'0')} RELEASE${cars.filter(c=>c.brand===b).length===1?'':'S'} ↗</span></div>`).join('')}
document.querySelectorAll('.filter').forEach(x=>x.addEventListener('click',()=>render(x.dataset.filter)));render();renderBrands();
document.querySelectorAll('.unit-option').forEach(button=>button.addEventListener('click',()=>{speedUnit=button.dataset.speedUnit;document.querySelectorAll('.unit-option').forEach(option=>{const active=option===button;option.classList.toggle('active',active);option.setAttribute('aria-pressed',String(active));});render(document.querySelector('.filter.active')?.dataset.filter||'All');if(expandedCar)renderPhotoSpecs(expandedCar);}));
document.querySelector('#follow').addEventListener('click',()=>{const t=document.querySelector('#toast');t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)});

const photoDialog=document.querySelector('#photo-dialog');
const expandedPhoto=document.querySelector('#expanded-photo');
const photoCaption=document.querySelector('#photo-caption');
const photoDescription=document.querySelector('#photo-description');
const photoSpecs=document.querySelector('#photo-specs');
let expandedCar=null;
function renderPhotoSpecs(car){
 const specs=[['CLASS',car.class],['REVEALED',car.date],['POWER',car.power],['TOP SPEED',formatTopSpeed(car)],['POWERTRAIN',car.engine],['DRIVETRAIN',car.drive]];
 photoSpecs.replaceChildren(...specs.map(([label,value])=>{const item=document.createElement('div');item.className='photo-spec';const name=document.createElement('small');name.textContent=label;const detail=document.createElement('b');detail.textContent=value;item.append(name,detail);return item;}));
}
grid.addEventListener('click',event=>{const trigger=event.target.closest('.car-card-open');if(!trigger)return;const card=trigger.closest('.car-card');const photo=card.querySelector('.car-photo');const car=cars[Number(trigger.dataset.carIndex)];if(!photo||!car)return;expandedCar=car;expandedPhoto.src=photo.src;expandedPhoto.alt=photo.alt;photoCaption.textContent=`${car.brand} ${car.name}`;photoDescription.textContent=car.desc;renderPhotoSpecs(car);photoDialog.showModal();});
document.querySelector('#photo-close').addEventListener('click',()=>photoDialog.close());
photoDialog.addEventListener('click',event=>{if(event.target===photoDialog)photoDialog.close();});

const coverageGrid=document.querySelector('#coverage-grid');
const coverageStatus=document.querySelector('#coverage-status');
const trustedSources={
 'Top Gear':['topgear.com'],
 'Car and Driver':['caranddriver.com'],
 'Autocar':['autocar.co.uk'],
 'Road & Track':['roadandtrack.com']
};
function isTrustedLead(lead){
 if(!lead||typeof lead.title!=='string'||!lead.title.trim()||typeof lead.url!=='string'||typeof lead.source!=='string'||!Number.isFinite(Date.parse(lead.published)))return false;
 try{
  const url=new URL(lead.url);
  const domains=trustedSources[lead.source];
  return url.protocol==='https:'&&domains?.some(domain=>url.hostname===domain||url.hostname.endsWith(`.${domain}`));
 }catch{return false;}
}
function renderCoverage(leads){
 const recent=leads.filter(isTrustedLead).sort((a,b)=>Date.parse(b.published)-Date.parse(a.published)).slice(0,12);
 coverageGrid.replaceChildren();
 if(!recent.length){coverageStatus.textContent='No recent candidate stories yet. The weekly scan will add leads here when it finds them.';return;}
 coverageStatus.textContent=`${recent.length} recent candidate ${recent.length===1?'story':'stories'} · stories are leads for review`;
 for(const lead of recent){
  const card=document.createElement('article');card.className='coverage-card';
  const meta=document.createElement('div');meta.className='coverage-meta';
  const source=document.createElement('span');source.textContent=lead.source.toUpperCase();
  const date=document.createElement('time');date.dateTime=new Date(lead.published).toISOString();date.textContent=new Intl.DateTimeFormat(undefined,{year:'numeric',month:'short',day:'numeric'}).format(new Date(lead.published));
  meta.append(source,date);
  const link=document.createElement('a');link.href=lead.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent=lead.title;link.setAttribute('aria-label',`${lead.title} — opens ${lead.source} in a new tab`);
  const read=document.createElement('span');read.className='coverage-read';read.textContent='READ SOURCE ↗';
  card.append(meta,link,read);coverageGrid.append(card);
 }
}
fetch('data/discovery-queue.json',{cache:'no-store'})
 .then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.json();})
 .then(leads=>{if(!Array.isArray(leads))throw new Error('Unexpected feed format');renderCoverage(leads);})
 .catch(()=>{coverageStatus.textContent='Recent coverage could not be loaded. Please check back after the next scan.';});
