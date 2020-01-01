import React, {useState, useEffect} from 'react';
import ProductList from './productList'
import './css/product.css';
import axios from 'axios';

 
 
const ProductUpload = () => {
 
const [productname, setProductname] = useState('');
  const [productprice, setProductprice] = useState(0);
   const [prodpath, setProdpath] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
   const [list, setList] = useState({
           isLoaded: false,
           prodlist: []
   });

  const onChange = e => {
     e.persist();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
    setProdpath(`/uploads/${e.target.files[0].name}`)
  };

  useEffect(() => {
    prodList()
  },[])

    const prodList = () => {

      axios.get('/api/product',{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(item => {
        const {productList} = item.data
        setList({
          isLoaded: true,
          prodlist: productList
        })
      })
    .catch(err => console.log(err));
    }

    const handleChange = (event) => {
    event.persist();
    if (event.target.name === 'name') {
      setProductname(event.target.value)
    } 
    else
    if (event.target.name === 'price') {
       setProductprice(event.target.value)
    }
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your product was submitted: ' + productname);
    
     const formData = new FormData();
    formData.append('productImage', file);
    formData.append('name', productname);
    formData.append('price', productprice);

     axios.post('/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
    .then(res => {
         const { productImage, productPath } = res.data.createdProduct;
        setUploadedFile({productImage, productPath})
        console.log(res.data.createdProduct)
         console.log(uploadedFile.productPath)
    })
    .catch(err => console.log(err));
  }
   console.log(list.isLoaded)
   list.prodlist.map(prod => console.log(prod))

  return ( 
       <div className="Product">
    
        <form onSubmit={handleSubmit}>
         <>
            name:
            <input type="text" name="name" value={productname} 
            onChange={handleChange} required/>
          </><br/>

          <><br/>
            price:
            <input type="text" name="price" value={productprice}
            onChange={handleChange} required/>
          </><br/>

           <><br/>
           productImage:
            <input type="file" name="productImage"
             onChange={onChange}/>
           </><br/>

           <input type="submit" value="Submit"/>
         </form>
         <div>
         <ProductList 
         productname={productname} 
         productprice={productprice}
         productImage={filename}
         productPath={prodpath}
         />

          {list.prodlist.map(item => (
            <div key={item._id}>
            <p>{item.name}</p>
            <p>{item.price}</p>
            <p>{item.prodImage}</p>
            <p><img style={{ width: '50%' }} src={item.prodPath} alt='' /></p>
            </div>
          ))}
       </div>
      </div>
   );
}
export default ProductUpload;