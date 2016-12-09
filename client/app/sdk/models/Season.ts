/* tslint:disable */
import {
  Tournament
} from '../index';

declare var Object: any;
export interface SeasonInterface {
  name: string;
  format: string;
  startDate: Date;
  endDate: Date;
  id?: number;
  tournaments?: Array<Tournament>;
}

export class Season implements SeasonInterface {
  name: string;
  format: string;
  startDate: Date;
  endDate: Date;
  id: number;
  tournaments: Array<Tournament>;
  constructor(data?: SeasonInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Season`.
   */
  public static getModelName() {
    return "Season";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Season for dynamic purposes.
  **/
  public static factory(data: SeasonInterface): Season{
    return new Season(data);
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
      name: 'Season',
      plural: 'Seasons',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        format: {
          name: 'format',
          type: 'string'
        },
        startDate: {
          name: 'startDate',
          type: 'Date'
        },
        endDate: {
          name: 'endDate',
          type: 'Date'
        },
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        tournaments: {
          name: 'tournaments',
          type: 'Array<Tournament>',
          model: 'Tournament'
        },
      }
    }
  }
}
