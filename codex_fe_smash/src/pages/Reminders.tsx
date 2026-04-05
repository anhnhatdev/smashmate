import React, { useState } from 'react'
import {
  Bell,
  Plus,
  Clock3,
  CalendarDays,
  Target,
  Trash2,
  BellRing,
  X,
  PlusCircle,
} from 'lucide-react'
import { defaultReminders } from '../data'
import { useToast } from '../hooks/useToast'
import type { ReminderItem } from '../types'

export function RemindersPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>(defaultReminders)
  const { addToast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newReminder, setNewReminder] = useState({ title: '', note: '', time: 'Hôm nay' })

  const handleDelete = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id))
    addToast('Đã xóa lời nhắc', 'info')
  }

  const handleAdd = () => {
    if (!newReminder.title.trim()) return
    const id = Date.now()
    setReminders(prev => [{ id, ...newReminder, type: 'match' } as ReminderItem, ...prev])
    setNewReminder({ title: '', note: '', time: 'Hôm nay' })
    setIsModalOpen(false)
    addToast('Đã thêm lời nhắc mới thành công')
  }

  return (
    <div className="container app-page">
      <section className="page-hero compact centered" aria-labelledby="reminders-title">
        <div className="eyebrow">
          <Bell size={14} aria-hidden="true" />
          Lời nhắc của tôi
        </div>
        <h1 id="reminders-title" className="page-title">Quản lý thời gian tập luyện</h1>
        <p className="page-subtitle">
          Theo dõi những kèo, sân và các sự kiện cầu lông quan trọng mà bạn đã thiết lập.
        </p>
      </section>

      <div className="reminders-actions">
        <button
          className="cta-button primary small"
          onClick={() => setIsModalOpen(true)}
          aria-label="Thêm lời nhắc mới"
        >
          <Plus size={16} />
          <span>Thêm lời nhắc</span>
        </button>
      </div>

      <div className="reminder-layout">
        <div className="reminder-stack" role="list">
          {reminders.length === 0 ? (
            <div className="empty-state glass">
              <span className="empty-emoji">⏰</span>
              <h3>Không có lời nhắc nào</h3>
              <p>Bạn chưa thêm lời nhắc tập luyện hoặc theo dõi kèo nào.</p>
            </div>
          ) : (
            reminders.map((item) => (
              <article key={item.id} className={`reminder-card glass${item.type === 'court' ? ' accent-emerald' : ''}`}>
                <div className="reminder-info">
                  <div className="reminder-header">
                    <div className="icon-wrap"><BellRing size={16} /></div>
                    <strong>{item.title}</strong>
                  </div>
                  <p>{item.note}</p>
                </div>
                <div className="reminder-actions-row">
                  <div className="reminder-time">
                    <Clock3 size={14} />
                    {item.time}
                  </div>
                  <button
                    className="delete-reminder-btn"
                    onClick={() => handleDelete(item.id)}
                    aria-label="Xóa lời nhắc"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <aside className="reminders-sidebar">
          <div className="calendar-card glass">
            <div className="calendar-header">
              <CalendarDays size={18} />
              <h4>Tháng 4, 2026</h4>
            </div>
            <div className="calendar-mini-view">
              {/* Giả lập lịch mini */}
              <div className="calendar-grid">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className={`calendar-day${[4, 12, 18].includes(i+1) ? ' active' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="calendar-legend">
              <span className="dot dot-active" />
              <span>Dấu chấm biểu thị ngày có lời nhắc</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Add Reminder Modal */}
      {isModalOpen && (
        <div className="modal-overlay glass">
          <div className="modal-content glass slide-in-top">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={18} /></button>
            <h3>Thêm lời nhắc mới</h3>
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="title">Tên sự kiện</label>
                <input
                  id="title"
                  value={newReminder.title}
                  onChange={e => setNewReminder({ ...newReminder, title: e.target.value })}
                  placeholder="Ví dụ: Kèo đôi nam tối nay"
                />
              </div>
              <div className="form-group">
                <label htmlFor="note">Ghi chú</label>
                <textarea
                  id="note"
                  value={newReminder.note}
                  onChange={e => setNewReminder({ ...newReminder, note: e.target.value })}
                  placeholder="Mô tả chi tiết lời nhắc..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="time">Thời điểm nhắc</label>
                <input
                  id="time"
                  value={newReminder.time}
                  onChange={e => setNewReminder({ ...newReminder, time: e.target.value })}
                  placeholder="VD: Thứ 5, 19:30"
                />
              </div>
              <button className="cta-button primary full-width" onClick={handleAdd}>
                Lưu lời nhắc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
