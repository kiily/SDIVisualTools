import { SDIVisualizationPage } from './app.po';

describe('sdivisualization App', () => {
  let page: SDIVisualizationPage;

  beforeEach(() => {
    page = new SDIVisualizationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
