import { Component, OnInit } from '@angular/core';
import { HackerNewsService, Story } from '../../../../core/services/hacker-news.service'
 

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];
  filteredStories: Story[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalStories: number = 0; // Si puedes obtener esto del API
  isLoading: boolean = false;
  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.isLoading = true;
    this.hackerNewsService.getStories(this.searchTerm, this.currentPage, 10).subscribe(
      (stories) => {
        this.filteredStories = stories;
        this.stories = stories;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching stories', error);
        this.isLoading = false;
      }
    );
  }

  nextPage(): void {
    this.currentPage++;
    this.loadStories();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadStories();
    }
  }

  searchStories(): void {
    if (this.searchTerm) {
      this.filteredStories = this.stories.filter(story =>
        story.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStories = this.stories;
    }
  }
}
