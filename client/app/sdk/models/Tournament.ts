/* tslint:disable */
import {
  MyUser,
  Region,
  Season
} from '../index';

declare var Object: any;
export interface TournamentInterface {
  town: string;
  format?: string;
  date: Date;
  isDateConfirmed: boolean;
  organizer: string;
  information?: string;
  phoneContact?: string;
  emailContact?: string;
  adress?: string;
  googleId?: string;
  id?: number;
  headJudgeId?: number;
  regionId?: number;
  seasonId?: number;
  headJudge?: MyUser;
  region?: Region;
  season?: Season;
}

export class Tournament implements TournamentInterface {
  town: string;
  format: string;
  date: Date;
  isDateConfirmed: boolean;
  organizer: string;
  information: string;
  phoneContact: string;
  emailContact: string;
  adress: string;
  googleId: string;
  id: number;
  headJudgeId: number;
  regionId: number;
  seasonId: number;
  headJudge: MyUser;
  region: Region;
  season: Season;
  constructor(data?: TournamentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Tournament`.
   */
  public static getModelName() {
    return "Tournament";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Tournament for dynamic purposes.
  **/
  public static factory(data: TournamentInterface): Tournament{
    return new Tournament(data);
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
      name: 'Tournament',
      plural: 'Tournaments',
      properties: {
        town: {
          name: 'town',
          type: 'string'
        },
        format: {
          name: 'format',
          type: 'string'
        },
        date: {
          name: 'date',
          type: 'Date'
        },
        isDateConfirmed: {
          name: 'isDateConfirmed',
          type: 'boolean',
          default: false
        },
        organizer: {
          name: 'organizer',
          type: 'string'
        },
        information: {
          name: 'information',
          type: 'string'
        },
        phoneContact: {
          name: 'phoneContact',
          type: 'string'
        },
        emailContact: {
          name: 'emailContact',
          type: 'string'
        },
        adress: {
          name: 'adress',
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
        headJudgeId: {
          name: 'headJudgeId',
          type: 'number'
        },
        regionId: {
          name: 'regionId',
          type: 'number'
        },
        seasonId: {
          name: 'seasonId',
          type: 'number'
        },
      },
      relations: {
        headJudge: {
          name: 'headJudge',
          type: 'MyUser',
          model: 'MyUser'
        },
        region: {
          name: 'region',
          type: 'Region',
          model: 'Region'
        },
        season: {
          name: 'season',
          type: 'Season',
          model: 'Season'
        },
      }
    }
  }
}
