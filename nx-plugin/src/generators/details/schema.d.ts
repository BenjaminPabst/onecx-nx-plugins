export interface DetailsGeneratorSchema {
  featureName: string;
  customizeNamingForAPI: boolean;
  apiServiceName: string;
  dataObjectName: string;
  getByIdResponseName: string;
  standalone?: boolean;
}
