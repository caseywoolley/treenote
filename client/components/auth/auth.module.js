'use strict';

angular.module('treenoteApp.auth', ['treenoteApp.constants', 'treenoteApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
