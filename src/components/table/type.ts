// import {SentenceType} from '../../types/data';

export type TableProps = {
  data: any[];
  dataKey: string;
  tableName: string;
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
};
