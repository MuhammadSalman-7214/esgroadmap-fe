import {AllCompanyTargetsDataType} from '../../pages/allCompanyTargets/type';
import {CarbonReductionDataType} from '../../pages/carbonReduction/type';
import {CompanyUniverseDataType} from '../../pages/companyUniverse/type';
import {GenderDiversityDataType} from '../../pages/genderDiversity/type';
import {RenewablesDataType} from '../../pages/renewables/type';
import {SupplyChainDataType} from '../../pages/supplyChain/type';
import {WasteAndRecyclingDataType} from '../../pages/wasteAndRecycling/type';
import {WaterManagementDataType} from '../../pages/waterManagement/type';

export const extractors = {
  allSentence: (data: AllCompanyTargetsDataType) => data.allSentence,
  carbonSentence: (data: CarbonReductionDataType) => data.carbonSentence,
  wasteSentence: (data: WasteAndRecyclingDataType) => data.wasteSentence,
  waterSentence: (data: WaterManagementDataType) => data.waterSentence,
  genderSentence: (data: GenderDiversityDataType) => data.genderSentence,
  supplyChain: (data: SupplyChainDataType) => data.supplyChain,
  renewablesSentence: (data: RenewablesDataType) => data.renewablesSentence,
  companyUniverse: (data: CompanyUniverseDataType) => data.companyUniverse,
} as const;
