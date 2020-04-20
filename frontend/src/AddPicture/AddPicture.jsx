import React from 'react';
import PropTypes from 'prop-types';
import './../_components/css/AddPicture.css';
export const AddPicture = ({item: {getproducts}}) => {
console.log('AddPicture getproducts ',getproducts)

if (getproducts) {
return (
  <React.Fragment>
    {getproducts.map(getproduct => {
      return <ul key={getproduct._id} className="AddPicture">
     item: <li>{getproduct.itemName}</li>
     price: <li>{getproduct.itemPrice}</li>
     picture: <li><img style={{width: '50%'}} src={getproduct.toFilePath} alt=""/></li>
        </ul>
    })}
  </React.Fragment>
)
  } else
    {
      return (
        <React.Fragment>
          Product Loading ...
        </React.Fragment>
      )
    }
};

AddPicture.propTypes = {
  item: PropTypes.object.isRequired,
};