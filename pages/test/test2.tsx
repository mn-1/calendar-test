// useStateを追加。
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

/**
 * 開始時間などを入力する際に、カレンダーから入力できるようにするためのライブラリとしてDatePickerを使用。
 * DatePickerコンポーネント、ロケール設定用のモジュール。
 */
import DatePicker, { registerLocale } from 'react-datepicker';

// DatePickerのロケールを設定に使用。
import ja from 'date-fns/locale/ja';

/**
 * Material-UIを通して、Styleを適用するためのモジュール。
 * - createStyles: 型推論を解決してくれるモジュール。
 * - makeStyles: StyleをHookAPIで適用させるモジュール。
 */

// DatePickerのロケールを日本に設定。
registerLocale('ja', ja);

// 追加するイベントの型。
interface myEventsType {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const SampleCalendar: React.FC = (props) => {
  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef<any>();

  const [inputTitle, setInputTitle] = useState(''); // フォームに入力されたタイトル。
  const [inputStart, setInputStart] = useState(new Date()); // イベントの開始時刻。
  const [inputEnd, setInputEnd] = useState(new Date()); // イベントの終了時刻。
  const [inView, setInView] = useState(false); // イベント登録フォームの表示有無。(trueなら表示する。)
  const [myEvents, setMyEvents] = useState<myEventsType[]>([]); // 登録されたイベントが格納されていく。myEventsTypタイプの配列。

  /**
   * カレンダーがクリックされた時にイベント登録用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 空欄
   *  - 開始: クリックしたカレンダーの開始時間
   *  - 終了: クリックしたカレンダーの終了時間
   */
  const handleCLick = (info: any) => {
    /**
     * infoにはカレンダーに登録されたイベントが入ってくる。そのイベントのIDを元にmyEvents
     * に格納されたイベントを取り出してStateに保存する。
     */
    const event = myEvents[info.event.id];
    const title = event.title;
    const start = event.start;
    const end = event.end;

    setInputTitle(title);
    setInputStart(start);
    setInputEnd(end);
    setInView(true);
  };

  /**
   * カレンダーから登録された予定をクリックした時にイベント変更用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 選択した予定のタイトル
   *  - 開始: 選択した予定の開始時間
   *  - 終了: 選択した予定の終了時間
   */
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

  /**
   * カレンダーに予定を追加する。
   */
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

  /**
   * ここからはフォームを構成する要素。
   */

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
