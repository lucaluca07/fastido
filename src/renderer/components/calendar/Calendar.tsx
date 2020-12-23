import React, { useMemo, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Icon from '@/components/icon';
import classNames from 'classnames';

interface IProps {
  onChange?: (date: dayjs.Dayjs) => void;
  date?: dayjs.Dayjs | string | number;
  type?: 'card' | 'fullScreen';
  theme?: 'dark' | 'light';
}

dayjs.extend(advancedFormat);

const today = dayjs(Date.now());
const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const currentYear = today.get('year');
const startYear = currentYear - 10;
const endYear = currentYear + 9;
const years: { label: string; value: string }[] = [];
for (let i = startYear; i <= endYear; i += 1) {
  years.push({ label: `${String(i)}年`, value: String(i) });
}

const months = Array(12)
  .fill('')
  .map((item, i) => ({ label: `${String(i + 1)}月`, value: String(i + 1) }));

const getDays = (date: dayjs.Dayjs) => {
  const monthStart: dayjs.Dayjs = date.startOf('month');
  const monthEnd: dayjs.Dayjs = date.endOf('month');
  const start = monthStart.startOf('week');
  const end = monthEnd.endOf('week');
  const length = end.diff(start, 'day');
  const weekList: dayjs.Dayjs[][] = [];
  for (let i = 0; i <= length + 7; i += 1) {
    const index = Math.floor(i / 7);
    weekList[index] = [...(weekList[index] || []), start.add(i, 'day')];
  }
  return weekList;
};

const Calendar: React.FC<IProps> = ({ date, type, theme, onChange }) => {
  const [current, setCurrent] = useState(
    dayjs.isDayjs(date) ? date : dayjs(date)
  );
  const [selected, setSelected] = useState<dayjs.Dayjs | undefined>(
    dayjs.isDayjs(date) ? date : dayjs(date)
  );
  const days = useMemo(() => {
    return getDays(current);
  }, [current]);

  const handleSetSelectedChange = useCallback(
    (d: dayjs.Dayjs) => {
      setSelected(d);
      onChange?.(d);
    },
    [onChange]
  );
  return (
    <div
      className={classNames('calendar', `calendar-${type}`, {
        'calendar-dark': theme === 'dark',
      })}
    >
      <header className="calendar-header">
        <div className="calendar-header-left">
          <span>{current.get('year')}年 </span>
          <span>{current.get('month') + 1}月</span>
        </div>
        <div className="calendar-header-right">
          <Icon
            type="prev"
            onClick={() => setCurrent(current.add(-1, 'month'))}
          />
          <span
            onClick={() => {
              setCurrent(today);
            }}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            className="calendar-today"
          >
            今天
          </span>
          <Icon
            type="next"
            onClick={() => setCurrent(current.add(1, 'month'))}
          />
        </div>
      </header>
      <main className="calendar-main">
        <table>
          <thead>
            <tr>
              {weeks.map((item) => (
                <th className="calendar-column-header" key={item}>
                  <span className="calendar-column-header-inner">{item}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={i}>
                {item.map((day, ii) => (
                  <td
                    className={classNames('cell', {
                      today: day.isSame(today, 'day'),
                      selected: selected && day.isSame(selected, 'day'),
                      'next-month': day.isAfter(current, 'month'),
                      'prev-month': day.isBefore(current, 'month'),
                    })}
                    key={day.toString()}
                  >
                    <div
                      className="calendar-date"
                      onKeyDown={() => {}}
                      role="button"
                      tabIndex={i * 7 + ii}
                      onClick={() => handleSetSelectedChange(day)}
                    >
                      <div className="calendar-value">
                        <Icon type="plus" />
                        <span title={day.format('YYYY/MM/DD')}>
                          {day.get('date')}
                        </span>
                      </div>
                      <div className="calendar-content">content</div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Calendar;
