import requestF from 'superagent';
import dash from 'lodash';
import config from '../config';

const TIMEOUT = 15000;

function makeUrl(url) {
  let newUrl = url;
  if (dash.isArray(newUrl)) {
    newUrl = '/' + newUrl.join('/');
  }
  if (__CLIENT__) {
    newUrl = '/api' + newUrl;
  } else {
    newUrl = 'http://' + config.apiHost + ':' + config.apiPort + newUrl;
  }
  return newUrl;
}

function removeValue(arr, value) {
  dash.remove(arr, (item) => item === value);
}

const _pendingRequests = [];

// Abor the requests for the Api Call with the specified name.
// Be careful since won't make any difference if the same api call gets
// called with diffrent query strings or body, this feature stops any
// pending call for the specified Api Call
function abortPendingRequestsForApiCall(apiCallName) {
  const pendingRequest = dash.find(_pendingRequests, (pending) => {
    return pending._apiCallName === apiCallName;
  });

  if (pendingRequest) {
    pendingRequest._callback = () => {};
    pendingRequest.abort();
    removeValue(_pendingRequests, pendingRequest);
  }
}

function isSuccessStatus(status) {
  return status >= 200 && status <= 299;
}

function defaultParser(res) {
  let result = null;
  if (isSuccessStatus(res.status)) {
    result = this.done(res.body);
  } else {
    result = this.fail(res.body);
  }
  return result;
}

function digestResponse(resolve, reject, error, request, response, options) {
  const result = {};

  // Autofail with standard api error on timeout.
  if (error && error.timeout >= 0) {
    result.apiError = 'TIMEOUT';
    reject(result);

  // Auto-fail with special auth error on 401.
  } else if (response && response.status === 401) {
    result.apiResponse = response.body || {};
    result.apiError = 'AUTH_ERROR';
    reject(result);

  // Auto-fail with special api down error on 502 - 504.
  // IE can do weird things with 5xx errors like call them 12031s.
  } else if (response && (response.status >= 502 && response.status <= 504) || response.status > 12000) {
    result.apiResponse = response.body || {};
    result.apiError = '500_ERROR';
    reject(result);
  } else if (response && response.status === 429) {
    result.apiResponse = response.body || {};
    result.apiError = 'RATE_LIMIT_ERROR';
    reject(result);

  // Autofail with standard api error.
  } else if (error) {
    result.apiResponse = response.body || {};
    result.apiError = 'ERROR';
    reject(result);
  } else {
    response.body = response.body || {}; // patch response.body if nonexistant
    let gotExpectedResponse;
    const parser = options.parse || defaultParser;

    const done = function done(data) {
      gotExpectedResponse = true;
      result.apiResponse = data || {};
      resolve(result);
    };

    const fail = function fail(err) {
      gotExpectedResponse = true;
      result.apiResponse = err || {};
      result.apiError = err;
      reject(result);
    };

    const pass = function pass() {
      // do nothing.  don't resolve or reject the promise.
      gotExpectedResponse = true;
    };

    parser.call({ done, fail, pass }, response);

    // Our parser did not get a response it understands
    if (!gotExpectedResponse) {
      result.apiError = 'UNKOWN ERROR';
      reject(result);
    }
  }
}

function executeRequestFlow(options, origReq) {
  return new Promise(function requestPromise(resolve, reject) {
    options.method = options.method || 'GET';
    const url = options.absolutePath || makeUrl(options.path);
    const request = requestF(options.method, url);
    const query = {};
    if (['GET', 'POST', 'PUT'].indexOf(options.method) > -1) {
      request.accept('json');
      request.type('json');
    }

    if (['POST', 'PUT'].indexOf(options.method) > -1) {
      options.body = options.body || {};
    }

    // If you need to set a cookie do as follow:
    // request.set('Cookie', sessionCookie);

    if (options.body) {
      request.send(options.body);
      Object.keys(options.body).forEach(function processKey(key) {
        if (options.body[key] === undefined) {
          console.warn('Key was undefined in request body:', key);
        }
      });
    }

    if (options.headers && dash.isPlainObject(options.headers)) {
      request.set(options.headers);
    }

    if (options.query) {
      dash.extend(query, options.query);
    }

    if (Object.keys(query).length) {
      request.query(query);
    }

    request.timeout(TIMEOUT);

    // Prevent concurrent calls for the same Api Call type.
    if (options.cancelPendingRequests) {
      if (request.dashapiCallName) console.log('WARNING: Prop clashing with request object');
      if (!options.apiCallName) console.log('WARNING: To cancel previous calls the Api Call needs a name defined.');

      request._apiCallName = options.apiCallName;

      abortPendingRequestsForApiCall(options.apiCallName);
    }

    // Request Callback logic
    request.end((error, response = {}) => {
      digestResponse(resolve, reject, error, request, response, options);
      removeValue(_pendingRequests, request);
    });

    _pendingRequests.push(request);
  });
}

// API Interface
export default class Api {

  constructor(origReq) {
    this.origReq = origReq;
  }

  get(options) {
    options.method = 'GET';
    return executeRequestFlow(options, this.origReq);
  }

  put(options) {
    options.method = 'PUT';
    return executeRequestFlow(options, this.origReq);
  }

  post(options) {
    options.method = 'POST';
    return executeRequestFlow(options, this.origReq);
  }

  delete(options) {
    options.method = 'DELETE';
    return executeRequestFlow(options, this.origReq);
  }

  head(options) {
    options.method = 'HEAD';
    return executeRequestFlow(options, this.origReq);
  }

  isSuccessStatus(status) {
    return isSuccessStatus(status);
  }

}
