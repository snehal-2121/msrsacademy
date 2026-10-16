import React from 'react';
import { Phone, MapPin, Mail, Clock, MessageSquare } from 'lucide-react';
import { NavSection } from '../types';
import academyLogo from '../assets/images/msr_academy_logo.jpg';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-md shrink-0">
                <img
                  src={academyLogo}
                  alt="MSR's Academy Seal Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <span className="block text-lg font-bold text-white font-serif leading-tight">
                  MSR's Academy
                </span>
                <span className="block text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                  {t('शैक्षणिक व सामाजिक संस्था', 'Educational & Social Institution')}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                "MSR's Academy · स्पर्धा परीक्षा मार्गदर्शन, डॉ. बाबासाहेब आंबेडकर ग्रंथालय, तपोरत्न अभ्यासिका केंद्र (फक्त मुलींसाठी), शालेय कोचिंग आणि कृषी ड्रोन सेवा.",
                "MSR's Academy · Competitive Examination Guidance, Dr. Babasaheb Ambedkar Library, Taporatna Girls Study Center, School Coaching & Agriculture Drone Spraying."
              )}
            </p>
          </div>

          {/* Academic Wings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t('विभाग व उपक्रम', 'Academic Wings')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('तपोरत्न अभ्यासिका केंद्र (मुलींसाठी)', 'Taporatna Girls Study Center')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Babasaheb Ambedkar Library')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('coaching')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('१ ली ते १० वी शालेय वर्ग', '1st to 10th Std Coaching Classes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('competitive')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('MPSC, पोलीस भरती आणि सरळसेवा भरती वर्ग', 'MPSC, Police Bharti and Direct Recruitment Classes')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('competitive')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('MPSC, UPSC मोफत मार्गदर्शन', 'MPSC, UPSC Free Guidance')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('coaching')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('सर्व शिष्यवृत्ती परीक्षा तयारी', 'All Scholarship Exam Preparation')}
                </button>
              </li>
            </ul>
          </div>

          {/* Sustainable Tech & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t('सुविधा व सेवा', 'Services & Facilities')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('agriculture')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t("मशाळे अ‍ॅग्रिकल्चरल ड्रोन फवारणी", "Mashale's Agricultural Drone Spraying")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('शांत अभ्यास केंद्र', 'Silent Study Center')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('अमर्यादित हाय-स्पीड वायफाय', 'Unlimited High Speed WiFi')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('२४x७ सीसीटीव्ही व आरओ पाणी', '24x7 CCTV & RO Drinking Water')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('गटचर्चा व स्वतंत्र जेवण हॉल', 'Group Discussion & Dining Hall')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors text-left"
                >
                  • {t('छायाचित्रे व कॅम्पस फेरफटका', 'Photo Gallery & Campus View')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 text-amber-400 font-semibold transition-colors text-left"
                >
                  • {t('आमच्याबद्दल (About Us)', 'About Us')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-started')}
                  className="hover:text-amber-300 text-amber-400 font-semibold transition-colors text-left"
                >
                  • {t('कशी झाली सुरुवात? (How It Started)', 'How It Started & Vision')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section in Footer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              {t('संपर्क करा (Contact Us)', 'Contact Us')}
            </h4>
            <div className="text-xs text-slate-400 space-y-2.5">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div className="font-mono tabular-nums">
                  <a href="tel:+918788589897" className="hover:text-white transition-colors block">
                    +91 8788589897
                  </a>
                  <a href="tel:+918956356240" className="hover:text-white transition-colors block">
                    +91 8956356240
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href="mailto:msrsacademy144@gmail.com" className="hover:text-white transition-colors break-all">
                  msrsacademy144@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href="https://maps.google.com/?q=msrs+academy+near+virtapsavi+mandir+Hotgi+Solapur+Maharashtra+413215"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors block leading-relaxed"
                  >
                    {t(
                      "MSR's Academy, विरतपस्वी मंदिरा जवळ (बृहन्मठ होतगी) - दर्ग्या समोर, होतगी गाव, ता. दक्षिण सोलापूर, सोलापूर, महाराष्ट्र ४१३२१५",
                      "MSR's Academy near Virtapsavi Mandir (Brihnmath Hotgi) - opposite to dargah, Hotgi gaon, taluka south Solapur, Solapur, Maharashtra 413215"
                    )}
                  </a>
                  <span className="text-[10px] text-amber-300 block mt-0.5">📍 View on Google Maps</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    'अभ्यासिका केंद्र व ग्रंथालय: सकाळी ५:०० ते रात्री ११:००',
                    'Library & Study Center: 5:00 AM – 11:00 PM'
                  )}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    '२४ तास (परवानगीने)',
                    '24 hours by permission'
                  )}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/918788589897?text=${encodeURIComponent(
                  language === 'mr'
                    ? "नमस्कार MSR's Academy, मला प्रवेश आणि सेवांबाबत माहिती हवी आहे."
                    : "Hello MSR's Academy, I want to inquire about admissions / services."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('व्हॉट्सअ‍ॅप: 8788589897', 'WhatsApp: 8788589897')}</span>
              </a>

              <button
                onClick={() => onOpenInquiry()}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-xs"
              >
                {t('प्रवेश घ्या / जागा बुक करा', 'Get Admission / Book Seat')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} MSR's Academy. {t('सर्व हक्क राखीव.', 'All Rights Reserved.')}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Ambedkar Library')}</span>
            <span>·</span>
            <span>{t('तपोरत्न अभ्यासिका केंद्र', 'Taporatna Study Center')}</span>
            <span>·</span>
            <span>{t('मशाळे कृषी ड्रोन', 'Mashale Agri Drone')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
