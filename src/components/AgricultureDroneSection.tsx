import React, { useState } from 'react';
import { DRONE_AGRICULTURE_INFO } from '../data/academyData';
import { Plane, Droplet, Clock, ShieldCheck, Sprout, Sparkles, Check, ArrowRight, Calculator, PhoneCall } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AgricultureDroneSectionProps {
  onOpenInquiry: (category: string, subject?: string) => void;
  onNavigate?: (section: NavSection) => void;
}

export const AgricultureDroneSection: React.FC<AgricultureDroneSectionProps> = ({ onOpenInquiry, onNavigate }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const dronePujaImg = getPhotoSrc('drone_puja');
  const droneFamilyImg = getPhotoSrc('drone_family');
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
    'Vegetables (भाजीपाला)'
  ];

  // Calculations based on the exact user notes:
  // 7 minutes / acre, 10 litres water / acre
  // Traditional is ~4 hours (240 mins) and ~180 litres / acre
  const droneMinutes = acreage * 7;
  const manualMinutes = acreage * 240;
  const hoursSaved = ((manualMinutes - droneMinutes) / 60).toFixed(1);
  const droneWaterLtr = acreage * 10;
  const manualWaterLtr = acreage * 180;
  const waterSavedLtr = manualWaterLtr - droneWaterLtr;

  return (
    <section id="agriculture-section" className="py-16 sm:py-20 bg-emerald-50/30 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Page 4 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-semibold mb-3">
            <Sprout className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('शाश्वत शेती आणि शेतकरी सक्षमीकरण', 'Sustainable Agriculture & Farmer Empowerment')}</span>
          </div>

          <span className="block text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">
            {t('शाश्वत विकासासाठी कृषी तंत्रज्ञान', 'What We Do for Sustainable Development · Agritech')}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t("मशाळे अ‍ॅग्रिकल्चरल सर्व्हिसेस", "Mashale's Agricultural Services")}{' '}
            <span className="text-emerald-800">{t('(ड्रोन फवारणी सेवा)', '(Drone Spraying Services)')}</span>
          </h2>
          <p className="mt-1 text-base sm:text-lg font-bold text-emerald-900">
            {t('शेतात अचूक, जलद आणि १००% सुरक्षित कीटकनाशक फवारणी', 'Precise, Rapid & 100% Safe Crop Spraying')}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'पारंपरिक फवारणीला आधुनिक तंत्रज्ञानाचा समर्थ पर्याय! कीटकनाशके, बुरशीनाशके व टॉनिकची जलद, अचूक आणि शेतकऱ्यांच्या आरोग्याची काळजी घेणारी अत्याधुनिक ड्रोन फवारणी.',
              'A modern, high-tech alternative to hazardous manual spraying. Rapid, uniform micro-droplet mist covering all leaves while keeping farmers completely safe from toxic fumes.'
            )}
          </p>

          {onNavigate && (
            <div className="mt-4">
              <button
                onClick={() => onNavigate('agriculture')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
              >
                <span>{t('🌾 कृषी ड्रोन सविस्तर स्वतंत्र पान पहा', '🌾 Open Dedicated Agriculture Drone Page')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* 4 Core Quantitative Stats directly from notes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {DRONE_AGRICULTURE_INFO.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all text-center flex flex-col justify-between"
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
                {language === 'mr' ? stat.marathi : `${stat.value} ${stat.unit} (${stat.label})`}
              </p>
            </div>
          ))}
        </div>

        {/* Visual & Interactive Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left: Drone Image Showcase */}
          {/* Left: Dedicated Real Drone Photos & Highlights */}
          <div className="lg:col-span-6 space-y-4">
            {dronePujaImg && (
              <div className="rounded-2xl overflow-hidden border-2 border-emerald-300 shadow-xl bg-slate-900 group relative">
                <img
                  src={dronePujaImg}
                  alt="Agricultural Drone Spraying - Launch and Puja Ceremony"
                  className="w-full h-72 sm:h-84 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Plane className="w-4 h-4 text-emerald-400" />
                    मशाळे ॲग्रिकल्चरल सर्व्हिसेस · प्रत्यक्ष फोटो
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif mt-1">
                    अत्याधुनिक कृषी फवारणी ड्रोन (Quadcopters)
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    १० मिनिटांत १ एकर फवारणी · ९०% पाण्याची बचत · औषधांचा १००% कार्यक्षम वापर
                  </p>
                </div>
              </div>
            )}

            {/* Team & Village Launch Banner */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-xs flex items-center gap-4">
              {droneFamilyImg && (
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-emerald-300 shadow-xs">
                  <img
                    src={droneFamilyImg}
                    alt="Drone Inauguration with family and team"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  लोकार्पण व पूजन सोहळा
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  संचालक, कुटुंबिय व ग्रामस्थांच्या उपस्थितीत शुभारंभ
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                  परिसरातील शेतकऱ्यांच्या बांधावर तत्काळ ड्रोन फवारणी सेवा उपलब्ध.
                </p>
              </div>
            </div>

            {/* Core Benefits */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Key Advantages for Farmers (शेतकऱ्यांसाठी फायदे):
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {DRONE_AGRICULTURE_INFO.benefits.slice(0, 4).map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <div>
                      <span className="font-bold text-slate-900">{b.title}</span>
                      <span className="text-slate-500 block">{b.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Interactive Farmer Acreage & Savings Calculator */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200/90 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                    ड्रोन फवारणी बचत कॅल्क्युलेटर
                  </h3>
                  <span className="text-xs text-slate-500">Calculate Time &amp; Water Savings</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Instant Estimate
              </span>
            </div>

            {/* Crop Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Your Crop (तुमचे पीक निवडा):
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 font-medium"
              >
                {crops.map((crop) => (
                  <option key={crop} value={crop}>
                    {crop}
                  </option>
                ))}
              </select>
            </div>

            {/* Acreage Slider & Input */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Field Area (क्षेत्रफळ एकर):
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-extrabold text-emerald-900 font-mono">
                    {acreage}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">Acres (एकर)</span>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={acreage}
                onChange={(e) => setAcreage(Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>1 Acre</span>
                <span>5 Acres</span>
                <span>10 Acres</span>
                <span>25 Acres</span>
              </div>
            </div>

            {/* Live Calculation Output Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              
              {/* Time Comparison */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 block">ड्रोनद्वारे लागणारा वेळ</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {droneMinutes} मिनिटे
                </span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">
                  (पारंपरिक वेळ: {acreage * 4} तास वाचले)
                </span>
              </div>

              {/* Water Comparison */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <Droplet className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] text-slate-500 block">फक्त एवढे पाणी लागेल</span>
                <span className="text-lg font-bold text-slate-900 font-mono">
                  {droneWaterLtr} Litres
                </span>
                <span className="text-[10px] text-emerald-700 block font-semibold mt-0.5">
                  ({waterSavedLtr} लिटर पाण्याची बचत!)
                </span>
              </div>

            </div>

            {/* Booking CTA Button */}
            <button
              onClick={() =>
                onOpenInquiry(
                  'drone',
                  `ड्रोन फवारणी बुकिंग - ${acreage} एकर (${selectedCrop})`
                )
              }
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-98"
            >
              <span>Book Drone Spraying for {acreage} Acres</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              फवारणी औषधे व टॉनिक शेतकरी किंवा आमच्या सल्ल्यानुसार उपलब्ध केली जातील.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
