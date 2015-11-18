'use strict';

import auth from './auth/auth';
import cookie from './cookie/cookie';
import http from './http/http';
import msg from './msg/msg';
import util from './util/util';

var sandbox = {
    auth: auth,
    cookie: cookie,
    http: http,
    msg: msg,
    util: util
};
    
export default sandbox;