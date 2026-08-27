export interface StudentInfo {
  studentName: string;
  gradeClass: string;
  schoolName: string;
  fatherName?: string;
  fatherPhone: string;
  motherName?: string;
  motherPhone: string;
  photoUrl: string;
  holidaySeason: string;
  motto: string;
}

export interface BookReflection {
  id: number;
  numberStr: string; // "01", "02"
  title: string;
  shortTitle: string;
  category: string;
  goldenQuote: string;
  reflectionText: string;
  parentTakeaway: string;
  rating: number;
  readDate: string;
  coverColor?: string;
  tags: string[];
}

export interface BackCoverInfo {
  closingTitle: string;
  closingSubtitle: string;
  reflectionSummary: string;
  parentPledge: string;
  teacherComment: string;
  totalBooks: number;
  totalDays: number;
  sharedHours: number;
  issuedDate: string;
}

export interface BookletData {
  title: string;
  subtitle: string;
  student: StudentInfo;
  books: BookReflection[];
  backCover: BackCoverInfo;
  themeId: string;
}

export type ThemeType = 'warm-ivory' | 'morandi-green' | 'classic-navy' | 'rose-clay';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  bgGradient: string;
  cardBg: string;
  borderColor: string;
  accentColor: string;
  accentBg: string;
  textColor: string;
  secondaryText: string;
  spineColor: string;
  badgeBg: string;
}

export type ViewMode = 'flip' | 'gallery' | 'print';
