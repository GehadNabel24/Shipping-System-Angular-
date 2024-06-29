export interface IRoleWithAllClaims {
    roleId: string;
    roleName: string;
    allRoleCalims: IClaimsForCheckBox[];
  }
  
  export interface IClaimsForCheckBox {
    displayValue: string;
    isSelected: boolean;
    arabicName?: string;
  }
  