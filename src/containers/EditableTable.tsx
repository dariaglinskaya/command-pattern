import { Button, Popconfirm, Table } from 'antd';

import * as React from 'react';
import { User } from '../servise/User';
import { EditableCell, EditableFormRow, manager } from './EditableCell';


interface IState {
    dataSource: any;
    count: number;
}

export class EditableTable extends React.Component<{}, IState> {
    private columns;
    // private users: User[];
    constructor(props) {
        super(props);
        this.columns = [{
            dataIndex: 'email',
            editable: true,
            title: 'E-mail',
            width: '30%',
        }, {
            dataIndex: 'phone',
            editable: true,
            title: 'Phone',
        }, {
            dataIndex: 'password',
            editable: true,
            title: 'Password',
        }, {
            dataIndex: 'operation',
            render: (text, record) => {
                console.log(manager.getExecutedCommandsArray)
                return (
                    this.state.dataSource.length >= 1
                        ? (
                            <div>
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.email)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                                <div>
                                    <a href="javascript:;" onClick={() => this.redo()}>Redo</a>
                                </div>
                                <div>
                                    <a href="javascript:;" onClick={() => this.undo()}>Undo</a>
                                </div>
                            </div>
                        ) : null
                );
            },
            title: 'operation'

        }];
        const user = new User('demo@email.com', '+375291234567', '1234');
        this.state = {
            count: 1,
            dataSource: [{
                email: user.email,
                key: '0',
                password: user.password,
                phone: user.phone
            }],
        };
    }
    public redo() {
        console.log(manager.getExecutedCommandsArray());
        manager.redo()
        console.log(manager.getExecutedCommandsArray());
    }
    public undo() {
        console.log(manager.getExecutedCommandsArray());
        manager.undo()
        console.log(manager.getExecutedCommandsArray());
    }
    public handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.email !== key) });
    }

    public handleAdd = () => {
        const { count, dataSource } = this.state;
        const newUser = new User(`mail${count}@email.com`, `+37533-${count}`, count);
        this.setState({
            count: count + 1,
            dataSource: [...dataSource, newUser],
        });
    }

    public handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    public render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                cell: EditableCell,
                row: EditableFormRow,
            },
        };
        console.log(manager.getExecutedCommandsArray())
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    dataIndex: col.dataIndex,
                    editable: col.editable,
                    handleSave: this.handleSave,
                    record,
                    title: col.title,

                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
          </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered={true}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}