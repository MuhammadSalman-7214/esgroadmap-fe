import {Dispatch, SetStateAction} from 'react';
import {CarbonReductionDataType} from '../../pages/carbonReduction/type';
import {WaterManagementDataType} from '../../pages/waterManagement/type';
import {WasteAndRecyclingDataType} from '../../pages/wasteAndRecycling/type';
import {RenewablesDataType} from '../../pages/renewables/type';
import {SupplyChainDataType} from '../../pages/supplyChain/type';
import {GenderDiversityDataType} from '../../pages/genderDiversity/type';
import {AllCompanyTargetsDataType} from '../../pages/allCompanyTargets/type';
import {CompanyUniverseDataType} from '../../pages/companyUniverse/type';

export interface TableWithOptionsProps {
  data:
    | AllCompanyTargetsDataType
    | CarbonReductionDataType
    | WaterManagementDataType
    | WasteAndRecyclingDataType
    | RenewablesDataType
    | CompanyUniverseDataType
    | SupplyChainDataType
    | GenderDiversityDataType;
  dataKey:
    | 'allSentence'
    | 'carbonSentence'
    | 'wasteSentence'
    | 'waterSentence'
    | 'genderSentence'
    | 'supplyChain'
    | 'renewablesSentence'
    | 'companyUniverse';
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onSaveSearch: () => void;
}
