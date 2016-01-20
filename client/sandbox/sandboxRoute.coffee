angular.module 'pptq-calendar'
.config ($stateProvider) ->
  $stateProvider
  .state 'sandbox',
    url: '/sandbox'
    controller: 'sandboxCtrl'
    templateUrl: 'sandbox/sandbox.tpl.html'
