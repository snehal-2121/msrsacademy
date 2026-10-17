import React, { useState } from 'react';
import {
  ShieldCheck,
  LayoutGrid,
  Sparkles,
  Wind,
  Coffee,
  Camera,
  Droplets,
  Wifi,
  Clock,
  Check,
  CalendarCheck,
  HeartHandshake
} from 'lucide-react';
import { TAPOVAN_GIRLS_FACILITIES } from '../data/academyData';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { EditableImage } from './EditableImage';

interface TapovanAbhyasikaProps {
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const TapovanAbhyasika: React.FC<TapovanAbhyasikaProps> = ({ onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const tapovanImg = getPhotoSrc('tapovan_cubicles');
  const [selectedShift, setSelectedShift] = useState<'morning' | 'evening' | 'fullday'>('fullday');

  const shiftDetails = {
    morning: {
      title: t("सकाळची वेळ (Morning Shift)", "Morning Shift"),
      time: "5:00 AM – 2:00 PM",
      desc: t("पहाटेच्या ताज्या हवेत पाठांतर व एकाग्र अभ्यासासाठी उत्तम वेळ.", "Perfect for early morning memorization and calm fresh focus."),
      status: t("उपलब्ध", "Available"),
      freeSeats: 8,
    },
    evening: {
      title: t("दुपार ते रात्रीची वेळ (Evening Shift)", "Afternoon & Evening Shift"),
      time: "2:00 PM – 10:30 PM",
      desc: t("कॉलेज विद्यार्थिनी व संध्याकाळच्या सराव अभ्यासासाठी सोयीस्कर.", "Ideal for college students and evening revision hours."),
      status: t("काही जागा शिल्लक", "Few Seats Left"),
      freeSeats: 4,
    },
    fullday: {
      title: t("पूर्ण दिवस कायमस्वरूपी कप्पा (Full Day Desk)", "Full Day Dedicated Desk"),
      time: "5:00 AM – 11:00 PM",
      desc: t("MPSC/UPSC स्पर्धा परीक्षांची कसून तयारी करणाऱ्या विद्यार्थिनींसाठी राखीव जागा.", "Reserved permanent compartment desk for serious MPSC/UPSC & competitive aspirants."),
      status: t("उपलब्ध", "Available"),
      freeSeats: 12,
    },
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-rose-600" />;
      case 'LayoutGrid': return <LayoutGrid className="w-5 h-5 text-blue-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-600" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-700" />;
      case 'Camera': return <Camera className="w-5 h-5 text-indigo-600" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-emerald-600" />;
      default: return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="tapovan-abhyasika" className="py-16 sm:py-20 bg-rose-50/25 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with exact quote from Page 2 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 text-rose-900 text-xs font-semibold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>{t('केवळ विद्यार्थिनी व युवतींसाठी सुरक्षित जागा', 'Dedicated Exclusively For Female Students & Aspirants')}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            "Do you want to study in silent mode? Then come here!"
          </h2>
          
          <div className="mt-2 text-lg sm:text-xl font-bold text-amber-900">
            {t('तपोरत्न अभ्यासिका (केवळ मुलींसाठी सुरक्षित दालन)', 'What We Have for Girls · Taporatna Abhyasika')}
          </div>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'मुलींसाठी १००% शांत, सुरक्षित, आणि सुसज्ज अभ्यासिका दालन. प्रत्येक विद्यार्थिनीसाठी स्वतंत्र केबिन, अखंडित वायफाय आणि सुरक्षित वातावरण.',
              'A 100% quiet, safe, and modern study space for female students. Featuring individual study cabins, high-speed Wi-Fi, and 24/7 CCTV surveillance.'
            )}
          </p>
        </div>

        {/* Feature Split Showcase: Visual Hero + Core 8 Bullet Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 space-y-4">
            {tapovanImg && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-rose-200/80 bg-white group">
                <EditableImage
                  slotId="home_tapovan_cubicles"
                  fallbackSlotId="tapovan_cubicles"
                  alt="Taporatna Girls Study Room & Library"
                  className="w-full h-72 sm:h-80"
                  imgClassName="w-full h-72 sm:h-80 object-cover group-hover:scale-103 transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      100% Silent Zone
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif">
                      {t('तपोरत्न अभ्यासिका शांतता कक्ष', 'Taporatna Abhyasika')}
                    </h3>
                    <p className="text-xs text-slate-200 mt-1">
                      {t(
                        'दीर्घकाळ अखंडित एकाग्रतेसाठी तयार केलेले स्वतंत्र लाकडी कप्पे (Cubicles).',
                        'Individual study cabins designed for hours of deep uninterrupted concentration.'
                      )}
                    </p>
                  </div>
                </EditableImage>
              </div>
            )}

            {/* Quick Shift Booking Box */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {t('अभ्यासिका वेळ निवडा:', 'Select Shift Timings:')}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {t('प्रवेश सुरू', 'Admissions Open')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {(['morning', 'evening', 'fullday'] as const).map((shift) => (
                  <button
                    key={shift}
                    onClick={() => setSelectedShift(shift)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg text-center transition-all ${
                      selectedShift === shift
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {shift === 'morning' && t('सकाळ', 'Morning')}
                    {shift === 'evening' && t('संध्याकाळ', 'Evening')}
                    {shift === 'fullday' && t('पूर्ण दिवस', 'Full Day')}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1 mb-4">
                <div className="font-bold text-slate-900 flex justify-between">
                  <span>{shiftDetails[selectedShift].title}</span>
                  <span className="text-blue-800 font-mono">{shiftDetails[selectedShift].time}</span>
                </div>
                <p className="text-slate-600">{shiftDetails[selectedShift].desc}</p>
              </div>

              <button
                onClick={() => onOpenInquiry('abhyasika', `तपोरत्न अभ्यासिका - ${shiftDetails[selectedShift].title}`)}
                className="w-full py-2.5 px-4 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{t('जागा आरक्षित / चौकशी करा', 'Book / Inquire Seat for Girls')}</span>
              </button>
            </div>
          </div>

          {/* 8 Essential Handwritten Points from Page 2 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TAPOVAN_GIRLS_FACILITIES.map((facility, index) => {
                const primaryTitle = language === 'mr' ? facility.marathi : facility.title;
                const secondaryTitle = language === 'mr' ? facility.title : facility.marathi;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 hover:border-rose-300 transition-all shadow-xs hover:shadow-md flex flex-col"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
                        {getIcon(facility.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {primaryTitle}
                        </h4>
                        <span className="text-[11px] font-semibold text-rose-700">
                          {secondaryTitle}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {facility.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
