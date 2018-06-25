import React, {Component} from 'react';
import './cartItem.scss'

class CartItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {product, deleteFromCart} = this.props;
        return (
            <tr className='cart-row'>
                <td>{product.product.title}</td>
                <td>{product.product.description}</td>
                <td>{product.product.price}</td>
                <td>{product.quantity}</td>
                <td><button className='btn btn-danger' onClick={()=>{deleteFromCart(product.product._id)}}>Delete</button></td>
            </tr>
        )
    }
}

export default CartItem