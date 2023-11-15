import {AlexToggle} from "../formUtils/AlexToggle/AlexToggle";
import {ReactElement} from "react";
import {EGrade, parseEGradeToRusName} from "../../redux/api/types/universities";
import {EUserRole, parseEUserRoleToRusName} from "../../redux/api/types/users";
import {EEducationLevel, parseEEducationLevelToRusName} from "../../redux/api/types/specialities";

export interface IAlexFilter {
    label: string,
    component: ReactElement
}

export const alexFiltersMap: Map<string, IAlexFilter> = new Map([
    ['universityGrade', {
        label: 'Вид учебного заведения',
        component: <AlexToggle name={'universityGrade'}
                               options={
                                   Object.values(EGrade).map((item) => {
                                       return {
                                           id: item,
                                           name: parseEGradeToRusName(item)
                                       }
                                   })
                               }/>
    }],
    ['userRole', {
        label: 'Роль пользователя',
        component: <AlexToggle name={'userRole'}
                               options={
                                   Object.values(EUserRole).map((item) => {
                                       return {
                                           id: item,
                                           name: parseEUserRoleToRusName(item)
                                       }
                                   })
                               }/>
    }],
    ['educationLevel', {
        label: 'Уровень образования',
        component: <AlexToggle name={'educationLevel'}
                               orientation={'vertical'}
                               enforceSelect
                               options={
                                   Object.values(EEducationLevel).map((item) => {
                                       return {
                                           id: item,
                                           name: parseEEducationLevelToRusName(item)
                                       }
                                   })
                               }/>
    }],
])