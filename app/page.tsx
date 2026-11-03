
"use client";
import { useState, useMemo } from "react";

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
  { id:"paris", name:"巴黎", country:"法国", tag:"城市", season:"4-6月,9-10月", budget:12000, desc:"浪漫之都，艺术与咖啡", mustDo:["埃菲尔铁塔","卢浮宫","塞纳河"], lat:48.8584, lng:2.2945, img:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800", food:"可颂·鹅肝" },
  { id:"iceland", name:"雷克雅未克", country:"冰岛", tag:"自然", season:"9-3月看极光", budget:15000, desc:"极光之门，冰与火之地", mustDo:["蓝湖温泉","黄金圈","极光追逐"], lat:64.1466, lng:-21.9426, img:"https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800", food:"羊肉汤" },
  { id:"machu", name:"马丘比丘", country:"秘鲁", tag:"探险", season:"5-9月", budget:18000, desc:"天空之城，印加遗迹", mustDo:["太阳门日出","印加古道"], lat:-13.1631, lng:-72.545, img:"https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800", food:"酸橘汁腌鱼" },
  { id:"queenstown", name:"皇后镇", country:"新西兰", tag:"探险", season:"12-2月", budget:16000, desc:"探险之都，蹦极发源地", mustDo:["米尔福德峡湾","蹦极"], lat:-45.0312, lng:168.6626, img:"https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=800", food:"汉堡·黑比诺" },
  { id:"marrakech", name:"马拉喀什", country:"摩洛哥", tag:"文化", season:"10-4月", budget:9000, desc:"撒哈拉门户，红色之城", mustDo:["德吉玛广场","马若雷勒花园"], lat:31.6295, lng:-7.9811, img:"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800", food:"塔吉锅" },
  { id:"rome", name:"罗马", country:"意大利", tag:"文化", season:"4-6月,9-10月", budget:11000, desc:"永恒之城，斗兽场与万神殿", mustDo:["斗兽场","梵蒂冈","特莱维喷泉"], lat:41.8902, lng:12.4922, img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800", food:"Carbonara" },
  { id:"chimelong", name:"广州长隆", country:"中国", tag:"自然", season:"全年", budget:1500, desc:"野生世界，亲子与自然课堂", mustDo:["野生动物世界","长隆水上乐园"], lat:22.9964, lng:113.3247, img:"https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800", food:"广州早茶" },
  { id:"zhangjiajie", name:"张家界", country:"中国", tag:"自然", season:"4-10月", budget:2500, desc:"阿凡达悬浮山原型", mustDo:["天门山","袁家界"], lat:29.1167, lng:110.4789, img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", food:"三下锅" },
  { id:"cappadocia", name:"卡帕多奇亚", country:"土耳其", tag:"探险", season:"4-10月", budget:10000, desc:"热气球王国，童话烟囱", mustDo:["热气球日出","格雷梅露天博物馆"], lat:38.6431, lng:34.8307, img:"https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=800", food:"土耳其烤肉" },
];

export default function Page(){
  const [filter, setFilter] = useState("全部");
  const [trip, setTrip] = useState<{id:string, days:number}[]>([]);
  const [active, setActive] = useState<Dest | null>(DESTS[9]);
  const [fromGz, setFromGz] = useState(true);
  const tags = ["全部","自然","城市","文化","探险"];

  const filtered = DESTS.filter(d => filter==="全部" || d.tag===filter);
  const totalBudget = trip.reduce((s,t)=> s + (DESTS.find(d=>d.id===t.id)?.budget||0), 0) + (fromGz ? 1500 : 0);
  const totalDays = trip.reduce((s,t)=> s+t.days, 0);

  const mapSrc = useMemo(()=>{
    const center = active || DESTS[0];
    // 使用无需Key的embed方式，支持标记
    return `https://www.google.com/maps?q=${center.lat},${center.lng}&z=12&output=embed`;
  }, [active]);

  const routeQuery = useMemo(()=>{
    if(trip.length===0) return "";
    const points = trip.map(t=>{
      const d = DESTS.find(x=>x.id===t.id)!;
      return `${d.lat},${d.lng}`;
    });
    const origin = fromGz ? "22.3089,113.9156" : points[0]; // 白云机场
    return `https://www.google.com/maps/dir/${origin}/${points.join("/")}/`;
  }, [trip, fromGz]);

  const add = (id:string) => {
    if(trip.find(t=>t.id===id)) return;
    setTrip([...trip, {id, days:3}]);
    const d = DESTS.find(x=>x.id===id);
    if(d) setActive(d);
  };

  return (
    <main className="min-h-screen bg-[#f6f3ec]">
      <header className="sticky top-0 z-20 bg-[#f6f3ec]/80 backdrop-blur border-b border-black/5">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="font-black text-xl tracking-tight">WANDERWORLD v2</div>
            <span className="text-[11px] px-2 py-1 bg-black text-white rounded-full">广州出发 · 真实地图</span>
          </div>
          <div className="text-sm opacity-60 hidden md:block">已探索 {trip.length} / 195 国 · {totalDays} 天 · ¥{totalBudget.toLocaleString()} · <a className="underline" href="https://wanderworld-drab.vercel.app" target="_blank">v1</a></div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 py-6 grid grid-cols-12 gap-5">
        {/* Left */}
        <div className="col-span-12 lg:col-span-5">
          <h1 className="text-[38px] leading-[0.9] font-black tracking-tight">去你想去的地方，<br/>观你想观的世界 <span className="text-[16px] font-normal opacity-50">v2</span></h1>
          <p className="mt-3 opacity-60 text-sm">基于 Google Maps 真实嵌入 · 广州白云机场 CAN 出发，智能顺路</p>

          <div className="mt-4 flex gap-2 items-center">
            <label className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded-full border">
              <input type="checkbox" checked={fromGz} onChange={e=>setFromGz(e.target.checked)} /> 从广州出发 (+¥1500 机票缓冲)
            </label>
          </div>

          <div className="mt-4 flex gap-2 flex-wrap">
            {tags.map(t=>(
              <button key={t} onClick={()=>setFilter(t)} className={`px-4 py-2 rounded-full text-sm border ${filter===t ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{t}</button>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(d=>(
              <div key={d.id} className="bg-white rounded-[20px] shadow-sm border border-black/5 overflow-hidden group hover:shadow-md transition">
                <div className="h-40 bg-cover bg-center" style={{backgroundImage:`url(${d.img})`}} />
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-[15px]">{d.name} · {d.country}</div>
                    <span className="text-[11px] px-2 py-1 bg-black/5 rounded-full">{d.tag}</span>
                  </div>
                  <div className="text-xs opacity-60 mt-1">{d.season} · 预算 ¥{d.budget} · {d.food}</div>
                  <div className="text-sm mt-2 opacity-80 line-clamp-2">{d.desc}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>add(d.id)} className="flex-1 py-2 rounded-full bg-[#1a2e22] text-white text-sm hover:bg-black">+ 加入行程</button>
                    <button onClick={()=>setActive(d)} className="px-4 py-2 rounded-full bg-black/5 text-sm">地图</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Real Map */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-[20px] shadow-sm border border-black/5 p-3 sticky top-[80px]">
            <div className="flex justify-between items-center mb-2">
              <div className="text-xs font-bold opacity-60 tracking-widest">GOOGLE MAPS · 真实地图</div>
              <div className="text-[11px] opacity-60">{active?.name || "选择目的地"}</div>
            </div>
            <div className="rounded-[16px] overflow-hidden bg-[#dde7dc] h-[560px] relative">
              <iframe key={mapSrc} src={mapSrc} className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <div className="absolute bottom-2 left-2 right-2 flex gap-2">
                <a href={`https://www.google.com/maps/search/?api=1&query=${active?.lat},${active?.lng}`} target="_blank" className="flex-1 text-[11px] bg-white/90 backdrop-blur px-3 py-2 rounded-full text-center shadow">在 Google Maps 打开</a>
                <a href={routeQuery || `https://www.google.com/maps/dir/广州白云国际机场/${active?.lat},${active?.lng}/`} target="_blank" className="flex-1 text-[11px] bg-black text-white px-3 py-2 rounded-full text-center shadow">生成顺路路线</a>
              </div>
            </div>
            <div className="mt-3 text-[11px] opacity-50 leading-relaxed">
              v2 已接入真实 Google Maps embed，无需 API Key 即可使用。后续可替换为 Maps JS API + Places API 实现搜索自动补全。当前标记：{active?.lat.toFixed(4)}, {active?.lng.toFixed(4)}
            </div>
          </div>
        </div>

        {/* Right - Trip */}
        <div className="col-span-12 lg:col-span-3">
          <div className="bg-white rounded-[20px] shadow-sm border border-black/5 p-5 sticky top-[80px]">
            <div className="font-bold">我的环球行程 v2</div>
            <div className="text-xs opacity-60 mt-1">{fromGz ? "CAN 白云 → " : ""}{trip.length} 个目的地 · {totalDays} 天</div>

            <div className="mt-4 space-y-3 max-h-[420px] overflow-auto pr-1">
              {trip.length===0 && <div className="text-sm opacity-50 py-10 text-center border border-dashed rounded-xl">还没有目的地<br/>从左侧加入吧<br/><span className="text-xs">默认已选中广州长隆</span></div>}
              {trip.map((t,i)=>{
                const d = DESTS.find(x=>x.id===t.id)!;
                return (
                  <div key={t.id} className="flex gap-3 items-center bg-[#f6f3ec] rounded-xl p-3">
                    <div className="text-xs font-bold w-6">{fromGz && i===0 ? "CAN" : `D${i+1}`}</div>
                    <img src={d.img} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="text-sm font-bold">{d.name}</div>
                      <div className="flex gap-1 items-center mt-1">
                        <input type="number" min={1} value={t.days} onChange={e=>{
                          const v = Math.max(1, parseInt(e.target.value)||1);
                          setTrip(trip.map(x=> x.id===t.id ? {...x, days:v} : x));
                        }} className="w-14 text-xs border rounded px-1 py-0.5" /> <span className="text-xs">天</span>
                      </div>
                    </div>
                    <button onClick={()=>setTrip(trip.filter(x=>x.id!==t.id))} className="text-xs opacity-50 hover:opacity-100">✕</button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 bg-black text-white rounded-xl text-sm">
              <div>总预算预估 ¥{totalBudget.toLocaleString()}</div>
              <div className="opacity-60 text-xs mt-1">{fromGz ? "含广州出发缓冲" : ""} · 不含机票浮动，建议+15%缓冲</div>
            </div>

            <a href={routeQuery || "#"} target="_blank" className={`mt-3 w-full py-2.5 rounded-full text-sm text-center block ${trip.length>0 ? "bg-[#1a2e22] text-white" : "bg-black/10 text-black/40 pointer-events-none"}`}>在 Google Maps 查看完整路线</a>

            <button onClick={()=>{
              const text = `${fromGz ? "起点：广州白云国际机场 CAN\n" : ""}${trip.map((t,i)=>`Day ${i+1}: ${DESTS.find(d=>d.id===t.id)?.name} (${t.days}天) - ${DESTS.find(d=>d.id===t.id)?.lat},${DESTS.find(d=>d.id===t.id)?.lng}`).join("\n")}\n总天数：${totalDays}天\n总预算：¥${totalBudget}\n生成工具：WanderWorld v2 - https://wanderworld-drab.vercel.app/`;
              navigator.clipboard.writeText(text);
              alert("已复制行程到剪贴板，含坐标可直接导入 Google My Maps");
            }} className="mt-2 w-full py-2.5 rounded-full bg-white border text-sm">复制行程+坐标</a>

            <div className="mt-4 p-2 bg-[#f6f3ec] rounded-lg text-[11px] leading-relaxed">
              <b>PR 更新：</b><br/>
              - 中间改为真实 Google Maps embed<br/>
              - 增加广州出发开关<br/>
              - 路线一键生成<br/>
              - 复制含坐标，支持导入 My Maps<br/>
              下一步可接 Places API 做搜索
            </div>
          </div>
        </div>
      </div>

      {/* Detail */}
      {active && (
        <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm flex justify-end" onClick={()=>setActive(DESTS[9])}>
          <div className="w-full max-w-[420px] bg-white h-full p-6 overflow-auto" onClick={e=>e.stopPropagation()}>
            <div className="h-56 rounded-[20px] bg-cover bg-center" style={{backgroundImage:`url(${active.img})`}} />
            <h2 className="text-2xl font-black mt-4">{active.name} · {active.country}</h2>
            <div className="text-sm opacity-60 mt-1">{active.tag} · {active.season} · {active.food}</div>
            <p className="mt-3 text-sm leading-relaxed">{active.desc}</p>
            <div className="mt-4">
              <div className="text-xs font-bold tracking-widest opacity-60">必做清单</div>
              <ul className="mt-2 space-y-2">
                {active.mustDo.map(m=> <li key={m} className="text-sm bg-[#f6f3ec] rounded-full px-3 py-1.5">• {m}</li>)}
              </ul>
            </div>
            <iframe src={`https://www.google.com/maps?q=${active.lat},${active.lng}&z=14&output=embed`} className="w-full h-48 rounded-xl mt-4 border-0" />
            <div className="mt-4 flex gap-2">
              <a target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${active.lat},${active.lng}`} className="flex-1 py-2.5 rounded-full bg-black text-white text-center text-sm">在 Google Maps 查看</a>
              <button onClick={()=>setActive(DESTS[9])} className="px-6 py-2.5 rounded-full bg-black/5 text-sm">关闭</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
