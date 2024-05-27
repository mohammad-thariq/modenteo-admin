export const TableHeader = ({index, item}) =>{
    return(
        <th
        className=" text-center text-uppercase text-secondary text-xs font-weight-bolder"
        key={index}
      >
        {item}
      </th>
    )
}