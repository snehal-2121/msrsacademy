import React, { useState } from 'react';
import { Plane, Droplet, Clock, ShieldCheck, Sprout, Sparkles, Check, ArrowLeft, Calculator, PhoneCall, CheckCircle2, ChevronRight } from 'lucide-react';
import { DRONE_AGRICULTURE_INFO, ACADEMY_INFO } from '../data/academyData';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';
import { EditableImage } from '../components/EditableImage';

interface AgriculturePageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const AgriculturePage: React.FC<AgriculturePageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const dronePujaImg = getPhotoSrc('drone_puja');
  const droneFamilyImg = getPhotoSrc('drone_family');
  const droneStudentsImg = getPhotoSrc('drone_students_group');

  const [acreage, setAcreage] = useState<number>(3);
  const [selectedCrop, setSelectedCrop] = useState<string>('Sugarcane (ऊस)');

  const crops = [
    'Sugarcane (ऊस)',
    'Cotton (कापूस)',
    'Soybean (सोयाबीन)',
    'Onion (कांदा)',
    'Pomegranate (डाळिंब)',
    'Grapes (द्राक्षे)',
    'Wheat (गहू)',
    'Tur / Dal (तूर)',
    'Maize (मका)',
    'Vegetables (भाजीपाला)'
  ];

  // Calculations based on exact user metrics:
  // 7 minutes / acre, 10 litres water / acre
  // Traditional is ~4 hours (240 mins) and ~180 litres / acre
  const droneMinutes = acreage * 7;
  const manualMinutes = acreage * 240;
  const hoursSaved = ((manualMinutes - droneMinutes) / 60).toFixed(1);
  const droneWaterLtr = acreage * 10;
  const manualWaterLtr = acreage * 180;
  const waterSavedLtr = manualWaterLtr - droneWaterLtr;

  const comparisonData = [
    {
      feature: 'फवारणी वेळ (Time Required)',
      traditional: '४ ते ५ तास प्रति एकर (खूप संथ)',
      drone: 'अवघ्या ७ मिनिटांत १ एकर फवारणी',
      advantage: '९५% वेळेची प्रचंड बचत'
    },
    {
      feature: 'पाण्याचा वापर (Water Consumption)',
      traditional: '१५० ते २०० लिटर प्रति एकर',
      drone: 'फक्त १० लिटर प्रति एकर',
      advantage: '९०% पाण्याची बचत'
    },
    {
      feature: 'शेतकऱ्यांचे आरोग्य (Health & Safety)',
      traditional: 'विषारी वाफ शरीरात जाते, पाठदुखी व चक्कर',
      drone: 'शून्य धोका! शेतकरी बांधव बांधावर सुरक्षित',
      advantage: '१००% आरोग्य सुरक्षा'
    },
    {
      feature: 'पानांच्या खाली फवारणी (Foliage Penetration)',
      traditional: 'फक्त वरच्या बाजूला पडते, खाली कीड राहते',
      drone: 'प्रोपेलरच्या हवेच्या दाबाने पानांच्या खालीही सूक्ष्म तुषार',
      advantage: 'किडींचा १००% खात्मा'
    },
    {
      feature: 'चिखलात व उंच पिकात फवारणी (Mud & Height)',
      traditional: 'चिखलात चालता येत नाही, उंच उसात आत जाता येत नाही',
      drone: 'हवेतून सहज उड्डाण; चिखल किंवा उंचीचा कोणताही अडसर नाही',
      advantage: 'कोणत्याही हंगामात सहज शक्य'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-900 hover:text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('← मुख्य पानावर परत', '← Back to Home')}</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            <span>{t('मुख्य पान', 'Home')}</span> <span className="mx-1">/</span>{' '}
            <span className="text-slate-900 font-bold">{t('कृषी ड्रोन सेवा', 'Agriculture Drone')}</span>
          </div>
        </div>
      </div>

      {/* Page Hero Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold mb-4">
            <Sprout className="w-3.5 h-3.5" />
            <span>शाश्वत कृषी विकास व शेतकरी सक्षमीकरण</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            Mashale's Agricultural Services
          </h1>

          <p className="text-lg sm:text-2xl font-serif text-emerald-300 font-bold max-w-3xl mx-auto">
            मशाळे अ‍ॅग्रिकल्चरल सर्व्हिसेस (ड्रोन फवारणी)
          </p>

          <p className="mt-4 text-xs sm:text-base text-emerald-100 leading-relaxed max-w-3xl mx-auto">
            पारंपरिक फवारणीला आधुनिक तंत्रज्ञानाचा समर्थ पर्याय! कीटकनाशके, बुरशीनाशके, खते व टॉनिकची जलद, अचूक आणि शेतकऱ्यांच्या आरोग्याची १००% काळजी घेणारी अत्याधुनिक कृषी ड्रोन सेवा.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenInquiry('drone', 'कृषी ड्रोन फवारणी बुकिंग')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              🚁 फवारणीसाठी आजच तारीख नोंदवा
            </button>
            <a
              href="tel:+918788589897"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>थेट कॉल करा: +91 8788589897 / 8956356240</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* 4 Core Quantitative Stats directly from notes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {DRONE_AGRICULTURE_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-lg text-center flex flex-col justify-between"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                {stat.label}
              </span>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 ml-1 font-mono">{stat.unit}</span>
              </div>
              <p className="text-[11px] font-medium text-emerald-900 mt-2 bg-emerald-50 py-1 px-2 rounded-md">
                {stat.marathi}
              </p>
            </div>
          ))}
        </div>

        {/* Real Ceremony & Field Photos Showcase */}
        {(dronePujaImg || droneFamilyImg || droneStudentsImg) && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-14">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md">
                प्रत्यक्ष लोकार्पण सोहळा व प्रत्यक्ष ड्रोन
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                मशाळे ॲग्रिकल्चरल सर्व्हिसेस ड्रोन सोहळा व प्रत्यक्ष सेवा
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dronePujaImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-60 overflow-hidden">
                    <EditableImage
                      slotId="core_agriculture_drone_puja"
                      fallbackSlotId="drone_puja"
                      alt="Agricultural Drone Launch & Puja Ceremony"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">ड्रोन लोकार्पण व पूजन सोहळा</h3>
                    <p className="text-xs text-slate-600 mt-1">शेतकऱ्यांच्या सेवेसाठी अत्याधुनिक कृषी ड्रोनचे विधीवत पूजन.</p>
                  </div>
                </div>
              )}

              {droneFamilyImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-60 overflow-hidden">
                    <EditableImage
                      slotId="core_agriculture_drone_farmers"
                      fallbackSlotId="drone_family"
                      alt="Drone Inauguration with Family and Farmers"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">संचालक, कुटुंबिय व शेतकरी बांधव</h3>
                    <p className="text-xs text-slate-600 mt-1">बळीराजाच्या कल्याणासाठी घेतलेला आधुनिक पुढाकार.</p>
                  </div>
                </div>
              )}

              {droneStudentsImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-60 overflow-hidden">
                    <EditableImage
                      slotId="core_agriculture_drone_team"
                      fallbackSlotId="drone_students_group"
                      alt="Students and Team with Agricultural Drone"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">तंत्रज्ञान व आधुनिक प्रशिक्षण</h3>
                    <p className="text-xs text-slate-600 mt-1">प्रशिक्षित पायलट द्वारे अचूक जीपीएस मॅपिंग फवारणी.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Detailed Comparison Table (Traditional vs Drone) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
              तुलनात्मक विश्लेषण
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
              पारंपरिक पाठीवरील पंप फवारणी विरूद्ध आधुनिक ड्रोन फवारणी
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              ड्रोन फवारणीमुळे शेतकऱ्यांचे कष्ट, वेळ, पैसा आणि आरोग्य कसे वाचते ते खालील तुलनात्मक तक्त्यावरून समजून घ्या.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-700">
                  <th className="py-3 px-4">घटक (Feature)</th>
                  <th className="py-3 px-4 text-rose-800">पारंपरिक मॅन्युअल फवारणी (Old Way)</th>
                  <th className="py-3 px-4 text-emerald-800 bg-emerald-50/50">आधुनिक ड्रोन फवारणी (Drone Way)</th>
                  <th className="py-3 px-4 text-blue-900">शेतकऱ्यांचा थेट फायदा</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-4 text-rose-700">{row.traditional}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/30">{row.drone}</td>
                    <td className="py-3.5 px-4 font-semibold text-blue-900">
                      <span className="inline-flex items-center gap-1.5 bg-blue-50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        {row.advantage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5 Core Benefits from Notes */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-14">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
              प्रमुख वैशिष्ट्ये
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 mt-1">
              ड्रोन फवारणीचे ५ अत्यंत महत्त्वाचे फायदे
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DRONE_AGRICULTURE_INFO.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-emerald-50/30 border border-emerald-100 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{benefit.marathi}</h3>
                  <span className="text-[11px] font-semibold text-emerald-800 block mb-2">{benefit.title}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Acreage & Savings Calculator */}
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 text-emerald-300 text-xs font-bold">
                <Calculator className="w-3.5 h-3.5" />
                <span>थेट वेळ व पाणी बचत कॅल्क्युलेटर</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                आपल्या शेताचे क्षेत्र निवडा व बचत पहा
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                स्लाइडर हलवून आपल्या शेतीचे एकर क्षेत्र निवडा. ड्रोन फवारणीमुळे आपला किती मौल्यवान वेळ आणि शेकडो लिटर पाणी वाचते ते प्रत्यक्ष अनुभवा.
              </p>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-2">
                  शेताचे क्षेत्र (Select Acreage): <span className="text-amber-300 text-lg font-mono">{acreage} एकर (Acres)</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={acreage}
                  onChange={(e) => setAcreage(parseInt(e.target.value))}
                  className="w-full h-2 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-emerald-300 mt-1">
                  <span>१ एकर</span>
                  <span>१० एकर</span>
                  <span>२५ एकर</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">
                  पीक निवडा (Select Crop):
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400"
                >
                  {crops.map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-white">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <h3 className="text-base font-bold text-amber-300 font-serif border-b border-white/10 pb-2">
                {acreage} एकर क्षेत्रासाठी बचत अंदाज:
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-3 rounded-xl text-center">
                  <span className="text-[11px] text-emerald-200 block">ड्रोन फवारणी वेळ</span>
                  <span className="text-2xl font-bold font-mono text-white">{droneMinutes} मिनिटे</span>
                  <span className="text-[10px] text-emerald-300 block">पारंपरिक: {(manualMinutes / 60).toFixed(0)} तास</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl text-center">
                  <span className="text-[11px] text-emerald-200 block">वेळेची निव्वळ बचत</span>
                  <span className="text-2xl font-bold font-mono text-amber-300">{hoursSaved} तास</span>
                  <span className="text-[10px] text-emerald-300 block">शेतकऱ्यांचा वेळ वाचला</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl text-center">
                  <span className="text-[11px] text-emerald-200 block">ड्रोन पाण्याचा वापर</span>
                  <span className="text-2xl font-bold font-mono text-white">{droneWaterLtr} लिटर</span>
                  <span className="text-[10px] text-emerald-300 block">१० लिटर प्रति एकर</span>
                </div>

                <div className="bg-white/10 p-3 rounded-xl text-center">
                  <span className="text-[11px] text-emerald-200 block">पाण्याची एकूण बचत</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400">{waterSavedLtr} लिटर</span>
                  <span className="text-[10px] text-emerald-300 block">९०% पाण्याचे रक्षण</span>
                </div>
              </div>

              <button
                onClick={() => onOpenInquiry('drone', `${acreage} एकर ${selectedCrop} ड्रोन फवारणी बुकिंग`)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg"
              >
                या {acreage} एकर क्षेत्रासाठी ड्रोन फवारणी बुक करा →
              </button>
            </div>
          </div>
        </div>

        {/* Step-by-Step Simple Process */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-14">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              सोपी कार्यपद्धती
            </span>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
              ड्रोन फवारणी कशी करावी? (४ सोप्या पायऱ्या)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3">
                1
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">तारीख व वेळ नोंदवा</h3>
              <p className="text-xs text-slate-600">फोन अथवा व्हॉट्सॲपवरून आपले पीक, एकर आणि सोयीची वेळ सांगा.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3">
                2
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">औषध व पाणी तयारी</h3>
              <p className="text-xs text-slate-600">शेतात आवश्यक कीटकनाशक/टॉनिक आणि १० लिटर स्वच्छ पाणी तयार ठेवा.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3">
                3
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">अचूक जीपीएस फ्लाईट</h3>
              <p className="text-xs text-slate-600">प्रशिक्षित पायलट द्वारे संपूर्ण शेतावर अवघ्या ७ मिनिटांत एकसमान फवारणी.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-sm flex items-center justify-center mb-3">
                4
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">उत्कृष्ट निकाल व विश्रांती</h3>
              <p className="text-xs text-slate-600">किडींचा त्वरित बंदोबस्त होतो आणि शेतकऱ्यांना कोणत्याही त्रासाशिवाय विश्रांती मिळते.</p>
            </div>
          </div>
        </div>

        {/* Back to Home CTA Bar */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold font-serif text-white">
              मुख्य पानावर परत जायचे आहे का?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              अकॅडमीच्या इतर सर्व उपक्रमांचे मुख्यपृष्ठ पहा किंवा थेट संपर्क साधा.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              🏠 मुख्य पानावर परत जा (Home)
            </button>
            <button
              onClick={() => onOpenInquiry('drone', 'ड्रोन फवारणी शेतकरी नोंदणी')}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md"
            >
              📞 फवारणीसाठी संपर्क करा
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
