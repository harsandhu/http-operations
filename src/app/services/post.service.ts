import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) { }

  getPosts(){
    return this.http.get(this.url);
  }

  createPosts(post){
    return  this.http.post(this.url, JSON.stringify(post));
  }

  updatePosts(post, prop){
    return this.http.patch(`${this.url}/${post.id}`, prop);
  }

  deletePosts(id){
    return this.http.delete(`${this.url}/${id}`);
  }
}
