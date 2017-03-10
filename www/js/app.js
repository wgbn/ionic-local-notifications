// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .controller('MainCtrl',
        ['$scope', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification',
            function($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {

                $scope.result = [];

                var _hs = [
                    '17:25:00',
                    '17:35:00',
                    '17:45:00',
                    '17:55:00'
                ];
                var now, t, _at;
                console.log(_hs);

                $ionicPlatform.ready(function () {

                    if (window.cordova) {

                        $cordovaLocalNotification.cancelAll().then(function (result) {
                            console.log('cancel', result);
                        });

                        _hs.forEach(function(hs, k) {

                            now = new Date();
                            t = hs.split(':');console.log(t);
                            now.setHours(parseInt(t[0]));
                            now.setMinutes(parseInt(t[1]));
                            now.setSeconds(0);
                            now.setMilliseconds(0);

                            _at = new Date(now.getTime() - 1000); //600000
                            console.log('_at', _at);

                            $cordovaLocalNotification.schedule({
                                id: (k + 1),
                                title: 'notificacao '+k,
                                text: 'Text here',
                                at: _at
                            }).then(function (result) {
                                console.log('agendado', result);
                                $scope.result.push(result);
                            });

                        });

                        $scope.btn = function() {
                            console.log('clicou');
                            $cordovaLocalNotification.schedule({
                                id: 11,
                                title: 'Title here',
                                text: 'Text here',
                                data: {
                                    customProperty: 'custom value'
                                }
                            }).then(function (result) {
                                console.log(result);
                            }, function(err){
                                console.log(err);
                            }).catch(function(err) {
                                console.log(err);
                            });
                        };
                    }

                });

            }
        ]
    );
