class scrollService {
  /*@ngInject*/
  constructor($location, $anchorScroll) {
    this._$location = $location;
    this.$anchorScroll = $anchorScroll;
  }
  scrollTo(id) {
    if (this._$location.hash() !== id) {
      // set the $location.hash to `id` and
      // $anchorScroll will automatically scroll to it
      $location.hash(id);
    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      $anchorScroll();
    }
  }
}

app.service('scrollService', scrollService);


