// ===== PROVIDER CONFIG =====
const PROVIDERS={
  openai:{name:"OpenAI",base:"https://api.openai.com/v1",model:"gpt-4o-mini",fmt:"openai"},
  openrouter:{name:"OpenRouter",base:"https://openrouter.ai/api/v1",model:"google/gemini-2.0-flash-001",fmt:"openai"},
  groq:{name:"Groq",base:"https://api.groq.com/openai/v1",model:"llama-3.3-70b-versatile",fmt:"openai"},
  nvidia:{name:"Nvidia NIM",base:"https://integrate.api.nvidia.com/v1",model:"meta/llama-3.1-70b-instruct",fmt:"openai"},
  gemini:{name:"Google Gemini",base:"https://generativelanguage.googleapis.com/v1beta",model:"gemini-2.0-flash",fmt:"gemini"},
  claude:{name:"Anthropic Claude",base:"https://api.anthropic.com/v1",model:"claude-sonnet-4-20250514",fmt:"anthropic"},
  custom:{name:"Custom",base:"",model:"",fmt:"openai"}
};

// ===== CATEGORY KEYWORDS (Tier 1 ML) =====
const CATS={
  "Music":{icon:"🎵",color:"#a855f7",kw:{"song":4,"music":4,"official video":5,"official audio":5,"lyrics":4,"album":3,"remix":4,"cover song":3,"acoustic":3,"ft.":3,"feat":3,"music video":5,"karaoke":3,"instrumental":3,"soundtrack":3,"ost":3,"concert":3,"lofi":3,"lo-fi":3,"playlist":2,"dj":3,"beat":2,"ep":2,"mv":3}},
  "Gaming":{icon:"🎮",color:"#22c55e",kw:{"gameplay":5,"walkthrough":5,"playthrough":5,"let's play":5,"gaming":4,"game":2,"speedrun":5,"boss fight":4,"fortnite":3,"minecraft":3,"gta":3,"valorant":3,"apex":3,"warzone":3,"ps5":3,"xbox":3,"nintendo":3,"esports":4,"ranked":3,"pvp":3,"rpg":3,"mmorpg":4}},
  "Education":{icon:"📚",color:"#3b82f6",kw:{"tutorial":5,"learn":4,"course":5,"lesson":4,"explained":4,"lecture":5,"class":3,"education":4,"crash course":5,"introduction":3,"programming":3,"coding":3,"python":3,"javascript":3,"math":3,"physics":3,"chemistry":3,"biology":3,"history":3,"certification":3}},
  "Tech":{icon:"💻",color:"#06b6d4",kw:{"review":4,"unboxing":5,"specs":4,"benchmark":5,"iphone":3,"samsung":3,"android":3,"apple":3,"laptop":3,"gpu":3,"cpu":3,"gadget":4,"hands on":4,"comparison":3,"versus":3,"vs":2,"tech":3,"software":3,"hardware":3,"setup":2,"teardown":4}},
  "Entertainment":{icon:"🎬",color:"#f59e0b",kw:{"trailer":4,"movie":3,"film":3,"scene":3,"clip":2,"reaction":4,"react":3,"compilation":3,"best moments":4,"funny":3,"highlights":3,"top 10":3,"ranking":3,"tier list":4}},
  "Comedy":{icon:"😂",color:"#f97316",kw:{"comedy":5,"funny":4,"prank":5,"meme":4,"parody":5,"skit":4,"stand up":5,"standup":5,"roast":4,"blooper":4,"fail":3,"hilarious":4,"jokes":4,"sketch":4}},
  "News":{icon:"📰",color:"#ef4444",kw:{"breaking":4,"news":4,"politics":4,"election":4,"debate":4,"interview":3,"report":3,"analysis":3,"update":2,"latest":2,"press":3,"government":3,"policy":3}},
  "Sports":{icon:"⚽",color:"#10b981",kw:{"goal":3,"match":3,"highlights":3,"football":4,"soccer":4,"basketball":4,"nba":4,"nfl":4,"cricket":4,"tennis":4,"champion":3,"world cup":5,"olympics":4,"workout":3,"athlete":3,"score":2,"league":3}},
  "Lifestyle":{icon:"✨",color:"#ec4899",kw:{"vlog":5,"day in":4,"routine":4,"haul":4,"grwm":5,"get ready":4,"room tour":4,"lifestyle":4,"travel":3,"vacation":3,"house tour":4,"apartment":3,"morning routine":5,"night routine":5}},
  "Science":{icon:"🔬",color:"#8b5cf6",kw:{"science":4,"experiment":4,"space":3,"nasa":4,"quantum":4,"research":3,"discovery":4,"nature":3,"documentary":3,"planet":3,"universe":3,"evolution":3,"climate":3,"biology":3,"astronomy":4}},
  "Cooking":{icon:"🍳",color:"#f59e0b",kw:{"recipe":5,"cook":4,"cooking":4,"bake":4,"baking":4,"chef":3,"kitchen":3,"food":3,"meal":3,"dish":3,"ingredient":3,"restaurant":3,"mukbang":5,"eating":3,"taste test":4,"gordon ramsay":4}},
  "How-To":{icon:"🔧",color:"#14b8a6",kw:{"how to":5,"diy":5,"fix":3,"repair":4,"build":3,"make":2,"install":4,"setup":3,"guide":3,"step by step":5,"tips":3,"tricks":3,"hack":3,"life hack":4}},
  "Podcast":{icon:"🎙️",color:"#6366f1",kw:{"podcast":5,"episode":3,"ep.":2,"interview":3,"conversation":3,"discussion":3,"talk":2,"q&a":4,"ama":4,"guest":2,"host":2,"panel":3}},
  "Fitness":{icon:"💪",color:"#ef4444",kw:{"workout":5,"exercise":5,"fitness":4,"gym":4,"training":3,"cardio":4,"yoga":4,"pilates":4,"weight loss":4,"diet":3,"muscle":3,"bodybuilding":4,"hiit":5,"stretching":3,"abs":3}},
  "Business":{icon:"💼",color:"#0ea5e9",kw:{"business":4,"startup":4,"entrepreneur":4,"investing":4,"stocks":4,"crypto":4,"bitcoin":4,"money":3,"finance":4,"marketing":4,"passive income":5,"side hustle":4,"real estate":4,"trading":4}},
  "Other":{icon:"📌",color:"#64748b",kw:{}}
};

let CAT_NAMES = Object.keys(CATS).filter(c => c !== 'Other');
const YT_REGEX=/(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:[^&\s]*&)*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;
let allResults=[];

// Dynamic Category Management
function renderDynCategories() {
  const container = document.getElementById('dynamicCatTags');
  if(!container) return;
  container.innerHTML = CAT_NAMES.map(cat => 
    `<span style="display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:rgba(124,92,252,.15);border:1px solid rgba(124,92,252,.3);border-radius:20px;font-size:.75rem;color:var(--text)">
      ${cat}
      <span style="cursor:pointer;opacity:0.6;font-weight:bold" onclick="removeDynCategory('${cat.replace(/'/g, "\\'")}')">&times;</span>
    </span>`
  ).join('');
}

function addDynCategory() {
  const input = document.getElementById('newCatInput');
  if(!input) return;
  const val = input.value.trim().replace(/[^a-zA-Z0-9 &\-]/g,'');
  if(!val) return;
  const words = val.split(/\s+/);
  if(words.length > 5) {
    showToast('Category name limited to 5 words max', 'error');
    return;
  }
  const cleanVal = words.join(' ');
  if(!CAT_NAMES.find(c => c.toLowerCase() === cleanVal.toLowerCase())) {
    CAT_NAMES.push(cleanVal);
    renderDynCategories();
  }
  input.value = '';
}

function removeDynCategory(cat) {
  CAT_NAMES = CAT_NAMES.filter(c => c !== cat);
  renderDynCategories();
}

window.addEventListener('DOMContentLoaded', () => {
  renderDynCategories();
});

// ===== UI BINDINGS =====
const $=id=>document.getElementById(id);
const providerSel=$('provider'), modelIn=$('model'), baseUrlIn=$('baseUrl'),
      baseUrlGrp=$('baseUrlGroup'), apiKeyIn=$('apiKey'),
      thresholdIn=$('threshold'), thresholdVal=$('thresholdVal'),
      useLLMCb=$('useLLM'), uploadZone=$('uploadZone'), fileInput=$('fileInput'),
      progressSection=$('progressSection'), progressBar=$('progressBar'),
      progressTitle=$('progressTitle'), progressText=$('progressText'),
      resultsSection=$('resultsSection'), statsGrid=$('statsGrid'),
      catChart=$('catChart'), resultsList=$('resultsList'), toast=$('toast');

// CORS-affected providers when running from file://
const CORS_RESTRICTED=['nvidia'];
function updateProviderUI(){
  const prov=providerSel.value;
  const p=PROVIDERS[prov];
  modelIn.placeholder=p.model||'Enter model name';
  baseUrlGrp.style.display=prov==='custom'?'block':'none';
  document.getElementById('corsWarn').classList.toggle('show',CORS_RESTRICTED.includes(prov));
}
providerSel.addEventListener('change',updateProviderUI);
thresholdIn.addEventListener('input',()=>thresholdVal.textContent=thresholdIn.value);

function toggleConfig(){
  const body=document.getElementById('configBody');
  const arrow=document.getElementById('configArrow');
  const collapsed=body.classList.toggle('collapsed');
  arrow.style.transform=collapsed?'rotate(-90deg)':'';
}

// Upload handlers — input overlays the zone directly, no programmatic .click() needed
fileInput.addEventListener('change',e=>{if(e.target.files[0])handleFile(e.target.files[0])});
uploadZone.addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation();uploadZone.classList.add('drag')});
uploadZone.addEventListener('dragleave',e=>{if(!uploadZone.contains(e.relatedTarget))uploadZone.classList.remove('drag')});
uploadZone.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();uploadZone.classList.remove('drag');if(e.dataTransfer.files[0])handleFile(e.dataTransfer.files[0])});

// ===== TOAST =====
function showToast(msg,type='success'){
  toast.textContent=msg;toast.className='toast toast-'+type+' show';
  setTimeout(()=>toast.classList.remove('show'),3000);
}

// Loading overlay utilities
function showLoading(){document.getElementById('loadingOverlay').classList.add('show');}
function hideLoading(){document.getElementById('loadingOverlay').classList.remove('show');}

// ===== STEP 1: EXTRACT LINKS =====
function extractLinks(text){
  const seen=new Set(), links=[];
  let m;
  const rx=new RegExp(YT_REGEX.source,'g');
  while((m=rx.exec(text))!==null){
    const vid=m[1], url=m[0].startsWith('http')?m[0]:'https://'+m[0];
    if(!seen.has(vid)){seen.add(vid);links.push({url,videoId:vid,fullMatch:m[0]})}
  }
  return links;
}

// ===== STEP 2: FETCH TITLE (thumbnail-first validation) =====
async function checkThumb(videoId){
  return new Promise(resolve=>{
    const img=new Image();
    img.onload=()=>resolve(true);
    img.onerror=()=>resolve(false);
    img.src=`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
    setTimeout(()=>resolve(false),4000);
  });
}

async function tryFetchTitle(videoId){
  const canonical=`https://www.youtube.com/watch?v=${videoId}`;
  const enc=encodeURIComponent(canonical);
  const endpoints=[`https://noembed.com/embed?url=${enc}`,`https://www.youtube.com/oembed?url=${enc}&format=json`];
  let lastError='',apiNotFound=false;
  for(const ep of endpoints){
    try{
      const r=await fetch(ep);
      if(r.ok){
        const d=await r.json();
        if(d.title&&!d.error)return{ok:true,title:d.title,author:d.author_name||'',thumb:d.thumbnail_url||'',source:ep};
        if(d.error){apiNotFound=true;lastError=d.error}
      }else{
        if([401,403,404].includes(r.status))apiNotFound=true;
        lastError=`HTTP ${r.status}`;
      }
    }catch(e){lastError=e.message}
  }
  return{ok:false,apiNotFound,error:lastError};
}

async function fetchTitle(videoId){
  // Phase 1: quick thumbnail check to determine if video is alive
  const thumbUrl=`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
  const thumbOk=await checkThumb(videoId);

  // Phase 2: try title fetch (2 attempts regardless of thumb status)
  for(let attempt=0;attempt<2;attempt++){
    const res=await tryFetchTitle(videoId);
    if(res.ok)return{title:res.title,author:res.author,thumb:res.thumb||thumbUrl,source:res.source,status:'ok'};
    
    // API explicit 404/401
    if(res.apiNotFound) {
      // If thumbnail is valid, it's age restricted or noembed rejected it. It exists!
      if(thumbOk) return{title:null,author:'',thumb:thumbUrl,source:'failed',error:'Title unavailable (age-restricted or API block)',status:'title_missing'};
      // Otherwise, definitely removed
      return{title:null,author:'',thumb:'',source:'failed',error:res.error,status:'removed'};
    }
    if(attempt<1)await new Promise(r=>setTimeout(r,800));
  }

  // Phase 3: if thumbnail alive, do 2 extra title retries (video exists, network issue)
  if(thumbOk){
    for(let attempt=0;attempt<2;attempt++){
      await new Promise(r=>setTimeout(r,1000*(attempt+1)));
      const res=await tryFetchTitle(videoId);
      if(res.ok)return{title:res.title,author:res.author,thumb:res.thumb||thumbUrl,source:res.source,status:'ok'};
      if(res.apiNotFound) return{title:null,author:'',thumb:thumbUrl,source:'failed',error:'Title unavailable (age-restricted or API block)',status:'title_missing'};
    }
    // Thumbnail alive but title unreachable after all retries
    return{title:null,author:'',thumb:thumbUrl,source:'failed',error:'Title unavailable after retries (video exists)',status:'title_missing'};
  }

  // Thumbnail failed + title failed → removed/private
  return{title:null,author:'',thumb:'',source:'failed',error:'Title and thumbnail both unavailable',status:'removed'};
}

// ===== STEP 3: ML CATEGORIZATION (Tier 1) =====
function categorizeML(title){
  const lower=title.toLowerCase();
  const words=lower.split(/\s+/).filter(Boolean);
  const totalWords=words.length;
  const scores={};
  for(const[cat,cfg]of Object.entries(CATS)){
    if (cat !== 'Other' && !CAT_NAMES.includes(cat)) continue; // Skip categories removed by user
    let tw=0;const matched=[];
    for(const[kw,w]of Object.entries(cfg.kw)){
      // Use word boundary regex for more precise matching
      const pattern=new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'i');
      if(pattern.test(lower)){
        tw+=w;matched.push({keyword:kw,weight:w});
      }
    }
    // Confidence via tanh normalization
    let conf=Math.tanh(tw/(3+totalWords*0.3))*0.95;
    // Short title penalty
    if(totalWords<=1)conf*=0.3;
    else if(totalWords<=2)conf*=0.55;
    else if(totalWords<=3)conf*=0.8;
    scores[cat]={confidence:Math.round(conf*1000)/1000,matched};
  }
  const sorted=Object.entries(scores).sort((a,b)=>b[1].confidence-a[1].confidence);
  const best=sorted[0];
  return{category:best[0],confidence:best[1].confidence,matched:best[1].matched,allScores:scores,sorted};
}

// ===== STEP 4: LLM CATEGORIZATION (Tier 2) =====
let dynamicCategories=[]; // populated by discovery phase

function buildBatchSystemPrompt(extraCats=[]){
  const baseCats = CAT_NAMES.join(', ');
  const extra = extraCats.length ? extraCats.join(', ') : '';
  const allList = extraCats.length ? `${baseCats}, ${extra}` : baseCats;
  
  return `You are a YouTube video categorizer. You will be given a numbered list of video titles.
Categorize EVERY SINGLE title in the list. Do not skip any. Do not combine them.
You MUST output ONLY a valid JSON array of objects.
Each object must have exactly two keys: "index" (the integer number from the input) and "category" (the category string).

You MUST exclusively use a category from the following allowed list:
[ ${allList} ]

PRIMARY CATEGORIES: ${baseCats}
${extra ? `SUPPLEMENTAL CATEGORIES: ${extra}\n\nCRITICAL INSTRUCTION: Always prefer a PRIMARY category if it reasonably describes the video. Only use a SUPPLEMENTAL category if the video absolutely does not fit any primary category.` : ''}

Example Input:
1. "Learn Python in 10 Minutes"
2. "iPhone 15 Pro Review"

Example Output:
[
  {"index": 1, "category": "Education"},
  {"index": 2, "category": "Tech"}
]

CRITICAL:
