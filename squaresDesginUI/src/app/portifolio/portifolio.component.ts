import { Component, OnInit } from '@angular/core';
import {Urlsconstnats} from '../common/app.urls';
import * as XLSX from 'xlsx';
import { CommonHttpService } from './../common/app.httpservice';
import { HttpModule, Response, RequestOptionsArgs, Headers, Http, RequestOptions } from '@angular/http';
import {picdetailsexcelDTO} from '../dto/picdetailsexcelDTo';
import { portifolioexcelDTO } from '../dto/portifolioexcelDTO';
import { Entry } from '../dto/entry';
import { thumblineimageRequest } from '../dto/thumblineimageRequest';
import { ThumnliereponseDTO } from '../dto/ThumnliereponseDTO';
import {ThumbnileResponse} from '../dto/thumbnileResponse';
import {ProjectsService} from '../projects/projects.service';
import { Router } from '@angular/router';

import {Datasharingservice} from '../common/datasharingservice';
import { portifolioThumblineResponseDTO } from '../dto/portifolioThumblineResponseDTO';

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.component.html',
  styleUrls: ['./portifolio.component.css']
})
export class PortifolioComponent implements OnInit {

   _album = [];
  constructor(private router: Router,private http: CommonHttpService , private ProjectsService: ProjectsService, private datasharingservice:Datasharingservice) { 



  }
  urlsconstnats : Urlsconstnats; 
  picdetailsexcelDTOlist=[];
  portifolioListDTOList = [];
  portifolioexcelDTO : portifolioexcelDTO;
  Entry:Entry;
  
  entiresList=[];
  thumblineimageRequest: thumblineimageRequest;
  thumnliereponseDTO:ThumnliereponseDTO;
  portifolioThumblineResponseDTO:portifolioThumblineResponseDTO;
  portifolioThumblineResponseDTOList = [];
  thumnliereponseList = [];
  thumbnileResponse: ThumbnileResponse;
  imageToShow: any;
  loadingbar:boolean = true;
  fetchcount:number = 2;
  loadingcount:number = this.fetchcount;
  fecthingbar:boolean = false;
 


  ngOnInit() {
    


    this.urlsconstnats = new Urlsconstnats();
    this.thumbnileResponse = new ThumbnileResponse();
    this.portifolioexcelDTO = new portifolioexcelDTO();
    this.thumblineimageRequest = new thumblineimageRequest();
    this.loadScripts();
    //this.getportifolioFilesData();

   

  
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

  dfs()
  {
    this.loadScripts();
  }

  loadScripts() { 
    this.loadingbar = true;
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
       //Load all your script files here'
    ]; 
    for (let i = 0; i < dynamicScripts.length; i++) { 
      const node = document.createElement('script'); 
      node.src = dynamicScripts[i]; 
      node.type = 'text/javascript'; 
      node.async = false; 
      document.getElementsByTagName('head')[0].appendChild(node); 
    } 
    this.loadingbar = false;
  } 

      //get top 10 projects from the file 



  getportifolioFilesData() {
    this.loadingbar = true;
    this.http.exportser(this.urlsconstnats.getdetails.toString())
    .subscribe(blob => {

     
      this.convertExcelToJson(blob)
    



  }
  ),//console.log(data),
                    error => console.log("Error downloading the file."),
                   
                    () => console.log('Completed file download.');
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
         console.log("hello");
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
      for(let i =0 ; i < (<any>values).length; i++)
      {
        var  portifolioexcelDTO2 = new  portifolioexcelDTO();

        portifolioexcelDTO2.projectname = values[i].projectname;
        portifolioexcelDTO2.projectplace = values[i].place;
        portifolioexcelDTO2.projectfile = values[i].projectfile;
        portifolioexcelDTO2.displaypicture = values[i].displaypic;
       this.picdetailsexcelDTOlist.push(portifolioexcelDTO2);
      } 
      this.gettop10projects(this.picdetailsexcelDTOlist);
  });


     }


     gettop10projects(data : any)
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
          this.getimagedata(this.thumblineimageRequest);


     }



  getimagedata (data:any)
  {
   
  let headers = new Headers();
    let  url = this.urlsconstnats.getimagethumblaine;
		let requestOptions = new RequestOptions({ headers: headers });
		headers.append('Content-Type', 'application/json');

    headers.append('Authorization','Bearer rk6Nuh6Jf_MAAAAAAAAAAb4lx5Uo-f_GC630Mq86KBQCvV5IjJ280yxqyRf2cRnH');
    this.ProjectsService.uploadPhotoToDropBox( url.toString(),data, requestOptions).subscribe(
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

  getimagesthumblnileSuceess(data: any )
  {
  
      for(let i =0 ; i<data.entries.length;i++)
      {


        this.portifolioThumblineResponseDTO =new  portifolioThumblineResponseDTO();

        this.portifolioThumblineResponseDTO.imageurl =  'data:image/jpg;base64,' +data.entries[i].thumbnail ;
        this.portifolioThumblineResponseDTO.name = this.picdetailsexcelDTOlist[i].projectname;
        this.portifolioThumblineResponseDTO.place = this.picdetailsexcelDTOlist[i].projectplace;

        this.portifolioThumblineResponseDTOList.push( this.portifolioThumblineResponseDTO);
        }
       
        this.fecthingbar = false;


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

          navigateToportifolio(data:any)
          {
            //this.loadScripts();
            this.datasharingservice.vale = data;
          }
 
   navigateToNewProjects()
   {

    this.router.navigateByUrl('/896776645673');
   }

}
