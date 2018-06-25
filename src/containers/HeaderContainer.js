import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import './header.scss';
import {logout} from "../redux/modules/auth.reducer";

@connect(
    ({auth, cart}) => ({
        auth:auth,
        cart:cart
    }), {
        logout
    }
)
class HeaderContainer extends Component {

    constructor(props) {
        super(props);
    }
    logoutHandle =()=>{
        this.props.logout();
    };

    counter(){
        const {idList} = this.props.cart;
        let amount = 0;
        Object.keys(idList).map(id=>{ if(idList[id]) amount += idList[id]});
        return amount;
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={`/`}>Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {!this.props.auth.isLogin?
                            <li className="nav-item">
                                <Link className="nav-link" to={`/signIn`}>SignIn</Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link className="nav-link" to={`/`} onClick={()=>{this.logoutHandle()}}>Logout</Link>
                            </li>
                        }
                        {!this.props.auth.isLogin?
                            <li className="nav-item">
                                <Link className="nav-link" to={`/signUp`}>SignUp</Link>
                            </li>
                            :null
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to={`/cart`}>Cart{this.counter()?<span className="circle">{this.counter()}</span>:null}</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(HeaderContainer)