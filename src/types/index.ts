export type NavSection =
  | 'home'
  | 'about'
  | 'about-page'
  | 'how-it-started'
  | 'coaching'
  | 'competitive'
  | 'library'
  | 'agriculture'
  | 'gallery'
  | 'contact'
  | 'exam-mpsc'
  | 'exam-upsc'
  | 'exam-ssc'
  | 'exam-rrb'
  | 'exam-police';

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  category: 'coaching' | 'competitive' | 'abhyasika' | 'library' | 'drone' | 'general';
  standardOrExam?: string;
  message: string;
}
