import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  onOpenInquiry: (category?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    wing: 'abhyasika',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t('आमच्याशी थेट संपर्क साधा', 'Get in Touch with Us')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t("MSR's Academy संपर्क केंद्र", "Contact Msr's Academy & Team")}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'तपोरत्न अभ्यासिका प्रवेश, ग्रंथालय सभासदत्व, शालेय कोचिंग किंवा शेतातील ड्रोन फवारणीसाठी आमच्याशी थेट संपर्क साधा.',
              'Reach out to us directly for Taporatna study room seats, library access, school coaching, or drone agritech bookings.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif">
                {t("MSR's Academy & Team मुख्य कार्यालय", "MSR's Academy & Team Headquarters")}
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('फोन व व्हॉट्सअ‍ॅप (Contact Numbers):', 'Calling & WhatsApp Numbers:')}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
                      <a href="tel:+918788589897" className="font-bold text-slate-900 hover:text-blue-900 font-mono">
                        +91 8788589897
                      </a>
                      <span className="text-slate-400">/</span>
                      <a href="tel:+918956356240" className="font-bold text-slate-900 hover:text-blue-900 font-mono">
                        +91 8956356240
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('ईमेल (Email ID):', 'Official Email:')}
                    </span>
                    <a
                      href="mailto:msrsacademy144@gmail.com"
                      className="font-bold text-slate-900 hover:text-blue-900 font-mono text-xs sm:text-sm break-all"
                    >
                      msrsacademy144@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('पत्ता / स्थान (Address):', 'Location / Address:')}
                    </span>
                    <p className="font-medium text-slate-800 leading-snug">
                      {t(
                        "MSR's Academy, विरतपस्वी मंदिरा जवळ (बृहन्मठ होतगी) - दर्ग्या समोर, होतगी गाव, तालुका दक्षिण सोलापूर, सोलापूर, महाराष्ट्र ४१३२१५",
                        "MSR's Academy near Virtapsavi Mandir (Brihnmath Hotgi) - opposite to dargah, Hotgi gaon, taluka south Solapur, Solapur, Maharashtra 413215"
                      )}
                    </p>
                    <a
                      href="https://maps.google.com/?q=msrs+academy+near+virtapsavi+mandir+Hotgi+Solapur+Maharashtra+413215"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 hover:underline mt-1"
                    >
                      <span>📍 Google Maps वर स्थान पहा (View on Map)</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {t('कामाची वेळ:', 'Working Timings:')}
                    </span>
                    <ul className="text-xs space-y-0.5 mt-0.5">
                      <li>• <strong>{t('तपोरत्न अभ्यासिका केंद्र:', 'Taporatna Study Center:')}</strong> {t('सकाळी ५:०० ते रात्री ११:०० (दररोज)', '5:00 AM – 11:00 PM (Daily)')}</li>
                      <li>• <strong>{t('२४ तास (परवानगीने):', '24 hours by permission:')}</strong> {t('पूर्व परवानगीने २४ तास सुविधा उपलब्ध', 'Available 24 hours with permission')}</li>
                      <li>• <strong>{t('शालेय वर्ग:', 'School Classes:')}</strong> {t('सकाळी ७:०० ते सायंकाळी ७:३० (सोम – शनि)', '7:00 AM – 7:30 PM (Mon – Sat)')}</li>
                      <li>• <strong>{t('ड्रोन फवारणी:', 'Drone Spraying:')}</strong> {t('शेतकरी गरजेनुसार २४ तास बुकिंग उपलब्ध', 'Available 24 Hours on Farmer Call')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/918788589897?text=${encodeURIComponent(
                    language === 'mr'
                      ? "नमस्कार MSR's Academy, मला प्रवेश आणि सेवांबाबत चौकशी करायची आहे."
                      : "Hello MSR's Academy, I want to inquire about admissions / services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('थेट व्हॉट्सअ‍ॅपवर मेसेज करा (+91 8788589897)', 'Chat on WhatsApp Directly (+91 8788589897)')}</span>
                </a>
              </div>
            </div>

            {/* Quick Safety / Parents Trust Note */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 flex items-center gap-3 text-xs text-rose-950">
              <ShieldCheck className="w-5 h-5 text-rose-700 shrink-0" />
              <span>
                <strong>{t('पालकांसाठी सूचना:', 'Note for Parents:')}</strong>{' '}
                {t(
                  'विद्यार्थिनींच्या सुरक्षेबाबत पालक वैयक्तिक भेट घेऊन तपोरत्न अभ्यासिकेची प्रत्यक्ष पाहणी करू शकतात.',
                  'Parents are welcome to personally visit the campus and inspect security measures at Taporatna Study.'
                )}
              </span>
            </div>

          </div>

          {/* Direct Inquiry Form (Right) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  {t(`धन्यवाद, ${formData.name}!`, `Thank You, ${formData.name}!`)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {t(
                    'आपला संदेश आम्हाला प्राप्त झाला आहे. आमची टीम लवकरच आपल्याशी फोन किंवा व्हॉट्सअ‍ॅपवर संपर्क करेल.',
                    'Your message has been received. Our team will contact you shortly via phone or WhatsApp.'
                  )}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', wing: 'abhyasika', message: '' });
                  }}
                  className="mt-4 px-5 py-2 text-xs font-semibold text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200"
                >
                  {t('दुसरी चौकशी पाठवा', 'Send Another Inquiry')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif mb-1">
                  {t('थेट प्रवेश / सेवा बुकिंग फॉर्म', 'Send Direct Admission / Booking Inquiry')}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {t('खालील माहिती भरा, आम्ही त्वरित आपल्याशी संपर्क करू.', 'Fill out your details below and our team will get in touch immediately.')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t('आपले पूर्ण नाव *', 'Your Full Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('उदा. रमेश पाटील / स्नेहा शिंदे', 'e.g. Ramesh Patil / Sneha Shinde')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t('मोबाईल / व्हॉट्सअ‍ॅप नंबर *', 'Phone / Mobile Number *')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 8788589897"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('विभाग किंवा विषय निवडा', 'Select Section / Purpose')}
                  </label>
                  <select
                    value={formData.wing}
                    onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 font-medium"
                  >
                    <option value="abhyasika">{t('तपोरत्न अभ्यासिका (मुलींसाठी स्वतंत्र)', 'Taporatna Study Room (Exclusively for Girls)')}</option>
                    <option value="coaching">{t('शालेय वर्ग कोचिंग (१ ली ते १० वी)', 'School Coaching Classes (1st - 10th Std)')}</option>
                    <option value="scholarship">{t('शिष्यवृत्ती परीक्षा (Scholarship, Navodaya, NMMS)', 'Scholarship Exams (Scholarship, Navodaya, NMMS)')}</option>
                    <option value="competitive">{t('स्पर्धा परीक्षा मोफत समुपदेशन / MPSC वर्ग', 'Competitive Exams Free Mentorship / MPSC Batches')}</option>
                    <option value="library">{t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Babasaheb Ambedkar Library Access')}</option>
                    <option value="drone">{t("मशाळे अ‍ॅग्रिकल्चरल सर्व्हिसेस (ड्रोन फवारणी)", "Mashale's Agricultural Drone Spraying")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('संदेश / तपशील (ऐच्छिक)', 'Message / Details (Optional)')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={t('इयत्ता, गाव किंवा शेती पिकाचे क्षेत्र नमूद करा...', 'Provide standard, village, or crop area details...')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('चौकशी पाठवा', 'Submit Inquiry')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
