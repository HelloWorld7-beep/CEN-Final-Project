import React from 'react';
import { Form, Switch, Table } from 'antd';

export default function ListView(props) {
  const {
    studentData,
    onSelectToggle,
    form,
  } = props;

  const UneditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    return (
      <td {...restProps}>
        {children}
      </td>
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '22.5%',
      align: 'left',
      sorter: {
        compare: (a, b) => (a.name < b.name ? -1 : 1),
      },
    },
    {
      title: 'Currently has badge?',
      dataIndex: 'selected',
      key: 'hasBadge',
      width: '22.5%',
      align: 'left',
      render: (hasBadge) => (hasBadge.hasBadge ? "Yes" : "No")
    },
    {
      title: 'Selected',
      dataIndex: 'selected',
      key: 'selected',
      width: '10%',
      align: 'right',
      render: (selected) => (
        <Switch
          onChange={(e) => {
            onSelectToggle(selected.id, e);
          }}
          defaultChecked={selected.selected}
          disabled={selected.hasBadge}
        />
      ),
      filters: [
        {
          text: 'Selected',
          value: true,
        },
        {
          text: 'Not Selected',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.selected.selected === value,
    },
  ];

  // FIXME(ccastillo): Fix bug with table not populating until sort button is pressed
  return (
    <div id='table-container'>
      <Form form={form} component={false}>
        <Table
          columns={columns}
          dataSource={studentData}
          components={{
            body: {
              cell: UneditableCell,
            },
          }}
        />
      </Form>
    </div>
  );
}