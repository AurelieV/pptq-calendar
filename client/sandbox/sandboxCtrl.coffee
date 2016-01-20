angular.module 'pptq-calendar'
.controller 'sandboxCtrl', ($scope) ->
  canvas = document.getElementById('canvas')
  canvas.width = 200;
  canvas.height = 180;
  ctx = canvas.getContext('2d')
  ctx1 = document.getElementById('canvas1').getContext('2d')
  ctx2 = document.getElementById('canvas2').getContext('2d')
  img = new Image()
  img.src = '/img/avatar.png'
  img.onload = ->
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 200, 180)
    ctx.drawImage(img, 50, 0)
    ctx.font = "30px Arial"
    ctx.fillStyle = "purple"
    ctx.fillText("Purple fox", 30, 150)
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



