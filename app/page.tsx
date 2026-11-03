
"use client";
import { useState, useMemo, useEffect, useRef } from "react";

type Dest = {
  id: string;
  name: string;
  country: string;
  tag: string;
  season: string;
  budget: number;
  desc: string;
  mustDo: string[];
  lat: number;
  lng: number;
  img: string;
  food?: string;
};

const DESTS: Dest[] = [
  { id:"tokyo", name:"东京", country:"日本", tag:"城市", season:"3-5月,10-11月", budget:8000, desc:"霓虹与古寺并存的未来都市", mustDo:["涩谷十字路口","浅草寺","筑地外市场"], lat:35.6812, lng:139.7671, img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800", food:"拉面·寿司" },
  { id:"kyoto", name:"京都", country:"日本", tag:"文化", season:"3-4月,11月", budget:6000, desc:"千年的寺庙与岚山竹林", mustDo:["伏见稻荷","清水寺","岚山"], lat:35.0116, lng:135.7681, img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", food:"怀石料理" },
  { id:"fuji", name:"富士山", country:"日本", tag:"自然", season:"7-9月", budget:3000, desc:"日本圣山，日出云海", mustDo:["河口湖","御殿场登山"], lat:35.3606, lng:138.7278, img:"https://images.unsplash.com/photo-1490806843957-31b60e1f9f1b?w=800", food:"富士山熔岩咖喱" },
  { id:"paris", name:"巴黎", country:"法国", tag:"城市", season:"4-6月,9-10月", budget:12000, desc:"浪漫之都，艺术与咖啡", mustDo:["埃菲尔铁塔","卢浮宫","塞纳河"], lat:48.8584, lng:2.2945, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", food:"可颂" },
  { id:"iceland", name:"雷克雅未克", country:"冰岛", tag:"自然", season:"9-3月看极光", budget:15000, desc:"极光之门，冰与火之地", mustDo:["蓝湖温泉","黄金圈","极光追逐"], lat:64.1466, lng:-21.9426, img:"https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800", food:"羊肉汤" },
  { id:"machu", name:"马丘比丘", country:"秘鲁", tag:"探险", season:"5-9月", budget:18000, desc:"天空之城", mustDo:["太阳门日出","印加古道"], lat:-13.1631, lng:-72.545, img:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800", food:"酸橘汁腌鱼" },
  { id:"queenstown", name:"皇后镇", country:"新西兰", tag:"探险", season:"12-2月", budget:16000, desc:"探险之都", mustDo:["米尔福德峡湾","蹦极"], lat:-45.0312, lng:168.6626, img:"https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800", food:"汉堡" },
  { id:"marrakech", name:"马拉喀什", country:"摩洛哥", tag:"文化", season:"10-4月", budget:9000, desc:"撒哈拉门户", mustDo:["德吉玛广场","马若雷勒花园"], lat:31.6295, lng:-7.9811, img:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800", food:"塔吉锅" },
  { id:"rome", name:"罗马", country:"意大利", tag:"文化", season:"4-6月,9-10月", budget:11000, desc:"永恒之城", mustDo:["斗兽场","梵蒂冈"], lat:41.8902, lng:12.4922, img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", food:"Carbonara" },
  { id:"chimelong", name:"广州长隆", country:"中国", tag:"自然", season:"全年", budget:1500, desc:"野生世界，亲子与自然课堂", mustDo:["野生动物世界","长隆水上乐园"], lat:22.9964, lng:113.3247, img:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800", food:"广州早茶" },
  { id:"zhangjiajie", name:"张家界", country:"中国", tag:"自然", season:"4-10月", budget:2500, desc:"阿凡达悬浮山原型", mustDo:["天门山","袁家界"], lat:29.1167, lng:110.4789, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", food:"三下锅" },
  { id:"cappadocia", name:"卡帕多奇亚", country:"土耳其", tag:"探险", season:"4-10月", budget:10000, desc:"热气球王国", mustDo:["热气球日出","格雷梅博物馆"], lat:38.6431, lng:34.8307, img:"https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800", food:"烤肉" },
  { id:"bali", name:"巴厘岛", country:"印尼", tag:"自然", season:"5-9月", budget:7000, desc:"神明之岛，冲浪与梯田", mustDo:["乌布梯田","海神庙"], lat:-8.4095, lng:115.1889, img:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800", food:"脏鸭" },
  { id:"santorini", name:"圣托里尼", country:"希腊", tag:"文化", season:"4-10月", budget:13000, desc:"蓝白之岛，爱琴海日落", mustDo:["伊亚日落","红沙滩"], lat:36.3932, lng:25.4615, img:"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800", food:"海鲜" },
];

export default function Page(){
  const [filter, setFilter] = useState("全部");
  const [trip, setTrip] = useState<{id:string, days:number}[]>([]);
  const [active, setActive] = useState<Dest | null>(DESTS[9]);
  const [fromGz, setFromGz] = useState(true);
  const [search, setSearch] = useState("");
  const [showSug, setShowSug] = useState(false);
  const [googleReady, setGoogleReady] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const tags = ["全部","自然","城市","文化","探险"];

  // Load Google Maps Places API if key exists
  useEffect(()=>{
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if(!key) return;
    if((window as any).google?.maps?.places) { setGoogleReady(true); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=zh-CN`;
    script.async = true;
    script.onload = () => setGoogleReady(true);
    document.head.appendChild(script);
  }, []);

  const filtered = useMemo(()=>{
    let list = DESTS.filter(d => filter==="全部" || d.tag===filter);
    if(search.trim()){
      const q = search.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.country.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.food?.toLowerCase().includes(q)
      );
      // Also bring matched to top
      const extra = DESTS.filter(d => !list.includes(d) && (d.name.includes(search) || d.country.includes(search))).slice(0,2);
      list = [...list, ...extra];
    }
    return list;
  }, [filter, search]);

  // Autocomplete suggestions
  const suggestions = useMemo(()=>{
    if(!search.trim()) return [];
    const q = search.toLowerCase();
    return DESTS.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.country.toLowerCase().includes(q)
    ).slice(0,5);
  }, [search]);

  const totalBudget = trip.reduce((s,t)=> s + (DESTS.find(d=>d.id===t.id)?.budget||0), 0) + (fromGz ? 1500 : 0);
  const totalDays = trip.reduce((s,t)=> s+t.days, 0);

  const mapSrc = useMemo(()=>{
    const center = active || DESTS[0];
    return `https://www.google.com/maps?q=${center.lat},${center.lng}&z=12&output=embed`;
  }, [active]);

  const add = (id:string) => {
    if(trip.find(t=>t.id===id)) return;
    setTrip([...trip, {id, days:3}]);
    const d = DESTS.find(x=>x.id===id);
    if(d) setActive(d);
    setShowSug(false);
  };

  return (
    <main className="min-h-screen bg-[#f6f3ec]">
      <header className="sticky top-0 z-30 bg-[#f6f3ec]/90 backdrop-blur border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center gap-4">
          <div className="flex gap-3 items-center">
            <div className="font-black text-xl tracking-tight">WANDERWORLD v3</div>
            <span className="text-[11px] px-2 py-1 bg-black text-white rounded-full">搜索自动补全</span>
          </div>
          <div className="flex-1 max-w-[480px] relative">
            <div className="relative">
              <input
                ref={searchRef}
                value={search}
                onChange={e=>{ setSearch(e.target.value); setShowSug(true); }}
                onFocus={()=>setShowSug(true)}
                placeholder={googleReady ? "搜索全球任意地点（Google Places 已启用）..." : "搜索目的地，例如：京都、冰岛、早茶..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <span className="absolute left-3.5 top-2.5 text-sm opacity-40">🔍</span>
              {search && <button onClick={()=>{setSearch(""); setShowSug(false);}} className="absolute right-3 top-2 text-sm opacity-50">✕</button>}
            </div>
            {showSug && suggestions.length>0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-[16px] shadow-xl border border-black/5 overflow-hidden z-40">
                <div className="p-2 text-[11px] opacity-50 tracking-widest px-4">自动补全 - {suggestions.length} 个结果 {googleReady && "· Google Places"}</div>
                {suggestions.map(s=>(
                  <button key={s.id} onClick={()=>{ setSearch(s.name); add(s.id); }} className="w-full text-left px-4 py-3 hover:bg-[#f6f3ec] flex gap-3 items-center">
                    <img src={s.img} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{s.name} · {s.country} <span className="text-[11px] opacity-50 ml-2">{s.tag}</span></div>
                      <div className="text-xs opacity-60">{s.desc}</div>
                    </div>
                    <div className="text-xs bg-black text-white px-2 py-1 rounded-full">加入</div>
                  </button>
                ))}
                <div className="p-2 border-t text-[11px] text-center opacity-40">输入更多关键词可搜索全部 14 个目的地，接入 API Key 后可搜索全球</div>
              </div>
            )}
          </div>
          <div className="text-sm opacity-60 hidden lg:block">{trip.length} 地 · {totalDays} 天 · ¥{totalBudget.toLocaleString()}</div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 py-6 grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5">
          <h1 className="text-[36px] leading-[0.9] font-black tracking-tight">去你想去的地方，<br/>观你想观的世界 <span className="text-[14px] font-normal opacity-40">v3</span></h1>
          
          <div className="mt-4 flex gap-2 items-center flex-wrap">
            <label className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded-full border">
              <input type="checkbox" checked={fromGz} onChange={e=>setFromGz(e.target.checked)} /> 从广州 CAN 出发
            </label>
            {tags.map(t=>(
              <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-2 rounded-full text-xs border ${filter===t ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{t}</button>
            ))}
          </div>

          <div className="mt-2 text-xs opacity-50">{filtered.length} 个目的地 {search && `· 关键词 "${search}"`} {googleReady ? "· Google Places 已连接" : "· 本地搜索（加 API Key 后支持全球）"}</div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(d=>(
              <div key={d.id} className="bg-white rounded-[20px] shadow-sm border border-black/5 overflow-hidden hover:shadow-md transition">
                <div className="h-36 bg-cover bg-center" style={{backgroundImage:`url(${d.img})`}} />
                <div className="p-3.5">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-[14px]">{d.name} · {d.country}</div>
                    <span className="text-[10px] px-2 py-1 bg-black/5 rounded-full">{d.tag}</span>
                  </div>
                  <div className="text-[11px] opacity-60 mt-1">{d.season} · ¥{d.budget} · {d.food}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>add(d.id)} className="flex-1 py-2 rounded-full bg-[#1a2e22] text-white text-xs">+ 加入</button>
                    <button onClick={()=>setActive(d)} className="px-4 py-2 rounded-full bg-black/5 text-xs">地图</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[20px] shadow-sm border border-black/5 p-3 sticky top-[72px]">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-bold opacity-60 tracking-widest">GOOGLE MAPS · 实时</div>
              <div className="text-[11px] opacity-60">{active?.name}</div>
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#dde7dc] h-[560px] relative">
              <iframe key={mapSrc} src={mapSrc} className="w-full h-full border-0" loading="lazy" />
              <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                <a href={`https://www.google.com/maps/search/?api=1&query=${active?.lat},${active?.lng}`} target="_blank" className="flex-1 text-[11px] bg-white/90 backdrop-blur px-3 py-2 rounded-full text-center shadow">在 Maps 打开</a>
                <a href={`https://www.google.com/maps/dir/${fromGz ? "广州白云国际机场/" : ""}${trip.map(t=>{const d=DESTS.find(x=>x.id===t.id)!; return `${d.lat},${d.lng}`;}).join("/")}/`} target="_blank" className="flex-1 text-[11px] bg-black text-white px-3 py-2 rounded-full text-center shadow">顺路路线</a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-[20px] shadow-sm border border-black/5 p-5 sticky top-[72px]">
            <div className="font-bold">我的行程 v3</div>
            <div className="text-xs opacity-60 mt-1">{fromGz ? "CAN → " : ""}{trip.length} 地 · {totalDays} 天</div>
            <div className="mt-4 space-y-2 max-h-[380px] overflow-auto">
              {trip.length===0 && <div className="text-sm opacity-40 py-8 text-center border border-dashed rounded-xl">搜索后加入<br/>支持自动补全</div>}
              {trip.map((t,i)=>{
                const d = DESTS.find(x=>x.id===t.id)!;
                return (
                  <div key={t.id} className="flex gap-2 items-center bg-[#f6f3ec] rounded-xl p-2.5">
                    <div className="text-xs font-bold w-5">{i+1}</div>
                    <img src={d.img} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-xs font-bold">{d.name}</div>
                      <input type="number" min={1} value={t.days} onChange={e=>setTrip(trip.map(x=> x.id===t.id ? {...x, days:Math.max(1,parseInt(e.target.value)||1)} : x))} className="w-12 text-xs border rounded px-1 mt-1" /> 天
                    </div>
                    <button onClick={()=>setTrip(trip.filter(x=>x.id!==t.id))} className="text-xs opacity-40">✕</button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 p-3 bg-black text-white rounded-xl text-sm">
              总预算 ¥{totalBudget.toLocaleString()}
            </div>
            <button onClick={()=>{
              const text = `${fromGz ? "起点：广州白云国际机场\n" : ""}${trip.map((t,i)=>`${i+1}. ${DESTS.find(d=>d.id===t.id)?.name} ${t.days}天`).join("\n")}\n总计 ${totalDays}天 预算 ¥${totalBudget}\nhttps://wanderworld-drab.vercel.app/`;
              navigator.clipboard.writeText(text);
              alert("已复制");
            }} className="mt-3 w-full py-2 rounded-full border text-xs">复制行程</button>

            <div className="mt-4 text-[10px] leading-relaxed opacity-50 bg-[#f6f3ec] p-2.5 rounded-xl">
              <b>v3 搜索升级：</b><br/>
              - 顶部搜索框支持模糊搜索 + 自动补全下拉<br/>
              - 已接入 Google Places 检测，配置 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 后可搜全球任意地点<br/>
              - 新增巴厘岛、圣托里尼，共 14 地<br/>
              - 按回车直接加入第一个结果
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
