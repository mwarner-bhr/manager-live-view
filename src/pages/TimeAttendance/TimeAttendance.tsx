import { useState } from 'react';
import { Icon } from '../../components';

const tabs = ['Live View', 'Calendar', 'Scheduling', 'Timesheets'] as const;
type TabKey = typeof tabs[number];

interface StatusCard {
  id: string;
  status: string;
  statusTone: 'green' | 'amber' | 'red' | 'gray';
  name: string;
  timeLabel: string;
  project: string;
  today: string;
  weekly: string;
  overtime: string;
  progressTone: 'green' | 'amber' | 'red';
}

const cards: StatusCard[] = [
  { id: '1', status: 'Absent', statusTone: 'red', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'green' },
  { id: '2', status: 'Clocked In (late)', statusTone: 'amber', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'green' },
  { id: '3', status: 'Clocked In (late)', statusTone: 'amber', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'green' },
  { id: '4', status: 'On Break', statusTone: 'amber', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'red' },
  { id: '5', status: 'Clocked In', statusTone: 'green', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'amber' },
  { id: '6', status: 'Clocked In', statusTone: 'green', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'amber' },
  { id: '7', status: 'Clocked In', statusTone: 'green', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'amber' },
  { id: '8', status: 'PTO', statusTone: 'gray', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'green' },
  { id: '9', status: 'Off Today', statusTone: 'gray', name: 'Eusebio Ankunding', timeLabel: 'Clocked in 9:05AM', project: '(Project name) * (Task Name)', today: '1h 20m', weekly: '33h 13m', overtime: 'OT Status', progressTone: 'amber' },
];

function statusBadgeClass(tone: StatusCard['statusTone']) {
  if (tone === 'green') return 'bg-[#E7F5EA] text-[#2A7B3F]';
  if (tone === 'amber') return 'bg-[#FDEFD9] text-[#A56417]';
  if (tone === 'red') return 'bg-[#FDE4E1] text-[#B34B3D]';
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
      className="rounded-[14px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-4 py-3"
      style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
    >
      <div className="flex items-start justify-between">
        <div className="h-9 w-9 rounded-[10px] bg-[var(--surface-neutral-x-weak)]" />
        <span className={`rounded-full px-2 py-1 text-[11px] font-semibold leading-[15px] ${statusBadgeClass(card.statusTone)}`}>
          {card.status}
        </span>
      </div>

      <h4 className="mt-3 text-[22px] leading-[28px] font-semibold text-[var(--color-primary-strong)]">
        {card.name}
      </h4>
      <p className="text-[13px] leading-[19px] text-[var(--text-neutral-medium)]">{card.timeLabel}</p>
      <p className="text-[12px] leading-[17px] text-[var(--text-neutral-medium)]">{card.project}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[12px] leading-[17px] text-[var(--text-neutral-medium)]">Today</p>
          <p className="text-[22px] leading-[28px] font-semibold text-[var(--text-neutral-x-strong)]">{card.today}</p>
        </div>
        <div>
          <p className="text-[12px] leading-[17px] text-[var(--text-neutral-medium)]">Weekly</p>
          <p className="text-[22px] leading-[28px] font-semibold text-[var(--text-neutral-x-strong)]">{card.weekly}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-[12px] leading-[17px] text-[var(--text-neutral-medium)]">{card.overtime}</p>
        <div className="mt-1 h-2 rounded-full bg-[var(--surface-neutral-x-weak)]">
          <div className={`h-2 w-[68%] rounded-full ${progressBarClass(card.progressTone)}`} />
        </div>
      </div>
    </div>
  );
}

export function TimeAttendance() {
  const [activeTab, setActiveTab] = useState<TabKey>('Live View');

  return (
    <div className="min-h-full bg-[var(--surface-neutral-xx-weak)] px-8 py-6">
      <div
        className="rounded-[20px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-6"
        style={{ boxShadow: '2px 2px 0px 2px rgba(56,49,47,0.03)' }}
      >
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

        <div className="mt-5 rounded-[18px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4">
          <div className="grid gap-4 lg:grid-cols-[290px_1fr]">
            <div className="space-y-4">
              <section
                className="rounded-[14px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
                style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="chart-line" size={14} className="text-[var(--color-primary-strong)]" />
                  <span className="text-[28px] leading-[34px] font-semibold text-[var(--color-primary-strong)]">Team Pulse</span>
                  <span className="ml-auto text-[30px] leading-[36px] font-semibold text-[#C73A2A]">Live: 9:12:34 AM</span>
                </div>
                <p className="mt-3 text-[34px] leading-[42px] font-semibold text-[var(--color-primary-strong)]">0 Issues</p>
                <p className="mt-1 text-[18px] leading-[26px] text-[var(--text-neutral-strong)]">
                  Everyone is on time. 3 employees have an upcoming shift at 10AM.
                </p>

                <div className="mt-4 space-y-2 border-t border-[var(--border-neutral-x-weak)] pt-4">
                  {[
                    ['Clocked In', '7/12'],
                    ['On Break', '0'],
                    ['Late', '0'],
                    ['Absent', '0'],
                    ['Off Today', '2'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between text-[15px] leading-[22px]">
                      <span className="flex items-center gap-2 text-[var(--text-neutral-strong)]">
                        <Icon name="circle" size={7} className="text-[var(--text-neutral-medium)]" />
                        {label}
                      </span>
                      <span className="font-semibold text-[var(--text-neutral-x-strong)]">{value}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 h-10 w-full rounded-full border border-[var(--border-neutral-medium)] text-[15px] font-medium text-[var(--text-neutral-strong)]">
                  See More Details
                </button>
              </section>

              <section
                className="rounded-[14px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
                style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
              >
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" size={14} className="text-[var(--color-primary-strong)]" />
                  <h3 className="text-[32px] leading-[40px] font-semibold text-[var(--color-primary-strong)]">Insights</h3>
                </div>

                <div className="mt-3 space-y-2">
                  {[1, 2, 3].map((item) => (
                    <button
                      key={item}
                      className="flex w-full items-center justify-between rounded-[12px] border border-[var(--border-neutral-x-weak)] px-3 py-3 text-left"
                    >
                      <span>
                        <span className="block text-[20px] leading-[26px] font-medium text-[var(--color-primary-strong)]">Title</span>
                        <span className="block text-[15px] leading-[22px] text-[var(--text-neutral-medium)]">Description</span>
                      </span>
                      <Icon name="chevron-right" size={12} className="text-[var(--text-neutral-medium)]" />
                    </button>
                  ))}
                </div>

                <button className="mt-3 text-[15px] font-medium text-[#0b4fd1] hover:underline">
                  See All Insights
                </button>
              </section>
            </div>

            <section
              className="rounded-[14px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-4"
              style={{ boxShadow: '1px 1px 0px 1px rgba(56,49,47,0.03)' }}
            >
              <div className="flex flex-wrap items-center gap-3">
                <button className="flex h-10 min-w-[154px] items-center justify-between rounded-full border border-[var(--border-neutral-medium)] px-4 text-[15px] text-[var(--text-neutral-medium)]">
                  All Statuses
                  <Icon name="caret-down" size={11} />
                </button>
                <div className="relative flex-1 min-w-[260px]">
                  <Icon name="magnifying-glass" size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-neutral-medium)]" />
                  <input
                    placeholder="Search Employee"
                    className="h-10 w-full rounded-[10px] border border-[var(--border-neutral-medium)] pl-10 pr-4 text-[15px] outline-none"
                  />
                </div>
                <div className="ml-auto inline-flex rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] p-1">
                  <button className="h-8 w-8 rounded-full bg-[var(--color-primary-strong)] text-white">
                    <Icon name="table-cells" size={12} className="mx-auto" />
                  </button>
                  <button className="h-8 w-8 rounded-full text-[var(--text-neutral-medium)]">
                    <Icon name="ellipsis" size={12} className="mx-auto" />
                  </button>
                  <button className="h-8 w-8 rounded-full text-[var(--text-neutral-medium)]">
                    <Icon name="arrow-down-to-line" size={12} className="mx-auto" />
                  </button>
                </div>
              </div>

              {activeTab === 'Live View' ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {cards.map((card) => (
                    <EmployeeStatusCard key={card.id} card={card} />
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-[12px] border border-[var(--border-neutral-x-weak)] p-6 text-[15px] text-[var(--text-neutral-medium)]">
                  {activeTab} view coming next. Live View is fully mocked to match the screenshot.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeAttendance;
