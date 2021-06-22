import {ProjectEntity} from './ProjectEntity';

export interface UserEntity {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  projects: ProjectEntity[];
}
