angular.module('PostsCtrl', ['Post']).
  controller('PostsCtrl', [
    '$scope', '$location', '$routeParams', 'flash', 'Post', 'initialData',
    function ($scope, $location, $routeParams, flash, Post, initialData) {
      /**
       * The 'index' action.
       */
      $scope.actionIndex = function () {
        $scope.posts = initialData;
      };

      /**
       * The 'show' action.
       */
      $scope.actionShow = function () {
        $scope.post = initialData;
      };

      /**
       * The 'new' action.
       * Builds an empty post for the form.
       */
      $scope.actionNew = function () {
        $scope.post = initialData;
      };

      /**
       * The 'create' action.
       * If there are validation errors on the server side, then populates the
       * 'postErrors' scope variable with these errors.
       */
      $scope.actionCreate = function () {
        $scope.pleaseWaitSvc.request();

        $scope.post.$save(function (response) {
          $scope.pleaseWaitSvc.release();
          flash.set('success', 'Post created.');

          $location.path('posts');
        }, function (failureResponse) {
          $scope.pleaseWaitSvc.release();
          $scope.postErrors = failureResponse.data.errors;
        });
      };

      /**
       * The 'edit' action.
       */
      $scope.actionEdit = function () {
        $scope.post = initialData;
      };

      /**
       * The 'update' action.
       * If there are validation errors on the server side, then populates the
       * 'postErrors' scope variable with these errors.
       */
      $scope.actionUpdate = function () {
        $scope.pleaseWaitSvc.request();

        $scope.post.$update(function (response) {
          $scope.pleaseWaitSvc.release();
          flash.set('success', 'Post updated.');

          $location.path('posts');
        }, function (failureResponse) {
          $scope.pleaseWaitSvc.release();
          $scope.postErrors = failureResponse.data.errors;
        });
      };

      /**
       * The 'destroy' action.
       */
      $scope.actionDestroy = function () {
        $scope.pleaseWaitSvc.request();

        $scope.post.$delete(function (response) {
          $scope.pleaseWaitSvc.release();
          flash.set('success', 'Post deleted.');

          $location.path('posts');
        }, function (failureResponse) {
          $scope.pleaseWaitSvc.release();
          flash.set('error', 'Error deleting post.')
        });
      };
    }]);
