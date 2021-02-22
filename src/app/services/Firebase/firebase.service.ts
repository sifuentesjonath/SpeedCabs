import { Injectable,OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { Observable,Subject,BehaviorSubject } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';//Manejo de cache
//SERVICES
import { AuthenticationService}from '../Authentication/authentication.service';
import { exit } from 'process';
export interface Clients{
  id?: string,
  idRole:string,
  name: string,
  lastname: string,
  email:string,
  password:string,
  phone:string
  img_client:string,
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
  private client:any={};
  constructor(private storage:Storage,private firestore: AngularFirestore,private auts:AuthenticationService){
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
  get_clients() {   
    return this.clients; 
  }
  get_client(id:string){
    return this.clientsCollection.doc<Clients>(id).valueChanges();
  }
  get_state(){
    return this.boolState;
  }
  async login(date){
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
  /*filterBy(categoriaToFilter: string) {
    this.avisos = this.firestore.collection('/', ref => ref.where('categoria','==', categoriaToFilter )).valueChanges()
    return this.avisos;
  }*/

}
