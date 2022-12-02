

interface PropsTypes {
    graph : {yAxis: number, xAxis: number}[];
}

const Chart = (props: PropsTypes) => {
    console.log(props);
    return(
        <div></div>
    )
}

export default Chart;