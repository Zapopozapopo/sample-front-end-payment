import React, {Component} from 'react';
import './logIn.scss'
import {reduxForm, Field} from 'redux-form';
import RenderField from "../common/RenderField/RenderField";
// import PropTypes from 'prop-types';
import {validate} from './validation'

@reduxForm({
    form: 'logInForm',
    fields: ['email', 'password'],
    validate,
    enableReinitialize: true
})

class LogIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                    <form className="Login" onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            <Field
                                label="Email"
                                name='email'
                                component={RenderField}
                                type="email"
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                label="Password"
                                name='password'
                                component={RenderField}
                                type="password"
                            />
                        </div>
                    <button
                        className="btn btn-success"
                        type='submit'
                    >
                        Login
                    </button>
                    </form>
        )
    }
}

export default LogIn

