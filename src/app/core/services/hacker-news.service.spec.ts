import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService, Story } from './hacker-news.service';
import { HttpParams } from '@angular/common/http';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  const mockStories: Story[] = [
    { id: 1, title: 'Story 1', url: 'http://example.com/story1' },
    { id: 2, title: 'Story 2', url: 'http://example.com/story2' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService]
    });

    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch stories with pagination parameters', () => {
    const page = 1;
    const pageSize = 10;
    const searchTerm = null;

    service.getStories(searchTerm, page, pageSize).subscribe((stories) => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(mockStories);
    });

    const req = httpMock.expectOne((request) => {
      const params: HttpParams = request.params;
      return request.url === 'https://localhost:7031/api/Stories/newest' &&
        params.get('page') === '1' &&
        params.get('pageSize') === '10' &&
        params.get('searchTerm') === null;
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockStories);  
  });

 
   

  it('should exclude searchTerm in params if not provided', () => {
    const page = 1;
    const pageSize = 5;

    service.getStories(null, page, pageSize).subscribe((stories) => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual(mockStories);
    });

    const req = httpMock.expectOne((request) => {
      const params: HttpParams = request.params;
      return request.url === 'https://localhost:7031/api/Stories/newest' &&
        params.get('searchTerm') === null &&
        params.get('page') === '1' &&
        params.get('pageSize') === '5';
    });

    expect(req.request.method).toBe('GET');
    req.flush(mockStories);
  });
});
