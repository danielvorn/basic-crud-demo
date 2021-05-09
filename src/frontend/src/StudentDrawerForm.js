import {Button, Col, Drawer, Form, Input, Row, Select, Spin} from 'antd';
import {addNewStudent} from "./client";
import {useState} from "react";
import {errorNotification, successNotification} from "./Notification";

const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false)

    const onFinish = student => {
        setSubmitting(true)
        addNewStudent(student).then(() => {
            setSubmitting(false)
            console.log("Student Added!")
            onClose();
            successNotification(
                "Student success added",
                `${student.name} was added to the system`
            )
            fetchStudents();
        }).catch(err => {
            onClose();
            err.response.json().then(res => {
                console.log(res);
                errorNotification(
                    "There was an issue",
                    `${res.message} [${res.status}] [${res.error}]`
                )
            });
        })
    }

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    const showSpinner = () => {
        setSubmitting(true)
    }

    const renderForm = () => {
        if (submitting) {
            return <div className="example"><Spin/></div>
        }

        return <Form layout="vertical"
                     onFinishFailed={onFinishFailed}
                     onFinish={onFinish}

                     hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender">
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    }

    return <Drawer
        title="Create new student"
        width={720}
        onClose={onClose}
        visible={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }>
        {renderForm()}
    </Drawer>
}

export default StudentDrawerForm;