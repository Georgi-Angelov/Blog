import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { AngularFireStorage } from 'angularfire2/storage'
import { PostService } from '../post.service'
import { Post } from '../post'
import { AuthService } from '../../core/auth.service'

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post
  editing: boolean = false
  image: string
  uploadPercent: Observable<number>
  downloadURL: Observable<string>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private storage: AngularFireStorage,
    public auth: AuthService,
    
  ) { }

  ngOnInit() {
    this.getPost()
  }

  getPost(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.getPostData(id).subscribe(post => (this.post = post))
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content,
      image: this.image
    }
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.update(id, formData)
    this.editing = false
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(['/blog'])
  }

  uploadImage(event) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files')
    }
    else {
      const task = this.storage.upload(path, file)
      this.downloadURL = task.downloadURL()
      this.uploadPercent = task.percentageChanges()
      console.log('Image Uploaded!')
      this.downloadURL.subscribe(url => (this.image = url))
    }
  }
}
