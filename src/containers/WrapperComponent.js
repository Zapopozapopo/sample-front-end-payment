import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {checkCartStorage} from "../redux/modules/cart.reducer";
import {checkIsLogin} from "../redux/modules/auth.reducer";

@connect(
    () => ({}), {
        checkCartStorage,
        checkIsLogin
    }
)

class WrapperComponent extends Component {

    componentWillMount() {
        this.props.checkCartStorage();
        this.props.checkIsLogin();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(WrapperComponent);
