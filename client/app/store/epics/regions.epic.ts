import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { RegionsActions } from '../../actions/regions';
import { Region }  from '../../sdk/models';
import { RegionApi } from '../../sdk/services/custom/Region';


const BASE_URL = "api/Regions";

@Injectable()
export class RegionsEpics {
  constructor(private http: Http, private region: RegionApi) {}

  getEpics(): Epic<any>[] {
    return [this.fetchRegions, this.addRegion, this.updateRegion];
  }

  fetchRegions = (action$: ActionsObservable<any>) => {
    return action$.ofType(
      RegionsActions.FETCH_REGIONS
    )
      .flatMap(() => {
        return this.region.find()
          .map(regions => ({
            type: RegionsActions.FETCH_REGIONS_SUCCESS,
            payload: regions
          }))
          .catch(error => Observable.of({
            type: RegionsActions.FETCH_REGIONS_ERROR
          })
        );
      });
  };

  addRegion = (action$: ActionsObservable<any>) => {
    return action$.ofType(
      RegionsActions.ADD_REGION
    )
      .flatMap(({ payload }) => {
        return this.region.create(payload)
          .map((region) => ({
            type: RegionsActions.ADD_REGION_SUCCESS,
            payload: region
          }))
          .catch(error => Observable.of({
            type: RegionsActions.ADD_REGION_ERROR
          })
        );
      });
  }

  updateRegion = (action$: ActionsObservable<any>) => {
    return action$.ofType(
      RegionsActions.UPDATE_REGION
    )
      .flatMap(({ payload }) => {
        const id = payload.id;
        let data = Object.assign({}, payload);
        delete data.id;
        return this.region.updateAttributes(id, data)
          .map((region) => ({
            type: RegionsActions.UPDATE_REGION_SUCCESS,
            payload: region
          }))
          .catch(error => Observable.of({
            type: RegionsActions.UPDATE_REGION_ERROR
          })
        );
      });
  }
}
