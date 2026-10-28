// COW NMC v7 (1900), with explicit Korean and Siamese source exceptions below.
// Index is a compressed game model, NOT troop counts, combat odds, or the CINC index.
export const militarySource='https://correlatesofwar.org/data-sets/national-material-capabilities/';
export const koreanMilitarySource='https://db.history.go.kr/diachronic/level.do?levelId=nh_042_0030_0010_0030_0010';
export const historicalMilitary={
 "korea": {
  "personnelThousands": 17,
  "spendingThousandsGBP": 164,
  "notes": [
   "COW 1900 병력 5천 대신 국사편찬위원회 1900년 7월 진위대 편제 약 1만7천을 보수적 기준으로 사용. 중앙군을 포함한 총 실병력 추계가 아님."
  ],
  "annualPersonnel": {
   "1900": 5,
   "1901": 17,
   "1902": 17,
   "1903": 17,
   "1904": 10,
   "1905": 17
  },
  "score": 26
 },
 "qing": {
  "personnelThousands": 1000,
  "spendingThousandsGBP": 12241,
  "notes": [],
  "annualPersonnel": {
   "1900": 1000,
   "1901": 1000,
   "1902": 1000,
   "1903": 1000,
   "1904": 1000,
   "1905": 1000,
   "1906": 1000,
   "1907": 1000,
   "1908": 1000,
   "1909": 1000,
   "1910": 1000
  },
  "score": 74
 },
 "russia": {
  "personnelThousands": 1142,
  "spendingThousandsGBP": 43104,
  "notes": [],
  "annualPersonnel": {
   "1900": 1142,
   "1901": 1142,
   "1902": 1160,
   "1903": 1160,
   "1904": 1160,
   "1905": 2365,
   "1906": 1236,
   "1907": 1234,
   "1908": 1381,
   "1909": 1434,
   "1910": 1380
  },
  "score": 88
 },
 "japan": {
  "personnelThousands": 182,
  "spendingThousandsGBP": 13311,
  "notes": [],
  "annualPersonnel": {
   "1900": 182,
   "1901": 206,
   "1902": 209,
   "1903": 214,
   "1904": 218,
   "1905": 250,
   "1906": 266,
   "1907": 262,
   "1908": 273,
   "1909": 273,
   "1910": 283
  },
  "score": 60
 },
 "britain": {
  "personnelThousands": 487,
  "spendingThousandsGBP": 119587,
  "notes": [],
  "annualPersonnel": {
   "1900": 487,
   "1901": 521,
   "1902": 489,
   "1903": 416,
   "1904": 409,
   "1905": 394,
   "1906": 384,
   "1907": 369,
   "1908": 364,
   "1909": 381,
   "1910": 372
  },
  "score": 90
 },
 "france": {
  "personnelThousands": 621,
  "spendingThousandsGBP": 40569,
  "notes": [],
  "annualPersonnel": {
   "1900": 621,
   "1901": 603,
   "1902": 610,
   "1903": 614,
   "1904": 596,
   "1905": 626,
   "1906": 635,
   "1907": 619,
   "1908": 619,
   "1909": 641,
   "1910": 652
  },
  "score": 81
 },
 "germany": {
  "personnelThousands": 624,
  "spendingThousandsGBP": 39681,
  "notes": [],
  "annualPersonnel": {
   "1900": 624,
   "1901": 630,
   "1902": 638,
   "1903": 636,
   "1904": 642,
   "1905": 648,
   "1906": 653,
   "1907": 658,
   "1908": 663,
   "1909": 667,
   "1910": 673
  },
  "score": 81
 },
 "usa": {
  "personnelThousands": 126,
  "spendingThousandsGBP": 41481,
  "notes": [],
  "annualPersonnel": {
   "1900": 126,
   "1901": 112,
   "1902": 111,
   "1903": 106,
   "1904": 110,
   "1905": 108,
   "1906": 112,
   "1907": 108,
   "1908": 129,
   "1909": 142,
   "1910": 139
  },
  "score": 67
 },
 "italy": {
  "personnelThousands": 262,
  "spendingThousandsGBP": 14112,
  "notes": [],
  "annualPersonnel": {
   "1900": 262,
   "1901": 262,
   "1902": 276,
   "1903": 270,
   "1904": 263,
   "1905": 266,
   "1906": 267,
   "1907": 219,
   "1908": 227,
   "1909": 251,
   "1910": 252
  },
  "score": 64
 },
 "austria": {
  "personnelThousands": 308,
  "spendingThousandsGBP": 16242,
  "notes": [],
  "annualPersonnel": {
   "1900": 308,
   "1901": 309,
   "1902": 309,
   "1903": 311,
   "1904": 312,
   "1905": 313,
   "1906": 314,
   "1907": 316,
   "1908": 314,
   "1909": 317,
   "1910": 315
  },
  "score": 66
 },
 "ottoman": {
  "personnelThousands": 273,
  "spendingThousandsGBP": 6650,
  "notes": [],
  "annualPersonnel": {
   "1900": 273,
   "1901": 275,
   "1902": 266,
   "1903": 266,
   "1904": 239,
   "1905": 298,
   "1906": 310,
   "1907": 321,
   "1908": 319,
   "1909": 312,
   "1910": 324
  },
  "score": 58
 },
 "siam": {
  "personnelThousands": 10,
  "spendingThousandsGBP": 254,
  "notes": [
   "1900 군사비 결측: 1901년 값을 대리 사용"
  ],
  "annualPersonnel": {
   "1900": 10,
   "1901": 4,
   "1902": 10,
   "1903": 18,
   "1904": 18,
   "1905": 18,
   "1906": 16,
   "1907": 26,
   "1908": 31,
   "1909": 31,
   "1910": 31
  },
  "score": 26
 },
 "brazil": {
  "personnelThousands": 21,
  "spendingThousandsGBP": 2723,
  "notes": [],
  "annualPersonnel": {
   "1900": 21,
   "1901": 22,
   "1902": 24,
   "1903": 24,
   "1904": 32,
   "1905": 19,
   "1906": 33,
   "1907": 22,
   "1908": 26,
   "1909": 29,
   "1910": 31
  },
  "score": 38
 }
};
export function militaryAnnualChange(id,year){const d=historicalMilitary[id],a=d?.annualPersonnel[year-1],b=d?.annualPersonnel[year];if(!a||!b)return 0;return Math.max(-3,Math.min(3,Math.round(Math.log(b/a)*5)));}
