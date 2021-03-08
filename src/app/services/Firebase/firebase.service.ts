import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, } from 'angularfire2/firestore';
//import { AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';

import { Observable,Subject,BehaviorSubject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';//Manejo de cache
//SERVICES
import { AuthenticationService}from '../Authentication/authentication.service';
import { Client } from 'src/app/userData/user-interface';
export interface Clients{
  id?: string,
  idRole:string,
  name: string,
  lastname: string,
  email:string,
  phone:string,
  img_client:string
}
 
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private clients: Observable<Clients[]>;
  private clientsCollection: AngularFirestoreCollection<Clients>;
  private clients_c:string="/CLIENTS";
  private data:any;
  private boolState:boolean=false;
  private check:boolean=false;
  private compare:boolean=false;
  private client:any={};
  constructor(private storage:Storage/*,private firestorage:AngularFireStorage*/,private firestore: AngularFirestore,private auts:AuthenticationService){
    this.clientsCollection = this.firestore.collection<Clients>(this.clients_c);
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return { id, ...data };
        });
      })
    );
  }
  private get_clients() {   
    return this.clients; 
  }
  public get_client(id:string){
    return this.clientsCollection.doc<Clients>(id).valueChanges();
  }
  public get_state(){
    return this.boolState;
  }
  public get_check(){
    return  this.check;
  }
  private get_compare(){
    return this.compare;
  }
  public async login(date){
    this.boolState=false;
    await this.clients.subscribe(result=>{
      result.map(res=>{
        if(res.email==date.correo){
          this.client={id:res.id,namel:res.name+' '+res.lastname};
          this.auts.loginUser(date).then(()=>{
            this.boolState=true;
            this.storage.set('Id',this.client.id);
            this.storage.set('NombreC',this.client.namel);
          }).catch(err=>{
            this.boolState=false;
          });
        }
      })
    });
  }
  public async check_in(date,pass){
    this.check=false;  
    await this.comparemail_phone(date).then(()=>{
      setTimeout(()=>{
        if(this.get_compare()==true){
          var res_=this.clientsCollection.add(date);
          if(res_){
            this.auts.registerUser(date.email,pass).then(()=>{
              this.check=true;
              return;
            }).catch(err=>{
              this.check=false;
              return;
            });
          }
          else{
            this.check=false;
          }
        } 
      },300);  
    });
  }
  private async comparemail_phone(date){
    this.compare=false;
    await this.clients.subscribe(result=>{
      result.map(res=>{
        if(res.email!=date.email&&res.phone!=date.phone){   
          this.compare=true;
        }
        else{
          this.compare=false;
          return;
        }
      })
    },err=>{
      this.compare=false;
    });
  }
  private async compare_profile(data,date){
    this.compare=false;
    if(data.email==date.email){
      if(data.phone==date.phone){
        this.compare=true;
        return;
      }
      else{
        this.compare_phone(data);
      }
    }
    else{
      if(data.phone==date.phone){
        this.compare_mail(data);
      }
      else{
        this.comparemail_phone(data);
      }
    }
  }  
  //Compare phone
  private async compare_phone(data){
    await this.clients.subscribe(result=>{
      result.map(res=>{
        if(res.phone!=data.phone){ 
          this.compare=true;
        }
        else{
          this.compare=false;
          return;
        }
      })
    },err=>{
      this.compare=false;
    });
  }
  //Compare email
  private async compare_mail(data){
    await this.clients.subscribe(result=>{
      result.map(res=>{
        if(res.email!=data.email){ 
          this.compare=true;
        }
        else{
          this.compare=false;
          return;
        }
      })
    },err=>{
      this.compare=false;
    });
  }
  //Client update
  public async updateClient(id:string,data:object,date:object) {
    this.check=false;
    await this.compare_profile(data,date).then(()=>{  
      setTimeout(()=>{
        if(this.get_compare()==true){
          //this.auts.updateUser(data.email,data.password);
          this.clientsCollection.doc<Clients>(id).update(data).then(()=>{
            this.check=true;
          }).catch(err=>this.check=false);
        }
      },400);
    });
  }
  public async change_password(email:string){
    this.auts.updateUser(email);
  }
  ///Upload Image
  public uploadImage(imageURI){
    /*return new Promise<any>((resolve, reject) => {
      let storageRef = this.firestorage.storage.ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })*/
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };
    
  ///
  //close Client
  public async close(){
    await this.auts.logoutUser();
  }
  /*filterBy(categoriaToFilter: string){
    this.avisos = this.firestore.collection('/', ref => ref.where('categoria','==', categoriaToFilter )).valueChanges()
    return this.avisos;
  }*/

}
