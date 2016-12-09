/* tslint:disable */
import { Injectable } from '@angular/core';
import { MyUser } from '../../models/MyUser';
import { Tournament } from '../../models/Tournament';
import { Region } from '../../models/Region';
import { Season } from '../../models/Season';

@Injectable()
export class SDKModels {

  private models: { [name: string]: any } = {
    MyUser: MyUser,
    Tournament: Tournament,
    Region: Region,
    Season: Season,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }
}
