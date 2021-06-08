import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference, } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';

import { Observable,Subject,BehaviorSubject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';//Manejo de cache
//SERVICES
import { AuthenticationService}from '../Authentication/authentication.service';
import { Client } from 'src/app/userData/user-interface';
import { Travels } from 'src/app/userData/user-interface';

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
  private travels_c:string="/TRAVELS";
  private travels: Observable<Travels[]>;
  private travelsCollection: AngularFirestoreCollection<Travels>;
  private data:any;
  private boolState:boolean=false;
  private check:boolean=false;
  private compare:boolean=false;
  private client:any={};
  private image:string='';
  constructor(private storage:Storage,private firestorage:AngularFireStorage,private firestore: AngularFirestore,private auts:AuthenticationService){
    this.clientsCollection = this.firestore.collection<Clients>(this.clients_c);
    this.travelsCollection=this.firestore.collection<Travels>(this.travels_c);
    this.travels = this.travelsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return { id, ...data };
        });
      })
    );
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
  public async login(){
    return await this.clients;
  }
  public async loginUser(body){
    return await this.auts.loginUser(body);  
  }
  public async check_in(date,pass){
    var res_=await this.clientsCollection.add(date);
    return await this.auts.registerUser(date.email,pass); 
  }
  public async comparemail_phone(date){
    this.compare=false;
    return new Promise<any>(async(resolve,reject) => {
      await this.clients.subscribe(result=>{
        result.map(res=>{
          if(res.email!=date.email&&res.phone!=date.phone){   
            this.compare=true;
          }
          else{
            this.compare=false;
          }
        })
        resolve(this.compare);
      },err=>{
        reject(this.compare);
      });
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
  public uploadImage(imageURI,id){
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firestorage.storage.ref();
      let imageRef = storageRef.child('Profiles').child(id);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url').then(snapshot => {
          imageRef.getDownloadURL().then((url)=>{
            resolve(url);
          },(err)=>{reject(err)});
        },(err)=>{
          reject(err);
        })
      })
    })
  }
  public async set_img(id,url){
    return await this.CloudImage(id,url);
  }
  private async CloudImage(id:string,imageURL){
    this.check=false;
    var data={img_client:imageURL};
    await this.clientsCollection.doc<Clients>(id).update(data).then(()=>{
      this.check=true;
    }).catch(err=>this.check=false);   
  
  }
  private encodeImageUri(imageUri, callback) {
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
  /*public get_imagePath(){
    //return this.image;
    function sequenceSubscriber(observer) {
      observer.next(this.image);
      observer.next(this.image);
      observer.next(this.image);
      observer.complete();
      return {unsubscribe() {}}; 
    } 
  }*/      
  ///
  //close Client
  public async close(){
    await this.auts.logoutUser();
  }
  //TRAVELS
  public async add_travel(date:Travels){
    return await this.travelsCollection.add(date);
  }
  public get_travel(id:string){
    return this.travelsCollection.doc<Travels>(id).valueChanges();
  }
  public get_travels(){
    return this.travels;
  }
  public async update_travel(id:string) {
    return new Observable<Boolean>((observer) => {
      this.travelsCollection.doc<Travels>(id).update({state:'Cancelado'}).then(()=>{
        observer.next(true);
        observer.complete();
      },err=>{
      });
    });
  }  
  /*filterBy(categoriaToFilter: string){
    this.avisos = this.firestore.collection('/', ref => ref.where('categoria','==', categoriaToFilter )).valueChanges()
    return this.avisos;
  }*/

}
