import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImageComponent implements OnInit {

  uploadedFiles: any[] = [];
  private reader: FileReader | undefined;
  private fileBuffer: any;
  public imagePath: any;

  loading: boolean = true;

  public imagePathArr: any[] = [];

  public progressPercent = 0;

  selectedRestaurant: Restaurant = Object.assign(
    {},
    this.dataService.newRestaurant
  );

  constructor(private messageService: MessageService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.reader = new FileReader();
    this.reader.onload = () => {
      this.fileBuffer = this.reader?.result;
    }

    this.dataService.selectedRestaurant$.subscribe((r) => {
      this.selectedRestaurant = r;
    });

    if (!this.selectedRestaurant || this.selectedRestaurant.id === 0) {

      this.router.navigate(['/']);
    }

    this.loading = true;
    this.getAllImages()
  }

  getAllImages() {

    this.dataService.getAllImages(this.selectedRestaurant.id).subscribe((data) => {
      console.log('data = ', data);
      this.imagePathArr = [];
      data.forEach(i => {

        let imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
          'data:image/jpg;base64,' + i.base64
        )

        let name = i.name;

        this.imagePathArr.push({
          name: name,
          imagePath: imagePath
        })

      });

      console.log(this.imagePathArr)
      this.loading = false;
    })
  }

   onUpload(event: { files: any; },form:any) {
    for (let file of event.files) {
     this.processFile(file);
    }

    form.clear();

    this.messageService.add({ severity: 'info', summary: 'Upload thành công' });
  }

  onSelect(event: { files: any; }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }


  onRemove(event: { files: any; }) {
    this.uploadedFiles = [];
  }

  onClear(){
  }

  public readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);

    })
  }

  arrayBufferToString(arrayBuffer: any, decoderType = 'utf-8') {
    let decoder = new TextDecoder(decoderType);
    return decoder.decode(arrayBuffer);
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public async processFile(file: File) {
    try {
      let arrayBuffer = await this.readFileAsync(file);
      const dataBase64 = this.arrayBufferToBase64(arrayBuffer as ArrayBuffer);
      this.imagePath = this.domSanitizer.bypassSecurityTrustResourceUrl(
        'data:image/jpg;base64,' + dataBase64
      );

      let image = this.dataService.newImage;
      image.base64 = dataBase64;
      image.restaurant = this.selectedRestaurant;
      image.name = file.name;

      this.dataService.postImage(image).subscribe((event: HttpEvent<any>) => {
        switch (event?.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Request has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progressPercent = Math.round(
              (event.loaded / (event?.total || 1)) * 100
            );
            console.log('uploaded!', this.progressPercent);
            break;
          case HttpEventType.Response:
            console.log('User succesfully created!', event.body);

            break;
        }
        this.getAllImages();
      });

    } catch (error) {

    }

  }
}
