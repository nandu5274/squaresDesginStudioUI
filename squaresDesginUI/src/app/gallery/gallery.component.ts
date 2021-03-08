import { Component, OnInit } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import{GallerryService} from './gallery.service';
declare var $: any;
declare var lightGallery:any;
import {Urlsconstnats} from '../common/app.urls';
import {ThumbnileResponse} from '../dto/thumbnileResponse';
import {filelistResponse} from '../dto/filelistResponse';
import {thumblineimageRequest} from '../dto/thumblineimageRequest';
import {ThumnliereponseDTO} from '../dto/ThumnliereponseDTO'
import {Entry} from '../dto/entry';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import {Observable} from 'rxjs/Rx';
import { CommonHttpService } from './../common/app.httpservice';
import {picdetailsexcelDTO} from '../dto/picdetailsexcelDTo';
import { portifolioexcelDTO } from '../dto/portifolioexcelDTO';
import {Datasharingservice} from '../common/datasharingservice';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {



  fetchcount:number = 2;
  loadingcount:number = this.fetchcount;
  urlsconstnats : Urlsconstnats;
  thumbnileResponse: ThumbnileResponse;
  filelistResponse:filelistResponse;
  thumnliereponseDTO:ThumnliereponseDTO;
  imageToShow: any;
  picdetailsexcelDTOlist=[];
  thumblineimageRequest: thumblineimageRequest;
  Entry:Entry;
  entiresList=[];
  thumnliereponseList = [];
  isValid:boolean = false;
  order:any;
  picdetailsexcelDTO :picdetailsexcelDTO;
  loadingbar:boolean = true;
  fecthingbar:boolean = false;
  
  
  
  constructor(private datasharingservice:Datasharingservice,private GallerryService : GallerryService,private domSanitizer: DomSanitizer, private http: CommonHttpService) { 
     
    }
  
    ngOnInit() {

      this.navigateToportifolio();
      this.loadingbar = true;
      this.reload();
      this.urlsconstnats = new Urlsconstnats();
      this.thumbnileResponse = new ThumbnileResponse();
      this.picdetailsexcelDTO = new picdetailsexcelDTO();
      this.thumblineimageRequest = new thumblineimageRequest();
      this.thumnliereponseDTO = new ThumnliereponseDTO();
      
     //this.getfilelist ();
 
    this.loadScripts() ;
      this.export();

    
     
    }
    reload()
  {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
     
    } else {
      localStorage.removeItem('foo') 
      
    }
  }

    loadScripts() { 
    
      // This array contains all the files/CDNs 
      const dynamicScripts = [ 

        'assets/js/bootstrap.min.js',
        'assets/js/jquery.slicknav.min.js',
        'assets/js/owl.carousel.min.js',
        'assets/js/slick.min.js',
        'assets/js/wow.min.js',
        'assets/js/animated.headline.js',
        'assets/js/jquery.magnific-popup.js',
        'assets/js/gijgo.min.js',
        'assets/js/jquery.nice-select.min.js',

        'assets/js/jquery.sticky.js',
        'assets/js/jquery.counterup.min.js',
        'assets/js/waypoints.min.js',
        'assets/js/jquery.countdown.min.js',
        'assets/js/hover-direction-snake.min.js',
       
        'assets/js/jquery.form.js',
        'assets/js/jquery.validate.min.js',
        'assets/js/mail-script.js',
        'assets/js/jquery.ajaxchimp.min.js',
        'assets/js/plugins.js',
        'assets/js/main.js',
          'assets/js/bc/aos.js',
          'assets/js/bc/main.js'
         //Load all your script files here'
      ]; 
      for (let i = 0; i < dynamicScripts.length; i++) { 
        const node = document.createElement('script'); 
        node.src = dynamicScripts[i]; 
        node.type = 'text/javascript'; 
        node.async = false; 
        document.getElementsByTagName('head')[0].appendChild(node); 
      } } 
  
  
  
  
  
  
    getfilelist ()
    {
     
  
      let headers = new Headers();
      let  url = this.urlsconstnats.getFilesListurl;
      let requestOptions = new RequestOptions({ headers: headers });
      headers.append('Content-Type', 'application/json');
   
      headers.append('Authorization','Bearer BlGP1wjm_oQAAAAAAAAAAVjpe035rohPVKwuNMaRtq2I05A10aDDEMhYWkaRKznJ');
      this.GallerryService.uploadPhotoToDropBox( url.toString(),"{\"path\":\"\/PHOTOS\",\"recursive\":false,\"include_media_info\":false,\"include_deleted\":false,\"include_has_explicit_shared_members\":false,\"include_mounted_folders\":true,\"include_non_downloadable_files\":true}", requestOptions).subscribe(
        (data)  => {
        //sucess
        this.filelistResponse = JSON.parse(data["_body"]);
       
  
        this.getallfilesdata( this.filelistResponse);
      
        },
        error => {
  
        });
  
    }
  
  
    
  
    getallfilesdata(data:filelistResponse)
    {
      for(let i =0 ; i<data.entries.length;i++)
      {
        this.Entry  = new Entry();
        this.Entry.path = data.entries[i].path_display;
        this.Entry.format = "jpeg";
        this.Entry.mode = "fitone_bestfit";
        this.Entry.size = "w640h480";
          this.entiresList.push(this.Entry);
  
          }
          this.thumblineimageRequest.entries = this.entiresList;
         this.getimagedata(this.thumblineimageRequest)
    }
  
  
    getimagedata (data:any)
    {
     
    let headers = new Headers();
      let  url = this.urlsconstnats.getimagethumblaine;
      let requestOptions = new RequestOptions({ headers: headers });
      headers.append('Content-Type', 'application/json');
  
      headers.append('Authorization','Bearer rk6Nuh6Jf_MAAAAAAAAAAb4lx5Uo-f_GC630Mq86KBQCvV5IjJ280yxqyRf2cRnH');
      this.GallerryService.uploadPhotoToDropBox( url.toString(),data, requestOptions).subscribe(
        (data)  => {
        //sucess
        this.thumbnileResponse = JSON.parse(data["_body"]);
  
        this.getimagesthumblnileSuceess(this.thumbnileResponse);
  console.log( "response " + this.thumbnileResponse.entries[0].thumbnail );
  this.imageToShow =  'data:image/jpg;base64,' +this.thumbnileResponse.entries[0].thumbnail ;
  
  this.loadScripts();
        },
        
        error => {
  
        });
  
    }
  
    getimagesthumblnileSuceess(data: ThumbnileResponse )
    {
     
        for(let i =0 ; i<data.entries.length;i++)
        {
  
  
          this.thumnliereponseDTO =new  ThumnliereponseDTO();
  
          this.thumnliereponseDTO.imageurl =  'data:image/jpg;base64,' +data.entries[i].thumbnail ;
          this.thumnliereponseDTO.apparture = this.picdetailsexcelDTOlist[i].apparture;
          this.thumnliereponseDTO.exposure = this.picdetailsexcelDTOlist[i].exposure;
          this.thumnliereponseDTO.iso = this.picdetailsexcelDTOlist[i].iso;
          this.thumnliereponseDTO.lense = this.picdetailsexcelDTOlist[i].lense;
          this.thumnliereponseDTO.camera =  this.picdetailsexcelDTOlist[i].camera;
          this.thumnliereponseDTO.name =  this.picdetailsexcelDTOlist[i].name
          this.thumnliereponseList.push(this.thumnliereponseDTO );
  
          }
          this.isValid = true;
          this.loadingbar = false;
        
          this.loadmoreprojects();
        }
  
     
  
      convertExcelToJson(file)
      {
       let reader = new FileReader();
       let workbookkk;
       let XL_row_object;
       let json_object;
       reader.readAsBinaryString(file);
   
      
      
    var resolve = new Promise((resolve, reject) => {
         reader.onload = function(){
           //  alert(reader.result);
           let data = reader.result;
            workbookkk=XLSX.read(data,{type: 'binary'});
            console.log(workbookkk);
            workbookkk.SheetNames.forEach(function(sheetName) {
             // Here is your object
              XL_row_object = XLSX.utils.sheet_to_json(workbookkk.Sheets[sheetName]);
              json_object = JSON.stringify(XL_row_object);
            //  console.log("text");
            // console.log(json_object);
     
             console.log(XL_row_object);
               resolve(XL_row_object);
           });
           };
       });
  
       resolve.then(values  => { 
  
  
        var listOfObjects = [];
        for(let i =((<any>values).length )-1 ; i >=0 ; i--)
        {
          var  portifolioexcelDTO2 = new  portifolioexcelDTO();

          portifolioexcelDTO2.projectname = values[i].projectname;
          portifolioexcelDTO2.projectplace = values[i].place;
          portifolioexcelDTO2.projectfile = values[i].projectfile;
          portifolioexcelDTO2.displaypicture = values[i].displaypic;
         this.picdetailsexcelDTOlist.push(portifolioexcelDTO2);
        } 
        this.getallfilesdetailsdata(this.picdetailsexcelDTOlist);
    });
  
      
  
  
  
       }
  
      
       getallfilesdetailsdata(data:any)
       {
        for(let i =0 ; i<this.fetchcount;i++)
        {
          this.Entry  = new Entry();
          var  portifolioexcelDTO3 =  data[i];
          this.Entry.path = "/Projects/" + portifolioexcelDTO3.projectfile + "/" + portifolioexcelDTO3.displaypicture;
          this.Entry.format = "jpeg";
          this.Entry.mode = "fitone_bestfit";
          this.Entry.size = "w640h480";
            this.entiresList.push(this.Entry);
    
            }
            this.thumblineimageRequest.entries = this.entiresList;
            this.getimagedata(this.thumblineimageRequest)
       }
  
  
  
    export() {
      this.loadingbar = true;
      this.http.exportser(this.urlsconstnats.getdetails.toString())
      .subscribe(blob => {
  
  
        this.convertExcelToJson(blob)
      
  
  
  
    }
    ),//console.log(data),
                      error => console.log("Error downloading the file."),
                      () => console.log('Completed file download.');
      }
      



      loadmoreprojects()
      {
        this.fecthingbar = true;
      
        var cnt = this.loadingcount + this.fetchcount 
            if( cnt >= this.picdetailsexcelDTOlist.length)
            {
              var entiresList2 = [];
              var thumblineimageRequest2: thumblineimageRequest;

              for(let i = this.loadingcount ; i< this.picdetailsexcelDTOlist.length;i++)
              {
                this.Entry  = new Entry();
                var  portifolioexcelDTO3 =  this.picdetailsexcelDTOlist[i];
                this.Entry.path = "/Projects/" + portifolioexcelDTO3.projectfile + "/" + portifolioexcelDTO3.displaypicture;
                this.Entry.format = "jpeg";
                this.Entry.mode = "fitone_bestfit";
                this.Entry.size = "w640h480";
                  entiresList2.push(this.Entry);
          
                  }
                  thumblineimageRequest2 = new thumblineimageRequest();
                  thumblineimageRequest2.entries = entiresList2;
                  if(entiresList2.length!=0)
                  {
                  this.getimagedata(thumblineimageRequest2);
                  this.loadingcount = this.picdetailsexcelDTOlist.length+1
                  }
                  else
                  {
                    this.fecthingbar = false;
                  }

            }
            else
            {
           

              var entiresList2 = [];
              var thumblineimageRequest2: thumblineimageRequest;

              for(let i = this.loadingcount ; i< this.loadingcount+this.fetchcount;i++)
              {
                this.Entry  = new Entry();
                var  portifolioexcelDTO3 =  this.picdetailsexcelDTOlist[i];
                this.Entry.path = "/Projects/" + portifolioexcelDTO3.projectfile + "/" + portifolioexcelDTO3.displaypicture;
                this.Entry.format = "jpeg";
                this.Entry.mode = "fitone_bestfit";
                this.Entry.size = "w640h480";
                  entiresList2.push(this.Entry);
          
                  }
                  this.loadingcount =  this.loadingcount +this.fetchcount;

                  thumblineimageRequest2 = new thumblineimageRequest();
                  thumblineimageRequest2.entries = entiresList2;
                  if(entiresList2.length!=0)
                  {
                  this.getimagedata(thumblineimageRequest2);
                 
                  }
        

            }

      }

      navigateToportifolio()
      {
        //this.loadScripts();

        if(this.datasharingservice.vale){
          this.order=this.datasharingservice.vale
          sessionStorage.setItem('order_page_info', this.order);
        }else{
          this.order = sessionStorage.getItem('order_page_info');
        }
       console.log("----------------- value - " + this.order ) ;
      }
}
