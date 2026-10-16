import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { InquiryFormData } from '../types';
import academyLogo from '../assets/images/msr_academy_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { ACADEMY_INFO } from '../data/academyData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultSubject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'abhyasika',
  defaultSubject = '',
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    category: (defaultCategory as any) || 'abhyasika',
    standardOrExam: defaultSubject || '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-md shrink-0">
              <img
                src={academyLogo}
                alt="MSR's Academy Seal Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif leading-tight">
                MSR's Academy &amp; Team
              </h3>
              <p className="text-[11px] text-amber-200 font-medium">
                {t('प्रवेश नोंदणी व सेवा चौकशी फॉर्म', 'Admission, Seat Booking & Service Inquiry')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {/* Quick Direct Real-Time Contact Banner */}
          <div className="mb-4 p-3 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-slate-700 space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-blue-950 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-800" />
                {t('त्वरित संपर्क हेल्पलाईन:', 'Instant Helpline:')}
              </span>
              <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                <a href="tel:+918788589897" className="hover:text-blue-700 underline">8788589897</a>
                <span>/</span>
                <a href="tel:+918956356240" className="hover:text-blue-700 underline">8956356240</a>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-blue-200/60 text-[11px]">
              <span className="flex items-center gap-1 text-slate-600">
                <Mail className="w-3 h-3 text-indigo-700" />
                <a href="mailto:msrsacademy144@gmail.com" className="hover:underline font-mono">
                  msrsacademy144@gmail.com
                </a>
              </span>
              <a
                href={`https://wa.me/918788589897?text=${encodeURIComponent(
                  language === 'mr'
                    ? "नमस्कार MSR's Academy, मला चौकशी करायची आहे."
                    : "Hello MSR's Academy, I have an inquiry."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold hover:underline"
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-serif">
                {t('चौकशी यशस्वीरित्या प्राप्त झाली!', 'Inquiry Received Successfully!')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                {t(
                  `धन्यवाद ${formData.name}! आपल्या विनंतीची नोंद झाली आहे. आमचे प्रतिनिधी लवकरच ${formData.phone} वर संपर्क साधतील. आपण थेट 8788589897 किंवा 8956356240 वर सुद्धा बोलू शकता.`,
                  `Thank you, ${formData.name}! Your request has been recorded. Our team will contact you shortly at ${formData.phone}. You can also call directly at 8788589897 or 8956356240.`
                )}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-blue-900 text-white font-semibold text-xs rounded-xl hover:bg-blue-800 transition-all shadow-xs"
              >
                {t('खिडकी बंद करा', 'Close Window')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('पूर्ण नाव (विद्यार्थी / पालक) *', "Full Name (Student or Parent's Name) *")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('विद्यार्थ्याचे किंवा पालकांचे नाव टाका', 'Enter student or parent name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('मोबाईल नंबर *', 'Mobile Phone *')}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={t('१० अंकी मोबाईल नंबर', '10-digit mobile number')}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('विभाग / विषय', 'Department / Wing')}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 font-medium"
                  >
                    <option value="abhyasika">{t('तपोरत्न अभ्यासिका (मुलींसाठी)', 'Taporatna Study Room (Girls)')}</option>
                    <option value="coaching">{t('शालेय वर्ग (१ ली ते १० वी)', 'School Classes (1st – 10th)')}</option>
                    <option value="competitive">{t('स्पर्धा परीक्षा मार्गदर्शन / MPSC', 'Competitive Exams / MPSC')}</option>
                    <option value="library">{t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Ambedkar Library')}</option>
                    <option value="drone">{t("मशाळे कृषी ड्रोन फवारणी", "Mashale's Agricultural Drone")}</option>
                    <option value="general">{t('इतर सामान्य चौकशी', 'General Inquiry')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('इयत्ता / परीक्षा / पिकाचे क्षेत्र (तपशील)', 'Class / Exam / Crop Area (Details)')}
                </label>
                <input
                  type="text"
                  placeholder={t('उदा. १० वी SSC / ४ थी शिष्यवृत्ती / ५ एकर ऊस', 'e.g. 10th SSC / 4th Scholarship / 5 Acres Sugarcane')}
                  value={formData.standardOrExam}
                  onChange={(e) => setFormData({ ...formData, standardOrExam: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {t('संदेश / विशेष विनंती (पर्यायी)', 'Message / Special Request (Optional)')}
                </label>
                <textarea
                  rows={2}
                  placeholder={t('काही प्रश्न किंवा वेळेबाबत प्राधान्य...', 'Any questions or shift timings preferences...')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
                >
                  {t('रद्द करा', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t('अर्ज सादर करा', 'Submit Application')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
