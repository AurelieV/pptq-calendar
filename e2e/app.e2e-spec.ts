import { PptqBisPage } from './app.po';

describe('pptq-bis App', function() {
  let page: PptqBisPage;

  beforeEach(() => {
    page = new PptqBisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
