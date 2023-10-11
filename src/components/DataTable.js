import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../store/actions/productActions';
import ProductModal from './ProductModal';


const DataTable = () =>{
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const products = useSelector(state => state.products.products);
    console.log(products)
    const dispatch= useDispatch()
    const removeItem=(record)=>{
      dispatch(deleteProduct(record?.id))
    }
    const updateProduct = (record) => {
      setSelectedRecord(record);
      setIsModalOpen(true);
  };
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Ürün İsmi',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Ürün Resmi',
        dataIndex: 'image',
        key: 'image',
        render: image => <img src={image?.file?.thumbUrl} alt="Ürün Resmi" style={{ width: '50px', height: 'auto' }} />
      },
      {
        title: 'Kategori',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Stok',
        dataIndex: 'stock',
        key: 'stock',
        render: (_, { stock }) => {
         const status= stock ? "Var" : "Yok"
         const colorStyle= stock ? "green" : "red"
          return (
            <Tag color={colorStyle} key={stock}>
              {status}
            </Tag>
          );
        }
      },
      {
        title: 'Fiyat',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Eski Fiyat',
        dataIndex: 'oldPrice',
        key: 'oldPrice',
      },
      {
        title: 'Beden',
        key: 'sizes',
        dataIndex: 'sizes',
        render: (_, { sizes }) => (
            
          <>
            {
            sizes.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Renk',
        key: 'color',
        dataIndex: 'color',
        render: (_, { color }) => {
            let colorStyle=""
            
            if (color === 'mavi') {
              colorStyle = 'geekblue';
            }
            return (
              <Tag color={colorStyle} key={color}>
                {color}
              </Tag>
            );
          }
      },
      {
        title: '',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button onClick ={()=>updateProduct(record)} style={{ color: "green",borderColor: "green" }} >Güncelle</Button>
            <Button danger onClick={ ()=> removeItem(record)}>Sil</Button>
          </Space>
        ),
      },
    ];


     return ( 
      <>
        <Table columns={columns} dataSource={products} />
        <ProductModal open={isModalOpen} setOpen={setIsModalOpen} record={selectedRecord} />
      </>

     )
};
export default DataTable;