import { SetMetadata } from '@nestjs/common';
import { Roles as AppRoles } from 'src/core/constants/roles.constants';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: AppRoles[]) => SetMetadata(ROLES_KEY, roles);
