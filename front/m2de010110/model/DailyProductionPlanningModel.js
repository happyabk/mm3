import { extendObservable } from 'mobx';

export class DailyProductionPlanningModel {

  constructor(item = {}) {
    extendObservable(this, item);
  }

  static fromApiModels(items) {
    if (!Array.isArray(items)) {
      return [];
    }        
    return items.map(item => DailyProductionPlanningModel.fromApiModel(item));
  }

  static fromApiModel(item) {
    item.prdPlnChargeCnt11 = item.prdPlnChargeCnt11 === undefined ?  '' : item.prdPlnChargeCnt11;
    item.prdPlnBeChQt11 = item.prdPlnBeChQt11 === undefined ?  '' : item.prdPlnBeChQt11;  
    item.prdPlnChargeCnt12 = item.prdPlnChargeCnt12 === undefined ?  '' : item.prdPlnChargeCnt12;
    item.prdPlnBeChQt12 = item.prdPlnBeChQt12 === undefined ?  '' : item.prdPlnBeChQt12; 
    item.prdPlnChargeCnt13 = item.prdPlnChargeCnt13 === undefined ?  '' : item.prdPlnChargeCnt13; 
    item.prdPlnBeChQt13 = item.prdPlnBeChQt13 === undefined ?  '' : item.prdPlnBeChQt13;
    item.prdPlnChargeCnt21 = item.prdPlnChargeCnt21 === undefined ?  '' : item.prdPlnChargeCnt21;
    item.prdPlnBeChQt21 = item.prdPlnBeChQt21 === undefined ?  '' : item.prdPlnBeChQt21;
    item.prdPlnChargeCnt22 = item.prdPlnChargeCnt22 === undefined ?  '' : item.prdPlnChargeCnt22;
    item.prdPlnBeChQt22 = item.prdPlnBeChQt22 === undefined ?  '' : item.prdPlnBeChQt22;
    item.prdPlnChargeCnt23 = item.prdPlnChargeCnt23 === undefined ?  '' : item.prdPlnChargeCnt23;
    item.prdPlnBeChQt23 = item.prdPlnBeChQt23 === undefined ?  '' : item.prdPlnBeChQt23;
    item.prdPlnChargeCnt24 = item.prdPlnChargeCnt24 === undefined ?  '' : item.prdPlnChargeCnt24;
    item.prdPlnBeChQt24 = item.prdPlnBeChQt24 === undefined ?  '' : item.prdPlnBeChQt24;
    item.prdPlnChargeCnt71 = item.prdPlnChargeCnt71 === undefined ?  '' : item.prdPlnChargeCnt71;
    item.prdPlnBeChQt31 = item.prdPlnBeChQt31 === undefined ?  '' : item.prdPlnBeChQt31;
    item.prdPlnChargeCnt72 = item.prdPlnChargeCnt72 === undefined ?  '' : item.prdPlnChargeCnt72;
    item.prdPlnBeChQt32 = item.prdPlnBeChQt32 === undefined ?  '' : item.prdPlnBeChQt32;
    item.prdPlnChargeCnt51 = item.prdPlnChargeCnt51 === undefined ?  '' : item.prdPlnChargeCnt51;
    item.prdPlnCrudeSteQt11 = item.prdPlnCrudeSteQt11 === undefined ?  '' : item.prdPlnCrudeSteQt11;
    item.prdPlnChargeCnt52 = item.prdPlnChargeCnt52 === undefined ?  '' : item.prdPlnChargeCnt52;
    item.prdPlnCrudeSteQt12 = item.prdPlnCrudeSteQt12 === undefined ?  '' : item.prdPlnCrudeSteQt12;
    item.prdPlnChargeCnt55 = item.prdPlnChargeCnt55 === undefined ?  '' : item.prdPlnChargeCnt55;
    item.prdPlnCrudeSteQt15 = item.prdPlnCrudeSteQt15 === undefined ?  '' : item.prdPlnCrudeSteQt15;
    item.prdPlnChargeCnt53 = item.prdPlnChargeCnt53 === undefined ?  '' : item.prdPlnChargeCnt53;
    item.prdPlnCrudeSteQt13 = item.prdPlnCrudeSteQt13 === undefined ?  '' : item.prdPlnCrudeSteQt13;
    item.prdPlnChargeCnt54 = item.prdPlnChargeCnt54 === undefined ?  '' : item.prdPlnChargeCnt54;
    item.prdPlnCrudeSteQt14 = item.prdPlnCrudeSteQt14 === undefined ?  '' : item.prdPlnCrudeSteQt14;
    item.prdPlnChargeCnt61 = item.prdPlnChargeCnt61 === undefined ?  '' : item.prdPlnChargeCnt61;
    item.prdPlnCrudeSteQt21 = item.prdPlnCrudeSteQt21 === undefined ?  '' : item.prdPlnCrudeSteQt21;
    item.prdPlnChargeCnt62 = item.prdPlnChargeCnt62 === undefined ?  '' : item.prdPlnChargeCnt62;
    item.prdPlnCrudeSteQt22 = item.prdPlnCrudeSteQt22 === undefined ?  '' : item.prdPlnCrudeSteQt22;
    item.prdPlnChargeCnt63 = item.prdPlnChargeCnt63 === undefined ?  '' : item.prdPlnChargeCnt63;
    item.prdPlnCrudeSteQt23 = item.prdPlnCrudeSteQt23 === undefined ?  '' : item.prdPlnCrudeSteQt23;
    item.prdPlnChargeCnt64 = item.prdPlnChargeCnt64 === undefined ?  '' : item.prdPlnChargeCnt64;
    item.prdPlnCrudeSteQt24 = item.prdPlnCrudeSteQt24 === undefined ?  '' : item.prdPlnCrudeSteQt24;
    item.prdPlnChargeCnt91 = item.prdPlnChargeCnt91 === undefined ?  '' : item.prdPlnChargeCnt91;
    item.prdPlnCrudeSteQt31 = item.prdPlnCrudeSteQt31 === undefined ?  '' : item.prdPlnCrudeSteQt31;
    item.prdPlnChargeCnt92 = item.prdPlnChargeCnt92 === undefined ?  '' : item.prdPlnChargeCnt92;
    item.prdPlnCrudeSteQt32 = item.prdPlnCrudeSteQt32 === undefined ?  '' : item.prdPlnCrudeSteQt32;                      
    item.prdPlnImptMSteQt10 = item.prdPlnImptMSteQt10 === undefined ?  '' : item.prdPlnImptMSteQt10;
    item.prdPlnImptMSteQt11 = item.prdPlnImptMSteQt11 === undefined ?  '' : item.prdPlnImptMSteQt11;
    item.prdPlnImptMSteQt12 = item.prdPlnImptMSteQt12 === undefined ?  '' : item.prdPlnImptMSteQt12;
    item.prdPlnImptMSteQt13 = item.prdPlnImptMSteQt13 === undefined ?  '' : item.prdPlnImptMSteQt13;
    item.prdPlnImptMSteQt14 = item.prdPlnImptMSteQt14 === undefined ?  '' : item.prdPlnImptMSteQt14;
    item.prdPlnImptMSteQt15 = item.prdPlnImptMSteQt15 === undefined ?  '' : item.prdPlnImptMSteQt15;
    item.prdPlnImptMSteQt20 = item.prdPlnImptMSteQt20 === undefined ?  '' : item.prdPlnImptMSteQt20;
    item.prdPlnImptMSteQt21 = item.prdPlnImptMSteQt21 === undefined ?  '' : item.prdPlnImptMSteQt21;
    item.prdPlnImptMSteQt22 = item.prdPlnImptMSteQt22 === undefined ?  '' : item.prdPlnImptMSteQt22;
    item.prdPlnImptMSteQt23 = item.prdPlnImptMSteQt23 === undefined ?  '' : item.prdPlnImptMSteQt23;
    item.prdPlnImptMSteQt24 = item.prdPlnImptMSteQt24 === undefined ?  '' : item.prdPlnImptMSteQt24;
    item.prdPlnImptMSteQt30 = item.prdPlnImptMSteQt30 === undefined ?  '' : item.prdPlnImptMSteQt30;
    item.prdPlnImptMSteQt31 = item.prdPlnImptMSteQt31 === undefined ?  '' : item.prdPlnImptMSteQt31;
    item.prdPlnImptMSteQt32 = item.prdPlnImptMSteQt32 === undefined ?  '' : item.prdPlnImptMSteQt32;                
    return new DailyProductionPlanningModel(item);        
  }   
}

export default DailyProductionPlanningModel;
