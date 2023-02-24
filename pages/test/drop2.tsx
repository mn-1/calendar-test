/**
 *
 * dragstart：
 * dragend：
 * dragover：
 * dragenter：
 */
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState<String[]>([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [borderColor, setBorderColor] = useState<string>('#DCDCDC');

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const users = await response.json();
      setUsers(users);
    })();
  }, []);

  // ドラッグスタートした時にindexの値(これ想像してるのと違う)をドラッグしているものとして入れる
  const dragStart = (index: any) => {
    console.log('drag start', index);
    setDragIndex(index);
    setBorderColor('#0000FF');
  };

  // dragEnterはドラッグしている要素が別の要素に被った時e
  const dragEnter = (index: any) => {
    console.log('dragIndex', dragIndex); // ドラッグしている要素のindex
    console.log('dragEnter', index); // 被った要素のindex

    if (index === dragIndex) return;

    // 超えた時ってこと
    setUsers((prevState) => {
      // このままだと型的に使いづらいからany型にしている
      let newUsers = JSON.parse(JSON.stringify(prevState));
      // ドラッグしている要素を消しながら、その値を取得
      const deleteElement = newUsers.splice(dragIndex, 1)[0];
      // 今いる場所にドラッグしている要素を配置
      newUsers.splice(index, 0, deleteElement);
      return newUsers;
    });
    // 今いる場所のindexを入れている
    setDragIndex(index);
  };

  // ドロップした時に発火
  const dragEnd = () => {
    console.log('drop');
    // 並び替え後のusers配列をサーバに送信する処理を追加する
    setDragIndex(null);
    setBorderColor('#DCDCDC');
  };

  return (
    <Stack
      border={1}
      borderColor={borderColor}
      sx={{ borderWidth: '4px', m: '2em' }}
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>ユーザ名</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index: any) => (
            <tr
              key={user.id}
              draggable={true}
              onDragStart={() => {
                dragStart(index);
              }}
              onDragEnter={() => dragEnter(index)}
              // ドラッグしている要素が元の位置の戻ろうとするのを止める
              onDragOver={(event) => event.preventDefault()}
              onDragEnd={dragEnd}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stack>
  );
};

export default UserTable;
