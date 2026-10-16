import React from 'react';
import { ArrowLeft, PhoneCall, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';

interface ContactPageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('← मुख्य पानावर परत', '← Back to Home')}</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            <span>{t('मुख्य पान', 'Home')}</span> <span className="mx-1">/</span>{' '}
            <span className="text-slate-900 font-bold">{t('संपर्क व पत्ता', 'Contact Us')}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-4">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>थेट संवाद व पत्ता</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            Contact MSR's Academy &amp; Team
          </h1>
          <p className="text-lg sm:text-xl font-serif text-amber-300 font-bold max-w-3xl mx-auto">
            प्रवेश, ग्रंथालय सदस्यत्व किंवा कृषी ड्रोन फवारणीसाठी थेट संपर्क साधा
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Details */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
            <h2 className="text-2xl font-bold font-serif text-slate-900">
              संपर्क माहिती (Contact Information)
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">थेट संपर्क क्रमांक (Phone Numbers)</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                      <a href={`tel:${ACADEMY_INFO.contact.phone.replace(/\s+/g, '')}`} className="text-base font-bold text-slate-900 hover:text-blue-900 font-mono">
                        {ACADEMY_INFO.contact.phone}
                      </a>
                      <span className="text-slate-400">/</span>
                      <a href={`tel:${ACADEMY_INFO.contact.altPhone.replace(/\s+/g, '')}`} className="text-base font-bold text-slate-900 hover:text-blue-900 font-mono">
                        {ACADEMY_INFO.contact.altPhone}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-blue-800 pl-13">
                  कॉल करण्यासाठी नंबरवर टॅप करा (Tap to call 8788589897 / 8956356240)
                </div>
              </div>

              <a
                href={`mailto:${ACADEMY_INFO.contact.email}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-indigo-50/60 hover:bg-indigo-100/60 transition-colors border border-indigo-100"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-900 text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">अधिकृत ईमेल (Email)</span>
                  <p className="text-base font-bold text-slate-900 font-mono">{ACADEMY_INFO.contact.email}</p>
                  <span className="text-xs text-indigo-800">ईमेल पाठवण्यासाठी येथे क्लिक करा</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${ACADEMY_INFO.contact.whatsapp}?text=Hello%20MSR%20Academy%20Team`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-50/60 hover:bg-emerald-100/60 transition-colors border border-emerald-100"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">व्हॉट्सॲप थेट मेसेज</span>
                  <p className="text-base font-bold text-slate-900 font-mono">{ACADEMY_INFO.contact.phone}</p>
                  <span className="text-xs text-emerald-800">व्हॉट्सॲपवर चॅट सुरू करा (8788589897)</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">पत्ता (Address)</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">{ACADEMY_INFO.contact.location}</p>
                  <a
                    href="https://maps.google.com/?q=msrs+academy+near+virtapsavi+mandir+Hotgi+Solapur+Maharashtra+413215"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 hover:underline mt-2 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200"
                  >
                    <span>📍 Google Maps वर प्रत्यक्ष स्थान उघडा (Open in Google Maps)</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">वेळापत्रक (Timings)</span>
                  <p className="text-xs text-slate-700 mt-1"><span className="font-bold">ग्रंथालय व अभ्यासिका:</span> {ACADEMY_INFO.contact.hours.library}</p>
                  <p className="text-xs text-slate-700 mt-0.5"><span className="font-bold">कोचिंग वर्ग:</span> {ACADEMY_INFO.contact.hours.coaching}</p>
                  <p className="text-xs text-slate-700 mt-0.5"><span className="font-bold">कृषी ड्रोन सेवा:</span> {ACADEMY_INFO.contact.hours.drone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                ऑनलाइन चौकशी
              </span>
              <h2 className="text-2xl font-bold font-serif text-slate-900 mt-2 mb-3">
                आपली चौकशी किंवा जागा आरक्षित करा
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                खालील बटणावर क्लिक करून आपला फॉर्म भरा. आमची टीम आपल्याला त्वरित फोन करून सविस्तर माहिती देईल.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => onOpenInquiry('abhyasika', 'तपोरत्न अभ्यासिका चौकशी')}
                  className="w-full py-3 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold text-xs sm:text-sm border border-rose-200 text-left flex items-center justify-between"
                >
                  <span>👩‍🎓 तपोरत्न अभ्यासिका (मुलींसाठी) जागा नोंदणी</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => onOpenInquiry('drone', 'कृषी ड्रोन फवारणी चौकशी')}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm border border-emerald-200 text-left flex items-center justify-between"
                >
                  <span>🌾 मशाळे कृषी ड्रोन फवारणी बुकिंग</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => onOpenInquiry('coaching', 'शालेय वर्ग प्रवेश चौकशी')}
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs sm:text-sm border border-blue-200 text-left flex items-center justify-between"
                >
                  <span>📚 १ ली ते १० वी कोचिंग वर्ग प्रवेश</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => onOpenInquiry('competitive', 'स्पर्धा परीक्षा मार्गदर्शन चौकशी')}
                  className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm border border-amber-200 text-left flex items-center justify-between"
                >
                  <span>🎯 स्पर्धा परीक्षा (MPSC / पोलीस भरती) मार्गदर्शन</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-center">
              <button
                onClick={() => onOpenInquiry('general', 'सामान्य चौकशी')}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>थेट संपूर्ण चौकशी फॉर्म उघडा (Open Form)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
