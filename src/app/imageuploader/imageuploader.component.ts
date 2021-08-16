import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.scss']
})
export class ImageuploaderComponent implements OnInit {
  @Input() imagebase64!: string
  @Input() isImageSaved!: boolean
  @Output() onFileChange = new EventEmitter();
  cardImageBase64!:string
  constructor() { }

  ngOnInit(): void {
    this.cardImageBase64 = this.imagebase64;
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.cardImageBase64 = imgBase64Path;
                    this.isImageSaved = true;   
                    
                    this.onFileChange.emit(this.cardImageBase64);
            };
        };
        reader.readAsDataURL(fileInput.target.files[0]);


    }
}
}
