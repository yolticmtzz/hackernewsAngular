import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoriesComponent } from './stories.component';
import { HackerNewsService, Story } from '../../../../core/services/hacker-news.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;
  let mockHackerNewsService: jasmine.SpyObj<HackerNewsService>;

  const mockStories: Story[] = [
    { id: 1, title: 'Story 1', url: 'http://example.com/story1' },
    { id: 2, title: 'Story 2', url: 'http://example.com/story2' },
    { id: 3, title: 'Another Story', url: 'http://example.com/story3' }
  ];

  beforeEach(async () => {
    mockHackerNewsService = jasmine.createSpyObj('HackerNewsService', ['getStories']);

    await TestBed.configureTestingModule({
      declarations: [StoriesComponent],
      imports: [FormsModule],  
      providers: [
        { provide: HackerNewsService, useValue: mockHackerNewsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    mockHackerNewsService.getStories.and.returnValue(of(mockStories));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on init', () => {
    component.ngOnInit();
    expect(component.stories.length).toBe(3);
    expect(mockHackerNewsService.getStories).toHaveBeenCalledWith('', component.currentPage, component.pageSize);
  });

  

  it('should show all stories if search term is empty', () => {
    component.searchTerm = '';
    component.searchStories();
    expect(component.filteredStories.length).toBe(3);   
  });

  it('should paginate to next page', () => {
    component.currentPage = 1;
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(mockHackerNewsService.getStories).toHaveBeenCalled();
  });

  it('should not paginate to previous page if on page 1', () => {
    component.currentPage = 1;
    component.prevPage();
    expect(component.currentPage).toBe(1);   
  });

  it('should paginate to previous page', () => {
    component.currentPage = 2;
    component.prevPage();
    expect(component.currentPage).toBe(1);
    expect(mockHackerNewsService.getStories).toHaveBeenCalled();
  });
});
