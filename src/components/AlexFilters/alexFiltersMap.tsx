import {AlexToggle} from "../formUtils/AlexToggle/AlexToggle";
import {ReactElement} from "react";
import {EGrade} from "../../redux/api/types/universities";

export interface IAlexFilter {
    label: string,
    component: ReactElement
}

export const alexFiltersMap: Map<string, IAlexFilter> = new Map([
    ['universityGrade', {
        label: 'Вид учебного заведения',
        component: <AlexToggle name={'universityGrade'}
                               options={[{id: EGrade.High, name: 'ВУЗ'}, {id: EGrade.Middle, name: 'ССУЗ'}]}/>
    }],
])