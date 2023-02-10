/**
 * test2の修正版
 */

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';

registerLocale('ja', ja);

interface myEventsType {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const SampleCalendar: React.FC = (props) => {
  const ref = React.createRef<any>();

  const [inputTitle, setInputTitle] = useState('');
  const [inputStart, setInputStart] = useState(new Date());
  const [inputEnd, setInputEnd] = useState(new Date());
  const [inView, setInView] = useState(false);
  const [myEvents, setMyEvents] = useState<myEventsType[]>([]);

  const handleCLick = (info: any) => {
    const event = myEvents[info.event.id];
    const title = event.title;
    const start = event.start;
    const end = event.end;

    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  const handleSelect = (selectinfo: any) => {
    const start = new Date(selectinfo.start);
    const end = new Date(selectinfo.end);
    start.setHours(start.getHours());
    end.setHours(end.getHours());

    setInputTitle('');
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  const onAddEvent = () => {
    const startTime = inputStart;
    const endTime = inputEnd;

    if (startTime >= endTime) {
      alert('開始時間と終了時間を確認してください。');
      return;
    }
    const event: myEventsType = {
      id: myEvents.length,
      title: inputTitle,
      start: startTime,
      end: endTime,
    };

    // Stateにイベントを追加する。ここで登録されたイベントは、予定を変更するときなどに使用する。
    setMyEvents([...myEvents, event]);

    // カレンダーに予定を登録して表示するための処理。
    ref.current.getApi().addEvent(event);
  };

  return (
    <>
      <div onClick={() => setInView(false)} />
      <form>
        <div>予定を入力</div>
        <label>タイトル</label>
        <input
          type='text'
          value={inputTitle}
          name='inputTitle'
          onChange={(e) => {
            // タイトルが入力されたら、その値をStateに登録する。
            setInputTitle(e.target.value);
          }}
        />
        <label>開始</label>
        <DatePicker
          locale='ja'
          dateFormat='yyyy/MM/d HH:mm'
          selected={inputStart}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={10}
          todayButton='today'
          name='inputStart'
          onChange={(time: Date) => {
            setInputStart(time);
          }}
        />
        <label>終了</label>
        <DatePicker
          locale='ja'
          dateFormat='yyyy/MM/d HH:mm'
          selected={inputEnd}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={10}
          todayButton='today'
          name='inputEnd'
          onChange={(time: Date) => {
            setInputEnd(time);
          }}
        />
        <input
          type='button'
          value='キャンセル'
          onClick={() => {
            setInView(false);
          }}
        />
        <input type='button' value='保存' onClick={() => onAddEvent()} />
      </form>
      <FullCalendar
        locale='ja'
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView='timeGridWeek'
        slotDuration='00:30:00'
        selectable={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '00:00',
          endTIme: '24:00',
        }}
        weekends={true}
        titleFormat={{
          year: 'numeric',
          month: 'short',
        }}
        headerToolbar={{
          start: 'title',
          center: 'prev, next, today',
          end: 'dayGridMonth,timeGridWeek',
        }}
        ref={ref}
        eventClick={handleCLick}
        select={handleSelect}
      />
    </>
  );
};

export default SampleCalendar;
