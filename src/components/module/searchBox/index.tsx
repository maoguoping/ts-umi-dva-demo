import { Form, Row, Col, Input, Button, Icon , Select} from 'antd'
import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react'
import './style.scss'
const { Option } = Select;
interface SearchBoxProps extends FormComponentProps {
  list: Array<any>;
  form: any;
  onSearch: any;
}
const SearchBox: React.FC<SearchBoxProps> = props => {
  const needExpand = props.list.length > 6;
  const [expand, setExpand] = useState(false);
  function renderSelect(obj: any) {
    let opts = obj.options ? obj.options : []
    return (
      <Select>
        {
          opts.map((option: any) => 
            <Option value={option.value} key={option.value}>{option.label}</Option>
          )
        }
      </Select>
    )
  }
  function getFields () {
    const count = expand ? 10 : 6;
    const { getFieldDecorator } = props.form;
    const getComponent = (obj: any) => {
      switch(obj.type) {
        case 'input': return <Input></Input>;
        case 'select': return renderSelect(obj);
      }
    };
    return props.list.map((item, index) => 
      <Col span={6} key={index} style={{ display: index < count ? 'block' : 'none' }}>
        <Form.Item label={`${item.label}`}>
          {getFieldDecorator(`${item.name}`, {
            rules: item.rule || [],
          })(getComponent(item))}
        </Form.Item>
      </Col>
    );
  }
  function handleSearch (e: any) {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      props.onSearch(values);
    });
  }
  function handleReset () {
    props.form.resetFields();
  }
  function toggle () {
    setExpand(!expand)
  };
  return (
    <Form className="search-form" onSubmit={handleSearch}>
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button className="search-box-btn" type="primary" htmlType="submit">搜索</Button>
          <Button className="search-box-btn" onClick={handleReset}>清空</Button>
          {
            needExpand && 
            <a className="expand-btn" onClick={toggle}>
              { expand ? '收起' : '展开' }
              <Icon type={expand ? 'up' : 'down'} />
            </a>
          }
        </Col>
      </Row>
    </Form>
  );
}
export default Form.create<SearchBoxProps>({ name: 'advanced_search' })(SearchBox)