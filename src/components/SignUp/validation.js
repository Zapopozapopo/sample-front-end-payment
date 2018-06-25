export const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.username) {
        errors.username = 'Required'
    }

    return errors
};