import { Component, OnInit } from '@angular/core';
import { PostService } from '.././services/post.service';
import { AppError } from '.././common/errors/app-error';
import { NotFoundError } from '.././common/errors/not-found-error';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {}

   createPost( input: HTMLInputElement){
     let post = {
       title: input.value
     };
    this.service.createPosts(post)
      .subscribe( response=> {
        post['id'] = response.json().id;
        this.posts.splice(0,0, post);
        input.value = '';
      }, (error: Response)=> {
        if (error.status === 400){
        //  this.form.setErrors()
        }
        else{
          alert('an unexpected error returned.');
        }
      });

   }

   updatePostObject(post){
     this.service.updatePosts(post, JSON.stringify({ isRead: true}))
      .subscribe(x=> {
        console.log(x);
      }, error=> {
        alert('an unexpected error returned.');
    });

   }

   deletePostObject(post){
     this.service.deletePosts(post.id)
      .subscribe(x=> {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, (error: AppError)=> {
        if(error instanceof NotFoundError)
          alert('this post has already been deleted.');
        else
          alert('an unexpected error returned.');
    });
   }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response=> {
        this.posts = response.json();
      }, error=> {
        alert('an unexpected error returned.');
        console.log(error);
    });
  }

}
