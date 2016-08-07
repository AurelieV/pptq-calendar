class HttpInterceptor {
  constructor() {
    ['request', 'requestError', 'response', 'responseError']
    .forEach((method) => {
      if (this[method]) {
        this[method] = this[method].bind(this);
      }
    })
  }
}

class authInterceptor extends HttpInterceptor {
  /*@ngInject*/
  constructor ($q, $rootScope, LoopBackAuth) {
    super();
    this._$rootScope = $rootScope;
    this._LoopBackAuth = LoopBackAuth;
    this._$q = $q;
  }
  responseError (rejection) {
    if (rejection.status === 401) {
      // Now clearing the loopback values from client browser for safe logout...
      this._LoopBackAuth.clearUser();
      this._LoopBackAuth.clearStorage();
      this._$rootScope.$broadcast('auth-failed');
    }
    return this._$q.reject(rejection);
  }
}
app.service('authInterceptor', authInterceptor);
