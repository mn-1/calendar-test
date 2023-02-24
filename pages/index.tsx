import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Container, Grid, Typography } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <p>
            ・シフトをクリックしたときはダイアログが出るが、このときも参照だけにして削除と編集は無効にする
            <br />
            ・予想した動線：月（または週）表示に切り替える →
            予定を追加したい日を選択 → 日表示になる → 予定を追加する → 終了{' '}
            <br />
            ・編集するボタン押した後(日表示) <br />
            　　・既存のシフトの位置変更
            <br />
            　　・既存のシフトをクリックでダイアログ開き、内容を編集できる
            <br />
            　　・新しくシフトを登録できる、シフトをクリックで追加情報を登録できる
            <br />
          </p>
          <Link href='/sample/client4' passHref>
            <Button sx={{ mx: 1 }}>顧客ページver1</Button>
          </Link>
          <p>
            　　・編集中に、左のオペレータ一覧の下に小さいカレンダーを表示して、特定日付を選択できて、選択したらその日の表示に切り替える
            <br />
            　　・30分ごとの表示で5分単位の選択が可能
            <br />
            　　・内部のイベントをドラッグ、リサイズ中に外枠をブルー（外部イベントドラッグ中は実装途中）
          </p>
          <Link href='/sample/client1' passHref>
            <Button sx={{ mx: 1 }}>顧客ページver2</Button>
          </Link>
          <p>・メモだけ編集できる</p>
          <Link href='/sample/operator2' passHref>
            <Button sx={{ mx: 1 }}>オペレーターページver1</Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
