// City coordinates locate gameplay targets; country outlines use the existing approximate map.
const city=(id,name,lon,lat,coastal=false)=>({id,name,geo:[lon,lat],coastal});
export const foreignCities={
 qing:[city('beijing','베이징',116.4,39.9),city('shenyang','성경',123.43,41.8),city('shanghai','상하이',121.47,31.23,true)],
 russia:[city('petersburg','상트페테르부르크',30.32,59.94,true),city('moscow','모스크바',37.62,55.75),city('vladivostok','블라디보스토크',131.89,43.12,true)],
 japan:[city('tokyo','도쿄',139.69,35.68,true),city('osaka','오사카',135.5,34.69,true),city('nagasaki','나가사키',129.87,32.75,true)],
 britain:[city('london','런던',-.12,51.51,true),city('liverpool','리버풀',-2.98,53.41,true),city('edinburgh','에든버러',-3.19,55.95)],
 france:[city('paris','파리',2.35,48.86),city('marseille','마르세유',5.37,43.3,true),city('lyon','리옹',4.84,45.76)],
 germany:[city('berlin','베를린',13.4,52.52),city('hamburg','함부르크',9.99,53.55,true),city('munich','뮌헨',11.58,48.14)],
 usa:[city('washington','워싱턴',-77.04,38.91),city('new-york','뉴욕',-74.01,40.71,true),city('san-francisco','샌프란시스코',-122.42,37.77,true)],
 italy:[city('rome','로마',12.5,41.9),city('naples','나폴리',14.27,40.85,true),city('milan','밀라노',9.19,45.46)],
 austria:[city('vienna','빈',16.37,48.21),city('budapest','부다페스트',19.04,47.5),city('trieste','트리에스테',13.77,45.65,true)],
 ottoman:[city('constantinople','콘스탄티노폴리스',28.98,41.01,true),city('smyrna','스미르나',27.14,38.42,true),city('damascus','다마스쿠스',36.29,33.51)],
 siam:[city('bangkok','방콕',100.5,13.75,true),city('chiang-mai','치앙마이',98.99,18.79),city('ayutthaya','아유타야',100.57,14.35)],
 brazil:[city('rio','리우데자네이루',-43.17,-22.91,true),city('sao-paulo','상파울루',-46.63,-23.55),city('salvador','사우바도르',-38.5,-12.97,true)]
};
export const findForeignCity=(country,id)=>foreignCities[country]?.find(c=>c.id===id);
export const raidOrders={raid:{name:'기습 공격',cost:28,enemyMilitary:8,enemyGold:6,ownMilitary:4},bombard:{name:'해군 포격',cost:32,enemyMilitary:5,enemyGold:12,ownMilitary:3}};
