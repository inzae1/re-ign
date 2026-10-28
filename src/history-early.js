// Western calendar months where verifiable; ongoing background is explicitly labeled.
const kc=id=>'https://contents.history.go.kr/mobile/kc/view.do?levelId='+id;
const broad='https://contents.history.go.kr/mobile/ta/view.do?levelId=ta_h52_0040';
const reform='https://db.history.go.kr/id/hdsr_001_0010_0040_0020';
const e=(id,when,title,body,source,choices=null,extra={})=>({id,when,turn:(Number(when.slice(0,4))-1900)*4+Math.floor((Number(when.slice(5,7))-1)/3),type:choices?'choice':'news',title,body,source,...(choices?{choices}:{}),...extra});
const c=(name,delta,influence={},cost=0)=>({name,delta,influence,...(cost?{cost}:{}),desc:[...Object.entries(delta).map(([k,v])=>`${{gold:'국고',military:'군사력',stability:'민심'}[k]} ${v>0?'+':''}${v}`),...Object.entries(influence).map(([id,v])=>`${{japan:'일본',qing:'청',russia:'러시아',usa:'미국',britain:'영국',france:'프랑스'}[id]} 영향력 ${v>0?'+':''}${v}`)].join(' · ')});
export const earlyHistory=[
 e('joseon1870','1870.01','통상 수교 거부와 개항 압력','시작 배경: 흥선대원군 집권기 조선은 통상 수교를 거부하고 있습니다. 청과의 전통적 외교 질서, 일본과의 서계 갈등이 이어집니다.','https://contents.history.go.kr/front/ta/view.do?levelId=ta_m31_0100_0010'),
 e('japan-survey1870','1870.04','일본 외무성의 조선 정세 조사','일본 외무성 관원들이 조선의 외교·통상 사정을 조사한 보고서를 작성했습니다.','https://dokdo.mofa.go.kr/kor/pds/part05_view02.jsp'),
 e('shinmi1871','1871.06','신미양요','미국 함대와 조선군이 강화도에서 충돌했습니다. 실제 전투는 단기간에 끝났으며, 아래 선택은 해안 방어와 전후 대응의 가상 정책입니다.','https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/early-20th-century-conflicts/asiatic-fleet.html',[c('해안 진지를 보강한다',{gold:-6,military:3},{usa:-2},6),c('피해 수습에 집중한다',{military:-3,stability:2},{usa:3})]),
 e('cheokhwa1871','1871.09','척화비 건립','신미양요 뒤 조선은 통상 수교 거부의 뜻을 담은 척화비를 세웠습니다. 월은 게임의 후속 소식 배치이며 건립일을 뜻하지 않습니다.','https://contents.history.go.kr/mobile/ta/view.do?levelId=ta_m71_0080_0010_0020_0020'),
 e('gojong1873','1873.12','고종의 친정 시작','흥선대원군의 집권이 끝나고 고종이 직접 정사를 이끌기 시작했습니다. 이후 개항과 개혁의 방향을 둘러싼 논의가 달라집니다.','https://contents.history.go.kr/front/ta/view.do?levelId=ta_m31_0100_0010'),
 e('unyo1875','1875.09','운요호 사건','일본 군함 운요호와 강화도 포대가 충돌했습니다. 일본은 이 사건을 조약 체결을 압박하는 구실로 삼았습니다.','https://www.mofa.go.jp/mofaj/annai/honsho/shiryo/archives/9.html',[c('해안 방어를 정비한다',{gold:-7,military:4},{japan:-3},7),c('교섭 사절을 준비한다',{gold:-3,stability:2},{japan:4},3)]),
 e('ganghwa1876','1876.02','강화도조약','조선과 일본이 조일수호조규를 체결했습니다. 개항·영사재판권 등 불평등한 조건이 포함되었습니다. 아래 대응이 게임 속 일본 영향력을 바꿉니다.','https://worldjpn.net/documents/texts/pw/18760226.T1E.html',[c('불평등 조항 시정을 요구한다',{gold:-8,stability:-2},{japan:4},8),c('개항 재정을 확보한다',{gold:8},{japan:14})]),
 e('wonsan1880','1880.05','원산 개항','부산에 이어 원산이 개항하며 일본과의 통상과 해안 통제가 새로운 과제가 되었습니다.','https://contents.history.go.kr/front/ta/view.do?levelId=ta_m31_0100_0010'),
 e('tongni1880','1880.12','통리기무아문 설치','개화 정책을 담당할 통리기무아문이 설치되었습니다. 전통 관제와 별도로 군사·외교·통상 실무를 다루려는 시도였습니다.',reform,[c('군사·외교 실무를 정비한다',{gold:-7,military:3,stability:3},{qing:-3,japan:-3},7),c('기존 관제로 운영한다',{stability:1})]),
 e('byeolgi1881','1881.05','별기군과 군사 기술 도입','일본인 교관을 통한 신식 군사 훈련과 청에 대한 기술 연수가 추진됐습니다. 기술 도입과 외국 의존을 함께 관리해야 합니다.',reform,[c('교관과 신식 장비를 도입한다',{gold:-8,military:7},{japan:5},8),c('기존 군영 훈련을 보강한다',{gold:-5,military:3},{},5)]),
 e('us-treaty1882','1882.05','조미수호통상조약','조선은 미국과 최초의 대서양권 수호 통상 조약을 맺었습니다. 거중조정 조항은 자동적인 군사 방위 약속과 같지 않습니다.','https://contents.history.go.kr/front/hm/view.do?levelId=hm_115_0060',null,{relations:{usa:15},contact:'usa'}),
 e('imo1882','1882.07','임오군란','구식 군인들의 불만이 군란으로 번졌습니다. 청의 출병과 일본과의 후속 조약은 외국의 군사·정치적 개입을 확대했습니다.','https://museum.seoul.go.kr/www/board/NR_boardView.do?bbsCd=1026&seq=20130602122718266',[c('체불 군급을 지급하고 수습한다',{gold:-10,stability:7,military:-2},{qing:4,japan:3},10),c('청에 수습 지원을 요청한다',{stability:-5,military:-3},{qing:18,japan:6})]),
 e('qing-trade1882','1882.10','조청상민수륙무역장정','청과의 무역 장정은 전통적 종속 관계를 전제로 청 상인의 특권과 청의 경제적 개입을 확대했습니다.','https://contents.history.go.kr/mobile/kc/view.do?levelId=kc_i403200',null,{influence:{qing:7}}),
 e('incheon1883','1883.01','인천 개항','제물포가 개항하며 수도로 연결되는 통상 경로가 확대됐습니다.','https://contents.history.go.kr/front/ta/view.do?levelId=ta_m31_0100_0010'),
 e('school1883','1883.08','원산학사와 근대 교육','원산학사·동문학 등 근대 교육기관이 만들어졌습니다. 외국어와 새로운 실무 지식의 교육이 확산되기 시작했습니다.',reform,[c('교육 비용을 지원한다',{gold:-6,stability:5,military:2},{qing:-2,japan:-2},6),c('민간 운영을 지켜본다',{stability:1})]),
 e('news1883','1883.10','한성순보 창간','박문국에서 한성순보를 발간했습니다. 국내외 소식을 전달하는 근대 언론이 등장했습니다.',reform),
 e('europe-treaty1883','1883.11','영국·독일과 수교','조선은 영국 및 독일과 수호 통상 조약을 맺었습니다. 수교 확대는 외교 선택지를 늘렸지만 안전 보장을 뜻하지는 않았습니다.','https://diplomaticarchives.mofa.go.kr/new/show/type_list.jsp?divine=%EC%A1%B0%EC%95%BD',null,{relations:{britain:8,germany:8},contacts:['britain','germany']}),
 e('russia-treaty1884','1884.07','조러수호통상조약','조선과 러시아가 수호 통상 조약을 맺었습니다. 러시아가 정식 외교 관계의 상대가 됐습니다.',broad,null,{relations:{russia:10},contact:'russia'}),
 e('gapsin1884','1884.12','갑신정변','급진개화파가 정변을 일으켰으나 청군의 개입으로 실패했습니다. 독립·개혁과 외국 군사력 의존 문제가 격돌했습니다.',kc('kc_i400500'),[c('자주적 개혁 기반을 마련한다',{gold:-9,military:2,stability:4},{qing:4,japan:-3},9),c('외국군의 질서 회복에 의존한다',{military:-3,stability:-4},{qing:15,japan:4})]),
 e('geomundo1885','1885.04','거문도 점령과 톈진조약','영국이 거문도를 점령했습니다. 같은 달 청과 일본은 조선에서의 군대 철수와 향후 파병 통보를 약속했습니다.',broad,[c('철수를 요구하고 중립 외교를 편다',{gold:-6},{britain:3,qing:-3,japan:-3},6),c('교섭을 장기화한다',{stability:-3},{britain:10})]),
 e('france-treaty1886','1886.06','조불수호통상조약','조선은 프랑스와 수호 통상 조약을 맺었습니다. 병인양요 이후의 대립과 별도로 정식 외교 관계가 성립했습니다.',broad,null,{relations:{france:15},contact:'france'}),
 e('school1886','1886.09','육영공원 설치','외국어와 근대 학문을 가르치는 육영공원이 설치됐습니다.',reform),
 e('light1887','1887.03','경복궁 전등 점등','경복궁에 전등이 켜졌습니다. 새로운 기술의 도입은 운영비와 기술 인력 확보를 함께 요구했습니다.',reform),
 e('donghak1894','1894.02','고부 농민 봉기','고부의 수탈에 저항한 봉기가 동학농민운동으로 확대됐습니다. 아래 선택은 실제 사건을 배경으로 한 가상의 민생 대응입니다.','https://www.cdpr.go.kr/archive/?code=prd_0121r_001&menu=132&mode=view',[c('수탈을 조사하고 구휼한다',{gold:-9,stability:10},{},9),c('군사 진압을 확대한다',{military:-5,stability:-8},{qing:4})]),
 e('sino-japanese1894','1894.07','경복궁 점령과 청일전쟁','일본군이 경복궁을 점령하고 청일 양국이 전쟁에 들어갔습니다. 항만 방어전 선택은 실제 경복궁 점령과 구분되는 가상 대체역사 전개입니다.','https://jacar.go.jp/english/exhibition/jacarbl-fsjwar-e/about/p001.html',[{...c('자주 방어를 동원한다',{gold:-10,military:3},{japan:4},10),startWar:true,enemy:'japan'},{...c('외교적 교섭으로 버틴다',{military:-5,stability:-3},{japan:15,qing:-6})}]),
 e('gabo1894','1894.08','갑오개혁','군국기무처를 중심으로 신분제·행정·재정 제도 개혁이 추진됐습니다.',broad,[c('행정·재정 개혁을 추진한다',{gold:-8,stability:6,military:2},{qing:-6,japan:-3},8),c('개혁 속도를 늦춘다',{stability:-3},{japan:3})]),
 e('shimonoseki1895','1895.04','시모노세키조약','실제 청일전쟁에서 패한 청은 조선의 독립을 인정했습니다. 청의 전통적 우위가 약화되고 일본의 진출이 확대됐습니다.',broad,null,{influence:{qing:-15,japan:8},japanSettlement:true}),
 e('eulmi1895','1895.10','을미사변','일본 공사와 관련 세력에 의해 왕비가 시해됐습니다. 궁궐의 안전과 일본의 내정 개입이 중대한 위기에 놓였습니다.','https://www.heritage.go.kr/heri/html/HtmlPage.do?pg=%2Fpalaces%2FpalacesChronology.jsp',[c('진상을 조사하고 호위를 재편한다',{gold:-9,military:3,stability:-3},{japan:-5},9),c('외국 세력에 신변 보호를 의존한다',{stability:-6},{japan:8,russia:6})]),
 e('agwan1896','1896.02','아관파천','고종이 러시아 공사관으로 거처를 옮겼습니다. 신변 보호와 러시아의 정치·경제적 영향력 확대가 맞물렸습니다.','https://www.heritage.go.kr/heri/html/HtmlPage.do?pg=%2Fpalaces%2FpalacesChronology.jsp',[c('자체 호위와 환궁을 준비한다',{gold:-8,military:3},{japan:-3,russia:4},8),c('러시아의 보호에 의존한다',{stability:4},{japan:-7,russia:14})]),
 e('independent1896','1896.07','독립협회 창립','독립협회가 창립됐습니다. 자주 독립과 근대 개혁을 둘러싼 정치·사회 활동이 전개됐습니다.',broad,[c('공론과 자주 개혁을 지원한다',{gold:-6,stability:6},{qing:-3,japan:-3,russia:-3},6),c('정부 주도 개혁을 유지한다',{military:1})]),
 e('empire1897','1897.10','대한제국 선포','고종이 황제로 즉위하고 국호를 대한제국으로 정했습니다. 게임에서도 이 시점부터 국명이 조선에서 대한제국으로 바뀝니다.','https://www.heritage.go.kr/heri/html/HtmlPage.do?pg=%2Fpalaces%2FpalacesChronology.jsp'),
 e('assembly1898','1898.03','만민공동회와 자주 외교','독립협회와 시민들이 러시아의 이권 요구 등에 반대하며 공론을 형성했습니다.','https://contents.history.go.kr/front/nh/view.do?levelId=nh_041_0050_0020_0010',[c('이권 요구를 재검토한다',{gold:-6,stability:5},{russia:-8,japan:-3},6),c('이권을 주고 재원을 확보한다',{gold:10},{russia:8})]),
 e('tram1899','1899.05','한성 전차 운행','한성에서 전차 운행이 시작됐습니다. 도시 교통과 전력 기술이 일상에 들어왔습니다.',broad),
 e('qing-treaty1899','1899.09','한청통상조약','대한제국과 청이 대등한 근대적 외교 관계를 규정한 통상조약을 체결했습니다.','https://encykorea.aks.ac.kr/Article/E0014934',null,{relations:{qing:8},influence:{qing:-6}})
];
