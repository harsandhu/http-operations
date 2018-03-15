import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {}

   createPost( input: HTMLInputElement){
     let post = {
       title: input.value
     };
     this.http.post(this.url, JSON.stringify(this.post))
      .subscribe( response=> {
        post['id'] = response.json().id;
        this.posts.splice(0,0, post);
        console.log(response.json());
        input.value = '';
      })

   }

   updatePostObject(post){
     this.http.patch(`${this.url}/${post.id}`, JSON.stringify({ isRead: true}))
      .subscribe(x=> {
        console.log(x);
      })
   }

   deletePostObject(post){
     this.http.delete(`${this.url}/${post.id}`)
      .subscribe(x=> {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
   }

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(response=> {
        this.posts = response.json();
      });
  }

}
