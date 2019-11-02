const MAIL_USED_ERR = {
    status: 'error',
    msg: 'E-mail already used, please choose another.'
};

const MAIL_NOT_FOUND_ERR = {
    status: 'error',
    msg: 'E-mail not found.'
};

const WRONG_PASSWORD_ERR = {
    status: 'error',
    msg: 'Wrong password.'
};

module.exports = {
    MAIL_USED_ERR,
    MAIL_NOT_FOUND_ERR,
    WRONG_PASSWORD_ERR
}