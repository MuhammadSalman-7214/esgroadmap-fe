import {Dispatch, SetStateAction} from 'react';
import {CarbonReductionDataType} from '../../pages/carbonReduction/type';
import {WaterManagementDataType} from '../../pages/waterManagement/type';
import {WasteAndRecyclingDataType} from '../../pages/wasteAndRecycling/type';
import {RenewablesDataType} from '../../pages/renewables/type';
import {SupplyChainDataType} from '../../pages/supplyChain/type';
import {GenderDiversityDataType} from '../../pages/genderDiversity/type';

export interface TableWithOptionsProps {
  data:
    | CarbonReductionDataType
    | WaterManagementDataType
    | WasteAndRecyclingDataType
    | RenewablesDataType
    | SupplyChainDataType
    | GenderDiversityDataType;
  dataKey:
    | 'carbonSentence'
    | 'wasteSentence'
    | 'waterSentence'
    | 'genderSentence'
    | 'supplyChain'
    | 'renewablesSentence';
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
