import { theme, Avatar, List, Input } from 'antd';
import {useEffect, useState} from 'react';

export function Users() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearch = (value) => {
    if (value === "") {
      setUsers(allUsers);
    } else {
      setUsers(allUsers.filter(p => {
        return p.name.toLowerCase().includes(value.toLowerCase()) || p.username.toLowerCase().includes(value.toLowerCase())
      }));
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await res.json()
      setUsers(json);
      setAllUsers(json);
    }
    fetchUsers();
  }, []);
  
  return (
      <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
      <Input.Search placeholder="Search User" onSearch={onSearch} enterButton />
        <List
          pagination={{ position: "bottom", align: "center", pageSize: 25, showSizeChanger: false }}
          dataSource={users}
          renderItem={(item, index) => (
            <List.Item extra={
              <>
                <div>{item.address.street}</div>
                <div>{item.address.suite}</div>
                <div>{item.address.city}</div>
                <div>{item.address.zipcode}</div>              
              </>
              }>
              <List.Item.Meta
                avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${item.id}`} />}
                title={item.name}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div>
  )
}
