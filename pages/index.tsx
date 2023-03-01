import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Container, Grid, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        sx={{ m: '3rem' }}
      >
        <Link href='/sample/client3' passHref>
          <Button variant='contained'>顧客ページ</Button>
        </Link>
        <br />
        <p>
          【閲覧モード】で開いて、日表示の時に【編集する】ボタンを押すと【編集モードになる】(PC・Mobile)
          <br />
          <br />
          【閲覧モード】
          <br />
          　　・月、週、日の表示切り替えができる(PC・Mobile) <br />
          　　・イベントをクリックするとイベント詳細ダイアログが開く(PC・Mobile)
          <br />
          　　・イベント詳細ダイアログ上の【編集】【削除】ボタンは無効(PC・Mobile){' '}
          <br />
          　　・既存のイベントの位置変更はできない(PC・Mobile)
          <br />
          　　・月表示の時に日付を選択するとその日の日表示に飛ぶ(PC・Mobile)
          <br /> <br />
          【編集モード】
          <br />
          　　・左側のオペレーターをカレンダー上にドロップすることでイベントの追加ができる(PC)
          <br />
          　　・【予定を追加する】ボタンからイベントの追加ができる(Mobile)
          <br />
          　　・月、週への表示切り替えができない(PC・Mobile) <br />
          　　・イベントをクリックするとイベント詳細ダイアログが開く(PC・Mobile)
          <br />
          　　・イベント詳細ダイアログ上の【編集】ボタンからイベントの編集が可能(PC・Mobile)
          <br />
          　　・イベント詳細ダイアログ上の【削除】ボタンからイベントの削除が可能(PC・Mobile)
          <br />
          　　・削除した際にスナックバーの【元に戻す】ボタンを押すと削除を取り消すことが可能(PC・Mobile)
          <br />
          　　・既存のイベントの位置変更、サイズ変更が可能(PC)
          <br />
          　　・既存のイベントを長押しすると位置変更、サイズ変更が可能になる(Mobile)
          <br />
          　　・左の月カレンダーの特定日付を選択できて、選択したらその日の表示に切り替えされる(PC)
          <br />
          　　・30分ごとの表示で5分単位の選択が可能(PC・Mobile)
          <br />
        </p>
        <br />
        <Link href='/sample/operator2' passHref>
          <Button variant='contained'>オペレーターページ</Button>
        </Link>
        <br />
        <p>
          サンプルとして表示の種類を左から、 <br />
          ・月表示 <br />
          ・週表示
          <br /> ・拠点ごとの日表示
          <br /> ・日表示
          <br /> ・予定リスト表示
          <br />
          と複数用意した
          <br />
          ・左の月カレンダーの特定日付を選択できて、選択したらその日の表示に切り替えされる(PC)
          <br />
          ・イベントをクリックするとイベント詳細ダイアログが開く(PC・Mobile)
          <br />
          ・イベント詳細ダイアログ上の【編集】ボタンからコメントのみ編集が可能(PC・Mobile)
        </p>
      </Grid>
    </>
  );
};

export default Home;
