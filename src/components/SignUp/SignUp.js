import React, {Component} from 'react';
import './signUp.scss'
import {validate} from './validation'
import {reduxForm, Field} from "redux-form";
import RenderField from "../common/RenderField/RenderField";

@reduxForm({
    form: 'signUp',
    fields: ['username','email', 'password'],
    validate,
    enableReinitialize: true
})
class SignUpComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <form className="Registration" onSubmit={this.props.handleSubmit}>
                    <div className="form-group">
                        <Field
                            label="Username"
                            name='username'
                            component={RenderField}
                            type="text"
                        />
                    </div>
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
                        SignUp
                    </button>
                </form>
        )
    }
}

export default SignUpComponent