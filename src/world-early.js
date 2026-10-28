const e=(id,when,region,title,body,source)=>({id,when,turn:(Number(when.slice(0,4))-1900)*4+Math.floor((Number(when.slice(5,7))-1)/3),region,title,body,source});
const ndl='https://www.ndl.go.jp/nikki/timeline/1870';
const jap='https://www.archives.go.jp/ayumi/table.html';
export const earlyWorld=[
 e('suez-background','1869-11','이집트','수에즈 운하 개통','1869년 개통된 운하로 유럽과 인도·동아시아 사이의 항로가 단축됐습니다. 1870년 시작 시점의 직전 세계 소식입니다.','https://www.nam.ac.uk/explore/egypt-and-sudan'),
 e('franco-prussian1870','1870-07','프랑스·독일','보불전쟁 발발','프랑스와 프로이센을 중심으로 한 독일 세력 사이에 전쟁이 시작됐습니다.','https://www.defense.gouv.fr/chemins-memoire/histoire-memoires/ressources-historiques/1870-1871-guerre-franco-prussienne/guerre-franco-0'),
 e('germany1871','1871-01','유럽','독일제국 성립','1월 18일 독일제국이 성립했습니다. 유럽의 세력 균형이 달라졌습니다.',ndl),
 e('haihan1871','1871-08','일본','폐번치현','일본 메이지 정부가 번을 폐지하고 현을 설치하며 중앙집권화를 추진했습니다.',jap),
 e('iwakura1871','1871-12','일본·서구','이와쿠라 사절단 출발','12월 23일 일본의 사절단이 서구 시찰과 조약 개정 교섭을 위해 출발했습니다.',ndl),
 e('tomioka1872','1872-10','일본','도미오카 제사장 개업','일본에서 관영 근대 제사장이 가동되기 시작했습니다.',ndl),
 e('conscription1873','1873-01','일본','징병령 제정','1월 10일 일본에서 징병령이 제정됐습니다. 군사 동원을 근대적 제도로 통합하는 과정이었습니다.',ndl),
 e('seikanron1873','1873-10','일본·조선','정한론 정변','조선에 대한 사절 파견과 대응을 둘러싼 대립 끝에 정한파 참의들이 사직했습니다.',ndl),
 e('suez-shares1875','1875-11','영국·이집트','영국의 수에즈 운하 주식 매입','영국 정부가 수에즈 운하 회사의 주식을 매입했습니다. 해상 교통로와 재정 이해관계의 결합이 확대됐습니다.','https://www.nam.ac.uk/explore/egypt-and-sudan'),
 e('satsuma1877','1877-02','일본','서남전쟁','일본에서 사쓰마 세력의 반란으로 내전이 시작됐습니다. 전쟁은 같은 해 9월까지 이어졌습니다.',ndl),
 e('zulu1879','1879-01','남아프리카','영국·줄루 전쟁','영국군이 줄루 왕국을 침공했습니다. 이산들와나의 패전 뒤 영국은 증원과 재침공을 추진했습니다.','https://www.nam.ac.uk/explore/zulu-war'),
 e('egypt1882','1882-09','영국·이집트','영국의 이집트 점령','영국군이 이집트를 점령했습니다. 운하와 재정 이권을 지킨다는 명분이 군사 개입으로 이어졌습니다.','https://www.nam.ac.uk/explore/egypt-and-sudan'),
 e('qing-france1884','1884-08','청·프랑스','청불전쟁','베트남 문제를 둘러싼 청과 프랑스의 전쟁이 진행됐습니다. 청은 조선 주둔 병력 일부를 다른 전선으로 이동시켰습니다.','https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i400500'),
 e('sinojapan-world1894','1894-08','청·일본','청일전쟁','조선에서의 영향력 경쟁이 청일전쟁으로 이어졌습니다. 이 세계사 소식과 게임 속 조선의 선택·교전 결과는 구분됩니다.','https://jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/about/p001.html'),
 e('shimonoseki-world1895','1895-04','청·일본','시모노세키조약','실제 역사에서 청일전쟁이 조약으로 마무리되며 동아시아 세력 관계가 크게 바뀌었습니다.','https://contents.history.go.kr/mobile/ta/view.do?levelId=ta_h52_0040'),
 e('spanish-american1898','1898-04','미국·스페인','미서전쟁','미국과 스페인이 전쟁에 들어갔습니다. 쿠바·푸에르토리코·필리핀을 둘러싼 국제 질서가 달라졌습니다.','https://guides.loc.gov/world-of-1898/chronology')
];
