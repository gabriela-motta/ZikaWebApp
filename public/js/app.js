angular.module('zikaApp', ['ngRoute', 'appRoutes', 'ngMaterial', 'ngMessages', 'ngCookies', 'chart.js']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue');
});
