angular.module 'pptq-calendar'
.controller 'myDatepickerController', ($scope, $timeout, $mdDialog, $document, model, locale, mdTheme) ->
  checkLocale = (locale) ->
    if !locale
      return (if navigator.language != null then navigator.language else navigator.browserLanguage).split('_')[0].split('-')[0] or 'en'
    locale

  generateCalendar = ->
    days = []
    previousDay = angular.copy($scope.activeDate).date(0)
    firstDayOfMonth = angular.copy($scope.activeDate).date(1)
    lastDayOfMonth = angular.copy(firstDayOfMonth).endOf('month')
    maxDays = angular.copy(lastDayOfMonth).date()
    $scope.emptyFirstDays = []
    i = if firstDayOfMonth.day() == 0 then 6 else firstDayOfMonth.day() - 1
    while i > 0
      $scope.emptyFirstDays.push {}
      i--
    j = 0
    while j < maxDays
      date = angular.copy(previousDay.add(1, 'days'))
      date.selected = angular.isDefined($scope.selected.model) and date.isSame($scope.selected.date, 'day')
      date.today = date.isSame(moment(), 'day')
      days.push date
      j++
    $scope.emptyLastDays = []
    k = 7 - (if lastDayOfMonth.day() == 0 then 7 else lastDayOfMonth.day())
    while k > 0
      $scope.emptyLastDays.push {}
      k--
    $scope.days = days

  $scope.model = model
  $scope.mdTheme = if mdTheme then mdTheme else 'default'
  activeLocale = undefined

  @build = (locale) ->
    activeLocale = locale
    moment.locale activeLocale
    if angular.isDefined($scope.model)
      $scope.selected =
        model: moment($scope.model).format('LL')
        date: $scope.model
      $scope.activeDate = moment($scope.model)
    else
      $scope.selected =
        model: undefined
        date: new Date
      $scope.activeDate = moment()
    $scope.moment = moment
    $scope.days = []
    #TODO: Use moment locale to set first day of week properly.
    $scope.daysOfWeek = [
      moment.weekdaysMin(1)
      moment.weekdaysMin(2)
      moment.weekdaysMin(3)
      moment.weekdaysMin(4)
      moment.weekdaysMin(5)
      moment.weekdaysMin(6)
      moment.weekdaysMin(0)
    ]
    $scope.years = []
    y = moment().year() - 100
    while y <= moment().year() + 100
      $scope.years.push y
      y++
    generateCalendar()

  @build checkLocale(locale)

  $scope.previousMonth = ->
    $scope.activeDate = $scope.activeDate.subtract(1, 'month')
    generateCalendar()

  $scope.nextMonth = ->
    $scope.activeDate = $scope.activeDate.add(1, 'month')
    generateCalendar()

  $scope.select = (day) ->
    $scope.selected =
      model: day.format('LL')
      date: day.toDate()
    $scope.model = day.toDate()
    generateCalendar()

  $scope.selectYear = (year) ->
    $scope.yearSelection = false
    $scope.selected.model = moment($scope.selected.date).year(year).format('LL')
    $scope.selected.date = moment($scope.selected.date).year(year).toDate()
    $scope.model = moment($scope.selected.date).toDate()
    $scope.activeDate = $scope.activeDate.add(year - $scope.activeDate.year(), 'year')
    generateCalendar()

  $scope.displayYearSelection = ->
    calendarHeight = $document[0].getElementsByClassName('mdc-date-picker__calendar')[0].offsetHeight
    yearSelectorElement = $document[0].getElementsByClassName('mdc-date-picker__year-selector')[0]
    yearSelectorElement.style.height = calendarHeight + 'px'
    $scope.yearSelection = true
    $timeout ->
      activeYearElement = $document[0].getElementsByClassName('mdc-date-picker__year--is-active')[0]
      yearSelectorElement.scrollTop = yearSelectorElement.scrollTop + activeYearElement.offsetTop - (yearSelectorElement.offsetHeight / 2) + activeYearElement.offsetHeight / 2

  $scope.cancel = ->
    $mdDialog.hide()

  $scope.closePicker = ->
    $mdDialog.hide $scope.selected
