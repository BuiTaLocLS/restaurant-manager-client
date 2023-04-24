import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { Role } from '../models/role.model';
import { environment } from '../environments/environment';
import { Status } from '../models/status.model';
import { Size } from '../models/size.model';
import { Unit } from '../models/unit.model';
import { Locationn } from '../models/location.model';
import { GuestTable } from '../models/guesttable.model';
import { Category } from '../models/category.model';
import { Food } from '../models/food.model';
import { Image } from '../models/image.model';
import { RestaurantComponent } from '../components/restaurant/restaurant.component';
import { Item } from '../models/item.model';
import { OrderItem } from '../models/orderItem.model';
import { Order } from '../models/order.model';
import { ListOrderTable } from '../models/listOrderTable.model';
import { UserModel } from '../models/usermodel.model';
import { CreateUser } from '../models/createUser.model';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private REST_API_SERVER = 'http://localhost:3000';
  private REST_API_SERVER = environment.api;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  loginUserId = 1;

  getLoginUserId(){
    const str_user_id:string = localStorage.getItem("user_id")||"";

    if(str_user_id!==""){
      return Number(str_user_id);
    }

    return 1;
  }


  newRestaurant: Restaurant = {
    name: '',
    id: 0,
    description: '',
    phone: '',
    address: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };

  newStatus: Status = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };

  newUnit: Unit = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    }
  };

  newLocation: Locationn = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };

  newSize: Size = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    unit: Object.assign({}, this.newUnit),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };

  newGuestTable: GuestTable = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    status: Object.assign({}, this.newStatus),
    location: Object.assign({}, this.newLocation),
  };

  newCategory: Category = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };

  newImage: Image = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    base64: '',
  };

  newFood: Food = {
    name: '',
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    category: Object.assign({}, this.newCategory),
    itemImage: Object.assign({}, this.newImage)
  };

  newItem: Item = {
    id: 0,
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    food: Object.assign({}, this.newFood),
    size: Object.assign({}, this.newSize),
    price: 0,
    discount: 0,
    quantity: 0,
    restaurant: Object.assign({}, this.newRestaurant),
    createdUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
    updatedUser: {
      id: 1,
      userName: '',
      description: '',
      created: new Date(),
      updated: new Date(),
      deleted: false,
      offDuty: false,
      createdUser: [],
      updatedUser: [],
    },
  };


  newOrder :Order = {
    orderNumber: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    voided: false,
    totalPrice: 0,
    paidAmount: 0,
    restaurant: Object.assign({}, this.newRestaurant),
  }


  newOderItem: OrderItem = {
    id: 0,
    name: '',
    description: '',
    created: new Date(),
    updated: new Date(),
    deleted: false,
    voided: false,
    salePrice: 0,
    item: Object.assign({}, this.newItem),
    restaurant: Object.assign({}, this.newRestaurant),
    order: Object.assign({}, this.newOrder),
    quantity: 0
  }

  newRole: Role = {
    id: 0,
    name: '',
    description: '',
    created: new Date,
    updated: new Date,
    deleted: false,
    restaurant: Object.assign({}, this.newRestaurant)
  }

  newUserModel: UserModel = {
    id: 0,
    userName: '',
    displayName: '',
    email: '',
    description: '',
    created: '',
    updated: '',
    deleted: false,
    offDuty: false,
    roleId: 0,
    createdUserId: 0,
    updatedUserId: 0,
    createdUser: [],
    updatedUser: [],
    role: Object.assign({}, this.newRole) ,
  }

  public listOrderEachTable: ListOrderTable[] = []



  public selectedRestaurant$ = new BehaviorSubject<Restaurant>(
    this.newRestaurant
  );
  //Restaurant
  public getAllRestaurants(): Observable<Restaurant[]> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.get<Restaurant[]>(url, this.httpOptions);
  }

  public postRestaurant(payload: Restaurant): Observable<any> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.post<Restaurant>(url, payload, this.httpOptions);
  }

  public putRestaurant(payload: Restaurant): Observable<any> {
    const url = `${this.REST_API_SERVER}/restaurant`;
    return this.httpClient.put<Restaurant>(url, payload, this.httpOptions);
  }

  //Role
  public getAllRoles(): Observable<Role[]> {
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.get<Role[]>(url, this.httpOptions);
  }

  public postRole(payload: Role): Observable<any> {
    const url = `${this.REST_API_SERVER}/role`;
    return this.httpClient.post<Role>(url, payload, this.httpOptions);
  }

  //Status
  public getAllStatuss(): Observable<Status[]> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.get<Status[]>(url, this.httpOptions);
  }

  public postStatus(payload: Status): Observable<any> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.post<Status>(url, payload, this.httpOptions);
  }

  public putStatus(payload: Status): Observable<any> {
    const url = `${this.REST_API_SERVER}/status`;
    return this.httpClient.put<Status>(url, payload, this.httpOptions);
  }

  //Size
  public getAllSizes(): Observable<Size[]> {
    const url = `${this.REST_API_SERVER}/size`;
    return this.httpClient.get<Size[]>(url, this.httpOptions);
  }

  public postSize(payload: Size): Observable<any> {
    const url = `${this.REST_API_SERVER}/size`;
    return this.httpClient.post<Size>(url, payload, this.httpOptions);
  }

  public putSize(payload: Size): Observable<any> {
    const url = `${this.REST_API_SERVER}/size`;
    return this.httpClient.put<Size>(url, payload, this.httpOptions);
  }

  //Unit

  public getAllUnits(): Observable<Unit[]> {
    const url = `${this.REST_API_SERVER}/unit`;
    return this.httpClient.get<Unit[]>(url, this.httpOptions);
  }

  public postUnit(payload: Unit): Observable<any> {
    const url = `${this.REST_API_SERVER}/unit`;
    return this.httpClient.post<Unit>(url, payload, this.httpOptions);
  }

  public putUnit(payload: Unit): Observable<any> {
    const url = `${this.REST_API_SERVER}/unit`;
    return this.httpClient.put<Unit>(url, payload, this.httpOptions);
  }

  //Location
  public getAllLocations(): Observable<Locationn[]> {
    const url = `${this.REST_API_SERVER}/location`;
    return this.httpClient.get<Locationn[]>(url, this.httpOptions);
  }

  public postLocation(payload: Locationn): Observable<any> {
    const url = `${this.REST_API_SERVER}/location`;
    return this.httpClient.post<Locationn>(url, payload, this.httpOptions);
  }

  public putLocation(payload: Locationn): Observable<any> {
    const url = `${this.REST_API_SERVER}/location`;
    return this.httpClient.put<Locationn>(url, payload, this.httpOptions);
  }


  //GuestTable
  public getAllGuestTables(): Observable<GuestTable[]> {
    const url = `${this.REST_API_SERVER}/guesttable`;
    return this.httpClient.get<GuestTable[]>(url, this.httpOptions);
  }

  public postGuestTable(payload: GuestTable): Observable<any> {
    const url = `${this.REST_API_SERVER}/guesttable`;
    return this.httpClient.post<GuestTable>(url, payload, this.httpOptions);
  }

  public putGuestTable(payload: GuestTable): Observable<any> {
    const url = `${this.REST_API_SERVER}/guesttable`;
    return this.httpClient.put<GuestTable>(url, payload, this.httpOptions);
  }

   //Category
   public getAllCategorys(): Observable<Category[]> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.get<Category[]>(url, this.httpOptions);
  }

  public postCategory(payload: Category): Observable<any> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.post<Category>(url, payload, this.httpOptions);
  }

  public putCategory(payload: Category): Observable<any> {
    const url = `${this.REST_API_SERVER}/category`;
    return this.httpClient.put<Category>(url, payload, this.httpOptions);
  }


   //Food
   public getAllFoods(): Observable<Food[]> {
    const url = `${this.REST_API_SERVER}/food`;
    return this.httpClient.get<Food[]>(url, this.httpOptions);
  }

  public postFood(payload: Food): Observable<any> {
    const url = `${this.REST_API_SERVER}/food`;
    return this.httpClient.post<Food>(url, payload, this.httpOptions);
  }

  public putFood(payload: Food): Observable<any> {
    const url = `${this.REST_API_SERVER}/food`;
    return this.httpClient.put<Food>(url, payload, this.httpOptions);
  }


   //Image
   public getAllImages(restaurantId = 0): Observable<Image[]> {
    let url = `${this.REST_API_SERVER}/ItemImage`;
    if(restaurantId>0){
      url += '?restaurantId=' + restaurantId;
    }
    return this.httpClient.get<Image[]>(url, this.httpOptions);
  }

  public getImages(restaurantId = 0, itemId: number): Observable<Image> {
    let url = `${this.REST_API_SERVER}/ItemImage/`;
    if(restaurantId>0){
      url +=  itemId  + '?' + 'restaurantID='+restaurantId ;
    }
    return this.httpClient.get<Image>(url, this.httpOptions);
  }

  public postImage(payload: Image): Observable<any> {
    const url = `${this.REST_API_SERVER}/ItemImage`;
    return this.httpClient.post<Image>(url, payload, {
      reportProgress: true,
      observe: 'events',
      headers: new HttpHeaders({
        'Content-Type':'application/json',
      })
    });
  }

  public putImage(payload: Image): Observable<any> {
    const url = `${this.REST_API_SERVER}/ItemImage`;
    return this.httpClient.put<Food>(url, payload, this.httpOptions);
  }


   //item
   public getAllItems(): Observable<Item[]> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.get<Item[]>(url, this.httpOptions);
  }

  public postItem(payload: Item): Observable<any> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.post<Item>(url, payload, this.httpOptions);
  }

  public putItem(payload: Item): Observable<any> {
    const url = `${this.REST_API_SERVER}/item`;
    return this.httpClient.put<Item>(url, payload, this.httpOptions);
  }

    //Order
    public getAllOrders(restaurantID: number): Observable<Order[]> {
      const url = `${this.REST_API_SERVER}/Order?restaurantID={{restaurantID}}`;
      return this.httpClient.get<Order[]>(url, this.httpOptions);
    }

    public postOrder(payload: Order): Observable<any> {
      const url = `${this.REST_API_SERVER}/Order`;
      return this.httpClient.post<Order>(url, payload, this.httpOptions);
    }

    public putOrder(restaurantID: number,payload: Order): Observable<any> {
      const url = `${this.REST_API_SERVER}/Order?restaurantID={{restaurantID}}`;
      return this.httpClient.put<Order>(url, payload, this.httpOptions);
    }

     //OrderItem
     public getAllOrderItems(): Observable<OrderItem[]> {
      const url = `${this.REST_API_SERVER}/orderItem`;
      return this.httpClient.get<OrderItem[]>(url, this.httpOptions);
    }

    public postOrderItem(payload: OrderItem): Observable<any> {
      const url = `${this.REST_API_SERVER}/orderItem`;
      return this.httpClient.post<OrderItem>(url, payload, this.httpOptions);
    }

    public putOrderItem(payload: OrderItem): Observable<any> {
      const url = `${this.REST_API_SERVER}/orderItem`;
      return this.httpClient.put<OrderItem>(url, payload, this.httpOptions);
    }

    //User
    public getAllUsers(): Observable<UserModel[]> {
      const url = `${this.REST_API_SERVER}/User`;
      return this.httpClient.get<UserModel[]>(url, this.httpOptions);
    }

    public postUser(payload: CreateUser): Observable<any> {
      const url = `${this.REST_API_SERVER}/User/Create`;
      return this.httpClient.post<CreateUser>(url, payload, this.httpOptions);
    }

    public putUser(payload: UserModel): Observable<any> {
      const url = `${this.REST_API_SERVER}/User`;
      return this.httpClient.put<UserModel>(url, payload, this.httpOptions);
    }
}
