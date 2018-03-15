import { Component, OnInit } from '@angular/core';
import { PostService } from '.././services/post.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private service: PostService) {}

   createPost( input: HTMLInputElement){
     let post = {
       title: input.value
     };
    this.service.createPosts(post)
      .subscribe( response=> {
        post['id'] = response.json().id;
        this.posts.splice(0,0, post);
        console.log(response.json());
        input.value = '';
      });

   }

   updatePostObject(post){
     this.service.updatePosts(post, JSON.stringify({ isRead: true}))
      .subscribe(x=> {
        console.log(x);
      });
   }

   deletePostObject(post){
     this.service.deletePosts(post.id)
      .subscribe(x=> {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
   }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response=> {
        this.posts = response.json();
      });
  }

}
