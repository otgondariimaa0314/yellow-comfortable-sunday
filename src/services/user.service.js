const axios = require('axios');
const api = require('../constants.js');

const getUsers = async () => await axios.get(api.USERS_API);
const getProfiles = async () => await axios.get(api.USER_PROFILES_API);


module.exports = {getUsers, getProfiles};