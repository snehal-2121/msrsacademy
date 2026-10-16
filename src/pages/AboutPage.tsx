import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  GraduationCap, 
  Sprout, 
  Calendar, 
  Compass 
} from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AboutPageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/70 pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← {t('मुख्य पानावर परत जा', 'Back to Home Page')}</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            <span>Home</span> <span className="mx-1">/</span> <span className="text-slate-900 font-bold">About us &amp; How It Started</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-10">
        
        {/* Page Top Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{t('आमच्याबद्दल व कार्याची सुरुवात', 'About Us & How It Started')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            MSR's Academy &amp; Team
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t(
              'होतगी (सोलापूर) - शैक्षणिक क्रांती, महिला सक्षमीकरण आणि शाश्वत कृषी चळवळ',
              'Hotgi, Solapur - Educational Transformation, Women Empowerment & Sustainable Agriculture'
            )}
          </p>
        </div>

        {/* 1. About us. */}
        <div id="about-us-section" className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-slate-200 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <span className="w-3 h-3 rounded-full bg-blue-900 shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              About us.
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
              <p>
                We are the team trying to doing revolutionary things &amp; educational of all field and woman empowerment by providing safe, healthy environment &amp; opportunities for quality study.
              </p>
            </div>

            <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
              <p>
                We guide the aspirants who wants to serve the humanity, sociaty &amp; Ultimately to the Nation of India by themeselves by becoming the civil servants.
              </p>
            </div>

            <div className="bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
              <p>
                We trying to build the carreer &amp; to shape future of such aspirants from early educational age.
              </p>
            </div>
          </div>
        </div>

        {/* 2. How it is Started ? */}
        <div id="how-it-started-section" className="bg-white rounded-3xl p-7 sm:p-10 shadow-md border-2 border-amber-200/90 scroll-mt-28">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <span className="w-3 h-3 rounded-full bg-amber-600 shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              How it is Started ?
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                <span>{t('२०१८-२०१९: पायाभरणी व ग्रामीण गरज', '2018-2019: Foundation & Rural Need')}</span>
              </div>
              <p>
                We are MSR's Academy &amp; team its foundation was leid in the year 2020 in small village called Hotgi, solapur in rural area. but actual ground work was started from 2018-19 &amp; later its some what increased in pandemic period 2020. to provide academic guidence to school students. to rise the standard of education for those students who are under privileged financial poor and not getting quality educational.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>{t('२०२०-२०२४: कोरोना काळातील अविरत सेवा', '2020-2024: Pandemic Resilience')}</span>
              </div>
              <p>
                From 2020 even there was Covid-19 global pandemic period we were working for better upliftment of educational in rural area with certain extent of aim &amp; mission but no clarity about name &amp; logo this work continued upto 2024 untill then we didn't had clear vision about our mission, what exactly to do that for ? How it can be done ? but we didn't stopped our work. we kept moving forward.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t('२०२४: सुस्पष्ट दिशा, ध्येय व अधिकृत ओळख', '2024: Clear Roadmap & Official Identity')}</span>
              </div>
              <p>
                Then discussed, planned &amp; decided how things can be done in proper, well managed way having specific goal, aims with clear mindset, with proper roadmap.
              </p>
              <p className="mt-2">
                Then we came across of our official identity as MSR's Academy &amp; team along with it we put the efforts for quality &amp; effective efforts by opening our:
              </p>
            </div>

            {/* Prominent Highlighting of Two Wings */}
            <div className="my-6 py-6 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-50 via-amber-50/60 to-blue-50 border-2 border-blue-200 text-center space-y-2 shadow-xs">
              <div className="text-xl sm:text-2xl font-extrabold font-serif text-blue-950">
                Dr Babasaheb Ambedkar library (ग्रंथालय)
              </div>
              <div className="text-base sm:text-lg font-bold text-amber-800 font-serif">
                &amp;
              </div>
              <div className="text-xl sm:text-2xl font-extrabold font-serif text-amber-950">
                Taporatn Abhyasika (study center)
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
              <p className="font-medium">
                In April 2024, 132th birth Anniversary of Dr. Babasaheb Ambedkar and 94th birth anniversary of Taporatn Yogirajendra Shivacharya Mahaswamiji.
              </p>
              <p className="font-semibold text-amber-900">
                The Abhyasika specially runs for the girls, by the girls for better upliftment of future woman empowerment in rural area.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Vision & Mission. */}
        <div id="vision-mission-section" className="bg-white rounded-3xl p-7 sm:p-10 shadow-md border border-slate-200">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <span className="w-3 h-3 rounded-full bg-blue-900 shrink-0" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-900">
              Vission &amp; Mission.
            </h2>
          </div>

          <div className="space-y-8">
            {/* Educational field :- */}
            <div className="bg-gradient-to-br from-blue-50/50 to-white p-6 sm:p-7 rounded-2xl border border-blue-200/80 shadow-2xs">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-blue-950 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-800" />
                <span>Educational field :-</span>
              </h3>
              <ul className="space-y-3 pl-4 sm:pl-6 text-sm sm:text-base text-slate-700 leading-relaxed list-disc marker:text-blue-900">
                <li>
                  To Work for humanity without any descrimination on basis of gender, religion, cast, economically &amp; social prospective
                </li>
                <li>
                  specially work for upliftment of woman empowerment in rural area. provide quality &amp; better educational environment to build career of girls by providing library facility &amp; guidence.
                </li>
                <li>
                  To support under privileged, economically poor students to getting there educational needs.
                </li>
                <li>
                  It is a social movement for the girls by the girls for social, educational &amp; economical empowerment of girls.
                </li>
                <li>
                  To make every aspect of society to stand on their feet by their own in rural area.
                </li>
                <li>
                  The ultimate Aim is to serve the Nation of India by becoming part of it through civil services.
                </li>
              </ul>
            </div>

            {/* Agricultural field. */}
            <div className="bg-gradient-to-br from-emerald-50/50 to-white p-6 sm:p-7 rounded-2xl border border-emerald-200/80 shadow-2xs">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-emerald-950 mb-4 flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-800" />
                <span>Agricultural field.</span>
              </h3>
              <ul className="space-y-3 pl-4 sm:pl-6 text-sm sm:text-base text-slate-700 leading-relaxed list-disc marker:text-emerald-800">
                <li>
                  To work for sustainable, affordable agriculture
                </li>
                <li>
                  Reducing production side cost. like labour, spray, manpower etc.
                </li>
                <li>
                  Providing drone spray for spraying of pesticide insecticide, tonic for various crops.
                </li>
                <li>
                  increasing yeild per hector by proper crop management.
                </li>
                <li>
                  providing various agricultural services.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
