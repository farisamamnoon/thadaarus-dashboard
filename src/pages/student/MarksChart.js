import Chart from "react-apexcharts";
import Progress from "utils/Progress";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "utils/fetchData";
import Error from "utils/Error";

const MarksChart = ({id}) => {
  const studentId = id;
  const {
    data: marksData,
    error: marksError,
    isPending: marksIsPending,
  } = useQuery({
    queryKey: ["marksData"],
    queryFn: async () => fetchData(`student/${studentId}/marks`),
  });
  if (marksError) return <Error severity="error">An unexpected error occured</Error>;
  if (marksIsPending) return <Progress />;

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: marksData.marks.map((e) => e.examName.examName), //["jf", "jfa"],
    },
  };
  const series = marksData.marks[0].marks.map((mark) => {
    return {
      name: mark.subject,
      data: marksData.marks.map((exam) => {
        const subjectMark = exam.marks.find((m) => m.subject === mark.subject);
        return subjectMark ? subjectMark.mark : null;
      }),
    };
  });

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
};

export default MarksChart;
