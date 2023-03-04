import { theme, Avatar, List, Button, Modal, Input, Form, Select } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {useEffect, useState} from 'react';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [modalItem, setModalItem] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [modal, contextHolder] = Modal.useModal();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify(modalItem),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const po = posts.map((p) => {
      if (p.id === modalItem.id) {
        return modalItem;
      }
      return p;
    });

    setPosts(po);
    setAllPosts(po);
    setModalItem({});
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setModalItem({});
    setIsModalOpen(false);
  };

  const confirm = (item) => {
    modal.error({
      title: `Confirm Delete`,
      icon: <ExclamationCircleOutlined />,
      okText: 'Delete',
      onOk: async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts/1', { method: 'DELETE' });
        const po = posts.filter(p => p.id !== item.id);
        setPosts(po);
        setAllPosts(po);
      }
    });
  };

  const onSearch = (value) => {
    if (value === "") {
      setPosts(allPosts);
    } else {
      setPosts(allPosts.filter(p => {
        return p.title.toLowerCase().includes(value.toLowerCase()) || p.body.toLowerCase().includes(value.toLowerCase())
      }));
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await res.json()
      setPosts(json);
      setAllPosts(json);
    }

    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await res.json()
      setUsers(json);
    }
    fetchData();
    fetchUsers();
  }, []);
  
  return (
      <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
      <Input.Search placeholder="input search text" onSearch={onSearch} enterButton />

      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={(value) => {
          setPosts(allPosts.filter(p => p.userId === value))
        }}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={users.map(u => ({value: u.id, label: u.name}))}
      />



        <List
          pagination={{ position: "bottom", align: "center", pageSize: 25, showSizeChanger: false }}
          dataSource={posts}
          renderItem={(item, index) => (
            <List.Item actions={[
              <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(item)} />,
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirm(item)} />
            ]}>
              <List.Item.Meta
                avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${item.userId}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.body}
              />
            </List.Item>
          )}
        />
        {contextHolder}
    <Modal title="Edit Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item name="Title" label="Title">
          <Input defaultValue={modalItem.title} onChange={(e) => {
            setModalItem((m) => ({
              ...m,
              title: e.target.value
            }))
          }} />
        </Form.Item>
        <Form.Item name="Body" label="Body">
          <Input.TextArea defaultValue={modalItem.body} onChange={(e) => {
            setModalItem((m) => ({
              ...m,
              body: e.target.value
            }))
          }} />
        </Form.Item>
    </Modal>
      </div>
  )
}