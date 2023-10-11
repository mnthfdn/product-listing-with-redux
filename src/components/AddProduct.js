import React, { useState } from 'react';
import { Button} from 'antd';
import ProductModal from './ProductModal';

const AddProduct = ()  =>{
    const [open, setOpen] = useState(false);
 

     return ( 
        <>
            <div className='addProduct'>
                <div className='title'>ÜRÜN LİSTESİ</div>

                <Button  onClick={() => setOpen(true)} style={{ color: "white",backgroundColor: "#21ba45" }}> <bold>+ </bold> ÜRÜN EKLE</Button>
            </div>
            <ProductModal open={open} setOpen={setOpen}/>
        </>
     )
};
export default AddProduct;
