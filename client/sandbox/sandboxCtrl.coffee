angular.module 'pptq-calendar'
.controller 'sandboxCtrl', ($scope) ->
  ctx = document.getElementById('canvas').getContext('2d')
  ctx1 = document.getElementById('canvas1').getContext('2d')
  ctx2 = document.getElementById('canvas2').getContext('2d')
  img = new Image()
  img.src = '/img/avatar.png'
  img.onload = ->
    ctx.drawImage(img, 0, 0)
    ctx1.drawImage(img, 0, 0)
    ctx2.drawImage(img, 0, 0)

  $scope.save = ->
    canvas = document.getElementById('canvas')
    canvas.toBlob (blob) ->
      saveAs(blob, 'mon-image.png')
  $scope.saveMultiple = ->
    canvas = document.getElementById('canvas1')
    canvas.toBlob (blob) ->
      saveAs(blob, 'mon-image1.png')
    canvas = document.getElementById('canvas2')
    canvas.toBlob (blob) ->
      saveAs(blob, 'mon-image2.png')



