import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AppError } from '.././common/errors/app-error';
import { NotFoundError } from '.././common/errors/not-found-error';

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
    return this.http.delete(`${this.url}/ghhg`)
      .catch((error: Response) => { //has to return Observable object
        if(error.status === 404){
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(error));
      });
  }
}
