import React, {useState, useEffect} from 'react';
import ProductList from './productList';
import './css/product.css';
import axios from 'axios';

 
 
const ProductUpload = ({isAuthenticated}) => {
  console.log('ProductUpload ', isAuthenticated)
 
  const [productname, setProductname] = useState('');
  const [productprice, setProductprice] = useState(0);
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
   const [prodlist, setProdlist] = useState([])
   const [prodpath, setProdpath] = useState('');
  
     const onChange = e => {
     e.persist();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
    setProdpath(`/uploads/${e.target.files[0].name}`)
     };

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
         const {productImage, productPath} = res.data.createdProduct;
        setUploadedFile({productImage, productPath})
      })
      .catch(err => console.log(err));
    };

     const prodList = () => {

   if (isAuthenticated) {
      axios.get('/api/product',{
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(item => {
     setProdlist(item.data.productList)
     })
    .catch(err => console.log(err));
     }
    }

     useEffect(() => {
         prodList()
       },[])

      prodlist.map(item => {
       return console.log(item)
         })
      
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
        <ProductList prodlist={prodlist}/>
      </div>
    </div>
   );
}
export default ProductUpload;