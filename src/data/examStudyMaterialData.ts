export interface NodeStudyMaterial {
  nodeId: string;
  examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb';
  title: string;
  marathiTitle: string;
  subtitle: string;
  marathiSubtitle: string;
  overview: string;
  marathiOverview: string;
  childNodes?: {
    nodeId: string;
    label: string;
    marathiLabel: string;
    badge: string;
  }[];
  syllabusTopics: {
    unit: string;
    marathiUnit: string;
    topics: string[];
    marathiTopics: string[];
    weightage: string;
  }[];
  referenceBooks: {
    book: string;
    author: string;
    purpose: string;
    marathiPurpose: string;
  }[];
  keyNotes: {
    heading: string;
    marathiHeading: string;
    points: string[];
    marathiPoints: string[];
  }[];
  practiceMCQs: {
    question: string;
    marathiQuestion: string;
    options: string[];
    marathiOptions: string[];
    correctIndex: number;
    explanation: string;
    marathiExplanation: string;
  }[];
}

export const EXAM_NODE_MATERIALS: Record<string, NodeStudyMaterial> = {
  // =========================================================================
  // MPSC NODES
  // =========================================================================
  'mpsc-gazetted': {
    nodeId: 'mpsc-gazetted',
    examId: 'mpsc',
    title: 'Gazetted Group A & Group B (Rajyaseva)',
    marathiTitle: 'राजपत्रित गट-अ व गट-ब (राज्यसेवा परीक्षा)',
    subtitle: 'Deputy Collector, DSP / ACP, Tehsildar, BDO, ARTO & Class-1 Cadres',
    marathiSubtitle: 'उपजिल्हाधिकारी, पोलीस उपाधीक्षक (DSP), तहसीलदार, गट विकास अधिकारी (BDO) व वर्ग-१ पदे',
    overview: 'The MPSC State Services (Rajyaseva) exam is the premier civil services examination of Maharashtra, recruiting Class-I and Class-II Gazetted officers across Revenue, Police, Rural Development, Finance, and Transport departments.',
    marathiOverview: 'महाराष्ट्र लोकसेवा आयोगाची राज्यसेवा परीक्षा ही राज्यातील सर्वोच्च प्रशासकीय परीक्षा असून यामार्फत महसूल, पोलीस, ग्रामविकास, वित्त व परिवहन विभागातील वर्ग-१ व वर्ग-२ ची राजपत्रित पदे भरली जातात.',
    childNodes: [
      { nodeId: 'mpsc-gazetted-syllabus', label: 'Syllabus (अभ्यासक्रम)', marathiLabel: 'Syllabus (राजपत्रित अभ्यासक्रम)', badge: 'Curriculum' },
      { nodeId: 'mpsc-gazetted-posts', label: 'Post (राजपत्रित पदे)', marathiLabel: 'Post (राजपत्रित पदे व अधिकार)', badge: '24+ Cadres' },
      { nodeId: 'mpsc-gazetted-pattern', label: 'Exam Pattern (परीक्षा स्वरूप)', marathiLabel: 'Exam Pattern (परीक्षा पद्धती)', badge: '3 Stages' },
      { nodeId: 'mpsc-prelims', label: 'Prelims (पूर्व परीक्षा)', marathiLabel: 'Prelims (पूर्व परीक्षा)', badge: '400 Marks' },
      { nodeId: 'mpsc-mains', label: 'Mains (मुख्य परीक्षा)', marathiLabel: 'Mains (मुख्य परीक्षा)', badge: '1250 Marks' },
      { nodeId: 'mpsc-interview', label: 'Interview (मुलाखत)', marathiLabel: 'Interview (मुलाखत)', badge: '175 Marks' },
    ],
    syllabusTopics: [
      {
        unit: 'History of India & Maharashtra',
        marathiUnit: 'भारत आणि विशेषतः महाराष्ट्राचा इतिहास',
        topics: ['1857 Uprising & Social Reformers of Maharashtra (Phule, Shahu, Ambedkar)', 'Indian National Movement (1885–1947)', 'Samyukta Maharashtra Movement'],
        marathiTopics: ['महाराष्ट्रातील समाजसुधारक (फुले, शाहू, आंबेडकर, कर्वे)', 'भारतीय राष्ट्रीय चळवळ (१८८५ ते १९४७)', 'संयुक्त महाराष्ट्र चळवळ व निर्मिती'],
        weightage: '15–18 Qs in Prelims'
      },
      {
        unit: 'Geography of Maharashtra, India & World',
        marathiUnit: 'महाराष्ट्र, भारत व जगाचा भूगोल',
        topics: ['Physiography of Maharashtra: Sahyadri, Tapi-Purna, Godavari & Krishna Basins', 'Monsoon System, Climate, Soils & Minerals in Maharashtra', 'Census 2011 & Migration'],
        marathiTopics: ['महाराष्ट्राची प्राकृतिक रचना: कोकण, सह्याद्री व पठार', 'गोदावरी, कृष्णा, भीमा व तापी नदी खोरे', 'हवामान, मृदा, खनिज संपत्ती व जनगणना २०११'],
        weightage: '15 Qs in Prelims'
      },
      {
        unit: 'Indian Polity & Governance',
        marathiUnit: 'भारतीय राज्यघटना, प्रशासन व पंचायत राज',
        topics: ['Fundamental Rights, DPSP, Constitutional Amendments', 'Parliament, State Legislature, Governor & Chief Minister', '73rd & 74th Amendments: Zilla Parishad, Panchayat Samiti & Gram Panchayat'],
        marathiTopics: ['मूलभूत हक्क, मार्गदर्शक तत्त्वे व घटनादुरुस्त्या', 'संसद, राज्य विधिमंडळ, राज्यपाल व मुख्यमंत्री', '७३ वी व ७४ वी घटनादुरुस्ती: त्रिस्तरीय पंचायत राज व्यवस्था'],
        weightage: '15 Qs in Prelims'
      }
    ],
    referenceBooks: [
      { book: 'इतिहास (History)', author: 'Bipin Chandra, Satish Chandra, Belhekar/Grover, Samadhan Mahajan, Romila Thapar etc.', purpose: 'Core reference for Modern India & Maharashtra History', marathiPurpose: 'महाराष्ट्राचा इतिहास व समाजसुधारक सखोल अभ्यासासाठी' },
      { book: 'Indian Polity (भारतीय राज्यव्यवस्था)', author: 'M.Laxmikanth, Ranjan Kolambe, Kishore Lavate, Tukaram Jadhav etc.', purpose: 'Complete Constitutional framework & Governance', marathiPurpose: 'भारतीय राज्यघटना व राजकीय व्यवस्थेचे प्रमाणित पुस्तक' },
      { book: 'भूगोल (Geography)', author: 'Majid Hussain, A.B.Savadi, GC Leong etc.', purpose: 'Detailed river basins, physiography & districts of Maharashtra', marathiPurpose: 'महाराष्ट्राचा प्राकृतिक व आर्थिक भूगोल' },
      { book: 'भारतीय अर्थव्यवस्था (Economics)', author: 'Kiran Desale, Ranjan Kolambe, Ramesh Singh, Datta and Sundaram etc.', purpose: 'Five-year plans, banking, budget & sustainable development', marathiPurpose: 'पंचवार्षिक योजना, बँकिंग, अर्थसंकल्प व शाश्वत विकास' },
      { book: 'सामान्य विज्ञान (General Science)', author: 'Dr. Sachin Bhaske, Anil Kolte (डॉ. सचिन भस्के, अनिल कोलते)', purpose: 'Physics, Chemistry, Biology & Hygiene for MPSC', marathiPurpose: 'भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र व आरोग्यशास्त्र परिपूर्ण तयारी' }
    ],
    keyNotes: [
      {
        heading: 'Quick Revision Notes: Maharashtra River Systems',
        marathiHeading: 'महत्त्वाच्या नोट्स: महाराष्ट्रातील नदी प्रणाली',
        points: [
          'Godavari is the largest river basin in Maharashtra covering ~49% of state area (Length in MH: 668 km).',
          'Krishna river originates at Mahabaleshwar (Satara); major tributaries are Koyna, Panchganga, Bhima, and Yerla.',
          'Tapi and Narmada are major west-flowing rivers flowing through rift valleys into the Arabian Sea.'
        ],
        marathiPoints: [
          'गोदावरी नदीचे खोरे महाराष्ट्रातील सर्वात मोठे खोरे असून राज्याचे सुमारे ४९% क्षेत्र व्यापते (महाराष्ट्रातील लांबी: ६६८ किमी).',
          'कृष्णा नदीचा उगम महाबळेश्वर (सातारा) येथे होतो; कोयना, पंचगंगा, भीमा व येरळा या प्रमुख उपनद्या आहेत.',
          'तापी व नर्मदा या खचदरीतून पश्चिमेकडे वाहणाऱ्या प्रमुख नद्या आहेत.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Who founded the "Satyashodhak Samaj" on 24 September 1873 in Pune?',
        marathiQuestion: '२४ सप्टेंबर १८७३ रोजी पुण्यात "सत्यशोधक समाजाची" स्थापना कोणी केली?',
        options: ['Mahatma Jyotirao Phule', 'Rajarshi Shahu Maharaj', 'Gopal Ganesh Agarkar', 'Maharshi Vitthal Ramji Shinde'],
        marathiOptions: ['महात्मा ज्योतिराव फुले', 'राजर्षी शाहू महाराज', 'गोपाळ गणेश आगरकर', 'महर्षी विठ्ठल रामजी शिंदे'],
        correctIndex: 0,
        explanation: 'Mahatma Jyotirao Phule founded the Satyashodhak Samaj on 24 Sept 1873 for social equity and education of underprivileged sections.',
        marathiExplanation: 'बहुजन समाजाच्या शिक्षणासाठी व सामाजिक समतेसाठी महात्मा ज्योतिराव फुले यांनी २४ सप्टेंबर १८७३ रोजी पुण्यात सत्यशोधक समाजाची स्थापना केली.'
      },
      {
        question: 'Which Constitutional Amendment granted constitutional status to Panchayati Raj Institutions?',
        marathiQuestion: 'कोणत्या घटनादुरुस्तीने पंचायत राज संस्थांना घटनात्मक दर्जा प्राप्त झाला?',
        options: ['42nd Amendment', '73rd Amendment', '74th Amendment', '86th Amendment'],
        marathiOptions: ['४२ वी घटनादुरुस्ती', '७३ वी घटनादुरुस्ती', '७४ वी घटनादुरुस्ती', '८६ वी घटनादुरुस्ती'],
        correctIndex: 1,
        explanation: 'The 73rd Constitutional Amendment Act, 1992 added Part IX and the 11th Schedule (29 subjects) to the Constitution.',
        marathiExplanation: '७३ व्या घटनादुरुस्ती कायदा १९९२ नुसार राज्यघटनेत भाग ९ आणि ११ वे परिशिष्ट (२९ विषय) समाविष्ट करण्यात आले.'
      }
    ]
  },

  'mpsc-gazetted-syllabus': {
    nodeId: 'mpsc-gazetted-syllabus',
    examId: 'mpsc',
    title: 'MPSC Gazetted Complete Syllabus (Prelims + Mains)',
    marathiTitle: 'MPSC राज्यसेवा संपूर्ण अभ्यासक्रम (पूर्व व मुख्य परीक्षा)',
    subtitle: 'Official Topic-by-Topic Breakdown for State Services',
    marathiSubtitle: 'राज्यसेवा पूर्व परीक्षा (GS + CSAT) आणि मुख्य परीक्षा सविस्तर अभ्यासक्रम',
    overview: 'The Gazetted State Services syllabus tests both conceptual depth and analytical writing across General Studies (GS 1 to 4), Marathi & English languages, and Essay (Total 7 Papers, 1250 Merit Marks).',
    marathiOverview: 'राज्यसेवा परीक्षेचा अभ्यासक्रम पूर्व परीक्षेतील वस्तुनिष्ठ सामान्य अध्ययन व सीसॅट आणि मुख्य परीक्षेतील वर्णनात्मक ७ पेपर्सवर आधारित आहे.',
    childNodes: [
      { nodeId: 'mpsc-prelims-gs1', label: 'GS-I Paper Syllabus', marathiLabel: 'GS-I सामान्य अध्ययन पेपर-१', badge: '200 Marks' },
      { nodeId: 'mpsc-prelims-csat', label: 'CSAT Paper-II Syllabus', marathiLabel: 'CSAT पेपर-२ अभ्यासक्रम', badge: 'Qualifying' },
      { nodeId: 'mpsc-mains', label: 'Mains Syllabus (GS 1-4)', marathiLabel: 'मुख्य परीक्षा अभ्यासक्रम', badge: '1250 Marks' },
    ],
    syllabusTopics: [
      {
        unit: 'Prelims Paper-I: General Studies (200 Marks, 100 Qs)',
        marathiUnit: 'पूर्व परीक्षा पेपर-१: सामान्य अध्ययन (२०० गुण, १०० प्रश्न)',
        topics: [
          '1. Current Events of State, National and International Importance',
          '2. History of India (with special reference to Maharashtra) and Indian National Movement',
          '3. Maharashtra, India and World Geography - Physical, Social, Economic Geography',
          '4. Maharashtra and India - Polity and Governance: Constitution, Political System, Panchayati Raj',
          '5. Economic and Social Development: Sustainable Development, Poverty, Inclusion, Demographics',
          '6. General Issues on Environmental Ecology, Biodiversity and Climate Change',
          '7. General Science (Physics, Chemistry, Biology & Hygiene)'
        ],
        marathiTopics: [
          '१. राज्य, राष्ट्रीय आणि आंतरराष्ट्रीय पातळीवरील महत्त्वाच्या चालू घडामोडी',
          '२. भारताचा (विशेषतः महाराष्ट्राचा) इतिहास आणि भारतीय राष्ट्रीय चळवळ',
          '३. महाराष्ट्र, भारत व जगाचा भूगोल - प्राकृतिक, सामाजिक व आर्थिक भूगोल',
          '४. महाराष्ट्र व भारत - राज्यव्यवस्था व शासन: राज्यघटना, पंचायत राज, लोकधोरण',
          '५. आर्थिक व सामाजिक विकास: शाश्वत विकास, दारिद्र्य निर्मूलन, समावेशन, लोकसंख्याशास्त्र',
          '६. पर्यावरणीय परिस्थितीकी, जैवविविधता आणि हवामान बदल',
          '७. सामान्य विज्ञान (भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र व आरोग्यशास्त्र)'
        ],
        weightage: '200 Marks (2 Hours)'
      },
      {
        unit: 'Mains Examination: 7 Papers Structure (1250 Merit Marks)',
        marathiUnit: 'मुख्य परीक्षा: एकूण ७ पेपर्सची रचना (१२५० गुणवत्ता गुण)',
        topics: [
          'Qualifying Paper A: Marathi Language (300 Marks) & Paper B: English Language (300 Marks)',
          'Paper I: Essay (निबंध लेखन - 250 Marks)',
          'Paper II (GS-1): Indian Heritage, Culture, History & Geography of the World and Society (250 Marks)',
          'Paper III (GS-2): Governance, Constitution, Polity, Social Justice and International Relations (250 Marks)',
          'Paper IV (GS-3): Technology, Economic Development, Agriculture, Biodiversity, Security & Disaster Management (250 Marks)',
          'Paper V (GS-4): Ethics, Integrity and Aptitude (250 Marks)'
        ],
        marathiTopics: [
          'पात्रता पेपर अ: मराठी भाषा (३०० गुण) व पेपर ब: इंग्रजी भाषा (३०० गुण - २५% पात्रता)',
          'पेपर १: निबंध लेखन (२५० गुण)',
          'पेपर २ (GS-1): भारतीय वारसा, संस्कृती, इतिहास व भूगोल (२५० गुण)',
          'पेपर ३ (GS-2): शासन, राज्यघटना, सामाजिक न्याय व आंतरराष्ट्रीय संबंध (२५० गुण)',
          'पेपर ४ (GS-3): अर्थशास्त्र, कृषी, विज्ञान-तंत्रज्ञान, पर्यावरण व अंतर्गत सुरक्षा (२५० गुण)',
          'पेपर ५ (GS-4): नीतीशास्त्र, सत्यनिष्ठा व अभियोग्यता (२५० गुण)'
        ],
        weightage: '1250 Merit Marks'
      }
    ],
    referenceBooks: [
      { book: 'State Board Textbooks (Std 6th to 12th)', author: 'Balbharati (बालभारती)', purpose: 'Foundation for History, Geography & Science', marathiPurpose: 'इतिहास, भूगोल व विज्ञानाच्या मूलभूत संकल्पनांसाठी' },
      { book: 'सामान्य विज्ञान (General Science)', author: 'डॉ. सचिन भस्के (Dr. Sachin Bhaske)', purpose: 'Biology, Physics, Chemistry for Prelims', marathiPurpose: 'पूर्व परीक्षेसाठी सामान्य विज्ञानाची परिपूर्ण तयारी' },
      { book: 'पर्यावरण व परिस्थितीकी (Environment)', author: 'तुषार घोरपडे (Tushar Ghorpade)', purpose: 'Biodiversity, climate change, national parks of Maharashtra', marathiPurpose: 'पर्यावरण, राष्ट्रीय उद्याने व जैवविविधता' }
    ],
    keyNotes: [
      {
        heading: 'How to Decode the Syllabus Effectively',
        marathiHeading: 'अभ्यासक्रमाचे अचूक विश्लेषण कसे करावे?',
        points: [
          'Keep a printed copy of the syllabus on your study desk at all times.',
          'Start with Maharashtra State Board (Std 6–12) and NCERT books before reading reference guides.',
          'Solve the last 10 years of MPSC Prelims question papers topic-by-topic.'
        ],
        marathiPoints: [
          'अभ्यासाच्या टेबलावर नेहमी अधिकृत अभ्यासक्रमाची प्रिंट ठेवावी.',
          'मोठे संदर्भ ग्रंथ वाचण्यापूर्वी इयत्ता ६ वी ते १२ वी ची स्टेट बोर्ड व NCERT पुस्तके पूर्ण करावीत.',
          'मागील १० वर्षांच्या आयोगाच्या प्रश्नपत्रिकांचे घटकनिहाय विश्लेषण करावे.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'How many marks are required to qualify in the MPSC Prelims CSAT (Paper-II)?',
        marathiQuestion: 'MPSC राज्यसेवा पूर्व परीक्षेत CSAT (पेपर-२) पात्र होण्यासाठी किमान किती गुण आवश्यक असतात?',
        options: ['50 Marks (25%)', '66 Marks (33%)', '80 Marks (40%)', '100 Marks (50%)'],
        marathiOptions: ['५० गुण (२५%)', '६६ गुण (३३%)', '८० गुण (४०%)', '१०० गुण (५०%)'],
        correctIndex: 1,
        explanation: 'CSAT Paper-II is of 200 marks and requires 33% (66 marks) to qualify so that GS Paper-I is evaluated for merit.',
        marathiExplanation: 'CSAT पेपर-२ हा २०० गुणांचा असून त्यामध्ये किमान ३३% म्हणजेच ६६ गुण मिळवणे पात्रतेसाठी आवश्यक आहे.'
      }
    ]
  },

  'mpsc-gazetted-posts': {
    nodeId: 'mpsc-gazetted-posts',
    examId: 'mpsc',
    title: 'Gazetted Class-1 & Class-2 Posts & Cadres',
    marathiTitle: 'राजपत्रित गट-अ आणि गट-ब मधील प्रमुख पदे व अधिकार',
    subtitle: 'Complete List of Administrative & Executive Posts under MPSC Rajyaseva',
    marathiSubtitle: 'राज्यसेवा परीक्षेमार्फत भरली जाणारी वर्ग-१ आणि वर्ग-२ ची सर्वोच्च पदे',
    overview: 'Officers selected through MPSC State Services lead district and taluka administration, law enforcement, revenue collection, and rural development schemes across Maharashtra.',
    marathiOverview: 'राज्यसेवेमार्फत निवड झालेले अधिकारी जिल्हा व तालुका प्रशासन, कायदा व सुव्यवस्था, महसूल आणि ग्रामीण विकास योजनांचे नेतृत्व करतात.',
    syllabusTopics: [
      {
        unit: 'Group-A (Class-I) Super-Time Administrative Cadres',
        marathiUnit: 'गट-अ (वर्ग-१) सर्वोच्च राजपत्रित पदे',
        topics: [
          'Deputy Collector (उपजिल्हाधिकारी) — Sub-Divisional Magistrate (SDM), Revenue & District Administration',
          'Deputy Superintendent of Police (DySP / ACP) — Law & Order, Crime Investigation & Police Leadership',
          'Assistant Commissioner of State Tax (सहाय्यक राज्य कर आयुक्त - GST)',
          'Block Development Officer (BDO Group-A) — Chief Executive of Panchayat Samiti',
          'Tehsildar (तहसीलदार) — Taluka Executive Magistrate & Revenue Head',
          'Deputy Chief Executive Officer (Dy. CEO) — Zilla Parishad Administration',
          'Deputy Registrar Cooperative Societies (उपनिबंधक सहकारी संस्था)'
        ],
        marathiTopics: [
          'उपजिल्हाधिकारी (Deputy Collector) — प्रांत अधिकारी (SDM), महसूल व निवडणूक प्रशासन प्रमुख',
          'पोलीस उपाधीक्षक (DySP / ACP) — उपविभागीय पोलीस अधिकारी, कायदा व सुव्यवस्था',
          'सहाय्यक राज्य कर आयुक्त (Assistant Commissioner of State Tax - GST)',
          'तहसीलदार (Tehsildar) — तालुका दंडाधिकारी व तालुका महसूल प्रमुख',
          'गट विकास अधिकारी (BDO गट-अ) — पंचायत समिती प्रशासन व ग्रामीण विकास प्रमुख',
          'उपमुख्य कार्यकारी अधिकारी (Dy. CEO) — जिल्हा परिषद प्रशासन',
          'सहाय्यक प्रादेशिक परिवहन अधिकारी (ARTO) — परिवहन विभाग'
        ],
        weightage: 'Pay Level S-20 (₹56,100 – ₹1,77,500)'
      },
      {
        unit: 'Group-B (Class-II) Gazetted Cadres',
        marathiUnit: 'गट-ब (वर्ग-२) राजपत्रित पदे',
        topics: [
          'Naib Tehsildar (नायब तहसीलदार) — Taluka Revenue & Executive Magisterial Duties',
          'Section Officer (कक्ष अधिकारी - मंत्रालय)',
          'Sub-Registrar Cooperative Societies',
          'Taluka Inspector of Land Records (TILR - भूमि अभिलेख)'
        ],
        marathiTopics: [
          'नायब तहसीलदार (Naib Tehsildar) — महसूल व दंडाधिकारी कार्ये',
          'कक्ष अधिकारी (Section Officer) — मंत्रालय व प्रशासन',
          'सहाय्यक गट विकास अधिकारी (ABDO गट-ब)',
          'भुमि अभिलेख अधीक्षक / निरीक्षक'
        ],
        weightage: 'Pay Level S-15 to S-16'
      }
    ],
    referenceBooks: [
      { book: 'महाराष्ट्र शासन प्रशासन व्यवस्था', author: 'रंजन कोळंबे', purpose: 'Understanding duties and hierarchy of District Collector, SDM, Tehsildar & BDO', marathiPurpose: 'जिल्हाधिकारी, उपजिल्हाधिकारी, तहसीलदार व BDO यांची कार्ये समजून घेण्यासाठी' }
    ],
    keyNotes: [
      {
        heading: 'Eligibility & Physical Standards (for DySP)',
        marathiHeading: 'पात्रता व शारीरिक निकष (विशेषतः DySP पदासाठी)',
        points: [
          'Educational Qualification: Any Degree from a recognized University (Final year students can apply for Prelims).',
          'Age Limit: 19 to 38 years for Open category (up to 43 years for Reserved categories).',
          'For DySP/ACP: Minimum Height 165 cm (Men) and 157 cm (Women).'
        ],
        marathiPoints: [
          'शैक्षणिक पात्रता: मान्यताप्राप्त विद्यापीठाची कोणतीही पदवी (अंतिम वर्षाचे विद्यार्थी पूर्व परीक्षेस पात्र).',
          'वयोमर्यादा: खुल्या प्रवर्गासाठी १९ ते ३८ वर्षे (मागासवर्गीय प्रवर्गासाठी ४३ वर्षांपर्यंत).',
          'DySP पदासाठी उंची: पुरुष किमान १६५ सें.मी., महिला किमान १५७ सें.मी.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Who acts as the Executive Magistrate at the Taluka level in Maharashtra?',
        marathiQuestion: 'महाराष्ट्रात तालुका स्तरावर कार्यकारी दंडाधिकारी (Executive Magistrate) म्हणून कोण कार्य पाहतात?',
        options: ['Block Development Officer', 'Tehsildar', 'Gramsevak', 'Extension Officer'],
        marathiOptions: ['गट विकास अधिकारी (BDO)', 'तहसीलदार (Tehsildar)', 'ग्रामसेवक', 'विस्तार अधिकारी'],
        correctIndex: 1,
        explanation: 'The Tehsildar is the Taluka Executive Magistrate and heads the revenue administration of the taluka.',
        marathiExplanation: 'तहसीलदार हे तालुक्याचे कार्यकारी दंडाधिकारी व महसूल प्रमुख असतात.'
      }
    ]
  },

  'mpsc-nongazetted': {
    nodeId: 'mpsc-nongazetted',
    examId: 'mpsc',
    title: 'Non-Gazetted Group B & Group C Separate Exam',
    marathiTitle: 'अराजपत्रित स्वतंत्र गट-ब आणि गट-क परीक्षा (Separate Exam)',
    subtitle: 'PSI, STI, ASO, Excise SI & Tax Assistant Complete Guide',
    marathiSubtitle: 'पोलीस उपनिरीक्षक (PSI), राज्य कर निरीक्षक (STI), सहायक कक्ष अधिकारी (ASO) व कर सहायक',
    overview: 'The MPSC Separate Non-Gazetted Examination is a popular competitive exam in Maharashtra, featuring a Preliminary Exam (100 Marks) for Group-B and Group-C posts, followed by Mains Exams.',
    marathiOverview: 'महाराष्ट्रातील लाखो विद्यार्थ्यांची पसंती असलेली स्वतंत्र गट-ब व गट-क परीक्षा! यामध्ये सर्व पदांसाठी १०० गुणांची स्वतंत्र पूर्व परीक्षा होते व त्यानंतर ४०० गुणांची मुख्य परीक्षा घेतली जाते.',
    childNodes: [
      { nodeId: 'mpsc-nongazetted-syllabus', label: 'Syllabus (अभ्यासक्रम)', marathiLabel: 'Syllabus (गट-ब व क अभ्यासक्रम)', badge: '8 Subjects' },
      { nodeId: 'mpsc-nongazetted-posts', label: 'Posts (प्रमुख पदे)', marathiLabel: 'Posts (PSI, STI, ASO)', badge: 'High Vacancy' },
      { nodeId: 'mpsc-nongazetted-pattern', label: 'Pattern (परीक्षा पद्धत)', marathiLabel: 'Pattern (पूर्व + मुख्य रचना)', badge: '100 + 400 Marks' },
      { nodeId: 'mpsc-combined-prelims', label: 'Prelim (स्वतंत्र पूर्व परीक्षा)', marathiLabel: 'Prelim (१०० गुण पूर्व परीक्षा)', badge: '60 Mins' },
      { nodeId: 'mpsc-combined-mains', label: 'Main (मुख्य परीक्षा)', marathiLabel: 'Main (४०० गुण मुख्य परीक्षा)', badge: 'Paper 1 & 2' },
    ],
    syllabusTopics: [
      {
        unit: 'Separate Prelims (100 Questions, 100 Marks, 60 Minutes)',
        marathiUnit: 'स्वतंत्र पूर्व परीक्षा (१०० प्रश्न, १०० गुण, १ तास वेळ)',
        topics: [
          '1. Current Affairs (Global, National & Maharashtra) — 15 Qs',
          '2. Civics / Indian Polity & Gram Prashasan — 10 to 12 Qs',
          '3. Modern History of India & Maharashtra — 15 Qs',
          '4. Geography of Maharashtra & India — 15 Qs',
          '5. Indian Economy (National Income, Agriculture, Budget, Poverty) — 15 Qs',
          '6. General Science (Physics, Chemistry, Zoology, Botany, Hygiene) — 15 Qs',
          '7. Arithmetic & Logical Reasoning (अंकगणित व बुद्धिमत्ता) — 15 Qs'
        ],
        marathiTopics: [
          '१. चालू घडामोडी (जागतिक, भारतातील व महाराष्ट्रातील) — १५ प्रश्न',
          '२. नागरिकशास्त्र (भारताच्या घटनेचा प्राथमिक अभ्यास, राज्य व ग्रामीण प्रशासन) — १०-१२ प्रश्न',
          '३. आधुनिक भारताचा विशेषतः महाराष्ट्राचा इतिहास — १५ प्रश्न',
          '४. महाराष्ट्राचा व भारताचा भूगोल — १५ प्रश्न',
          '५. अर्थव्यवस्था (राष्ट्रीय उत्पन्न, शेती, उद्योग, परकीय व्यापार, बँकिंग, अर्थसंकल्प) — १५ प्रश्न',
          '६. सामान्य विज्ञान (भौतिकशास्त्र, रसायनशास्त्र, प्राणिशास्त्र, वनस्पतीशास्त्र, आरोग्यशास्त्र) — १५ प्रश्न',
          '७. बुद्धिमत्ता चाचणी व अंकगणित — १५ प्रश्न'
        ],
        weightage: '100 Marks (1/4 Negative Marking)'
      },
      {
        unit: 'Separate Mains Examination (400 Marks)',
        marathiUnit: 'स्वतंत्र मुख्य परीक्षा (एकूण ४०० गुण)',
        topics: [
          'Paper-1 (200 Marks): Marathi Grammar & Vocabulary (50 Qs / 100 Marks) + English Grammar & Comprehension (50 Qs / 100 Marks)',
          'Paper-2 (200 Marks): General Studies, Intelligence, Maharashtra Geography, History, Constitution,RTI Act & Computer Knowledge (100 Qs / 200 Marks)'
        ],
        marathiTopics: [
          'पेपर-१ (२०० गुण): मराठी व्याकरण व शब्दसंग्रह (५० प्रश्न - १०० गुण) + इंग्रजी व्याकरण व शब्दसंग्रह (५० प्रश्न - १०० गुण)',
          'पेपर-२ (२०० गुण): सामान्य क्षमता चाचणी, महाराष्ट्राचा इतिहास-भूगोल, राज्यघटना, माहितीचा अधिकार व संगणक (१०० प्रश्न - २०० गुण)'
        ],
        weightage: '400 Marks'
      }
    ],
    referenceBooks: [
      { book: 'मराठी व्याकरण (Marathi Grammar)', author: 'मो. रा. वाळिंबे / बाळासाहेब शिंदे (M. R. Walimbe / Balasaheb Shinde)', purpose: '50 out of 50 target in Mains Paper-1 Marathi', marathiPurpose: 'मुख्य परीक्षेत मराठी व्याकरणात पैकीच्या पैकी गुणांसाठी' },
      { book: 'English Grammar & Vocabulary', author: 'Pal & Suri / Balasaheb Shinde', purpose: 'Mains Paper-1 English Grammar & Previous Year Vocab', marathiPurpose: 'इंग्रजी व्याकरण व शब्दसंग्रहाच्या अचूक तयारीसाठी' },
      { book: 'अंकगणित व बुद्धिमत्ता (Maths & Reasoning)', author: 'सचिन ढवळे / पंढरीनाथ राणे (Sachin Dhawale / Rane)', purpose: 'Speed tricks to solve 15 Qs within 12 minutes in Prelims', marathiPurpose: 'वेळेत गणित व बुद्धिमत्तेचे प्रश्न सोडवण्याच्या शॉर्ट ट्रिक्स' },
      { book: 'चालू घडामोडी (Current Affairs Yearbook)', author: 'सिम्प्लिफाईड / अभिनव / परिक्रमा (Simplified / Parikrama)', purpose: 'Monthly & yearly current affairs coverage', marathiPurpose: 'मासिक व वार्षिक चालू घडामोडींच्या उजळणीसाठी' }
    ],
    keyNotes: [
      {
        heading: '60-Minute Time Management Strategy for Separate Prelims',
        marathiHeading: 'स्वतंत्र पूर्व परीक्षेतील ६० मिनिटांचे सुवर्ण नियोजन',
        points: [
          'In Separate Prelims, you get only 60 minutes for 100 questions (36 seconds per question).',
          'Attempt GS questions (History, Polity, Geography, Science, Economy, Current) in the first 42 minutes (85 questions).',
          'Keep the last 18 minutes strictly for the 15 Maths & Reasoning questions.'
        ],
        marathiPoints: [
          'स्वतंत्र पूर्व परीक्षेत १०० प्रश्नांसाठी फक्त ६० मिनिटे (एका प्रश्नाला ३६ सेकंद) मिळतात.',
          'पहिले ४२ मिनिटे सामान्य अध्ययनाचे ८५ प्रश्न सोडवण्यासाठी राखीव ठेवा.',
          'शेवटची १८ मिनिटे अंकगणित व बुद्धिमत्तेच्या १५ प्रश्नांसाठी वापरा.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'For Police Sub-Inspector (PSI) selection, how many marks are allotted to the Physical Test?',
        marathiQuestion: 'पोलीस उपनिरीक्षक (PSI) निवडीमध्ये मैदानी (शारीरिक) चाचणीसाठी किती गुण असतात?',
        options: ['50 Marks', '100 Marks', '150 Marks', '200 Marks'],
        marathiOptions: ['५० गुण', '१०० गुण', '१५० गुण', '२०० गुण'],
        correctIndex: 1,
        explanation: 'PSI Physical Test carries 100 marks (qualifying 60% marks required for Interview) followed by a 40-mark Interview.',
        marathiExplanation: 'PSI पदासाठी १०० गुणांची शारीरिक चाचणी असते (पात्रतेसाठी किमान ६० गुण आवश्यक) आणि त्यानंतर ४० गुणांची मुलाखत होते.'
      }
    ]
  },

  // =========================================================================
  // UPSC NODES
  // =========================================================================
  'upsc-syllabus': {
    nodeId: 'upsc-syllabus',
    examId: 'upsc',
    title: 'UPSC Civil Services Complete Syllabus (Prelims + Mains)',
    marathiTitle: 'UPSC नागरी सेवा संपूर्ण अभ्यासक्रम (IAS / IPS / IFS)',
    subtitle: 'NCERT Foundation + GS Papers I to IV + Essay + CSAT',
    marathiSubtitle: 'NCERT पायाभूत पुस्तके, सामान्य अध्ययन पेपर्स १ ते ४, निबंध व वैकल्पिक विषय',
    overview: 'The UPSC Civil Services Examination syllabus is designed to assess a candidate’s deep conceptual understanding of India’s heritage, governance, economy, environment, science, and ethical decision-making.',
    marathiOverview: 'केंद्रीय लोकसेवा आयोगाचा (UPSC) अभ्यासक्रम उमेदवाराची मूलभूत संकल्पनांची समज, चालू घडामोडींचे विश्लेषण आणि प्रशासकीय निर्णयक्षमता तपासतो.',
    childNodes: [
      { nodeId: 'upsc-prelims', label: 'Prelims (GS + CSAT)', marathiLabel: 'Prelims (पूर्व परीक्षा)', badge: '400 Marks' },
      { nodeId: 'upsc-mains', label: 'Mains (9 Written Papers)', marathiLabel: 'Mains (मुख्य लेखी परीक्षा)', badge: '1750 Marks' },
      { nodeId: 'upsc-interview', label: 'Interview (Personality Test)', marathiLabel: 'Interview (व्यक्तिमत्त्व चाचणी)', badge: '275 Marks' },
    ],
    syllabusTopics: [
      {
        unit: 'Phase 1: NCERT Foundation (Std 6th to 12th)',
        marathiUnit: 'टप्पा १: NCERT पायाभूत अभ्यासक्रम (इयत्ता ६ वी ते १२ वी)',
        topics: [
          'History: Our Pasts I, II, III & Themes in Indian History (Class 6–12)',
          'Geography: Fundamentals of Physical Geography & India: Physical Environment (Class 11–12)',
          'Polity: Indian Constitution at Work & Political Theory (Class 11)',
          'Economy: Indian Economic Development & Introductory Macroeconomics (Class 11–12)'
        ],
        marathiTopics: [
          'इतिहास: प्राचीन, मध्ययुगीन व आधुनिक भारताचा इतिहास (इयत्ता ६ वी ते १२ वी NCERT)',
          'भूगोल: जगाचा प्राकृतिक भूगोल व भारताचा भूगोल (इयत्ता ११ वी व १२ वी NCERT)',
          'राज्यशास्त्र: भारतीय राज्यघटना व राजकीय सिद्धांत (इयत्ता ११ वी NCERT)',
          'अर्थशास्त्र: भारतीय आर्थिक विकास व स्थूल अर्थशास्त्र (इयत्ता ११ वी व १२ वी NCERT)'
        ],
        weightage: '35–40% Direct & Indirect Questions'
      },
      {
        unit: 'Phase 2: Advanced General Studies (GS-I, GS-II, GS-III, GS-IV)',
        marathiUnit: 'टप्पा २: प्रगत सामान्य अध्ययन (GS पेपर १ ते ४)',
        topics: [
          'GS-I: Indian Art & Culture, Modern & World History, Indian Society & World Geography',
          'GS-II: Indian Constitution, Polity, Social Justice, Governance & International Relations (IR)',
          'GS-III: Indian Economy, Agriculture, Science & Tech, Environment, Disaster Management & Internal Security',
          'GS-IV: Ethics, Integrity, Attitude, Emotional Intelligence & Administrative Case Studies'
        ],
        marathiTopics: [
          'GS-I: भारतीय कला व संस्कृती, आधुनिक व जगाचा इतिहास, भारतीय समाज व भूगोल',
          'GS-II: भारतीय संविधान, शासनप्रणाली, सामाजिक न्याय व आंतरराष्ट्रीय संबंध',
          'GS-III: अर्थव्यवस्था, कृषी, विज्ञान-तंत्रज्ञान, पर्यावरण, आपत्ती व्यवस्थापन व अंतर्गत सुरक्षा',
          'GS-IV: नीतीशास्त्र, सत्यनिष्ठा, भावनिक बुद्धिमत्ता आणि प्रशासकीय केस स्टडीज'
        ],
        weightage: '1000 Marks in Mains (4 × 250)'
      }
    ],
    referenceBooks: [
      { book: 'Indian Polity', author: 'M. Laxmikanth', purpose: 'Bible for UPSC Prelims & GS-II Polity', marathiPurpose: 'राज्यघटना व शासनप्रणालीसाठी सर्वोत्कृष्ट संदर्भ ग्रंथ' },
      { book: 'A Brief History of Modern India (Spectrum)', author: 'Rajiv Ahir', purpose: 'Modern Indian History (1757 to 1947)', marathiPurpose: 'आधुनिक भारताचा इतिहास आणि स्वातंत्र्यलढा' },
      { book: 'Indian Art and Culture', author: 'Nitin Singhania', purpose: 'Architecture, Paintings, Dance & Cultural Heritage', marathiPurpose: 'भारतीय कला, स्थापत्य आणि संस्कृती' },
      { book: 'Certificate Physical and Human Geography', author: 'G. C. Leong', purpose: 'World Climatic Regions & Landforms', marathiPurpose: 'जगाचा प्राकृतिक भूगोल आणि हवामान विभाग' },
      { book: 'Indian Economy', author: 'Ramesh Singh / Vivek Singh', purpose: 'Macroeconomics, Banking, Budget & Economic Survey', marathiPurpose: 'भारतीय अर्थव्यवस्था, बँकिंग व आर्थिक पाहणी अहवाल' }
    ],
    keyNotes: [
      {
        heading: 'Daily Routine of Successful UPSC Aspirants',
        marathiHeading: 'यशस्वी UPSC विद्यार्थ्यांचे दैनंदिन अभ्यास सूत्र',
        points: [
          'Read The Hindu or Indian Express editorial daily for 45–60 minutes and make crisp issue-wise notes.',
          'Practice writing 2 Mains descriptive answers (150/250 words) every single day after finishing basic NCERTs.',
          'Revise each standard book at least 5 times rather than reading 5 different books for one subject.'
        ],
        marathiPoints: [
          'दररोज ४५ ते ६० मिनिटे द हिंदू (The Hindu) किंवा इंडियन एक्सप्रेसचे संपादकीय वाचून मुद्देसूद नोट्स काढाव्यात.',
          'मूलभूत अभ्यास पूर्ण झाल्यावर दररोज किमान २ मुख्य परीक्षेच्या प्रश्नांचा लेखन सराव (Answer Writing) करावा.',
          'एका विषयाची ५ पुस्तके वाचण्यापेक्षा १ प्रमाणित पुस्तक ५ वेळा रिवाईज करावे.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Which Part of the Indian Constitution deals with Fundamental Rights?',
        marathiQuestion: 'भारतीय राज्यघटनेचा कोणता भाग मूलभूत हक्कांशी (Fundamental Rights) संबंधित आहे?',
        options: ['Part II (Articles 5–11)', 'Part III (Articles 12–35)', 'Part IV (Articles 36–51)', 'Part IVA (Article 51A)'],
        marathiOptions: ['भाग २ (कलम ५ ते ११)', 'भाग ३ (कलम १२ ते ३५)', 'भाग ४ (कलम ३६ ते ५१)', 'भाग ४-अ (कलम ५१-अ)'],
        correctIndex: 1,
        explanation: 'Part III (Articles 12 to 35) of the Constitution deals with Fundamental Rights and is described as the Magna Carta of India.',
        marathiExplanation: 'भारतीय राज्यघटनेचा भाग ३ (कलम १२ ते ३५) मूलभूत हक्कांशी संबंधित असून त्याला भारताचा मॅग्ना कार्टा म्हटले जाते.'
      }
    ]
  },

  'upsc-pattern': {
    nodeId: 'upsc-pattern',
    examId: 'upsc',
    title: 'UPSC 3-Stage Examination Pattern (Prelims, Mains & Interview)',
    marathiTitle: 'UPSC त्रिस्तरीय परीक्षा स्वरूप (पूर्व, मुख्य व मुलाखत)',
    subtitle: 'Complete Marks Distribution, Negative Marking & Qualifying Rules',
    marathiSubtitle: 'पूर्व परीक्षा (४०० गुण), मुख्य परीक्षा (१७५० गुण) आणि मुलाखत (२७५ गुण)',
    overview: 'The UPSC CSE is conducted in three sequential stages over one year: Preliminary Examination (Objective MCQ screening), Main Examination (9 Descriptive Written Papers), and Personality Test (Interview).',
    marathiOverview: 'UPSC नागरी सेवा परीक्षा तीन टप्प्यांत घेतली जाते: १) पूर्व परीक्षा (वस्तुनिष्ठ पात्रता चाचणी), २) मुख्य लेखी परीक्षा (१७५० गुण), आणि ३) व्यक्तिमत्त्व चाचणी / मुलाखत (२७५ गुण). अंतिम गुणवत्ता यादी २०२५ गुणांवरून ठरते.',
    childNodes: [
      { nodeId: 'upsc-prelims', label: 'Stage 1: Prelims', marathiLabel: 'टप्पा १: पूर्व परीक्षा', badge: 'Objective' },
      { nodeId: 'upsc-mains', label: 'Stage 2: Mains', marathiLabel: 'टप्पा २: मुख्य परीक्षा', badge: '1750 Marks' },
      { nodeId: 'upsc-interview', label: 'Stage 3: Interview', marathiLabel: 'टप्पा ३: मुलाखत', badge: '275 Marks' },
    ],
    syllabusTopics: [
      {
        unit: 'Stage 1: Prelims (Screening Stage — Marks not counted in Final Merit)',
        marathiUnit: 'टप्पा १: पूर्व परीक्षा (केवळ मुख्य परीक्षेसाठी पात्रता टप्पा)',
        topics: [
          'GS Paper-I: 100 Questions, 200 Marks, 2 Hours (1/3rd Negative Marking) — Determines Cut-off',
          'CSAT Paper-II: 80 Questions, 200 Marks, 2 Hours (Qualifying: Minimum 33% / 66 Marks required)'
        ],
        marathiTopics: [
          'सामान्य अध्ययन पेपर-१ (GS-I): १०० प्रश्न, २०० गुण, २ तास (१/३ निगेटिव्ह मार्किंग) — यावरून कट-ऑफ ठरतो',
          'सीसॅट पेपर-२ (CSAT): ८० प्रश्न, २०० गुण, २ तास (पात्रता चाचणी: किमान ३३% म्हणजे ६६ गुण आवश्यक)'
        ],
        weightage: '400 Marks'
      },
      {
        unit: 'Stage 2 & 3: Mains (1750 Marks) + Interview (275 Marks) = 2025 Total Merit',
        marathiUnit: 'टप्पा २ व ३: मुख्य परीक्षा (१७५० गुण) + मुलाखत (२७५ गुण) = २०२५ गुण',
        topics: [
          'Language Papers A (Marathi/Regional) & B (English): 300 Marks each (Qualifying 25%)',
          'Merit Papers: Essay (250) + GS-I (250) + GS-II (250) + GS-III (250) + GS-IV (250) + Optional I & II (500) = 1750 Marks',
          'Personality Test (Interview at Dholpur House, New Delhi): 275 Marks'
        ],
        marathiTopics: [
          'भाषा पेपर अ (मराठी) व ब (इंग्रजी): प्रत्येकी ३०० गुण (केवळ २५% पात्रता आवश्यक)',
          'गुणवत्ता पेपर्स: निबंध (२५०) + GS-१ ते ४ (१०००) + वैकल्पिक विषय पेपर १ व २ (५००) = १७५० गुण',
          'मुलाखत (धोलपूर हाऊस, नवी दिल्ली): २७५ गुण (मराठीतूनही मुलाखत देता येते!)'
        ],
        weightage: '2025 Final Merit Marks'
      }
    ],
    referenceBooks: [
      { book: '29 Years UPSC Topic-Wise Solved Papers', author: 'Disha Publications (Mrunal Patel)', purpose: 'Understanding exact Prelims & Mains question trends', marathiPurpose: 'मागील २९ वर्षांच्या प्रश्नांचे विषयनिहाय विश्लेषण' }
    ],
    keyNotes: [
      {
        heading: 'Can You Write UPSC Mains & Give Interview in Marathi?',
        marathiHeading: 'UPSC मुख्य परीक्षा आणि मुलाखत मराठी भाषेत देता येते का?',
        points: [
          'YES! Candidates can write all GS Papers, Essay, and Optional Papers in Marathi medium.',
          'You can also appear for the UPSC Personality Test (Interview) in Marathi with an official translator provided by UPSC.'
        ],
        marathiPoints: [
          'होय! तुम्ही UPSC मुख्य परीक्षेचे सर्व सामान्य अध्ययन पेपर्स, निबंध आणि वैकल्पिक विषय मराठी भाषेतून लिहू शकता.',
          'तसेच दिल्लीतील अंतिम मुलाखतही मराठी भाषेतून देण्याची अधिकृत सोय उपलब्ध आहे.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Out of how many total marks is the final UPSC Civil Services merit list prepared?',
        marathiQuestion: 'UPSC नागरी सेवेची अंतिम गुणवत्ता यादी एकूण किती गुणांपैकी तयार केली जाते?',
        options: ['1750 Marks', '2000 Marks', '2025 Marks', '2425 Marks'],
        marathiOptions: ['१७५० गुण', '२००० गुण', '२०२५ गुण', '२४२५ गुण'],
        correctIndex: 2,
        explanation: '1750 Marks (Mains 7 Merit Papers) + 275 Marks (Interview) = 2025 Marks.',
        marathiExplanation: 'मुख्य परीक्षेचे १७५० गुण + मुलाखतीचे २७५ गुण = एकूण २०२५ गुणांवरून अंतिम निवड यादी ठरते.'
      }
    ]
  },

  'upsc-posts': {
    nodeId: 'upsc-posts',
    examId: 'upsc',
    title: 'All India Services & Central Civil Services Posts (UPSC)',
    marathiTitle: 'UPSC अंतर्गत सर्वोच्च अखिल भारतीय व केंद्रीय सेवा पदे',
    subtitle: 'IAS, IPS, IFS, IRS, IA&AS & Group-A Central Services',
    marathiSubtitle: 'जिल्हाधिकारी (IAS), पोलीस अधीक्षक (IPS), राजदूत (IFS) व केंद्रीय आयुक्त पदे',
    overview: 'UPSC recruits officers for the 3 All India Services (IAS, IPS, IFoS) and over 20 Central Group-A and Group-B Civil Services that form the steel frame of India’s governance.',
    marathiOverview: 'भारताच्या प्रशासनाचा कणा मानल्या जाणाऱ्या अखिल भारतीय सेवा (IAS, IPS) आणि केंद्रीय सेवांमधील सर्वोच्च पदांची भरती या परीक्षेद्वारे केली जाते.',
    syllabusTopics: [
      {
        unit: 'All India Services & Premier Central Services',
        marathiUnit: 'अखिल भारतीय सेवा व प्रमुख केंद्रीय सेवा',
        topics: [
          '1. Indian Administrative Service (IAS) — District Collector, Principal Secretary, Cabinet Secretary',
          '2. Indian Police Service (IPS) — Superintendent of Police (SP), Police Commissioner, DGP, CBI/IB/RAW Chiefs',
          '3. Indian Foreign Service (IFS) — Ambassador, High Commissioner, Foreign Secretary at UN & Embassies',
          '4. Indian Revenue Service (IRS - Income Tax & Customs/GST) — Commissioner of Income Tax / Customs',
          '5. Indian Audit & Accounts Service (IA&AS) — Deputy Accountant General under CAG'
        ],
        marathiTopics: [
          '१. भारतीय प्रशासकीय सेवा (IAS) — जिल्हाधिकारी, मनपा आयुक्त, मंत्रालय सचिव ते कॅबिनेट सचिव',
          '२. भारतीय पोलीस सेवा (IPS) — पोलीस अधीक्षक (SP), पोलीस आयुक्त, पोलीस महासंचालक (DGP)',
          '३. भारतीय परराष्ट्र सेवा (IFS) — भारताचे परदेशातील राजदूत (Ambassador), उच्चायुक्त व परराष्ट्र सचिव',
          '४. भारतीय महसूल सेवा (IRS) — आयकर आयुक्त व सीमाशुल्क (Customs & GST) आयुक्त',
          '५. भारतीय लेखा व लेखापरीक्षण सेवा (IA&AS) — महालेखापाल कार्यालय'
        ],
        weightage: '~1000 Vacancies Annually'
      }
    ],
    referenceBooks: [
      { book: 'Governance in India', author: 'M. Laxmikanth', purpose: 'Role of All India Services & Civil Services Reforms', marathiPurpose: 'अखिल भारतीय सेवांची भूमिका व प्रशासकीय सुधारणा' }
    ],
    keyNotes: [
      {
        heading: 'Training Academies for Selected Officers',
        marathiHeading: 'निवड झालेल्या अधिकाऱ्यांच्या प्रशिक्षण प्रबोधिनी',
        points: [
          'IAS Officers train at LBSNAA (Lal Bahadur Shastri National Academy of Administration), Mussoorie.',
          'IPS Officers train at SVPNPA (Sardar Vallabhbhai Patel National Police Academy), Hyderabad.',
          'IFS Officers train at Sushma Swaraj Institute of Foreign Service (SSIFS), New Delhi.'
        ],
        marathiPoints: [
          'IAS अधिकाऱ्यांचे प्रशिक्षण मसुरी येथील लाल बहादूर शास्त्री राष्ट्रीय प्रशासन प्रबोधिनीत (LBSNAA) होते.',
          'IPS अधिकाऱ्यांचे प्रशिक्षण हैदराबाद येथील सरदार वल्लभभाई पटेल राष्ट्रीय पोलीस प्रबोधिनीत (SVPNPA) होते.',
          'IFS अधिकाऱ्यांचे प्रशिक्षण नवी दिल्ली येथील सुषमा स्वराज परराष्ट्र सेवा संस्थेत होते.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Which Article of the Indian Constitution provides for All India Services (IAS, IPS, IFoS)?',
        marathiQuestion: 'भारतीय राज्यघटनेतील कोणते कलम अखिल भारतीय सेवांशी (All India Services) संबंधित आहे?',
        options: ['Article 280', 'Article 312', 'Article 315', 'Article 324'],
        marathiOptions: ['कलम २८०', 'कलम ३१२', 'कलम ३१५', 'कलम ३२४'],
        correctIndex: 1,
        explanation: 'Article 312 empowers the Parliament to create new All India Services if the Rajya Sabha passes a resolution by a 2/3rd majority.',
        marathiExplanation: 'कलम ३१२ नुसार राज्यसभेने २/३ बहुमताने ठराव संमत केल्यास संसदेला नवीन अखिल भारतीय सेवा निर्माण करण्याचा अधिकार आहे.'
      }
    ]
  },

  // =========================================================================
  // SSC NODES
  // =========================================================================
  'ssc-syllabus': {
    nodeId: 'ssc-syllabus',
    examId: 'ssc',
    title: 'SSC Complete Syllabus & Speed Mastery (CGL, CHSL, MTS, GD)',
    marathiTitle: 'SSC संपूर्ण अभ्यासक्रम व शॉर्ट ट्रिक्स (CGL, CHSL, MTS, GD)',
    subtitle: 'Quantitative Aptitude, Reasoning, English Comprehension & General Awareness',
    marathiSubtitle: 'अंकगणित, बुद्धिमत्ता, इंग्रजी व्याकरण आणि सामान्य ज्ञान सविस्तर अभ्यासक्रम',
    overview: 'Staff Selection Commission (SSC) exams follow a uniform 4-subject core syllabus across CGL, CHSL, CPO, MTS, and GD Constable, rewarding speed, accuracy, and conceptual clarity.',
    marathiOverview: 'केंद्र शासनाच्या SSC परीक्षांमध्ये (CGL, CHSL, MTS, GD) अंकगणित, बुद्धिमत्ता, इंग्रजी आणि सामान्य ज्ञान हे ४ मुख्य विषय असतात. MTS आणि GD परीक्षा आता मराठी भाषेतही देता येतात!',
    childNodes: [
      { nodeId: 'ssc-tier1', label: 'Tier-I (CBT) Material', marathiLabel: 'Tier-I (ऑनलाइन चाचणी)', badge: '200 Marks' },
      { nodeId: 'ssc-tier2', label: 'Tier-II (CBT) Material', marathiLabel: 'Tier-II (मुख्य परीक्षा)', badge: 'Merit Stage' },
      { nodeId: 'ssc-skill', label: 'Skill & Typing Test', marathiLabel: 'Skill Test (टायपिंग चाचणी)', badge: 'Qualifying' },
    ],
    syllabusTopics: [
      {
        unit: '1. Quantitative Aptitude (Arithmetic + Advance Maths)',
        marathiUnit: '१. अंकगणित व प्रगत गणित (Quantitative Aptitude)',
        topics: [
          'Arithmetic: Percentage, Profit & Loss, Discount, SI & CI, Ratio & Proportion, Time & Work, Time-Speed-Distance, Averages',
          'Advance Maths: Geometry (Triangles, Circles), Mensuration (2D & 3D), Trigonometry, Algebra & Data Interpretation'
        ],
        marathiTopics: [
          'अंकगणित: शेकडेवारी, नफा-तोटा, सरळव्याज व चक्रवाढ व्याज, गुणोत्तर-प्रमाण, काळ-काम-वेग, सरासरी',
          'प्रगत गणित: भूमिती (त्रिकोण, वर्तुळ), महत्त्वमापन (क्षेत्रफळ व घनफळ), त्रिकोणमिती, बीजगणित व आलेख विश्लेषण'
        ],
        weightage: '25 Questions (50 Marks in Tier-I)'
      },
      {
        unit: '2. General Intelligence & Logical Reasoning',
        marathiUnit: '२. सामान्य बुद्धिमत्ता व तर्कशक्ती (Reasoning)',
        topics: [
          'Coding-Decoding, Number & Alphabet Series, Analogy, Classification, Syllogism',
          'Blood Relations, Direction Sense, Dice & Cube, Mirror/Water Images, Paper Folding & Matrix'
        ],
        marathiTopics: [
          'सांकेतिक भाषा (Coding-Decoding), संख्या व अक्षरमालिका, समसंबंध, वेन आकृत्या (Syllogism)',
          'नातेसंबंध, दिशा ज्ञान, फासा व घन (Dice), आरशातील व पाण्यातील प्रतिमा, कागद घडी'
        ],
        weightage: '25 Questions (50 Marks in Tier-I)'
      },
      {
        unit: '3. English Language & Comprehension + 4. General Awareness',
        marathiUnit: '३. इंग्रजी भाषा व शब्दसंग्रह + ४. सामान्य ज्ञान (GK & GS)',
        topics: [
          'English: Spot the Error, Active/Passive Voice, Direct/Indirect Narration, Synonyms, Antonyms, Idioms & Phrases, One-Word Substitution, Cloze Test',
          'General Awareness: Static GK (Dance, Festivals, Awards, Books), Physics, Chemistry, Biology, Polity, History, Geography & Current Affairs'
        ],
        marathiTopics: [
          'इंग्रजी: काळ (Tenses), व्हॉईस (Active/Passive), डायरेक्ट-इनडायरेक्ट, समानार्थी व विरुद्धार्थी शब्द, म्हणी (Idioms), उतार्यावरील प्रश्न',
          'सामान्य ज्ञान: स्टॅटिक जीके (नृत्यप्रकार, सण, पुरस्कार), सामान्य विज्ञान, राज्यघटना, इतिहास, भूगोल व चालू घडामोडी'
        ],
        weightage: '50 Questions (100 Marks in Tier-I)'
      }
    ],
    referenceBooks: [
      { book: 'SSC Mathematics Chapterwise Solved Papers', author: 'Rakesh Yadav / Kiran Prakashan', purpose: '7300+ Previous Year TCS Pattern Maths Questions', marathiPurpose: 'मागील वर्षांचे TCS पॅटर्ननुसार गणिताचे सोडवलेले प्रश्न' },
      { book: 'Word Power Made Easy & BlackBook of English Vocabulary', author: 'Nikhil Gupta', purpose: 'All repeated SSC One-Word Substitutions, Idioms & Synonyms', marathiPurpose: 'SSC परीक्षेत वारंवार विचारले जाणारे इंग्रजी शब्द व म्हणी' },
      { book: 'Lucent’s General Knowledge', author: 'Lucent Publication', purpose: 'Complete Static GK, History, Polity & General Science', marathiPurpose: 'सामान्य ज्ञान आणि विज्ञानाच्या जलद उजळणीसाठी' }
    ],
    keyNotes: [
      {
        heading: 'Important Update: SSC MTS & SSC GD in Marathi Language!',
        marathiHeading: 'महत्त्वाची बातमी: SSC MTS आणि SSC GD परीक्षा आता मराठी भाषेत!',
        points: [
          'Staff Selection Commission now conducts SSC GD Constable and SSC MTS examinations in Marathi language along with English and Hindi.',
          'Memorize squares up to 40, cubes up to 25, and fraction-to-percentage tables (1/2 to 1/20) for rapid calculation.'
        ],
        marathiPoints: [
          'केंद्र शासनाच्या SSC GD कॉन्स्टेबल आणि SSC MTS या परीक्षा आता संपूर्णपणे मराठी भाषेतून देता येतात!',
          'जलद गणितासाठी १ ते ४० पर्यंतचे वर्ग, १ ते २५ पर्यंतचे घन आणि अपूर्णांक-शेकडेवारी तक्ता तोंडपाठ ठेवा.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'If the cost price of 15 articles is equal to the selling price of 12 articles, find the profit percentage.',
        marathiQuestion: 'जर १५ वस्तूंची खरेदी किंमत ही १२ वस्तूंच्या विक्री किमतीएवढी असेल, तर शेकडा नफा किती?',
        options: ['20%', '25%', '30%', '15%'],
        marathiOptions: ['२०%', '२५%', '३०%', '१५%'],
        correctIndex: 1,
        explanation: '15 CP = 12 SP => SP/CP = 15/12 = 5/4. Profit % = ((5 - 4)/4) × 100 = 25%.',
        marathiExplanation: '१५ खरेदी = १२ विक्री => नफा % = ((१५ - १२) / १२) × १०० = (३ / १२) × १०० = २५% नफा.'
      }
    ]
  },

  'ssc-pattern': {
    nodeId: 'ssc-pattern',
    examId: 'ssc',
    title: 'SSC Examination Pattern (Tier-I, Tier-II & Skill Test)',
    marathiTitle: 'SSC ऑनलाइन परीक्षा स्वरूप (Tier-I, Tier-II व टायपिंग चाचणी)',
    subtitle: 'Computer Based Test (CBT) Structure & Time Allocation',
    marathiSubtitle: 'संगणक आधारित चाचणी (CBT) गुणविभागणी व वेळेचे नियोजन',
    overview: 'SSC exams have transitioned to a streamlined two-tier Computer Based Test (CBT) format where Tier-I is qualifying in nature and Tier-II (including Computer Knowledge and Data Entry Speed Test) determines the final merit.',
    marathiOverview: 'SSC परीक्षांमध्ये टियर-१ ही पात्रता परीक्षा असते, तर टियर-२ मधील गुणांवरून अंतिम पोस्टिंग मिळते.',
    childNodes: [
      { nodeId: 'ssc-tier1', label: 'Tier-I (CBT)', marathiLabel: 'Tier-I (पूर्व परीक्षा)', badge: '60 Mins' },
      { nodeId: 'ssc-tier2', label: 'Tier-II (CBT)', marathiLabel: 'Tier-II (मुख्य परीक्षा)', badge: '390 Marks' },
      { nodeId: 'ssc-skill', label: 'Skill / Typing Test', marathiLabel: 'Skill Test (टायपिंग)', badge: 'Qualifying' },
    ],
    syllabusTopics: [
      {
        unit: 'Tier-I CBT Pattern (60 Minutes, 100 Questions, 200 Marks)',
        marathiUnit: 'टियर-१ ऑनलाइन परीक्षा (६० मिनिटे, १०० प्रश्न, २०० गुण)',
        topics: [
          'General Intelligence & Reasoning: 25 Qs (50 Marks)',
          'General Awareness: 25 Qs (50 Marks)',
          'Quantitative Aptitude: 25 Qs (50 Marks)',
          'English Comprehension: 25 Qs (50 Marks)'
        ],
        marathiTopics: [
          'बुद्धिमत्ता चाचणी (Reasoning): २५ प्रश्न (५० गुण)',
          'सामान्य ज्ञान (General Awareness): २५ प्रश्न (५० गुण)',
          'अंकगणित (Quantitative Aptitude): २५ प्रश्न (५० गुण)',
          'इंग्रजी भाषा (English): २५ प्रश्न (५० गुण)'
        ],
        weightage: '200 Marks (0.50 Negative Marking)'
      },
      {
        unit: 'Tier-II Main CBT Pattern (390 Merit Marks + Qualifying Computer & Typing)',
        marathiUnit: 'टियर-२ मुख्य परीक्षा (३९० गुण + संगणक व टायपिंग पात्रता चाचणी)',
        topics: [
          'Section-I: Mathematical Abilities (30 Qs) + Reasoning (30 Qs) = 60 Qs × 3 Marks = 180 Marks (1 Hour)',
          'Section-II: English Language (45 Qs) + General Awareness (25 Qs) = 70 Qs × 3 Marks = 210 Marks (1 Hour)',
          'Section-III: Computer Knowledge Test (20 Qs = 60 Marks, Qualifying) + Data Entry Speed Test (2000 key depressions in 15 mins)'
        ],
        marathiTopics: [
          'विभाग १: गणित (३० प्रश्न) + बुद्धिमत्ता (३० प्रश्न) = ६० प्रश्न × ३ गुण = १८० गुण (१ तास)',
          'विभाग २: इंग्रजी (४५ प्रश्न) + सामान्य ज्ञान (२५ प्रश्न) = ७० प्रश्न × ३ गुण = २१० गुण (१ तास)',
          'विभाग ३: संगणक ज्ञान चाचणी (२० प्रश्न - पात्रता) आणि १५ मिनिटांची डेटा एन्ट्री टायपिंग चाचणी'
        ],
        weightage: '390 Merit Marks'
      }
    ],
    referenceBooks: [
      { book: 'Pinnacle SSC TCS PYQ Test Series', author: 'Pinnacle Publications', purpose: 'Section-wise timed CBT practice', marathiPurpose: 'ऑनलाइन परीक्षेचा वेग वाढवण्यासाठी सराव संच' }
    ],
    keyNotes: [
      {
        heading: 'Typing Test (DEST) Requirement',
        marathiHeading: 'टायपिंग चाचणी (Skill Test) का महत्त्वाची आहे?',
        points: [
          'In SSC CGL and CHSL, the Data Entry Speed Test (DEST) is mandatory for all posts (~27 words per minute in English).',
          'Practicing 20 minutes of English typing daily ensures effortless qualification in Tier-II.'
        ],
        marathiPoints: [
          'SSC CGL आणि CHSL मध्ये सर्व पदांसाठी १५ मिनिटांची इंग्रजी टायपिंग चाचणी (सुमारे २७ शब्द प्रति मिनिट) उत्तीर्ण होणे आवश्यक आहे.',
          'दररोज फक्त २० मिनिटे टायपिंगचा सराव केल्यास ही चाचणी सहज उत्तीर्ण होता येते.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'How many marks are awarded for each correct answer in SSC CGL Tier-II?',
        marathiQuestion: 'SSC CGL टियर-२ मुख्य परीक्षेत प्रत्येक बरोबर प्रश्नासाठी किती गुण दिले जातात?',
        options: ['1 Mark', '2 Marks', '3 Marks', '4 Marks'],
        marathiOptions: ['१ गुण', '२ गुण', '३ गुण', '४ गुण'],
        correctIndex: 2,
        explanation: 'In SSC CGL Tier-II, each question carries 3 marks, with a negative marking of 1 mark for each wrong answer.',
        marathiExplanation: 'SSC CGL टियर-२ मध्ये प्रत्येक बरोबर उत्तरासाठी ३ गुण मिळतात आणि चुकीच्या उत्तरासाठी १ गुण वजा केला जातो.'
      }
    ]
  },

  'ssc-posts': {
    nodeId: 'ssc-posts',
    examId: 'ssc',
    title: 'Central Government Posts under SSC (CGL, CHSL, CPO, GD, MTS)',
    marathiTitle: 'SSC अंतर्गत केंद्र शासनातील प्रमुख पदे व विभाग',
    subtitle: '10th Pass, 12th Pass & Graduate Level Central Ministries Jobs',
    marathiSubtitle: '१० वी पास, १२ वी पास आणि पदवीधर उमेदवारांसाठी केंद्र सरकारमधील पदे',
    overview: 'SSC provides direct recruitment to prestigious Group-B and Group-C posts across Central Ministries, Income Tax, GST/Customs, CBI, Central Armed Police Forces (CAPF), and Postal Departments.',
    marathiOverview: '१० वी, १२ वी आणि पदवीधर विद्यार्थ्यांसाठी केंद्र सरकारच्या विविध मंत्रालयांत, आयकर व जीएसटी विभागात आणि केंद्रीय पोलीस दलात थेट नोकरीची सुवर्णसंधी.',
    syllabusTopics: [
      {
        unit: '1. Graduate Level Posts (SSC CGL & SSC CPO)',
        marathiUnit: '१. पदवीधर स्तरावरील पदे (SSC CGL व CPO)',
        topics: [
          'Income Tax Inspector (CBDT) & Inspector (Central Excise / GST & Preventive Officer)',
          'Sub-Inspector in Central Bureau of Investigation (CBI) & National Investigation Agency (NIA)',
          'Assistant Section Officer (ASO) in Ministry of External Affairs (MEA), Defence, Railways & CSS',
          'Sub-Inspector in Delhi Police & Central Armed Police Forces (CRPF, BSF, CISF, ITBP, SSB)'
        ],
        marathiTopics: [
          'आयकर निरीक्षक (Income Tax Inspector) आणि जीएसटी / सीमाशुल्क निरीक्षक (GST & Customs Inspector)',
          'सीबीआय (CBI) व एनआयए (NIA) मध्ये पोलीस उपनिरीक्षक (Sub-Inspector)',
          'परराष्ट्र मंत्रालय, रेल्वे मंत्रालय व केंद्रीय सचिवालयात सहाय्यक कक्ष अधिकारी (ASO)',
          'दिल्ली पोलीस व केंद्रीय सशस्त्र पोलीस दलात (CAPF) उपनिरीक्षक'
        ],
        weightage: 'Pay Level 6 to 8 (₹44,900 – ₹1,51,100)'
      },
      {
        unit: '2. 12th Pass (SSC CHSL) & 10th Pass (SSC MTS / GD Constable) Posts',
        marathiUnit: '२. १२ वी पास (CHSL) आणि १० वी पास (MTS / GD कॉन्स्टेबल) पदे',
        topics: [
          'SSC CHSL (12th Pass): Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA) & Data Entry Operator (DEO)',
          'SSC MTS & Havaldar (10th Pass): Multi-Tasking Staff in Central Ministries & Havaldar in CBIC/CBN',
          'SSC GD Constable (10th Pass): General Duty Constable in BSF, CISF, CRPF, SSB, ITBP, Assam Rifles & SSF'
        ],
        marathiTopics: [
          'SSC CHSL (१२ वी पास): कनिष्ठ लिपिक (LDC), डेटा एन्ट्री ऑपरेटर (DEO) व मंत्रालय सहायक',
          'SSC MTS व हवालदार (१० वी पास): केंद्र सरकारी कार्यालयात मल्टी टास्किंग स्टाफ व सीमाशुल्क विभागात हवालदार',
          'SSC GD कॉन्स्टेबल (१० वी पास): BSF, CISF, CRPF, ITBP, SSB मध्ये केंद्रीय पोलीस कॉन्स्टेबल (५०,०००+ जागा)'
        ],
        weightage: '10th & 12th Pass Direct Entry'
      }
    ],
    referenceBooks: [
      { book: 'SSC GD Constable & MTS Marathi Guide', author: 'Kiran / ठोकळा मार्गदर्शक', purpose: 'Complete preparation in Marathi for 10th pass central jobs', marathiPurpose: '१० वी पास विद्यार्थ्यांसाठी मराठीतून SSC GD व MTS संपूर्ण तयारी' }
    ],
    keyNotes: [
      {
        heading: 'Why Rural Students Should Target SSC GD & MTS',
        marathiHeading: 'ग्रामीण विद्यार्थ्यांसाठी SSC GD आणि MTS ही सर्वोत्तम संधी का आहे?',
        points: [
          'Minimum qualification is just 10th Pass (SSC), and the exam paper is available in Marathi.',
          'Tens of thousands of vacancies are announced every single year with a fixed exam calendar.'
        ],
        marathiPoints: [
          'या परीक्षांसाठी पात्रता केवळ १० वी पास आहे आणि संपूर्ण प्रश्नपत्रिका मराठी भाषेत असते.',
          'दरवर्षी वेळापत्रकानुसार ३०,००० ते ५०,००० पेक्षा जास्त जागांची भरती केली जाते.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'What is the minimum educational qualification required for SSC CHSL?',
        marathiQuestion: 'SSC CHSL परीक्षेसाठी किमान शैक्षणिक पात्रता काय असते?',
        options: ['10th Pass', '12th Standard (HSC) Pass', 'Any Graduation Degree', 'Post Graduation'],
        marathiOptions: ['१० वी उत्तीर्ण', '१२ वी (HSC) उत्तीर्ण', 'कोणतीही पदवी', 'पदव्युत्तर पदवी'],
        correctIndex: 1,
        explanation: 'SSC Combined Higher Secondary Level (CHSL) requires 12th Standard (HSC) pass from any stream (Arts, Commerce, or Science).',
        marathiExplanation: 'SSC CHSL साठी कला, वाणिज्य किंवा विज्ञान यांपैकी कोणत्याही शाखेतून १२ वी उत्तीर्ण असणे आवश्यक आहे.'
      }
    ]
  },

  // =========================================================================
  // RRB NODES
  // =========================================================================
  'rrb-syllabus': {
    nodeId: 'rrb-syllabus',
    examId: 'rrb',
    title: 'Railway Recruitment Board (RRB) Complete Syllabus',
    marathiTitle: 'रेल्वे भरती मंडळ (RRB) संपूर्ण अभ्यासक्रम (NTPC, Group-D, ALP, RPF)',
    subtitle: 'General Science (10th NCERT), Mathematics, Reasoning & Current Affairs',
    marathiSubtitle: 'सामान्य विज्ञान, मूलभूत अंकगणित, बुद्धिमत्ता आणि चालू घडामोडी सविस्तर अभ्यासक्रम',
    overview: 'Indian Railways (RRB) exams place massive emphasis on 10th-level General Science (Physics, Chemistry, Biology), Speed Arithmetic, Logical Reasoning, and Current Affairs. All RRB exams can be attempted in Marathi!',
    marathiOverview: 'भारतीय रेल्वेच्या सर्व परीक्षा (NTPC, Group-D, ALP, Technician, RPF) मराठी भाषेतून देता येतात! यामध्ये १० वी पातळीवरील सामान्य विज्ञान, अंकगणित आणि बुद्धिमत्तेला सर्वाधिक महत्त्व असते.',
    childNodes: [
      { nodeId: 'rrb-cbt1', label: 'CBT-1 Screening Exam', marathiLabel: 'CBT-1 (पहिली चाचणी)', badge: '100 Marks' },
      { nodeId: 'rrb-cbt2', label: 'CBT-2 Main Exam', marathiLabel: 'CBT-2 (मुख्य परीक्षा)', badge: '120 Marks' },
      { nodeId: 'rrb-cbat', label: 'CBAT / Psycho & Medical', marathiLabel: 'CBAT (सायको व वैद्यकीय)', badge: 'Station Master / ALP' },
    ],
    syllabusTopics: [
      {
        unit: '1. General Science (Physics, Chemistry & Life Sciences — Class 9 & 10 NCERT)',
        marathiUnit: '१. सामान्य विज्ञान (भौतिक, रसायन व जीवशास्त्र — इ. ९ वी व १० वी स्तर)',
        topics: [
          'Physics: Units & Measurements, Motion, Force & Laws of Motion, Gravitation, Work-Energy-Power, Light (Mirrors & Lenses), Electricity & Magnetism',
          'Chemistry: Matter, Atomic Structure, Periodic Table, Chemical Reactions, Acids-Bases-Salts, Metals & Non-Metals, Carbon Compounds',
          'Biology: Cell Structure, Plant & Human Tissues, Nutrition, Respiration, Circulatory & Nervous System, Diseases, Vitamins & Genetics'
        ],
        marathiTopics: [
          'भौतिकशास्त्र: एकके व मापन, गतीचे नियम, गुरुत्वाकर्षण, कार्य-ऊर्जा-शक्ती, प्रकाश (आरसे व भिंगे), विद्युतधारा व चुंबकत्व',
          'रसायनशास्त्र: अणूची संरचना, आवर्तसारणी (Periodic Table), रासायनिक अभिक्रिया, आम्ल-आम्लारी-क्षार, धातू व अधातू',
          'जीवशास्त्र: पेशीरचना, मानवी पचन, श्वसन, रक्ताभिसरण व चेतासंस्था, जीवनसत्त्वे, मानवी रोग व आनुवंशिकता'
        ],
        weightage: '25 to 30 Questions'
      },
      {
        unit: '2. Mathematics & 3. General Intelligence and Reasoning',
        marathiUnit: '२. अंकगणित आणि ३. सामान्य बुद्धिमत्ता व तर्कशक्ती',
        topics: [
          'Mathematics: Number System, BODMAS, Decimals, Fractions, LCM & HCF, Ratio, Percentage, Mensuration, Time & Work, Time & Distance, SI & CI, Profit & Loss, Elementary Algebra & Geometry',
          'Reasoning: Analogies, Alphabetical & Number Series, Coding-Decoding, Mathematical Operations, Relationships, Syllogism, Jumbling, Venn Diagram, Statement-Conclusion & Decision Making'
        ],
        marathiTopics: [
          'अंकगणित: संख्याज्ञान, पदावली (BODMAS), दशांश व अपूर्णांक, लसावि-मसावि, गुणोत्तर, शेकडेवारी, नफा-तोटा, सरळव्याज-चक्रवाढ व्याज, काळ-काम-वेग, क्षेत्रफळ',
          'बुद्धिमत्ता: अक्षर व संख्यामालिका, सांकेतिक भाषा, नातेसंबंध, वेन आकृत्या, विधान व निष्कर्ष, घड्याळ व दिनदर्शिका'
        ],
        weightage: '55 to 60 Questions Combined'
      }
    ],
    referenceBooks: [
      { book: 'NCERT Science (Class 9th & 10th) + State Board Science', author: 'NCERT / Balbharati', purpose: '100% direct coverage of Railway General Science questions', marathiPurpose: 'रेल्वे परीक्षेतील विज्ञानाच्या प्रश्नांसाठी इ. ९ वी व १० वी चे पाठ्यपुस्तक' },
      { book: 'Speedy Railway General Science & GK', author: 'Speedy Publications', purpose: 'One-liner revision of past 20 years Railway questions', marathiPurpose: 'मागील २० वर्षांत रेल्वेने विचारलेल्या प्रश्नांची जलद उजळणी' },
      { book: 'Youth Competition Times RRB Maths & Science', author: 'YCT Publications', purpose: 'Chapter-wise solved TCS CBT papers', marathiPurpose: 'घटकनिहाय सोडवलेले रेल्वे CBT प्रश्नसंच' }
    ],
    keyNotes: [
      {
        heading: 'Golden Rule for Cracking Railway (RRB) Exams',
        marathiHeading: 'रेल्वे भरती (RRB) हमखास यशस्वी होण्याचे गुपित',
        points: [
          'Mathematics + Reasoning alone account for 60 out of 100 marks in CBT-1 and 70 out of 120 marks in CBT-2!',
          'In General Science, numericals on Electricity (Ohm’s Law, Power = V×I) and Mirror/Lens formula (1/f = 1/v ± 1/u) are asked in every shift.'
        ],
        marathiPoints: [
          'रेल्वे परीक्षेत केवळ गणित आणि बुद्धिमत्ता या दोनच विषयांना १०० पैकी ६० गुण (CBT-1) आणि १२० पैकी ७० गुण (CBT-2) असतात!',
          'विज्ञानामध्ये विद्युतधारा (Ohm’s Law) आणि भिंग व आरशांच्या सूत्रावरील गणिते प्रत्येक शिफ्टमध्ये विचारली जातात.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'What is the SI unit of Electric Current?',
        marathiQuestion: 'विद्युतधारेचे (Electric Current) एस.आय. (SI) एकक कोणते आहे?',
        options: ['Volt (व्होल्ट)', 'Ohm (ओहम)', 'Ampere (ॲम्पिअर)', 'Watt (वॅट)'],
        marathiOptions: ['व्होल्ट (Volt)', 'ओहम (Ohm)', 'ॲम्पिअर (Ampere)', 'वॅट (Watt)'],
        correctIndex: 2,
        explanation: 'Ampere (A) is the SI unit of electric current, Volt is for potential difference, Ohm is for resistance, and Watt is for power.',
        marathiExplanation: 'विद्युतधारेचे एकक ॲम्पिअर (Ampere) आहे, विभवांतराचे व्होल्ट (Volt), रोधाचे ओहम (Ohm) आणि शक्तीचे वॅट (Watt) आहे.'
      }
    ]
  },

  'rrb-pattern': {
    nodeId: 'rrb-pattern',
    examId: 'rrb',
    title: 'Railway (RRB) Examination Stages (CBT-1, CBT-2 & CBAT)',
    marathiTitle: 'रेल्वे परीक्षा टप्पे व स्वरूप (CBT-1, CBT-2 व सायको चाचणी)',
    subtitle: 'Complete Breakdown for RRB NTPC, ALP, Technician & Group-D',
    marathiSubtitle: 'एनटीपीसी (NTPC), लोको पायलट (ALP) आणि गट-ड (Group-D) परीक्षा पद्धती',
    overview: 'Railway examinations are conducted online through Computer Based Tests (CBT) with 1/3rd negative marking, available in 15 Indian languages including Marathi.',
    marathiOverview: 'रेल्वेच्या ऑनलाइन परीक्षांमध्ये १/३ निगेटिव्ह मार्किंग असते आणि तुम्ही संपूर्ण पेपर मराठी भाषेत सोडवू शकता.',
    childNodes: [
      { nodeId: 'rrb-cbt1', label: 'CBT-1 (Stage 1)', marathiLabel: 'CBT-1 (पूर्व परीक्षा)', badge: '100 Marks' },
      { nodeId: 'rrb-cbt2', label: 'CBT-2 (Stage 2)', marathiLabel: 'CBT-2 (मुख्य परीक्षा)', badge: '120 Marks' },
      { nodeId: 'rrb-cbat', label: 'CBAT / Skill Test', marathiLabel: 'CBAT (सायको चाचणी)', badge: 'Qualifying' },
    ],
    syllabusTopics: [
      {
        unit: 'Stage 1: CBT-1 (90 Minutes, 100 Questions, 100 Marks)',
        marathiUnit: 'टप्पा १: सीबीटी-१ (९० मिनिटे वेळ, १०० प्रश्न, १०० गुण)',
        topics: [
          'Mathematics: 30 Questions (30 Marks)',
          'General Intelligence & Reasoning: 30 Questions (30 Marks)',
          'General Awareness & General Science: 40 Questions (40 Marks)'
        ],
        marathiTopics: [
          'अंकगणित (Mathematics): ३० प्रश्न (३० गुण)',
          'बुद्धिमत्ता व तर्कशक्ती (Reasoning): ३० प्रश्न (३० गुण)',
          'सामान्य विज्ञान व चालू घडामोडी: ४० प्रश्न (४० गुण)'
        ],
        weightage: '100 Marks (90 Mins)'
      },
      {
        unit: 'Stage 2: CBT-2 (90 Minutes, 120 Questions, 120 Marks)',
        marathiUnit: 'टप्पा २: सीबीटी-२ मुख्य परीक्षा (९० मिनिटे, १२० प्रश्न, १२० गुण)',
        topics: [
          'Mathematics: 35 Questions (35 Marks)',
          'General Intelligence & Reasoning: 35 Questions (35 Marks)',
          'General Awareness & Science: 50 Questions (50 Marks)',
          'Stage 3: CBAT (Psycho Test for Station Master & ALP) / Typing Skill Test (for Clerks) / Physical Efficiency Test (for Group-D & RPF)'
        ],
        marathiTopics: [
          'अंकगणित: ३५ प्रश्न (३५ गुण)',
          'बुद्धिमत्ता व तर्कशक्ती: ३५ प्रश्न (३५ गुण)',
          'सामान्य ज्ञान व विज्ञान: ५० प्रश्न (५० गुण)',
          'टप्पा ३: स्टेशन मास्तर व लोको पायलटसाठी सायको टेस्ट (CBAT) / लिपिक पदांसाठी टायपिंग टेस्ट'
        ],
        weightage: '120 Marks (90 Mins)'
      }
    ],
    referenceBooks: [
      { book: 'RRB NTPC & Group-D Previous Year Question Bank', author: 'Kiran / Rukmini (The Platform)', purpose: 'Full-length 100-question & 120-question mock sets', marathiPurpose: '१०० व १२० प्रश्नांचे पूर्ण सराव प्रश्नसंच' }
    ],
    keyNotes: [
      {
        heading: 'Beware of 1/3rd Negative Marking in Railways',
        marathiHeading: 'रेल्वेतील १/३ निगेटिव्ह मार्किंगची काळजी घ्या!',
        points: [
          'Unlike MPSC (1/4th negative), Railway CBT exams deduct 1/3rd (0.33) mark for every wrong answer.',
          'Avoid blind guessing; maintain 85%+ accuracy to boost your Normalized Score.'
        ],
        marathiPoints: [
          'रेल्वे परीक्षेत प्रत्येक ३ चुकीच्या उत्तरांमागे १ बरोबर प्रश्नाचा गुण (१/३ निगेटिव्ह मार्किंग) वजा होतो.',
          'त्यामुळे अंदाजे उत्तरे टिक न करता ८५% पेक्षा जास्त अचूकता (Accuracy) ठेवल्यास नॉर्मलायझेशनमध्ये जास्तीत जास्त गुण वाढतात.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'How much time is given to solve 100 questions in RRB NTPC CBT-1?',
        marathiQuestion: 'RRB NTPC च्या CBT-1 परीक्षेत १०० प्रश्न सोडवण्यासाठी किती वेळ दिला जातो?',
        options: ['60 Minutes', '90 Minutes', '120 Minutes', '150 Minutes'],
        marathiOptions: ['६० मिनिटे', '९० मिनिटे (दीड तास)', '१२० मिनिटे', '१५० मिनिटे'],
        correctIndex: 1,
        explanation: 'RRB CBT-1 gives a generous 90 minutes (1.5 hours) for 100 questions, allowing ample time to solve Maths and Reasoning accurately.',
        marathiExplanation: 'रेल्वे CBT-1 मध्ये १०० प्रश्नांसाठी ९० मिनिटे (दीड तास) वेळ मिळतो.'
      }
    ]
  },

  'rrb-posts': {
    nodeId: 'rrb-posts',
    examId: 'rrb',
    title: 'Indian Railways Cadres & Posts (NTPC, ALP, Technician, Group-D, RPF)',
    marathiTitle: 'भारतीय रेल्वेमधील प्रमुख पदे व पात्रता (१० वी, ITI, १२ वी व पदवी)',
    subtitle: 'Central Railway & South Central Railway Opportunities for Solapur Region',
    marathiSubtitle: 'सोलापूर व मध्य रेल्वे विभागातील स्टेशन मास्तर, लोको पायलट, टेक्निशियन, RPF व ग्रुप-डी पदे',
    overview: 'Since Hotgi & Solapur is a major Railway Junction HQ under Central Railway, RRB exams offer tremendous local and national career opportunities for 10th pass, ITI, 12th pass, and Graduate students.',
    marathiOverview: 'सोलापूर व होतगी हे मध्य रेल्वेचे प्रमुख जंक्शन आणि विभागीय मुख्यालय असल्यामुळे आपल्या भागातील विद्यार्थ्यांसाठी रेल्वे भरती ही अत्यंत जवळची व सुरक्षित केंद्र सरकारी नोकरीची संधी आहे!',
    syllabusTopics: [
      {
        unit: '1. RRB NTPC (Non-Technical Popular Categories — 12th Pass & Graduate)',
        marathiUnit: '१. आरआरबी एनटीपीसी (RRB NTPC — १२ वी पास व पदवीधर पदे)',
        topics: [
          'Graduate Posts: Station Master (SM), Goods Train Manager (Goods Guard), Senior Commercial cum Ticket Clerk, Senior Clerk cum Typist',
          '12th Pass (Under-Graduate) Posts: Commercial cum Ticket Clerk (TC), Accounts Clerk cum Typist, Junior Clerk cum Typist, Trains Clerk'
        ],
        marathiTopics: [
          'पदवीधर पदे: स्टेशन मास्तर (Station Master), मालगाडी व्यवस्थापक (Goods Guard), वरिष्ठ तिकीट परीक्षक व वरिष्ठ लिपिक',
          '१२ वी पास पदे: तिकीट क्लर्क (TC), अकाउंट्स क्लर्क, ज्युनिअर क्लर्क व ट्रेन्स क्लर्क'
        ],
        weightage: '35,000+ Vacancies Cycle'
      },
      {
        unit: '2. Technical (ALP & Technician), RPF & Level-1 (Group-D) Posts',
        marathiUnit: '२. तांत्रिक (ALP व टेक्निशियन), रेल्वे पोलीस (RPF) व गट-ड (Group-D) पदे',
        topics: [
          'RRB ALP (Assistant Loco Pilot): 10th + ITI / Diploma / Engineering — Train Driver with high allowances',
          'RRB Technician Grade I & III: 10th + ITI or 12th (Physics & Maths) — Signal, Telecom & Workshop Technicians',
          'RPF (Railway Protection Force): Sub-Inspector (Graduate) & Constable (10th Pass)',
          'RRB Group-D (Level-1): 10th Pass / ITI — Pointsman, Track Maintainer, Assistant in Electrical/Mechanical/Signal Departments'
        ],
        marathiTopics: [
          'असिस्टंट लोको पायलट (ALP - रेल्वे चालक): १० वी + आयटीआय (ITI) किंवा डिप्लोमा',
          'रेल्वे टेक्निशियन: १० वी + ITI किंवा १२ वी सायन्स (Physics & Maths)',
          'रेल्वे सुरक्षा दल (RPF): पोलीस उपनिरीक्षक (पदवी) आणि RPF कॉन्स्टेबल (१० वी पास)',
          'रेल्वे ग्रुप-डी (Level-1): १० वी पास — पॉईंट्समन, सिग्नल व इलेक्ट्रिकल असिस्टंट, ट्रॅक मेंटेनर'
        ],
        weightage: '1,00,000+ Combined Vacancies'
      }
    ],
    referenceBooks: [
      { book: 'Basic Science & Engineering Drawing (for ALP)', author: 'Rukmini / Youth Publications', purpose: 'Essential for Assistant Loco Pilot CBT-2 Part-A & Part-B', marathiPurpose: 'लोको पायलट आणि टेक्निशियन मुख्य परीक्षेसाठी' }
    ],
    keyNotes: [
      {
        heading: 'Career Growth in Indian Railways',
        marathiHeading: 'भारतीय रेल्वेमधील पदोन्नती (Promotion) व सुविधा',
        points: [
          'Even an employee joining in Group-D or Junior Clerk can get promoted quickly through departmental GDCE exams to Station Master or Goods Guard.',
          'Railway employees receive Central Government Pay Scales, Free Railway Passes for family, Railway Quarters, and comprehensive medical facilities.'
        ],
        marathiPoints: [
          'रेल्वेमध्ये ग्रुप-डी किंवा क्लर्क म्हणून रुजू झालेला विद्यार्थी अंतर्गत परीक्षेतून (GDCE) लवकरच स्टेशन मास्तर किंवा गार्ड पदावर पदोन्नती मिळवू शकतो.',
          'केंद्र सरकारचे वेतन, कुटुंबासाठी मोफत रेल्वे प्रवास पास, निवासस्थान आणि उत्तम वैद्यकीय सुविधा मिळतात.'
        ]
      }
    ],
    practiceMCQs: [
      {
        question: 'Where is the Headquarters of the Central Railway Zone located?',
        marathiQuestion: 'मध्य रेल्वेचे (Central Railway) मुख्यालय कोठे आहे?',
        options: ['Pune', 'Solapur', 'Mumbai (CSMT)', 'Nagpur'],
        marathiOptions: ['पुणे', 'सोलापूर', 'मुंबई (छत्रपती शिवाजी महाराज टर्मिनस)', 'नागपूर'],
        correctIndex: 2,
        explanation: 'Mumbai CSMT is the Headquarters of Central Railway, and Solapur is one of its five major divisions (Mumbai, Bhusaval, Nagpur, Solapur, Pune).',
        marathiExplanation: 'मध्य रेल्वेचे मुख्यालय मुंबई (CSMT) येथे असून सोलापूर हा मध्य रेल्वेचा एक प्रमुख विभाग (Division) आहे.'
      }
    ]
  }
};

// Fallback / Dynamic generator for any child/sub-node so EVERY node in the tree has rich real-time study material
export function getStudyMaterialForNode(
  examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb',
  nodeId: string,
  nodeTitle?: string,
  nodeMarathiTitle?: string
): NodeStudyMaterial {
  if (EXAM_NODE_MATERIALS[nodeId]) {
    return EXAM_NODE_MATERIALS[nodeId];
  }

  // Map specific sub-nodes to their closest rich material or generate tailored material
  const normalized = nodeId.toLowerCase();

  if (examId === 'mpsc') {
    if (normalized.includes('nongazetted') || normalized.includes('combined') || normalized.includes('group-b')) {
      const base = EXAM_NODE_MATERIALS['mpsc-nongazetted'];
      return {
        ...base,
        nodeId,
        title: nodeTitle || base.title,
        marathiTitle: nodeMarathiTitle || base.marathiTitle,
      };
    }
    if (normalized.includes('post')) {
      const base = EXAM_NODE_MATERIALS['mpsc-gazetted-posts'];
      return {
        ...base,
        nodeId,
        title: nodeTitle || base.title,
        marathiTitle: nodeMarathiTitle || base.marathiTitle,
      };
    }
    if (normalized.includes('syllabus') || normalized.includes('prelim') || normalized.includes('main') || normalized.includes('gs') || normalized.includes('csat')) {
      const base = EXAM_NODE_MATERIALS['mpsc-gazetted-syllabus'];
      return {
        ...base,
        nodeId,
        title: nodeTitle || base.title,
        marathiTitle: nodeMarathiTitle || base.marathiTitle,
      };
    }
    const base = EXAM_NODE_MATERIALS['mpsc-gazetted'];
    return {
      ...base,
      nodeId,
      title: nodeTitle || base.title,
      marathiTitle: nodeMarathiTitle || base.marathiTitle,
    };
  }

  if (examId === 'upsc') {
    if (normalized.includes('post')) {
      return { ...EXAM_NODE_MATERIALS['upsc-posts'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['upsc-posts'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['upsc-posts'].marathiTitle };
    }
    if (normalized.includes('pattern') || normalized.includes('prelim') || normalized.includes('main') || normalized.includes('interview')) {
      return { ...EXAM_NODE_MATERIALS['upsc-pattern'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['upsc-pattern'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['upsc-pattern'].marathiTitle };
    }
    return { ...EXAM_NODE_MATERIALS['upsc-syllabus'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['upsc-syllabus'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['upsc-syllabus'].marathiTitle };
  }

  if (examId === 'ssc') {
    if (normalized.includes('post')) {
      return { ...EXAM_NODE_MATERIALS['ssc-posts'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['ssc-posts'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['ssc-posts'].marathiTitle };
    }
    if (normalized.includes('pattern') || normalized.includes('tier') || normalized.includes('skill')) {
      return { ...EXAM_NODE_MATERIALS['ssc-pattern'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['ssc-pattern'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['ssc-pattern'].marathiTitle };
    }
    return { ...EXAM_NODE_MATERIALS['ssc-syllabus'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['ssc-syllabus'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['ssc-syllabus'].marathiTitle };
  }

  // Default to RRB
  if (normalized.includes('post')) {
    return { ...EXAM_NODE_MATERIALS['rrb-posts'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['rrb-posts'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['rrb-posts'].marathiTitle };
  }
  if (normalized.includes('pattern') || normalized.includes('cbt') || normalized.includes('cbat')) {
    return { ...EXAM_NODE_MATERIALS['rrb-pattern'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['rrb-pattern'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['rrb-pattern'].marathiTitle };
  }
  return { ...EXAM_NODE_MATERIALS['rrb-syllabus'], nodeId, title: nodeTitle || EXAM_NODE_MATERIALS['rrb-syllabus'].title, marathiTitle: nodeMarathiTitle || EXAM_NODE_MATERIALS['rrb-syllabus'].marathiTitle };
}
