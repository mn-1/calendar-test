import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Container, Grid, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Grid container direction='column' sx={{ m: '3rem' }}>
        <Link href='/sample/client3' passHref>
          <Button variant='contained'>顧客ページ</Button>
        </Link>
        <br />
        <ClientText />
        <Link href='/sample/operator2' passHref>
          <Button variant='contained'>オペレーターページ</Button>
        </Link>
        <br />
        <OperatorText />
      </Grid>
    </>
  );
};

export default Home;

const ClientText = () => {
  return (
    <Typography>
      【閲覧モード】
      <br />
      　　・月、週、日の表示切り替えができます(PC・Mobile)
      <br />
      　　・イベントをクリックするとイベント詳細ダイアログが開きます(PC・Mobile)
      <br />
      　　・既存のイベントの位置変更はできません(PC・Mobile)
      <br />
      　　・月表示の時に日付を選択するとその日の日表示になります(PC・Mobile)
      <br />
      【編集モード】
      <br />
      　　・日表示の時に【編集する】ボタンを押すと編集モードになります(PC・Mobile)
      <br />
      　　・左側のオペレーターをカレンダー上にドロップすることでイベントの追加ができます(PC)
      <br />
      　　・モバイルでは【予定を追加する】ボタンからイベントの追加ができます(Mobile)
      <br />
      　　・月、週への表示切り替えができない状態となります(PC・Mobile)
      <br />
      　　・イベントをクリックするとイベント詳細ダイアログが開きます(PC・Mobile)
      <br />
      　　・イベント詳細ダイアログ上の【編集】ボタンからイベントの編集が可能ですPC・Mobile)
      <br />
      　　・イベント詳細ダイアログ上の【削除】ボタンからイベントの削除が可能です(PC・Mobile)
      <br />
      　　・削除した際にスナックバーの【元に戻す】ボタンを押すと削除を取り消すことが可能です(PC・Mobile)
      <br />
      　　・既存のイベントの位置変更、サイズ変更が可能です(PC)
      <br />
      　　・モバイルでは、既存のイベントを長押しすると位置変更、サイズ変更が可能になります(Mobile)
      <br />
      　　・左の月カレンダーの特定日付を選択できて、選択したらその日の日表示になります(PC)
      <br />
      　　・5分単位の選択が可能です(PC・Mobile)
      <br />
      <br />
    </Typography>
  );
};

const OperatorText = () => {
  return (
    <Typography>
      サンプルとして表示の種類を左から、 ・月表示 ・週表示 ・拠点ごとの日表示
      <br />
      ・日表示 ・予定リスト表示 と複数用意しました
      <br />
      ・左の月カレンダーの特定日付を選択できて、選択したらその日の日表示になります(PC)
      <br />
      ・イベントをクリックするとイベント詳細ダイアログが開きます(PC・Mobile)
      <br />
      ・イベント詳細ダイアログ上の【編集】ボタンからコメントのみ編集が可能です(PC・Mobile)
      <br />
      <br />
    </Typography>
  );
};
