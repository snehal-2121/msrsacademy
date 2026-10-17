import drAmbedkarHeroImg from '../assets/images/dr_ambedkar_hero.jpg';
import drAmbedkarPortraitImg from '../assets/images/dr_ambedkar_portrait_1790241034832.jpg';
import drAmbedkarWritingImg from '../assets/images/dr_ambedkar_writing_1790736804124.jpg';
import shivajiMaharajPortraitImg from '../assets/images/shivaji_maharaj_portrait_1790241051354.jpg';
import taporatnaSwamijiHeroImg from '../assets/images/taporatna_swamiji_hero.jpg';
import taporatnaSwamijiPortraitImg from '../assets/images/taporatna_swamiji_portrait_1790736816078.jpg';
import ambedkarShivajiPujaImg from '../assets/images/ambedkar_shivaji_puja.jpg';

export interface CirclePreset {
  id: string;
  nameMr: string;
  nameEn: string;
  quoteMr: string;
  quoteEn: string;
  badgeMr: string;
  badgeEn: string;
  imageSrc: string;
  descriptionMr: string;
  descriptionEn: string;
  themeGlow?: 'blue' | 'amber' | 'saffron';
  personality: 'ambedkar' | 'maharaj_shivaji' | 'maharaj_swamiji' | 'combined';
}

export const AMBEDKAR_CIRCLE_PRESETS: CirclePreset[] = [
  {
    id: 'ambedkar_default_hero',
    nameMr: 'भारतरत्न डॉ. बाबासाहेब आंबेडकर',
    nameEn: 'Bharat Ratna Dr. B. R. Ambedkar',
    quoteMr: '"शिका, संघटित व्हा आणि संघर्ष करा"',
    quoteEn: '"Educate, Agitate, Organise"',
    badgeMr: 'डॉ. बाबासाहेब आंबेडकर ग्रंथालय प्रेरणा',
    badgeEn: 'Inspiration · Dr. Babasaheb Ambedkar',
    imageSrc: drAmbedkarHeroImg,
    descriptionMr: 'होमपेज क्लासिक प्रेरणा पोर्ट्रेट (ग्रंथालय मूळ डिझाईन)',
    descriptionEn: 'Homepage Classic Inspiration Portrait (Library Original)',
    themeGlow: 'blue',
    personality: 'ambedkar',
  },
  {
    id: 'ambedkar_formal_portrait',
    nameMr: 'डॉ. बाबासाहेब आंबेडकर (अभिजात मुद्रा)',
    nameEn: 'Dr. B. R. Ambedkar (Dignified Portrait)',
    quoteMr: '"प्रज्ञा, शील आणि करुणेचे मूर्तिमंत रूप"',
    quoteEn: '"Embodiment of Wisdom, Character & Compassion"',
    badgeMr: 'ग्रंथालय प्रेरणा स्थान · महामानव',
    badgeEn: 'Inspiration · Great Visionary',
    imageSrc: drAmbedkarPortraitImg,
    descriptionMr: 'अभिजात सूट व चष्मा मुद्रा - ज्ञान व न्याय प्रतीक',
    descriptionEn: 'Formal Dignified Portrait - Symbol of Justice & Knowledge',
    themeGlow: 'blue',
    personality: 'ambedkar',
  },
  {
    id: 'ambedkar_constitution_writing',
    nameMr: 'डॉ. बाबासाहेब आंबेडकर (संविधान शिल्पकार)',
    nameEn: 'Dr. Babasaheb Ambedkar (Constitution Architect)',
    quoteMr: '"ज्ञान हीच खरी शक्ती आहे · ज्ञानपिपासू व्यक्तिमत्त्व"',
    quoteEn: '"Knowledge is Supreme · Architect of Modern India"',
    badgeMr: 'भारतीय राज्यघटना शिल्पकार',
    badgeEn: 'Architect of Indian Constitution',
    imageSrc: drAmbedkarWritingImg,
    descriptionMr: 'संविधान मसुदा लेखन व ग्रंथालयातील ज्ञानसाधना मुद्रा',
    descriptionEn: 'Historic Portrait of Drafting the Constitution',
    themeGlow: 'blue',
    personality: 'ambedkar',
  },
  {
    id: 'ambedkar_shivaji_tribute_left',
    nameMr: 'महामानव डॉ. आंबेडकर व छत्रपती शिवराय वंदना',
    nameEn: 'Tribute to Dr. Ambedkar & Chhatrapati Shivaji Maharaj',
    quoteMr: '"समता, न्याय आणि स्वातंत्र्याची अखंड प्रेरणा"',
    quoteEn: '"Eternal Inspiration of Equality, Justice & Freedom"',
    badgeMr: 'अकॅडमी प्रेरणा वंदना',
    badgeEn: 'Academy Reverence & Tribute',
    imageSrc: ambedkarShivajiPujaImg,
    descriptionMr: 'अकॅडमीतील डॉ. आंबेडकर व छत्रपती शिवाजी महाराज पूजन प्रतिमा',
    descriptionEn: 'Sacred Ceremony Portrait with Dr. Ambedkar & Shivaji Maharaj',
    themeGlow: 'blue',
    personality: 'combined',
  },
];

export const MAHARAJ_CIRCLE_PRESETS: CirclePreset[] = [
  {
    id: 'shivaji_maharaj_hero',
    nameMr: 'छत्रपती शिवाजी महाराज',
    nameEn: 'Chhatrapati Shivaji Maharaj',
    quoteMr: '"प्रौढ प्रताप पुरंदर, क्षत्रिय कुलावतंस, हिंदवी स्वराज्य संस्थापक"',
    quoteEn: '"Founder of Hindavi Swarajya · Eternal Symbol of Valour & Wisdom"',
    badgeMr: 'अकॅडमी प्रेरणास्थान · छत्रपती शिवराय',
    badgeEn: 'Eternal Inspiration · Chhatrapati Shivaji Maharaj',
    imageSrc: shivajiMaharajPortraitImg,
    descriptionMr: 'छत्रपती शिवाजी महाराज राजेशाही राजमुद्रा व पराक्रमी पोर्ट्रेट',
    descriptionEn: 'Royal Portrait of Chhatrapati Shivaji Maharaj with Sacred Aura',
    themeGlow: 'saffron',
    personality: 'maharaj_shivaji',
  },
  {
    id: 'swamiji_default_hero',
    nameMr: 'लिंगैक्य श्री. ष. ब्र. तपोरत्नं योगिराजेंद्र शिवाचार्य महास्वामीजी',
    nameEn: 'Taporatna Yogirajendra Shivacharya Mahaswamiji',
    quoteMr: '"ज्ञान आणि तपाचे पावन प्रतीक"',
    quoteEn: '"Sacred Symbol of Knowledge & Penance"',
    badgeMr: 'तपोरत्न अभ्यासिका प्रेरणा',
    badgeEn: 'Inspiration · Taporatna Abhyasika',
    imageSrc: taporatnaSwamijiHeroImg,
    descriptionMr: 'तपोरत्न अभ्यासिकेचे प्रेरणास्थान - परमपूज्य महास्वामीजी',
    descriptionEn: 'Inspirational Deity of Taporatna Abhyasika - Revered Swamiji',
    themeGlow: 'amber',
    personality: 'maharaj_swamiji',
  },
  {
    id: 'swamiji_sacred_portrait',
    nameMr: 'तपोरत्न महास्वामीजी (पुण्यस्मृती मुद्रा)',
    nameEn: 'Taporatna Mahaswamiji (Holy Blessing Portrait)',
    quoteMr: '"तपोनिधी, धर्मनिष्ठ व समाजभूषण · अखंड आशीर्वाद"',
    quoteEn: '"Embodiment of Penance, Dharma & Sacred Blessings"',
    badgeMr: 'तपोरत्न अभ्यासिका प्रेरणा',
    badgeEn: 'Inspiration · Taporatna Abhyasika',
    imageSrc: taporatnaSwamijiPortraitImg,
    descriptionMr: 'परमपूज्य तपोरत्न महास्वामीजींचे आशीर्वादमय पोर्ट्रेट',
    descriptionEn: 'Sacred Portrait of Divine Blessings & Study Penance',
    themeGlow: 'amber',
    personality: 'maharaj_swamiji',
  },
  {
    id: 'ambedkar_shivaji_tribute_right',
    nameMr: 'छत्रपती शिवराय व भारतरत्न डॉ. आंबेडकर स्मरण',
    nameEn: 'Chhatrapati Shivaji Maharaj & Dr. Ambedkar Remembrance',
    quoteMr: '"अखंड पराक्रम आणि राष्ट्रनिर्मितीचे मूर्तिमंत रूप"',
    quoteEn: '"Living Symbols of Valour, Character & Nation Building"',
    badgeMr: 'अकॅडमी प्रेरणा वंदना',
    badgeEn: 'Academy Reverence & Tribute',
    imageSrc: ambedkarShivajiPujaImg,
    descriptionMr: 'अकॅडमीतील छत्रपती शिवराय व डॉ. आंबेडकर संयुक्त वंदना दालन',
    descriptionEn: 'Sacred Ceremony Portrait with Shivaji Maharaj & Dr. Ambedkar',
    themeGlow: 'saffron',
    personality: 'combined',
  },
];
