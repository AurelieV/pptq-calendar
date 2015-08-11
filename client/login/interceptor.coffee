angular.module 'pptq-calendar'
.factory 'authInterceptor', ($q, $rootScope) ->
  responseError: (rejection) ->
    if rejection.status is 401
      #Now clearing the loopback values from client browser for safe logout...
      LoopBackAuth.clearUser()
      LoopBackAuth.clearStorage()
      $rootScope.$broadcast 'auth-failed'

    $q.reject(rejection);
