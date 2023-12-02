import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
    getData() {
        return [
            {
                itemImageSrc: '../../assets/images/galleria/1.png',
                thumbnailImageSrc: '../../assets/images/galleria/1.png',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: '../../assets/images/galleria/2.png',
                thumbnailImageSrc: '../../assets/images/galleria/2.png',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: '../../assets/images/galleria/3.png',
                thumbnailImageSrc: '../../assets/images/galleria/3.png',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: '../../assets/images/galleria/4.png',
                thumbnailImageSrc: '../../assets/images/galleria/4.png',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: '../../assets/images/galleria/5.png',
                thumbnailImageSrc: '../../assets/images/galleria/5.png',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: '../../assets/images/galleria/6.png',
                thumbnailImageSrc: '../../assets/images/galleria/6.png',
                alt: 'Description for Image 5',
                title: 'Title 5'
            }
        ];
    }

    getImages() {
        return Promise.resolve(this.getData());
    }
};