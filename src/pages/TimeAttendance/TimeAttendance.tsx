import { useEffect, useMemo, useState } from 'react';
import { Avatar, Icon } from '../../components';

const tabs = ['Live View', 'Calendar', 'Scheduling', 'Timesheets'] as const;
type TabKey = typeof tabs[number];
type ViewMode = 'grid' | 'list' | 'gantt';

interface StatusCard {
  id: string;
  status: string;
  statusTone: 'green' | 'amber' | 'red' | 'gray' | 'blue';
  name: string;
  avatarSrc: string;
  department?: string;
  shiftLabel?: string;
  timeLabel?: string;
  project?: string;
  today?: string;
  weekly: string;
  overtime: string;
  progressPercent: number;
  progressTone: 'green' | 'amber' | 'red';
  extraMetricLabel?: string;
  extraMetricValue?: string;
  clockInMethod?: 'mobile' | 'web' | 'terminal';
  clockInAddress?: string;
}

interface ScheduleSegment {
  start: number;
  end: number;
  tone: 'green' | 'amber';
}

interface ScheduleRow {
  id: string;
  name: string;
  avatarSrc: string;
  status: 'active' | 'late' | 'absent' | 'pto';
  scheduleText?: string;
  statusLabel?: string;
  trackStart: number;
  trackEnd: number;
  durationLabel?: string;
  lateAt?: number;
  segments?: ScheduleSegment[];
}

const cards: StatusCard[] = [
  { id: '1', status: 'Absent', statusTone: 'red', name: 'Jessica Martinez', avatarSrc: 'https://i.pravatar.cc/160?img=1', department: 'Operations', shiftLabel: 'Front Desk • 9:00AM-5:00PM', timeLabel: 'No clock-in recorded', project: 'Front Desk shift started at 9:00AM', weekly: '28h 40m', overtime: 'OT Status', progressPercent: 18, progressTone: 'green' },
  { id: '2', status: 'Clocked In (late)', statusTone: 'amber', name: 'Michael Brown', avatarSrc: 'https://i.pravatar.cc/160?img=51', department: 'Warehouse', shiftLabel: 'Receiving • 8:30AM-5:00PM', timeLabel: 'Clocked in 9:14AM', project: 'Warehouse Receiving » Morning Intake', today: '0h 48m', weekly: '31h 05m', overtime: 'OT Status', progressPercent: 46, progressTone: 'green', clockInMethod: 'terminal' },
  { id: '3', status: 'Clocked In (late)', statusTone: 'amber', name: 'Olivia Parker', avatarSrc: 'https://i.pravatar.cc/160?img=26', department: 'Support', shiftLabel: 'Benefits Queue • 8:45AM-5:15PM', timeLabel: 'Clocked in 9:07AM', project: 'Support Queue » Benefits Escalations', today: '1h 12m', weekly: '34h 02m', overtime: 'OT Status', progressPercent: 41, progressTone: 'green', clockInMethod: 'mobile', clockInAddress: '525 W Ashton Blvd, Lehi, UT 84043' },
  { id: '4', status: 'On Break', statusTone: 'blue', name: 'Frank Rodriguez', avatarSrc: 'https://i.pravatar.cc/160?img=13', department: 'Finance', shiftLabel: 'Payroll • 8:00AM-5:00PM', timeLabel: 'Clocked in 8:02AM • Break started 10:18AM', project: 'Payroll Review » Biweekly Closeout', today: '2h 16m', weekly: '37h 31m', overtime: 'OT Status', progressPercent: 100, progressTone: 'red', extraMetricLabel: 'OT', extraMetricValue: '1h 44m', clockInMethod: 'web' },
  { id: '5', status: 'Clocked In', statusTone: 'green', name: 'Grace Anderson', avatarSrc: 'https://i.pravatar.cc/160?img=48', department: 'People Ops', shiftLabel: 'Onboarding • 9:00AM-5:30PM', timeLabel: 'Clocked in 8:55AM', project: 'People Ops » New Hire Orientation', today: '1h 24m', weekly: '33h 13m', overtime: 'OT Status', progressPercent: 72, progressTone: 'amber', clockInMethod: 'mobile', clockInAddress: '42 N Center St, American Fork, UT 84003' },
  { id: '6', status: 'Clocked In', statusTone: 'green', name: 'Liam Foster', avatarSrc: 'https://i.pravatar.cc/160?img=17', department: 'Marketing', shiftLabel: 'Creative • 8:30AM-5:00PM', timeLabel: 'Clocked in 8:43AM', project: 'Brand Studio » Campaign Reviews', today: '1h 39m', weekly: '35h 21m', overtime: 'OT Status', progressPercent: 69, progressTone: 'amber', clockInMethod: 'terminal' },
  { id: '7', status: 'Clocked In', statusTone: 'green', name: 'Noah Jackson', avatarSrc: 'https://i.pravatar.cc/160?img=52', department: 'Operations', shiftLabel: 'Vendor Ops • 9:00AM-5:00PM', timeLabel: 'Clocked in 8:58AM', project: 'Operations » Vendor Coordination', today: '1h 18m', weekly: '32h 47m', overtime: 'OT Status', progressPercent: 63, progressTone: 'amber', clockInMethod: 'web' },
  { id: '8', status: 'PTO', statusTone: 'gray', name: 'Emma Wilson', avatarSrc: 'https://i.pravatar.cc/160?img=44', department: 'Finance', shiftLabel: 'Approved PTO', timeLabel: 'Approved PTO for today', project: 'Out of office • Returns tomorrow', weekly: '24h 10m', overtime: 'OT Status', progressPercent: 24, progressTone: 'green' },
  { id: '9', status: 'Off Today', statusTone: 'gray', name: 'Taylor Morgan', avatarSrc: 'https://i.pravatar.cc/160?img=20', department: 'Technology', shiftLabel: 'Scheduled off', timeLabel: 'Next shift starts tomorrow at 8:00AM', project: 'Scheduled day off', weekly: '36h 12m', overtime: 'OT Status', progressPercent: 70, progressTone: 'amber' },
  { id: '10', status: 'Clocked In', statusTone: 'green', name: 'Sarah Chen', avatarSrc: 'https://i.pravatar.cc/160?img=5', department: 'Executive', shiftLabel: 'Leadership • 8:30AM-5:30PM', timeLabel: 'Clocked in 8:31AM', project: 'Executive » Planning Review', today: '1h 51m', weekly: '38h 08m', overtime: 'OT Status', progressPercent: 82, progressTone: 'amber', clockInMethod: 'mobile', clockInAddress: '500 Terry A Francois Blvd, San Francisco, CA 94158' },
  { id: '11', status: 'Off Today', statusTone: 'gray', name: 'Ava Thompson', avatarSrc: 'https://i.pravatar.cc/160?img=32', department: 'Retail', shiftLabel: 'Scheduled off', timeLabel: 'Weekend schedule', project: 'No assigned shift today', weekly: '29h 55m', overtime: 'OT Status', progressPercent: 15, progressTone: 'green' },
  { id: '12', status: 'Clocked In', statusTone: 'green', name: 'Daniel Kim', avatarSrc: 'https://i.pravatar.cc/160?img=12', department: 'IT', shiftLabel: 'Help Desk • 8:30AM-5:00PM', timeLabel: 'Clocked in 8:48AM', project: 'IT Help Desk » Device Setup', today: '1h 29m', weekly: '34h 44m', overtime: 'OT Status', progressPercent: 58, progressTone: 'amber', clockInMethod: 'terminal' },
];

const insights = [
  {
    id: '1',
    title: 'Michael Brown has a late pattern',
    description: 'Michael has clocked in late 3 times in the last 2 weeks, most often on opening shifts.',
  },
  {
    id: '2',
    title: 'Grace Anderson is trending consistent',
    description: 'Grace has started on time for 10 straight scheduled shifts over the last 2 weeks.',
  },
  {
    id: '3',
    title: 'Front desk coverage has been tight',
    description: 'The opening front desk shift has had a late or missed clock-in 4 times in the last 14 days.',
  },
] as const;

const ganttHours = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM'] as const;
const ganttStartHour = 6;
const ganttEndHour = 22;
const currentHour = 13;

const ganttRows: ScheduleRow[] = [
  { id: 'g1', name: 'Charlotte Hernandez', avatarSrc: 'https://i.pravatar.cc/160?img=33', status: 'absent', statusLabel: 'ABSENT', trackStart: 10.2, trackEnd: 17.0 },
  { id: 'g2', name: 'Mason Lee', avatarSrc: 'https://i.pravatar.cc/160?img=54', status: 'absent', statusLabel: 'ABSENT', trackStart: 8.6, trackEnd: 15.8 },
  { id: 'g3', name: 'Priya Gomez', avatarSrc: 'https://i.pravatar.cc/160?img=47', status: 'absent', statusLabel: 'ABSENT', trackStart: 8.6, trackEnd: 14.2 },
  { id: 'g4', name: 'Alexander Thomas', avatarSrc: 'https://i.pravatar.cc/160?img=60', status: 'late', lateAt: 8.1, trackStart: 9.1, trackEnd: 14.7, durationLabel: '5h 12m', segments: [{ start: 9.1, end: 14.2, tone: 'green' }] },
  { id: 'g5', name: 'Noah Davis', avatarSrc: 'https://i.pravatar.cc/160?img=68', status: 'active', trackStart: 9.1, trackEnd: 16.3, durationLabel: '5h 12m', segments: [{ start: 9.1, end: 14.2, tone: 'green' }] },
  { id: 'g6', name: 'William Jones', avatarSrc: 'https://i.pravatar.cc/160?img=12', status: 'late', lateAt: 9.0, trackStart: 9.9, trackEnd: 16.0, durationLabel: '4h 27m', segments: [{ start: 9.9, end: 14.35, tone: 'green' }] },
  { id: 'g7', name: 'Sophia Miller', avatarSrc: 'https://i.pravatar.cc/160?img=49', status: 'late', lateAt: 11.0, trackStart: 11.1, trackEnd: 17.1, durationLabel: '3h 7m', segments: [{ start: 11.1, end: 14.2, tone: 'green' }] },
  { id: 'g8', name: 'Henry Wilson', avatarSrc: 'https://i.pravatar.cc/160?img=65', status: 'active', trackStart: 9.1, trackEnd: 14.25, durationLabel: '4h 15m', segments: [{ start: 9.1, end: 13.0, tone: 'green' }, { start: 13.0, end: 14.0, tone: 'amber' }] },
  { id: 'g9', name: 'Oliver Brown', avatarSrc: 'https://i.pravatar.cc/160?img=14', status: 'active', trackStart: 10.4, trackEnd: 14.1, durationLabel: '3h 15m', segments: [{ start: 10.4, end: 13.3, tone: 'green' }, { start: 13.3, end: 14.0, tone: 'amber' }] },
  { id: 'g10', name: 'James Davis', avatarSrc: 'https://i.pravatar.cc/160?img=11', status: 'active', trackStart: 8.0, trackEnd: 14.2, durationLabel: '6h 12m', segments: [{ start: 8.0, end: 14.2, tone: 'green' }] },
  { id: 'g11', name: 'Lucas Lopez', avatarSrc: 'https://i.pravatar.cc/160?img=15', status: 'active', trackStart: 8.6, trackEnd: 14.3, durationLabel: '5h 42m', segments: [{ start: 8.6, end: 14.3, tone: 'green' }] },
  { id: 'g12', name: 'Mia Rodriguez', avatarSrc: 'https://i.pravatar.cc/160?img=32', status: 'active', trackStart: 9.6, trackEnd: 14.32, durationLabel: '4h 43m', segments: [{ start: 9.6, end: 14.32, tone: 'green' }] },
  { id: 'g13', name: 'Ava Garcia', avatarSrc: 'https://i.pravatar.cc/160?img=36', status: 'active', trackStart: 9.1, trackEnd: 14.38, durationLabel: '5h 13m', segments: [{ start: 9.1, end: 14.38, tone: 'green' }] },
  { id: 'g14', name: 'Amelia Gonzalez', avatarSrc: 'https://i.pravatar.cc/160?img=24', status: 'active', trackStart: 9.6, trackEnd: 14.32, durationLabel: '4h 43m', segments: [{ start: 9.6, end: 14.32, tone: 'green' }] },
  { id: 'g15', name: 'Isabella Miller', avatarSrc: 'https://i.pravatar.cc/160?img=25', status: 'active', trackStart: 11.0, trackEnd: 14.22, durationLabel: '3h 13m', segments: [{ start: 11.0, end: 14.22, tone: 'green' }] },
  { id: 'g16', name: 'Liam Wilson', avatarSrc: 'https://i.pravatar.cc/160?img=23', status: 'active', trackStart: 10.1, trackEnd: 14.22, durationLabel: '4h 13m', segments: [{ start: 10.1, end: 14.22, tone: 'green' }] },
  { id: 'g17', name: 'Benjamin Martin', avatarSrc: 'https://i.pravatar.cc/160?img=22', status: 'active', trackStart: 10.6, trackEnd: 14.32, durationLabel: '3h 43m', segments: [{ start: 10.6, end: 14.32, tone: 'green' }] },
  { id: 'g18', name: 'Evelyn Anderson', avatarSrc: 'https://i.pravatar.cc/160?img=19', status: 'active', trackStart: 9.35, trackEnd: 14.33, durationLabel: '4h 58m', segments: [{ start: 9.35, end: 14.33, tone: 'green' }] },
  { id: 'g19', name: 'Maria Chen', avatarSrc: 'https://i.pravatar.cc/160?img=18', status: 'active', trackStart: 10.1, trackEnd: 14.23, durationLabel: '4h 13m', segments: [{ start: 10.1, end: 14.23, tone: 'green' }] },
  { id: 'g20', name: 'Emma Taylor', avatarSrc: 'https://i.pravatar.cc/160?img=17', status: 'active', trackStart: 9.6, trackEnd: 14.32, durationLabel: '4h 43m', segments: [{ start: 9.6, end: 14.32, tone: 'green' }] },
  { id: 'g21', name: 'Jake Patel', avatarSrc: 'https://i.pravatar.cc/160?img=16', status: 'late', lateAt: 8.0, trackStart: 8.2, trackEnd: 15.0, durationLabel: '4h 50m', segments: [{ start: 8.2, end: 13.0, tone: 'green' }, { start: 13.0, end: 14.0, tone: 'amber' }] },
  { id: 'g22', name: 'Elena Rodriguez', avatarSrc: 'https://i.pravatar.cc/160?img=41', status: 'pto', statusLabel: 'PTO', trackStart: 10.6, trackEnd: 17.0 },
  { id: 'g23', name: 'David Chen', avatarSrc: 'https://i.pravatar.cc/160?img=40', status: 'pto', statusLabel: 'PTO', trackStart: 10.0, trackEnd: 17.5 },
] as const;

function PulseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-5 w-5 text-[var(--color-primary-strong)]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1.5 10h3.2l1.6-3.6 3.1 8 2.4-5.1h2.4" />
      <path d="M15.2 10H18.5" />
    </svg>
  );
}

function InsightTile({ title, description }: { title: string; description: string }) {
  return (
    <button
      type="button"
      className="w-full rounded-[16px] p-[1px] text-left"
      style={{
        background: 'linear-gradient(135deg, #BEE5C8 0%, #D8D1FF 50%, #F7C7A1 100%)',
        boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)',
      }}
    >
      <span className="flex items-center gap-4 rounded-[15px] bg-[var(--surface-neutral-white)] px-4 py-[14px]">
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-[22px] font-medium text-[#006FA6]">{title}</span>
          <span className="block text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{description}</span>
        </span>
        <Icon name="chevron-right" size={16} className="shrink-0 text-[var(--text-neutral-medium)]" />
      </span>
    </button>
  );
}

function GridViewIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <rect x="1.5" y="1.5" width="3" height="3" rx="0.7" />
      <rect x="6.5" y="1.5" width="3" height="3" rx="0.7" />
      <rect x="11.5" y="1.5" width="3" height="3" rx="0.7" />
      <rect x="1.5" y="6.5" width="3" height="3" rx="0.7" />
      <rect x="6.5" y="6.5" width="3" height="3" rx="0.7" />
      <rect x="11.5" y="6.5" width="3" height="3" rx="0.7" />
      <rect x="1.5" y="11.5" width="3" height="3" rx="0.7" />
      <rect x="6.5" y="11.5" width="3" height="3" rx="0.7" />
      <rect x="11.5" y="11.5" width="3" height="3" rx="0.7" />
    </svg>
  );
}

function ListViewIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current">
      <circle cx="3" cy="3.25" r="1.25" />
      <circle cx="3" cy="8" r="1.25" />
      <circle cx="3" cy="12.75" r="1.25" />
      <rect x="6" y="2.3" width="8" height="1.9" rx="0.9" />
      <rect x="6" y="7.05" width="8" height="1.9" rx="0.9" />
      <rect x="6" y="11.8" width="8" height="1.9" rx="0.9" />
    </svg>
  );
}

function GanttViewIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.25 2.5v11.25h11.5" />
      <rect x="5" y="4" width="6.25" height="2.1" rx="1.05" fill="currentColor" stroke="none" />
      <rect x="7" y="7.2" width="5" height="2.1" rx="1.05" fill="currentColor" stroke="none" />
      <rect x="4" y="10.4" width="7.25" height="2.1" rx="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

function timelinePercent(hour: number) {
  return ((hour - ganttStartHour) / (ganttEndHour - ganttStartHour)) * 100;
}

function scheduleLabelClass(status: ScheduleRow['status']) {
  if (status === 'absent') return 'text-[#FF295F]';
  if (status === 'pto') return 'text-[#5C6CFF]';
  return 'text-transparent';
}

function scheduleSegmentClass(tone: ScheduleSegment['tone']) {
  return tone === 'amber' ? 'bg-[#FFB400]' : 'bg-[#10C47A]';
}

function statusBadgeClass(tone: StatusCard['statusTone']) {
  if (tone === 'green') return 'bg-[#E7F5EA] text-[#2A7B3F]';
  if (tone === 'amber') return 'bg-[#FDEFD9] text-[#A56417]';
  if (tone === 'red') return 'bg-[#FDE4E1] text-[#B34B3D]';
  if (tone === 'blue') return 'bg-[#DDF2FF] text-[#006FA6]';
  return 'bg-[var(--surface-neutral-xx-weak)] text-[var(--text-neutral-medium)]';
}

function progressBarClass(tone: StatusCard['progressTone']) {
  if (tone === 'green') return 'bg-[#3E8F45]';
  if (tone === 'amber') return 'bg-[#CC5C00]';
  return 'bg-[#D7263D]';
}

function EmployeeStatusCard({ card }: { card: StatusCard }) {
  return (
    <div
      className="flex min-h-[256px] flex-col rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-4 py-[14px]"
      style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
    >
      <div className="flex items-start justify-between">
        <Avatar src={card.avatarSrc} alt={card.name} size={40} className="shadow-none" />
        <span className={`rounded-[6px] px-[10px] py-[5px] text-[13px] font-medium leading-[19px] ${statusBadgeClass(card.statusTone)}`}>
          {card.status}
        </span>
      </div>

      <h4 className="mt-5 text-[18px] leading-[26px] font-semibold text-[var(--color-primary-strong)]">
        {card.name}
      </h4>
      <div className="min-h-[40px]">
        {card.timeLabel ? (
          <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{card.timeLabel}</p>
        ) : (
          <p className="invisible text-[13px] leading-[19px]">Placeholder</p>
        )}
        {card.project ? (
          <p className="text-[12px] leading-[17px] text-[var(--text-neutral-medium)]">{card.project}</p>
        ) : (
          <p className="invisible text-[12px] leading-[17px]">Placeholder</p>
        )}
      </div>

      <div className="mt-4 h-px bg-[var(--border-neutral-x-weak)]" />

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[13px] leading-[19px] text-[var(--text-neutral-x-strong)]">Today</p>
          <p className="text-[15px] leading-[22px] font-bold text-[var(--text-neutral-x-strong)]">{card.today ?? '--'}</p>
        </div>
        <div>
          <p className="text-[13px] leading-[19px] text-[var(--text-neutral-x-strong)]">Weekly</p>
          <p className="text-[15px] leading-[22px] font-bold text-[var(--text-neutral-x-strong)]">{card.weekly}</p>
        </div>
        <div>
          <p className={`text-[13px] leading-[19px] text-[var(--text-neutral-x-strong)] ${card.extraMetricLabel ? '' : 'invisible'}`}>
            {card.extraMetricLabel ?? 'OT'}
          </p>
          <p className={`text-[15px] leading-[22px] font-bold text-[var(--text-neutral-x-strong)] ${card.extraMetricValue ? '' : 'invisible'}`}>
            {card.extraMetricValue ?? '--'}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-3 pt-3">
        <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{card.overtime}</p>
        <div className="h-3 flex-1 rounded-full bg-[var(--surface-neutral-x-weak)]">
          <div className={`h-3 rounded-full ${progressBarClass(card.progressTone)}`} style={{ width: `${card.progressPercent}%` }} />
        </div>
      </div>
    </div>
  );
}

function EmployeeStatusRow({ card }: { card: StatusCard }) {
  return (
    <tr className="border-b border-[var(--border-neutral-xx-weak)] last:border-b-0">
      <td className="px-4 py-[15px]">
        <div className="flex items-start gap-3">
          <Avatar src={card.avatarSrc} alt={card.name} size={40} className="shadow-none" />
          <div className="min-w-0">
            <p className="truncate text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">{card.name}</p>
            <p className="truncate text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">
              {card.timeLabel ?? card.project ?? 'No shift assigned'}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-[15px] align-top text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
        {card.today ?? '--'}
      </td>
      <td className="px-4 py-[15px] align-top text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
        {card.weekly}
      </td>
      <td className="px-4 py-[15px] align-top text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
        {card.extraMetricLabel === 'OT' && card.extraMetricValue ? card.extraMetricValue : '--'}
      </td>
      <td className="px-4 py-[15px] align-top">
        <span className={`inline-flex rounded-[6px] px-[10px] py-[5px] text-[13px] font-medium leading-[19px] ${statusBadgeClass(card.statusTone)}`}>
          {card.status}
        </span>
      </td>
    </tr>
  );
}

function EmployeeDetailModal({
  employee,
  onClose,
}: {
  employee: StatusCard;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#676260]/95 p-6">
      <div
        className="flex max-h-[calc(100vh-48px)] w-full max-w-[860px] flex-col overflow-hidden rounded-[16px] bg-[var(--surface-neutral-white)]"
        style={{ boxShadow: '2px 2px 0px 2px rgba(56,49,47,0.13)' }}
      >
        <div className="flex items-center border-b border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] px-4 py-3">
          <h3 className="text-[18px] leading-[26px] font-semibold text-[var(--color-primary-strong)]">{employee.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] text-[var(--text-neutral-medium)]"
          >
            <Icon name="xmark" size={12} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="space-y-4">
              <div className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-4 text-center">
                <Avatar src={employee.avatarSrc} alt={employee.name} size="large" className="mx-auto shadow-none" />
                <p className="mt-4 text-[18px] leading-[26px] font-semibold text-[var(--color-primary-strong)]">{employee.name}</p>
                <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{employee.department ?? 'Team Member'}</p>
                <span className={`mt-4 inline-flex rounded-[6px] px-[10px] py-[5px] text-[13px] font-medium leading-[19px] ${statusBadgeClass(employee.statusTone)}`}>
                  {employee.status}
                </span>
              </div>

              <div className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
                <p className="text-[13px] leading-[19px] font-semibold text-[var(--text-neutral-x-strong)]">Shift</p>
                <p className="mt-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">{employee.shiftLabel ?? 'No scheduled shift'}</p>
                <p className="mt-3 text-[13px] leading-[19px] font-semibold text-[var(--text-neutral-x-strong)]">Clock-in Method</p>
                <p className="mt-1 text-[15px] leading-[22px] capitalize text-[var(--text-neutral-strong)]">{employee.clockInMethod ?? 'Not available'}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Today', employee.today ?? '--'],
                  ['Weekly', employee.weekly],
                  [employee.extraMetricLabel ?? 'OT', employee.extraMetricValue ?? '--'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
                    <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{label}</p>
                    <p className="mt-1 text-[22px] leading-[28px] font-semibold text-[var(--text-neutral-x-strong)]">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5">
                <p className="text-[15px] leading-[22px] font-semibold text-[var(--text-neutral-x-strong)]">Attendance Details</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">Latest activity</p>
                    <p className="mt-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">{employee.timeLabel ?? 'No activity recorded'}</p>
                  </div>
                  <div>
                    <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">Assignment</p>
                    <p className="mt-1 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">{employee.project ?? 'No active assignment'}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{employee.overtime}</p>
                  <div className="h-3 flex-1 rounded-full bg-[var(--surface-neutral-x-weak)]">
                    <div
                      className={`h-3 rounded-full ${progressBarClass(employee.progressTone)}`}
                      style={{ width: `${employee.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {employee.clockInMethod === 'mobile' && employee.clockInAddress ? (
                <div className="rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5">
                  <p className="text-[15px] leading-[22px] font-semibold text-[var(--text-neutral-x-strong)]">Mobile Clock-In Location</p>
                  <div className="mt-4 overflow-hidden rounded-[16px] border border-[var(--border-neutral-x-weak)] bg-[linear-gradient(180deg,#E7F4EB_0%,#EAF4F8_52%,#F6F3E9_100%)]">
                    <div className="relative h-[240px]">
                      <div
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.65) 0, rgba(255,255,255,0) 24%), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)',
                          backgroundSize: 'auto, 56px 56px, 56px 56px',
                        }}
                      />
                      <div className="absolute left-[18%] top-[22%] h-14 w-24 rounded-full bg-[#CFE8D6]/70 blur-[2px]" />
                      <div className="absolute right-[16%] top-[18%] h-16 w-28 rounded-full bg-[#CDE3F2]/75 blur-[2px]" />
                      <div className="absolute bottom-[20%] left-[24%] h-16 w-32 rounded-full bg-[#E8DFC7]/65 blur-[2px]" />
                      <div className="absolute left-[48%] top-[46%] -translate-x-1/2 -translate-y-full">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FF295F] text-white shadow-[0_8px_18px_rgba(255,41,95,0.28)]">
                          <Icon name="location-dot" size={18} className="translate-y-[-1px]" />
                        </div>
                        <div className="mx-auto h-4 w-[2px] bg-[#FF295F]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-3 rounded-[12px] bg-[var(--surface-neutral-xx-weak)] p-4">
                    <Icon name="location-dot" size={16} className="mt-0.5 text-[var(--color-primary-strong)]" />
                    <div>
                      <p className="text-[13px] leading-[19px] font-semibold text-[var(--text-neutral-x-strong)]">Clock-in address</p>
                      <p className="text-[15px] leading-[22px] text-[var(--text-neutral-strong)]">{employee.clockInAddress}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 pb-4 pt-2">
          <button type="button" onClick={onClose} className="text-[15px] leading-[22px] font-medium text-[#0047FF]">
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--color-primary-strong)] px-5 py-2 text-[15px] leading-[22px] font-semibold text-white"
            style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.08)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function GanttScheduleView() {
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="min-w-[980px]">
        <div className="grid grid-cols-[176px_68px_1fr] items-end gap-4 px-2 pb-4">
          <div />
          <div />
          <div className="relative">
            <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] text-center text-[12px] leading-[18px] font-semibold tracking-[0.08em] text-[#9AA9C0]">
              {ganttHours.map((hour) => (
                <span key={hour}>{hour}</span>
              ))}
            </div>
            <div
              className="pointer-events-none absolute bottom-[-14px] top-[22px] w-px bg-[#B9F3E7]"
              style={{ left: `${timelinePercent(currentHour)}%` }}
            >
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8FEAD6]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {ganttRows.map((row) => (
            <div key={row.id} className="grid grid-cols-[176px_68px_1fr] items-center gap-4 px-2">
              <div className="flex items-center gap-3">
                <Avatar src={row.avatarSrc} alt={row.name} size={40} className="shadow-none" />
                <div className="min-w-0">
                  <p className="truncate text-[15px] leading-[22px] font-semibold text-[#41526B]">{row.name}</p>
                </div>
              </div>

              <div className={`text-[11px] leading-[16px] font-bold tracking-[0.12em] ${scheduleLabelClass(row.status)}`}>
                {row.statusLabel ?? 'ACTIVE'}
              </div>

              <div className="relative h-[38px]">
                <div
                  className="absolute top-1/2 h-[28px] -translate-y-1/2 rounded-[7px] border border-[#DBE7F2] bg-[#F6FAFD]"
                  style={{
                    left: `${timelinePercent(row.trackStart)}%`,
                    width: `${timelinePercent(row.trackEnd) - timelinePercent(row.trackStart)}%`,
                  }}
                />

                {row.segments?.map((segment, index) => (
                  <div
                    key={`${row.id}-${index}`}
                    className={`absolute top-1/2 h-[28px] -translate-y-1/2 rounded-[7px] shadow-[0_8px_18px_rgba(255,71,133,0.18)] ${scheduleSegmentClass(segment.tone)}`}
                    style={{
                      left: `${timelinePercent(segment.start)}%`,
                      width: `${timelinePercent(segment.end) - timelinePercent(segment.start)}%`,
                      boxShadow: segment.tone === 'green' ? '0 8px 18px rgba(16,196,122,0.16)' : '0 8px 18px rgba(255,180,0,0.18)',
                    }}
                  />
                ))}

                {row.lateAt ? (
                  <div
                    className="absolute top-1/2"
                    style={{ left: `${timelinePercent(row.lateAt)}%` }}
                  >
                    <span className="absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[11px] leading-[16px] font-bold tracking-[0.12em] text-[#FF295F]">
                      LATE
                    </span>
                    <span className="absolute bottom-[2px] left-1/2 h-[34px] w-[2px] -translate-x-1/2 rounded-full bg-[#FF295F]" />
                    <span className="absolute bottom-[34px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FF295F]" />
                  </div>
                ) : null}

                {row.durationLabel ? (
                  <span
                    className="absolute top-1/2 ml-2 -translate-y-1/2 text-[12px] leading-[18px] font-semibold text-[#8BA2BE]"
                    style={{ left: `${timelinePercent((row.segments?.[row.segments.length - 1]?.end ?? row.trackEnd))}%` }}
                  >
                    {row.durationLabel}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TimeAttendance() {
  const [activeTab, setActiveTab] = useState<TabKey>('Live View');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showPotentialIssues, setShowPotentialIssues] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<StatusCard | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowPotentialIssues(true);
    }, 7000);

    return () => window.clearTimeout(timer);
  }, []);

  const pulseSummary = useMemo(() => {
    const clockedInCount = cards.filter((card) => card.status === 'Clocked In' || card.status === 'Clocked In (late)' || card.status === 'On Break').length;
    const onBreakCount = cards.filter((card) => card.status === 'On Break').length;
    const lateCount = cards.filter((card) => card.status === 'Clocked In (late)').length;
    const absentCount = cards.filter((card) => card.status === 'Absent').length;
    const offTodayCount = cards.filter((card) => card.status === 'Off Today' || card.status === 'PTO').length;
    const issueCount = absentCount + lateCount;

    return {
      totalEmployees: cards.length,
      clockedInCount,
      onBreakCount,
      lateCount,
      absentCount,
      offTodayCount,
      issueCount,
    };
  }, []);

  const teamPulseStats = [
    { label: 'Clocked In', value: `${pulseSummary.clockedInCount}/${pulseSummary.totalEmployees}`, icon: 'stopwatch' as const },
    { label: 'On Break', value: `${pulseSummary.onBreakCount}`, icon: 'mug-hot' as const },
    { label: 'Late', value: `${pulseSummary.lateCount}`, icon: 'clock' as const },
    { label: 'Absent', value: `${pulseSummary.absentCount}`, icon: 'ban' as const },
    { label: 'Off Today', value: `${pulseSummary.offTodayCount}`, icon: 'calendar' as const },
  ] as const;

  return (
    <div className="flex min-h-full flex-col p-6">
      <div
        className="flex min-h-0 flex-1 flex-col rounded-[var(--radius-large)] bg-[var(--surface-neutral-xx-weak)]"
      >
        <div className="bg-[var(--surface-neutral-xx-weak)] px-8 pb-6 pt-8">
          <div className="flex items-end justify-between gap-8">
            <div>
              <h1
                className="text-[58px] leading-[62px] font-semibold text-[var(--color-primary-strong)]"
                style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
              >
                Time & Attendance
              </h1>
              <p className="mt-2 text-[19px] leading-[28px] text-[var(--text-neutral-strong)]">
                Everything you need to manage your team&apos;s time & attendance.
              </p>
            </div>

            <div className="flex items-end gap-6">
              {tabs.map((tab) => {
                const isActive = tab === activeTab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`h-[44px] border-b-[3px] px-1 text-[18px] leading-[26px] transition-colors ${
                      isActive
                        ? 'border-[var(--color-primary-strong)] font-semibold text-[var(--color-primary-strong)]'
                        : 'border-transparent font-medium text-[var(--text-neutral-strong)]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-[var(--surface-neutral-xx-weak)] px-2 pb-4 pt-0">
          {activeTab === 'Live View' ? (
            <div className="grid gap-4 lg:grid-cols-[344px_1fr]">
              <div className="space-y-4">
                <section
                  className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
                  style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
                >
                  <div className="flex items-center gap-2">
                    <PulseIcon />
                    <span className="text-[18px] leading-[26px] font-semibold text-[var(--color-primary-strong)]">Team Pulse</span>
                    <span className="ml-auto text-[18px] leading-[26px] font-semibold text-[#FF2944]">Live: 9:12:34 AM</span>
                  </div>

                  <div className="mt-[17px]">
                    <p className={`text-[18px] leading-[26px] font-semibold ${showPotentialIssues ? 'text-[#D35400]' : 'text-[var(--color-primary-strong)]'}`}>
                      {showPotentialIssues ? `${pulseSummary.issueCount} Potential Issues` : '0 Issues'}
                    </p>
                    <p className="mt-1 text-[15px] leading-[22px] text-[var(--text-neutral-x-strong)]">
                      {showPotentialIssues
                        ? `${pulseSummary.absentCount} employee hasn’t clocked in yet and ${pulseSummary.lateCount} employees clocked in late.`
                        : 'Everyone is on time. 3 employees have an upcoming shift at 10AM.'}
                    </p>
                  </div>

                  <div className="mt-[17px] h-px bg-[var(--border-neutral-x-weak)]" />

                  <div className="mt-[17px] space-y-2">
                    {teamPulseStats.map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-[13px] leading-[19px] text-[var(--text-neutral-x-strong)]">
                          <Icon name={item.icon} size={12} className="text-[var(--text-neutral-x-strong)]" />
                          {item.label}
                        </span>
                        <span className="text-[15px] leading-[22px] font-bold text-[var(--text-neutral-x-strong)]">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mt-[17px] h-8 w-full rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-4 text-[15px] leading-[22px] font-medium text-[var(--text-neutral-strong)]"
                    style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
                  >
                    See More Details
                  </button>
                </section>

                <section
                  className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
                  style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="sparkles" size={20} className="text-[var(--color-primary-strong)]" />
                    <h3 className="text-[18px] leading-[26px] font-semibold text-[var(--color-primary-strong)]">Insights</h3>
                  </div>

                  <div className="mt-3 space-y-3">
                    {insights.map((item) => (
                      <InsightTile key={item.id} title={item.title} description={item.description} />
                    ))}
                  </div>

                  <button className="mt-3 text-[15px] leading-[22px] font-medium text-[#0047FF] hover:underline">
                    See All Insights
                  </button>
                </section>
              </div>

              <section
                className="min-w-0 rounded-[20px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
                style={{ boxShadow: '2px 2px 0px 2px rgba(56,49,47,0.05)' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-4">
                    <button
                      type="button"
                      className="flex h-10 min-w-[160px] items-center justify-between rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-4 text-[15px] leading-[22px] text-[var(--text-neutral-strong)]"
                      style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
                    >
                      All Statuses
                      <Icon name="caret-down" size={14} className="text-[var(--text-neutral-weak)]" />
                    </button>
                    <div className="relative min-w-[250px] flex-1 max-w-[360px]">
                      <Icon name="magnifying-glass" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-neutral-medium)]" />
                      <input
                        placeholder="Search Employee"
                        className="h-10 w-full rounded-[10px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-10 pr-4 text-[15px] leading-[22px] text-[var(--text-neutral-strong)] outline-none"
                        style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.04)' }}
                      />
                    </div>
                  </div>

                  <div className="inline-flex h-10 items-center overflow-hidden rounded-full bg-[var(--border-neutral-x-weak)] p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        viewMode === 'grid'
                          ? 'bg-[var(--color-primary-strong)] text-white shadow-[1px_0px_0px_1px_rgba(56,49,47,0.05)]'
                          : 'text-[var(--text-neutral-x-strong)]'
                      }`}
                    >
                      <GridViewIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        viewMode === 'list'
                          ? 'bg-[var(--color-primary-strong)] text-white shadow-[1px_0px_0px_1px_rgba(56,49,47,0.05)]'
                          : 'text-[var(--text-neutral-x-strong)]'
                      }`}
                    >
                      <ListViewIcon />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('gantt')}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        viewMode === 'gantt'
                          ? 'bg-[var(--color-primary-strong)] text-white shadow-[1px_0px_0px_1px_rgba(56,49,47,0.05)]'
                          : 'text-[var(--text-neutral-x-strong)]'
                      }`}
                    >
                      <GanttViewIcon />
                    </button>
                  </div>
                </div>

                {viewMode === 'grid' ? (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedEmployee(card)}
                        className="text-left"
                      >
                        <EmployeeStatusCard card={card} />
                      </button>
                    ))}
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="mt-6 overflow-hidden rounded-[12px] bg-[var(--surface-neutral-white)]">
                    <table className="w-full border-separate border-spacing-0">
                      <thead>
                        <tr>
                          {[
                            ['Employee', 'w-[32%] rounded-l-[8px]'],
                            ['Hours Today', 'w-[14%]'],
                            ['Weekly Hours', 'w-[15%]'],
                            ['OT', 'w-[11%]'],
                            ['Current Status', 'rounded-r-[8px]'],
                          ].map(([label, extraClass]) => (
                            <th
                              key={label}
                              className={`bg-[var(--surface-neutral-x-weak)] px-4 py-[13px] text-left text-[15px] leading-[22px] font-semibold text-[var(--text-neutral-strong)] ${extraClass}`}
                            >
                              {label}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cards.map((card) => (
                          <EmployeeStatusRow key={card.id} card={card} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <GanttScheduleView />
                )}
              </section>
            </div>
          ) : (
            <section
              className="min-w-0 rounded-[20px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-8"
              style={{ boxShadow: '2px 2px 0px 2px rgba(56,49,47,0.05)' }}
            >
              <div className="flex min-h-[520px] items-center justify-center rounded-[16px] border border-dashed border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-xx-weak)] px-8 text-center">
                <div>
                  <p className="text-[24px] leading-[32px] font-semibold text-[var(--color-primary-strong)]">{activeTab}</p>
                  <p className="mt-2 text-[15px] leading-[22px] text-[var(--text-neutral-medium)]">
                    This tab will get its own dedicated page content later. Only the shared header and tabs stay the same.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
      {selectedEmployee ? (
        <EmployeeDetailModal employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      ) : null}
    </div>
  );
}

export default TimeAttendance;
