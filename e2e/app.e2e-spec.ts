import { PptqCalendarPage } from './app.po';

describe('pptq-calendar App', function() {
  let page: PptqCalendarPage;

  beforeEach(() => {
    page = new PptqCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
