import { Button, Input, InputRef, Space, Table } from "antd";
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";

import { Navbar } from "../../components/Navbar";
import api from "../../services/api";

interface UserProps {
  users: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }[]
}

interface DataType {
  key: string;
  id: string;
  userId: string;
  completed: boolean
}

type DataIndex = keyof DataType;

export default function Notes({ users }: UserProps) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <MagnifyingGlass style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const colums: any = [
    {
      key: "1",
      title: 'ID',
      dataIndex: 'id',
      align: 'center' as 'center',
      ...getColumnSearchProps('id'),
    },
    {
      key: "2",
      title: 'User ID',
      dataIndex: 'userId',
      align: 'center' as 'center',
      ...getColumnSearchProps('userId'),
      sorter: (record1: any, record2: any) => record1.userId - record2.userId
    },
    {
      key: "3",
      title: 'Status',
      dataIndex: 'completed',
      align: 'center' as 'center',
      width: '40%',
      render: (completed: boolean) => {
        return (
          <p className={
            `${completed
              ? 'text-zinc-700 bg-green-300 border border-green-500'
              : 'text-zinc-700 bg-red-300 border border-red-500'}`
          }>
            {completed ? 'Finalizado' : 'Em progresso'}
          </p>
        )
      },
      filters: [
        { text: 'Finalizado', value: true },
        { text: 'Em progresso', value: false }
      ],
      onFilter: (value: any, record: any) => {
        return record.completed === value
      }
    },
  ]

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/')
      }
    }
  }, [session, loading, router]);

  return (
    <>
      <Head>
        <title>Running Man | Notas</title>
      </Head>

      <main className="bg-blur bg-cover bg-no-repeat min-h-screen">
        <Navbar active='notes' />

        <div className="w-full max-w-xl m-auto mt-4">
          <Table
            columns={colums}
            dataSource={users}
            rowKey="id"
          />
        </div>

      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await api.get('/todos');
  const users = response.data

  return {
    props: { users }
  }
}