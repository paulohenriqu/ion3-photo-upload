import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { Camera } from "@ionic-native/camera";
import { FileTransfer, FileTransferObject, FileUploadOptions } from "@ionic-native/file-transfer";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  imageURI: string;
  convertedURI: string;
  private win: any = window;

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    private transfer: FileTransfer
  ) {}

  foto() {
    this.camera
      .getPicture({
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        correctOrientation: true
      })
      .then(
        imageData => {
          this.imageURI = imageData;
          this.convertedURI = this.win.Ionic.WebView.convertFileSrc(
            this.imageURI
          );
          console.log(this.convertedURI);
        },
        err => {
          console.log(err);
        }
      );
  }

  uploadFile() {

    console.log("Upload");
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: "ionicfile",
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    };

    var params:any = {};
    params.nome = "testeNome";
    params.container = "abc";
    options.params = params;

    fileTransfer
      .upload(this.imageURI, "http://192.168.0.102:8080/api/upload", options)
      .then(
        data => {
          console.log(data + " Uploaded Successfully");
        },
        err => {
          console.log(err);
        }
      );
  }
}
