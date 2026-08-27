import React, { useState } from 'react';
import { BookletData, BookReflection } from '../types';
import { X, Save, User, BookOpen, Award, Check, Phone, GraduationCap, Sparkles } from 'lucide-react';

interface EditModalProps {
  data: BookletData;
  onSave: (updatedData: BookletData) => void;
  onClose: () => void;
  onOpenPhotoUploader: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({
  data,
  onSave,
  onClose,
  onOpenPhotoUploader,
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'books' | 'backCover'>('student');
  const [formData, setFormData] = useState<BookletData>(JSON.parse(JSON.stringify(data)));
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);

  const handleStudentChange = (field: keyof typeof formData.student, value: string) => {
    setFormData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        [field]: value,
      },
    }));
  };

  const handleBookChange = (index: number, field: keyof BookReflection, value: any) => {
    setFormData((prev) => {
      const updatedBooks = [...prev.books];
      updatedBooks[index] = {
        ...updatedBooks[index],
        [field]: value,
      };
      return {
        ...prev,
        books: updatedBooks,
      };
    });
  };

  const handleBackCoverChange = (field: keyof typeof formData.backCover, value: any) => {
    setFormData((prev) => ({
      ...prev,
      backCover: {
        ...prev.backCover,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-stone-800 font-serif-sc text-base sm:text-lg">
              定制与编辑读书感想集
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 px-6 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer font-serif-sc ${
              activeTab === 'student'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>1. 封面与基本信息</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer font-serif-sc ${
              activeTab === 'books'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>2. 十一篇读书感想</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backCover')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer font-serif-sc ${
              activeTab === 'backCover'
                ? 'border-amber-600 text-amber-900 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. 封底寄语与总结</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: Student & Cover Info */}
          {activeTab === 'student' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Booklet Title */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    感想集大标题
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="假期读书感想集"
                  />
                </div>

                {/* Booklet Subtitle */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    副标题 / 寄语标语
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="阅读点亮智慧 · 亲子共伴成长"
                  />
                </div>

                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    学生姓名 <span className="text-amber-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.student.studentName}
                    onChange={(e) => handleStudentChange('studentName', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none font-bold"
                    placeholder="张子涵"
                    required
                  />
                </div>

                {/* School Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    学校名称
                  </label>
                  <input
                    type="text"
                    value={formData.student.schoolName}
                    onChange={(e) => handleStudentChange('schoolName', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="实验小学"
                  />
                </div>

                {/* Grade & Class */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    年级 / 班级
                  </label>
                  <input
                    type="text"
                    value={formData.student.gradeClass}
                    onChange={(e) => handleStudentChange('gradeClass', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="四年级 (2) 班"
                  />
                </div>

                {/* Holiday Season */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    假期季标
                  </label>
                  <input
                    type="text"
                    value={formData.student.holidaySeason}
                    onChange={(e) => handleStudentChange('holidaySeason', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="2026年 假期亲子共读册"
                  />
                </div>

                {/* Father's Name & Phone */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    父亲姓名
                  </label>
                  <input
                    type="text"
                    value={formData.student.fatherName || ''}
                    onChange={(e) => handleStudentChange('fatherName', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="石进"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    父亲联系电话 <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.student.fatherPhone}
                      onChange={(e) => handleStudentChange('fatherPhone', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      placeholder="138-8888-6666"
                      required
                    />
                  </div>
                </div>

                {/* Mother's Name & Phone */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    母亲姓名
                  </label>
                  <input
                    type="text"
                    value={formData.student.motherName || ''}
                    onChange={(e) => handleStudentChange('motherName', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="何苗"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    母亲联系电话 <span className="text-amber-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.student.motherPhone}
                      onChange={(e) => handleStudentChange('motherPhone', e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                      placeholder="139-6666-8888"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Child Photo Section */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-18 rounded-lg overflow-hidden border border-stone-300 bg-white shrink-0 flex items-center justify-center">
                    {formData.student.photoUrl ? (
                      <img
                        src={formData.student.photoUrl}
                        alt="学生照"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-[10px] text-stone-400 text-center font-serif-sc p-1 leading-tight">
                        留白框
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-800 font-serif-sc">
                      封面贴照片区域（可传可不传）
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {formData.student.photoUrl
                        ? '已上传封面照片，可更换或清除留空'
                        : '未传照片：封面将保留标准「贴孩子照片」线框，供打印后手贴'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {formData.student.photoUrl && (
                    <button
                      type="button"
                      onClick={() => handleStudentChange('photoUrl', '')}
                      className="px-2.5 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg text-xs font-medium cursor-pointer"
                    >
                      清空留框
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPhotoUploader();
                    }}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
                  >
                    {formData.student.photoUrl ? '更换照片' : '上传照片'}
                  </button>
                </div>
              </div>

              {/* Motto */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                  孩子/家庭座右铭
                </label>
                <input
                  type="text"
                  value={formData.student.motto}
                  onChange={(e) => handleStudentChange('motto', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  placeholder="读万卷书，行万里路；以书为友，温润心灵。"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Book Reflection Pages */}
          {activeTab === 'books' && (
            <div className="space-y-4">
              {/* Book selector chips */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2 font-serif-sc">
                  选择要编辑的读书感想页 (共 11 本)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1.5 bg-stone-100 rounded-xl border border-stone-200">
                  {formData.books.map((b, idx) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setSelectedBookIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-serif-sc transition-all cursor-pointer ${
                        selectedBookIndex === idx
                          ? 'bg-amber-700 text-white font-bold shadow-xs'
                          : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      <span>{b.numberStr}. {b.shortTitle}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Selected Book Editor */}
              {formData.books[selectedBookIndex] && (
                <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="font-bold text-stone-800 text-sm font-serif-sc">
                      第 {formData.books[selectedBookIndex].numberStr} 篇 · {formData.books[selectedBookIndex].title}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      目录第 {selectedBookIndex + 1} 项
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        文章题目 / 标题
                      </label>
                      <input
                        type="text"
                        value={formData.books[selectedBookIndex].title}
                        onChange={(e) => handleBookChange(selectedBookIndex, 'title', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">
                        所属类别 / 维度
                      </label>
                      <input
                        type="text"
                        value={formData.books[selectedBookIndex].category}
                        onChange={(e) => handleBookChange(selectedBookIndex, 'category', e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      核心金句 / 提炼点
                    </label>
                    <input
                      type="text"
                      value={formData.books[selectedBookIndex].goldenQuote}
                      onChange={(e) => handleBookChange(selectedBookIndex, 'goldenQuote', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-serif-sc italic"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      读书心得与详细感想 (正文)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.books[selectedBookIndex].reflectionText}
                      onChange={(e) => handleBookChange(selectedBookIndex, 'reflectionText', e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed font-serif-sc"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      家庭实践与亲子共读启示
                    </label>
                    <textarea
                      rows={2}
                      value={formData.books[selectedBookIndex].parentTakeaway}
                      onChange={(e) => handleBookChange(selectedBookIndex, 'parentTakeaway', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-serif-sc"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BackCover */}
          {activeTab === 'backCover' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    封底主标
                  </label>
                  <input
                    type="text"
                    value={formData.backCover.closingTitle}
                    onChange={(e) => handleBackCoverChange('closingTitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                    封底副标
                  </label>
                  <input
                    type="text"
                    value={formData.backCover.closingSubtitle}
                    onChange={(e) => handleBackCoverChange('closingSubtitle', e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                  假期阅读结语与亲子感言
                </label>
                <textarea
                  rows={4}
                  value={formData.backCover.reflectionSummary}
                  onChange={(e) => handleBackCoverChange('reflectionSummary', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed font-serif-sc"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                  家庭阅读倡议与承诺
                </label>
                <input
                  type="text"
                  value={formData.backCover.parentPledge}
                  onChange={(e) => handleBackCoverChange('parentPledge', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
                  教师评语（预设）
                </label>
                <textarea
                  rows={2}
                  value={formData.backCover.teacherComment}
                  onChange={(e) => handleBackCoverChange('teacherComment', e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>
          )}

          {/* Footer Save / Cancel Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-xl cursor-pointer"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs sm:text-sm font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>保存修改</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
