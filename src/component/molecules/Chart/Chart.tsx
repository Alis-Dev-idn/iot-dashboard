import {Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import moment from "moment/moment";
import {listenBrodcast} from "../../../services/SocketIoService/SocketIoService";
import {useEffect, useState} from "react";

interface PropsTypes {
    id: string;
    device: string;
    label: string;
    graph : {yAxis: number, xAxis: number}[];
}


const Chart = (props: PropsTypes) => {
    const [graph, setGraph] = useState<{yAxis: number, xAxis: number}[]>([]);
    const [data, setData] = useState<{data: any}>();
    const tickFormater = (tick : number) => moment(tick).format('DD/MM/YY HH:mm:ss');
    const tickFormaterXaxis = (tick : number) => moment(tick).format('HH:mm');

    const CustomTooltip = ({active, payload}: TooltipProps<number, string>) => {
        if(active && payload && payload.length) {
            const time = tickFormater(payload[0].payload?.xAxis);
            return (
                <div className="tooltip bg-white shadow shadow-md py-2 px-2">
                    <p>{props.label}</p>
                    <p className="font-font1 text-sm">{`Value: ${payload[0].payload?.yAxis}`}</p>
                    <p className="font-font1 text-sm">{`Time: ${time}`}</p>
                </div>
            )
        }
        return null;
    }

    const listenDevice = () => {
        listenBrodcast(`${props.id}-${props.device}`).then((result: any) => {
            setData(result.data);
            if(result.data[props.label] && graph.length !== 0){
                if(graph.length > 20) graph.shift();
                setGraph((prev) => [...prev, {xAxis: result.createdAt, yAxis: result.data[props.label]}]);
            }
        });
    }

    useEffect(() => {
        listenDevice();

        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        setGraph(props.graph);
    }, [props.graph])

    const CustomizedTick = (props: any) => {
        const { x, y, payload } = props;
        const time = tickFormaterXaxis(payload.value);
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} fill={"white"}>
                    <tspan className="text-white font-font1 text-sm" textAnchor="middle" x="0">
                        {time}
                    </tspan>
                </text>
            </g>
        );
    }

    return(
        (graph.length !== 0?
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={200}
                    height={150}
                    data={graph}
                >
                    <XAxis dataKey="xAxis" stroke="white" interval={2} tick={<CustomizedTick/>}/>
                    <YAxis stroke="white" interval={1}/>
                    <Line dataKey="yAxis" dot={false} stroke="blue"/>
                    <Tooltip content={<CustomTooltip/>}/>
                </LineChart>
            </ResponsiveContainer>
            : null)
    )
}

export default Chart;