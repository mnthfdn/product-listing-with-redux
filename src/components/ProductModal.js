import React, { useRef, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal,  Select, Space, Divider, Switch, Upload, message} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../store/actions/productActions';
import { UploadOutlined } from '@ant-design/icons';

let index = 0;

const  ProductModal =({ open, setOpen ,record})=>  {
    const dispatch = useDispatch();

    const onAdd=(product)=>{
      dispatch(addProduct(product));
    }
    const update=(id, product)=> {
        dispatch(editProduct(id,product))
    }
    const [buttonDisabled,setButtonDisabled] = useState(true)
    const [form] = Form.useForm();

    const [items, setItems] = useState(['STD','XXXS', 'XXS','XS', 'S', 'M','L','XL','XXL','XXXL']);
    const [name, setName] = useState('');
    const inputRef = useRef(null);

    const [categoryItems, setCategoryItems] = useState(['Kadın > Elbise', 'Erkek > Tişört']);
    const [category, setCategory] = useState('');
    const categoryRef = useRef(null);

    const [colorItems, setColorItems] = useState(["Mavi","Kırmızı", "Sarı"]);
    const [color, setColor] = useState('');
    const colorRef = useRef(null);

    const handleOk = () => {
      const values = form.getFieldsValue();
      record !== undefined? update(record?.id,values) :onAdd(values)
      form.resetFields();
      setFileList([]); 
      setOpen(false);
    };


    const products = useSelector(state => state.products.products);
    console.log(products)

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, name || `New item ${index++}`]);
        setName('');
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
    };

    const onCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const addCategory = (e) => {
        e.preventDefault();
        setCategoryItems([...categoryItems, category || `New item ${index++}`]);
        setCategory('');
        setTimeout(() => {
            categoryRef.current?.focus();
        }, 0);
    };

    const onColorChange = (event) => {
        setColor(event.target.value);
    };

    const addColor = (e) => {
        e.preventDefault();
        setColorItems([...colorItems, color || `New item ${index++}`]);
        setColor('');
        setTimeout(() => {
            colorRef.current?.focus();
        }, 0);
    };
    const filterOption = (input , option) =>  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  

    const onChangeStock = (checked) => {
        console.log(`switch to ${checked}`);
    };
    const isFormComplete = (values) => {
        const requiredFields = ['id', 'name', 'image', 'stock', 'price', 'sizes', 'color'];
        return requiredFields.every(field => values[field] !== undefined);
    }

    const handleFormChange = () => {
        const values = form.getFieldsValue();
        setButtonDisabled(!isFormComplete(values));
    };
    const initialValues = record ? { 
        stock: record.stock , 
        id: record.id,
        name: record.name,
        image: record.image,
        price: record.price,
        oldPrice: record.oldPrice,
        sizes: record.sizes,
        color: record.color,
        category: record.category
    } : {stock:true};
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ fileList }) => setFileList([...fileList]);

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Sadece görsel dosyalarını yükleyebilirsiniz!');
        }
        return isImage;
    };

    return (
        <Modal
            title={record ?"Ürün Bilgilerini Güncelleyiniz":"Yeni ürün bilgilerini ekleyiniz."}
            centered
            open={open}
            onOk={() => handleOk()}
            onCancel={() => {setOpen(false) ;setFileList([]); }}
            width={1000}
            okText={record ? "Güncelle":"Ekle"}
            cancelText="İptal"
            okButtonProps={{ disabled: buttonDisabled }}
        >
            <Form form={form} onValuesChange={() => handleFormChange()} initialValues={initialValues}>
                <Form.Item name="id" label="Ürün Kodu" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                    <Input placeholder="Ürün kodunu girin"   />
                </Form.Item>
                <Form.Item name="name" label="Ürün İsmi" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                    <Input placeholder="Ürün ismi girin"  />
                </Form.Item>
                <Form.Item name="image" label="Ürün Resmi" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                    <Upload
                    listType="picture"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                    showUploadList={true}
                    >
                    <Button icon={<UploadOutlined />} > Görsel Yükle</Button>
                </Upload>
                </Form.Item>
                <Form.Item name="stock"  valuePropName="checked" label="Stok Durumu" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                    <Switch defaultChecked onChange={onChangeStock}  />
                </Form.Item>
                <Form.Item name="price" label="Fiyat (₺)" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                    <InputNumber placeholder="Fiyat girin" min={1}  />
                </Form.Item>
                <Form.Item name="oldPrice" label="Eski Fiyat (₺)"   >
                    <InputNumber placeholder="Varsa Eski Fiyat girin" min={1}  style={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item name="sizes" label="Beden" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Lütfen Beden giriniz"
                            options={items.map((item) => ({
                                label: item,
                                value: item,
                            }))}
                            dropdownRender={(menu) => (
                                <>
                                {menu}
                                <Divider
                                    style={{
                                    margin: '8px 0',
                                    }}
                                />
                                <Space
                                    style={{
                                    padding: '0 8px 4px',
                                    }}
                                >
                                    <Input
                                    placeholder="Please enter item"
                                    ref={inputRef}
                                    value={name}
                                    onChange={onNameChange}
                                    />
                                    <Button type="text"   onClick={addItem}>
                                    Add item
                                    </Button>
                                </Space>
                                </>
                            )}
                        />
                </Form.Item>
                <Form.Item name="color" label="Renk" rules={[{ required: true, message: 'Bu alan gereklidir!' }]}>
                <Select
                    showSearch
                    placeholder="Renk Seçiniz"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={colorItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                    dropdownRender={(menu) => (
                        <>
                        {menu}
                        <Divider
                            style={{
                            margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                            padding: '0 8px 4px',
                            }}
                        >
                            <Input
                            placeholder="Yeni renk giriniz"
                            ref={colorRef}
                            value={color}
                            onChange={onColorChange}
                            />
                            <Button type="text"   onClick={addColor}>
                            Add item
                            </Button>
                        </Space>
                        </>
                    )}
                />
                </Form.Item>
                <Form.Item name="category" label="Kategori" >
                <Select
                    showSearch
                    mode='multiple'
                    placeholder="Kategori Ekle"
                    optionFilterProp="children"
                    options={categoryItems.map((item) => ({
                        label: item,
                        value: item,
                    }))}
                    dropdownRender={(menu) => (
                        <>
                        {menu}
                        <Divider
                            style={{
                            margin: '8px 0',
                            }}
                        />
                        <Space
                            style={{
                            padding: '0 8px 4px',
                            }}
                        >
                            <Input
                            placeholder="Yeni Kategori giriniz"
                            ref={categoryRef}
                            value={category}
                            onChange={onCategoryChange}
                            />
                            <Button type="text"   onClick={addCategory}>
                                Kategori Ekle
                            </Button>
                        </Space>
                        </>
                    )}
                />
                </Form.Item>
                
            </Form>
        </Modal>
    )
}

export default ProductModal