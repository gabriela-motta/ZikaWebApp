var zika = angular.module('zikaApp');

zika.service('AuthService', ['$q', '$http', function ($q, $http) {

    var user = {status: false};

    // return available functions for use in the controllers
    return ({
        sign_up: sign_up,
        sign_in: sign_in,
        getStatus: getStatus,
        getUser: getUser,
        isLogged: isLogged,
        logout: logout,
        deleteUser: deleteUser
    });

    function sign_up(user) {
        var deferred = $q.defer();
        if (user.password === user.conf_pass) {
            $http.post(API_URL + '/auth/register', user)
                .then(function (data) {
                    if (data.status === 200) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }
                })
                .catch(function (error) {
                    deferred.reject(error.data);
                });
        } else {
            deferred.reject();
        }

        return deferred.promise;
    }

    function sign_in(user) {
        // create a new instance of deferred
        var deferred = $q.defer();

        $http.post(API_URL + '/auth/sign_in', user)
            .then(function (data) {
                if (data.status === 200) {
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function logout() {
        // create a new instance of deferred
        var deferred = $q.defer();

        $http.get('/api/user/logout')
            .then(function (data) {
                if (data.status === 200) {
                    deferred.resolve();
                    user = {status: false};
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function getUser() {
        var auxUser = user.user;
        auxUser.birthday = new Date(auxUser.birthday);
        return auxUser;
    }

    function getStatus() {
        // create a new instance of deferred
        var deferred = $q.defer();

        $http.get('/api/user/status')
            .then(function (response) {
                if (response.status === 200) {
                    deferred.resolve(response.data);
                    user = response.data;
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                user = error.data;
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function isLogged() {
        return user.status;
    }

    function editUser(user) {
        var deferred = $q.defer();

        $http.put('/api/user/' + user._id, user)
            .then(function (response) {
                if (response.status === 200) {
                    user.user = response.data;
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }

    function deleteUser(id, password) {
        var deferred = $q.defer();
        var body = {password: password};

        $http.post('/api/user/delete/' + id, body)
            .then(function (response) {
                if (response.status === 200) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .catch(function (error) {
                deferred.reject(error.data);
            });

        return deferred.promise;
    }
}]);
