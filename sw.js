// 홈 화면 앱(아이폰 등)에서 인터넷 없이도 열리도록 게임 파일을 저장해 둠
// 게임을 고쳐서 다시 올릴 때는 VER 숫자를 올려야 새 파일로 바뀜
const VER='cat-island-20';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
'./assets/island.png','./assets/cat_frames.png','./assets/cat_portraits.png','./assets/hero.png','./assets/hero_portrait.png','./assets/hood2.png','./assets/hood_portrait.png','./assets/leaf_blanket.png','./assets/stage_plain.png','./assets/stage_ribbon.png','./assets/work_outfit.png','./assets/bgm.mp3','./assets/rumor_calm.mp3','./assets/rumor_playful.mp3','./assets/rumor_mystery.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VER).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
// 저장해 둔 파일 먼저, 없으면 인터넷에서 받아서 저장 (글꼴 등)
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET')return;
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(VER).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit)));
});
