
"use client";
import { useState } from "react";

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
};

const DESTS: Dest[] = [
  { id:"tokyo", name:"东京", country:"日本", tag:"城市", season:"3-5月,10-11月", budget:8000, desc:"霓虹与古寺并存的未来都市", mustDo:["涩谷十字路口","浅草寺","筑地外市场"], lat:35.68, lng:139.69, img:"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800" },
  { id:"kyoto", name:"京都", country:"日本", tag:"文化", season:"3-4月,11月", budget:6000, desc:"千年的寺庙与岚山竹林", mustDo:["伏见稻荷","清水寺","岚山"], lat:35.01, lng:135.67, img:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800" },
  { id:"fuji", name:"富士山", country:"日本", tag:"自然", season:"7-9月", budget:3000, desc:"日本圣山，日出云海", mustDo:["河口湖","御殿场登山"], lat:35.36, lng:138.72, img:"https://images.unsplash.com/photo-1490806843957-31b60e1f9f1b?w=800" },
  { id:"paris", name:"巴黎", country:"法国", tag:"城市", season:"4-6月,9-10月", budget:12000, desc:"浪漫之都，艺术与咖啡", mustDo:["埃菲尔铁塔","卢浮宫","塞纳河"], lat:48.85, lng:2.35, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800" },
  { id:"iceland", name:"雷克雅未克", country:"冰岛", tag:"自然", season:"9-3月看极光", budget:15000, desc:"极光之门，冰与火之地", mustDo:["蓝湖温泉","黄金圈","极光追逐"], lat:64.14, lng:-21.94, img:"https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800" },
  { id:"machu", name:"马丘比丘", country:"秘鲁", tag:"探险", season:"5-9月", budget:18000, desc:"天空之城，印加遗迹", mustDo:["太阳门日出","印加古道"], lat:-13.16, lng:-72.54, img:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800" },
  { id:"queenstown", name:"皇后镇", country:"新西兰", tag:"探险", season:"12-2月", budget:16000, desc:"探险之都，蹦极发源地", mustDo:["米尔福德峡湾","蹦极"], lat:-45.03, lng:168.66, img:"https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800" },
  { id:"marrakech", name:"马拉喀什", country:"摩洛哥", tag:"文化", season:"10-4月", budget:9000, desc:"撒哈拉门户，红色之城", mustDo:["德吉玛广场","马若雷勒花园"], lat:31.62, lng:-7.99, img:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800" },
  { id:"rome", name:"罗马", country:"意大利", tag:"文化", season:"4-6月,9-10月", budget:11000, desc:"永恒之城，斗兽场与万神殿", mustDo:["斗兽场","梵蒂冈","特莱维喷泉"], lat:41.90, lng:12.49, img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800" },
  { id:"chimelong", name:"广州长隆", country:"中国", tag:"自然", season:"全年", budget:1500, desc:"野生世界，亲子与自然课堂", mustDo:["野生动物世界","长隆水上乐园"], lat:22.99, lng:113.32, img:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800" },
  { id:"zhangjiajie", name:"张家界", country:"中国", tag:"自然", season:"4-10月", budget:2500, desc:"阿凡达悬浮山原型", mustDo:["天门山","袁家界"], lat:29.11, lng:110.47, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
  { id:"cappadocia", name:"卡帕多奇亚", country:"土耳其", tag:"探险", season:"4-10月", budget:10000, desc:"热气球王国，童话烟囱", mustDo:["热气球日出","格雷梅露天博物馆"], lat:38.64, lng:34.83, img:"https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800" },
];

export default function Page(){
  const [filter, setFilter] = useState("全部");
  const [trip, setTrip] = useState<{id:string, days:number}[]>([]);
  const [active, setActive] = useState<Dest | null>(null);
  const tags = ["全部","自然","城市","文化","探险","美食"];

  const filtered = DESTS.filter(d => filter==="全部" || d.tag===filter);
  const totalBudget = trip.reduce((s,t)=> s + (DESTS.find(d=>d.id===t.id)?.budget||0), 0);
  const totalDays = trip.reduce((s,t)=> s+t.days, 0);

  const add = (id:string) => {
    if(trip.find(t=>t.id===id)) return;
    setTrip([...trip, {id, days:3}]);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#f6f3ec]/80 backdrop-blur border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-black text-xl tracking-tight">WANDERWORLD · 游览世界</div>
          <div className="text-sm opacity-60">已探索 {trip.length} / 195 国 · {totalDays} 天 · ¥{totalBudget}</div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Left - Inspiration */}
        <div className="col-span-12 lg:col-span-5">
          <h1 className="text-[40px] leading-[0.9] font-black tracking-tight">去你想去的地方，<br/>观你想观的世界</h1>
          <p className="mt-4 opacity-60">基于 Google Maps 的环球漫游系统 · 广州出发，定义你的足迹</p>

          <div className="mt-6 flex gap-2 flex-wrap">
            {tags.map(t=>(
              <button key={t} onClick={()=>setFilter(t)} className={`px-4 py-2 rounded-full text-sm border ${filter===t ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{t}</button>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(d=>(
              <div key={d.id} className="card overflow-hidden group cursor-pointer">
                <div className="h-44 bg-cover bg-center" style={{backgroundImage:`url(${d.img})`}} />
                <div className="p-4">
                  <div className="flex justify-between">
                    <div className="font-bold">{d.name} · {d.country}</div>
                    <span className="text-[11px] px-2 py-1 bg-black/5 rounded-full">{d.tag}</span>
                  </div>
                  <div className="text-xs opacity-60 mt-1">{d.season} · 预算 ¥{d.budget}</div>
                  <div className="text-sm mt-2 opacity-80 line-clamp-2">{d.desc}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>add(d.id)} className="flex-1 py-2 rounded-full bg-[#1a2e22] text-white text-sm">+ 加入行程</button>
                    <button onClick={()=>setActive(d)} className="px-4 py-2 rounded-full bg-black/5 text-sm">详情</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Map */}
        <div className="col-span-12 lg:col-span-4">
          <div className="card p-3 sticky top-[80px]">
            <div className="text-xs font-bold opacity-60 tracking-widest mb-2">MAP · 实时足迹</div>
            <div className="rounded-[16px] overflow-hidden bg-[#dde7dc] h-[560px] relative">
              {/* Fake map with dots */}
              <div className="absolute inset-0 p-4">
                <div className="w-full h-full rounded-xl border border-black/10 bg-white/60 relative">
                  {DESTS.map(d=>(
                    <button key={d.id} title={d.name}
                      onClick={()=>setActive(d)}
                      className={`absolute w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 ${trip.find(t=>t.id===d.id) ? "bg-black ring-4 ring-black/20" : "bg-[#1a2e22]/60"}`}
                      style={{left:`${((d.lng+180)/360)*100}%`, top:`${((90-d.lat)/180)*100}%`}}
                    />
                  ))}
                  <div className="absolute bottom-2 left-2 text-[10px] bg-white px-2 py-1 rounded-full">基于 Google Maps 等工具 · 点击点查看</div>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a className="text-xs text-center py-2 rounded-full bg-white border" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${active?.lat||22.99},${active?.lng||113.32}`}>在 Google Maps 打开</a>
              <a className="text-xs text-center py-2 rounded-full bg-white border" target="_blank" href="https://www.google.com/maps">打开 Google My Maps</a>
            </div>
          </div>
        </div>

        {/* Right - Trip */}
        <div className="col-span-12 lg:col-span-3">
          <div className="card p-5 sticky top-[80px]">
            <div className="font-bold">我的环球行程</div>
            <div className="text-xs opacity-60 mt-1">{trip.length} 个目的地 · {totalDays} 天</div>

            <div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
              {trip.length===0 && <div className="text-sm opacity-50 py-10 text-center border border-dashed rounded-xl">还没有目的地<br/>从左侧加入吧</div>}
              {trip.map((t,i)=>{
                const d = DESTS.find(x=>x.id===t.id)!;
                return (
                  <div key={t.id} className="flex gap-3 items-center bg-[#f6f3ec] rounded-xl p-3">
                    <div className="text-xs font-bold w-6">D{i+1}</div>
                    <img src={d.img} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{d.name}</div>
                      <input type="number" min={1} value={t.days} onChange={e=>{
                        const v = Math.max(1, parseInt(e.target.value)||1);
                        setTrip(trip.map(x=> x.id===t.id ? {...x, days:v} : x));
                      }} className="w-16 text-xs mt-1 border rounded px-1" /> 天
                    </div>
                    <button onClick={()=>setTrip(trip.filter(x=>x.id!==t.id))} className="text-xs opacity-50">✕</button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-black text-white rounded-xl text-sm">
              <div>总预算预估 ¥{totalBudget.toLocaleString()}</div>
              <div className="opacity-60 text-xs mt-1">不含机票浮动，建议+15%缓冲</div>
            </div>

            <button onClick={()=>{
              const text = trip.map((t,i)=>`Day ${i+1}: ${DESTS.find(d=>d.id===t.id)?.name} (${t.days}天)`).join("\n");
              navigator.clipboard.writeText(text);
              alert("已复制行程到剪贴板");
            }} className="mt-3 w-full py-2.5 rounded-full bg-white border text-sm">复制行程摘要</button>

            <div className="mt-6 text-[11px] opacity-50 leading-relaxed">
              开发建议：接入 Google Maps Places API 做搜索，Directions API 算真实距离，Photo API 取实景。后期可加 Firebase 登录 + 多人协作。
            </div>
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {active && (
        <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-end" onClick={()=>setActive(null)}>
          <div className="w-full max-w-[420px] bg-white h-full p-6 overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className="h-56 rounded-[20px] bg-cover bg-center" style={{backgroundImage:`url(${active.img})`}} />
            <h2 className="text-2xl font-black mt-4">{active.name} · {active.country}</h2>
            <div className="text-sm opacity-60 mt-1">{active.tag} · {active.season}</div>
            <p className="mt-3 text-sm leading-relaxed">{active.desc}</p>
            <div className="mt-4">
              <div className="text-xs font-bold tracking-widest opacity-60">必做清单</div>
              <ul className="mt-2 space-y-2">
                {active.mustDo.map(m=> <li key={m} className="text-sm bg-[#f6f3ec] rounded-full px-3 py-1.5">• {m}</li>)}
              </ul>
            </div>
            <div className="mt-6 flex gap-2">
              <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`} className="flex-1 py-2.5 rounded-full bg-black text-white text-center text-sm">在 Google Maps 查看</a>
              <button onClick={()=>setActive(null)} className="px-6 py-2.5 rounded-full bg-black/5 text-sm">关闭</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
