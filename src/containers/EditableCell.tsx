import { CommandConfig } from '../servise/CommandConfig';
import { CommandManager } from '../servise/CommandManager';
import { ChangeEmailCommand } from '../servise/Email';
import { ChangePasswordCommand } from '../servise/Password';
import { ChangePhoneCommand } from '../servise/Phone';
import { Form, Icon, Input } from 'antd';
import * as React from 'react';


const FormItem = Form.Item;
const EditableContext = React.createContext(null);
export const manager: CommandManager = new CommandManager();

interface IState {
    editing: any;
    value: string;
}
interface IProps {
    editable: any;
    dataIndex: any;
    title: any,
    record: any,
    index: any,
    handleSave: any;
}
const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

export const EditableFormRow = Form.create()(EditableRow);
export class EditableCell extends React.Component<IProps, IState>{
    private input;
    private cell;
    private form;
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            value: ''
        }
    }
    public componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }
    public componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }
    public toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    public handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    public save = () => {
        const { record, dataIndex } = this.props;
        console.log(this.props)
        console.log(this.form)
        switch (dataIndex) {
            case 'email': {
                let changeEmailCommand: CommandConfig = new ChangeEmailCommand({ receiver: record, changedValue: this.state.value });
                manager.execute(changeEmailCommand);
            }
            case 'phone': {
                let changePhoneCommand: CommandConfig = new ChangePhoneCommand({ receiver: record, changedValue: this.state.value });
                manager.execute(changePhoneCommand);
            }
            case 'password': {
                let changePasswordCommand: CommandConfig = new ChangePasswordCommand({ receiver: record, changedValue: this.state.value });
                manager.execute(changePasswordCommand);
            }
        }
    }
    public handleOnChange(e) {
        const target = e.target.value;
        this.setState({ value: target });
    }

    public render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        {console.log(this.props)}
        return (
            
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        <Input
                                            ref={node => (this.input = node)}
                                            onPressEnter={() => this.save()}
                                            defaultValue={record[dataIndex]}
                                            onChange={(e) => this.handleOnChange(e)}
                                        />
                                    </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24 }}
                                            onClick={this.toggleEdit}
                                        >
                                            {restProps.children}
                                            <Icon type="redo" theme="outlined" />
                                            <Icon type="undo" theme="outlined" />
                                        </div>

                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}
