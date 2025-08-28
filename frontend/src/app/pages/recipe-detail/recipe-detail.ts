import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-recipe-detail',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './recipe-detail.html',
  styles: ``
})
export class RecipeDetail {
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  recipe: any;
  likes = 0;
  comments: any[] = [];
  commentText = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.getRecipe(id).subscribe((r: any) => {
      this.recipe = r;
      this.likes = r?.likes?.length || 0;
    });
    this.api.listComments(id).subscribe((cs) => (this.comments = cs || []));
  }

  toggleLike() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.likeRecipe(id).subscribe((res: any) => (this.likes = res?.likes ?? this.likes));
  }

  addComment() {
    if (!this.commentText.trim()) return;
    const id = this.route.snapshot.paramMap.get('id')!;
    this.api.addComment(id, this.commentText).subscribe((c) => {
      this.comments.unshift(c);
      this.commentText = '';
    });
  }
}
