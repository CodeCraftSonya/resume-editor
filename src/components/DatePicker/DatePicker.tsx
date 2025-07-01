import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './DatePicker.module.css';
import Input from '../Input/Input.tsx';
import Button from '../Buttons/button.tsx';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = () => {
  const initialDate = new Date(2000, 3, 1);
  const [date, setDate] = useState<Date | null>(initialDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [activeStartDate, setActiveStartDate] = useState<Date>(initialDate);

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setDate(value);
      setActiveStartDate(value);
    }
  };

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  const years = Array.from({ length: 41 }, (_, i) => 1990 + i);

  const changeMonth = (monthIndex: number) => {
    const newDate = new Date(date || activeStartDate);
    newDate.setMonth(monthIndex);
    setDate(newDate);
    setActiveStartDate(newDate);
    setShowMonthDropdown(false);
  };

  const changeYear = (year: number) => {
    const newDate = new Date(date || activeStartDate);
    newDate.setFullYear(year);
    setDate(newDate);
    setActiveStartDate(newDate);
    setShowYearDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.datePicker} ref={ref}>
      <Input
        type='text'
        label='Дата рождения'
        readOnly
        value={date ? date.toLocaleDateString('ru-RU') : ''}
        placeholder='дд.мм.гггг'
        onClick={() => setShowCalendar(!showCalendar)}
        className={styles.dateInput}
        rightIcon={<img src='/icons/calendar.svg' alt='calendar' />}
        required
      />

      {showCalendar && (
        <div className={styles.calendarWrapper}>
          <Calendar
            showNeighboringMonth={true}
            onChange={handleDateChange}
            value={date}
            selectRange={false}
            locale='ru-RU'
            prevLabel={null}
            nextLabel={null}
            next2Label={null}
            prev2Label={null}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate!)
            }
            className={styles.calendar}
            navigationLabel={({ date }) => (
              <div className={styles.customNavigation}>
                <div
                  className={styles.monthSelector}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                  }}
                >
                  {months[date.getMonth()]}
                  <img
                    src='/icons/chevron-down.svg'
                    alt='Стрелка вниз'
                    className={styles.arrow}
                  />
                  {showMonthDropdown && (
                    <div className={styles.dropdown}>
                      {months.map((month, index) => (
                        <div key={month} onClick={() => changeMonth(index)}>
                          {month}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={styles.yearSelector}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                  }}
                >
                  {date.getFullYear()}
                  <img
                    src='/icons/chevron-down.svg'
                    alt='Стрелка вниз'
                    className={styles.arrow}
                  />
                  {showYearDropdown && (
                    <div className={styles.dropdown}>
                      {years.map((year) => (
                        <div key={year} onClick={() => changeYear(year)}>
                          {year}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          />
          <div className={styles.calendarButtons}>
            <Button
              type='secondary'
              className={styles.calendarButton}
              onClick={() => setShowCalendar(false)}
            >
              Отменить
            </Button>
            <Button
              type='primary'
              className={styles.calendarButton}
              onClick={() => setShowCalendar(false)}
            >
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
