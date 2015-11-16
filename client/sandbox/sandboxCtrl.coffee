angular.module 'pptq-calendar'
.controller 'sandboxCtrl', ($scope) ->
  ctx = document.getElementById('canvas').getContext('2d')
  img = new Image()
  img.src = '/img/avatar.png'
  img.onload = ->
    ctx.drawImage(img, 0, 0)
  $scope.save = ->
    canvas = document.getElementById('canvas')
    canvas.toBlob (blob) ->
      saveAs(blob, 'mon-image.png')



