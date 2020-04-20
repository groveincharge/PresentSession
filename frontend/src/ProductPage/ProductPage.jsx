import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { productActions } from './../_actions';
import { AddPicture } from './../AddPicture';
import axios from 'axios';

 const ProductPage = (props) => {

  const { requesting, product, addProduct } = props;
  const { getproducts, getAll } = props;
  console.log('productPage props',props)

  const [toFilePath, setToFilePath] = useState(" ");
  const [itemName, setItemName] = useState(" ") 
  const [itemPrice, setItemPrice] = useState(0.0) 
  const [file, setFile] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState({});
  const [productList, setProductList] = useState({});

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'itemName') {
      setItemName(value)
    } else
      if (name === 'itemPrice') {
      setItemPrice(value)
    } else  
       if (name === 'toFilePath') {
          setFile(files[0])
          setFilename(files[0].name)
          setToFilePath(`/public/uploads/${files[0].name}`)
    }
};


const handleSubmit = event => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('file', file);

   axios.post('http://localhost:7000/products/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    })
    .then(res => {
            res.data
            const { filePath } = res.data;
            setUploadedFile({ filePath });
    })
    .catch(err => console.log(err))
    
  const prod = {
            itemName,
            itemPrice,
            toFilePath
            }
  setSubmitted(true)
  addProduct(prod)
  };

  const uploadedProduct = () => {
 useEffect(() => {
  axios.get('http://localhost:7000/products/getAll')
  .then(res => {
          getAll(res.data)
          setProductList(res.data)
  })
  .catch(err => console.log(err))
 },[])
  };

  uploadedProduct()

  return ( 
       <div>
         <form name="form" onSubmit={handleSubmit}>

           <div className={'form-group' + (submitted && !itemName? ' has-error' : '')}>
                        <label htmlFor="itemName">Item Name</label>
                        <input type="text" className="form-control" name="itemName" value={itemName} onChange={handleChange} />
                        {submitted && !itemName &&
                            <div className="help-block">Item Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !itemPrice ? ' has-error' : '')}>
                        <label htmlFor="itemPrice">Price</label>
                        <input type="text" className="form-control" name="itemPrice" value={itemPrice} onChange={handleChange} />
                        {submitted && !itemPrice &&
                            <div className="help-block">Product Price is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !toFilePath ? ' has-error' : '')}>
                        <label htmlFor="toFilePath">Item Picture</label>
                        <input type="file" className="form-control-file" name="toFilePath" onChange={handleChange} />
                        {submitted && !toFilePath &&
                            <div className="help-block">Picture is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Submit</button>
                        {requesting && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>

         </form>
          <div>     
          <AddPicture 
            item={productList} />  
         </div>

       </div>
   );
}

function mapState(state) {
return {
    product: state.product,
    getproducts: state.getproducts
   }
}

const actionCreators = {
 addProduct: productActions.addProduct,
 getAll: productActions.getAll,
}

const connectedProductPage = connect(mapState, actionCreators)(ProductPage);
export { connectedProductPage as ProductPage };
