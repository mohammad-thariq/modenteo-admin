import { ShippingRuleType } from "@/constant/statusConst"

export const getUniqueProductValue = (type) =>{
    const filterType = ShippingRuleType?.map((i) => i?.value === type)
    console.log(filterType, 'filterType');
    return  filterType.displayValue
}