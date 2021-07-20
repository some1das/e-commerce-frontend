import React from 'react'
import { API } from '../../backend'

function ImageHelper({product}) {
    const imageUrl=product?`${API}/product/photo/${product._id}`:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Golden_Pagoda_in_Arunachal_Pradesh_%28photo_-_Jim_Ankan_Deka%29.jpg/420px-Golden_Pagoda_in_Arunachal_Pradesh_%28photo_-_Jim_Ankan_Deka%29.jpg"
    return (
        <div>
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
        </div>
    )
}

export default ImageHelper
