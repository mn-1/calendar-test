import { Button, Grid, Box, Stack } from '@mui/material';
import { useRef, useState } from 'react';

interface DragContext {
  // 掴んだアイテムのindex
  index: number;
  // 移動先のindex
  targetIndex: number;
  // 掴んだアイテムのサイズ
  width: number;
  height: number;
  // アイテムの左上位置からのポジション
  itemX: number;
  itemY: number;
}

const Test = () => {
  // DnDに必要な情報を一つのstateに格納
  const dragContextRef = useRef<DragContext | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  //
  let dragX = 0;
  let dragY = 0;
  const handleOnDrag = (event: any) => {
    event.preventDefault();
    // pageXとclientXは同じ値だった
    // console.log('ドラッグされた', event);
  };

  const handleOnDrop = (event: any) => {
    event.preventDefault();
    console.log('ドロップされた');
  };

  const handleOnDragEnd = (event: any) => {
    console.log('ドラッグ＆ドロップした');
  };

  const handleOnMouseMove = (event: any) => {
    event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;

    dragX = y;
    dragY = x;
    console.log('ボタンの上でマウス動いたぁ');
  };

  return (
    <>
      <Grid container position={'absolute'} sx={{ left: dragX, top: dragY }}>
        <Button
          draggable={true}
          onMouseMove={handleOnMouseMove}
          onDrag={handleOnDrag}
          onDrop={handleOnDrop}
          onClick={() => console.log('タップしただけ')}
          onDragEnd={handleOnDragEnd}
        >
          ボタン
        </Button>
      </Grid>
    </>
  );
};

export default Test;
