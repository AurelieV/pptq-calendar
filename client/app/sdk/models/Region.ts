/* tslint:disable */
import {
  MyUser
} from '../index';

declare var Object: any;
export interface RegionInterface {
  name: string;
  googleId?: string;
  id?: number;
  captainId?: number;
  captain?: MyUser;
}

export class Region implements RegionInterface {
  name: string;
  googleId: string;
  id: number;
  captainId: number;
  captain: MyUser;
  constructor(data?: RegionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Region`.
   */
  public static getModelName() {
    return "Region";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Region for dynamic purposes.
  **/
  public static factory(data: RegionInterface): Region{
    return new Region(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Region',
      plural: 'Regions',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        googleId: {
          name: 'googleId',
          type: 'string'
        },
        id: {
          name: 'id',
          type: 'number'
        },
        captainId: {
          name: 'captainId',
          type: 'number'
        },
      },
      relations: {
        captain: {
          name: 'captain',
          type: 'MyUser',
          model: 'MyUser'
        },
      }
    }
  }
}
